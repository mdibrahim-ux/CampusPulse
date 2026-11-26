'use client';
import * as React from 'react';
import { cn } from '@/lib/utils';
const Ctx=React.createContext<{loaded:boolean;setLoaded:(v:boolean)=>void}>({loaded:false,setLoaded:()=>undefined});
export function Avatar({className,children,...props}:React.HTMLAttributes<HTMLSpanElement>){const[loaded,setLoaded]=React.useState(false);return <Ctx.Provider value={{loaded,setLoaded}}><span data-slot="avatar" className={cn('cp-avatar',className)} {...props}>{children}</span></Ctx.Provider>}
export function AvatarImage({className,alt='',onLoad,onError,...props}:React.ImgHTMLAttributes<HTMLImageElement>){const{setLoaded}=React.useContext(Ctx);return <img data-slot="avatar-image" alt={alt} className={cn('cp-avatar-image',className)} {...props} onLoad={e=>{setLoaded(true);onLoad?.(e)}} onError={e=>{setLoaded(false);onError?.(e)}}/>}
export function AvatarFallback({className,children,...props}:React.HTMLAttributes<HTMLSpanElement>){const{loaded}=React.useContext(Ctx);if(loaded)return null;return <span data-slot="avatar-fallback" className={cn('cp-avatar-fallback',className)} {...props}>{children}</span>}
