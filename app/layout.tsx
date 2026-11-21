import type { Metadata, Viewport } from 'next';
import { DM_Sans, Geist_Mono } from 'next/font/google';
import './globals.css';
import './redesign.css';
import './workspace.css';
import './scholarship-experience.css';
import './backend.css';
import './palette.css';
import { AppShell } from '@/components/app-shell';
import { LanguageProvider } from '@/components/language-provider';

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
  display: 'swap',
});

const geistMono = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-geist-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'CampusPulse — student support, made clearer',
  description:
    'Discover scholarships, understand eligibility, prepare documents and organize your next steps with CampusPulse.',
};

export const viewport: Viewport = {
  themeColor: '#F8E0A4',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-theme="light">
      <body className={dmSans.variable + ' ' + geistMono.variable}>
        <LanguageProvider>
          <AppShell>{children}</AppShell>
        </LanguageProvider>
      </body>
    </html>
  );
}
