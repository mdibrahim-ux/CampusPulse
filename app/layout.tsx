import type { Metadata, Viewport } from 'next';
import './globals.css';
import { AppShell } from '@/components/app-shell';
import { LanguageProvider } from '@/components/language-provider';

export const metadata: Metadata = {
  title: 'CampusPulse — student support, made clear',
  description: 'Scholarships, student services and practical next steps — explained clearly in Indian languages.',
};

export const viewport: Viewport = {
  themeColor: '#070A12',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en" className="dark"><body><LanguageProvider><AppShell>{children}</AppShell></LanguageProvider></body></html>;
}
