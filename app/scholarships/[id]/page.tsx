import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  BookOpenCheck,
  CalendarDays,
  CheckCircle2,
  ExternalLink,
  FileCheck2,
  Info,
  Landmark,
  ShieldCheck,
} from 'lucide-react';
import { ScholarshipOfficeFinder } from '@/components/scholarship-office-finder';
import { SaveSchemeButton } from '@/components/save-scheme-button';
import { scholarshipBranding } from '@/lib/scholarship-branding';
import { documentOptions, scholarshipSchemes } from '@/lib/scholarships';

export function generateStaticParams() {
  return scholarshipSchemes.map((scheme) => ({ id: scheme.id }));
}

function formatStudentDeadline(value?: string) {
  if (!value) return 'Not listed in this reference';
  return new Intl.DateTimeFormat('en-IN', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date(value + 'T00:00:00'));
}

export default async function ScholarshipDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const scheme = scholarshipSchemes.find((item) => item.id === id);
  if (!scheme) notFound();

  const brand = scholarshipBranding[scheme.id];
  const relatedSchemes = scholarshipSchemes
    .filter((item) => item.id !== scheme.id
      && (item.provider === scheme.provider
        || item.category.split('·')[0].trim() === scheme.category.split('·')[0].trim()))
    .slice(0, 2);

  return (
    <div className="cp-scheme-detail-page">
      <div className="cp-scheme-breadcrumb">
        <Link href="/scholarships"><ArrowLeft size={15} /> Scholarship library</Link>
        <span>SCHEME REFERENCE / {scheme.shortName}</span>
      </div>

      <section className="cp-scheme-detail-hero">
        <div className="cp-scheme-detail-main">
          <div className="cp-scheme-detail-authority">
            <span className="cp-scheme-detail-logo">
              {brand ? (
                <img src={brand.imageUrl} alt={brand.imageAlt} loading="eager" decoding="async" />
              ) : (
                <Landmark size={25} />
              )}
            </span>
            <span>
              <small>ISSUING AUTHORITY</small>
              <strong>{scheme.provider}</strong>
            </span>
          </div>

          <div className="cp-scheme-detail-tags">
            <span>{scheme.category.split('·')[0].trim()}</span>
            {scheme.category.split('·')[1] && <span>{scheme.category.split('·')[1].trim()}</span>}
          </div>

          <h1>{scheme.name}</h1>
          <p>{scheme.summary}</p>

          <div className="cp-scheme-detail-actions">
            <SaveSchemeButton schemeId={scheme.id} className="cp-scheme-save cp-scheme-save-large" />
            <a href={scheme.sourceUrl} target="_blank" rel="noreferrer" className="cp-scheme-official-cta">
              Open official source <ExternalLink size={15} />
            </a>
          </div>

          {brand && (
            <a className="cp-scheme-detail-credit" href={brand.imageUrl} target="_blank" rel="noreferrer">
              Visual identity: {brand.imageSource} <ExternalLink size={11} />
            </a>
          )}
        </div>

        <aside className="cp-scheme-detail-support">
          <span className="cp-dir-eyebrow">INDICATIVE SUPPORT</span>
          <strong>₹</strong>
          <p>{scheme.amount}</p>
          <small>Refer to the latest scheme specification for the applicable award components.</small>
        </aside>
      </section>

      <section className="cp-scheme-detail-stats" aria-label="Scheme reference summary">
        <div>
          <span className="cp-scheme-stat-icon"><CalendarDays size={17} /></span>
          <span><small>STUDENT APPLICATION DATE</small><strong>{formatStudentDeadline(scheme.studentDeadline)}</strong></span>
        </div>
        <div>
          <span className="cp-scheme-stat-icon cp-scheme-stat-blue"><FileCheck2 size={17} /></span>
          <span><small>DOCUMENT TYPES TO CHECK</small><strong>{scheme.required.length} listed for preparation</strong></span>
        </div>
        <div>
          <span className="cp-scheme-stat-icon cp-scheme-stat-orange"><ShieldCheck size={17} /></span>
          <span><small>REFERENCE CHECK</small><strong>{scheme.sourceDate}</strong></span>
        </div>
      </section>

      <div className="cp-scheme-detail-layout">
        <main className="cp-scheme-detail-content">
          <section className="cp-scheme-detail-section">
            <div className="cp-scheme-section-heading">
              <span className="cp-dir-eyebrow">01 / PUBLISHED CONDITIONS</span>
              <span className="cp-scheme-section-index">01</span>
            </div>
            <h2>What the scheme rules say.</h2>
            <p className="cp-scheme-section-intro">
              These are the conditions captured in the current CampusPulse reference entry.
              The official authority remains the final source for interpretation.
            </p>
            <ol className="cp-scheme-criteria-list">
              {scheme.criteria.map((criterion, index) => (
                <li key={criterion}>
                  <span>{String(index + 1).padStart(2, '0')}</span>
                  <p>{criterion}</p>
                </li>
              ))}
            </ol>
          </section>

          <section className="cp-scheme-detail-section">
            <div className="cp-scheme-section-heading">
              <span className="cp-dir-eyebrow">02 / DOCUMENT PREPARATION</span>
              <span className="cp-scheme-section-index">02</span>
            </div>
            <h2>Documents to check.</h2>
            <p className="cp-scheme-section-intro">
              Use this as a preparation list. It does not replace the current portal upload checklist.
            </p>
            <div className="cp-scheme-document-grid">
              {scheme.required.map((documentId) => {
                const document = documentOptions.find((item) => item.id === documentId);
                if (!document) return null;
                return (
                  <div className="cp-scheme-document" key={documentId}>
                    <span><FileCheck2 size={17} /></span>
                    <div><strong>{document.label}</strong><small>{document.detail}</small></div>
                    <CheckCircle2 size={15} className="cp-scheme-document-check" />
                  </div>
                );
              })}
            </div>
            <div className="cp-scheme-preparation-note">
              <Info size={17} />
              <p>
                The exact document format, validity period, issuing authority and upload requirements
                must be taken from the current scheme guideline.
              </p>
            </div>
          </section>

          <section className="cp-scheme-detail-section cp-scheme-caveats">
            <div className="cp-scheme-section-heading">
              <span className="cp-dir-eyebrow">03 / IMPORTANT LIMITATIONS</span>
              <span className="cp-scheme-section-index">03</span>
            </div>
            <h2>Read before you rely on a match.</h2>
            <div className="cp-scheme-caveat-list">
              {scheme.caveats.map((caveat) => (
                <div key={caveat}>
                  <AlertTriangle size={17} />
                  <p>{caveat}</p>
                </div>
              ))}
            </div>
          </section>

          <ScholarshipOfficeFinder
            schemeId={scheme.id}
            schemeName={scheme.name}
            provider={scheme.provider}
            category={scheme.category}
          />
        </main>

        <aside className="cp-scheme-detail-sidebar">
          <div className="cp-scheme-source-panel">
            <div className="cp-scheme-source-panel-head">
              <span className="cp-scheme-source-panel-mark"><BookOpenCheck size={18} /></span>
              <span><small>REFERENCE SOURCE</small><strong>{scheme.shortName}</strong></span>
            </div>
            <div className="cp-scheme-source-fact">
              <span>Rule source</span>
              <strong>{scheme.ruleSource}</strong>
            </div>
            <div className="cp-scheme-source-fact">
              <span>Reference checked</span>
              <strong>{scheme.sourceDate}</strong>
            </div>
            <div className="cp-scheme-source-fact">
              <span>Application timeline</span>
              <strong>{scheme.deadlineNote}</strong>
            </div>
            <div className="cp-scheme-source-fact">
              <span>Student date listed</span>
              <strong>{formatStudentDeadline(scheme.studentDeadline)}</strong>
            </div>
            <a href={scheme.sourceUrl} target="_blank" rel="noreferrer" className="cp-scheme-source-button">
              Visit official source <ExternalLink size={15} />
            </a>
            <Link href="/eligibility-checker" className="cp-scheme-check-button">
              Compare with my profile <ArrowUpRight size={15} />
            </Link>
            <div className="cp-scheme-source-disclaimer">
              <ShieldCheck size={16} />
              <p>Only the official scheme authority can confirm eligibility and award a scholarship.</p>
            </div>
          </div>

          <div className="cp-scheme-next-panel">
            <span className="cp-dir-eyebrow">YOUR NEXT STEP</span>
            <h3>Keep the application organised.</h3>
            <p>Save this scheme to your tracker, then record your status and next action.</p>
            <Link href="/tracker">Open my tracker <ArrowRight size={15} /></Link>
          </div>
        </aside>
      </div>

      {relatedSchemes.length > 0 && (
        <section className="cp-scheme-related">
          <div>
            <span className="cp-dir-eyebrow">KEEP EXPLORING</span>
            <h2>Related scheme references</h2>
          </div>
          <div className="cp-scheme-related-grid">
            {relatedSchemes.map((item) => (
              <Link href={'/scholarships/' + item.id} key={item.id}>
                <span>{item.shortName}</span>
                <strong>{item.name}</strong>
                <ArrowUpRight size={17} />
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
