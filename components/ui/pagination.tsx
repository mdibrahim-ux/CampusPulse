'use client';
import * as React from 'react';
import { ChevronLeft,ChevronRight,MoreHorizontal } from 'lucide-react';
import { cn } from '@/lib/utils';
export function Pagination({className,...props}:React.HTMLAttributes<HTMLElement>){return <nav aria-label="Pagination" className={cn('cp-pagination',className)} {...props}/>}
export function PaginationContent({className,...props}:React.HTMLAttributes<HTMLUListElement>){return <ul className={cn('cp-pagination-content',className)} {...props}/>}
export function PaginationItem({className,...props}:React.LiHTMLAttributes<HTMLLIElement>){return <li className={cn('cp-pagination-item',className)} {...props}/>}
export function PaginationLink({isActive,className,...props}:React.AnchorHTMLAttributes<HTMLAnchorElement>&{isActive?:boolean}){return <a aria-current={isActive?'page':undefined} className={cn('cp-pagination-link',isActive&&'is-active',className)} {...props}/>}
export function PaginationPrevious({className,...props}:React.AnchorHTMLAttributes<HTMLAnchorElement>){return <a aria-label="Previous page" className={cn('cp-pagination-link cp-pagination-prev',className)} {...props}><ChevronLeft size={15}/><span>Previous</span></a>}
export function PaginationNext({className,...props}:React.AnchorHTMLAttributes<HTMLAnchorElement>){return <a aria-label="Next page" className={cn('cp-pagination-link cp-pagination-next',className)} {...props}><span>Next</span><ChevronRight size={15}/></a>}
export function PaginationEllipsis({className,...props}:React.HTMLAttributes<HTMLSpanElement>){return <span aria-hidden="true" className={cn('cp-pagination-ellipsis',className)} {...props}><MoreHorizontal size={16}/></span>}
