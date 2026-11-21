import type {Metadata,Viewport} from 'next';
import {DM_Sans} from 'next/font/google';
import './globals.css';
import {AppShell} from '@/components/app-shell';
import {LanguageProvider} from '@/components/language-provider';

const dmSans=DM_Sans({subsets:['latin'],weight:['400','500','600','700','800','900'],display:'swap',adjustFontFallback:false,variable:'--font-dm-sans'});

export const metadata:Metadata={
  title:'CampusPulse — student support, made clear',
  description:'Find scholarship support, understand documents and discover practical services for students in India.',
};

export const viewport:Viewport={
  themeColor:'#E2EEFC',
};

export default function RootLayout({children}:{children:React.ReactNode}){
  return <html lang="en" data-theme="light" className={dmSans.variable}>
    <body><LanguageProvider><AppShell>{children}</AppShell></LanguageProvider></body>
  </html>;
}
