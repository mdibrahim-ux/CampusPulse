'use client';

import {useMemo,useState} from 'react';
import {
  AlertCircle,ArrowLeft,ArrowRight,Check,ExternalLink,
  FileCheck2,GraduationCap,Info,ShieldCheck,Wallet,Sparkles
} from 'lucide-react';
import {assessScholarships,documentOptions,emptyStudentFacts,type DocumentId,type StudentFacts} from '@/lib/scholarships';
import {SectionHeading} from '@/components/section-heading';

const steps=[
 {number:'01',label:'Your studies',description:'Course and admission',icon:GraduationCap},
 {number:'02',label:'Your household',description:'Income and applicant details',icon:Wallet},
 {number:'03',label:'Scheme conditions',description:'Checks that may apply',icon:ShieldCheck},
 {number:'04',label:'Your documents',description:'What you already have',icon:FileCheck2}
];

export default function EligibilityCheckerPage(){
 const [facts,setFacts]=useState<StudentFacts>(emptyStudentFacts);
 const [docs,setDocs]=useState<DocumentId[]>([]);
 const [step,setStep]=useState(0);
 const [stepError,setStepError]=useState('');
 const [showResults,setShowResults]=useState(false);
 const update=(key:keyof StudentFacts,value:string)=>{
  setFacts(prev=>({...prev,[key]:value}));
  setShowResults(false);
  setStepError('');
 };
 const toggleDoc=(id:DocumentId)=>{
  setDocs(prev=>prev.includes(id)?prev.filter(x=>x!==id):[...prev,id]);
  setShowResults(false);
 };
 const results=useMemo(()=>assessScholarships(facts,docs),[facts,docs]);
 const potential=results.filter(r=>r.status==='Potential match');
 const close=results.filter(r=>r.status==='Needs more information');
 const no=results.filter(r=>r.status==='Not a match');
 const current=steps[step];
 const next=()=>{
  if(step===0&&(!facts.studyLevel||!facts.courseMode)){
   setStepError('Choose your study level and course mode to continue.');
   return;
  }
  setStepError('');
  setStep(Math.min(3,step+1));
 };
 const back=()=>{
  setStepError('');
  setStep(Math.max(0,step-1));
 };
 const reset=()=>{
  setFacts(emptyStudentFacts);
  setDocs([]);
  setStep(0);
  setStepError('');
  setShowResults(false);
 };
 return <div className="scholar-page eligibility-page">
  <SectionHeading eyebrow="SCHOLARSHIP INTELLIGENCE / GUIDED CHECK" title="Find schemes worth checking." description="A short, guided comparison of your study details, scheme conditions and available documents. You can skip anything you are unsure about."/>
  <div className="scholar-notice"><ShieldCheck size={18}/><div><b>Your answers stay in this browser.</b><p>This checker does not submit an application or ask for Aadhaar, OTR, bank-account numbers or uploaded identity documents.</p></div></div>
  <div className="checker-layout">
   <div className="checker-main">
    <section className="checker-workspace">
     <div className="checker-workspace-header">
      <div><span className="eyebrow">ELIGIBILITY CHECK / 04 STEPS</span><h2>Let’s understand your situation.</h2><p>Only the details needed for the scheme comparison are asked here.</p></div>
      <span className="checker-step-counter">0{step+1}<i>/</i>04</span>
     </div>
     <div className="checker-progress-track"><div className="checker-progress-fill" style={{width:((step+1)*25)+'%'}}/></div>
     <nav className="checker-step-nav" aria-label="Eligibility steps">
      {steps.map((item,index)=>{
       const Icon=item.icon;
       const active=index===step;
       const complete=index<step;
       return <button type="button" key={item.number} className={'checker-step-tab '+(active?'active ':'')+(complete?'complete':'')} onClick={()=>{if(index<=step){setStep(index);setStepError('')}}} disabled={index>step} aria-current={active?'step':undefined}>
        <span className="checker-step-tab-icon">{complete?<Check size={14}/>:<Icon size={14}/>}</span>
        <span><b>{item.label}</b><small>{item.description}</small></span>
       </button>;
      })}
     </nav>
     <form className="checker-step-form" onSubmit={event=>{event.preventDefault();if(step===3)setShowResults(true);}}>
      {step===0&&<section className="checker-step-panel">
       <div className="checker-panel-heading"><span className="checker-panel-number">01</span><div><h3>Your study profile</h3><p>Start with the course you are currently pursuing.</p></div></div>
       <div className="scholar-fields">
        <label className="scholar-field"><span>Current study level</span><select required value={facts.studyLevel} onChange={e=>update('studyLevel',e.target.value)}><option value="">Select your level</option>{['Class 11 / 12','Diploma','Undergraduate','Postgraduate','Research','Other'].map(x=><option key={x}>{x}</option>)}</select></label>
        <label className="scholar-field"><span>Course mode</span><select required value={facts.courseMode} onChange={e=>update('courseMode',e.target.value)}><option value="">Select course mode</option>{['Regular / full-time','Distance / correspondence','Open university','Unknown'].map(x=><option key={x}>{x}</option>)}</select></label>
        <label className="scholar-field"><span>Is your course technical or AICTE-related?</span><select value={facts.technicalCourse} onChange={e=>update('technicalCourse',e.target.value)}><option value="unknown">Not sure / skip</option><option value="yes">Yes</option><option value="no">No</option></select></label>
        <label className="scholar-field"><span>Is your institution AICTE-approved?</span><select value={facts.aicteApproved} onChange={e=>update('aicteApproved',e.target.value)}><option value="unknown">Not sure / skip</option><option value="yes">Yes</option><option value="no">No</option></select></label>
        <label className="scholar-field"><span>Admission stage</span><select value={facts.admissionStage} onChange={e=>update('admissionStage',e.target.value)}><option value="">Not sure / not answered</option>{['First year','Second year through lateral entry','Later year / other','Unknown'].map(x=><option key={x}>{x}</option>)}</select></label>
       </div>
      </section>}
      {step===1&&<section className="checker-step-panel">
       <div className="checker-panel-heading"><span className="checker-panel-number">02</span><div><h3>Your household details</h3><p>Used to compare schemes with income or applicant-category conditions.</p></div></div>
       <div className="scholar-fields">
        <label className="scholar-field"><span>Annual family income (₹)</span><input inputMode="numeric" type="number" min="0" placeholder="Example: 250000" value={facts.familyIncome} onChange={e=>update('familyIncome',e.target.value)}/><small>Enter an approximate amount. The official certificate is authoritative.</small></label>
        <label className="scholar-field"><span>Gender (for gender-specific schemes)</span><select value={facts.gender} onChange={e=>update('gender',e.target.value)}><option value="">Prefer not to answer</option><option>Female</option><option>Male</option><option>Prefer not to say</option></select></label>
        <label className="scholar-field"><span>Community category</span><select value={facts.category} onChange={e=>update('category',e.target.value)}><option value="">Prefer not to answer</option>{['SC','ST','OBC','EWS','General','Other'].map(x=><option key={x}>{x}</option>)}</select></label>
        <label className="scholar-field"><span>Number of girl children in your family</span><input inputMode="numeric" type="number" min="0" max="20" placeholder="Only used for relevant schemes" value={facts.girlsInFamily} onChange={e=>update('girlsInFamily',e.target.value)}/></label>
        <label className="scholar-field"><span>Disability percentage (optional)</span><input inputMode="numeric" type="number" min="0" max="100" placeholder="Leave blank if not applicable" value={facts.disabilityPercent} onChange={e=>update('disabilityPercent',e.target.value)}/><small>Only used for schemes that specify benchmark disability.</small></label>
       </div>
       <div className="checker-privacy-inline"><Info size={15}/><span>Skip any detail you do not want to provide. Unanswered conditions appear as “Needs more information”, not as a negative result.</span></div>
      </section>}
      {step===2&&<section className="checker-step-panel">
       <div className="checker-panel-heading"><span className="checker-panel-number">03</span><div><h3>Scheme-specific conditions</h3><p>Choose “Not sure” when you need to verify something.</p></div></div>
       <div className="scholar-fields">
        <label className="scholar-field"><span>Was your Class 12 board percentile above the 80th?</span><select value={facts.above80Percentile} onChange={e=>update('above80Percentile',e.target.value)}><option value="unknown">Not sure / not answered</option><option value="yes">Yes</option><option value="no">No</option></select></label>
        <label className="scholar-field"><span>Did you take a drop after Class 12?</span><select value={facts.gapAfterClass12} onChange={e=>update('gapAfterClass12',e.target.value)}><option value="unknown">Not sure / not answered</option><option value="yes">Yes</option><option value="no">No</option></select></label>
        <label className="scholar-field"><span>Are you receiving another scholarship or fee reimbursement?</span><select value={facts.receivesOtherScholarship} onChange={e=>update('receivesOtherScholarship',e.target.value)}><option value="unknown">Not sure / not answered</option><option value="yes">Yes</option><option value="no">No</option></select></label>
        <label className="scholar-field"><span>Is your institution on the current notified list?</span><select value={facts.notifiedInstitution} onChange={e=>update('notifiedInstitution',e.target.value)}><option value="unknown">Not sure / not checked</option><option value="yes">Yes</option><option value="no">No</option></select></label>
        <label className="scholar-field"><span>Are you an Indian citizen?</span><select value={facts.indianCitizen} onChange={e=>update('indianCitizen',e.target.value)}><option value="unknown">Not sure / not answered</option><option value="yes">Yes</option><option value="no">No</option></select></label>
       </div>
       <div className="checker-privacy-inline"><Info size={15}/><span>Do not guess. Current institution lists and scheme notifications must still be verified with the official source.</span></div>
      </section>}
      {step===3&&<section className="checker-step-panel">
       <div className="checker-panel-heading"><span className="checker-panel-number">04</span><div><h3>Documents you already have</h3><p>Missing paperwork is a preparation task, not automatic ineligibility.</p></div></div>
       <div className="document-grid">{documentOptions.map(doc=><label key={doc.id} className={'document-option '+(docs.includes(doc.id)?'checked':'')}><input type="checkbox" checked={docs.includes(doc.id)} onChange={()=>toggleDoc(doc.id)}/><span className="document-checkbox"><Check size={12}/></span><span><b>{doc.label}</b><small>{doc.detail}</small></span></label>)}</div>
       <div className="documents-count"><FileCheck2 size={15}/><b>{docs.length} of {documentOptions.length}</b><span>document types marked available</span></div>
      </section>}
      {stepError&&<div className="analysis-error"><AlertCircle size={14}/>{stepError}</div>}
      <div className="checker-step-actions">
       <div className="checker-step-actions-left">
        {step>0&&<button type="button" className="button button-light" onClick={back}><ArrowLeft size={13}/> Back</button>}
        <button type="button" className="checker-reset" onClick={reset}>Start over</button>
       </div>
       {step<3?<button type="button" className="button button-dark" onClick={next}>Continue <ArrowRight size={14}/></button>:<button className="button button-dark" type="submit"><Sparkles size={14}/> Compare scheme rules <ArrowRight size={14}/></button>}
      </div>
     </form>
    </section>
    {showResults&&<section className="assessment-results" id="results">
     <div className="results-title"><div><span className="eyebrow">YOUR COMPARISON</span><h2>Here is where you stand.</h2><p>Based only on the answers you provided and the scheme snapshots in CampusPulse.</p></div><div className="results-summary"><b>{potential.length}</b><span>Potential matches</span></div></div>
     {potential.length>0&&<ResultGroup title="Potential matches" color="positive" results={potential}/>}
     {close.length>0&&<ResultGroup title="Needs more information" color="caution" results={close}/>}
     {no.length>0&&<ResultGroup title="Not a match based on these answers" color="muted" results={no}/>}
     <div className="results-disclaimer">A “potential match” is not approval or a guarantee of eligibility. Rules, application windows, institution lists, available slots and certificates are controlled by the official scheme. We do not submit your answers to NSP.</div>
    </section>}
   </div>
   <aside className="checker-aside"><div className="aside-sticky-card">
    <span className="eyebrow">YOUR PROGRESS</span>
    <div className="checker-aside-progress"><b>0{step+1}</b><span>of 04 steps</span></div>
    <div className="checker-aside-steps">{steps.map((item,index)=><div key={item.number} className={index===step?'active':index<step?'done':''}><span>{index<step?<Check size={11}/>:item.number}</span><b>{item.label}</b></div>)}</div>
    <div className="aside-divider"/>
    <span className="eyebrow">HOW THE RESULT WORKS</span>
    <h3>Rules first.<br/><em>Not guesswork.</em></h3>
    <ol><li><b>Compare conditions</b><span>Your answers are checked against each published scheme condition.</span></li><li><b>Show document readiness</b><span>See which listed documents you have and still need.</span></li><li><b>Keep unknowns visible</b><span>No automatic pass when a required fact is unknown.</span></li></ol>
    <div className="aside-safety"><AlertCircle size={14}/><p>CampusPulse is a guidance tool, not the awarding authority. Always confirm against the scheme’s current notification.</p></div>
    <a className="checker-official-link" href="https://scholarships.gov.in/scholarshipEligibility/" target="_blank" rel="noreferrer">Open NSP eligibility checker <ExternalLink size={12}/></a>
   </div></aside>
  </div>
 </div>;
}

