import type { ReactNode } from 'react';
import { Armchair, CalendarDays, Clock, Star, Users } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { useCountdown } from '@/hooks/useCountdown';
import { useLanguage } from '@/hooks/useLanguage';
import { discountPercent, formatCount, formatDate, formatTaka } from '@/lib/format';
import type { Course, Instructor } from '@/types/content';

interface CourseCardProps {
  course: Course;
  instructor: Instructor | undefined;
  onViewDetails: (course: Course) => void;
  onEnroll: (course: Course) => void;
}

const LEVEL_LABEL = {
  beginner: { bn: 'বিগিনার', en: 'Beginner' },
  intermediate: { bn: 'ইন্টারমিডিয়েট', en: 'Intermediate' },
  advanced: { bn: 'অ্যাডভান্সড', en: 'Advanced' },
} as const;

export function CourseCard({ course, instructor, onViewDetails, onEnroll }: CourseCardProps) {
  const { lang, pick } = useLanguage();
  const countdown = useCountdown(course.offer_ends_at);
  const offerActive = countdown !== null && !countdown.expired;
  const discount = discountPercent(course.price, course.discount_price);
  const finalPrice = course.discount_price ?? course.price;
  const lowSeats = course.seats_available > 0 && course.seats_available <= 5;
  const title = pick(course.title_bn, course.title_en);
  const subtitle = pick(course.subtitle_bn, course.subtitle_en);
  const level = LEVEL_LABEL[course.level];

  return (
    <article className="card group flex h-full flex-col overflow-hidden hover:-translate-y-1 hover:shadow-lift">
      <div className="relative aspect-[16/10] overflow-hidden bg-canvas">
        {course.thumbnail_url && (
          <img
            src={course.thumbnail_url}
            alt={title}
            loading="lazy"
            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          />
        )}
        <div className="absolute left-3 top-3 flex flex-wrap gap-2">
          <Badge tone="neutral">{pick(level.bn, level.en)}</Badge>
          <Badge tone="primary">
            {course.format === 'live' ? pick('লাইভ', 'Live') : pick('রেকর্ডেড', 'Recorded')}
          </Badge>
        </div>
        {discount > 0 && (
          <span className="absolute right-3 top-3 rounded-full bg-accent-500 px-2.5 py-1 text-xs font-bold text-ink shadow-sm">
            {formatCount(discount, lang)}% {pick('ছাড়', 'OFF')}
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-4 p-5">
        <div className="flex flex-col gap-1.5">
          <h3 className="line-clamp-2 text-lg font-bold leading-tight text-ink">{title}</h3>
          {subtitle && <p className="line-clamp-1 text-sm text-ink-muted">{subtitle}</p>}
        </div>

        {instructor && (
          <div className="flex items-center gap-3">
            {instructor.avatar_url && (
              <img
                src={instructor.avatar_url}
                alt=""
                className="h-8 w-8 rounded-full object-cover"
                loading="lazy"
              />
            )}
            <div className="min-w-0">
              <p className="truncate text-sm font-medium text-ink">
                {pick(instructor.name_bn, instructor.name_en)}
              </p>
              <p className="truncate text-xs text-ink-muted">
                {pick(instructor.designation_bn, instructor.designation_en)}
              </p>
            </div>
          </div>
        )}

        <div className="grid grid-cols-2 gap-2 text-sm text-ink-muted">
          <Meta icon={<Clock className="h-4 w-4" />}>
            {formatCount(course.duration_hours, lang)} {pick('ঘণ্টা', 'hours')}
          </Meta>
          <Meta icon={<Users className="h-4 w-4" />}>
            {formatCount(course.total_learners, lang)} {pick('শিক্ষার্থী', 'learners')}
          </Meta>
          <Meta icon={<CalendarDays className="h-4 w-4" />}>
            {course.starts_on
              ? formatDate(`${course.starts_on}T00:00:00+06:00`, lang)
              : pick('শীঘ্রই', 'Soon')}
          </Meta>
          <Meta icon={<Armchair className="h-4 w-4" />}>
            <span className={lowSeats ? 'font-medium text-danger-600' : ''}>
              {pick(
                `${formatCount(course.seats_available, lang)} আসন বাকি`,
                `${formatCount(course.seats_available, lang)} seats left`,
              )}
            </span>
          </Meta>
        </div>

        <div className="flex items-center justify-between gap-3 text-sm">
          <span className="flex items-center gap-1 font-medium text-ink">
            <Star className="h-4 w-4 fill-accent-500 text-accent-500" />
            {course.rating.toFixed(1)}
          </span>
          <span className="text-ink-muted">
            {pick(`ব্যাচ ${String(course.batch_number).padStart(2, '0')}`, `Batch ${course.batch_number}`)}
          </span>
        </div>

        <div className="mt-auto flex flex-col gap-3 border-t border-line pt-4">
          <div className="flex items-end justify-between gap-3">
            <div className="flex flex-col">
              {course.is_free ? (
                <span className="text-xl font-bold text-success-700">
                  {pick('বিনামূল্যে', 'Free')}
                </span>
              ) : (
                <>
                  <span className="text-xl font-bold text-ink">{formatTaka(finalPrice, lang)}</span>
                  {discount > 0 && (
                    <span className="text-sm text-ink-muted line-through">
                      {formatTaka(course.price, lang)}
                    </span>
                  )}
                </>
              )}
            </div>
            {offerActive && countdown && (
              <p className="text-right text-xs text-ink-muted">
                {pick('অফার শেষ হতে', 'Offer ends in')}
                <span className="block font-bold tabular-nums text-primary-700">
                  {countdown.days}
                  {pick(' দিন ', 'd ')}
                  {String(countdown.hours).padStart(2, '0')}:
                  {String(countdown.minutes).padStart(2, '0')}:
                  {String(countdown.seconds).padStart(2, '0')}
                </span>
              </p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-2">
            <Button variant="outline" size="sm" onClick={() => onViewDetails(course)}>
              {pick('বিস্তারিত', 'View Details')}
            </Button>
            <Button variant="primary" size="sm" onClick={() => onEnroll(course)}>
              {pick('এনরোল করুন', 'Enroll Now')}
            </Button>
          </div>
        </div>
      </div>
    </article>
  );
}

function Meta({ icon, children }: { icon: ReactNode; children: ReactNode }) {
  return (
    <div className="flex min-w-0 items-center gap-1.5">
      <span className="shrink-0 text-primary-700">{icon}</span>
      <span className="truncate">{children}</span>
    </div>
  );
}
