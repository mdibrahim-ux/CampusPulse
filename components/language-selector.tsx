'use client';

import { Globe2, RefreshCw } from "lucide-react";
import { APP_LANGUAGES } from "@/lib/languages";
import { useLanguage } from "@/components/language-provider";

export function LanguageSelector() {
  const { language, setLanguage, status, retryTranslation } = useLanguage();
  const message = status === "translating"
    ? "Translating this page"
    : status === "ready"
      ? "Language applied"
      : status === "needs-setup"
        ? "Add BHASHINI credentials to enable translations"
        : status === "error"
          ? "Translation could not be completed"
          : "Choose your language";

  return <div className="language-control" data-no-translate title={message}>
    <Globe2 size={16} aria-hidden="true"/>
    <select aria-label="Website language" value={language} onChange={(event) => setLanguage(event.target.value)}>
      {APP_LANGUAGES.map((item) => <option key={item.code} value={item.code}>{item.nativeName}</option>)}
    </select>
    {status === "translating" && <span className="language-pulse" aria-label="Translating"/>}
    {status === "needs-setup" && <span className="language-status">Setup needed</span>}
    {status === "error" && <span className="language-status">Try again</span>}
    {(status === "needs-setup" || status === "error") && <button type="button" className="language-retry" onClick={retryTranslation} aria-label="Retry translation"><RefreshCw size={13}/></button>}
  </div>;
}
