'use client';
import * as React from 'react';
import { cn } from '@/lib/utils';
const Ctx=React.createContext<{open:boolean;setOpen:(v:boolean)=>void}>({open:false,setOpen:()=>undefined});
export function NavigationMenu({children,className,...props}:React.HTMLAttributes<HTMLDivElement>){return <nav className={cn('cp-navigation-menu',className)} {...props}>{children}</nav>}
export function NavigationMenuList({children,className,...props}:React.HTMLAttributes<HTMLUListElement>){return <ul className={cn('cp-navigation-menu-list',className)} {...props}>{children}</ul>}
export function NavigationMenuItem({children,className,...props}:React.HTMLAttributes<HTMLLIElement>){const[open,setOpen]=React.useState(false);return <Ctx.Provider value={{open,setOpen}}><li className={cn('cp-navigation-menu-item',className)} {...props}>{children}</li></Ctx.Provider>}
export function NavigationMenuTrigger({children,className,onClick,...props}:React.ButtonHTMLAttributes<HTMLButtonElement>){const{open,setOpen}=React.useContext(Ctx);return <button type="button" aria-expanded={open} className={cn('cp-navigation-menu-trigger',className)} onClick={e=>{setOpen(!open);onClick?.(e)}} {...props}>{children}</button>}
export function NavigationMenuContent({children,className,...props}:React.HTMLAttributes<HTMLDivElement>){const{open}=React.useContext(Ctx);if(!open)return null;return <div className={cn('cp-navigation-menu-content',className)} {...props}>{children}</div>}
type LinkProps=React.AnchorHTMLAttributes<HTMLAnchorElement>&{render?:React.ReactElement};
export function NavigationMenuLink({children,className,render,...props}:LinkProps){if(render){const element=render as React.ReactElement<{className?:string}>;return React.cloneElement(element,{className:cn(className,element.props.className)},children)}return <a className={cn('cp-navigation-menu-link',className)} {...props}>{children}</a>}
export function navigationMenuTriggerStyle(){return 'cp-navigation-menu-trigger'}
