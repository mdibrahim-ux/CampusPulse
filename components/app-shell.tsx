'use client';

import Link from 'next/link';
import {usePathname} from 'next/navigation';
import {AnimatePresence,MotionConfig,motion} from 'framer-motion';
import {useEffect,useState} from 'react';
import {
  ArrowRight,Bookmark,CalendarDays,ChevronDown,FileSearch,
  GraduationCap,LayoutGrid,ListChecks,Menu,ShieldAlert,UserRound,
  X,BriefcaseBusiness,Zap,Globe2
} from 'lucide-react';
import {getProfile} from '@/lib/storage';
import {LanguageSelector} from '@/components/language-selector';
import type {StudentProfile} from '@/lib/types';

const primary = [
  {href:'/dashboard',label:'Overview',icon:LayoutGrid},
  {href:'/scholarships',label:'Scholarships',icon:GraduationCap},
  {href:'/eligibility-checker',label:'Eligibility',icon:ListChecks},
  {href:'/services',label:'Services',icon:BriefcaseBusiness},
];

const workspace = [
  {href:'/tracker',label:'Saved schemes',icon:Bookmark,detail:'Your shortlist and application status'},
  {href:'/planner',label:'My planner',icon:CalendarDays,detail:'Personal follow-ups and reminders'},
  {href:'/document-review',label:'Document review',icon:FileSearch,detail:'Understand and check a document'},
  {href:'/rejection-analyzer',label:'Rejection help',icon:ShieldAlert,detail:'Turn a portal remark into next steps'},
  {href:'/profile',label:'My profile',icon:UserRound,detail:'Your study details and preferences'},
];

function activePath(path:string,href:string){
  return path===href||path.startsWith(href+'/');
}

function Brand(){
  return <Link href="/dashboard" className="brand" aria-label="CampusPulse overview">
    <span className="brand-symbol"><Zap size={18} strokeWidth={2.6} fill="currentColor"/></span>
    <span className="brand-wordmark">campus<span>pulse</span><small>STUDENT SUPPORT SYSTEM</small></span>
  </Link>;
}

