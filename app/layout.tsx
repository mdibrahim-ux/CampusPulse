import type { Metadata } from 'next';
import './globals.css';
import { AppShell } from '@/components/app-shell';
import { LanguageProvider } from '@/components/language-provider';

export const metadata: Metadata = {
  title: 'CampusPulse — student support, made clear',
  description: 'Scholarships, student services and practical next steps — explained clearly in Indian languages.',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body><LanguageProvider><AppShell>{children}</AppShell></LanguageProvider></body></html>;
}