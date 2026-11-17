import {redirect} from 'next/navigation';
export default async function LegacyOpportunityDetail({params}:{params:Promise<{id:string}>}){
 const {id}=await params;
 redirect(`/scholarships/${id}`);
}