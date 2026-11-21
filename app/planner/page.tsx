'use client';
import {useEffect,useState} from 'react';
import {CalendarClock,Check,Plus,Trash2} from 'lucide-react';
import {getReminders,saveReminders} from '@/lib/storage';
import {SectionHeading} from '@/components/section-heading';
import {DatePicker} from '@/components/ui/date-picker';
import {Calendar} from '@/components/ui/calendar';
import {Progress} from '@/components/ui/progress';
import type {Reminder} from '@/lib/types';
export default function PlannerPage(){
 const[items,setItems]=useState<Reminder[]>([]);const[title,setTitle]=useState('');const[date,setDate]=useState('');const[ready,setReady]=useState(false);
 useEffect(()=>{setItems(getReminders());setReady(true)},[]);
 const persist=(next:Reminder[])=>{setItems(next);saveReminders(next);window.dispatchEvent(new Event('campuspulse-reminders'))};
 const add=()=>{if(!title.trim()||!date)return;persist([...items,{id:crypto.randomUUID(),title:title.trim(),date,kind:'Personal reminder',done:false}]);setTitle('');setDate('')};
 const sorted=[...items].sort((a,b)=>a.date.localeCompare(b.date));const complete=items.filter(x=>x.done).length;const now=new Date();const today=[now.getFullYear(),String(now.getMonth()+1).padStart(2,'0'),String(now.getDate()).padStart(2,'0')].join('-');
 if(!ready)return <div className="loading-panel">Loading planner…</div>;
 return <div className="planner-page"><SectionHeading eyebrow="YOUR DATES, CLEARLY SEPARATED" title="Plan the next step." description="Save personal reminders here. Scholarship closing dates must be confirmed on the official scheme page and should never be inferred from a catalogue."/>
  <div className="planner-layout"><section className="planner-create"><span className="eyebrow">ADD A PERSONAL FOLLOW-UP</span><h2>Give future-you a nudge.</h2>
   <label className="field"><span>What needs doing?</span><input value={title} onChange={e=>setTitle(e.target.value)} placeholder="e.g. Request my updated marksheet"/></label>
   <label className="field"><span>Remind me on</span><DatePicker value={date} onChange={setDate} min={today} placeholder="Choose a reminder date"/></label>
   <button className="button button-dark" onClick={add} disabled={!title.trim()||!date}><Plus size={15}/> Add reminder</button>
   <p>Your reminders are stored in local browser storage. No email or push notification is sent.</p>
   <div className="planner-progress"><div><span className="eyebrow">YOUR FOLLOW-UPS</span><b>{complete} of {items.length} completed</b></div><Progress value={items.length?complete/items.length*100:0}/></div>
  </section>
  <section className="planner-list"><div className="planner-list-head"><CalendarClock size={20}/><h2>Your reminders</h2><b>{items.length}</b></div>
   {sorted.length?sorted.map(item=><div className={'planner-reminder '+(item.done?'done':'')} key={item.id}><button className="reminder-check" onClick={()=>persist(items.map(x=>x.id===item.id?{...x,done:!x.done}:x))} aria-label={item.done?'Mark not done':'Mark done'}>{item.done?<Check size={14}/>:null}</button><div><b>{item.title}</b><small>{new Date(item.date+'T00:00:00').toLocaleDateString('en-IN',{day:'numeric',month:'short',year:'numeric'})} · Personal reminder</small></div><button className="reminder-delete" onClick={()=>persist(items.filter(x=>x.id!==item.id))} aria-label="Delete reminder"><Trash2 size={15}/></button></div>):<div className="empty-inline"><CalendarClock size={25}/><b>No personal reminders yet.</b><p>Create one when you have a scholarship follow-up to remember.</p></div>}
   <div className="planner-calendar-preview"><span className="eyebrow">QUICK DATE VIEW</span><Calendar onSelect={d=>d&&setDate([d.getFullYear(),String(d.getMonth()+1).padStart(2,'0'),String(d.getDate()).padStart(2,'0')].join('-'))}/></div>
  </section></div>
  <div className="planner-warning"><b>Provider deadlines are not automatically synced.</b><p>NSP and other providers may publish student, institute and verification cut-offs separately. Confirm the correct date for the exact scheme or listing before entering it as a reminder.</p></div>
 </div>;
}
