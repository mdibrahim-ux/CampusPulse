'use client';

import Link from 'next/link';
import {useEffect,useMemo,useState} from 'react';
import {motion} from 'framer-motion';
import {
  ArrowRight,ArrowUpRight,Bookmark,CalendarClock,Check,
  ChevronRight,FileSearch,GraduationCap,ShieldCheck,Sparkles
} from 'lucide-react';
import {scholarshipSchemes} from '@/lib/scholarships';
import {getTracker} from '@/lib/storage';
import type {TrackerItem} from '@/lib/types';
import {OverviewStory} from '@/components/overview-story';

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

  const categories=useMemo(()=>{
    const tally=new Map<string,number>();
    scholarshipSchemes.forEach(s=>{
      const category=s.category.split('·')[0].trim();
      tally.set(category,(tally.get(category)||0)+1);
    });
    return Array.from(tally.entries()).map(([label,count])=>({label,count,share:count/scholarshipSchemes.length}));
  },[]);

  const saved=items.slice(0,3).map(item=>({
    item,
    scheme:scholarshipSchemes.find(s=>s.id===item.opportunityId)
  })).filter(x=>x.scheme);

  return <div className="overview-page">
    <section className="overview-hero">
      <div className="overview-hero-copy">
        <div className="overview-eyebrow"><span className="overview-live-dot"/> YOUR STUDENT SUPPORT SPACE <span>ACADEMIC YEAR 2026–27</span></div>
        <h1>Find your way<br/>to <em>what’s next.</em></h1>
        <p>Scholarship rules, document requirements and portal remarks can be hard to navigate. CampusPulse turns them into clear, practical next steps.</p>
        <div className="overview-hero-actions">
          <Link href="/eligibility-checker" className="overview-primary-action">Check my eligibility <ArrowRight size={16}/></Link>
          <Link href="/scholarships" className="overview-secondary-action">Explore scholarships <ArrowUpRight size={15}/></Link>
        </div>
        <div className="overview-trust-line"><ShieldCheck size={14}/> Independent guidance <i/> Official scheme sources <i/> Your data stays in your browser unless you choose AI review</div>
      </div>
      <div className="overview-hero-visual" aria-hidden="true">
        <div className="hero-visual-grid"/>
        <motion.div className="hero-visual-ring hero-ring-one" animate={{rotate:360}} transition={{duration:48,repeat:Infinity,ease:'linear'}}/>
        <motion.div className="hero-visual-ring hero-ring-two" animate={{rotate:-360}} transition={{duration:62,repeat:Infinity,ease:'linear'}}/>
        <motion.div className="hero-core" animate={{y:[0,-7,0]}} transition={{duration:5,repeat:Infinity,ease:'easeInOut'}}>
          <span>CP</span><b>YOUR NEXT<br/>STEP, MADE<br/>CLEAR.</b>
        </motion.div>
        <motion.div className="hero-float hero-float-top" animate={{y:[0,-5,0],rotate:[-4,-2,-4]}} transition={{duration:4.8,repeat:Infinity,ease:'easeInOut'}}>
          <span className="hero-float-icon"><GraduationCap size={16}/></span><span><small>DISCOVER</small><b>Scholarship fit</b></span><i><Check size={12}/></i>
        </motion.div>
        <motion.div className="hero-float hero-float-bottom" animate={{y:[0,6,0],rotate:[3,1,3]}} transition={{duration:5.4,repeat:Infinity,ease:'easeInOut'}}>
          <span className="hero-float-icon teal"><FileSearch size={16}/></span><span><small>PREPARE</small><b>Document clarity</b></span><i><ArrowUpRight size={12}/></i>
        </motion.div>
        <span className="hero-visual-coordinate">STUDENT SUPPORT / INDIA</span>
      </div>
    </section>

    <OverviewStory/>

    <section className="overview-intelligence">
      <div className="overview-section-heading">
        <div><span className="section-kicker">YOUR NEXT CHECKPOINTS</span><h2>Stay ahead of the window.</h2><p>Deadlines below are student application dates recorded in the current reference set.</p></div>
        <Link href="/scholarships" className="section-inline-link">All schemes <ArrowUpRight size={14}/></Link>
      </div>
      <div className="intelligence-grid">
        <div className="deadline-module">
          <div className="module-topline"><span><CalendarClock size={15}/> UPCOMING STUDENT DEADLINES</span><span>{closingSoon.length.toString().padStart(2,'0')} FOUND</span></div>
          {closingSoon.length>0?closingSoon.map((scheme,index)=><Link key={scheme.id} href={'/scholarships/'+scheme.id} className="deadline-row">
            <span className="deadline-index">0{index+1}</span>
            <span className="deadline-main"><b>{scheme.shortName}</b><small>{scheme.provider}</small></span>
            <span className="deadline-date"><b>{new Date(scheme.studentDeadline+'T00:00:00').toLocaleDateString('en-IN',{day:'2-digit',month:'short'})}</b><small>{scheme.daysLeft===0?'Closes today':scheme.daysLeft+' days left'}</small></span>
            <ChevronRight size={15}/>
          </Link>):<div className="deadline-empty"><CalendarClock size={19}/><div><b>No verified student deadline in the next 30 days.</b><span>Check the official catalogue for newly published dates.</span></div></div>}
          <div className="module-footnote"><ShieldCheck size={13}/> NSP reference snapshot checked 17 November 2026. Reconfirm each deadline on the official portal.</div>
        </div>

        <div className="reference-module">
          <div className="module-topline"><span><Sparkles size={15}/> INSIDE THE REFERENCE SET</span><span>LOCAL DATA</span></div>
          <div className="reference-total"><b>{scholarshipSchemes.length.toString().padStart(2,'0')}</b><span>CURATED SCHEME<br/>RECORDS</span></div>
          <div className="reference-chart" role="img" aria-label={'Scheme categories in the current reference set: '+categories.map(c=>c.label+' '+c.count).join(', ')}>
            {categories.map((category,index)=><div className="reference-chart-row" key={category.label}>
              <div className="reference-chart-label"><span>{category.label}</span><b>{category.count}</b></div>
              <div className="reference-chart-track"><motion.i initial={{width:0}} whileInView={{width:(category.share*100)+'%'}} viewport={{once:true,amount:.7}} transition={{duration:.8,delay:index*.12,ease:[.22,1,.36,1]}} className={'reference-chart-fill chart-fill-'+index}/></div>
            </div>)}
          </div>
          <div className="module-footnote">Counts are calculated from the five curated scheme records currently stored in CampusPulse — not the full national catalogue.</div>
        </div>
      </div>
    </section>

    <section className="overview-continue">
      <div className="continue-heading"><span className="section-kicker">PICK UP WHERE YOU NEED HELP</span><h2>One workspace.<br/><em>Clear next actions.</em></h2></div>
      <div className="continue-actions">
        <Link href="/document-review" className="continue-action"><span className="continue-action-icon"><FileSearch size={18}/></span><span><b>Check a document</b><small>Identify it and spot visible issues.</small></span><ArrowRight size={15}/></Link>
        <Link href="/rejection-analyzer" className="continue-action"><span className="continue-action-icon"><ShieldCheck size={18}/></span><span><b>Understand a portal remark</b><small>Separate a defect from a rejection.</small></span><ArrowRight size={15}/></Link>
        <Link href="/services" className="continue-action"><span className="continue-action-icon"><Sparkles size={18}/></span><span><b>Explore student services</b><small>Transport, records, finance and tools.</small></span><ArrowRight size={15}/></Link>
      </div>
    </section>

    <section className="overview-saved-section">
      <div className="overview-section-heading">
        <div><span className="section-kicker">YOUR SHORTLIST</span><h2>Saved for later.</h2></div>
        <Link href="/tracker" className="section-inline-link">Open tracker <ArrowUpRight size={14}/></Link>
      </div>
      {saved.length>0?<div className="saved-scheme-list">{saved.map(({item,scheme})=><Link href={'/scholarships/'+scheme!.id} key={item.opportunityId} className="saved-scheme-row"><span className="saved-scheme-symbol">₹</span><span><b>{scheme!.shortName}</b><small>{scheme!.provider}</small></span><span className="saved-scheme-status">{item.status}</span><ArrowRight size={14}/></Link>)}</div>:<div className="saved-empty-state"><span><Bookmark size={18}/></span><div><b>Your shortlist is ready when you are.</b><small>Save a scheme from the directory to keep its details and your application status together.</small></div><Link href="/scholarships">Browse schemes <ArrowRight size={14}/></Link></div>}
    </section>
  </div>;
}
