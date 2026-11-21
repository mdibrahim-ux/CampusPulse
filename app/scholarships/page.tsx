'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import {
  ArrowRight,
  ArrowUpRight,
  CalendarDays,
  CheckCircle2,
  ExternalLink,
  FilterX,
  Search,
  ShieldCheck,
  SlidersHorizontal,
} from 'lucide-react';
import { ScholarshipCard } from '@/components/scholarship-card';
import { scholarshipSchemes } from '@/lib/scholarships';

type CategoryFilter = 'all' | 'merit' | 'welfare' | 'means' | 'technical' | 'disability';
type TimelineFilter = 'all' | 'dated' | 'verify';

const categoryFilters: { value: CategoryFilter; label: string }[] = [
  { value: 'all', label: 'All schemes' },
  { value: 'merit', label: 'Merit-based' },
  { value: 'welfare', label: 'Welfare-based' },
  { value: 'means', label: 'Merit-cum-means' },
  { value: 'technical', label: 'Technical education' },
  { value: 'disability', label: 'Disability' },
];

function matchesCategory(category: string, filter: CategoryFilter) {
  const value = category.toLowerCase();
  if (filter === 'all') return true;
  if (filter === 'merit') return value.includes('merit-based');
  if (filter === 'welfare') return value.includes('welfare-based');
  if (filter === 'means') return value.includes('merit-cum-means');
  if (filter === 'technical') return value.includes('technical education');
  return value.includes('disability');
}

