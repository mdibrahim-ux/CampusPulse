'use client';

import Link from 'next/link';
import {useEffect,useMemo,useState} from 'react';
import {motion} from 'framer-motion';
import {
  ArrowRight,ArrowUpRight,Bookmark,CalendarClock,Check,
  Clock3,FileSearch,GraduationCap,ShieldCheck,Sparkles,Star,Zap
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

  return <div className="comic-home">
    <section className="comic-hero" aria-labelledby="comic-home-title">
      <div className="comic-hero-topline">
        <span><i/> CAMPUSPULSE FIELD GUIDE</span>
        <span className="comic-issue">STUDENT EDITION <b>№ 01</b></span>
      </div>

      <div className="comic-hero-grid">
        <div className="comic-hero-copy">
          <div className="comic-kicker"><Zap size={13} fill="currentColor"/> LESS CONFUSION. MORE FORWARD.</div>
          <h1 id="comic-home-title">YOUR NEXT<br/><span>BIG MOVE</span><b>STARTS HERE.</b></h1>
          <p>Scholarships, documents and student support—broken into clear steps, so you can focus on what comes next.</p>
          <div className="comic-hero-actions">
            <Link href="/eligibility-checker" className="comic-button comic-button-primary">Check my eligibility <ArrowRight size={17}/></Link>
            <Link href="/scholarships" className="comic-button comic-button-secondary">Explore scholarships <ArrowUpRight size={16}/></Link>
          </div>
          <div className="comic-trust-tags">
            <span><ShieldCheck size={13}/> Official sources linked</span>
            <i/>
            <span><Bookmark size={13}/> Your shortlist stays yours</span>
          </div>
        </div>

        <div className="comic-hero-art" aria-label="Illustration of a student scholarship checklist">
          <div className="comic-art-grid"/>
          <div className="comic-speed-lines"/>
          <motion.div className="comic-sticker comic-sticker-top" initial={{opacity:0,scale:.7,rotate:12}} animate={{opacity:1,scale:1,rotate:8}} transition={{duration:.55,delay:.2,type:'spring',stiffness:180,damping:13}}>
            <Star size={17} fill="currentColor"/> YOUR MOVE!
          </motion.div>
          <motion.div className="comic-file-card" initial={{opacity:0,y:24,rotate:5}} animate={{opacity:1,y:0,rotate:2}} transition={{duration:.6,delay:.08,ease:[.22,1,.36,1]}}>
            <div className="comic-file-top"><span><i/><i/><i/></span><b>STUDENT CHECKLIST</b><span>↗</span></div>
            <div className="comic-file-title"><small>MISSION 01 / GET PREPARED</small><strong>Make your<br/>next step count.</strong></div>
            <div className="comic-file-rule"/>
            <div className="comic-file-task"><span className="comic-check"><Check size={12}/></span><span><b>Find a relevant scheme</b><small>Compare published conditions</small></span><span className="comic-task-arrow">↗</span></div>
            <div className="comic-file-task"><span className="comic-check"><Check size={12}/></span><span><b>Prepare your documents</b><small>Know what is still missing</small></span><span className="comic-task-arrow">↗</span></div>
            <div className="comic-file-task"><span className="comic-check"><Check size={12}/></span><span><b>Plan the next action</b><small>Keep track of your follow-up</small></span><span className="comic-task-arrow">↗</span></div>
            <div className="comic-file-footer"><span>YOUR PERSONAL WORKSPACE</span><span>CP / 01</span></div>
          </motion.div>
          <motion.div className="comic-speech-bubble" initial={{opacity:0,x:18,y:10}} animate={{opacity:1,x:0,y:0}} transition={{duration:.45,delay:.35}}>
            <span>HEY, STUDENT!</span><b>YOU'VE GOT<br/>THIS.</b>
          </motion.div>
          <motion.div className="comic-orbit-stamp" animate={{rotate:[-7,1,-7],y:[0,-5,0]}} transition={{duration:5.2,repeat:Infinity,ease:'easeInOut'}}>
            <span>ONE STEP<br/>AT A TIME</span><ArrowRight size={18}/>
          </motion.div>
          <div className="comic-art-caption">ILLUSTRATIVE WORKSPACE PREVIEW</div>
        </div>
      </div>

      <div className="comic-hero-bottom">
        <span>01 <b>DISCOVER</b></span><i/><span>02 <b>PREPARE</b></span><i/><span>03 <b>MOVE FORWARD</b></span>
        <span className="comic-bottom-note">BUILT FOR REAL STUDENT TASKS <Sparkles size={13}/></span>
      </div>
    </section>

    <section className="comic-moves" aria-labelledby="comic-moves-title">
      <div className="comic-section-heading">
        <div><span className="comic-overline">PICK YOUR NEXT MOVE / 01—03</span><h2 id="comic-moves-title">What do you need<br/><em>help with today?</em></h2></div>
        <span className="comic-side-note">NO MAZE. JUST THE NEXT STEP.</span>
      </div>
      <div className="comic-action-grid">
        <Link href="/eligibility-checker" className="comic-action-card comic-action-eligibility">
          <div className="comic-card-top"><span className="comic-card-number">01</span><span className="comic-card-icon"><GraduationCap size={23}/></span><ArrowUpRight size={17}/></div>
          <span className="comic-card-label">FIND YOUR FIT</span>
          <h3>Check your<br/>eligibility.</h3>
          <p>Compare your study details and available documents with the scheme conditions.</p>
          <span className="comic-card-link">START MATCHING <ArrowRight size={14}/></span>
          <span className="comic-card-decoration">?</span>
        </Link>
        <Link href="/document-review" className="comic-action-card comic-action-documents">
          <div className="comic-card-top"><span className="comic-card-number">02</span><span className="comic-card-icon"><FileSearch size={22}/></span><ArrowUpRight size={17}/></div>
          <span className="comic-card-label">GET PAPER-READY</span>
          <h3>Make sense of<br/>your documents.</h3>
          <p>Understand a document, why it is needed, and which visible details may need attention.</p>
          <span className="comic-card-link">REVIEW A DOCUMENT <ArrowRight size={14}/></span>
          <span className="comic-card-decoration">!</span>
        </Link>
        <Link href="/rejection-analyzer" className="comic-action-card comic-action-rejection">
          <div className="comic-card-top"><span className="comic-card-number">03</span><span className="comic-card-icon"><ShieldCheck size={22}/></span><ArrowUpRight size={17}/></div>
          <span className="comic-card-label">TURN AROUND A SETBACK</span>
          <h3>Decode a portal<br/>remark.</h3>
          <p>Understand what a rejection or defect message says and identify practical next steps.</p>
          <span className="comic-card-link">UNDERSTAND THE REMARK <ArrowRight size={14}/></span>
          <span className="comic-card-decoration">↗</span>
        </Link>
      </div>
    </section>

    <section className="comic-deadline-section" aria-labelledby="comic-deadline-title">
      <div className="comic-section-heading">
        <div><span className="comic-overline">DON'T MISS THE WINDOW / LIVE FROM YOUR REFERENCE SET</span><h2 id="comic-deadline-title">Deadline <em>watch.</em></h2></div>
        <Link href="/scholarships" className="comic-pill-link">OPEN SCHEME DIRECTORY <ArrowUpRight size={14}/></Link>
      </div>
      <div className="comic-deadline-layout">
        <div className="comic-deadline-board">
          <div className="comic-board-top"><span><Clock3 size={14}/> UPCOMING STUDENT DEADLINES</span><span>{closingSoon.length.toString().padStart(2,'0')} IN RANGE</span></div>
          {closingSoon.length>0?closingSoon.map((scheme,index)=><Link key={scheme.id} href={'/scholarships/'+scheme.id} className="comic-deadline-row">
            <span className="comic-deadline-index">0{index+1}</span>
            <span className="comic-deadline-main"><b>{scheme.shortName}</b><small>{scheme.provider}</small></span>
            <span className="comic-deadline-date"><b>{new Date(scheme.studentDeadline+'T00:00:00').toLocaleDateString('en-IN',{day:'2-digit',month:'short'})}</b><small>{scheme.daysLeft===0?'Closes today':scheme.daysLeft+' days left'}</small></span>
            <ArrowUpRight size={16}/>
          </Link>):<div className="comic-deadline-empty"><CalendarClock size={21}/><div><b>No verified student deadline in the next 30 days.</b><span>Open the official catalogue and check for newly published dates.</span></div></div>}
          <div className="comic-board-foot"><ShieldCheck size={13}/> NSP reference snapshot checked 17 November 2026. Always reconfirm the current deadline on the official portal.</div>
        </div>

        <div className="comic-reference-board">
          <div className="comic-board-top"><span><Sparkles size={14}/> THE CURRENT REFERENCE FILE</span><span>LOCAL DATA</span></div>
          <div className="comic-reference-total"><b>{scholarshipSchemes.length.toString().padStart(2,'0')}</b><span>CURATED<br/>SCHEME RECORDS</span></div>
          <div className="comic-reference-chart" role="img" aria-label={'Scheme categories in the current reference set: '+categories.map(c=>c.label+' '+c.count).join(', ')}>
            {categories.map((category,index)=><div className="comic-chart-row" key={category.label}>
              <div><span>{category.label}</span><b>{category.count}</b></div>
              <span className="comic-chart-track"><motion.i initial={{width:0}} whileInView={{width:(category.share*100)+'%'}} viewport={{once:true,amount:.7}} transition={{duration:.75,delay:index*.12,ease:[.22,1,.36,1]}} className={'comic-chart-fill comic-chart-fill-'+index}/></span>
            </div>)}
          </div>
          <div className="comic-reference-foot">Calculated from the {scholarshipSchemes.length} scheme records currently stored in CampusPulse—not the full national catalogue.</div>
        </div>
      </div>
    </section>

    <section className="comic-workspace-section" aria-labelledby="comic-workspace-title">
      <div className="comic-workspace-copy"><span className="comic-overline">YOUR PERSONAL SPACE / SAVE THE THREAD</span><h2 id="comic-workspace-title">Keep your<br/><em>story moving.</em></h2><p>Save a scheme, plan a follow-up and keep your application notes together in one place.</p><Link href="/tracker" className="comic-button comic-button-secondary">Open my tracker <ArrowRight size={16}/></Link></div>
      <div className="comic-saved-board">
        <div className="comic-board-top"><span><Bookmark size={14}/> YOUR SHORTLIST</span><Link href="/tracker">VIEW TRACKER <ArrowUpRight size={13}/></Link></div>
        {saved.length>0?<div className="comic-saved-list">{saved.map(({item,scheme})=><Link href={'/scholarships/'+scheme!.id} key={item.opportunityId} className="comic-saved-row"><span className="comic-saved-mark">₹</span><span><b>{scheme!.shortName}</b><small>{scheme!.provider}</small></span><span className="comic-saved-status">{item.status}</span><ArrowRight size={14}/></Link>)}</div>:<div className="comic-saved-empty"><span className="comic-saved-illustration"><Bookmark size={23}/></span><div><b>Your first saved scheme goes here.</b><small>Browse scholarships and tap save to build your personal shortlist.</small><Link href="/scholarships" className="comic-pill-link">FIND A SCHOLARSHIP <ArrowRight size={13}/></Link></div></div>}
      </div>
    </section>

    <div className="comic-endnote"><span>THAT'S THE BRIEF.</span><b>YOUR NEXT STEP IS YOURS.</b><span>CP / STUDENT SUPPORT SYSTEM</span></div>
  </div>;
}
