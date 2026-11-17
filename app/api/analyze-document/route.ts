import { NextRequest, NextResponse } from 'next/server';
import { createAnalysis } from '@/lib/openai-response';

export const runtime = 'nodejs';
export const maxDuration = 60;
const MAX_BYTES = 8 * 1024 * 1024;

export async function POST(request: NextRequest) {
  try {
    const form = await request.formData();
    const file = form.get('document');
    const consent = form.get('consent');
    const expectedPurpose = String(form.get('expectedPurpose') || '').slice(0, 500);
    if (consent !== 'yes') return NextResponse.json({ error: 'Please read the privacy notice and confirm consent before sending a document for analysis.' }, { status: 400 });
    if (!(file instanceof File)) return NextResponse.json({ error: 'Choose a PDF, JPG, PNG or WEBP document.' }, { status: 400 });
    if (file.size === 0 || file.size > MAX_BYTES) return NextResponse.json({ error: 'The selected file is empty or exceeds the 8 MB limit.' }, { status: 413 });
    const ext = file.name.toLowerCase().split('.').pop() || '';
    const type = file.type || ({ pdf:'application/pdf', jpg:'image/jpeg', jpeg:'image/jpeg', png:'image/png', webp:'image/webp' } as Record<string,string>)[ext] || '';
    const isPdf = type === 'application/pdf' && ext === 'pdf';
    const isImage = ['image/jpeg','image/png','image/webp'].includes(type) && ['jpg','jpeg','png','webp'].includes(ext);
    if (!isPdf && !isImage) return NextResponse.json({ error: 'Only PDF, JPG, JPEG, PNG and WEBP files are supported.' }, { status: 415 });
    const bytes = Buffer.from(await file.arrayBuffer());
    const base64 = bytes.toString('base64');
    const filePart = isPdf
      ? { type: 'input_file', filename: file.name.replace(/[^a-zA-Z0-9._-]/g, '_'), file_data: `data:application/pdf;base64,${base64}`, detail: 'high' }
      : { type: 'input_image', image_url: `data:${type};base64,${base64}`, detail: 'high' };
    const prompt = `You are a careful document-literacy assistant for an Indian scholarship preparation service. Analyse the attached document visually and from readable text. Do not claim authenticity, legal validity, government acceptance, or fraud detection. A photo or PDF alone cannot prove a document is genuine. Never repeat full Aadhaar numbers, OTR numbers, bank account numbers, IFSC, phone numbers, full addresses, QR/barcode payloads or other high-risk identifiers. Redact them in your response as [REDACTED]. Do not infer sensitive attributes.\n\nReturn a practical report with these headings:\n1. WHAT THIS DOCUMENT APPEARS TO BE (include confidence: high/medium/low and visual/text cues)\n2. WHAT IT IS GENERALLY USED FOR (scholarship context, if applicable)\n3. WHAT I CAN READ (only non-sensitive fields; mask identifiers)\n4. VISIBLE ISSUES TO CHECK (legibility, crop, glare, cut-off edges, missing pages/seals/signature/date/issuer fields if visibly absent; spelling/date/name differences only when clearly visible; distinguish definite observation from possible concern)\n5. HOW TO FIX OR VERIFY (specific next steps; do not suggest editing an official document yourself; advise obtaining a corrected reissue from the issuing authority when needed)\n6. LIMITS OF THIS REVIEW.\nIf no issue is visible, say so; do not invent problems. If a detail cannot be read, label it unreadable rather than guessing. Treat the user's purpose as context only: ${expectedPurpose || 'Scholarship application document review'}.\nKeep the response concise but useful. This is preliminary visual/document guidance, not a decision from the scholarship authority.`;
    const analysis = await createAnalysis([{ role: 'user', content: [{ type: 'input_text', text: prompt }, filePart] }]);
    return NextResponse.json({ analysis, fileName: file.name, notice: 'Preliminary document explanation only. Authenticity and acceptance must be confirmed by the issuing and scholarship authorities.' });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Document analysis failed.';
    const status = message.includes('OPENAI_API_KEY') ? 503 : 502;
    return NextResponse.json({ error: message }, { status });
  }
}