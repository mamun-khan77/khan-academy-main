import type { ReactNode } from 'react';

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  action?: ReactNode;
  align?: 'left' | 'center';
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  action,
  align = 'left',
}: SectionHeadingProps) {
  const centered = align === 'center';
  return (
    <div
      className={`mb-8 flex flex-col gap-4 sm:mb-10 sm:flex-row sm:items-end sm:justify-between ${
        centered ? 'text-center sm:flex-col sm:items-center' : ''
      }`}
    >
      <div className={`max-w-2xl ${centered ? 'mx-auto' : ''}`}>
        {eyebrow && (
          <p className="mb-2 text-sm font-medium uppercase tracking-wide text-primary-700">
            {eyebrow}
          </p>
        )}
        <h2 className="section-title">{title}</h2>
        {description && (
          <p className="mt-3 text-base leading-normal text-ink-muted">{description}</p>
        )}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}
