'use client';
import * as React from 'react';
import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';
export interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>,'type'>{}
export const Checkbox=React.forwardRef<HTMLInputElement,CheckboxProps>(({className,...props},ref)=><span className={cn('cp-checkbox-wrap',className)}><input ref={ref} type="checkbox" data-slot="checkbox" className="cp-checkbox" {...props}/><Check className="cp-checkbox-check" size={12}/></span>);
Checkbox.displayName='Checkbox';
