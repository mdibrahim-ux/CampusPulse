export type AppLanguage = { code: string; label: string; nativeName: string; direction?: "rtl" | "ltr" };

export const APP_LANGUAGES: AppLanguage[] = [
  { code: "en", label: "English", nativeName: "English" },
  { code: "hi", label: "Hindi", nativeName: "हिन्दी" },
  { code: "kn", label: "Kannada", nativeName: "ಕನ್ನಡ" },
  { code: "ta", label: "Tamil", nativeName: "தமிழ்" },
  { code: "te", label: "Telugu", nativeName: "తెలుగు" },
  { code: "ml", label: "Malayalam", nativeName: "മലയാളം" },
  { code: "mr", label: "Marathi", nativeName: "मराठी" },
  { code: "bn", label: "Bengali", nativeName: "বাংলা" },
  { code: "gu", label: "Gujarati", nativeName: "ગુજરાતી" },
  { code: "pa", label: "Punjabi", nativeName: "ਪੰਜਾਬੀ" },
  { code: "or", label: "Odia", nativeName: "ଓଡ଼ିଆ" },
  { code: "ur", label: "Urdu", nativeName: "اردو", direction: "rtl" },
  { code: "as", label: "Assamese", nativeName: "অসমীয়া" },
  { code: "sa", label: "Sanskrit", nativeName: "संस्कृतम्" },
  { code: "kok", label: "Konkani", nativeName: "कोंकणी" },
  { code: "ks", label: "Kashmiri", nativeName: "कॉशुर", direction: "rtl" },
  { code: "mai", label: "Maithili", nativeName: "मैथिली" },
  { code: "ne", label: "Nepali", nativeName: "नेपाली" },
  { code: "sd", label: "Sindhi", nativeName: "سنڌي", direction: "rtl" },
  { code: "brx", label: "Bodo", nativeName: "बड़ो" },
  { code: "doi", label: "Dogri", nativeName: "डोगरी" },
  { code: "mni", label: "Manipuri (Meitei)", nativeName: "মৈতৈলোন্" },
  { code: "sat", label: "Santali", nativeName: "ᱥᱟᱱᱛᱟᱲᱤ" }
];

export const LANGUAGE_BY_CODE = Object.fromEntries(
  APP_LANGUAGES.map((language) => [language.code, language])
) as Record<string, AppLanguage>;
