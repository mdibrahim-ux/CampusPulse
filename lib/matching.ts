import type { Opportunity, StudentProfile } from './types';
export type MatchResult = { score:number|null; label:'Profile fit'|'Needs review'|'Not enough information'; matched:string[]; missing:string[]; unknown:string[] };
const has = (v:string) => v.trim().length>0;
export function matchOpportunity(item:Opportunity, profile:StudentProfile):MatchResult {
 const matched:string[]=[]; const missing:string[]=[]; const unknown:string[]=[];
 const e=item.eligibility;
 if (!has(profile.year) || !has(profile.branch) || !has(profile.state)) unknown.push('Complete your study year, programme and state to improve this assessment.');
 if (e.levels?.length) {
   if (!has(profile.year)) unknown.push('Study level has not been added to your profile.');
   else if (e.levels.includes('Student') || e.levels.includes('Learner') || e.levels.includes('Varies') || e.levels.some(x=>profile.year.toLowerCase().includes(x.toLowerCase()))) matched.push('Your current study status may fit this directory.');
   else unknown.push('The provider uses programme-specific study-level rules.');
 }
 if (e.branches?.length) {
   if (!has(profile.branch)) unknown.push('Add your programme or branch.');
   else if (e.branches.includes('All') || e.branches.some(x=>profile.branch.toLowerCase().includes(x.toLowerCase())||x.toLowerCase().includes(profile.branch.toLowerCase()))) matched.push('Your programme matches a listed field.');
   else missing.push('Your programme is not confirmed in the listed fields.');
 }
 if (e.states?.length) {
   if (!has(profile.state)) unknown.push('Add your state.');
   else if (e.states.includes('All') || e.states.some(x=>x.toLowerCase()===profile.state.toLowerCase())) matched.push('Your state matches the stated coverage.');
   else missing.push('The stated location coverage may not include your state.');
 }
 if (e.minCgpa!==undefined) {
   if (!has(profile.cgpa)) unknown.push('Add your CGPA to compare the stated minimum.');
   else if (Number(profile.cgpa)>=e.minCgpa) matched.push(`Your CGPA meets the stated ${e.minCgpa} minimum.`);
   else missing.push(`The stated minimum is ${e.minCgpa}; your profile is below that value.`);
 }
 if (e.skills?.length) {
   if (!profile.skills.length) unknown.push('Add skills to compare role requirements.');
   else { const hits=e.skills.filter(req=>profile.skills.some(s=>s.toLowerCase().includes(req.toLowerCase())||req.toLowerCase().includes(s.toLowerCase()))); if(hits.length) matched.push(`Related skills: ${hits.join(', ')}.`); else missing.push('No overlapping skills found yet.'); }
 }
 if (e.note) unknown.push(e.note);
 if (!matched.length && !missing.length) return {score:null,label:'Not enough information',matched,missing,unknown};
 const score=Math.min(96,Math.round((matched.length/(matched.length+missing.length+Math.max(unknown.length*.45,0)))*100));
 return {score,label:missing.length?'Needs review':'Profile fit',matched,missing,unknown};
}