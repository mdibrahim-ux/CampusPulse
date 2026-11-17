export function extractResponseText(payload: any): string {
  const parts: string[] = [];
  for (const item of payload?.output ?? []) {
    if (item?.type !== 'message') continue;
    for (const content of item?.content ?? []) {
      if ((content?.type === 'output_text' || content?.type === 'text') && typeof content?.text === 'string') parts.push(content.text);
    }
  }
  return parts.join('\n').trim();
}

export async function createAnalysis(input: unknown) {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) throw new Error('AI analysis is not configured. Add OPENAI_API_KEY to .env.local and restart the development server.');
  const model = process.env.OPENAI_MODEL || 'gpt-4.1';
  const response = await fetch('https://api.openai.com/v1/responses', {
    method: 'POST',
    headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
    cache: 'no-store',
    body: JSON.stringify({ model, store: false, input })
  });
  const payload = await response.json();
  if (!response.ok) {
    const message = payload?.error?.message || `AI provider returned HTTP ${response.status}`;
    throw new Error(message);
  }
  const analysis = extractResponseText(payload);
  if (!analysis) throw new Error('The analysis service returned an empty response. Please try again with a clearer file or reason.');
  return analysis;
}