'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import {
  ArrowUpRight,
  BookmarkCheck,
  BookOpenCheck,
  BriefcaseBusiness,
  CalendarClock,
  FileSearch,
  GraduationCap,
  LayoutDashboard,
  ListChecks,
  Menu,
  ShieldAlert,
  UserRound,
  X,
} from 'lucide-react';
import { LanguageSelector } from '@/components/language-selector';
import { getProfile } from '@/lib/storage';
import type { StudentProfile } from '@/lib/types';

type NavItem = {
  href: string;
  label: string;
  icon: typeof LayoutDashboard;
};

const navGroups: { label: string; items: NavItem[] }[] = [
  {
    label: 'YOUR OVERVIEW',
    items: [{ href: '/dashboard', label: 'Overview', icon: LayoutDashboard }],
  },
  {
    label: 'DISCOVER & PLAN',
    items: [
      { href: '/scholarships', label: 'Scholarships', icon: GraduationCap },
      { href: '/eligibility-checker', label: 'Eligibility checker', icon: ListChecks },
      { href: '/services', label: 'Student services', icon: BriefcaseBusiness },
    ],
  },
  {
    label: 'YOUR WORKSPACE',
    items: [
      { href: '/tracker', label: 'Saved schemes', icon: BookmarkCheck },
      { href: '/planner', label: 'Planner & reminders', icon: CalendarClock },
      { href: '/document-review', label: 'Document review', icon: FileSearch },
      { href: '/rejection-analyzer', label: 'Rejection help', icon: ShieldAlert },
    ],
  },
];

function isActivePath(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(href + '/');
}

function getPageLabel(pathname: string) {
  if (pathname.startsWith('/scholarships/')) return 'Scheme details';
  if (pathname === '/profile') return 'My profile';
  if (pathname === '/get-started') return 'Eligibility checker';
  const match = navGroups.flatMap((group) => group.items).find((item) => isActivePath(pathname, item.href));
  if (match) return match.label;
  return 'Student workspace';
}

function Brand({ compact = false }: { compact?: boolean }) {
  return (
    <Link href="/dashboard" className={'cp-workspace-brand' + (compact ? ' is-compact' : '')} aria-label="CampusPulse workspace">
      <span className="cp-workspace-brand-mark"><GraduationCap size={21} strokeWidth={2.2} /></span>
      <span className="cp-workspace-brand-copy">
        <strong>CampusPulse</strong>
        <small>STUDENT SUPPORT</small>
      </span>
    </Link>
  );
}

function ProfileIdentity({ profile }: { profile: StudentProfile | null }) {
  const name = profile?.name?.trim() || 'Your profile';
  const initials = profile?.name?.trim()
    ? profile.name.trim().split(/\s+/).slice(0, 2).map((part) => part[0]).join('').toUpperCase()
    : null;

  return (
    <span className="cp-profile-identity">
      <span className="cp-profile-avatar">{initials || <UserRound size={17} />}</span>
      <span className="cp-profile-copy">
        <strong>{name}</strong>
        <small>{profile?.institution?.trim() || 'Add your student details'}</small>
      </span>
    </span>
  );
}

