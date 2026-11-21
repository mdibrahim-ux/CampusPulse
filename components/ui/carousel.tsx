'use client';
import * as React from 'react';
import { ChevronLeft,ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
type Ctx={ref:{current:HTMLDivElement|null};scroll:(direction:number)=>void};
const CarouselCtx=React.createContext<Ctx>({ref:{current:null},scroll:()=>undefined});
export function Carousel({children,className,...props}:React.HTMLAttributes<HTMLDivElement>){const ref=React.useRef<HTMLDivElement|null>(null);const scroll=(dir:number)=>ref.current?.scrollBy({left:dir*ref.current.clientWidth,behavior:'smooth'});return <CarouselCtx.Provider value={{ref,scroll}}><div className={cn('cp-carousel',className)} {...props}>{children}</div></CarouselCtx.Provider>}
export function CarouselContent({children,className,...props}:React.HTMLAttributes<HTMLDivElement>){const{ref}=React.useContext(CarouselCtx);return <div ref={ref} className={cn('cp-carousel-content',className)} {...props}>{children}</div>}
export function CarouselItem({children,className,...props}:React.HTMLAttributes<HTMLDivElement>){return <div className={cn('cp-carousel-item',className)} {...props}>{children}</div>}
export function CarouselPrevious({className,onClick,...props}:React.ButtonHTMLAttributes<HTMLButtonElement>){const{scroll}=React.useContext(CarouselCtx);return <button type="button" aria-label="Previous slide" className={cn('cp-carousel-control',className)} onClick={e=>{scroll(-1);onClick?.(e)}} {...props}><ChevronLeft size={17}/></button>}
export function CarouselNext({className,onClick,...props}:React.ButtonHTMLAttributes<HTMLButtonElement>){const{scroll}=React.useContext(CarouselCtx);return <button type="button" aria-label="Next slide" className={cn('cp-carousel-control',className)} onClick={e=>{scroll(1);onClick?.(e)}} {...props}><ChevronRight size={17}/></button>}