export function AppShell({children}:{children:React.ReactNode}){
  const path=usePathname();
  const [profile,setProfile]=useState<StudentProfile|null>(null);
  const [workspaceOpen,setWorkspaceOpen]=useState(false);
  const [mobileOpen,setMobileOpen]=useState(false);
  const activeWorkspace=workspace.some(item=>activePath(path,item.href));

  useEffect(()=>{
    const sync=()=>setProfile(getProfile());
    sync();
    window.addEventListener('storage',sync);
    window.addEventListener('campuspulse-profile',sync);
    return()=>{
      window.removeEventListener('storage',sync);
      window.removeEventListener('campuspulse-profile',sync);
    };
  },[]);

  useEffect(()=>{
    setMobileOpen(false);
    setWorkspaceOpen(false);
  },[path]);

  useEffect(()=>{
    const close=(event:KeyboardEvent)=>{
      if(event.key==='Escape'){
        setMobileOpen(false);
        setWorkspaceOpen(false);
      }
    };
    window.addEventListener('keydown',close);
    return()=>window.removeEventListener('keydown',close);
  },[]);

  const initials=profile?.name?.trim()
    ?profile.name.trim().split(/\s+/).slice(0,2).map(part=>part[0]).join('').toUpperCase()
    :null;
  const firstName=profile?.name?.trim().split(/\s+/)[0]||'Profile';

  if(path==='/')return <>{children}</>;

  return <MotionConfig reducedMotion="user">
    <div className="app-frame">
      <motion.header
        className="shell-header"
        initial={{opacity:0,y:-8}}
        animate={{opacity:1,y:0}}
        transition={{duration:.34,ease:[.22,1,.36,1]}}
      >
        <div className="shell-nav">
          <Brand/>

          <nav className="primary-nav" aria-label="Primary navigation">
            {primary.map(item=>{
              const Icon=item.icon;
              const active=activePath(path,item.href);
              return <Link key={item.href} href={item.href} className={'primary-nav-link '+(active?'active':'')} aria-current={active?'page':undefined}>
                {active&&<motion.span layoutId="primary-nav-pill" className="primary-nav-active" transition={{type:'spring',stiffness:440,damping:36}}/>}
                <Icon size={15} strokeWidth={2}/>
                <span>{item.label}</span>
              </Link>;
            })}
            <div className="workspace-menu-wrap">
              <button type="button" className={'primary-nav-link workspace-trigger '+((workspaceOpen||activeWorkspace)?'active':'')} onClick={()=>setWorkspaceOpen(value=>!value)} aria-expanded={workspaceOpen} aria-haspopup="menu">
                {(workspaceOpen||activeWorkspace)&&<motion.span layoutId="primary-nav-pill" className="primary-nav-active workspace-active-bg" transition={{type:'spring',stiffness:440,damping:36}}/>}
                <span className="workspace-trigger-icon"><LayoutGrid size={15}/></span>
                <span>Workspace</span>
                <ChevronDown size={13} className={workspaceOpen?'chevron-open':''}/>
              </button>
              <AnimatePresence>
                {workspaceOpen&&<motion.div className="workspace-popover" role="menu" initial={{opacity:0,y:7,scale:.985}} animate={{opacity:1,y:0,scale:1}} exit={{opacity:0,y:5,scale:.99}} transition={{duration:.16,ease:[.22,1,.36,1]}}>
                  <div className="workspace-popover-head"><span>YOUR WORKSPACE</span><small>Your saved work and support tools</small></div>
                  {workspace.map(item=>{
                    const Icon=item.icon;
                    return <Link role="menuitem" href={item.href} key={item.href} className={'workspace-menu-item '+(activePath(path,item.href)?'active':'')}>
                      <span className="workspace-menu-icon"><Icon size={16}/></span>
                      <span><b>{item.label}</b><small>{item.detail}</small></span>
                      <ArrowRight size={13}/>
                    </Link>;
                  })}
                </motion.div>}
              </AnimatePresence>
            </div>
          </nav>

          <div className="shell-actions">
            <LanguageSelector/>
            <Link href="/profile" className={'shell-profile '+(path==='/profile'?'active':'')} aria-label="Open profile">
              <span className="shell-avatar">{initials||<UserRound size={15}/>}</span>
              <span className="shell-profile-name">{firstName}</span>
            </Link>
          </div>

          <button type="button" className="mobile-menu-button" onClick={()=>setMobileOpen(value=>!value)} aria-label={mobileOpen?'Close navigation':'Open navigation'} aria-expanded={mobileOpen} aria-controls="mobile-navigation">
            {mobileOpen?<X size={19}/>:<Menu size={19}/>}
          </button>
        </div>
      </motion.header>

      <AnimatePresence>
        {mobileOpen&&<motion.nav id="mobile-navigation" className="mobile-navigation" aria-label="Mobile navigation" initial={{opacity:0,y:-7,scale:.99}} animate={{opacity:1,y:0,scale:1}} exit={{opacity:0,y:-5,scale:.995}} transition={{duration:.17,ease:[.22,1,.36,1]}}>
          <div className="mobile-navigation-top"><span>EXPLORE CAMPUSPULSE</span><span>STUDENT SUPPORT</span></div>
          <div className="mobile-navigation-section">
            <small>EXPLORE</small>
            {primary.map(item=>{const Icon=item.icon;return <Link key={item.href} href={item.href} className={activePath(path,item.href)?'active':''}><Icon size={17}/><span>{item.label}</span><ArrowRight size={14}/></Link>;})}
          </div>
          <div className="mobile-navigation-section">
            <small>MY WORKSPACE</small>
            {workspace.map(item=>{const Icon=item.icon;return <Link key={item.href} href={item.href} className={activePath(path,item.href)?'active':''}><Icon size={17}/><span>{item.label}</span><ArrowRight size={14}/></Link>;})}
          </div>
          <div className="mobile-navigation-bottom">
            <div className="mobile-language-label"><Globe2 size={15}/> LANGUAGE</div>
            <LanguageSelector/>
            <Link href="/profile" className="mobile-profile-link"><UserRound size={15}/> {firstName}</Link>
          </div>
        </motion.nav>}
      </AnimatePresence>

      {(workspaceOpen||mobileOpen)&&<button className="shell-dismiss-layer" aria-label="Close open navigation" onClick={()=>{setWorkspaceOpen(false);setMobileOpen(false)}}/>}

      <main className="app-main">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={path}
            className="route-stage"
            initial={{opacity:0,y:6}}
            animate={{opacity:1,y:0}}
            exit={{opacity:0,y:-3}}
            transition={{duration:.22,ease:[.22,1,.36,1]}}
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </main>

      <footer className="shell-footer">
        <Brand/>
        <span>Independent student support · Official sources linked</span>
        <span className="footer-local"><i/> LOCAL-FIRST</span>
      </footer>
    </div>
  </MotionConfig>;
}