export default function ScholarshipsPage() {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState<CategoryFilter>('all');
  const [provider, setProvider] = useState('all');
  const [timeline, setTimeline] = useState<TimelineFilter>('all');
  const [sort, setSort] = useState('recommended');

  const providers = useMemo(
    () => Array.from(new Set(scholarshipSchemes.map((scheme) => scheme.provider))).sort(),
    [],
  );

  const filteredSchemes = useMemo(() => {
    const search = query.trim().toLowerCase();
    const filtered = scholarshipSchemes.filter((scheme) => {
      const matchesSearch = !search || [
        scheme.name,
        scheme.shortName,
        scheme.provider,
        scheme.category,
        scheme.summary,
        scheme.ruleSource,
        scheme.amount,
      ].join(' ').toLowerCase().includes(search);
      const matchesProvider = provider === 'all' || scheme.provider === provider;
      const matchesTimeline = timeline === 'all'
        || (timeline === 'dated' && Boolean(scheme.studentDeadline))
        || (timeline === 'verify' && !scheme.studentDeadline);

      return matchesSearch
        && matchesCategory(scheme.category, category)
        && matchesProvider
        && matchesTimeline;
    });

    if (sort === 'name') {
      filtered.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sort === 'deadline') {
      filtered.sort((a, b) => {
        if (!a.studentDeadline) return 1;
        if (!b.studentDeadline) return -1;
        return a.studentDeadline.localeCompare(b.studentDeadline);
      });
    }

    return filtered;
  }, [category, provider, query, sort, timeline]);

  const hasFilters = Boolean(query.trim())
    || category !== 'all'
    || provider !== 'all'
    || timeline !== 'all'
    || sort !== 'recommended';

  const resetFilters = () => {
    setQuery('');
    setCategory('all');
    setProvider('all');
    setTimeline('all');
    setSort('recommended');
  };

  return (
    <div className="cp-scholarship-directory">
      <section className="cp-dir-intro">
        <div className="cp-dir-intro-copy">
          <div className="cp-dir-kicker"><span /> SCHOLARSHIP INTELLIGENCE / REFERENCE LIBRARY</div>
          <h1>Find support that <span>fits your next step.</span></h1>
          <p>
            Explore scheme conditions, compare the published support and prepare the right documents.
            Every entry links back to its official source.
          </p>
          <div className="cp-dir-intro-actions">
            <Link href="/eligibility-checker" className="cp-dir-primary-action">
              Check my eligibility <ArrowRight size={17} />
            </Link>
            <a href="https://scholarships.gov.in/All-Scholarships" target="_blank" rel="noreferrer" className="cp-dir-text-action">
              Open NSP catalogue <ExternalLink size={14} />
            </a>
          </div>
        </div>
        <div className="cp-dir-intro-stamp" aria-label="Curated reference library">
          <span className="cp-dir-stamp-top">CAMPUSPULSE / 2026–27</span>
          <strong>{String(scholarshipSchemes.length).padStart(2, '0')}</strong>
          <span>CURATED<br />REFERENCES</span>
          <i><ShieldCheck size={19} /></i>
        </div>
      </section>

      <section className="cp-dir-summary" aria-label="Directory guidance">
        <div className="cp-dir-summary-item">
          <span className="cp-dir-summary-icon"><Search size={17} /></span>
          <div><strong>Search with context</strong><small>Find schemes by name, provider, category or rule source.</small></div>
        </div>
        <div className="cp-dir-summary-item">
          <span className="cp-dir-summary-icon cp-dir-summary-blue"><CalendarDays size={17} /></span>
          <div><strong>Check the timeline</strong><small>Dates shown here are reference data, not live portal confirmation.</small></div>
        </div>
        <div className="cp-dir-summary-item">
          <span className="cp-dir-summary-icon cp-dir-summary-orange"><CheckCircle2 size={17} /></span>
          <div><strong>Verify before applying</strong><small>Use the official scheme specification for the final decision.</small></div>
        </div>
      </section>

      <section className="cp-dir-discovery">
        <div className="cp-dir-section-heading">
          <div>
            <span className="cp-dir-eyebrow">01 / DISCOVER</span>
            <h2>Explore scholarship references</h2>
            <p>Use the filters to narrow the catalogue to the schemes you need to review.</p>
          </div>
          <span className="cp-dir-total"><strong>{String(scholarshipSchemes.length).padStart(2, '0')}</strong> TOTAL REFERENCES</span>
        </div>

        <div className="cp-dir-filter-panel">
          <label className="cp-dir-search">
            <Search size={19} aria-hidden="true" />
            <span className="cp-visually-hidden">Search scholarship references</span>
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search by scheme, ministry, keyword or rule source…"
              aria-label="Search scholarship references"
            />
            {query && (
              <button type="button" onClick={() => setQuery('')} aria-label="Clear search">
                ×
              </button>
            )}
          </label>

          <div className="cp-dir-filter-controls">
            <label className="cp-dir-select-wrap">
              <span>ISSUING AUTHORITY</span>
              <select value={provider} onChange={(event) => setProvider(event.target.value)} aria-label="Filter by issuing authority">
                <option value="all">All authorities</option>
                {providers.map((item) => <option key={item} value={item}>{item}</option>)}
              </select>
            </label>
            <label className="cp-dir-select-wrap">
              <span>APPLICATION TIMELINE</span>
              <select value={timeline} onChange={(event) => setTimeline(event.target.value as TimelineFilter)} aria-label="Filter by application timeline">
                <option value="all">Any timeline</option>
                <option value="dated">Has a listed student date</option>
                <option value="verify">Check date on official portal</option>
              </select>
            </label>
            <label className="cp-dir-select-wrap cp-dir-sort">
              <span>SORT RESULTS</span>
              <select value={sort} onChange={(event) => setSort(event.target.value)} aria-label="Sort scholarship references">
                <option value="recommended">Recommended order</option>
                <option value="deadline">Listed date — earliest first</option>
                <option value="name">Scheme name — A to Z</option>
              </select>
            </label>
          </div>

          <div className="cp-dir-filter-footer">
            <div className="cp-dir-category-filters" role="group" aria-label="Filter scholarship category">
              {categoryFilters.map((item) => (
                <button
                  key={item.value}
                  type="button"
                  className={category === item.value ? 'is-active' : ''}
                  aria-pressed={category === item.value}
                  onClick={() => setCategory(item.value)}
                >
                  {item.label}
                </button>
              ))}
            </div>
            <div className="cp-dir-results" aria-live="polite" aria-atomic="true">
              <strong>{String(filteredSchemes.length).padStart(2, '0')}</strong>
              <span>OF {String(scholarshipSchemes.length).padStart(2, '0')} RESULTS</span>
              {hasFilters && (
                <button type="button" onClick={resetFilters} aria-label="Clear all filters">
                  <FilterX size={14} /> Reset
                </button>
              )}
            </div>
          </div>
        </div>

        {filteredSchemes.length > 0 ? (
          <div className="cp-dir-card-grid" aria-label="Scholarship results">
            {filteredSchemes.map((scheme, index) => (
              <ScholarshipCard key={scheme.id} scheme={scheme} index={index} />
            ))}
          </div>
        ) : (
          <div className="cp-dir-empty" role="status">
            <span><SlidersHorizontal size={22} /></span>
            <h3>No references match those filters.</h3>
            <p>Try a broader keyword, select a different authority or clear the filters.</p>
            <button type="button" onClick={resetFilters}>Clear all filters <ArrowRight size={15} /></button>
          </div>
        )}
      </section>

      <section className="cp-dir-source-note">
        <span className="cp-dir-source-icon"><ShieldCheck size={22} /></span>
        <div>
          <span className="cp-dir-eyebrow">A NOTE ON ACCURACY</span>
          <h2>Use this library to prepare. Use the authority to confirm.</h2>
          <p>
            CampusPulse is a curated reference catalogue, not a government application portal.
            Scheme conditions, award amounts, institution lists and deadlines can change.
            Always confirm the current-year specification on the official source before acting.
          </p>
        </div>
        <a href="https://scholarships.gov.in/All-Scholarships" target="_blank" rel="noreferrer">
          Official NSP catalogue <ArrowUpRight size={16} />
        </a>
      </section>
    </div>
  );
}
