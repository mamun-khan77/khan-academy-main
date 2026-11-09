import { useLanguage } from '@/hooks/useLanguage';
import type { CountdownParts } from '@/hooks/useCountdown';

interface CountdownDisplayProps {
  parts: CountdownParts;
  tone?: 'light' | 'dark';
}

export function CountdownDisplay({ parts, tone = 'light' }: CountdownDisplayProps) {
  const { lang } = useLanguage();
  const units = [
    { value: parts.days, label: lang === 'bn' ? 'দিন' : 'Days' },
    { value: parts.hours, label: lang === 'bn' ? 'ঘণ্টা' : 'Hrs' },
    { value: parts.minutes, label: lang === 'bn' ? 'মিনিট' : 'Min' },
    { value: parts.seconds, label: lang === 'bn' ? 'সেকেন্ড' : 'Sec' },
  ];
  const boxClass = tone === 'dark' ? 'bg-white/15 text-white' : 'bg-primary-50 text-primary-800';
  const labelClass = tone === 'dark' ? 'text-white/80' : 'text-ink-muted';

  return (
    <div className="flex gap-2">
      {units.map((unit) => (
        <div
          key={unit.label}
          className={`flex min-w-[3.5rem] flex-col items-center rounded-xl px-2 py-2 ${boxClass}`}
        >
          <span className="text-lg font-bold tabular-nums leading-none">
            {String(unit.value).padStart(2, '0')}
          </span>
          <span className={`mt-1 text-[11px] ${labelClass}`}>{unit.label}</span>
        </div>
      ))}
    </div>
  );
}
