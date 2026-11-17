import type { Opportunity } from './types';
import { scholarshipSchemes } from './scholarships';
export const blankProfile = { name:'', institution:'', degree:'', branch:'', year:'', state:'', city:'', cgpa:'', skills:[], interests:['Scholarships'], preferredMode:'Any' };
export const profileKey='campuspulse.profile.v2';
export const trackerKey='campuspulse.tracker.v2';
export const remindersKey='campuspulse.reminders.v2';
export const providers = [
 {name:'National Scholarship Portal',short:'NSP',description:'Government scholarship catalogue, scheme specifications, eligibility checker, OTR registration, application status and payment tracking.',url:'https://scholarships.gov.in/Students',kind:'Central and state schemes',accent:'lime'},
 {name:'All India Council for Technical Education',short:'AICTE',description:'Pragati, Saksham and other technical-education scholarship schemes. Confirm current scheme-specific requirements.',url:'https://www.aicte-india.org/',kind:'Technical education schemes',accent:'lav'},
 {name:'Ministry of Social Justice and Empowerment',short:'MSJE',description:'Top Class Education support and notified institution information for eligible SC students.',url:'https://socialjustice.gov.in/',kind:'Central welfare schemes',accent:'peach'},
 {name:'Department of Empowerment of Persons with Disabilities',short:'DEPwD',description:'Pre-matric, post-matric and top-class education scholarship schemes for eligible students with disabilities.',url:'https://depwd.gov.in/en/scholarship-post-matric/',kind:'Disability scholarships',accent:'green'},
];
export const opportunities: Opportunity[] = scholarshipSchemes.map(s=>({
 id:s.id,title:s.name,organization:s.provider,type:'Scholarship',category:s.category,description:s.summary,amount:s.amount,location:'India',mode:'Varies',deadlineLabel:s.deadlineNote,sourceName:s.ruleSource,sourceUrl:s.sourceUrl,sourceKind:'Official catalogue',lastChecked:'2026-11-17',statusNote:s.caveats.join(' '),eligibility:{note:s.criteria.join(' ')},documents:s.required.map(id=>id),tags:[s.category,s.shortName]
}));