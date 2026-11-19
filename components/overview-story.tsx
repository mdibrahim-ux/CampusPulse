'use client';

import {useState} from 'react';
import {AnimatePresence,motion,useReducedMotion} from 'framer-motion';
import {
  ArrowRight,Check,FileCheck2,FileText,GraduationCap,ShieldCheck,
  Sparkles,UserRound,Wallet
} from 'lucide-react';

const stages=[
  {
    number:'01',
    label:'Your situation',
    title:'Start with what you have.',
    body:'Share your education details and tick the documents already available. You stay in control of what you enter.',
    foot:'No portal login. No Aadhaar or bank numbers.',
    icon:UserRound,
    tone:'indigo'
  },
  {
    number:'02',
    label:'Scheme matching',
    title:'Compare rules, not guesses.',
    body:'CampusPulse checks your answers against the conditions recorded for each scheme and explains what matches or is still unknown.',
    foot:'Potential match is guidance — the authority makes the decision.',
    icon:GraduationCap,
    tone:'teal'
  },
  {
    number:'03',
    label:'Your next action',
    title:'Know what to prepare next.',
    body:'Review missing documents, understand a portal defect, and keep the official application and follow-up in one place.',
    foot:'Official scheme portals remain the source of truth.',
    icon:FileCheck2,
    tone:'amber'
  }
];

function StepIllustration({step}:{step:number}){
  const reduced=useReducedMotion();
  const transition=reduced?{duration:.01}:{duration:.45,ease:[.22,1,.36,1] as const};
  return <div className={'journey-visual journey-'+step}>
    <div className="journey-visual-top"><span><i/> CAMPUSPULSE / WORKFLOW PREVIEW</span><span>0{step+1} — 03</span></div>
    <div className="journey-visual-grid"/>
    <svg className="journey-connectors" viewBox="0 0 620 340" fill="none" aria-hidden="true">
      <motion.path d="M105 172 C170 52 260 52 310 172 S455 292 515 172" stroke="url(#journeyLine)" strokeWidth="2" strokeDasharray="5 8" initial={{pathLength:0}} animate={{pathLength:1}} transition={{duration:reduced?.01:1.15,ease:'easeInOut'}}/>
      <defs><linearGradient id="journeyLine" x1="105" y1="172" x2="515" y2="172" gradientUnits="userSpaceOnUse"><stop stopColor="#7187FF"/><stop offset=".52" stopColor="#56C7AD"/><stop offset="1" stopColor="#D7AB67"/></linearGradient></defs>
    </svg>
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={step}
        className="journey-window"
        initial={reduced?{opacity:0}:{opacity:0,y:14,scale:.975}}
        animate={{opacity:1,y:0,scale:1}}
        exit={reduced?{opacity:0}:{opacity:0,y:-8,scale:.985}}
        transition={transition}
      >
        <div className="journey-window-bar"><span/><span/><span/><b>{step===0?'YOUR STUDY PROFILE':step===1?'SCHEME COMPARISON':'NEXT ACTIONS'}</b><i>•••</i></div>
        {step===0&&<div className="journey-profile-preview">
          <div className="journey-profile-head"><span className="journey-avatar"><UserRound size={18}/></span><span><b>Student profile</b><small>Basic study information</small></span><span className="journey-private"><ShieldCheck size={12}/> PRIVATE</span></div>
          <div className="journey-field-grid"><span><small>STUDY LEVEL</small><b>Undergraduate</b></span><span><small>COURSE TYPE</small><b>Regular / full-time</b></span><span><small>DOCUMENTS</small><b>Income · Marksheets</b></span><span><small>PROFILE</small><b>Ready to compare</b></span></div>
          <div className="journey-document-row"><FileText size={17}/><span><b>Document checklist</b><small>Choose only the documents you have</small></span><span className="journey-checks"><i/><i/><i/></span></div>
        </div>}
        {step===1&&<div className="journey-match-preview">
          <div className="journey-match-title"><span className="journey-match-icon"><GraduationCap size={18}/></span><span><b>Scheme comparison</b><small>Published conditions · Reference set</small></span><span className="journey-match-live">MATCHING</span></div>
          <div className="journey-match-track"><i/><i/><i/><i/><i/></div>
          <div className="journey-match-result"><span className="journey-match-result-icon"><Check size={17}/></span><span><b>Potential match</b><small>Conditions that match are listed with their source.</small></span><span className="journey-result-arrow">↗</span></div>
          <div className="journey-unknown-result"><span/>Items needing confirmation are kept separate from matches.</div>
        </div>}
        {step===2&&<div className="journey-actions-preview">
          <div className="journey-action-head"><span><Sparkles size={17}/></span><span><b>Your preparation plan</b><small>Based on the scheme you selected</small></span></div>
          <div className="journey-action-item"><span className="journey-action-number">01</span><span><b>Check current scheme conditions</b><small>Open the official scheme source</small></span><ArrowRight size={14}/></div>
          <div className="journey-action-item"><span className="journey-action-number">02</span><span><b>Review the document checklist</b><small>Confirm format and issuing authority</small></span><ArrowRight size={14}/></div>
          <div className="journey-action-item"><span className="journey-action-number">03</span><span><b>Track your application steps</b><small>Keep your own reminders here</small></span><ArrowRight size={14}/></div>
        </div>}
      </motion.div>
    </AnimatePresence>
    <div className="journey-orbit orbit-left"><Wallet size={15}/></div>
    <div className="journey-orbit orbit-right"><ShieldCheck size={15}/></div>
    <div className="journey-visual-caption">ILLUSTRATIVE PRODUCT FLOW · NOT A LIVE ELIGIBILITY DECISION</div>
  </div>;
}

export function OverviewStory(){
  const [active,setActive]=useState(0);
  const reduce=useReducedMotion();
  const current=stages[active];
  return <section className="overview-story" aria-labelledby="overview-story-title">
    <div className="story-heading">
      <span className="section-kicker">A CLEARER WAY THROUGH THE PROCESS</span>
      <h2 id="overview-story-title">From uncertainty<br/><em>to a next step.</em></h2>
      <p>Three connected steps. You choose what to share, understand what the rules say, and decide what to do next.</p>
    </div>
    <div className="story-layout">
      <StepIllustration step={active}/>
      <div className="story-step-list">
        {stages.map((stage,index)=>{
          const StageIcon=stage.icon;
          const selected=active===index;
          return <button type="button" key={stage.number} className={'story-step '+(selected?'active':'')} onClick={()=>setActive(index)} aria-pressed={selected}>
            <span className="story-step-number">{stage.number}</span>
            <span className={'story-step-icon tone-'+stage.tone}><StageIcon size={18}/></span>
            <span className="story-step-copy"><b>{stage.label}</b><strong>{stage.title}</strong><small>{stage.body}</small>{selected&&<motion.i className="story-step-progress" layoutId="story-progress" transition={{duration:reduce?.01:.25}}/>}</span>
            <ArrowRight size={15} className="story-step-arrow"/>
          </button>;
        })}
        <div className="story-step-foot"><ShieldCheck size={14}/><span>{current.foot}</span><span className="story-step-index">STEP 0{active+1} / 03</span></div>
      </div>
    </div>
  </section>;
}
