'use client';

import Link from 'next/link';
import {useMemo,useState} from 'react';
import {ArrowRight,ArrowUpRight,Search,ShieldCheck} from 'lucide-react';
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
    <section className="directory-heading">
      <div>
        <span className="eyebrow">SCHOLARSHIP DIRECTORY / REFERENCE CATALOGUE</span>
        <h1>Find scholarships that fit your situation.</h1>
        <p>Search the curated schemes, compare published conditions and open the official source before applying.</p>
      </div>
      <div className="directory-heading-actions">
        <Link href="/eligibility-checker" className="button button-primary">Check eligibility <ArrowRight size={15}/></Link>
        <a href="https://scholarships.gov.in/All-Scholarships" target="_blank" rel="noreferrer" className="text-link">Official NSP catalogue <ArrowUpRight size={14}/></a>
      </div>
    </section>

    <section className="directory-toolbar" aria-label="Scholarship search and filters">
      <label className="directory-search">
        <Search size={17}/>
        <input value={query} onChange={event=>setQuery(event.target.value)} placeholder="Search scheme, provider or keyword…" aria-label="Search scholarships"/>
        {query&&<button type="button" onClick={()=>setQuery('')} aria-label="Clear search">×</button>}
      </label>
      <div className="directory-filter-list">
        {filters.map(item=><button type="button" key={item} onClick={()=>setFilter(item)} className={filter===item?'selected':''} aria-pressed={filter===item}>{item}</button>)}
      </div>
      <div className="directory-result-count"><b>{filtered.length.toString().padStart(2,'0')}</b><span>SCHEMES</span></div>
    </section>

    <section className="directory-card-grid" aria-live="polite">
      {filtered.map((scheme,index)=><ScholarshipCard key={scheme.id} scheme={scheme} index={index}/>)}
      {filtered.length===0&&<div className="directory-empty"><Search size={22}/><h3>No matching scheme found.</h3><p>Try another keyword or choose “All schemes”.</p><button type="button" className="button button-secondary" onClick={()=>{setQuery('');setFilter('All schemes')}}>Clear filters</button></div>}
    </section>

    <div className="directory-source-note"><ShieldCheck size={16}/><p><b>Before you apply:</b> CampusPulse is a curated reference, not the government application portal. Scheme conditions, institutional lists, financial support and deadlines can change. Always verify the current specification on the linked official source.</p></div>
  </div>;
}
