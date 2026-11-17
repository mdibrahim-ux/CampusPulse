'use client';
import {blankProfile,profileKey,trackerKey,remindersKey} from './data';
import type {Reminder,StudentProfile,TrackerItem} from './types';
function read<T>(key:string,fallback:T):T { if(typeof window==='undefined')return fallback;try{const raw=localStorage.getItem(key);return raw?JSON.parse(raw) as T:fallback}catch{return fallback} }
function write<T>(key:string,value:T){if(typeof window!=='undefined')localStorage.setItem(key,JSON.stringify(value))}
export const getProfile=()=>read<StudentProfile>(profileKey,blankProfile);
export const saveProfile=(p:StudentProfile)=>write(profileKey,p);
export const getTracker=()=>{
 const raw=read<Array<TrackerItem & {status:string}>>(trackerKey,[]);
 const migrated=raw.map(item=>({ ...item, status: (
   item.status==='Assessment' || item.status==='Interview' ? 'Under verification' :
   item.status==='Offer' ? 'Awarded' :
   item.status==='Not selected' ? 'Rejected' : item.status
 ) as TrackerItem['status'] }));
 if (typeof window!=='undefined' && JSON.stringify(raw)!==JSON.stringify(migrated)) write(trackerKey,migrated);
 return migrated;
};
export const saveTracker=(v:TrackerItem[])=>write(trackerKey,v);
export const getReminders=()=>read<Reminder[]>(remindersKey,[]);
export const saveReminders=(v:Reminder[])=>write(remindersKey,v);
const documentKey='campuspulse.document-checks.v2';
export type DocumentChecks=Record<string,string[]>;
export const getDocumentChecks=()=>read<DocumentChecks>(documentKey,{});
export const saveDocumentChecks=(value:DocumentChecks)=>write(documentKey,value);