'use client';
import {useMemo,useState} from 'react';
import {ExternalLink,MapPin,Phone,ShieldCheck,Search} from 'lucide-react';

type Props={schemeId:string;schemeName:string;provider:string;category:string};
const officialNsp='https://scholarships.gov.in/Officers';
const publicNsp='https://scholarships.gov.in/Public';
const districtRecords=[
 {id:'bengaluru-minority',city:'Bengaluru',district:'Bengaluru South',state:'Karnataka',department:'Department of Minority Welfare',name:'Bindu Mani',designation:'District Minority Welfare Officer',phone:'080-27271029',email:'kmdcrmngr@gmail.com',address:'Department of Minority Welfare, Bengaluru South',source:'https://bengalurusouth.nic.in/en/divisions/minority-division/',note:'Relevant only to Minority Welfare schemes. This contact is published on the district administration site.'},
 {id:'bengaluru-dc',city:'Bengaluru',district:'Bengaluru Urban',state:'Karnataka',department:'Bengaluru Urban District Administration',name:'Shri P.S. Kantharaju, IAS',designation:'Deputy Commissioner & District Magistrate — general district administration contact, not a scheme-specific scholarship officer',phone:'080-22211292',email:'dcurban@nic.in',address:'Kempegowda Road, Behind Kandaya Bhavana, Bengaluru Urban, Karnataka 560009',source:'https://bengaluruurban.nic.in/en/aboutdistrict/whos-who/',note:'Use only for district administration routing. The scholarship’s own NSP nodal officer remains the correct scheme contact.'}
];
function departmentFor(id:string,provider:string,category:string){
 if(id.includes('top-class-sc'))return 'District Social Welfare Office / Scheduled Caste Welfare Department';
 if(id.includes('depwd'))return 'District Disability Welfare Office / Department for Empowerment of Persons with Disabilities';
 if(id.includes('saksham')||id.includes('pragati')||provider.includes('AICTE'))return 'AICTE regional office / institute scholarship nodal officer';
 if(id.includes('pm-usp-csss'))return 'College scholarship nodal officer / Ministry of Education scheme-wise nodal officer';
 if(id.includes('minority'))return 'District Minority Welfare Office';
 if(category.toLowerCase().includes('merit'))return 'District / State Scholarship Nodal Office';
 return 'District Scholarship Nodal Office';
}
export function ScholarshipOfficeFinder({schemeId,schemeName,provider,category}:Props){
 const [city,setCity]=useState('Bengaluru');const [state,setState]=useState('Karnataka');const [district,setDistrict]=useState('');
 const department=departmentFor(schemeId,provider,category);
 const records=useMemo(()=>districtRecords.filter(r=>r.city.toLowerCase()===city.trim().toLowerCase()&&(!district||r.district.toLowerCase().includes(district.toLowerCase()))),[city,district]);
 const query=`${department}, ${district?district+', ':''}${city}, ${state}, India`;
 const mapUrl=`https://maps.google.com/maps?q=${encodeURIComponent(query)}&output=embed`;
 const matches=records.filter(r=>r.id==='bengaluru-dc'||(r.department.toLowerCase().includes('minority')&&schemeId.includes('minority')));
 return <section className="office-finder" id="scheme-offices">
  <div className="office-finder-head"><div><span className="eyebrow">04 / LOCAL SUPPORT</span><h2>Find the office for this scheme.</h2><p>Search by city to see the relevant department map and publicly listed contacts. The scheme-wise nodal officer is controlled by the official scholarship portal.</p></div><span className="office-finder-mark"><MapPin size={22}/></span></div>
  <div className="office-search-row"><label><span>City</span><input value={city} onChange={e=>setCity(e.target.value)} placeholder="e.g. Bengaluru"/></label><label><span>District / area (optional)</span><input value={district} onChange={e=>setDistrict(e.target.value)} placeholder="e.g. Bengaluru Urban"/></label><label><span>State</span><input value={state} onChange={e=>setState(e.target.value)} placeholder="State"/></label></div>
  <div className="office-layout"><div className="office-map"><iframe title={`Map search for ${department} in ${city}`} src={mapUrl} loading="lazy" referrerPolicy="no-referrer-when-downgrade"/><a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`} target="_blank" rel="noreferrer">Open larger map <ExternalLink size={13}/></a></div>
   <div className="office-directory"><div className="office-directory-title"><b>Public contact records</b><span>{matches.length} local record{matches.length===1?'':'s'}</span></div>
    {matches.map(record=><article className="office-contact" key={record.id}><span className="office-department">{record.department}</span><h3>{record.name}</h3><b className="office-designation">{record.designation}</b><p>{record.address}</p><div className="office-contact-links"><a href={`tel:${record.phone}`}><Phone size={13}/>{record.phone}</a><a href={`mailto:${record.email}`}>{record.email}</a></div><small>{record.note}</small><a className="office-source-link" href={record.source} target="_blank" rel="noreferrer">Verify on district website <ExternalLink size={12}/></a></article>)}
    {matches.length===0&&<div className="office-no-record"><ShieldCheck size={18}/><b>No named local officer record curated for this exact city and scheme.</b><p>We will not invent an officer name or phone number. Use the official NSP directory to locate the scheme-wise nodal officer and district-wise officer for the selected city.</p></div>}
   </div></div>
  <div className="official-officer-links"><div><span className="eyebrow">OFFICIAL SCHOLARSHIP CONTACTS</span><b>{schemeName}</b><small>{provider} · Scheme: {schemeId}</small></div><a href={officialNsp} target="_blank" rel="noreferrer">Scheme-wise Nodal Officers <ExternalLink size={13}/></a><a href={publicNsp} target="_blank" rel="noreferrer">District-wise Nodal Officers & Grievances <ExternalLink size={13}/></a></div>
  <p className="office-data-note">Map results are third-party map search results. Officer names are shown only when published by a government directory. Confirm current assignment, office hours and phone numbers with the linked official source before visiting.</p>
 </section>;
}