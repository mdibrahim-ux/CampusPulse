'use client';
import Link from 'next/link';
import {useEffect,useState} from 'react';
import {ArrowUpRight,Bookmark,BookmarkCheck,ExternalLink,ShieldCheck} from 'lucide-react';
import type {Opportunity} from '@/lib/types';
import {getTracker,saveTracker} from '@/lib/storage';
export function OpportunityCard({item}:{item:Opportunity}){
 const [saved,setSaved]=useState(false);
 useEffect(()=>{setSaved(getTracker().some(x=>x.opportunityId===item.id))},[item.id]);
 const toggle=()=>{const old=getTracker();const next=saved?old.filter(x=>x.opportunityId!==item.id):[...old,{opportunityId:item.id,status:'Interested' as const,notes:'',nextAction:'Read the current scheme guideline',reminderDate:'',updatedAt:new Date().toISOString()}];saveTracker(next);setSaved(!saved);window.dispatchEvent(new Event('campuspulse-tracker'))};
 return <article className="opp-card"><div className="opp-card-top"><span className="type-tag lavender">SCHOLARSHIP</span><span className="source-kind">{item.sourceKind}</span><button className={`bookmark ${saved?'saved':''}`} onClick={toggle} aria-label={saved?'Remove from saved scholarships':'Save scholarship'}>{saved?<BookmarkCheck size={17}/>:<Bookmark size={17}/>}</button></div><div className="org-line">{item.organization}</div><h3><Link href={`/scholarships/${item.id}`}>{item.title}</Link></h3><p className="opp-description">{item.description}</p><div className="scholarship-mini-fact"><span>SUPPORT</span><b>{item.amount||'See scheme details'}</b></div><div className="opp-card-bottom"><span className="source-status"><ShieldCheck size={13}/>Rule source checked {item.lastChecked}</span><Link href={`/scholarships/${item.id}`}>Read scheme <ArrowUpRight size={14}/></Link></div></article>
}