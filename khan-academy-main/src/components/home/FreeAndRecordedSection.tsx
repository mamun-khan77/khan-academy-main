import { useState } from 'react';
import { Clock, PlayCircle } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { useLanguage } from '@/hooks/useLanguage';
import { formatCount } from '@/lib/format';
import type { Course } from '@/types/content';

interface FreeAndRecordedSectionProps {
  courses: Course[];
  onWatch: (course: Course) => void;
}

type TabKey = 'recorded' | 'free' | 'crash' | 'recent';

const TABS: { key: TabKey; bn: string; en: string }[] = [
  { key: 'recorded', bn: 'রেকর্ডেড ক্লাস', en: 'Recorded classes' },
  { key: 'free', bn: 'ফ্রি কোর্স', en: 'Free courses' },
  { key: 'crash', bn: 'ক্র্যাশ কোর্স', en: 'Crash courses' },
  { key: 'recent', bn: 'নতুন যোগ হয়েছে', en: 'Recently added' },
];

const RECENT_LIMIT = 4;

export function FreeAndRecordedSection({ courses, onWatch }: FreeAndRecordedSectionProps) {
  const { lang, pick } = useLanguage();
  const [tab, setTab] = useState<TabKey>('free');

  const list = courses.filter((course) => {
    switch (tab) {
      case 'recorded':
        return course.format === 'recorded';
      case 'free':
        return course.is_free;
      case 'crash':
        return course.is_crash_course;
      case 'recent':
        return true;
    }
  });
  const visible = tab === 'recent' ? list.slice(0, RECENT_LIMIT) : list;

  return (
    <section id="free-recorded" className="scroll-mt-24 bg-white py-16 sm:py-20">
      <div className="container-page">
        <SectionHeading
          eyebrow={pick('নিজের গতিতে শিখুন', 'Learn at your pace')}
          title={pick('রেকর্ডেড ক্লাস ও ফ্রি কোর্স', 'Recorded classes and free courses')}
        />

        <div
          role="tablist"
          aria-label={pick('কোর্সের ধরন', 'Course types')}
          className="-mx-4 mb-8 flex gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:flex-wrap sm:px-0"
        >
          {TABS.map((item) => (
            <button
              key={item.key}
              type="button"
              role="tab"
              aria-selected={tab === item.key}
              onClick={() => setTab(item.key)}
              className={`shrink-0 rounded-full border px-4 py-2 text-sm font-medium transition duration-200 ${
                tab === item.key
                  ? 'border-primary-700 bg-primary-700 text-white shadow-sm'
                  : 'border-line bg-white text-ink hover:border-primary-700 hover:text-primary-700'
              }`}
            >
              {pick(item.bn, item.en)}
            </button>
          ))}
        </div>

        {visible.length === 0 ? (
          <p className="card px-6 py-12 text-center text-ink-muted">
            {pick('এই ক্যাটাগরিতে এখনো কোনো কোর্স নেই।', 'No courses in this group yet.')}
          </p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
            {visible.map((course) => (
              <article key={course.id} className="card group flex flex-col overflow-hidden hover:-translate-y-1 hover:shadow-lift">
                <div className="relative aspect-[16/10] overflow-hidden bg-canvas">
                  {course.thumbnail_url && (
                    <img
                      src={course.thumbnail_url}
                      alt=""
                      loading="lazy"
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    />
                  )}
                  <div className="absolute left-3 top-3">
                    {course.is_free ? (
                      <Badge tone="success">{pick('ফ্রি', 'Free')}</Badge>
                    ) : (
                      <Badge tone="neutral">{pick('রেকর্ডেড', 'Recorded')}</Badge>
                    )}
                  </div>
                </div>
                <div className="flex flex-1 flex-col gap-3 p-5">
                  <h3 className="line-clamp-2 text-base font-bold leading-tight text-ink">
                    {pick(course.title_bn, course.title_en)}
                  </h3>
                  <p className="line-clamp-2 text-sm leading-normal text-ink-muted">
                    {pick(course.description_bn, course.description_en)}
                  </p>
                  <p className="flex items-center gap-1.5 text-sm text-ink-muted">
                    <Clock className="h-4 w-4 text-primary-700" />
                    {formatCount(course.duration_hours, lang)} {pick('ঘণ্টা', 'hours')}
                  </p>
                  <Button variant="secondary" className="mt-auto w-full" onClick={() => onWatch(course)}>
                    <PlayCircle className="h-5 w-5" />
                    {pick('এখনই দেখুন', 'Watch Now')}
                  </Button>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
