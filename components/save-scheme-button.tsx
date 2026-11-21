'use client';

import { useEffect, useState } from 'react';
import { BookmarkCheck, BookmarkPlus } from 'lucide-react';
import { getTracker, saveTracker } from '@/lib/storage';
import type { TrackerItem } from '@/lib/types';

export function SaveSchemeButton({ schemeId, className = '' }: { schemeId: string; className?: string }) {
  const [saved, setSaved] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const sync = () => {
      setSaved(getTracker().some((item) => item.opportunityId === schemeId));
      setReady(true);
    };

    sync();
    window.addEventListener('storage', sync);
    window.addEventListener('campuspulse-tracker', sync);
    return () => {
      window.removeEventListener('storage', sync);
      window.removeEventListener('campuspulse-tracker', sync);
    };
  }, [schemeId]);

  const save = () => {
    if (!ready || saved) return;

    const current = getTracker();
    if (current.some((item) => item.opportunityId === schemeId)) {
      setSaved(true);
      return;
    }

    const next: TrackerItem[] = [
      ...current,
      {
        opportunityId: schemeId,
        status: 'Interested',
        notes: '',
        nextAction: 'Review the published conditions and verify the current official notice',
        reminderDate: '',
        updatedAt: new Date().toISOString(),
      },
    ];

    saveTracker(next);
    window.dispatchEvent(new Event('campuspulse-tracker'));
    setSaved(true);
  };

  const Icon = saved ? BookmarkCheck : BookmarkPlus;
  return (
    <button
      type="button"
      className={className}
      onClick={save}
      disabled={!ready || saved}
      aria-pressed={saved}
      aria-label={saved ? 'This scheme is in your tracker' : 'Save this scheme to your tracker'}
    >
      <Icon size={16} aria-hidden="true" />
      <span>{saved ? 'In your tracker' : ready ? 'Save to tracker' : 'Loading tracker'}</span>
    </button>
  );
}
