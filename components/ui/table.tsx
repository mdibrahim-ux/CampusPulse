import * as React from 'react';
import { cn } from '@/lib/utils';
export function Table({className,...props}:React.TableHTMLAttributes<HTMLTableElement>){return <div className="cp-table-wrap"><table data-slot="table" className={cn('cp-table',className)} {...props}/></div>}
export function TableHeader({className,...props}:React.HTMLAttributes<HTMLTableSectionElement>){return <thead className={cn('cp-table-header',className)} {...props}/>}
export function TableBody({className,...props}:React.HTMLAttributes<HTMLTableSectionElement>){return <tbody className={cn('cp-table-body',className)} {...props}/>}
export function TableFooter({className,...props}:React.HTMLAttributes<HTMLTableSectionElement>){return <tfoot className={cn('cp-table-footer',className)} {...props}/>}
export function TableRow({className,...props}:React.HTMLAttributes<HTMLTableRowElement>){return <tr className={cn('cp-table-row',className)} {...props}/>}
export function TableHead({className,...props}:React.ThHTMLAttributes<HTMLTableCellElement>){return <th className={cn('cp-table-head',className)} {...props}/>}
export function TableCell({className,...props}:React.TdHTMLAttributes<HTMLTableCellElement>){return <td className={cn('cp-table-cell',className)} {...props}/>}
export function TableCaption({className,...props}:React.HTMLAttributes<HTMLTableCaptionElement>){return <caption className={cn('cp-table-caption',className)} {...props}/>}