function WorkspaceNavigation({
  pathname,
  profile,
  onNavigate,
}: {
  pathname: string;
  profile: StudentProfile | null;
  onNavigate?: () => void;
}) {
  return (
    <div className="cp-sidebar-inner">
      <div className="cp-sidebar-brand-row"><Brand /></div>
      <div className="cp-sidebar-context"><span className="cp-sidebar-context-dot" />YOUR STUDENT SPACE</div>

      <nav className="cp-workspace-nav" aria-label="Student workspace navigation">
        {navGroups.map((group) => (
          <div className="cp-nav-group" key={group.label}>
            <h2>{group.label}</h2>
            <div className="cp-nav-group-links">
              {group.items.map((item) => {
                const Icon = item.icon;
                const active = isActivePath(pathname, item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={onNavigate}
                    className={'cp-workspace-nav-link' + (active ? ' is-active' : '')}
                    aria-current={active ? 'page' : undefined}
                  >
                    <Icon size={18} strokeWidth={1.9} aria-hidden="true" />
                    <span>{item.label}</span>
                    {active && <i aria-hidden="true" />}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      <div className="cp-sidebar-bottom">
        <div className="cp-sidebar-tip">
          <span className="cp-sidebar-tip-icon"><BookOpenCheck size={17} /></span>
          <strong>Check the source</strong>
          <p>Confirm current dates and requirements in the official scheme catalogue before applying.</p>
          <Link href="/scholarships" onClick={onNavigate}>Browse scheme references <ArrowUpRight size={13} /></Link>
        </div>
        <Link href="/profile" onClick={onNavigate} className={'cp-sidebar-profile' + (isActivePath(pathname, '/profile') ? ' is-active' : '')}>
          <ProfileIdentity profile={profile} />
          <ArrowUpRight size={15} />
        </Link>
      </div>
    </div>
  );
}

export function WorkspaceShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [profile, setProfile] = useState<StudentProfile | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const mobileTriggerRef = useRef<HTMLButtonElement>(null);
  const mobileDrawerRef = useRef<HTMLElement>(null);
  const pageLabel = getPageLabel(pathname);

  useEffect(() => {
    const sync = () => setProfile(getProfile());
    sync();
    window.addEventListener('storage', sync);
    window.addEventListener('campuspulse-profile', sync);
    return () => {
      window.removeEventListener('storage', sync);
      window.removeEventListener('campuspulse-profile', sync);
    };
  }, []);

  useEffect(() => setMobileOpen(false), [pathname]);

  useEffect(() => {
    if (!mobileOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const focusable = mobileDrawerRef.current?.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])',
    );
    focusable?.[0]?.focus();

    const closeOnKeyboard = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMobileOpen(false);
        return;
      }
      if (event.key !== 'Tab' || !focusable?.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    window.addEventListener('keydown', closeOnKeyboard);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', closeOnKeyboard);
      mobileTriggerRef.current?.focus();
    };
  }, [mobileOpen]);

  return (
    <div className="cp-workspace-shell">
      <aside className="cp-workspace-sidebar">
        <WorkspaceNavigation pathname={pathname} profile={profile} />
      </aside>

      <div className="cp-workspace-column">
        <header className="cp-workspace-topbar">
          <div className="cp-topbar-leading">
            <button
              type="button"
              ref={mobileTriggerRef}
              className="cp-mobile-nav-trigger"
              aria-label="Open workspace navigation"
              aria-expanded={mobileOpen}
              aria-controls="cp-mobile-workspace-navigation"
              onClick={() => setMobileOpen(true)}
            >
              <Menu size={20} />
            </button>
            <div className="cp-topbar-page">
              <span>STUDENT SUPPORT / WORKSPACE</span>
              <strong>{pageLabel}</strong>
            </div>
          </div>

          <div className="cp-topbar-actions">
            <LanguageSelector />
            <Link href="/profile" className="cp-topbar-profile" aria-label="Open your profile">
              <ProfileIdentity profile={profile} />
            </Link>
          </div>
        </header>

        <main className="cp-workspace-main">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={pathname}
              className="cp-workspace-route"
              initial={{ opacity: 0, y: 7 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -3 }}
              transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </main>

        <footer className="cp-workspace-footer">
          <span>CampusPulse <i /> Independent student support</span>
          <span>Always verify current rules with the official source.</span>
        </footer>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.button
              className="cp-mobile-nav-scrim"
              type="button"
              aria-label="Close navigation"
              onClick={() => setMobileOpen(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />
            <motion.aside
              ref={mobileDrawerRef}
              id="cp-mobile-workspace-navigation"
              className="cp-mobile-nav-drawer"
              role="dialog"
              aria-modal="true"
              aria-label="Workspace navigation"
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="cp-mobile-drawer-top">
                <Brand compact />
                <button type="button" className="cp-mobile-drawer-close" onClick={() => setMobileOpen(false)} aria-label="Close navigation">
                  <X size={19} />
                </button>
              </div>
              <WorkspaceNavigation pathname={pathname} profile={profile} onNavigate={() => setMobileOpen(false)} />
              <div className="cp-mobile-drawer-language"><span>LANGUAGE</span><LanguageSelector /></div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
