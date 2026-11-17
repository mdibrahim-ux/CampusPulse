'use client';

import Link from 'next/link';
import {usePathname} from 'next/navigation';
import {AnimatePresence,motion} from 'framer-motion';
import {useEffect,useState} from 'react';
import {
  BookmarkCheck,CalendarDays,ChevronDown,FileSearch,GraduationCap,
  LayoutDashboard,ListChecks,ShieldAlert,UserRound,Zap,Menu,X,
  BriefcaseBusiness,Wrench,ArrowUpRight
} from 'lucide-react';
import {getProfile} from '@/lib/storage';
import {LanguageSelector} from '@/components/language-selector';
import type {StudentProfile} from '@/lib/types';

const primaryNav=[
  {href:'/dashboard',label:'Overview',icon:LayoutDashboard},
  {href:'/scholarships',label:'Scholarships',icon:GraduationCap},
  {href:'/eligibility-checker',label:'Eligibility',icon:ListChecks},
  {href:'/services',label:'Student services',icon:BriefcaseBusiness},
  {href:'/tracker',label:'Saved',icon:BookmarkCheck},
];

const toolNav=[
  {href:'/document-review',label:'Document check',icon:FileSearch,description:'Understand a document before uploading it.'},
  {href:'/rejection-analyzer',label:'Rejection help',icon:ShieldAlert,description:'Understand a portal remark and next steps.'},
  {href:'/planner',label:'My planner',icon:CalendarDays,description:'Keep personal follow-up dates in one place.'},
];

const allNav=[...primaryNav,...toolNav];

function isActive(path:string,href:string){
  return path===href||path.startsWith(href+'/');
}

export function AppShell({children}:{children:React.ReactNode}){
  const path=usePathname();
  const [open,setOpen]=useState(false);
  const [profile,setProfile]=useState<StudentProfile|null>(null);
  const toolsActive=toolNav.some(item=>isActive(path,item.href));

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

  useEffect(()=>{setOpen(false)},[path]);

  if(path==='/')return <>{children}</>;

  const active=allNav.find(item=>isActive(path,item.href))?.label
    ??(path.startsWith('/scholarships/')?'Scholarship details':path==='/profile'?'My profile':'Scholarship workspace');

  const initials=profile?.name?.trim()
    ?profile.name.trim().split(/\s+/).slice(0,2).map(part=>part[0]).join('').toUpperCase()
    :null;

  return <div className="app-frame">
    <header className="workspace-header">
      <div className="workspace-nav-inner">
        <Link href="/dashboard" className="brand" aria-label="CampusPulse overview">
          <span className="brand-mark"><Zap size={20} strokeWidth={2.7} fill="currentColor"/></span>
          <span className="brand-wordmark">campus<span>pulse</span><small>STUDENT SUPPORT, MADE CLEAR</small></span>
        </Link>

        <span className="brand-divider" aria-hidden="true"/>

        <nav className="workspace-nav" aria-label="Main navigation">
          {primaryNav.map(item=>{
            const Icon=item.icon;
            return <Link
              key={item.href}
              href={item.href}
              aria-current={isActive(path,item.href)?'page':undefined}
              className={'nav-pill '+(isActive(path,item.href)?'active':'')}
            >
              <span className="nav-icon"><Icon size={16} strokeWidth={2.4}/></span>
              <span>{item.label}</span>
            </Link>;
          })}

          <details className={'nav-more '+(toolsActive?'tools-active':'')}>
            <summary className={'nav-pill nav-more-trigger '+(toolsActive?'active':'')}>
              <span className="nav-icon"><Wrench size={16} strokeWidth={2.4}/></span>
              <span>Tools</span>
              <ChevronDown className="nav-chevron" size={14} strokeWidth={2.6}/>
            </summary>
            <div className="nav-dropdown">
              <div className="nav-dropdown-heading">
                <span>STUDENT TOOLS</span>
                <small>Practical help, one place.</small>
              </div>
              {toolNav.map(item=>{
                const Icon=item.icon;
                return <Link
                  key={item.href}
                  href={item.href}
                  aria-current={isActive(path,item.href)?'page':undefined}
                  className={'nav-dropdown-link '+(isActive(path,item.href)?'active':'')}
                >
                  <span className="nav-dropdown-icon"><Icon size={17} strokeWidth={2.3}/></span>
                  <span><b>{item.label}</b><small>{item.description}</small></span>
                  <ArrowUpRight size={14}/>
                </Link>;
              })}
            </div>
          </details>
        </nav>

        <div className="workspace-nav-actions">
          <LanguageSelector/>
          <Link href="/profile" className={'profile-pill '+(path==='/profile'?'profile-active':'')}>
            <span className="profile-avatar">{initials||<UserRound size={15} strokeWidth={2.4}/>}</span>
            <span className="profile-label">{profile?.name?profile.name.trim().split(/\s+/)[0]:'My profile'}</span>
          </Link>
        </div>

        <button
          className="nav-mobile-toggle"
          type="button"
          onClick={()=>setOpen(value=>!value)}
          aria-label={open?'Close navigation':'Open navigation'}
          aria-expanded={open}
        >
          {open?<X size={20} strokeWidth={2.5}/>:<Menu size={20} strokeWidth={2.5}/>}
        </button>
      </div>

      <AnimatePresence>
        {open&&<motion.div
          className="workspace-mobile-panel"
          initial={{height:0,opacity:0}}
          animate={{height:'auto',opacity:1}}
          exit={{height:0,opacity:0}}
          transition={{duration:.2,ease:'easeOut'}}
        >
          <div className="mobile-panel-heading">
            <span>YOUR WORKSPACE</span>
            <small>Choose where to go next</small>
          </div>
          <nav className="workspace-mobile-grid" aria-label="Mobile navigation">
            {allNav.map(item=>{
              const Icon=item.icon;
              return <Link
                key={item.href}
                href={item.href}
                aria-current={isActive(path,item.href)?'page':undefined}
                className={'mobile-nav-link '+(isActive(path,item.href)?'active':'')}
              >
                <span className="mobile-nav-icon"><Icon size={18} strokeWidth={2.3}/></span>
                <span>{item.label}</span>
                <ArrowUpRight size={14}/>
              </Link>;
            })}
          </nav>
          <Link href="/profile" className="mobile-profile-link">
            <UserRound size={16}/> {profile?.name||'My profile'}
          </Link>
        </motion.div>}
      </AnimatePresence>
    </header>

    <div className="main-column">
      <div className="workspace-context">
        <span className="context-brand">CAMPUSPULSE</span>
        <span className="context-slash">/</span>
        <strong>{active}</strong>
        <span className="mode-pill"><i/> PRIVATE LOCAL WORKSPACE</span>
      </div>
      <main className="page-content">
        <AnimatePresence mode="wait">
          <motion.div
            key={path}
            initial={{opacity:0,y:7}}
            animate={{opacity:1,y:0}}
            exit={{opacity:0,y:-4}}
            transition={{duration:.16,ease:[.22,1,.36,1]}}
          >{children}</motion.div>
        </AnimatePresence>
      </main>
      <footer className="app-footer">
        <span>© 2026 CAMPUSPULSE</span>
        <span>STUDENT SUPPORT & SCHOLARSHIPS</span>
        <span><i className="footer-dot"/> LOCAL-FIRST MODE</span>
      </footer>
    </div>
  </div>;
}
