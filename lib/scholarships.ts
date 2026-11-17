export type YesNo = 'yes' | 'no' | 'unknown';
export type StudyLevel = 'Class 11 / 12' | 'Diploma' | 'Undergraduate' | 'Postgraduate' | 'Research' | 'Other';
export type StudentFacts = {
  studyLevel: StudyLevel | '';
  gender: 'Female' | 'Male' | 'Prefer not to say' | '';
  category: 'SC' | 'ST' | 'OBC' | 'EWS' | 'General' | 'Other' | '';
  familyIncome: string;
  courseMode: 'Regular / full-time' | 'Distance / correspondence' | 'Open university' | 'Unknown' | '';
  technicalCourse: YesNo;
  aicteApproved: YesNo;
  admissionStage: 'First year' | 'Second year through lateral entry' | 'Later year / other' | 'Unknown' | '';
  above80Percentile: YesNo;
  gapAfterClass12: YesNo;
  receivesOtherScholarship: YesNo;
  notifiedInstitution: YesNo;
  girlsInFamily: string;
  disabilityPercent: string;
  indianCitizen: YesNo;
};

export const emptyStudentFacts: StudentFacts = {
  studyLevel:'', gender:'', category:'', familyIncome:'', courseMode:'', technicalCourse:'unknown', aicteApproved:'unknown',
  admissionStage:'', above80Percentile:'unknown', gapAfterClass12:'unknown', receivesOtherScholarship:'unknown',
  notifiedInstitution:'unknown', girlsInFamily:'', disabilityPercent:'', indianCitizen:'unknown'
};

export const documentOptions = [
  { id:'class10', label:'Class 10 marksheet', detail:'Often used as date-of-birth or prior education evidence.' },
  { id:'class12', label:'Class 12 marksheet', detail:'Used to confirm board, stream, marks and qualifying performance.' },
  { id:'previous_marks', label:'Previous year / semester marksheets', detail:'Used for renewal or academic-progress checks.' },
  { id:'income', label:'Family income certificate', detail:'Shows family income for the period and format required by the scheme.' },
  { id:'caste', label:'Caste / community certificate', detail:'Evidence for schemes restricted to a notified community.' },
  { id:'admission', label:'Admission letter / allotment letter', detail:'Confirms programme, institution and admission year.' },
  { id:'bonafide', label:'Bonafide / institute certificate', detail:'Confirms that you are currently enrolled at the institution.' },
  { id:'fee', label:'Fee receipt / fee structure', detail:'May be needed to establish fees or eligible fee components.' },
  { id:'disability', label:'Disability certificate', detail:'Evidence of benchmark disability where a scheme requires it.' },
  { id:'udid', label:'UDID card / enrolment proof', detail:'Used by disability scholarship workflows where specified.' },
  { id:'bank', label:'Bank proof in student name', detail:'May be required for payment verification. Never enter account or IFSC details here.' },
  { id:'family_declaration', label:'Family / sibling declaration', detail:'May be required where a scheme limits the number of eligible girl children.' },
  { id:'institution_list', label:'Proof institution is on the notified list', detail:'Useful for schemes restricted to institutions on a government list.' },
  { id:'nsp_otr', label:'NSP OTR completed', detail:'OTR is a portal registration prerequisite, not a document to upload here.' }
] as const;
export type DocumentId = typeof documentOptions[number]['id'];

export type ScholarshipScheme = {
  id:string; name:string; shortName:string; category:string; provider:string; sourceUrl:string; ruleSource:string;
  sourceDate:string; summary:string; amount:string; deadlineNote:string; studentDeadline?:string; deadlineStage?:string; required:DocumentId[]; criteria:string[]; caveats:string[];
};

