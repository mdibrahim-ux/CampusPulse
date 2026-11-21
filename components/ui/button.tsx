'use client';
import * as React from 'react';
import { cn } from '@/lib/utils';
export type ButtonVariant='default'|'primary'|'secondary'|'neutral'|'reverse'|'noShadow'|'destructive'|'outline'|'ghost';
export type ButtonSize='default'|'xs'|'sm'|'lg'|'icon'|'icon-xs'|'icon-sm'|'icon-lg';
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>{variant?:ButtonVariant;size?:ButtonSize}
const Button=React.forwardRef<HTMLButtonElement,ButtonProps>(({className,variant='default',size='default',type='button',...props},ref)=><button ref={ref} data-slot="button" data-variant={variant} data-size={size} type={type} className={cn('cp-ui-button','cp-ui-button-'+variant,'cp-ui-button-'+size,className)} {...props}/>);
Button.displayName='Button';export{Button};
