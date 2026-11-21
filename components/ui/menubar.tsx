'use client';
import * as React from 'react';
import { cn } from '@/lib/utils';
type MenuContext={open:boolean;setOpen:(open:boolean)=>void};
const MenuCtx=React.createContext<MenuContext>({open:false,setOpen:()=>undefined});
export function Menubar({children,className,...props}:React.HTMLAttributes<HTMLDivElement>){return <div role="menubar" className={cn('cp-menubar',className)} {...props}>{children}</div>}
export function MenubarMenu({children,className}:React.PropsWithChildren<{className?:string}>){const[open,setOpen]=React.useState(false);return <MenuCtx.Provider value={{open,setOpen}}><div className={cn('cp-menubar-menu',className)}>{children}</div></MenuCtx.Provider>}
export function MenubarTrigger({children,className,onClick,...props}:React.ButtonHTMLAttributes<HTMLButtonElement>){const{open,setOpen}=React.useContext(MenuCtx);return <button type="button" role="menuitem" aria-expanded={open} className={cn('cp-menubar-trigger',className)} onClick={e=>{setOpen(!open);onClick?.(e)}} {...props}>{children}</button>}
export function MenubarContent({children,className,...props}:React.HTMLAttributes<HTMLDivElement>){const{open}=React.useContext(MenuCtx);if(!open)return null;return <div role="menu" className={cn('cp-menubar-content',className)} {...props}>{children}</div>}
export function MenubarItem({children,className,onClick,...props}:React.ButtonHTMLAttributes<HTMLButtonElement>){const{setOpen}=React.useContext(MenuCtx);return <button type="button" role="menuitem" className={cn('cp-menubar-item',className)} onClick={e=>{onClick?.(e);setOpen(false)}} {...props}>{children}</button>}
export function MenubarSeparator({className,...props}:React.HTMLAttributes<HTMLHRElement>){return <hr className={cn('cp-menubar-separator',className)} {...props}/>}
export function MenubarShortcut({className,...props}:React.HTMLAttributes<HTMLSpanElement>){return <span className={cn('cp-menubar-shortcut',className)} {...props}/>}
export function MenubarCheckboxItem({children,checked,className,onClick,...props}:React.ButtonHTMLAttributes<HTMLButtonElement>&{checked?:boolean}){return <button type="button" role="menuitemcheckbox" aria-checked={!!checked} className={cn('cp-menubar-item',className)} onClick={onClick} {...props}>{checked?'✓ ':''}{children}</button>}
export function MenubarRadioGroup({children,className,...props}:React.HTMLAttributes<HTMLDivElement>){return <div role="group" className={className} {...props}>{children}</div>}
export function MenubarRadioItem({children,className,onClick,checked=false,...props}:React.ButtonHTMLAttributes<HTMLButtonElement>&{checked?:boolean}){return <button type="button" role="menuitemradio" aria-checked={checked} className={cn('cp-menubar-item',className)} onClick={onClick} {...props}>{checked?'●':'◯'} {children}</button>}
export function MenubarSub({children}:React.PropsWithChildren){return <div className="cp-menubar-sub">{children}</div>}
export function MenubarSubTrigger({children,className,...props}:React.ButtonHTMLAttributes<HTMLButtonElement>){return <button type="button" className={cn('cp-menubar-item',className)} {...props}>{children} ›</button>}
export function MenubarSubContent({children,className,...props}:React.HTMLAttributes<HTMLDivElement>){return <div className={cn('cp-menubar-sub-content',className)} {...props}>{children}</div>}
