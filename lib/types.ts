export type OpportunityType = 'Scholarship';
export type SourceKind = 'Official portal' | 'Official catalogue' | 'Curated reference' | 'Demo sample';
export type OpportunityStatus = 'Interested' | 'Preparing' | 'Applied' | 'Under verification' | 'Defected' | 'Rejected' | 'Approved' | 'Awarded' | 'Withdrawn';
export type Opportunity = {
  id: string; title: string; organization: string; type: OpportunityType; category: string;
  description: string; amount?: string; location: string; mode: 'Remote' | 'Hybrid' | 'On-site' | 'Varies';
  deadline?: string; deadlineLabel?: string; sourceName: string; sourceUrl: string; sourceKind: SourceKind;
  lastChecked: string; statusNote: string; eligibility: { levels?: string[]; branches?: string[]; states?: string[]; minCgpa?: number; skills?: string[]; note?: string };
  documents?: string[]; tags: string[];
};
export type StudentProfile = { name: string; institution: string; degree: string; branch: string; year: string; state: string; city: string; cgpa: string; skills: string[]; interests: string[]; preferredMode: string };
export type TrackerItem = { opportunityId: string; status: OpportunityStatus; notes: string; nextAction: string; reminderDate: string; updatedAt: string };
export type Reminder = { id: string; title: string; date: string; kind: 'Provider deadline' | 'Personal reminder'; done: boolean; opportunityId?: string };