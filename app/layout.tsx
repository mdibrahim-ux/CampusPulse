import type {Metadata,Viewport} from 'next';
import './globals.css';
import {AppShell} from '@/components/app-shell';
import {LanguageProvider} from '@/components/language-provider';

export const metadata:Metadata={
  title:'CampusPulse — student support, made clear',
  description:'Find scholarship support, understand documents and discover practical services for students in India.',
};

export const viewport:Viewport={
  themeColor:'#0B0C10',
};

export default function RootLayout({children}:{children:React.ReactNode}){
  return <html lang="en" data-theme="dark">
    <body><LanguageProvider><AppShell>{children}</AppShell></LanguageProvider></body>
  </html>;
}
