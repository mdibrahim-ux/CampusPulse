'use client';

import Link from 'next/link';
import {useEffect,useMemo,useState} from 'react';
import {ArrowRight,ArrowUpRight,CalendarClock,FileCheck2,FileSearch,GraduationCap,ShieldCheck} from 'lucide-react';
import {scholarshipSchemes} from '@/lib/scholarships';
import {getProfile,getTracker} from '@/lib/storage';
import type {StudentProfile,TrackerItem} from '@/lib/types';

export default function DashboardPage(){
 const [profile,setProfile]=useState<StudentProfile|null>(null);
 const [items,setItems]=useState<TrackerItem[]>([]);
 useEffect(()=>{
  const sync=()=>{setProfile(getProfile());setItems(getTracker())};
  sync();
  window.addEventListener('storage',sync);
  window.addEventListener('campuspulse-profile',sync);
  window.addEventListener('campuspulse-tracker',sync);
  return()=>{
   window.removeEventListener('storage',sync);
   window.removeEventListener('campuspulse-profile',sync);
   window.removeEventListener('campuspulse-tracker',sync);
  };
 },[]);
 const closingSoon=useMemo(()=>scholarshipSchemes
  .filter(s=>s.studentDeadline)
  .map(s=>({...s,daysLeft:Math.ceil((new Date(s.studentDeadline+'T23:59:59').getTime()-Date.now())/86400000)}))
  .filter(s=>s.daysLeft>=0&&s.daysLeft<=30)
  .sort((a,b)=>a.daysLeft-b.daysLeft)
  .slice(0,3),[]);
 const firstName=profile?.name?.trim().split(/\s+/)[0]||'there';
 const saved=items.slice(0,2).map(item=>({
  item,
  scheme:scholarshipSchemes.find(s=>s.id===item.opportunityId)
 })).filter(x=>x.scheme);

 return <div className="overview-page">
  <section className="overview-hero">
   <div className="overview-hero-copy">
    <span className="overview-eyebrow"><span/> YOUR STUDENT DESK</span>
    <h1>One clear step<br/><em>at a time, <span data-user-content>{firstName}</span>.</em></h1>
    <p>Find support, prepare your documents and keep track of what matters. Start with the task you need today.</p>
    <div className="overview-hero-actions">
     <Link className="overview-main-button" href="/eligibility-checker">Find scholarships <ArrowRight size={17}/></Link>
     <Link className="overview-text-link" href="/scholarships">Browse all schemes <ArrowUpRight size={15}/></Link>
    </div>
   </div>
   <div className="overview-visual" aria-hidden="true">
    <div className="overview-visual-ring ring-one"/>
    <div className="overview-visual-ring ring-two"/>
    <div className="overview-visual-centre"><span>₹</span><b>YOUR<br/>NEXT STEP</b></div>
    <div className="overview-visual-note note-yellow"><FileCheck2 size={17}/> Documents</div>
    <div className="overview-visual-note note-white"><GraduationCap size={17}/> Scholarships</div>
   </div>
  </section>

  <section className="overview-section">
   <div className="overview-section-heading">
    <div><span className="overview-kicker">DATES TO WATCH</span><h2>Closing soon</h2><p>Check the date on the official portal before applying.</p></div>
    <Link href="/scholarships" className="overview-small-link">All scholarships <ArrowUpRight size={14}/></Link>
   </div>
   {closingSoon.length>0?<div className="overview-deadline-grid">
    {closingSoon.map((scheme,index)=><Link href={'/scholarships/'+scheme.id} className={'overview-deadline-card deadline-tone-'+index} key={scheme.id}>
     <span className="overview-deadline-tag">{scheme.deadlineStage||'Student applications'}</span>
     <h3>{scheme.shortName}</h3>
     <div className="overview-deadline-bottom"><b>{new Date(scheme.studentDeadline+'T00:00:00').toLocaleDateString('en-IN',{day:'numeric',month:'short'})}</b><span>{scheme.daysLeft===0?'Closes today':scheme.daysLeft+' days left'}</span></div>
     <small>Check details <ArrowRight size={13}/></small>
    </Link>)}
   </div>:<div className="overview-empty-deadline">
    <CalendarClock size={20}/><div><b>No verified deadline in the next 30 days.</b><span>Check the official catalogue for new dates.</span></div>
    <a href="https://scholarships.gov.in/All-Scholarships" target="_blank" rel="noreferrer">Open NSP <ArrowUpRight size={14}/></a>
   </div>}
   <div className="overview-source-note"><ShieldCheck size={13}/> Source snapshot: National Scholarship Portal, AY 2026–27 · Checked 17 Nov 2026 · Dates may change.</div>
  </section>

  <section className="overview-section">
   <div className="overview-section-heading">
    <div><span className="overview-kicker">PICK WHAT YOU NEED</span><h2>How can we help today?</h2></div>
   </div>
   <div className="overview-task-grid">
    <Link href="/eligibility-checker" className="overview-task task-yellow"><span>01</span><GraduationCap size={25}/><h3>Find scholarships</h3><p>Answer a few questions and see which schemes may fit.</p><b>Check eligibility <ArrowUpRight size={15}/></b></Link>
    <Link href="/document-review" className="overview-task task-teal"><span>02</span><FileSearch size={25}/><h3>Check a document</h3><p>Understand what it is and what to fix before upload.</p><b>Review document <ArrowUpRight size={15}/></b></Link>
    <Link href="/rejection-analyzer" className="overview-task task-coral"><span>03</span><ShieldCheck size={25}/><h3>Understand a rejection</h3><p>Paste the portal remark and get a simple action plan.</p><b>Get an explanation <ArrowUpRight size={15}/></b></Link>
   </div>
  </section>

  <section className="overview-bottom">
   <div className="overview-saved-card">
    <div className="overview-section-heading"><div><span className="overview-kicker">YOUR LIST</span><h2>Saved scholarships</h2></div><Link href="/tracker" className="overview-small-link">Open list <ArrowUpRight size={14}/></Link></div>
    {saved.length?saved.map(({item,scheme})=><Link href={'/scholarships/'+scheme!.id} className="overview-saved-row" key={item.opportunityId}><span className="overview-saved-icon">₹</span><span><b>{scheme!.shortName}</b><small>{scheme!.provider}</small></span><span className="overview-status">{item.status}</span><ArrowRight size={15}/></Link>):<div className="overview-saved-empty"><p>No saved scholarship yet.</p><Link href="/scholarships">Choose a scheme to track <ArrowRight size={14}/></Link></div>}
   </div>
   <Link href="/services" className="overview-services-card"><span className="overview-services-icon"><CalendarClock size={24}/></span><span className="overview-kicker">STUDENT SERVICES</span><h2>Make college life easier.</h2><p>Bus pass, free student software, education finance and digital records — all in one place.</p><b>Explore student services <ArrowUpRight size={16}/></b></Link>
  </section>
 </div>;
}
