'use client';
import * as React from 'react';
import {PanelLeft} from 'lucide-react';
import { cn } from '@/lib/utils';
const Ctx=React.createContext<{collapsed:boolean;toggle:()=>void}>({collapsed:false,toggle:()=>undefined});
export function SidebarProvider({children,defaultOpen=true,className,...props}:React.HTMLAttributes<HTMLDivElement>&{defaultOpen?:boolean}){const[collapsed,setCollapsed]=React.useState(!defaultOpen);return <Ctx.Provider value={{collapsed,toggle:()=>setCollapsed(v=>!v)}}><div data-collapsed={collapsed} className={cn('cp-sidebar-provider',className)} {...props}>{children}</div></Ctx.Provider>}
export function Sidebar({children,className,...props}:React.HTMLAttributes<HTMLElement>){const{collapsed}=React.useContext(Ctx);return <aside data-collapsed={collapsed} className={cn('cp-sidebar',className)} {...props}>{children}</aside>}
export function SidebarInset({children,className,...props}:React.HTMLAttributes<HTMLElement>){return <main className={cn('cp-sidebar-inset',className)} {...props}>{children}</main>}
export function SidebarTrigger({children,className,onClick,...props}:React.ButtonHTMLAttributes<HTMLButtonElement>){const{toggle}=React.useContext(Ctx);return <button type="button" aria-label="Toggle sidebar" className={cn('cp-sidebar-trigger',className)} onClick={e=>{toggle();onClick?.(e)}} {...props}>{children||<PanelLeft size={16}/>}</button>}
export function SidebarHeader({className,...props}:React.HTMLAttributes<HTMLDivElement>){return <div className={cn('cp-sidebar-header',className)} {...props}/>}
export function SidebarContent({className,...props}:React.HTMLAttributes<HTMLDivElement>){return <div className={cn('cp-sidebar-content',className)} {...props}/>}
export function SidebarFooter({className,...props}:React.HTMLAttributes<HTMLDivElement>){return <div className={cn('cp-sidebar-footer',className)} {...props}/>}
export function SidebarGroup({className,...props}:React.HTMLAttributes<HTMLDivElement>){return <section className={cn('cp-sidebar-group',className)} {...props}/>}
export function SidebarGroupLabel({className,...props}:React.HTMLAttributes<HTMLDivElement>){return <div className={cn('cp-sidebar-group-label',className)} {...props}/>}
export function SidebarMenu({className,...props}:React.HTMLAttributes<HTMLUListElement>){return <ul className={cn('cp-sidebar-menu',className)} {...props}/>}
export function SidebarMenuItem({className,...props}:React.LiHTMLAttributes<HTMLLIElement>){return <li className={cn('cp-sidebar-menu-item',className)} {...props}/>}
export function SidebarMenuButton({className,...props}:React.ButtonHTMLAttributes<HTMLButtonElement>){return <button type="button" className={cn('cp-sidebar-menu-button',className)} {...props}/>}
