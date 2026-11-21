import * as React from 'react';
import { cn } from '@/lib/utils';
export default function ImageCard({imageUrl,caption,className,alt}: {imageUrl:string;caption?:string;alt?:string;className?:string}){return <figure className={cn('cp-image-card',className)}><img src={imageUrl} alt={alt||caption||'Preview image'} loading="lazy"/>{caption&&<figcaption>{caption}</figcaption>}</figure>}
