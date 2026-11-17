'use client';
import Link from 'next/link';
import {usePathname} from 'next/navigation';
import {AnimatePresence,motion} from 'framer-motion';
import {useEffect,useState} from 'react';
import {BookmarkCheck,CalendarDays,FileSearch,GraduationCap,LayoutDashboard,ListChecks,ShieldAlert,UserRound,Zap,Menu,X,BriefcaseBusiness} from 'lucide-react';
import {getProfile} from '@/lib/storage';
import {LanguageSelector} from '@/components/language-selector';
import type {StudentProfile} from '@/lib/types';
const nav=[
 {href:'/dashboard',label:'Overview',icon:LayoutDashboard},
 {href:'/scholarships',label:'Scholarships',icon:GraduationCap},
 {href:'/eligibility-checker',label:'Eligibility',icon:ListChecks},
 {href:'/document-review',label:'Documents',icon:FileSearch},
 {href:'/rejection-analyzer',label:'Rejection help',icon:ShieldAlert},
 {href:'/tracker',label:'Saved',icon:BookmarkCheck},
 {href:'/planner',label:'Planner',icon:CalendarDays},
 {href:'/services',label:'Student services',icon:BriefcaseBusiness},
];
export function AppShell({children}:{children:React.ReactNode}){
 const path=usePathname();
 const [open,setOpen]=useState(false);const [profile,setProfile]=useState<StudentProfile|null>(null);
 useEffect(()=>{const sync=()=>setProfile(getProfile());sync();window.addEventListener('storage',sync);window.addEventListener('campuspulse-profile',sync);return()=>{window.removeEventListener('storage',sync);window.removeEventListener('campuspulse-profile',sync)}},[]);
 if(path==='/')return <>{children}</>;
 const active=nav.find(n=>path===n.href)?.label??(path.startsWith('/scholarships/')?'Scholarship details':path==='/profile'?'My profile':path.startsWith('/services')?'Student services':'Scholarship workspace');
 return <div className="app-frame"><header className="workspace-header"><div className="workspace-nav-inner"><Link href="/" className="brand"><span className="brand-mark"><Zap size={19} fill="currentColor"/></span><span>campus<span className="brand-heavy">pulse</span><small>SCHOLARSHIP INTELLIGENCE.</small></span></Link><button className="nav-mobile-toggle" onClick={()=>setOpen(v=>!v)} aria-label="Toggle navigation">{open?<X size={19}/>:<Menu size={19}/>}</button><nav className="workspace-nav">{nav.map(n=>{const I=n.icon;return <Link key={n.href} href={n.href} className={`nav-pill ${path===n.href||path.startsWith(n.href+'/')?'active':''}`}><I size={15}/><span>{n.label}</span></Link>})}</nav><LanguageSelector/><Link href="/profile" className="profile-pill"><span className="profile-avatar">{profile?.name?.trim()?profile.name.trim().split(/\s+/).slice(0,2).map(x=>x[0]).join('').toUpperCase():<UserRound size={14}/>}</span><span>{profile?.name?profile.name.split(' ')[0]:'My profile'}</span></Link></div><AnimatePresence>{open&&<motion.nav className="workspace-mobile-nav" initial={{height:0,opacity:0}} animate={{height:'auto',opacity:1}} exit={{height:0,opacity:0}}>{nav.map(n=>{const I=n.icon;return <Link key={n.href} href={n.href} onClick={()=>setOpen(false)} className="nav-pill"><I size={16}/>{n.label}</Link>})}<Link href="/profile" onClick={()=>setOpen(false)} className="nav-pill"><UserRound size={16}/>My profile</Link></motion.nav>}</AnimatePresence></header><div className="main-column"><div className="workspace-context"><span>CampusPulse</span><b>/</b><strong>{active}</strong><span className="mode-pill"><i/> PRIVATE LOCAL WORKSPACE</span></div><main className="page-content"><AnimatePresence mode="wait"><motion.div key={path} initial={{opacity:0,y:9}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-5}} transition={{duration:.22,ease:[.22,1,.36,1]}}>{children}</motion.div></AnimatePresence></main><footer className="app-footer"><span>© 2026 CAMPUSPULSE</span><span>STUDENT SUPPORT & SCHOLARSHIPS</span><span><i className="footer-dot"/> LOCAL-FIRST MODE</span></footer></div></div>
}