import Link from 'next/link';
import {ArrowUpRight,CalendarDays,ExternalLink,FileCheck2,ShieldCheck} from 'lucide-react';
import type {ScholarshipScheme} from '@/lib/scholarships';
import {scholarshipBranding} from '@/lib/scholarship-branding';

export function ScholarshipCard({scheme,index}:{scheme:ScholarshipScheme;index:number}){
 const brand=scholarshipBranding[scheme.id];
 const deadline=scheme.studentDeadline
  ?new Date(scheme.studentDeadline+'T00:00:00').toLocaleDateString('en-IN',{day:'numeric',month:'short',year:'numeric'})
  :null;
 const category=scheme.category.split('·')[0].trim();

 return <article className="scheme-card" style={{'--card-index':index} as React.CSSProperties}>
  <div className="scheme-card-art">
   {brand&&<img
    src={brand.imageUrl}
    alt={brand.imageAlt}
    loading="lazy"
    decoding="async"
    style={{objectFit:brand.imageFit}}
   />}
   <span className="scheme-image-type">{brand?.imageLabel||'Issuing authority'}</span>
   <span className="scheme-card-index">{String(index+1).padStart(2,'0')}</span>
  </div>
  <div className="scheme-card-content">
   <div className="scheme-card-meta">
    <span className="scheme-category">{category}</span>
    <span className="scheme-source"><ShieldCheck size={12}/> Source linked</span>
   </div>
   <p className="scheme-issuer">{scheme.provider}</p>
   <h3>{scheme.name}</h3>
   <p className="scheme-summary">{scheme.summary}</p>
   <div className="scheme-card-facts">
    <div className="scheme-support">
     <span>INDICATIVE SUPPORT</span>
     <b>{scheme.amount}</b>
    </div>
    <div className="scheme-deadline">
     <span><CalendarDays size={13}/> STUDENT DEADLINE</span>
     <b>{deadline||'Check official portal'}</b>
    </div>
   </div>
   <div className="scheme-card-bottom">
    <span className="scheme-doc-count"><FileCheck2 size={13}/> {scheme.required.length} document types</span>
    <Link href={'/scholarships/'+scheme.id} className="scheme-card-action">View scheme <ArrowUpRight size={15}/></Link>
   </div>
   {brand&&<a className="scheme-image-credit" href={brand.imageUrl} target="_blank" rel="noreferrer">Image: {brand.imageSource} <ExternalLink size={10}/></a>}
  </div>
 </article>;
}
