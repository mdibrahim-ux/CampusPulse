'use client';
import * as React from 'react';
import { cn } from '@/lib/utils';
export function ButtonGroup({className,orientation='horizontal',children,...props}:React.HTMLAttributes<HTMLDivElement>&{orientation?:'horizontal'|'vertical'}){return <div role="group" data-slot="button-group" data-orientation={orientation} className={cn('cp-button-group',orientation==='vertical'&&'is-vertical',className)} {...props}>{children}</div>}
export function ButtonGroupText({className,children,...props}:React.HTMLAttributes<HTMLSpanElement>){return <span data-slot="button-group-text" className={cn('cp-button-group-text',className)} {...props}>{children}</span>}
