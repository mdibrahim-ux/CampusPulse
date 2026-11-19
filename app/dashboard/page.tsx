'use client';

import Link from 'next/link';
import {useEffect,useMemo,useState} from 'react';
import {motion} from 'framer-motion';
import {
  ArrowRight,ArrowUpRight,Bookmark,CalendarClock,Clock3,
  FileSearch,GraduationCap,ShieldCheck,CheckCircle2,
  ClipboardCheck,BookOpenCheck,MoveUpRight
} from 'lucide-react';
import {scholarshipSchemes} from '@/lib/scholarships';
import {getTracker} from '@/lib/storage';
import type {TrackerItem} from '@/lib/types';

const workflow = [
  {
    number:'01',
    eyebrow:'START WITH YOUR CONTEXT',
    title:'Your details',
    body:'Study level, course, household context and the documents already available.',
    tags:['Study','Documents','Profile'],
    icon:ClipboardCheck,
    href:'/eligibility-checker',
    accent:'olive'
  },
  {
    number:'02',
    eyebrow:'READ THE ACTUAL CONDITIONS',
    title:'Scheme comparison',
    body:'Compare your information with published criteria, deadlines and source notes.',
    tags:['Criteria','Deadlines','Sources'],
    icon:BookOpenCheck,
    href:'/scholarships',
    accent:'rust'
  },
  {
    number:'03',
    eyebrow:'TURN INFORMATION INTO ACTION',
    title:'Next steps',
    body:'See what to prepare, understand a portal remark and keep your follow-up organized.',
    tags:['Checklist','Review','Tracker'],
    icon:MoveUpRight,
    href:'/document-review',
    accent:'slate'
  }
];

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

  return <div className="fieldguide-home">
    <motion.section
      className="fieldguide-cover"
      aria-labelledby="home-title"
      initial={{opacity:0,y:12}}
      animate={{opacity:1,y:0}}
      transition={{duration:.48,ease:[.22,1,.36,1]}}
    >
      <div className="cover-topline">
        <span className="cover-brandline"><i/> CAMPUSPULSE <b>STUDENT FIELD GUIDE</b></span>
        <span className="cover-edition">SCHOLARSHIP SUPPORT <b>VOL. 01</b></span>
      </div>

      <div className="cover-layout">
        <div className="cover-copy">
          <div className="cover-kicker"><span>01</span> KNOW THE RULES. OWN THE NEXT STEP.</div>
          <h1 id="home-title">SCHOLARSHIPS.<br/><span>WITHOUT THE</span><em>GUESSWORK.</em></h1>
          <p>Find schemes that fit your details. Understand which documents are needed. Turn confusing portal messages into practical next steps.</p>
          <div className="cover-actions">
            <Link href="/eligibility-checker" className="pill-button pill-button-primary">Check eligibility <ArrowRight size={17}/></Link>
            <Link href="/scholarships" className="pill-button pill-button-secondary">Browse scholarships <ArrowUpRight size={16}/></Link>
          </div>
          <div className="cover-assurance">
            <span><ShieldCheck size={14}/> Official sources linked</span>
            <i/>
            <span>Your information stays under your control</span>
          </div>
        </div>

        <div className="cover-storyboard" aria-label="How CampusPulse helps students">
          <div className="storyboard-heading">
            <span>THE ROUTE / 01—03</span>
            <span>THREE CLEAR STAGES</span>
          </div>
          <div className="storyboard-track" aria-hidden="true"><i/></div>
          <div className="storyboard-panels">
            {workflow.map((step,index)=>{
              const Icon=step.icon;
              return <motion.div
                key={step.number}
                className={'storyboard-panel storyboard-'+step.accent}
                initial={{opacity:0,y:14}}
                animate={{opacity:1,y:0}}
                transition={{duration:.42,delay:.12+index*.09,ease:[.22,1,.36,1]}}
              >
                <div className="storyboard-panel-top">
                  <span className="storyboard-number">{step.number}</span>
                  <span className="storyboard-icon"><Icon size={19}/></span>
                  <span className="storyboard-kicker">{step.eyebrow}</span>
                </div>
                <div className="storyboard-panel-copy">
                  <h2>{step.title}</h2>
                  <p>{step.body}</p>
                  <div className="storyboard-tags">{step.tags.map(tag=><span key={tag}>{tag}</span>)}</div>
                </div>
                <Link href={step.href} className="storyboard-arrow" aria-label={'Open '+step.title}><ArrowUpRight size={16}/></Link>
              </motion.div>;
            })}
          </div>
          <div className="storyboard-foot"><span>FROM INFORMATION</span><i/><span>TO A CLEAR NEXT ACTION</span></div>
        </div>
      </div>

      <div className="cover-bottomline">
        <span>01 <b>DISCOVER</b></span>
        <span className="cover-bottom-rule"/>
        <span>02 <b>UNDERSTAND</b></span>
        <span className="cover-bottom-rule"/>
        <span>03 <b>MOVE FORWARD</b></span>
        <span className="cover-bottom-note">A PRACTICAL TOOLKIT FOR STUDENTS</span>
      </div>
    </motion.section>

    <section className="home-actions-section" aria-labelledby="home-actions-title">
      <div className="home-section-heading">
        <div>
          <span className="home-overline">THE TOOLKIT / CHOOSE A TASK</span>
          <h2 id="home-actions-title">Start where you <em>need support.</em></h2>
        </div>
        <span className="home-section-aside">DIRECT ROUTES. NO EXTRA STEPS.</span>
      </div>
      <div className="home-action-grid">
        <motion.article className="home-action-card action-olive" initial={{opacity:0,y:16}} whileInView={{opacity:1,y:0}} viewport={{once:true,amount:.2}} transition={{duration:.42,ease:[.22,1,.36,1]}}>
          <div className="home-action-top"><span>01 / MATCH</span><GraduationCap size={21}/></div>
          <h3>Check your<br/>eligibility.</h3>
          <p>Answer a few focused questions and compare your details with scholarship conditions.</p>
          <Link href="/eligibility-checker" className="home-action-link">CHECK ELIGIBILITY <ArrowRight size={14}/></Link>
        </motion.article>
        <motion.article className="home-action-card action-rust" initial={{opacity:0,y:16}} whileInView={{opacity:1,y:0}} viewport={{once:true,amount:.2}} transition={{duration:.42,delay:.07,ease:[.22,1,.36,1]}}>
          <div className="home-action-top"><span>02 / REVIEW</span><FileSearch size={21}/></div>
          <h3>Understand your<br/>documents.</h3>
          <p>Identify a document, understand why it is needed and check visible details before applying.</p>
          <Link href="/document-review" className="home-action-link">REVIEW A DOCUMENT <ArrowRight size={14}/></Link>
        </motion.article>
        <motion.article className="home-action-card action-slate" initial={{opacity:0,y:16}} whileInView={{opacity:1,y:0}} viewport={{once:true,amount:.2}} transition={{duration:.42,delay:.14,ease:[.22,1,.36,1]}}>
          <div className="home-action-top"><span>03 / RESOLVE</span><ShieldCheck size={21}/></div>
          <h3>Decode a portal<br/>remark.</h3>
          <p>Understand whether a message is a defect or rejection, and identify sensible follow-up steps.</p>
          <Link href="/rejection-analyzer" className="home-action-link">ANALYZE A REMARK <ArrowRight size={14}/></Link>
        </motion.article>
      </div>
    </section>

    <section className="home-data-section" aria-labelledby="home-data-title">
      <div className="home-section-heading">
        <div>
          <span className="home-overline">REFERENCE DESK / CURRENT WINDOWS</span>
          <h2 id="home-data-title">Keep an eye on <em>the details.</em></h2>
        </div>
        <Link href="/scholarships" className="home-inline-link">ALL SCHOLARSHIPS <ArrowUpRight size={14}/></Link>
      </div>

      <div className="home-data-grid">
        <div className="home-deadline-panel">
          <div className="home-panel-heading"><span><CalendarClock size={15}/> STUDENT APPLICATION WINDOWS</span><span>{closingSoon.length.toString().padStart(2,'0')} IN RANGE</span></div>
          {closingSoon.length>0?closingSoon.map((scheme,index)=><Link key={scheme.id} href={'/scholarships/'+scheme.id} className="home-deadline-row">
            <span className="home-deadline-number">0{index+1}</span>
            <span className="home-deadline-main"><b>{scheme.shortName}</b><small>{scheme.provider}</small></span>
            <span className="home-deadline-date"><b>{new Date(scheme.studentDeadline+'T00:00:00').toLocaleDateString('en-IN',{day:'2-digit',month:'short'})}</b><small>{scheme.daysLeft===0?'Closes today':scheme.daysLeft+' days left'}</small></span>
            <ArrowUpRight size={15}/>
          </Link>):<div className="home-deadline-empty"><CalendarClock size={20}/><div><b>No verified student deadline in the next 30 days.</b><span>Check the official catalogue for newly published dates.</span></div></div>}
          <div className="home-data-footnote"><ShieldCheck size={13}/> NSP reference snapshot checked 17 November 2026. Reconfirm every date on the official portal.</div>
        </div>

        <div className="home-reference-panel">
          <div className="home-panel-heading"><span><BookOpenCheck size={15}/> SCHEME REFERENCE SET</span><span>LOCAL DATA</span></div>
          <div className="home-reference-total"><b>{scholarshipSchemes.length.toString().padStart(2,'0')}</b><span>CURATED SCHEME<br/>RECORDS</span></div>
          <div className="home-category-chart" role="img" aria-label={'Scheme categories in the current reference set: '+categories.map(c=>c.label+' '+c.count).join(', ')}>
            {categories.map((category,index)=><div className="home-category-row" key={category.label}>
              <div><span>{category.label}</span><b>{category.count}</b></div>
              <span className="home-category-track"><motion.i initial={{scaleX:0}} whileInView={{scaleX:category.share}} viewport={{once:true,amount:.7}} transition={{duration:.62,delay:index*.08,ease:[.22,1,.36,1]}} className={'home-category-fill fill-'+index}/></span>
            </div>)}
          </div>
          <div className="home-data-footnote">Category counts are computed from the current {scholarshipSchemes.length} curated records in CampusPulse—not the full national catalogue.</div>
        </div>
      </div>
    </section>

    <section className="home-saved-section" aria-labelledby="home-saved-title">
      <div className="home-saved-copy">
        <span className="home-overline">YOUR WORKSPACE / PERSONAL SHORTLIST</span>
        <h2 id="home-saved-title">Keep your<br/><em>next move close.</em></h2>
        <p>Save a scholarship, note your progress and keep application follow-ups together.</p>
        <Link href="/tracker" className="pill-button pill-button-secondary">Open my tracker <ArrowRight size={15}/></Link>
      </div>
      <div className="home-saved-panel">
        <div className="home-panel-heading"><span><Bookmark size={15}/> SAVED SCHEMES</span><Link href="/tracker">OPEN TRACKER <ArrowUpRight size={13}/></Link></div>
        {saved.length>0?<div className="home-saved-list">{saved.map(({item,scheme})=><Link href={'/scholarships/'+scheme!.id} key={item.opportunityId} className="home-saved-row"><span className="home-saved-symbol">₹</span><span><b>{scheme!.shortName}</b><small>{scheme!.provider}</small></span><span className="home-saved-status">{item.status}</span><ArrowRight size={14}/></Link>)}</div>:<div className="home-saved-empty"><span className="home-saved-empty-icon"><Bookmark size={21}/></span><div><b>Your shortlist is ready when you are.</b><small>Save a scheme from the directory to keep its requirements and application progress together.</small><Link href="/scholarships" className="home-inline-link">FIND A SCHOLARSHIP <ArrowRight size={13}/></Link></div></div>}
      </div>
    </section>

    <div className="home-colophon"><span>CAMPUSPULSE / STUDENT SUPPORT</span><b>CLARITY IS A GOOD NEXT STEP.</b><span>END OF ISSUE 01</span></div>
  </div>;
}
