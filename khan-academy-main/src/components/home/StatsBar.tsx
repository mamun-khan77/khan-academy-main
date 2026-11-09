import { useLanguage } from '@/hooks/useLanguage';
import { formatCount } from '@/lib/format';
import type { SiteStat } from '@/types/content';

export function StatsBar({ stats }: { stats: SiteStat[] }) {
  const { lang, pick } = useLanguage();
  return (
    <section aria-label={pick('পরিসংখ্যান', 'Statistics')} className="border-y border-line bg-white">
      <dl className="container-page grid grid-cols-2 gap-6 py-10 lg:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.key} className="flex flex-col items-center text-center">
            <dd className="text-3xl font-bold tabular-nums text-primary-700 sm:text-4xl">
              {formatCount(stat.value, lang)}+
            </dd>
            <dt className="mt-1 text-sm text-ink-muted">{pick(stat.label_bn, stat.label_en)}</dt>
          </div>
        ))}
      </dl>
    </section>
  );
}