function ResultGroup({title,color,results}:{title:string;color:string;results:ReturnType<typeof assessScholarships>}){
 return <div className={'result-group '+color}>
  <div className="result-group-heading"><h3>{title}</h3><span>{results.length} scheme{results.length===1?'':'s'}</span></div>
  {results.map(r=><article className="result-scheme" key={r.scheme.id}>
   <div className="result-scheme-main">
    <div className="result-scheme-meta"><span>{r.scheme.category}</span><span>{r.matchedCriteria}/{r.totalCriteria} conditions matched</span></div>
    <h4>{r.scheme.shortName}</h4><p>{r.scheme.summary}</p>
    <div className="result-lists">
     {r.missingAnswers.length>0&&<div><b>Still need to confirm</b>{r.missingAnswers.map(x=><span key={x}>• {x}</span>)}</div>}
     {r.reasons.filter(x=>x.startsWith('Does not meet:')).length>0&&<div><b>Conditions not met</b>{r.reasons.filter(x=>x.startsWith('Does not meet:')).map(x=><span key={x}>• {x.replace('Does not meet: ','')}</span>)}</div>}
     {r.missingDocuments.length>0&&<div><b>Documents still needed ({r.missingDocuments.length})</b>{r.missingDocuments.slice(0,5).map(id=><span key={id}>• {documentOptions.find(x=>x.id===id)?.label}</span>)}{r.missingDocuments.length>5&&<span>• +{r.missingDocuments.length-5} more</span>}</div>}
    </div>
    <a className="subtle-link" href={r.scheme.sourceUrl} target="_blank" rel="noreferrer">Check official scheme details <ExternalLink size={13}/></a>
   </div>
   <span className="result-status">{r.status}</span>
  </article>)}
 </div>;
}
