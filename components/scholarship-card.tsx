'use client';

import Link from 'next/link';
import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowUpRight,
  CalendarDays,
  ExternalLink,
  FileCheck2,
  ShieldCheck,
} from 'lucide-react';
import type { ScholarshipScheme } from '@/lib/scholarships';
import { scholarshipBranding } from '@/lib/scholarship-branding';
import { SaveSchemeButton } from '@/components/save-scheme-button';

function formatStudentDeadline(value?: string) {
  if (!value) return 'Check official portal';
  const date = new Date(value + 'T00:00:00');
  return new Intl.DateTimeFormat('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(date);
}

export function ScholarshipCard({ scheme, index }: { scheme: ScholarshipScheme; index: number }) {
  const brand = scholarshipBranding[scheme.id];
  const [imageFailed, setImageFailed] = useState(false);
  const category = scheme.category.split('·')[0].trim();
  const subcategory = scheme.category.split('·')[1]?.trim();

  return (
    <motion.article
      className="cp-scheme-card"
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: 0.25, delay: Math.min(index * 0.035, 0.14), ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="cp-scheme-card-art">
        <span className="cp-scheme-card-number">{String(index + 1).padStart(2, '0')}</span>
        <span className="cp-scheme-card-art-label">{brand?.imageLabel || 'Scheme reference'}</span>
        {brand && !imageFailed ? (
          <img
            src={brand.imageUrl}
            alt={brand.imageAlt}
            loading="lazy"
            decoding="async"
            style={{ objectFit: brand.imageFit }}
            onError={() => setImageFailed(true)}
          />
        ) : (
          <span className="cp-scheme-card-art-fallback"><ShieldCheck size={34} /></span>
        )}
        <span className="cp-scheme-card-art-caption">CAMPUSPULSE / SCHEME FILE</span>
      </div>

      <div className="cp-scheme-card-content">
        <div className="cp-scheme-card-tags">
          <span className="cp-scheme-category">{category}</span>
          {subcategory && <span className="cp-scheme-subcategory">{subcategory}</span>}
        </div>

        <p className="cp-scheme-provider">{scheme.provider}</p>
        <h3><Link href={'/scholarships/' + scheme.id}>{scheme.name}</Link></h3>
        <p className="cp-scheme-summary">{scheme.summary}</p>

        <div className="cp-scheme-facts">
          <div className="cp-scheme-fact cp-scheme-fact-support">
            <span>INDICATIVE SUPPORT</span>
            <strong>{scheme.amount}</strong>
          </div>
          <div className="cp-scheme-fact">
            <span><CalendarDays size={12} /> STUDENT DATE</span>
            <strong>{formatStudentDeadline(scheme.studentDeadline)}</strong>
          </div>
        </div>

        <div className="cp-scheme-card-meta">
          <span><FileCheck2 size={14} /> {scheme.required.length} document types</span>
          <span><ShieldCheck size={14} /> Source linked</span>
        </div>

        <div className="cp-scheme-card-actions">
          <Link href={'/scholarships/' + scheme.id} className="cp-scheme-detail-link">
            View scheme <ArrowUpRight size={16} />
          </Link>
          <SaveSchemeButton schemeId={scheme.id} className="cp-scheme-save" />
        </div>

        {brand && (
          <a className="cp-scheme-image-credit" href={brand.imageUrl} target="_blank" rel="noreferrer">
            Image source: {brand.imageSource} <ExternalLink size={11} />
          </a>
        )}
      </div>
    </motion.article>
  );
}
