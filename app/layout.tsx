import type {Metadata,Viewport} from 'next';
import Script from 'next/script';
import './globals.css';
import {AppShell} from '@/components/app-shell';
import {LanguageProvider} from '@/components/language-provider';

export const metadata:Metadata={
  title:'CampusPulse — student support, made clear',
  description:'Find scholarship support, understand documents and discover practical services for students in India.',
};

export const viewport:Viewport={
  themeColor:'#F5F3EC',
};

const themeBootstrap = `(()=>{try{const saved=localStorage.getItem('campuspulse-theme');const systemDark=window.matchMedia&&window.matchMedia('(prefers-color-scheme: dark)').matches;const theme=saved==='dark'||(!saved&&systemDark)?'dark':'light';document.documentElement.dataset.theme=theme;document.documentElement.style.colorScheme=theme;}catch{document.documentElement.dataset.theme='light';document.documentElement.style.colorScheme='light';}})();`;

export default function RootLayout({children}:{children:React.ReactNode}){
  return <html lang="en" data-theme="light" suppressHydrationWarning>
    <body>
      <Script id="campuspulse-theme-bootstrap" strategy="beforeInteractive">{themeBootstrap}</Script>
      <LanguageProvider><AppShell>{children}</AppShell></LanguageProvider>
    </body>
  </html>;
}
