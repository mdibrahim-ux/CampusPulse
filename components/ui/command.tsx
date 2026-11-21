'use client';
import * as React from 'react';
import { Search,Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Dialog,DialogContent } from '@/components/ui/dialog';
type Ctx={query:string;setQuery:(q:string)=>void};const CommandCtx=React.createContext<Ctx>({query:'',setQuery:()=>undefined});
export function Command({children,className,...props}:React.HTMLAttributes<HTMLDivElement>){const[query,setQuery]=React.useState('');return <CommandCtx.Provider value={{query,setQuery}}><div role="combobox" aria-expanded="true" aria-controls="cp-command-list" className={cn('cp-command',className)} {...props}>{children}</div></CommandCtx.Provider>}
export function CommandInput({placeholder='Type to search…',className,...props}:React.InputHTMLAttributes<HTMLInputElement>){const{query,setQuery}=React.useContext(CommandCtx);return <div className="cp-command-input-wrap"><Search size={15}/><input value={query} onChange={e=>setQuery(e.target.value)} placeholder={placeholder} className={cn('cp-command-input',className)} {...props}/></div>}
export function CommandList({className,...props}:React.HTMLAttributes<HTMLDivElement>){return <div id="cp-command-list" role="listbox" className={cn('cp-command-list',className)} {...props}/>}
export function CommandEmpty({children='No results found.',className,...props}:React.HTMLAttributes<HTMLDivElement>){const{query}=React.useContext(CommandCtx);return query?<div className={cn('cp-command-empty',className)} {...props}>{children}</div>:null}
export function CommandGroup({heading,children,className,...props}:React.HTMLAttributes<HTMLDivElement>&{heading?:string}){return <div role="group" aria-label={heading} className={cn('cp-command-group',className)} {...props}>{heading&&<div className="cp-command-heading">{heading}</div>}{children}</div>}
export function CommandItem({value,children,onSelect,onClick,onKeyDown,className,...props}:React.HTMLAttributes<HTMLDivElement>&{value?:string;onSelect?:()=>void}){const{query}=React.useContext(CommandCtx);const label=value||String(children??'');if(query&&!label.toLowerCase().includes(query.toLowerCase()))return null;return <div role="option" aria-selected={false} tabIndex={0} className={cn('cp-command-item',className)} onClick={e=>{onSelect?.();onClick?.(e)}} onKeyDown={e=>{if((e.key==='Enter'||e.key===' ')&&onSelect){e.preventDefault();onSelect()}onKeyDown?.(e)}} {...props}>{children}</div>}
export function CommandSeparator({className,...props}:React.HTMLAttributes<HTMLHRElement>){return <hr className={cn('cp-command-separator',className)} {...props}/>}
export function CommandShortcut({className,...props}:React.HTMLAttributes<HTMLSpanElement>){return <span className={cn('cp-command-shortcut',className)} {...props}/>}
export function CommandDialog({children,open,onOpenChange}:React.PropsWithChildren<{open:boolean;onOpenChange:(open:boolean)=>void}>){return <Dialog open={open} onOpenChange={onOpenChange}><DialogContent className="cp-command-dialog"><Command>{children}</Command></DialogContent></Dialog>}
export function CommandCheck({checked=false}: {checked?:boolean}){return <span className="cp-command-check">{checked?<Check size={14}/>:null}</span>}
