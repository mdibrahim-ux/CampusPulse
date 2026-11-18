'use client';

import Link from 'next/link';
import {useMemo,useState} from 'react';
import {ArrowRight,ArrowUpRight,Search,ShieldCheck,Sparkles} from 'lucide-react';
import {scholarshipSchemes} from '@/lib/scholarships';
import {ScholarshipCard} from '@/components/scholarship-card';

const filters=['All schemes','Merit-based','Welfare-based','Technical'];

export default function ScholarshipsPage(){
 const [filter,setFilter]=useState('All schemes');
 const [query,setQuery]=useState('');
 const filtered=useMemo(()=>scholarshipSchemes.filter(s=>{
  const matchesFilter=filter==='All schemes'
   ||(filter==='Technical'?s.category.toLowerCase().includes('technical'):s.category.toLowerCase().includes(filter.toLowerCase().replace('-based','')));
  const text=(s.name+' '+s.shortName+' '+s.provider+' '+s.summary).toLowerCase();
  return matchesFilter&&text.includes(query.toLowerCase().trim());
 }),[filter,query]);

 return <div className="scholarship-directory-page">
  <section className="directory-hero">
   <div className="directory-hero-copy">
    <span className="directory-eyebrow"><span/> THE SCHOLARSHIP DIRECTORY <b>01 / 05</b></span>
    <h1>Find the support<br/><em>that moves you forward.</em></h1>
    <p>Explore named scholarship schemes, understand their support and compare the published conditions before you apply.</p>
    <div className="directory-hero-actions">
     <Link href="/eligibility-checker" className="directory-primary-action">Check my eligibility <ArrowRight size={17}/></Link>
     <a href="https://scholarships.gov.in/All-Scholarships" target="_blank" rel="noreferrer" className="directory-secondary-action">Official NSP catalogue <ArrowUpRight size={15}/></a>
    </div>
    <div className="directory-trust-row"><span><ShieldCheck size={14}/> Source-linked scheme references</span><span><Sparkles size={14}/> Clear eligibility notes</span></div>
   </div>
   <div className="directory-hero-art" aria-hidden="true">
    <div className="directory-art-orbit orbit-a"/>
    <div className="directory-art-orbit orbit-b"/>
    <div className="directory-art-ticket"><span>STUDENT<br/>SUPPORT</span><b>₹</b><small>ONE APPLICATION<br/>AT A TIME</small></div>
    <span className="directory-art-sticker">FIND<br/>YOUR<br/>FIT ↗</span>
    <span className="directory-art-caption">CAMPUSPULSE / SCHOLARSHIP INTELLIGENCE</span>
   </div>
  </section>

  <section className="directory-intro">
   <div><span className="page-kicker">THE RIGHT STARTING POINT</span><h2>Scholarships worth checking.</h2><p>Use the filters to narrow the list. Open a scheme to see eligibility conditions, documents and official links.</p></div>
   <div className="directory-count"><b>{filtered.length.toString().padStart(2,'0')}</b><span>SCHEMES<br/>IN THIS VIEW</span></div>
  </section>

  <section className="directory-controls" aria-label="Scholarship filters">
   <div className="directory-search"><Search size={18}/><input value={query} onChange={event=>setQuery(event.target.value)} placeholder="Search by scheme, provider or keyword..." aria-label="Search scholarships"/>{query&&<button type="button" onClick={()=>setQuery('')} aria-label="Clear search">×</button>}</div>
   <div className="directory-filter-list">
    {filters.map(item=><button type="button" key={item} onClick={()=>setFilter(item)} className={filter===item?'selected':''}>{item}</button>)}
   </div>
  </section>

  <section className="directory-card-grid" aria-live="polite">
   {filtered.map((scheme,index)=><ScholarshipCard key={scheme.id} scheme={scheme} index={index}/>)}
   {filtered.length===0&&<div className="directory-empty"><Search size={23}/><h3>No matching scheme found.</h3><p>Try another keyword or choose “All schemes”.</p><button type="button" onClick={()=>{setQuery('');setFilter('All schemes')}}>Clear filters</button></div>}
  </section>

  <div className="directory-source-note"><ShieldCheck size={16}/><p><b>Before you apply:</b> CampusPulse is a curated reference, not the government application portal. Scheme conditions, institutional lists, financial support and deadlines can change. Always verify the current specification on the linked official source.</p></div>
 </div>;
}
