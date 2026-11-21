'use client';

import Link from 'next/link';
import { useState } from 'react';
import { ArrowUpRight, GraduationCap, Menu, X } from 'lucide-react';

const links = [
  { href: '#features', label: 'What you can do' },
  { href: '#how-it-works', label: 'How it works' },
  { href: '/scholarships', label: 'Scholarships' },
];

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="nb-header">
      <div className="nb-container nb-header-inner">
        <Link href="/" className="nb-brand" aria-label="CampusPulse home" onClick={closeMenu}>
          <span className="nb-brand-mark" aria-hidden="true">
            <GraduationCap size={22} strokeWidth={2.2} />
          </span>
          <span className="nb-brand-copy">
            <strong>CampusPulse</strong>
            <small>STUDENT SUPPORT, MADE CLEAR</small>
          </span>
        </Link>

        <nav className="nb-desktop-nav" aria-label="Main navigation">
          {links.map((item) => (
            <Link key={item.href} href={item.href} className="nb-nav-link">
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="nb-header-actions">
          <Link href="/dashboard" className="nb-header-workspace">
            Open workspace <ArrowUpRight size={15} />
          </Link>
          <Link href="/profile" className="nb-button nb-button-primary nb-header-cta">
            Get started <ArrowUpRight size={16} />
          </Link>
          <button
            className="nb-menu-toggle"
            type="button"
            aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={menuOpen}
            aria-controls="nb-mobile-navigation"
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <nav id="nb-mobile-navigation" className="nb-mobile-nav" aria-label="Mobile navigation">
          {links.map((item) => (
            <Link key={item.href} href={item.href} onClick={closeMenu}>
              {item.label}
              <ArrowUpRight size={15} />
            </Link>
          ))}
          <Link href="/dashboard" onClick={closeMenu}>
            Open workspace <ArrowUpRight size={15} />
          </Link>
          <Link href="/profile" className="nb-mobile-primary" onClick={closeMenu}>
            Get started <ArrowUpRight size={15} />
          </Link>
        </nav>
      )}
    </header>
  );
}
