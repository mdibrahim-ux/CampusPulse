'use client';

import Link from 'next/link';
import {useEffect,useMemo,useState} from 'react';
import {motion} from 'framer-motion';
import {
  ArrowRight,ArrowUpRight,Bookmark,CalendarClock,CheckCircle2,
  FileSearch,GraduationCap,ShieldCheck,ClipboardCheck,CalendarDays
} from 'lucide-react';
import {SectionHeading} from '@/components/section-heading';
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
    <SectionHeading
      eyebrow="YOUR CAMPUSPULSE / OVERVIEW"
      title="Your student support workspace."
      description="A clear place to find scholarships, prepare documents and keep track of what needs attention."
      action={<Link href="/eligibility-checker" className="button button-primary">Check eligibility <ArrowRight size={16}/></Link>}
    />

    <section className="overview-quick-grid" aria-label="Start a task">
      <Link href="/scholarships" className="overview-quick-card quick-card-lime">
        <span className="overview-quick-icon"><GraduationCap size={21}/></span>
        <span className="overview-quick-copy"><b>Find scholarships</b><small>Browse schemes and official conditions</small></span>
        <ArrowUpRight size={17}/>
      </Link>
      <Link href="/document-review" className="overview-quick-card quick-card-blue">
        <span className="overview-quick-icon"><FileSearch size={20}/></span>
        <span className="overview-quick-copy"><b>Review a document</b><small>Understand its purpose and visible details</small></span>
        <ArrowUpRight size={17}/>
      </Link>
      <Link href="/rejection-analyzer" className="overview-quick-card quick-card-neutral">
        <span className="overview-quick-icon"><ShieldCheck size={20}/></span>
        <span className="overview-quick-copy"><b>Understand a portal remark</b><small>Separate a defect from a rejection</small></span>
        <ArrowUpRight size={17}/>
      </Link>
    </section>

    <section className="overview-section">
      <div className="overview-section-heading">
        <div><span className="eyebrow">APPLICATION WINDOWS</span><h2>Deadlines to keep in view.</h2><p>Student application deadlines in the current CampusPulse reference set.</p></div>
        <Link href="/scholarships" className="text-link">All schemes <ArrowUpRight size={14}/></Link>
      </div>
      <div className="overview-data-grid">
        <div className="overview-panel deadlines-panel">
          <div className="overview-panel-head"><span><CalendarClock size={16}/> STUDENT APPLICATION DEADLINES</span><b>{closingSoon.length.toString().padStart(2,'0')} IN NEXT 30 DAYS</b></div>
          {closingSoon.length>0?<div className="deadline-list">{closingSoon.map((scheme,index)=><Link key={scheme.id} href={'/scholarships/'+scheme.id} className="deadline-item">
            <span className="deadline-index">{String(index+1).padStart(2,'0')}</span>
            <span className="deadline-name"><b>{scheme.shortName}</b><small>{scheme.provider}</small></span>
            <span className="deadline-date"><b>{new Date(scheme.studentDeadline+'T00:00:00').toLocaleDateString('en-IN',{day:'2-digit',month:'short'})}</b><small>{scheme.daysLeft===0?'Closes today':scheme.daysLeft+' days left'}</small></span>
            <ArrowUpRight size={15}/>
          </Link>)}</div>:<div className="overview-empty"><CalendarClock size={20}/><div><b>No verified student deadline in the next 30 days.</b><small>Check the official directory for newly published dates.</small></div></div>}
          <div className="overview-footnote"><ShieldCheck size={13}/> NSP reference snapshot checked 17 November 2026. Reconfirm every date on the official portal.</div>
        </div>

        <div className="overview-panel reference-panel">
          <div className="overview-panel-head"><span><ClipboardCheck size={16}/> SCHEME REFERENCE SET</span><b>LOCAL DATA</b></div>
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
      <Link href="/services" className="button button-secondary">Explore student services <ArrowUpRight size={15}/></Link>
    </section>
  </div>;
}
