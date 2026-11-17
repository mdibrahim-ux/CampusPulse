'use client';

import React, { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { LANGUAGE_BY_CODE } from "@/lib/languages";

type TranslationStatus = "idle" | "translating" | "ready" | "needs-setup" | "error";
type LanguageContextValue = {
  language: string;
  setLanguage: (code: string) => void;
  status: TranslationStatus;
  retryTranslation: () => void;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);
const STORAGE_KEY = "campuspulse.language.v1";
const CACHE_KEY = "campuspulse.translation-cache.v1";
const EXCLUDED_TEXT = "input, textarea, script, style, noscript, code, pre, svg, [data-no-translate], [data-user-content], .analysis-body, .office-contact-links, .user-mini, .profile-pill, .user-note, .user-entered";
const EXCLUDED_ATTRIBUTES = "script, style, noscript, code, pre, svg, [data-no-translate], [data-user-content], .user-mini, .profile-pill, .user-note";

type AttributeSource = { source: string; applied?: string };

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState("en");
  const [status, setStatus] = useState<TranslationStatus>("idle");
  const [refreshKey, setRefreshKey] = useState(0);
  const textSources = useRef(new Map<Text, string>());
  const textApplied = useRef(new WeakMap<Text, string>());
  const attrSources = useRef(new Map<Element, Map<string, AttributeSource>>());
  const cache = useRef<Record<string, string>>({});
  const activeRun = useRef(0);
  const disabledLocales = useRef(new Set<string>());

  const setLanguage = useCallback((code: string) => {
    if (!LANGUAGE_BY_CODE[code]) return;
    try { window.localStorage.setItem(STORAGE_KEY, code); } catch {}
    setLanguageState(code);
  }, []);

  const retryTranslation = useCallback(() => {
    disabledLocales.current.delete(language);
    setStatus("idle");
    setRefreshKey((value) => value + 1);
  }, [language]);

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      if (saved && LANGUAGE_BY_CODE[saved]) setLanguageState(saved);
      const storedCache = window.localStorage.getItem(CACHE_KEY);
      if (storedCache) cache.current = JSON.parse(storedCache);
    } catch {}
  }, []);

  useEffect(() => {
    const info = LANGUAGE_BY_CODE[language] || LANGUAGE_BY_CODE.en;
    document.documentElement.lang = language;
    document.documentElement.dir = info.direction || "ltr";
  }, [language]);

  useEffect(() => {
    const runId = ++activeRun.current;
    let observer: MutationObserver | null = null;
    let timer: ReturnType<typeof setTimeout> | null = null;
    let working = false;
    let rerunRequested = false;

    const restoreOriginals = () => {
      for (const [node, source] of textSources.current.entries()) {
        if (node.isConnected && textApplied.current.has(node)) {
          node.nodeValue = source;
          textApplied.current.delete(node);
        }
      }
      for (const [element, attrs] of attrSources.current.entries()) {
        if (!element.isConnected) continue;
        for (const [name, item] of attrs.entries()) {
          if (item.applied && element.getAttribute(name) === item.applied) {
            element.setAttribute(name, item.source);
            item.applied = undefined;
          }
        }
      }
    };

    const getTextTargets = () => {
      const targets: Array<{ source: string; apply: (value: string) => void }> = [];
      const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
      let node: Node | null;
      while ((node = walker.nextNode())) {
        const textNode = node as Text;
        const parent = textNode.parentElement;
        if (!parent || parent.closest(EXCLUDED_TEXT)) continue;
        const current = textNode.nodeValue || "";
        if (!current.trim()) continue;
        const previousApplied = textApplied.current.get(textNode);
        let source = textSources.current.get(textNode);
        if (!source) {
          source = current;
          textSources.current.set(textNode, source);
        } else if (previousApplied && current !== previousApplied) {
          source = current;
          textSources.current.set(textNode, source);
          textApplied.current.delete(textNode);
        }
        if (previousApplied && current === previousApplied) continue;
        targets.push({
          source,
          apply: (translated) => {
            if (textNode.isConnected) {
              textNode.nodeValue = translated;
              textApplied.current.set(textNode, translated);
            }
          }
        });
      }
      return targets;
    };

    const getAttributeTargets = () => {
      const targets: Array<{ source: string; apply: (value: string) => void }> = [];
      const elements = document.body.querySelectorAll("[placeholder], [aria-label], [title]");
      elements.forEach((element) => {
        if (element.closest(EXCLUDED_ATTRIBUTES)) return;
        ["placeholder", "aria-label", "title"].forEach((name) => {
          const current = element.getAttribute(name);
          if (!current || !current.trim()) return;
          let values = attrSources.current.get(element);
          if (!values) {
            values = new Map();
            attrSources.current.set(element, values);
          }
          let item = values.get(name);
          if (!item) {
            item = { source: current };
            values.set(name, item);
          } else if (item.applied && current !== item.applied) {
            item.source = current;
            item.applied = undefined;
          }
          if (item.applied && current === item.applied) return;
          targets.push({
            source: item.source,
            apply: (translated) => {
              if (element.isConnected) {
                element.setAttribute(name, translated);
                item!.applied = translated;
              }
            }
          });
        });
      });
      return targets;
    };

    const scanAndTranslate = async () => {
      if (working) {
        rerunRequested = true;
        return;
      }
      if (language === "en") {
        restoreOriginals();
        setStatus("ready");
        return;
      }
      if (disabledLocales.current.has(language)) return;
      working = true;
      setStatus("translating");
      try {
        const allTargets = [...getTextTargets(), ...getAttributeTargets()];
        const missing = allTargets.filter((item) => !cache.current[language + "|" + item.source]);
        allTargets.forEach((item) => {
          const cached = cache.current[language + "|" + item.source];
          if (cached) item.apply(cached);
        });

        for (let index = 0; index < missing.length; index += 18) {
          if (runId !== activeRun.current) return;
          const batch = missing.slice(index, index + 18);
          const response = await fetch("/api/translate", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ targetLanguage: language, texts: batch.map((item) => item.source) })
          });
          const result = await response.json();
          if (!response.ok) {
            if (response.status === 503) {
              disabledLocales.current.add(language);
              setStatus("needs-setup");
            } else {
              setStatus("error");
            }
            return;
          }
          const translated: string[] = result.translations || [];
          batch.forEach((item, batchIndex) => {
            const value = translated[batchIndex];
            if (value && value.trim()) {
              cache.current[language + "|" + item.source] = value;
              item.apply(value);
            }
          });
          try { window.localStorage.setItem(CACHE_KEY, JSON.stringify(cache.current)); } catch {}
        }
        if (runId === activeRun.current) setStatus("ready");
      } catch {
        if (runId === activeRun.current) setStatus("error");
      } finally {
        working = false;
        if (rerunRequested && runId === activeRun.current) {
          rerunRequested = false;
          void scanAndTranslate();
        }
      }
    };

    if (language !== "en") {
      restoreOriginals();
      void scanAndTranslate();
      observer = new MutationObserver(() => {
        if (timer) clearTimeout(timer);
        timer = setTimeout(() => void scanAndTranslate(), 180);
      });
      observer.observe(document.body, { childList: true, subtree: true, characterData: true });
    } else {
      restoreOriginals();
      setStatus("ready");
    }

    return () => {
      activeRun.current++;
      if (timer) clearTimeout(timer);
      observer?.disconnect();
    };
  }, [language, refreshKey]);

  const value = useMemo(() => ({ language, setLanguage, status, retryTranslation }), [language, setLanguage, status, retryTranslation]);
  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const value = useContext(LanguageContext);
  if (!value) throw new Error("useLanguage must be used inside LanguageProvider");
  return value;
}
