'use client';

import Link from 'next/link';
import {useEffect,useMemo,useState} from 'react';
import {motion} from 'framer-motion';
import {
  ArrowRight,ArrowUpRight,Bookmark,CalendarClock,CheckCircle2,
  FileSearch,GraduationCap,ShieldCheck,ClipboardCheck,CalendarDays,
  ListChecks
} from 'lucide-react';
import {scholarshipSchemes} from '@/lib/scholarships';
import {getReminders,getTracker} from '@/lib/storage';
import type {Reminder,TrackerItem} from '@/lib/types';

export default function DashboardPage(){
  const [items,setItems]=useState<TrackerItem[]>([]);
  const [reminders,setReminders]=useState<Reminder[]>([]);

  useEffect(()=>{
    const sync=()=>{
      setItems(getTracker());
      setReminders(getReminders());
    };
    sync();
    window.addEventListener('storage',sync);
    window.addEventListener('campuspulse-tracker',sync);
    window.addEventListener('campuspulse-reminders',sync);
    return()=>{
      window.removeEventListener('storage',sync);
      window.removeEventListener('campuspulse-tracker',sync);
      window.removeEventListener('campuspulse-reminders',sync);
    };
  },[]);

  const closingSoon=useMemo(()=>scholarshipSchemes
    .filter(s=>s.studentDeadline)
    .map(s=>({...s,daysLeft:Math.ceil((new Date(s.studentDeadline+'T23:59:59').getTime()-Date.now())/86400000)}))
    .filter(s=>s.daysLeft>=0&&s.daysLeft<=30)
    .sort((a,b)=>a.daysLeft-b.daysLeft)
    .slice(0,4),[]);

  const categories=useMemo(()=>{
    const tally=new Map<string,number>();
    scholarshipSchemes.forEach(s=>{
      const category=s.category.split('·')[0].trim();
      tally.set(category,(tally.get(category)||0)+1);
    });
    return Array.from(tally.entries()).map(([label,count])=>({label,count,share:count/scholarshipSchemes.length}));
  },[]);

  const saved=items.slice(0,4).map(item=>({
    item,
    scheme:scholarshipSchemes.find(s=>s.id===item.opportunityId)
  })).filter(x=>x.scheme);

  const nextReminders=reminders.filter(item=>!item.done).sort((a,b)=>a.date.localeCompare(b.date)).slice(0,4);

  return <div className="overview-page">
    <section className="overview-hero" aria-labelledby="overview-title">
      <motion.div className="overview-hero-copy" initial={{opacity:0,y:12}} animate={{opacity:1,y:0}} transition={{duration:.36,ease:[.22,1,.36,1]}}>
        <span className="hero-eyebrow"><i/> Student Support / Made Clear</span>
        <h1 id="overview-title">Your next move.<br/><em>Made clearer.</em></h1>
        <p>Find scholarships, understand eligibility and prepare your documents with one clear student-support workspace.</p>
        <div className="overview-hero-actions">
          <Link href="/eligibility-checker" className="button button-primary">Check eligibility <span className="button-icon-circle"><ArrowRight size={16}/></span></Link>
          <Link href="/scholarships" className="button button-secondary">Explore scholarships <span className="button-icon-circle"><ArrowUpRight size={16}/></span></Link>
        </div>
        <div className="overview-hero-footnote"><span>01 DISCOVER</span><i>/</i><span>02 CHECK</span><i>/</i><span>03 PREPARE</span></div>
      </motion.div>

      <motion.aside className="overview-hero-panel" aria-label="How CampusPulse helps" initial={{opacity:0,x:12}} animate={{opacity:1,x:0}} transition={{duration:.42,delay:.08,ease:[.22,1,.36,1]}}>
        <div className="hero-panel-top"><span className="eyebrow">The student support route</span><span className="hero-panel-index">01 — 03</span></div>
        <h2 className="hero-panel-title">Less confusion.<br/>More direction.</h2>
        <div className="overview-route-list">
          <div className="overview-route-step">
            <span className="overview-route-icon is-coral"><GraduationCap size={20}/></span>
            <span><b>Discover what is available</b><small>Browse scholarships and practical student services</small></span>
          </div>
          <div className="overview-route-step">
            <span className="overview-route-icon is-blue"><ListChecks size={20}/></span>
            <span><b>Check the published criteria</b><small>Compare scheme conditions with your details</small></span>
          </div>
          <div className="overview-route-step">
            <span className="overview-route-icon is-amber"><FileSearch size={20}/></span>
            <span><b>Prepare your next steps</b><small>Review documents and understand portal remarks</small></span>
          </div>
        </div>
        <div className="hero-panel-note"><ShieldCheck size={15}/> Independent guide · Official sources linked</div>
      </motion.aside>
    </section>

    <section className="overview-section">
      <div className="overview-section-heading">
        <div><span className="eyebrow">START WITH WHAT YOU NEED</span><h2>Make the next step yours.</h2><p>Direct routes to the most useful student-support tasks.</p></div>
      </div>
      <div className="overview-quick-grid" aria-label="Start a task">
        <Link href="/scholarships" className="overview-quick-card quick-card-lime">
          <span className="overview-quick-icon"><GraduationCap size={23}/></span>
          <span className="overview-quick-copy"><b>Find scholarships</b><small>Explore schemes, official conditions and application windows</small></span>
          <ArrowUpRight size={18}/>
        </Link>
        <Link href="/rejection-analyzer" className="overview-quick-card quick-card-blue">
          <span className="overview-quick-icon"><ShieldCheck size={22}/></span>
          <span className="overview-quick-copy"><b>Understand a portal remark</b><small>Make sense of defects, document requests and status messages</small></span>
          <ArrowUpRight size={18}/>
        </Link>
        <Link href="/document-review" className="overview-quick-card quick-card-neutral">
          <span className="overview-quick-icon"><FileSearch size={22}/></span>
          <span className="overview-quick-copy"><b>Review a document</b><small>Understand its purpose and visible quality issues</small></span>
          <ArrowUpRight size={18}/>
        </Link>
      </div>
    </section>

    <section className="overview-section">
      <div className="overview-section-heading">
        <div><span className="eyebrow">APPLICATION WINDOWS</span><h2>Deadlines to keep in view.</h2><p>Student application deadlines in the current CampusPulse reference set.</p></div>
        <Link href="/scholarships" className="text-link">All schemes <ArrowUpRight size={14}/></Link>
      </div>
      <div className="overview-data-grid">
        <div className="overview-panel deadlines-panel">
          <div className="overview-panel-head"><span><CalendarClock size={16}/> Student application deadlines</span><b>{closingSoon.length.toString().padStart(2,'0')} IN NEXT 30 DAYS</b></div>
          {closingSoon.length>0?<div className="deadline-list">{closingSoon.map((scheme,index)=><Link key={scheme.id} href={'/scholarships/'+scheme.id} className="deadline-item">
            <span className="deadline-index">{String(index+1).padStart(2,'0')}</span>
            <span className="deadline-name"><b>{scheme.shortName}</b><small>{scheme.provider}</small></span>
            <span className="deadline-date"><b>{new Date(scheme.studentDeadline+'T00:00:00').toLocaleDateString('en-IN',{day:'2-digit',month:'short'})}</b><small>{scheme.daysLeft===0?'Closes today':scheme.daysLeft+' days left'}</small></span>
            <ArrowUpRight size={15}/>
          </Link>)}</div>:<div className="overview-empty"><CalendarClock size={20}/><div><b>No verified student deadline in the next 30 days.</b><small>Check the official directory for newly published dates.</small></div></div>}
          <div className="overview-footnote"><ShieldCheck size={13}/> NSP reference snapshot checked 17 November 2026. Reconfirm every date on the official portal.</div>
        </div>

        <div className="overview-panel reference-panel">
          <div className="overview-panel-head"><span><ClipboardCheck size={16}/> Scheme reference set</span><b>LOCAL DATA</b></div>
          <div className="reference-total"><strong>{scholarshipSchemes.length.toString().padStart(2,'0')}</strong><span>CURATED SCHEME<br/>RECORDS</span></div>
          <div className="category-chart" role="img" aria-label={'Scheme categories in the current reference set: '+categories.map(c=>c.label+' '+c.count).join(', ')}>
            {categories.map((category,index)=><div className="category-row" key={category.label}>
              <div><span>{category.label}</span><b>{category.count}</b></div>
              <span className="category-track"><motion.i initial={{scaleX:0}} whileInView={{scaleX:category.share}} viewport={{once:true,amount:.7}} transition={{duration:.48,delay:index*.06,ease:[.22,1,.36,1]}} className={'category-fill category-fill-'+index}/></span>
            </div>)}
          </div>
          <div className="overview-footnote">Counts describe the {scholarshipSchemes.length} scheme records currently stored in CampusPulse, not the full national catalogue.</div>
        </div>
      </div>
    </section>

    <section className="overview-workspace-grid">
      <div className="overview-section overview-list-section">
        <div className="overview-section-heading">
          <div><span className="eyebrow">YOUR SHORTLIST</span><h2>Saved scholarships.</h2></div>
          <Link href="/tracker" className="text-link">Open tracker <ArrowUpRight size={14}/></Link>
        </div>
        <div className="overview-panel list-panel">
          {saved.length>0?<div className="saved-list">{saved.map(({item,scheme})=><Link href={'/scholarships/'+scheme!.id} key={item.opportunityId} className="saved-item">
            <span className="saved-symbol">₹</span><span className="saved-copy"><b>{scheme!.shortName}</b><small>{scheme!.provider}</small></span><span className="status-chip">{item.status}</span><ArrowRight size={14}/>
          </Link>)}</div>:<div className="overview-empty"><Bookmark size={20}/><div><b>Your shortlist is empty.</b><small>Save a scheme from the directory to keep its details and progress together.</small><Link href="/scholarships" className="text-link">Browse scholarships <ArrowRight size={13}/></Link></div></div>}
        </div>
      </div>

      <div className="overview-section overview-list-section">
        <div className="overview-section-heading">
          <div><span className="eyebrow">PERSONAL FOLLOW-UPS</span><h2>Upcoming reminders.</h2></div>
          <Link href="/planner" className="text-link">Open planner <ArrowUpRight size={14}/></Link>
        </div>
        <div className="overview-panel list-panel">
          {nextReminders.length>0?<div className="reminder-list">{nextReminders.map(item=><div className="overview-reminder" key={item.id}>
            <span className="reminder-mark"><CalendarDays size={15}/></span><span><b>{item.title}</b><small>{new Date(item.date+'T00:00:00').toLocaleDateString('en-IN',{day:'numeric',month:'short',year:'numeric'})} · Personal reminder</small></span>
          </div>)}</div>:<div className="overview-empty"><CheckCircle2 size={20}/><div><b>No personal reminders yet.</b><small>Add a follow-up date when you have something to remember.</small><Link href="/planner" className="text-link">Create a reminder <ArrowRight size={13}/></Link></div></div>}
        </div>
      </div>
    </section>

    <section className="overview-services-strip">
      <div><span className="eyebrow">BEYOND SCHOLARSHIPS</span><h2>Useful services for student life.</h2><p>Transport passes, academic records, education finance and student software offers.</p></div>
      <Link href="/services" className="button button-secondary">Explore student services <span className="button-icon-circle"><ArrowUpRight size={15}/></span></Link>
    </section>
  </div>;
}
