'use client';
import * as React from 'react';
import { cn } from '@/lib/utils';
export function Progress({value=0,className,...props}:React.HTMLAttributes<HTMLDivElement>&{value?:number}){const safe=Math.max(0,Math.min(100,Number.isFinite(value)?value:0));return <div data-slot="progress" role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={safe} className={cn('cp-progress',className)} {...props}><span className="cp-progress-indicator" style={{width:safe+'%'}}/></div>}
export function ProgressLabel({className,children,...props}:React.HTMLAttributes<HTMLSpanElement>){return <span className={cn('cp-progress-label',className)} {...props}>{children}</span>}
