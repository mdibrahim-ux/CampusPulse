'use client';

import { AlertCircle, Globe2, LoaderCircle, RefreshCw } from "lucide-react";
import { APP_LANGUAGES } from "@/lib/languages";
import { useLanguage } from "@/components/language-provider";

export function LanguageSelector() {
  const { language, setLanguage, status, retryTranslation } = useLanguage();
  const statusText = status === "translating"
    ? "Translating the interface"
    : status === "needs-setup"
      ? "Add OPENAI_API_KEY or BHASHINI credentials to enable translation"
      : status === "error"
        ? "Translation service unavailable. Retry."
        : "Choose your display language";

  return <div className="language-control" data-no-translate>
    <span className="language-control-icon"><Globe2 size={16} aria-hidden="true"/></span>
    <select aria-label="Website language" value={language} onChange={(event) => setLanguage(event.target.value)} title="Website language">
      {APP_LANGUAGES.map((item) => <option key={item.code} value={item.code}>{item.nativeName}</option>)}
    </select>
    <span className={`language-state ${status}`} title={statusText} aria-label={statusText}>
      {status === "translating" && <LoaderCircle size={14}/>}
      {status === "needs-setup" && <AlertCircle size={14}/>}
      {status === "error" && <button type="button" onClick={retryTranslation} aria-label="Retry translation"><RefreshCw size={13}/></button>}
      {status === "ready" && <i/>}
    </span>
  </div>;
}
