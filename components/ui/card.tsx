import * as React from 'react';
import { cn } from '@/lib/utils';
export function Card({className,interactive=false,...props}:React.HTMLAttributes<HTMLDivElement>&{interactive?:boolean}){return <div data-slot="card" className={cn('cp-ui-card',interactive&&'cp-ui-card-interactive',className)} {...props}/>}
export function CardHeader({className,...props}:React.HTMLAttributes<HTMLDivElement>){return <div data-slot="card-header" className={cn('cp-ui-card-header',className)} {...props}/>}
export function CardTitle({className,...props}:React.HTMLAttributes<HTMLHeadingElement>){return <h3 data-slot="card-title" className={cn('cp-ui-card-title',className)} {...props}/>}
export function CardDescription({className,...props}:React.HTMLAttributes<HTMLParagraphElement>){return <p data-slot="card-description" className={cn('cp-ui-card-description',className)} {...props}/>}
export function CardContent({className,...props}:React.HTMLAttributes<HTMLDivElement>){return <div data-slot="card-content" className={cn('cp-ui-card-content',className)} {...props}/>}
export function CardFooter({className,...props}:React.HTMLAttributes<HTMLDivElement>){return <div data-slot="card-footer" className={cn('cp-ui-card-footer',className)} {...props}/>}
