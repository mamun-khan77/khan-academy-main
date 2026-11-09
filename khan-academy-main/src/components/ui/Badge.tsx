import type { ReactNode } from 'react';

type BadgeTone = 'primary' | 'accent' | 'success' | 'neutral' | 'danger';

const tones: Record<BadgeTone, string> = {
  primary: 'bg-primary-50 text-primary-800',
  accent: 'bg-accent-100 text-ink',
  success: 'bg-success-50 text-success-700',
  neutral: 'bg-canvas text-ink-muted border border-line',
  danger: 'bg-danger-50 text-danger-600',
};

export function Badge({ tone = 'neutral', children }: { tone?: BadgeTone; children: ReactNode }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${tones[tone]}`}
    >
      {children}
    </span>
  );
}
