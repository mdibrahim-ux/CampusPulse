'use client';
import * as React from 'react';
import {ResponsiveContainer,Tooltip} from 'recharts';
import { cn } from '@/lib/utils';
export type ChartConfig=Record<string,{label?:string;color?:string;icon?:React.ComponentType<{className?:string}>}>;
export function ChartContainer({config,children,className,height=280,...props}:{config:ChartConfig;children:React.ReactNode;className?:string;height?:number}&React.HTMLAttributes<HTMLDivElement>){const variables=Object.fromEntries(Object.entries(config).map(([key,item])=>['--color-'+key,item.color||'var(--cp-blue)'])) as React.CSSProperties;return <div data-chart="campuspulse" className={cn('cp-chart-container',className)} {...props} style={{...variables,height,...props.style}}><ResponsiveContainer width="100%" height="100%">{children as React.ReactElement}</ResponsiveContainer></div>}
export function ChartTooltip(props:React.ComponentProps<typeof Tooltip>){return <Tooltip {...props}/>}
type TooltipItem={name?:string|number;value?:string|number;color?:string};
export function ChartTooltipContent({active,payload,label,indicator='dot'}:{active?:boolean;payload?:TooltipItem[];label?:React.ReactNode;indicator?:'dot'|'line'|'dashed'}){if(!active||!payload?.length)return null;return <div className="cp-chart-tooltip"><b>{label}</b>{payload.map((item,index)=><div key={String(item.name??index)}><i data-indicator={indicator} style={{background:item.color||'var(--cp-blue)'}}/><span>{item.name}</span><strong>{item.value}</strong></div>)}</div>}
