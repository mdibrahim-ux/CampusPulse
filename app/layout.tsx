import type { Metadata } from 'next';
import './globals.css';
import { AppShell } from '@/components/app-shell';

export const metadata: Metadata = {
  title: 'CampusPulse — opportunities, in your orbit',
  description: 'Your student opportunity command centre. Discover scholarships, internships, jobs and skills with explainable matches and deadline tracking.',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body><AppShell>{children}</AppShell></body></html>;
}