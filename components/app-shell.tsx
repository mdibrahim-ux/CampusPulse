'use client';

import { usePathname } from 'next/navigation';
import { MotionConfig } from 'framer-motion';
import { WorkspaceShell } from '@/components/redesign/workspace-shell';

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  if (pathname === '/') return <>{children}</>;

  return (
    <MotionConfig reducedMotion="user">
      <WorkspaceShell>{children}</WorkspaceShell>
    </MotionConfig>
  );
}
