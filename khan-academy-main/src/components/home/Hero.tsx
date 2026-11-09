import { ArrowRight, BadgeCheck, Star } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { useLanguage } from '@/hooks/useLanguage';
import { formatTaka } from '@/lib/format';
import type { Course } from '@/types/content';

interface HeroProps {
  featured: Course[];
}

export function Hero({ featured }: HeroProps) {
  const { pick } = useLanguage();
  const floating = featured.slice(0, 3);

  return (
    <section id="top" className="relative overflow-hidden bg-gradient-to-br from-white via-primary-50 to-secondary-50">
      <div className="container-page grid items-center gap-12 py-14 sm:py-20 lg:grid-cols-2 lg:py-24">
        <div className="animate-fade-up flex flex-col gap-6">
          <span className="inline-flex w-fit items-center gap-2 rounded-full border border-primary-100 bg-white px-3 py-1.5 text-sm font-medium text-primary-800 shadow-sm">
            <BadgeCheck className="h-4 w-4 text-success-600" />
            {pick('ইন্ডাস্ট্রি-রেডি স্কিল, বাংলায় ও ইংরেজিতে', 'Industry-ready skills in Bangla and English')}
          </span>
          <h1 className="text-4xl font-bold leading-tight text-ink sm:text-5xl lg:text-6xl">
            {pick('বাংলাদেশ শিখবে, দক্ষতায় গড়বে ভবিষ্যৎ', 'Bangladesh learns, and builds its future with skill')}
          </h1>
          <p className="max-w-xl text-base leading-normal text-ink-muted sm:text-lg">
            {pick(
              'ইন্ডাস্ট্রি-রেডি স্কিল শিখুন অভিজ্ঞ মেন্টরদের সাথে এবং তৈরি করুন আপনার সফল ক্যারিয়ার।',
              'Learn in-demand skills from experienced mentors and build a career you are proud of.',
            )}
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <a href="#upcoming" className="inline-flex">
              <Button variant="primary" size="lg" className="w-full sm:w-auto">
                {pick('শেখা শুরু করুন', 'Start learning')}
                <ArrowRight className="h-5 w-5" />
              </Button>
            </a>
            <a href="#categories" className="inline-flex">
              <Button variant="outline" size="lg" className="w-full sm:w-auto">
                {pick('কোর্স এক্সপ্লোর করুন', 'Explore courses')}
              </Button>
            </a>
          </div>
        </div>

        <div className="relative hidden min-h-[420px] lg:block">
          <div className="absolute inset-x-8 top-6 bottom-6 overflow-hidden rounded-3xl bg-primary-700 shadow-lift">
            <img
              src="https://images.pexels.com/photos/9159042/pexels-photo-9159042.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
              alt={pick('ক্লাসরুমে শিক্ষার্থীরা শিখছে', 'Students learning in a classroom')}
              className="h-full w-full object-cover opacity-90"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary-900/60 to-transparent" />
          </div>
          {floating.map((course, index) => (
            <FloatingCard
              key={course.id}
              course={course}
              className={
                index === 0
                  ? 'left-0 top-4 animate-float'
                  : index === 1
                    ? 'right-0 top-1/2 animate-float [animation-delay:1.5s]'
                    : 'bottom-4 left-10 animate-float [animation-delay:3s]'
              }
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function FloatingCard({ course, className }: { course: Course; className: string }) {
  const { lang, pick } = useLanguage();
  return (
    <div className={`absolute z-10 flex w-64 items-center gap-3 rounded-2xl bg-white p-3 shadow-lift ${className}`}>
      {course.thumbnail_url && (
        <img src={course.thumbnail_url} alt="" className="h-14 w-14 shrink-0 rounded-xl object-cover" />
      )}
      <div className="min-w-0">
        <p className="truncate text-sm font-bold text-ink">{pick(course.title_bn, course.title_en)}</p>
        <div className="mt-1 flex items-center gap-2 text-xs text-ink-muted">
          <span className="flex items-center gap-0.5 font-medium text-ink">
            <Star className="h-3 w-3 fill-accent-500 text-accent-500" />
            {course.rating.toFixed(1)}
          </span>
          <span className="font-semibold text-primary-700">
            {course.is_free ? pick('ফ্রি', 'Free') : formatTaka(course.discount_price ?? course.price, lang)}
          </span>
        </div>
      </div>
    </div>
  );
}
