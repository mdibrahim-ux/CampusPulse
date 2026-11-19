'use client';

import Link from 'next/link';
import {usePathname} from 'next/navigation';
import {AnimatePresence,MotionConfig,motion} from 'framer-motion';
import {useEffect,useState} from 'react';
import {
  ArrowRight,Bookmark,CalendarDays,ChevronDown,FileSearch,
  GraduationCap,LayoutGrid,ListChecks,Menu,ShieldAlert,UserRound,
  X,BriefcaseBusiness,Zap
} from 'lucide-react';
import {getProfile} from '@/lib/storage';
import {LanguageSelector} from '@/components/language-selector';
import type {StudentProfile} from '@/lib/types';

const primary=[
  {href:'/dashboard',label:'Overview',icon:LayoutGrid},
  {href:'/scholarships',label:'Scholarships',icon:GraduationCap},
  {href:'/eligibility-checker',label:'Eligibility',icon:ListChecks},
  {href:'/services',label:'Services',icon:BriefcaseBusiness},
];

const workspace=[
  {href:'/tracker',label:'Saved schemes',icon:Bookmark,detail:'Shortlist and application status'},
  {href:'/planner',label:'My planner',icon:CalendarDays,detail:'Personal reminders and follow-ups'},
  {href:'/document-review',label:'Document review',icon:FileSearch,detail:'Understand a document before submission'},
  {href:'/rejection-analyzer',label:'Rejection help',icon:ShieldAlert,detail:'Understand a portal remark'},
  {href:'/profile',label:'My profile',icon:UserRound,detail:'Academic details and local data controls'},
];

function activePath(path:string,href:string){
  return path===href||path.startsWith(href+'/');
}

function Brand(){
  return <Link href="/dashboard" className="brand" aria-label="CampusPulse overview">
    <span className="brand-symbol"><Zap size={17} strokeWidth={2.5} fill="currentColor"/></span>
    <span className="brand-wordmark">CampusPulse<small>STUDENT SUPPORT</small></span>
  </Link>;
}

export function AppShell({children}:{children:React.ReactNode}){
  const path=usePathname();
  const [profile,setProfile]=useState<StudentProfile|null>(null);
  const [workspaceOpen,setWorkspaceOpen]=useState(false);
  const [mobileOpen,setMobileOpen]=useState(false);
  const activeWorkspace=workspace.some(item=>activePath(path,item.href));
  const pageLabel=[...primary,...workspace].find(item=>activePath(path,item.href))?.label
    ||(path.startsWith('/scholarships/')?'Scheme details':'CampusPulse');

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
        initial={{opacity:0,y:-5}}
        animate={{opacity:1,y:0}}
        transition={{duration:.24,ease:[.22,1,.36,1]}}
      >
        <div className="shell-nav">
          <Brand/>

          <nav className="primary-nav" aria-label="Primary navigation">
            {primary.map(item=>{
              const Icon=item.icon;
              const active=activePath(path,item.href);
              return <Link key={item.href} href={item.href} className={'primary-nav-link '+(active?'active':'')} aria-current={active?'page':undefined}>
                {active&&<motion.span layoutId="nav-active" className="primary-nav-active" transition={{type:'spring',stiffness:520,damping:42}}/>}
                <Icon size={15}/><span>{item.label}</span>
              </Link>;
            })}
            <div className="workspace-menu-wrap">
              <button type="button" className={'primary-nav-link workspace-trigger '+((workspaceOpen||activeWorkspace)?'active':'')} onClick={()=>setWorkspaceOpen(value=>!value)} aria-expanded={workspaceOpen} aria-haspopup="menu">
                {(workspaceOpen||activeWorkspace)&&<motion.span layoutId="nav-active" className="primary-nav-active" transition={{type:'spring',stiffness:520,damping:42}}/>}
                <LayoutGrid size={15}/><span>Workspace</span><ChevronDown size={13} className={workspaceOpen?'chevron-open':''}/>
              </button>
              <AnimatePresence>
                {workspaceOpen&&<motion.div className="workspace-popover" role="menu" initial={{opacity:0,y:5}} animate={{opacity:1,y:0}} exit={{opacity:0,y:3}} transition={{duration:.15,ease:[.22,1,.36,1]}}>
                  <div className="workspace-popover-head"><b>YOUR WORKSPACE</b><small>Saved work and practical tools</small></div>
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
        {mobileOpen&&<motion.nav id="mobile-navigation" className="mobile-navigation" aria-label="Mobile navigation" initial={{opacity:0,y:-5}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-4}} transition={{duration:.15,ease:[.22,1,.36,1]}}>
          <div className="mobile-navigation-top"><span>EXPLORE CAMPUSPULSE</span><b>{pageLabel}</b></div>
          <div className="mobile-navigation-section">
            <small>EXPLORE</small>
            {primary.map(item=>{const Icon=item.icon;return <Link key={item.href} href={item.href} className={activePath(path,item.href)?'active':''}><Icon size={17}/><span>{item.label}</span><ArrowRight size={14}/></Link>;})}
          </div>
          <div className="mobile-navigation-section">
            <small>MY WORKSPACE</small>
            {workspace.map(item=>{const Icon=item.icon;return <Link key={item.href} href={item.href} className={activePath(path,item.href)?'active':''}><Icon size={17}/><span>{item.label}</span><ArrowRight size={14}/></Link>;})}
          </div>
          <div className="mobile-navigation-tools">
            <div><small>LANGUAGE</small><LanguageSelector/></div>
          </div>
          <Link href="/profile" className="mobile-profile-link"><UserRound size={16}/>{firstName}<ArrowRight size={14}/></Link>
        </motion.nav>}
      </AnimatePresence>

      {(workspaceOpen||mobileOpen)&&<button className="shell-dismiss-layer" aria-label="Close open navigation" onClick={()=>{setWorkspaceOpen(false);setMobileOpen(false)}}/>}

      <main className="app-main">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={path}
            className="route-stage"
            initial={{opacity:0,y:5}}
            animate={{opacity:1,y:0}}
            exit={{opacity:0,y:-2}}
            transition={{duration:.18,ease:[.22,1,.36,1]}}
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </main>

      <footer className="shell-footer">
        <Brand/>
        <span>Independent student support · Official sources linked</span>
        <span className="footer-local">LOCAL-FIRST <i/></span>
      </footer>
    </div>
  </MotionConfig>;
}
