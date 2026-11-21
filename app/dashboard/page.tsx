'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  ArrowUpRight,
  Bookmark,
  BriefcaseBusiness,
  CalendarClock,
  CalendarDays,
  CheckCircle2,
  ClipboardCheck,
  FileSearch,
  GraduationCap,
  ShieldCheck,
} from 'lucide-react';
import { scholarshipSchemes } from '@/lib/scholarships';
import { getProfile, getReminders, getTracker } from '@/lib/storage';
import type { Reminder, StudentProfile, TrackerItem } from '@/lib/types';

function formatDate(value: string, options: Intl.DateTimeFormatOptions) {
  return new Date(value + 'T00:00:00').toLocaleDateString('en-IN', options);
}

export default function DashboardPage() {
  const [items, setItems] = useState<TrackerItem[]>([]);
  const [reminders, setReminders] = useState<Reminder[]>([]);
  const [profile, setProfile] = useState<StudentProfile | null>(null);
  const [dateLabel, setDateLabel] = useState('');
  const [greeting, setGreeting] = useState('Welcome');

  useEffect(() => {
    const sync = () => {
      setItems(getTracker());
      setReminders(getReminders());
      setProfile(getProfile());
    };
    const now = new Date();
    const hour = now.getHours();
    setGreeting(hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening');
    setDateLabel(now.toLocaleDateString('en-IN', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    }));
    sync();
    window.addEventListener('storage', sync);
    window.addEventListener('campuspulse-tracker', sync);
    window.addEventListener('campuspulse-reminders', sync);
    window.addEventListener('campuspulse-profile', sync);
    return () => {
      window.removeEventListener('storage', sync);
      window.removeEventListener('campuspulse-tracker', sync);
      window.removeEventListener('campuspulse-reminders', sync);
      window.removeEventListener('campuspulse-profile', sync);
    };
  }, []);

  const closingSoon = useMemo(() => scholarshipSchemes
    .filter((scheme) => scheme.studentDeadline)
    .map((scheme) => ({
      ...scheme,
      daysLeft: Math.ceil((new Date(scheme.studentDeadline + 'T23:59:59').getTime() - Date.now()) / 86400000),
    }))
    .filter((scheme) => scheme.daysLeft >= 0 && scheme.daysLeft <= 30)
    .sort((a, b) => a.daysLeft - b.daysLeft)
    .slice(0, 4), []);

  const categories = useMemo(() => {
    const tally = new Map<string, number>();
    scholarshipSchemes.forEach((scheme) => {
      const category = scheme.category.split('·')[0].trim();
      tally.set(category, (tally.get(category) || 0) + 1);
    });
    return Array.from(tally.entries()).map(([label, count]) => ({
      label,
      count,
      share: count / scholarshipSchemes.length,
    }));
  }, []);

  const saved = useMemo(() => items.slice(0, 4).map((item) => ({
    item,
    scheme: scholarshipSchemes.find((scheme) => scheme.id === item.opportunityId),
  })).filter((entry) => entry.scheme), [items]);

  const nextReminders = useMemo(() => reminders
    .filter((item) => !item.done)
    .sort((a, b) => a.date.localeCompare(b.date))
    .slice(0, 4), [reminders]);

  const firstName = profile?.name?.trim().split(/\s+/)[0] || '';
  const openApplications = items.filter((item) => !['Awarded', 'Rejected', 'Withdrawn'].includes(item.status)).length;

  return (
    <div className="cp-dashboard">
      <section className="cp-dashboard-heading">
        <div className="cp-dashboard-heading-copy">
          <span className="cp-dashboard-kicker"><i /> YOUR CAMPUSPULSE / OVERVIEW</span>
          <h1>{greeting}{firstName ? <>, <em>{firstName}</em></> : ''}.</h1>
          <p>Here is what is happening across your student support workspace. Take one useful next step at a time.</p>
          {dateLabel && <span className="cp-dashboard-date"><CalendarDays size={14} /> {dateLabel}</span>}
        </div>
        <div className="cp-dashboard-heading-actions">
          <Link href="/eligibility-checker" className="cp-dash-button cp-dash-button-primary">
            Check eligibility <ArrowUpRight size={16} />
          </Link>
          {!profile?.name?.trim() && (
            <Link href="/profile" className="cp-dash-text-link">Complete your profile <ArrowRight size={14} /></Link>
          )}
        </div>
      </section>

      <section className="cp-dash-stat-grid" aria-label="Your workspace at a glance">
        <article className="cp-dash-stat cp-dash-stat-yellow">
          <div className="cp-dash-stat-top"><span>SCHEME DIRECTORY</span><GraduationCap size={19} /></div>
          <strong>{String(scholarshipSchemes.length).padStart(2, '0')}</strong>
          <small>Curated scheme records</small>
        </article>
        <article className="cp-dash-stat cp-dash-stat-blue">
          <div className="cp-dash-stat-top"><span>YOUR SHORTLIST</span><Bookmark size={19} /></div>
          <strong>{String(items.length).padStart(2, '0')}</strong>
          <small>Saved application records</small>
        </article>
        <article className="cp-dash-stat cp-dash-stat-orange">
          <div className="cp-dash-stat-top"><span>OPEN REMINDERS</span><CalendarClock size={19} /></div>
          <strong>{String(reminders.filter((item) => !item.done).length).padStart(2, '0')}</strong>
          <small>Personal follow-ups to revisit</small>
        </article>
        <article className="cp-dash-stat cp-dash-stat-paper">
          <div className="cp-dash-stat-top"><span>ACTIVE APPLICATIONS</span><ClipboardCheck size={19} /></div>
          <strong>{String(openApplications).padStart(2, '0')}</strong>
          <small>Items not yet closed</small>
        </article>
      </section>

      <section className="cp-dash-quick-section" aria-labelledby="cp-dash-quick-title">
        <div className="cp-dash-section-head">
          <div>
            <span className="cp-dash-section-kicker">START SOMEWHERE</span>
            <h2 id="cp-dash-quick-title">Useful actions.</h2>
          </div>
        </div>
        <div className="cp-dash-quick-grid">
          <Link href="/scholarships" className="cp-dash-quick-card cp-dash-quick-yellow">
            <span className="cp-dash-quick-icon"><GraduationCap size={21} /></span>
            <span><strong>Find scholarships</strong><small>Browse schemes and official conditions</small></span>
            <ArrowUpRight size={17} />
          </Link>
          <Link href="/document-review" className="cp-dash-quick-card cp-dash-quick-blue">
            <span className="cp-dash-quick-icon"><FileSearch size={20} /></span>
            <span><strong>Review a document</strong><small>Understand visible details before submitting</small></span>
            <ArrowUpRight size={17} />
          </Link>
          <Link href="/rejection-analyzer" className="cp-dash-quick-card cp-dash-quick-orange">
            <span className="cp-dash-quick-icon"><ShieldCheck size={20} /></span>
            <span><strong>Understand a portal remark</strong><small>Turn confusing messages into next steps</small></span>
            <ArrowUpRight size={17} />
          </Link>
        </div>
      </section>

      <section className="cp-dash-primary-grid">
        <article className="cp-dash-panel cp-dash-deadlines">
          <div className="cp-dash-panel-heading">
            <div>
              <span className="cp-dash-section-kicker">APPLICATION WINDOWS</span>
              <h2>Deadlines to keep in view.</h2>
              <p>Student application dates in the current CampusPulse reference set.</p>
            </div>
            <Link href="/scholarships" className="cp-dash-panel-link">All schemes <ArrowUpRight size={14} /></Link>
          </div>

          <div className="cp-dash-panel-meta">
            <span><CalendarClock size={15} /> STUDENT APPLICATION DEADLINES</span>
            <b>{String(closingSoon.length).padStart(2, '0')} IN NEXT 30 DAYS</b>
          </div>

          {closingSoon.length > 0 ? (
            <div className="cp-dash-deadline-list">
              {closingSoon.map((scheme, index) => (
                <Link href={'/scholarships/' + scheme.id} className="cp-dash-deadline-row" key={scheme.id}>
                  <span className="cp-dash-deadline-index">{String(index + 1).padStart(2, '0')}</span>
                  <span className="cp-dash-deadline-name">
                    <strong>{scheme.shortName}</strong>
                    <small>{scheme.provider}</small>
                  </span>
                  <span className="cp-dash-deadline-date">
                    <strong>{formatDate(scheme.studentDeadline!, { day: '2-digit', month: 'short' })}</strong>
                    <small>{scheme.daysLeft === 0 ? 'Closes today' : scheme.daysLeft + ' days left'}</small>
                  </span>
                  <ArrowUpRight size={16} />
                </Link>
              ))}
            </div>
          ) : (
            <div className="cp-dash-empty">
              <CalendarClock size={22} />
              <div><strong>No verified student deadline in the next 30 days.</strong><small>Check the scheme directory for newly published dates.</small></div>
            </div>
          )}

          <div className="cp-dash-footnote">
            <ShieldCheck size={14} />
            NSP reference snapshot checked 17 November 2026. Reconfirm every date on the official portal.
          </div>
        </article>

        <article className="cp-dash-panel cp-dash-reference">
          <div className="cp-dash-panel-heading">
            <div>
              <span className="cp-dash-section-kicker">LOCAL REFERENCE SET</span>
              <h2>Scheme overview.</h2>
              <p>How the curated records are grouped.</p>
            </div>
            <span className="cp-dash-local-tag">LOCAL DATA</span>
          </div>
          <div className="cp-dash-reference-total">
            <strong>{String(scholarshipSchemes.length).padStart(2, '0')}</strong>
            <span>CURATED SCHEME<br />RECORDS</span>
          </div>
          <div className="cp-dash-category-list" role="img" aria-label={'Scheme categories in the current reference set: ' + categories.map((category) => category.label + ' ' + category.count).join(', ')}>
            {categories.map((category, index) => (
              <div className="cp-dash-category" key={category.label}>
                <div><span>{category.label}</span><strong>{category.count}</strong></div>
                <span className="cp-dash-category-track">
                  <motion.i
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: category.share }}
                    viewport={{ once: true, amount: 0.7 }}
                    transition={{ duration: 0.48, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
                    className={'cp-dash-category-fill cp-dash-category-fill-' + index}
                  />
                </span>
              </div>
            ))}
          </div>
          <div className="cp-dash-footnote">Counts represent the {scholarshipSchemes.length} records stored in CampusPulse, not the full national catalogue.</div>
        </article>
      </section>

      <section className="cp-dash-secondary-grid">
        <article className="cp-dash-panel">
          <div className="cp-dash-panel-heading">
            <div><span className="cp-dash-section-kicker">YOUR SHORTLIST</span><h2>Saved scholarships.</h2></div>
            <Link href="/tracker" className="cp-dash-panel-link">Open tracker <ArrowUpRight size={14} /></Link>
          </div>
          {saved.length > 0 ? (
            <div className="cp-dash-saved-list">
              {saved.map(({ item, scheme }) => (
                <Link href={'/scholarships/' + scheme!.id} className="cp-dash-saved-row" key={item.opportunityId}>
                  <span className="cp-dash-saved-mark">₹</span>
                  <span className="cp-dash-saved-copy"><strong>{scheme!.shortName}</strong><small>{scheme!.provider}</small></span>
                  <span className="cp-dash-status">{item.status}</span>
                  <ArrowRight size={15} />
                </Link>
              ))}
            </div>
          ) : (
            <div className="cp-dash-empty">
              <Bookmark size={22} />
              <div>
                <strong>Your shortlist is empty.</strong>
                <small>Save a scheme from the directory to keep its details and progress together.</small>
                <Link href="/scholarships" className="cp-dash-inline-link">Browse scholarships <ArrowRight size={13} /></Link>
              </div>
            </div>
          )}
        </article>

        <article className="cp-dash-panel">
          <div className="cp-dash-panel-heading">
            <div><span className="cp-dash-section-kicker">PERSONAL FOLLOW-UPS</span><h2>Upcoming reminders.</h2></div>
            <Link href="/planner" className="cp-dash-panel-link">Open planner <ArrowUpRight size={14} /></Link>
          </div>
          {nextReminders.length > 0 ? (
            <div className="cp-dash-reminder-list">
              {nextReminders.map((item) => (
                <div className="cp-dash-reminder-row" key={item.id}>
                  <span className="cp-dash-reminder-mark"><CalendarDays size={16} /></span>
                  <span><strong>{item.title}</strong><small>{formatDate(item.date, { day: 'numeric', month: 'short', year: 'numeric' })} · Personal reminder</small></span>
                </div>
              ))}
            </div>
          ) : (
            <div className="cp-dash-empty">
              <CheckCircle2 size={22} />
              <div>
                <strong>No personal reminders yet.</strong>
                <small>Add a follow-up date when you have something to remember.</small>
                <Link href="/planner" className="cp-dash-inline-link">Create a reminder <ArrowRight size={13} /></Link>
              </div>
            </div>
          )}
        </article>
      </section>

      <section className="cp-dash-services">
        <span className="cp-dash-services-icon"><BriefcaseBusiness size={22} /></span>
        <div>
          <span className="cp-dash-section-kicker">BEYOND SCHOLARSHIPS</span>
          <h2>Useful services for student life.</h2>
          <p>Explore transport passes, academic records, education finance and student software offers.</p>
        </div>
        <Link href="/services" className="cp-dash-button cp-dash-button-dark">Explore student services <ArrowUpRight size={15} /></Link>
      </section>
    </div>
  );
}
