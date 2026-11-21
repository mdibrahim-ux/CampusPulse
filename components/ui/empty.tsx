import * as React from 'react';
import { cn } from '@/lib/utils';
export function Empty({className,...props}:React.HTMLAttributes<HTMLDivElement>){return <div data-slot="empty" className={cn('cp-empty',className)} {...props}/>}
export function EmptyHeader({className,...props}:React.HTMLAttributes<HTMLDivElement>){return <div className={cn('cp-empty-header',className)} {...props}/>}
export function EmptyMedia({className,variant='icon',...props}:React.HTMLAttributes<HTMLDivElement>&{variant?:'icon'|'illustration'}){return <div data-variant={variant} className={cn('cp-empty-media',className)} {...props}/>}
export function EmptyTitle({className,...props}:React.HTMLAttributes<HTMLHeadingElement>){return <h3 className={cn('cp-empty-title',className)} {...props}/>}
export function EmptyDescription({className,...props}:React.HTMLAttributes<HTMLParagraphElement>){return <p className={cn('cp-empty-description',className)} {...props}/>}
export function EmptyContent({className,...props}:React.HTMLAttributes<HTMLDivElement>){return <div className={cn('cp-empty-content',className)} {...props}/>}