export const scholarshipSchemes: ScholarshipScheme[] = [
  {
    id:'pm-usp-csss', name:'PM-USP Central Sector Scheme of Scholarship for College and University Students', shortName:'PM-USP CSSS',
    category:'Merit-based · Central', provider:'Department of Higher Education · Ministry of Education',
    sourceUrl:'https://scholarships.gov.in/All-Scholarships', ruleSource:'PM-USP CSSS FAQ 2025–26', sourceDate:'2025–26 rule snapshot; NSP catalogue checked 17 Nov 2026',
    summary:'Merit-cum-means support for students pursuing regular college and university courses after Class 12.', amount:'₹12,000 per year for the first three years; higher rate for eligible postgraduate / professional-course years under the scheme FAQ.',
    deadlineNote:'NSP AY 2026–27 catalogue shows fresh student applications open until 30 Nov 2026. Renewal timelines are separate; verify the correct application type.', studentDeadline:'2026-11-30', deadlineStage:'Fresh applications',
    required:['class12','income','admission','bonafide','nsp_otr'],
    criteria:['Above the 80th percentile of successful candidates in the relevant Class 12 board stream.','Regular degree course; distance / correspondence and diploma courses are excluded.','Family income up to ₹4.5 lakh per year.','Not receiving another scholarship or fee reimbursement.','A student who took a drop after Class 12 is not eligible for a fresh application.'],
    caveats:['This checker does not calculate your board-wise percentile; use the relevant board / official scheme data.','The FAQ version used here is 2025–26. Confirm the current year’s FAQ before applying.']
  },
  {
    id:'aicte-pragati-degree', name:'AICTE Pragati Scholarship Scheme for Girl Students — Technical Degree', shortName:'AICTE Pragati (Degree)',
    category:'Merit-based · Technical education', provider:'All India Council for Technical Education (AICTE)',
    sourceUrl:'https://scholarships.gov.in/All-Scholarships', ruleSource:'AICTE Pragati scheme brochure; confirm current NSP specification', sourceDate:'Brochure rule snapshot; NSP AY 2026–27 catalogue checked 17 Nov 2026',
    summary:'Scholarship support for eligible girl students entering an AICTE-approved technical degree programme.', amount:'The older AICTE brochure states tuition support up to ₹30,000 (or actual tuition, whichever is less) plus incidentals; confirm current scheme specifications.',
    deadlineNote:'NSP AY 2026–27 catalogue shows student applications open until 30 Nov 2026. Check the current specification and applicant category before submission.', studentDeadline:'2026-11-30', deadlineStage:'Student applications',
    required:['class10','class12','income','admission','bonafide','fee','bank','family_declaration','nsp_otr'],
    criteria:['Girl student admitted to the first year of an AICTE-approved technical degree programme through the prescribed admission process.','No more than two girl children from the family under the cited brochure.','Family income not more than ₹8 lakh per year.'],
    caveats:['Detailed rules may have been updated after the brochure snapshot. Verify the current degree-specific NSP specification and FAQ.','The brochure contains identity and bank evidence requirements; CampusPulse never asks you to upload or type Aadhaar or bank numbers.']
  },
  {
    id:'aicte-saksham-degree', name:'AICTE Saksham Scholarship Scheme for Specially Abled Students — Technical Degree', shortName:'AICTE Saksham (Degree)',
    category:'Welfare-based · Technical education', provider:'All India Council for Technical Education (AICTE)',
    sourceUrl:'https://scholarships.gov.in/All-Scholarships', ruleSource:'AICTE Saksham scheme guidelines; confirm current NSP specification', sourceDate:'Guideline snapshot; NSP AY 2026–27 catalogue checked 17 Nov 2026',
    summary:'Support for eligible students with benchmark disabilities pursuing an AICTE-approved technical degree.', amount:'₹50,000 per year in the cited scheme guideline; verify the current scheme specification.',
    deadlineNote:'Check the live NSP listing for the current student application and renewal windows before relying on an older brochure timeline.',
    required:['class10','class12','income','admission','bonafide','disability','udid','bank','nsp_otr'],
    criteria:['Benchmark disability of 40% or more.','Admitted to the first year of an AICTE-approved technical degree programme under the prescribed admission process.','Family income up to ₹8 lakh per year.'],
    caveats:['Current year’s specification and any lateral-entry rules must be verified on the scheme page.','Disability status is optional in this checker; leave it blank if you do not want to provide it.']
  },
  {
    id:'top-class-sc', name:'Central Sector Scholarship of Top Class Education for SC Students', shortName:'Top Class SC',
    category:'Merit-cum-means · SC', provider:'Department of Social Justice and Empowerment',
    sourceUrl:'https://scholarships.gov.in/All-Scholarships', ruleSource:'Top Class Scholarship for SC Students Guidelines, applicable from 2025–26', sourceDate:'2025–26 guideline; NSP AY 2026–27 catalogue checked 17 Nov 2026',
    summary:'Financial support for SC students admitted to prescribed full-time courses in institutions notified by the Ministry.', amount:'Varies by approved course / guideline components; see current scheme guidelines.',
    deadlineNote:'NSP AY 2026–27 catalogue shows student applications open until 30 Nov 2026. Institution-wise slots and the current notified list still apply.', studentDeadline:'2026-11-30', deadlineStage:'Student applications',
    required:['caste','income','admission','fee','institution_list','bank','nsp_otr'],
    criteria:['Applicant belongs to the Scheduled Caste category.','Family income up to ₹8 lakh per year.','Admission to a full-time prescribed course at an institution notified by the Ministry.','Selection is subject to institution-wise scholarship slots.'],
    caveats:['The published guideline applies from 2025–26 and refers to notified institutions for 2024–25 to 2025–26. Confirm the current notified-institution list and current scheme rules.']
  },
  {
    id:'depwd-post-matric', name:'Post-Matric Scholarship for Students with Disabilities', shortName:'DEPwD Post-Matric',
    category:'Welfare-based · Disability', provider:'Department of Empowerment of Persons with Disabilities',
    sourceUrl:'https://depwd.gov.in/en/scholarship-post-matric/', ruleSource:'DEPwD Post-Matric Scholarship scheme page', sourceDate:'Official page checked 17 Nov 2026',
    summary:'Post-matric support for eligible Indian students with benchmark disabilities studying in Class 11/12, diploma, degree or postgraduate programmes.', amount:'Fee and maintenance support vary by approved component and hosteller / day-scholar status; consult the scheme page.',
    deadlineNote:'NSP AY 2026–27 catalogue shows student applications open until 30 Nov 2026. Disability-related verification steps and consent must be completed as instructed by NSP.', studentDeadline:'2026-11-30', deadlineStage:'Student applications',
    required:['class10','class12','income','admission','bonafide','disability','udid','bank','nsp_otr'],
    criteria:['Indian national.','Benchmark disability of 40% or more.','Family income up to ₹2.5 lakh per year.','Enrolled in an eligible post-matric course; the official scheme page lists Class 11/12, diploma, degree and postgraduate study.','Not receiving another post-matric scholarship or stipend.'],
    caveats:['The portal states UDID and Aadhaar requirements. CampusPulse does not request Aadhaar number, UDID number or bank details.','Verify the latest scheme guideline for any additional restrictions and document format.']
  }
];

