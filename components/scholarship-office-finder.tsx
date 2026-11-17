'use client';

import {useEffect,useMemo,useState} from 'react';
import {ExternalLink,MapPin,ShieldCheck,RefreshCw,Building2,Globe2} from 'lucide-react';

type Props={schemeId:string;schemeName:string;provider:string;category:string};
const schemeWiseUrl='https://scholarships.gov.in/nodelOfficerDetails';
const districtWiseUrl='https://scholarships.gov.in/districtNodelOfficerDetails';

function departmentFor(id:string,provider:string,category:string){
 if(id.includes('top-class-sc'))return 'Social Justice & Scheduled Caste Welfare Department';
 if(id.includes('depwd'))return 'Department for Empowerment of Persons with Disabilities';
 if(id.includes('saksham')||id.includes('pragati')||provider.includes('AICTE'))return 'AICTE scholarship nodal channel / institute nodal officer';
 if(id.includes('pm-usp-csss'))return 'Higher Education Department / institute scholarship nodal officer';
 if(id.includes('minority'))return 'Minority Welfare Department';
 if(category.toLowerCase().includes('merit'))return 'State or district scholarship nodal office';
 return 'District scholarship nodal office';
}

export function ScholarshipOfficeFinder({schemeId,schemeName,provider,category}:Props){
 const [city,setCity]=useState('Bengaluru');
 const [district,setDistrict]=useState('');
 const [state,setState]=useState('Karnataka');
 const [snapshot,setSnapshot]=useState<any>(null);
 const [loading,setLoading]=useState(false);
 const department=departmentFor(schemeId,provider,category);
 const query=department+', '+(district?district+', ':'')+city+', '+state+', India';
 const mapUrl='https://www.google.com/maps?q='+encodeURIComponent(query)+'&output=embed';
 const searchUrl='https://www.google.com/maps/search/?api=1&query='+encodeURIComponent(query);
 const lastChecked=useMemo(()=>snapshot?.checkedAt?new Date(snapshot.checkedAt).toLocaleString('en-IN'):'No scheduled source check recorded yet',[snapshot]);
 const refresh=async()=>{
  setLoading(true);
  try{
   const response=await fetch('/data/officer-source-status.json?refresh='+Date.now(),{cache:'no-store'});
   if(response.ok)setSnapshot(await response.json());
  }finally{setLoading(false)}
 };
 useEffect(()=>{void refresh()},[]);
 return <section className="office-finder" id="scheme-offices">
  <div className="office-finder-head"><div><span className="eyebrow">LOCAL SUPPORT / OFFICIAL CONTACTS</span><h2>Find the right scholarship office.</h2><p>Choose your city to locate the responsible department. Use the official NSP directory for the officer currently assigned to this scheme and district.</p></div><span className="office-finder-mark"><MapPin size={22}/></span></div>
  <div className="office-search-row">
   <label><span>City</span><input value={city} onChange={e=>setCity(e.target.value)} placeholder="e.g. Bengaluru"/></label>
   <label><span>District</span><input value={district} onChange={e=>setDistrict(e.target.value)} placeholder="e.g. Bengaluru Urban"/></label>
   <label><span>State</span><input value={state} onChange={e=>setState(e.target.value)} placeholder="State"/></label>
  </div>
  <div className="office-layout">
   <div className="office-map"><iframe title={'Map search for '+department+' in '+city} src={mapUrl} loading="lazy" referrerPolicy="no-referrer-when-downgrade"/><a href={searchUrl} target="_blank" rel="noreferrer">Open in Google Maps <ExternalLink size={13}/></a></div>
   <div className="office-directory">
    <article className="office-contact office-directory-source">
     <span className="office-department">{department}</span>
     <h3>{schemeName}</h3>
     <b className="office-designation">Responsible department to contact first</b>
     <p>Start with your college scholarship nodal officer. If the application is at district or state verification, use the official NSP district-wise directory to find the current designated officer.</p>
     <a className="office-source-link" href={schemeWiseUrl} target="_blank" rel="noreferrer">Find this scheme’s nodal officer <ExternalLink size={12}/></a>
     <a className="office-source-link" href={districtWiseUrl} target="_blank" rel="noreferrer">Find the officer for your district <ExternalLink size={12}/></a>
    </article>
    <div className="office-source-meta">
     <div className="office-source-meta-head"><span><ShieldCheck size={15}/> Official source monitoring</span><button type="button" onClick={refresh} disabled={loading}>{loading?<RefreshCw className="spin" size={13}/>:<RefreshCw size={13}/>} Check latest snapshot</button></div>
     <p>Last automatic check: {lastChecked}</p>
     {snapshot?.sources?.map((source:any)=><div className="office-source-row" key={source.id}><span className={source.reachable===false?'source-down':'source-up'}/><div><b>{source.label}</b><small>{source.publishedUpdate?'Portal page last updated: '+source.publishedUpdate:source.note||'No published update marker found'}</small></div><a href={source.url} target="_blank" rel="noreferrer" aria-label={'Open '+source.label}><ExternalLink size={12}/></a></div>)}
     {!snapshot&&<p className="office-source-loading">Loading the latest daily source-check record. The official NSP links above are live now.</p>}
     <p className="office-source-disclaimer">CampusPulse checks public page availability and the portal’s own “Last update” notice. It does not scrape officer names or contact details. NSP requires users to choose the scheme or district in its official forms and may display CAPTCHA.</p>
    </div>
   </div>
  </div>
  <div className="official-officer-links">
   <div><span className="eyebrow">LIVE OFFICIAL DIRECTORY</span><b>{schemeName}</b><small>{provider} · {state}{district?', '+district:''}</small></div>
   <a href={schemeWiseUrl} target="_blank" rel="noreferrer"><Building2 size={14}/> Scheme-wise officers <ExternalLink size={12}/></a>
   <a href={districtWiseUrl} target="_blank" rel="noreferrer"><Globe2 size={14}/> District-wise officers <ExternalLink size={12}/></a>
  </div>
  <p className="office-data-note">Officer names, roles, phone numbers and emails are taken only from the official live directory. The map is a department search, not an official office register. Confirm the current assignment and address before visiting.</p>
 </section>;
}
