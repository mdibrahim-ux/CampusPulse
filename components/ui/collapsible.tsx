'use client';
import * as React from 'react';
import { AnimatePresence,motion } from 'framer-motion';
import { cn } from '@/lib/utils';
const Ctx=React.createContext<{open:boolean;setOpen:(v:boolean)=>void}>({open:false,setOpen:()=>undefined});
export function Collapsible({open:controlled,defaultOpen=false,onOpenChange,children,className,...props}:React.HTMLAttributes<HTMLDivElement>&{open?:boolean;defaultOpen?:boolean;onOpenChange?:(v:boolean)=>void}){const[local,setLocal]=React.useState(defaultOpen);const open=controlled??local;const setOpen=(v:boolean)=>{if(controlled===undefined)setLocal(v);onOpenChange?.(v)};return <Ctx.Provider value={{open,setOpen}}><div data-state={open?'open':'closed'} className={cn('cp-collapsible',className)} {...props}>{children}</div></Ctx.Provider>}
export function CollapsibleTrigger({children,className,onClick,...props}:React.ButtonHTMLAttributes<HTMLButtonElement>){const{open,setOpen}=React.useContext(Ctx);return <button type="button" aria-expanded={open} className={cn('cp-collapsible-trigger',className)} onClick={e=>{setOpen(!open);onClick?.(e)}} {...props}>{children}</button>}
export function CollapsibleContent({children,className,...props}:React.HTMLAttributes<HTMLDivElement>){const{open}=React.useContext(Ctx);return <AnimatePresence initial={false}>{open&&<motion.div initial={{height:0,opacity:0}} animate={{height:'auto',opacity:1}} exit={{height:0,opacity:0}} transition={{duration:.18}} className={cn('cp-collapsible-content',className)} {...props}>{children}</motion.div>}</AnimatePresence>}
