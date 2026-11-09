import type { Lang } from '@/context/language';

const DHAKA_TZ = 'Asia/Dhaka';

function localeOf(lang: Lang): string {
  return lang === 'bn' ? 'bn-BD' : 'en-BD';
}

export function formatTaka(amount: number, lang: Lang): string {
  return `৳${new Intl.NumberFormat(localeOf(lang), { maximumFractionDigits: 0 }).format(amount)}`;
}

export function formatDate(iso: string, lang: Lang): string {
  return new Date(iso).toLocaleDateString(localeOf(lang), {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    timeZone: DHAKA_TZ,
  });
}

export function formatDateTime(iso: string, lang: Lang): string {
  return new Date(iso).toLocaleString(localeOf(lang), {
    day: 'numeric',
    month: 'short',
    hour: 'numeric',
    minute: '2-digit',
    timeZone: DHAKA_TZ,
  });
}

export function formatCount(value: number, lang: Lang): string {
  return new Intl.NumberFormat(localeOf(lang)).format(value);
}

export function discountPercent(price: number, discountPrice: number | null): number {
  if (discountPrice === null || price <= 0 || discountPrice >= price) return 0;
  return Math.round((1 - discountPrice / price) * 100);
}
