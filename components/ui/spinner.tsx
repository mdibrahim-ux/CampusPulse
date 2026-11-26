import { LoaderCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
export function Spinner({className,...props}:React.ComponentProps<typeof LoaderCircle>){return <LoaderCircle aria-label="Loading" role="status" className={cn('cp-spinner',className)} {...props}/>}