export type AssessmentResult = { scheme:ScholarshipScheme; status:'Potential match'|'Needs more information'|'Not a match'; reasons:string[]; missingAnswers:string[]; missingDocuments:DocumentId[]; matchedCriteria:number; totalCriteria:number };

export function assessScholarships(facts:StudentFacts, documents:DocumentId[]):AssessmentResult[] {
  const income = facts.familyIncome.trim() === '' ? null : Number(facts.familyIncome);
  const disability = facts.disabilityPercent.trim() === '' ? null : Number(facts.disabilityPercent);
  const results:AssessmentResult[] = [];
  for (const scheme of scholarshipSchemes) {
    const failures:string[]=[]; const unknown:string[]=[]; const matched:string[]=[];
    const check = (label:string, result:YesNo | boolean | null) => {
      if (result === true || result === 'yes') matched.push(label);
      else if (result === false || result === 'no') failures.push(label);
      else unknown.push(label);
    };
    const incomeCheck=(limit:number)=> income===null || !Number.isFinite(income) ? null : income<=limit;
    if(scheme.id==='pm-usp-csss'){
      check('Above the 80th percentile in the relevant Class 12 stream',facts.above80Percentile==='yes'?true:facts.above80Percentile==='no'?false:null);
      check('Regular / full-time study mode',facts.courseMode==='Regular / full-time'?true:facts.courseMode===''||facts.courseMode==='Unknown'?null:false);
      check('Family income within ₹4.5 lakh',incomeCheck(450000));
      check('Not receiving another scholarship / fee reimbursement',facts.receivesOtherScholarship==='no'?true:facts.receivesOtherScholarship==='yes'?false:null);
      check('Undergraduate degree course',facts.studyLevel==='Undergraduate'?true:facts.studyLevel===''?null:false);
      check('No drop after Class 12',facts.gapAfterClass12==='no'?true:facts.gapAfterClass12==='yes'?false:null);
    } else if(scheme.id==='aicte-pragati-degree'){
      check('Girl student',facts.gender==='Female'?true:facts.gender===''||facts.gender==='Prefer not to say'?null:false);
      check('Technical degree programme',facts.technicalCourse==='yes'?true:facts.technicalCourse==='no'?false:null);
      check('AICTE-approved institution',facts.aicteApproved==='yes'?true:facts.aicteApproved==='no'?false:null);
      check('First-year degree admission',facts.admissionStage==='First year'?true:facts.admissionStage===''||facts.admissionStage==='Unknown'?null:false);
      check('Family has no more than two girl children',facts.girlsInFamily===''?null:Number(facts.girlsInFamily)<=2);
      check('Family income within ₹8 lakh',incomeCheck(800000));
    } else if(scheme.id==='aicte-saksham-degree'){
      check('Benchmark disability of 40% or more',disability===null?null:disability>=40);
      check('Technical degree programme',facts.technicalCourse==='yes'?true:facts.technicalCourse==='no'?false:null);
      check('AICTE-approved institution',facts.aicteApproved==='yes'?true:facts.aicteApproved==='no'?false:null);
      check('First-year degree admission',facts.admissionStage==='First year'?true:facts.admissionStage===''||facts.admissionStage==='Unknown'?null:false);
      check('Family income within ₹8 lakh',incomeCheck(800000));
    } else if(scheme.id==='top-class-sc'){
      check('Scheduled Caste category',facts.category==='SC'?true:facts.category===''?null:false);
      check('Full-time course',facts.courseMode==='Regular / full-time'?true:facts.courseMode===''||facts.courseMode==='Unknown'?null:false);
      check('Institution on current notified list',facts.notifiedInstitution==='yes'?true:facts.notifiedInstitution==='no'?false:null);
      check('Family income within ₹8 lakh',incomeCheck(800000));
      check('Post-Class-12 study level',facts.studyLevel===''?null:['Undergraduate','Postgraduate','Research','Diploma'].includes(facts.studyLevel));
    } else if(scheme.id==='depwd-post-matric'){
      check('Indian national',facts.indianCitizen==='yes'?true:facts.indianCitizen==='no'?false:null);
      check('Benchmark disability of 40% or more',disability===null?null:disability>=40);
      check('Family income within ₹2.5 lakh',incomeCheck(250000));
      check('Eligible post-matric study level',facts.studyLevel===''?null:['Class 11 / 12','Diploma','Undergraduate','Postgraduate'].includes(facts.studyLevel));
      check('Not receiving another post-matric scholarship / stipend',facts.receivesOtherScholarship==='no'?true:facts.receivesOtherScholarship==='yes'?false:null);
    }
    const missingDocuments=scheme.required.filter(id=>!documents.includes(id));
    const status=failures.length?'Not a match':unknown.length?'Needs more information':'Potential match';
    results.push({scheme,status,reasons:[...failures.map(x=>`Does not meet: ${x}`),...matched.map(x=>`Matches: ${x}`)],missingAnswers:unknown,missingDocuments,matchedCriteria:matched.length,totalCriteria:matched.length+failures.length+unknown.length});
  }
  const priority: Record<AssessmentResult['status'], number> = { 'Potential match':0, 'Needs more information':1, 'Not a match':2 };
  return results.sort((a,b)=>priority[a.status]-priority[b.status] || b.matchedCriteria-a.matchedCriteria);
}