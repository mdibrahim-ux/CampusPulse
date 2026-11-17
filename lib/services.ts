export type StudentService = {
  id: string;
  name: string;
  category: 'Transport' | 'Academic records' | 'Education finance' | 'Developer tools' | 'Design tools' | 'Cloud & learning' | 'Productivity';
  summary: string;
  benefit: string;
  eligibility: string;
  verification: string;
  url: string;
  urlLabel: string;
  tags: string[];
  featured?: boolean;
  note?: string;
};

export const studentServices: StudentService[] = [
  {
    id: 'karnataka-student-bus-pass', name: 'Karnataka student bus pass', category: 'Transport',
    summary: 'Apply for the 2026–27 concessional student bus pass process through Karnataka Seva Sindhu. KSRTC says eligible school, PU, diploma, ITI, professional-course and PhD students can apply online.',
    benefit: 'Online application is reported as free. Karnataka-One / Grama-One / Bangalore-One assisted applications may carry a service charge. Choose an approved collection counter after submission.',
    eligibility: 'Eligibility, route and operator rules depend on the current pass category. The current 2026–27 KSRTC process is not a blanket BMTC guarantee; check the operator and service shown in Seva Sindhu.',
    verification: 'Confirm the current service name, dates, required declaration and pass counter in Seva Sindhu before applying.',
    url: 'https://sevasindhu.karnataka.gov.in/', urlLabel: 'Open Seva Sindhu', tags: ['Karnataka', 'KSRTC', '2026–27'], featured: true,
    note: 'For Bengaluru city services, confirm whether your route is under BMTC and check BMTC notices separately. Do not assume a KSRTC pass is valid on BMTC.'
  },
  {
    id: 'digilocker', name: 'DigiLocker academic documents', category: 'Academic records',
    summary: 'Access verified documents issued by participating boards, universities and government departments in a digital wallet.',
    benefit: 'Helps retrieve and share issued digital records without repeatedly carrying paper copies, where the receiving authority accepts DigiLocker documents.',
    eligibility: 'Students can create an account; availability of a particular certificate depends on the issuing board, university or department.',
    verification: 'Check that the document is an issuer-issued record in DigiLocker, not merely a user-uploaded scan.',
    url: 'https://www.digilocker.gov.in/', urlLabel: 'Open DigiLocker', tags: ['Documents', 'Academic records', 'Government']
  },
  {
    id: 'academic-bank-credits', name: 'Academic Bank of Credits (ABC) / APAAR', category: 'Academic records',
    summary: 'Create or access an academic credit account linked with APAAR and participating institutions.',
    benefit: 'Supports secure storage, tracking, transfer and redemption of academic credits where the institution and programme participate.',
    eligibility: 'Institution participation and verified credit uploads matter. An ID alone does not mean every institution or course has deposited credits.',
    verification: 'Confirm your institution is registered and the credits are correctly linked before relying on the record.',
    url: 'https://abc.digilocker.gov.in/', urlLabel: 'Open ABC portal', tags: ['APAAR', 'Credits', 'NEP']
  },
  {
    id: 'pm-vidyalaxmi', name: 'PM-Vidyalaxmi education finance portal', category: 'Education finance',
    summary: 'Unified portal to apply for education loans from member banks, track loan status, raise grievances and claim interest subvention when eligible.',
    benefit: 'The student manual states that students may select up to three banks and track responses through the portal.',
    eligibility: 'Loan and interest-subvention eligibility depends on the applicable scheme, institution, course and bank assessment.',
    verification: 'Review the current scheme rules and bank terms. A portal application is not a loan sanction.',
    url: 'https://pmvidyalaxmi.co.in/', urlLabel: 'Open PM-Vidyalaxmi', tags: ['Education loan', 'Fee support', 'Finance'], featured: true
  },
  {
    id: 'github-student-pack', name: 'GitHub Student Developer Pack', category: 'Developer tools',
    summary: 'A curated bundle of development tools and partner offers, including GitHub Pro and other student offers.',
    benefit: 'The offer catalogue changes; current examples include GitHub Pro, Copilot Student, cloud credits and partner learning tools.',
    eligibility: 'Enrolled in a degree- or diploma-granting programme, age 13+, with proof of current student status. GitHub may request a school email or dated enrolment evidence; email alone is not always enough.',
    verification: 'Apply through GitHub Education and check each partner offer’s own terms, duration and availability.',
    url: 'https://education.github.com/pack', urlLabel: 'Explore Student Pack', tags: ['College email', 'Student verification', 'Developer'], featured: true
  },
  {
    id: 'azure-students', name: 'Microsoft Azure for Students', category: 'Cloud & learning',
    summary: 'Azure for Students includes USD 100 in credit for the first 12 months plus select free services, without a credit card at sign-up.',
    benefit: 'Useful for cloud projects, deployment experiments and learning Azure services; credits and services are subject to Microsoft terms.',
    eligibility: '18+ and a full-time student at an accredited degree-granting two- or four-year institution; verify student status with the organisation email. One subscription per eligible customer.',
    verification: 'Check the current Microsoft offer terms and expiry before activating or deploying billable resources.',
    url: 'https://azure.microsoft.com/en-in/pricing/offers/ms-azr-0170p/', urlLabel: 'Check Azure offer', tags: ['College email', 'Cloud', 'USD 100 credit'], featured: true
  },
  {
    id: 'jetbrains-student-pack', name: 'JetBrains Student Pack', category: 'Developer tools',
    summary: 'Full versions of JetBrains IDEs and student learning resources while you remain eligible.',
    benefit: 'Includes multiple professional IDEs; the exact product bundle and AI add-ons can change over time.',
    eligibility: 'Full-time student in a programme lasting one year or more. University email, ISIC/ITIC or GitHub Student Developer Pack can be used for verification.',
    verification: 'Renew annually and confirm eligibility directly in the JetBrains account.',
    url: 'https://www.jetbrains.com/academy/student-pack/', urlLabel: 'Apply for Student Pack', tags: ['College email', 'IDE', 'Coding']
  },
  {
    id: 'figma-education', name: 'Figma for Education', category: 'Design tools',
    summary: 'Free Professional access for eligible higher-education students and educators through the Figma Education programme.',
    benefit: 'Useful for UI/UX design, prototyping, team projects and collaborative FigJam work.',
    eligibility: 'Current higher-education student or educator with verified education status and a school email. Availability is region-dependent.',
    verification: 'Complete Figma’s education verification. Merely signing up with a college email does not automatically grant the plan.',
    url: 'https://help.figma.com/hc/en-us/articles/360041061214-Figma-for-Education', urlLabel: 'Check Figma Education', tags: ['College email', 'UI/UX', 'Prototyping']
  },
  {
    id: 'autodesk-education', name: 'Autodesk Education plan', category: 'Design tools',
    summary: 'Eligible students can receive one-year, single-user access to Autodesk education software for educational purposes, renewable annually while eligible.',
    benefit: 'Relevant to CAD, architecture, engineering design, 3D modelling and simulation coursework.',
    eligibility: 'Must meet Autodesk’s student/education verification requirements; educational use only.',
    verification: 'Verify with Autodesk and read product-specific restrictions before using software for commercial work.',
    url: 'https://www.autodesk.com/support/account/education/students-educators/overview', urlLabel: 'Check Autodesk Education', tags: ['College email', 'CAD', 'Engineering']
  },
  {
    id: 'aws-educate', name: 'AWS Educate', category: 'Cloud & learning',
    summary: 'Free, self-paced cloud and AI learning paths with hands-on practice resources.',
    benefit: 'AWS describes Educate as open to individuals regardless of education status or prior technical experience.',
    eligibility: 'No college email is required for the general AWS Educate learning access described by AWS.',
    verification: 'Do not assume AWS Educate includes general-purpose paid AWS credits. Check the offer page for the exact learner sandbox and service limits.',
    url: 'https://aws.amazon.com/education/awseducate/', urlLabel: 'Explore AWS Educate', tags: ['Free learning', 'Cloud', 'No student email required']
  },
  {
    id: 'notion-education', name: 'Notion Education Plan', category: 'Productivity',
    summary: 'A free one-member Education workspace for eligible college and university students, with expanded pages, blocks, uploads and version history.',
    benefit: 'Useful for notes, project planning, reading lists, personal knowledge bases and student organisation workspaces.',
    eligibility: 'Accredited college/university student or educator with a school email recognised by WHED. A school email must be the primary account email; student ID alone is not accepted for this offer.',
    verification: 'Re-verify once a year. The Education Plan is for one individual workspace; student organisation workspaces have separate rules.',
    url: 'https://www.notion.com/product/notion-for-education', urlLabel: 'Get Notion Education', tags: ['College email', 'Productivity', 'Notes']
  },
  {
    id: 'microsoft-365-education', name: 'Microsoft 365 Education A1', category: 'Productivity',
    summary: 'Eligible students at qualified educational organisations can access the free Office 365 A1 education plan.',
    benefit: 'Provides education-plan access to Microsoft productivity services; the included features depend on the institution’s plan and current Microsoft terms.',
    eligibility: 'Students and educators with an eligible education email at a qualified educational organisation. Availability is institution-dependent.',
    verification: 'Use the school email eligibility check. Having any .edu or college email domain does not automatically qualify; the institution must be eligible.',
    url: 'https://www.microsoft.com/en-us/education/products/office', urlLabel: 'Check Microsoft education access', tags: ['College email', 'Office', 'OneDrive']
  },
  {
    id: 'google-workspace-education', name: 'Google Workspace for Education', category: 'Productivity',
    summary: 'Google Workspace Education Fundamentals is available at no cost to qualifying educational institutions and is typically managed by the institution.',
    benefit: 'May provide institution-managed Gmail, Drive, Docs, Sheets, Slides, Classroom, Meet and related services according to the institution’s edition and policies.',
    eligibility: 'The institution must qualify and provision student accounts. Students cannot assume that an individual college email grants a separately claimed Education Fundamentals plan.',
    verification: 'Ask your college IT administrator which Workspace edition and student features your institution provides.',
    url: 'https://edu.google.com/workspace-for-education/editions/overview/', urlLabel: 'Explore Google Workspace Education', tags: ['College email', 'Institution-managed', 'Google tools']
  },
  {
    id: 'canva-education', name: 'Canva Education — eligibility note', category: 'Design tools',
    summary: 'Canva Education is often mentioned in student-benefit lists, but its current eligibility rules are primarily for K–12 teachers and institutions.',
    benefit: 'This listing is included to prevent university students from relying on an inapplicable free-plan claim.',
    eligibility: 'Canva says higher-education teachers and institutions are not currently eligible for Canva Education under its published eligibility guidance.',
    verification: 'Check Canva’s current eligibility page; a university email does not establish Education-plan eligibility.',
    url: 'https://www.canva.com/education/eligibility-guidelines/', urlLabel: 'Read eligibility rules', tags: ['Eligibility check', 'K–12 focused', 'Not a university benefit']
  }
];

export const serviceCategories = ['All', 'Transport', 'Academic records', 'Education finance', 'Developer tools', 'Design tools', 'Cloud & learning', 'Productivity'] as const;