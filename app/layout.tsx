import type {Metadata,Viewport} from 'next';
import {Bebas_Neue,DM_Mono,Outfit} from 'next/font/google';
import './globals.css';
import {AppShell} from '@/components/app-shell';
import {LanguageProvider} from '@/components/language-provider';

const bebasNeue=Bebas_Neue({subsets:['latin'],weight:'400',display:'swap',variable:'--font-bebas-neue'});
const outfit=Outfit({subsets:['latin'],weight:['300','400','500','600','700','800','900'],display:'swap',variable:'--font-outfit'});
const dmMono=DM_Mono({subsets:['latin'],weight:['300','400','500'],display:'swap',variable:'--font-dm-mono'});

export const metadata:Metadata={
  title:'CampusPulse — student support, made clear',
  description:'Find scholarship support, understand documents and discover practical services for students in India.',
};

export const viewport:Viewport={
  themeColor:'#F87171',
};

export default function RootLayout({children}:{children:React.ReactNode}){
  return <html lang="en" data-theme="light" className={`${bebasNeue.variable} ${outfit.variable} ${dmMono.variable}`}>
    <body><LanguageProvider><AppShell>{children}</AppShell></LanguageProvider></body>
  </html>;
}
