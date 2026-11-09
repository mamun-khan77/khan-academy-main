import { useCountdown } from '@/hooks/useCountdown';
import { useLanguage } from '@/hooks/useLanguage';
import { CountdownDisplay } from '@/components/ui/CountdownDisplay';
import { Button } from '@/components/ui/Button';
import type { Promotion } from '@/types/content';

export function PromoBanner({ promotion }: { promotion: Promotion | null }) {
  const { pick } = useLanguage();
  const countdown = useCountdown(promotion?.ends_at ?? null);

  if (!promotion || !countdown || countdown.expired) return null;

  return (
    <section aria-label={pick(promotion.title_bn, promotion.title_en)} className="container-page py-16 sm:py-20">
      <div className="relative overflow-hidden rounded-3xl bg-primary-700 px-6 py-10 text-white shadow-lift sm:px-12 sm:py-14">
        <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-secondary-600/40 blur-3xl" />
        <div className="relative grid items-center gap-8 lg:grid-cols-2">
          <div className="flex flex-col gap-4">
            <span className="w-fit rounded-full bg-accent-500 px-3 py-1 text-xs font-bold uppercase tracking-wide text-ink">
              {pick('সীমিত সময়ের অফার', 'Limited time offer')}
            </span>
            <h2 className="text-3xl font-bold leading-tight sm:text-4xl">
              {pick(promotion.title_bn, promotion.title_en)}
            </h2>
            <p className="max-w-md text-base leading-normal text-white/90">
              {pick(promotion.subtitle_bn, promotion.subtitle_en)}
            </p>
            <a href="#upcoming" className="w-fit">
              <Button variant="accent" size="lg">
                {pick(promotion.cta_label_bn, promotion.cta_label_en)}
              </Button>
            </a>
          </div>
          <div className="flex flex-col gap-3 lg:items-end">
            <p className="text-sm font-medium text-white/90">{pick('অফার শেষ হতে বাকি', 'Offer ends in')}</p>
            <CountdownDisplay parts={countdown} tone="dark" />
          </div>
        </div>
      </div>
    </section>
  );
}
