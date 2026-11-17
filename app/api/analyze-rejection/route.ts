import { NextRequest, NextResponse } from 'next/server';
import { createAnalysis } from '@/lib/openai-response';

export const runtime = 'nodejs';
export const maxDuration = 45;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const scheme = String(body.scheme || '').slice(0, 300);
    const status = String(body.status || '').slice(0, 100);
    const stage = String(body.stage || '').slice(0, 200);
    const reason = String(body.reason || '').trim().slice(0, 5000);
    const documentContext = String(body.documentContext || '').slice(0, 1000);
    if (reason.length < 8) return NextResponse.json({ error: 'Paste the exact portal reason or remark (at least 8 characters). Remove OTR, application ID and personal numbers first.' }, { status: 400 });
    const prompt = `You are a scholarship application process explainer for India. You are not an awarding authority, lawyer, or government helpdesk. Analyse only the user's supplied rejection / defect remark and any reliable official context included below. Never invent a scheme rule, deadline, appeal route, or guarantee that a decision can be reversed. If necessary information is absent, say exactly what must be checked in the official scheme guideline or portal.\n\nIMPORTANT NSP PROCESS DISTINCTION FROM THE PUBLISHED NSP STANDARD OPERATING PROCEDURES: an application marked DEFECTED by the institute is returned to the student to correct and resubmit, after which it appears in the Reverification section. The SOP says the officer must provide a reason when defecting or rejecting. A status marked REJECTED is different from DEFECTED; do not promise that a rejected application can simply be edited or resubmitted. The SOP also describes a Mark as Fake action for suspected fraud. For rejected/fake records, advise the user to check the exact current scheme/portal instructions and contact the official institute/state/department nodal officer or helpdesk for the available review/grievance route. Do not assume that route restores eligibility. Official reference: https://scholarships.gov.in/public/FAQ/NSP_SOP.pdf\n\nUSER CONTEXT\nScheme: ${scheme || 'Not specified'}\nPortal status: ${status || 'Not specified'}\nVerification stage: ${stage || 'Not specified'}\nPortal reason: ${reason}\nDocument context (optional): ${documentContext || 'Not provided'}\n\nProduce a structured report with headings:\n1. PLAIN-LANGUAGE MEANING\n2. LIKELY ISSUE CATEGORY (document mismatch / missing document / income or eligibility condition / institute or verification issue / bank or identity validation / duplicate or technical / unclear)\n3. WHAT TO CHECK FIRST (separate confirmed facts from possibilities)\n4. CORRECTIVE ACTIONS (numbered, concrete, safe; say who should issue or correct each document)\n5. CAN THIS APPLICATION BE RESUBMITTED? (distinguish defected vs rejected; if unclear say check the portal's exact status and official rules)\n6. WHAT TO ASK THE INSTITUTE / NODAL OFFICER\n7. PREVENT THIS NEXT TIME\n\nAvoid blame. Do not recommend falsifying, altering, backdating or editing official certificates. If the reason is vague, give the exact clarifying questions the student should ask. Keep data private and do not repeat personal identifiers.`;
    const analysis = await createAnalysis([{ role:'user', content:[{type:'input_text',text:prompt}] }]);
    return NextResponse.json({ analysis, notice:'Guidance only. The portal and scheme authorities control the decision and any available remedy.' });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Rejection analysis failed.';
    const status = message.includes('OPENAI_API_KEY') ? 503 : 502;
    return NextResponse.json({ error: message }, { status });
  }
}