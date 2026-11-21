'use client';
import * as React from 'react';
import {Controller,FormProvider,useFormContext,get} from 'react-hook-form';
import type {ControllerProps,FieldPath,FieldValues} from 'react-hook-form';
import { cn } from '@/lib/utils';
export const Form=FormProvider;
type FieldContextValue={name:string;id:string};
const FieldCtx=React.createContext<FieldContextValue|null>(null);
export function FormField<T extends FieldValues=FieldValues,N extends FieldPath<T>=FieldPath<T>>(props:ControllerProps<T,N>){return <FieldCtx.Provider value={{name:String(props.name),id:'field-'+String(props.name)}}><Controller {...props}/></FieldCtx.Provider>}
function useFormField(){const field=React.useContext(FieldCtx);const form=useFormContext();if(!field)throw new Error('Form field components must be rendered inside FormField');const error=get(form.formState.errors,field.name);return {...field,error,formMessageId:field.id+'-message',formDescriptionId:field.id+'-description'}}
export function FormItem({className,...props}:React.HTMLAttributes<HTMLDivElement>){return <div className={cn('cp-form-item',className)} {...props}/>}
export function FormLabel({className,htmlFor,...props}:React.LabelHTMLAttributes<HTMLLabelElement>){const field=useFormField();return <label htmlFor={htmlFor||field.id} className={cn('cp-form-label',className)} {...props}/>}
export function FormControl({children}: {children:React.ReactElement}){const field=useFormField();const child=React.Children.only(children);const element=child as React.ReactElement<React.HTMLAttributes<HTMLElement>>;return React.cloneElement(element,{...element.props,id:element.props.id||field.id,'aria-describedby':field.error?field.formMessageId:field.formDescriptionId,'aria-invalid':!!field.error})}
export function FormDescription({className,...props}:React.HTMLAttributes<HTMLParagraphElement>){const field=useFormField();return <p id={field.formDescriptionId} className={cn('cp-form-description',className)} {...props}/>}
export function FormMessage({className,children,...props}:React.HTMLAttributes<HTMLParagraphElement>){const field=useFormField();const message=field.error?.message;const content=children||(typeof message==='string'?message:null);if(!content)return null;return <p id={field.formMessageId} role="alert" className={cn('cp-form-message',className)} {...props}>{content}</p>}
