import { mkdir, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";

const outputPath = resolve("public/data/officer-source-status.json");
const sources = [
  { id: "officers", label: "NSP officer directory", url: "https://scholarships.gov.in/Officers", purpose: "Official scheme-wise nodal officer and grievance officer entry point." },
  { id: "public", label: "NSP public services", url: "https://scholarships.gov.in/Public", purpose: "Official entry point for scheme-wise officers, district-wise officers and grievance services." },
  { id: "scheme-wise", label: "Scheme-wise officer search", url: "https://scholarships.gov.in/nodelOfficerDetails", purpose: "Live scheme-wise search form. The official portal controls the filters and any CAPTCHA." },
  { id: "district-wise", label: "District-wise officer search", url: "https://scholarships.gov.in/districtNodelOfficerDetails", purpose: "Live district-wise search form. The official portal controls the filters and any CAPTCHA." }
];

function stripHtml(value) {
  return value.replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ").replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&").replace(/\s+/g, " ").trim();
}

async function inspect(source) {
  const checkedAt = new Date().toISOString();
  try {
    const response = await fetch(source.url, {
      headers: { "User-Agent": "CampusPulse-Official-Source-Metadata-Check/1.0 (+https://github.com/mdibrahim-ux/CampusPulse)" },
      signal: AbortSignal.timeout(12000),
      redirect: "follow"
    });
    const html = await response.text();
    const visibleText = stripHtml(html);
    const updateMatch = visibleText.match(/Last update on\s+([A-Za-z]+\s+\d{4})/i);
    const captchaDetected = /captcha/i.test(visibleText) || /captcha/i.test(html);
    return {
      ...source, checkedAt, httpStatus: response.status, reachable: response.ok,
      publishedUpdate: updateMatch?.[1] || null,
      queryRequiresOfficialInteraction: source.id === "scheme-wise" || source.id === "district-wise" || captchaDetected,
      note: response.ok
        ? "Only public page availability and its published update marker are checked. Officer names and contact details are not scraped."
        : "The official source did not return a successful page response. Open the source directly to check availability."
    };
  } catch (error) {
    return { ...source, checkedAt, httpStatus: null, reachable: false, publishedUpdate: null,
      queryRequiresOfficialInteraction: source.id === "scheme-wise" || source.id === "district-wise",
      note: error instanceof Error ? error.message : "Source check failed." };
  }
}

const result = {
  checkedAt: new Date().toISOString(),
  academicYear: "2026-27",
  method: "Daily public-page metadata check; no officer names, emails or phone numbers are extracted.",
  sources: await Promise.all(sources.map(inspect))
};
await mkdir(dirname(outputPath), { recursive: true });
await writeFile(outputPath, JSON.stringify(result, null, 2) + "\n");
console.log("Updated NSP source metadata:", outputPath);
