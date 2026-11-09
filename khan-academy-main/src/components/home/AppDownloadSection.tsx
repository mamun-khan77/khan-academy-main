import { Monitor, Smartphone, Tablet } from 'lucide-react';
import { SITE } from '@/config/site';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Button } from '@/components/ui/Button';
import { useLanguage } from '@/hooks/useLanguage';

export function AppDownloadSection() {
  const { pick } = useLanguage();
  const platforms = [
    {
      key: 'android',
      icon: Smartphone,
      label: pick('অ্যান্ড্রয়েড অ্যাপ', 'Android app'),
      href: SITE.downloads.android,
    },
    {
      key: 'ios',
      icon: Tablet,
      label: pick('iOS অ্যাপ', 'iOS app'),
      href: SITE.downloads.ios,
    },
    {
      key: 'desktop',
      icon: Monitor,
      label: pick('ডেস্কটপ অ্যাপ', 'Desktop app'),
      href: SITE.downloads.desktop,
    },
  ];

  return (
    <section id="download" className="scroll-mt-24 py-16 sm:py-20">
      <div className="container-page">
        <div className="card grid items-center gap-10 p-8 sm:p-12 lg:grid-cols-2">
          <div>
            <SectionHeading
              eyebrow={pick('মোবাইল ও ডেস্কটপ', 'Mobile and desktop')}
              title={pick('যেকোনো জায়গা থেকে শিখুন', 'Learn from anywhere')}
              description={pick(
                'অফলাইনে পড়ার সুবিধাসহ আমাদের অ্যাপ ডাউনলোড করুন। লাইভ ক্লাসের নোটিফিকেশনও পাবেন।',
                'Download the app for live class reminders and a smooth learning experience on the go.',
              )}
            />
          </div>
          <ul className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
            {platforms.map((platform) => (
              <li key={platform.key} className="flex flex-col items-start gap-4 rounded-2xl border border-line bg-canvas p-5">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-white text-primary-700 shadow-sm">
                  <platform.icon className="h-5 w-5" />
                </span>
                <p className="font-bold text-ink">{platform.label}</p>
                {platform.href ? (
                  <a href={platform.href} target="_blank" rel="noreferrer" className="w-full">
                    <Button variant="primary" size="sm" className="w-full">
                      {pick('ডাউনলোড করুন', 'Download')}
                    </Button>
                  </a>
                ) : (
                  <Button variant="outline" size="sm" className="w-full" disabled>
                    {pick('শীঘ্রই আসছে', 'Coming soon')}
                  </Button>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
