'use client';
import * as React from 'react';
import { cn } from '@/lib/utils';
export const Switch=React.forwardRef<HTMLInputElement,Omit<React.InputHTMLAttributes<HTMLInputElement>,'type'>>(({className,...props},ref)=><label className={cn('cp-switch',className)}><input ref={ref} type="checkbox" role="switch" {...props}/><span aria-hidden="true"/></label>);
Switch.displayName='Switch';
