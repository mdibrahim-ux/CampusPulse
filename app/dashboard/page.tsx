'use client';

import Link from 'next/link';
import {useEffect,useMemo,useState} from 'react';
import {
 ArrowRight,ArrowUpRight,BookmarkCheck,CalendarClock,CheckCircle2,
 FileSearch,GraduationCap,ShieldCheck,Sparkles
} from 'lucide-react';
import {scholarshipSchemes} from '@/lib/scholarships';
import {getTracker} from '@/lib/storage';
import type {TrackerItem} from '@/lib/types';

export default function DashboardPage(){
 const [items,setItems]=useState<TrackerItem[]>([]);

 useEffect(()=>{
  const sync=()=>setItems(getTracker());
  sync();
  window.addEventListener('storage',sync);
  window.addEventListener('campuspulse-tracker',sync);
  return()=>{
   window.removeEventListener('storage',sync);
   window.removeEventListener('campuspulse-tracker',sync);
  };
 },[]);

 const closingSoon=useMemo(()=>scholarshipSchemes
  .filter(s=>s.studentDeadline)
  .map(s=>({...s,daysLeft:Math.ceil((new Date(s.studentDeadline+'T23:59:59').getTime()-Date.now())/86400000)}))
  .filter(s=>s.daysLeft>=0&&s.daysLeft<=30)
  .sort((a,b)=>a.daysLeft-b.daysLeft)
  .slice(0,3),[]);

 const saved=items.slice(0,2).map(item=>({
  item,
  scheme:scholarshipSchemes.find(s=>s.id===item.opportunityId)
 })).filter(x=>x.scheme);

 return <div className="overview-page">
  <section className="overview-hero">
   <div className="overview-hero-copy">
    <div className="overview-overline"><span className="overview-live-dot"/> YOUR STUDENT SUPPORT DESK <span className="overview-year">AY 2026–27</span></div>
    <h1>Make your next<br/><em>move count.</em></h1>
    <p>Scholarships can feel complicated. CampusPulse turns the process into clear steps — from finding a scheme to preparing the right documents.</p>
    <div className="overview-hero-actions">
     <Link href="/eligibility-checker" className="overview-primary-button">Find scholarships <ArrowRight size={17}/></Link>
     <Link href="/scholarships" className="overview-secondary-link">Explore the directory <ArrowUpRight size={15}/></Link>
    </div>
    <div className="overview-hero-foot"><ShieldCheck size={14}/> Independent guide · Official sources linked · Your decisions stay yours</div>
   </div>
   <div className="overview-hero-graphic" aria-hidden="true">
    <div className="overview-graphic-grid"/>
    <div className="overview-graphic-ring graphic-ring-one"/>
    <div className="overview-graphic-ring graphic-ring-two"/>
    <div className="overview-graphic-core"><span>₹</span><b>BACK<br/>YOUR<br/>FUTURE</b></div>
    <div className="overview-floating-note note-document"><FileSearch size={17}/><span>DOCUMENTS<br/><b>READY?</b></span></div>
    <div className="overview-floating-note note-scholar"><GraduationCap size={18}/><span>SCHEME<br/><b>DISCOVERY</b></span></div>
    <span className="overview-graphic-index">CP / 2026</span>
   </div>
  </section>

  <section className="overview-deadline-section">
   <div className="overview-section-title">
    <div><span className="page-kicker">DON&apos;T MISS THE WINDOW</span><h2>Closing soon <span className="title-spark">✳</span></h2><p>Student application dates published on the official NSP catalogue.</p></div>
    <Link href="/scholarships" className="overview-section-link">All schemes <ArrowUpRight size={15}/></Link>
   </div>
   {closingSoon.length>0?<div className="overview-deadline-grid">
    {closingSoon.map((scheme,index)=><Link href={'/scholarships/'+scheme.id} className={'overview-deadline-card deadline-card-'+index} key={scheme.id}>
     <div className="deadline-card-top"><span>{scheme.deadlineStage||'Student application'}</span><span className="deadline-card-number">0{index+1}</span></div>
     <h3>{scheme.shortName}</h3>
     <div className="deadline-card-date"><b>{new Date(scheme.studentDeadline+'T00:00:00').toLocaleDateString('en-IN',{day:'numeric',month:'short'})}</b><span>{scheme.daysLeft===0?'Closes today':scheme.daysLeft+' days left'}</span></div>
     <div className="deadline-card-link">Review scheme <ArrowUpRight size={14}/></div>
    </Link>)}
   </div>:<div className="overview-no-deadline"><CalendarClock size={20}/><div><b>No verified student deadline in the next 30 days.</b><span>Open the official catalogue to check newly published dates.</span></div><a href="https://scholarships.gov.in/All-Scholarships" target="_blank" rel="noreferrer">Open NSP <ArrowUpRight size={14}/></a></div>}
   <div className="overview-source-caption"><ShieldCheck size={13}/> NSP Academic Year 2026–27 · Catalogue snapshot checked 17 November 2026 · Confirm each scheme before applying.</div>
  </section>

  <section className="overview-action-section">
   <div className="overview-section-title">
    <div><span className="page-kicker">START WHERE YOU ARE</span><h2>What do you need help with?</h2><p>Choose one task. You can come back to the others whenever you need them.</p></div>
   </div>
   <div className="overview-action-grid">
    <Link href="/eligibility-checker" className="overview-action-card action-eligibility">
     <div className="action-card-heading"><span>01 / DISCOVER</span><span className="action-icon"><GraduationCap size={22}/></span></div>
     <h3>Find scholarships<br/>that fit you.</h3>
     <p>Answer a few questions about your studies and documents. See which schemes may match.</p>
     <b>Check eligibility <ArrowRight size={16}/></b>
    </Link>
    <Link href="/document-review" className="overview-action-card action-document">
     <div className="action-card-heading"><span>02 / PREPARE</span><span className="action-icon"><FileSearch size={21}/></span></div>
     <h3>Make sense of<br/>your documents.</h3>
     <p>Understand what a document is for and spot visible issues before uploading.</p>
     <b>Review a document <ArrowRight size={16}/></b>
    </Link>
    <Link href="/rejection-analyzer" className="overview-action-card action-rejection">
     <div className="action-card-heading"><span>03 / RESOLVE</span><span className="action-icon"><CheckCircle2 size={21}/></span></div>
     <h3>Know what to do<br/>after a portal remark.</h3>
     <p>Understand a defect or rejection message and prepare the right next steps.</p>
     <b>Understand the remark <ArrowRight size={16}/></b>
    </Link>
   </div>
  </section>

  <section className="overview-lower-grid">
   <div className="overview-saved-panel">
    <div className="overview-section-title compact"><div><span className="page-kicker">YOUR SHORTLIST</span><h2>Saved scholarships</h2></div><Link href="/tracker" className="overview-section-link">Open tracker <ArrowUpRight size={14}/></Link></div>
    {saved.length?saved.map(({item,scheme})=><Link href={'/scholarships/'+scheme!.id} className="overview-saved-row" key={item.opportunityId}><span className="overview-saved-mark">₹</span><span className="overview-saved-copy"><b>{scheme!.shortName}</b><small>{scheme!.provider}</small></span><span className="overview-saved-status">{item.status}</span><ArrowRight size={15}/></Link>):<div className="overview-saved-empty"><BookmarkCheck size={22}/><div><b>Your shortlist starts here.</b><span>Save a scheme from the scholarship directory to track it here.</span><Link href="/scholarships">Browse scholarships <ArrowUpRight size={14}/></Link></div></div>}
   </div>
   <Link href="/services" className="overview-services-panel">
    <span className="services-panel-icon"><Sparkles size={22}/></span>
    <span className="page-kicker">BEYOND SCHOLARSHIPS</span>
    <h2>More support.<br/>Less searching.</h2>
    <p>Student bus passes, free developer tools, education finance and digital academic records.</p>
    <b>Explore student services <ArrowUpRight size={16}/></b>
   </Link>
  </section>
 </div>;
}
