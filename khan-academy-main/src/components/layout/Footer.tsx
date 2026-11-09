import { GraduationCap, Mail } from 'lucide-react';
import { SITE } from '@/config/site';
import { useLanguage } from '@/hooks/useLanguage';
import type { Category } from '@/types/content';

export function Footer({ categories }: { categories: Category[] }) {
  const { pick } = useLanguage();
  const year = new Date().getFullYear();

  const quickLinks = [
    { href: '#upcoming', label: pick('আসন্ন কোর্স', 'Upcoming Courses') },
    { href: '#free-recorded', label: pick('ফ্রি কোর্স', 'Free Courses') },
    { href: '#workshops', label: pick('ওয়ার্কশপ', 'Workshops') },
    { href: '#corporate', label: pick('কর্পোরেট ট্রেনিং', 'Corporate Training') },
    { href: '#download', label: pick('অ্যাপ ডাউনলোড', 'Download App') },
  ];

  return (
    <footer className="border-t border-line bg-white">
      <div className="container-page grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div className="flex flex-col gap-4">
          <a href="#top" className="flex items-center gap-2">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary-700 text-white">
              <GraduationCap className="h-5 w-5" />
            </span>
            <span className="text-lg font-bold text-ink">
              Khan<span className="text-primary-700">Academy</span>
            </span>
          </a>
          <p className="text-sm leading-normal text-ink-muted">
            {pick(
              'বাংলাদেশের শিক্ষার্থীদের জন্য ইন্ডাস্ট্রি-রেডি অনলাইন শিক্ষা। বাংলা ও ইংরেজিতে, অভিজ্ঞ মেন্টরদের সাথে।',
              'Industry-ready online learning for students in Bangladesh, in Bangla and English, with experienced mentors.',
            )}
          </p>
          <ul className="flex flex-wrap gap-2">
            {SITE.socials.map((social) => (
              <li key={social.label}>
                <a
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full border border-line px-3 py-1.5 text-sm text-ink transition hover:border-primary-700 hover:text-primary-700"
                >
                  {social.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <FooterColumn title={pick('দ্রুত লিংক', 'Quick links')} items={quickLinks} />

        <FooterColumn
          title={pick('ক্যাটাগরি', 'Course categories')}
          items={categories.map((category) => ({
            href: '#categories',
            label: pick(category.name_bn, category.name_en),
          }))}
        />

        <div className="flex flex-col gap-4">
          <h3 className="text-sm font-bold text-ink">{pick('যোগাযোগ', 'Contact')}</h3>
          <a
            href={`mailto:${SITE.supportEmail}`}
            className="flex items-center gap-2 text-sm text-ink-muted transition hover:text-primary-700"
          >
            <Mail className="h-4 w-4" />
            {SITE.supportEmail}
          </a>
          <div className="flex flex-col gap-2">
            <h4 className="text-sm font-bold text-ink">{pick('পেমেন্ট পদ্ধতি', 'Payment methods')}</h4>
            <ul className="flex flex-wrap gap-2">
              {SITE.paymentMethods.map((method) => (
                <li key={method} className="rounded-lg bg-canvas px-2.5 py-1 text-xs font-medium text-ink-muted">
                  {method}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <div className="border-t border-line">
        <p className="container-page py-6 text-center text-sm text-ink-muted">
          © {year} Khan Academy. {pick('সর্বস্বত্ব সংরক্ষিত।', 'All rights reserved.')}
        </p>
      </div>
    </footer>
  );
}

function FooterColumn({ title, items }: { title: string; items: { href: string; label: string }[] }) {
  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-sm font-bold text-ink">{title}</h3>
      <ul className="flex flex-col gap-2.5">
        {items.map((item) => (
          <li key={item.label}>
            <a href={item.href} className="text-sm text-ink-muted transition hover:text-primary-700">
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
