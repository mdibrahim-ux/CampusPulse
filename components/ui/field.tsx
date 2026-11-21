import * as React from 'react';
import { cn } from '@/lib/utils';
export function FieldGroup({className,...props}:React.HTMLAttributes<HTMLDivElement>){return <div className={cn('cp-field-group',className)} {...props}/>}
export function Field({className,orientation='vertical',...props}:React.HTMLAttributes<HTMLDivElement>&{orientation?:'vertical'|'horizontal'}){return <div data-orientation={orientation} className={cn('cp-field',orientation==='horizontal'&&'is-horizontal',className)} {...props}/>}
export function FieldContent({className,...props}:React.HTMLAttributes<HTMLDivElement>){return <div className={cn('cp-field-content',className)} {...props}/>}
export function FieldLabel({className,...props}:React.LabelHTMLAttributes<HTMLLabelElement>){return <label className={cn('cp-field-label',className)} {...props}/>}
export function FieldTitle({className,...props}:React.HTMLAttributes<HTMLHeadingElement>){return <h3 className={cn('cp-field-title',className)} {...props}/>}
export function FieldDescription({className,...props}:React.HTMLAttributes<HTMLParagraphElement>){return <p className={cn('cp-field-description',className)} {...props}/>}
