import { NextRequest, NextResponse } from "next/server";
import { LANGUAGE_BY_CODE } from "@/lib/languages";
import { createAnalysis } from "@/lib/openai-response";

export const runtime = "nodejs";
export const maxDuration = 60;

type PipelineTaskConfig = {
  language?: { sourceLanguage?: string; targetLanguage?: string };
  serviceId?: string;
  modelId?: string;
};
type PipelineConfigurationResponse = {
  pipelineResponseConfig?: Array<{ taskType?: string; config?: PipelineTaskConfig | PipelineTaskConfig[] }>;
  pipelineInferenceAPIEndPoint?: {
    callbackUrl?: string;
    inferenceApiKey?: { name?: string; value?: string };
  };
};
type TranslationResponse = {
  pipelineResponse?: Array<{ output?: Array<{ target?: string }> }>;
};
type PipelineConfig = {
  serviceId: string;
  modelId?: string;
  callbackUrl: string;
  authHeader: string;
  authValue: string;
};

const configCache = new Map<string, PipelineConfig>();

async function getPipelineConfig(targetLanguage: string): Promise<PipelineConfig> {
  const cached = configCache.get(targetLanguage);
  if (cached) return cached;

  const userId = process.env.BHASHINI_USER_ID;
  const apiKey = process.env.BHASHINI_ULCA_API_KEY;
  if (!userId || !apiKey) throw new Error("BHASHINI credentials are not configured.");

  const pipelineId = process.env.BHASHINI_PIPELINE_ID || "64392f96daac500b55c543cd";
  const response = await fetch("https://meity-auth.ulcacontrib.org/ulca/apis/v0/model/getModelsPipeline", {
    method: "POST",
    headers: { "Content-Type": "application/json", "userID": userId, "ulcaApiKey": apiKey },
    body: JSON.stringify({
      pipelineTasks: [{ taskType: "translation", config: { language: { sourceLanguage: "en", targetLanguage } } }],
      pipelineRequestConfig: { pipelineId }
    }),
    cache: "no-store",
    signal: AbortSignal.timeout(15000)
  });

  if (!response.ok) throw new Error("BHASHINI pipeline configuration failed.");
  const data = await response.json() as PipelineConfigurationResponse;
  const task = (data.pipelineResponseConfig || []).find((item) => item.taskType === "translation");
  const rawConfig = task?.config;
  const configs: PipelineTaskConfig[] = Array.isArray(rawConfig) ? rawConfig : rawConfig ? [rawConfig] : [];
  const selected = configs.find((item) => item.language?.sourceLanguage === "en" && item.language?.targetLanguage === targetLanguage) || configs[0];
  const endpoint = data.pipelineInferenceAPIEndPoint;

  if (!selected?.serviceId || !endpoint?.callbackUrl || !endpoint.inferenceApiKey?.name || !endpoint.inferenceApiKey.value) {
    throw new Error("BHASHINI does not expose a model for this language pair.");
  }

  const config: PipelineConfig = {
    serviceId: selected.serviceId,
    modelId: selected.modelId,
    callbackUrl: endpoint.callbackUrl,
    authHeader: endpoint.inferenceApiKey.name,
    authValue: endpoint.inferenceApiKey.value
  };
  configCache.set(targetLanguage, config);
  return config;
}

async function translateWithBhashini(texts: string[], targetLanguage: string): Promise<string[]> {
  const config = await getPipelineConfig(targetLanguage);
  const response = await fetch(config.callbackUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json", [config.authHeader]: config.authValue },
    body: JSON.stringify({
      pipelineTasks: [{
        taskType: "translation",
        config: {
          language: { sourceLanguage: "en", targetLanguage },
          serviceId: config.serviceId,
          ...(config.modelId ? { modelId: config.modelId } : {})
        }
      }],
      inputData: { input: texts.map((source) => ({ source })) }
    }),
    cache: "no-store",
    signal: AbortSignal.timeout(30000)
  });
  if (!response.ok) throw new Error("BHASHINI translation request failed.");
  const data = await response.json() as TranslationResponse;
  const output = data.pipelineResponse?.[0]?.output || [];
  const translations = texts.map((_, index) => String(output[index]?.target || ""));
  if (translations.some((value) => !value)) throw new Error("BHASHINI returned an incomplete translation batch.");
  return translations;
}

async function translateWithOpenAI(texts: string[], targetLanguage: string): Promise<string[]> {
  const language = LANGUAGE_BY_CODE[targetLanguage]?.label || targetLanguage;
  const prompt = [
    "Translate the following interface strings from English into " + language + ".",
    "Return ONLY a valid JSON object with one property named translations, an array of strings.",
    "The array must have exactly " + texts.length + " items and preserve the original order.",
    "Do not summarize, omit, combine, or add explanations.",
    "Preserve placeholders like {name}, numbers, URLs, dates, punctuation, and product/scheme names.",
    "Use clear, natural language suitable for Indian college students. Prefer familiar words over formal bureaucratic language.",
    "Do not translate brand names, official scheme names, technical acronyms, or text inside square-bracket privacy markers.",
    "Strings:",
    JSON.stringify(texts)
  ].join("\n");

  const output = await createAnalysis([{ role: "user", content: [{ type: "input_text", text: prompt }] }]);
  const cleaned = output.trim().replace(/^\x60{3}(?:json)?\s*/i, "").replace(/\s*\x60{3}$/, "");
  const parsed = JSON.parse(cleaned) as { translations?: unknown };
  if (!Array.isArray(parsed.translations) || parsed.translations.length !== texts.length) {
    throw new Error("Translation provider returned an incomplete response.");
  }
  const translations = parsed.translations.map((value) => String(value || ""));
  if (translations.some((value) => !value.trim())) throw new Error("Translation provider returned an empty string.");
  return translations;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const targetLanguage = String(body.targetLanguage || "");
    const texts: string[] = Array.isArray(body.texts) ? body.texts.map((value: unknown) => String(value)) : [];

    if (!LANGUAGE_BY_CODE[targetLanguage] || targetLanguage === "en") {
      return NextResponse.json({ error: "Choose a supported non-English language." }, { status: 400 });
    }
    if (!texts.length || texts.length > 18 || texts.some((text) => !text.trim() || text.length > 1200)) {
      return NextResponse.json({ error: "Translation batches must contain 1–18 text items, each no longer than 1,200 characters." }, { status: 400 });
    }

    let translations: string[];
    let provider: "BHASHINI" | "OpenAI";
    if (process.env.BHASHINI_USER_ID && process.env.BHASHINI_ULCA_API_KEY) {
      try {
        translations = await translateWithBhashini(texts, targetLanguage);
        provider = "BHASHINI";
      } catch (error) {
        if (!process.env.OPENAI_API_KEY) throw error;
        translations = await translateWithOpenAI(texts, targetLanguage);
        provider = "OpenAI";
      }
    } else {
      if (!process.env.OPENAI_API_KEY) {
        return NextResponse.json({
          error: "Add OPENAI_API_KEY or BHASHINI_USER_ID and BHASHINI_ULCA_API_KEY to .env.local to enable translation."
        }, { status: 503 });
      }
      translations = await translateWithOpenAI(texts, targetLanguage);
      provider = "OpenAI";
    }

    return NextResponse.json({ translations, targetLanguage, provider });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Translation service is unavailable.";
    const needsSetup = message.includes("OPENAI_API_KEY") || message.includes("BHASHINI credentials");
    return NextResponse.json({ error: message }, { status: needsSetup ? 503 : 502 });
  }
}
