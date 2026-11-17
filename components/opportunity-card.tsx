'use client';
import Link from 'next/link';
import {useEffect,useState} from 'react';
import {ArrowUpRight,Bookmark,BookmarkCheck,MapPin,ShieldCheck} from 'lucide-react';
import type {Opportunity,StudentProfile} from '@/lib/types';
import {matchOpportunity} from '@/lib/matching';
import {getProfile,getTracker,saveTracker} from '@/lib/storage';
const tones:Record<string,string>={Scholarship:'lavender',Internship:'blue',Job:'orange',Course:'green',Event:'pink'};
export function OpportunityCard({item}:{item:Opportunity}){
 const [saved,setSaved]=useState(false);const [profile,setProfile]=useState<StudentProfile|null>(null);
 useEffect(()=>{setProfile(getProfile());setSaved(getTracker().some(x=>x.opportunityId===item.id))},[item.id]);
 const toggle=()=>{const old=getTracker();const next=saved?old.filter(x=>x.opportunityId!==item.id):[...old,{opportunityId:item.id,status:'Interested' as const,notes:'',nextAction:'Review the provider requirements',reminderDate:'',updatedAt:new Date().toISOString()}];saveTracker(next);setSaved(!saved);window.dispatchEvent(new Event('campuspulse-tracker'))};
 const match=profile?matchOpportunity(item,profile):null;
 return <article className="opp-card"><div className="opp-card-top"><span className={`type-tag ${tones[item.type]}`}>{item.type}</span><span className="source-kind">{item.sourceKind}</span><button className={`bookmark ${saved?'saved':''}`} onClick={toggle} aria-label={saved?'Remove from tracker':'Save to tracker'}>{saved?<BookmarkCheck size={17}/>:<Bookmark size={17}/>}</button></div><div className="org-line">{item.organization}</div><h3><Link href={`/opportunities/${item.id}`}>{item.title}</Link></h3><p className="opp-description">{item.description}</p><div className="opp-card-meta"><span><MapPin size={13}/>{item.location}</span><span>{item.amount||'Details on provider page'}</span></div><div className="match-line"><div className="match-track"><span style={{width:`${match?.score??0}%`}}/></div><b>{match?.score===null||!match?'Complete profile for match review':`${match.score}% profile signals`}</b></div><div className="opp-card-bottom"><span className="source-status"><ShieldCheck size={13}/>{item.sourceKind}</span><Link href={`/opportunities/${item.id}`}>Read details <ArrowUpRight size={14}/></Link></div></article>
}