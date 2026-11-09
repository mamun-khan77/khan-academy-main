import { Star } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Dialog } from '@/components/ui/Dialog';
import { useLanguage } from '@/hooks/useLanguage';
import { formatCount, formatTaka } from '@/lib/format';
import type { Course, Instructor } from '@/types/content';

interface CourseDetailsDialogProps {
  course: Course | null;
  instructor: Instructor | undefined;
  onClose: () => void;
  onEnroll: (course: Course) => void;
}

export function CourseDetailsDialog({ course, instructor, onClose, onEnroll }: CourseDetailsDialogProps) {
  const { lang, pick } = useLanguage();
  if (!course) return null;

  const title = pick(course.title_bn, course.title_en);

  return (
    <Dialog open onClose={onClose} title={title}>
      <div className="flex flex-col gap-5">
        {course.thumbnail_url && (
          <img
            src={course.thumbnail_url}
            alt=""
            className="aspect-[16/9] w-full rounded-2xl object-cover"
          />
        )}
        <div className="flex flex-wrap items-center gap-2">
          <Badge tone="primary">{course.format === 'live' ? pick('লাইভ', 'Live') : pick('রেকর্ডেড', 'Recorded')}</Badge>
          <Badge tone="neutral">{course.level}</Badge>
          <Badge tone="accent">
            <Star className="h-3 w-3 fill-current" /> {course.rating.toFixed(1)}
          </Badge>
        </div>
        <p className="text-sm leading-normal text-ink-muted">
          {pick(course.description_bn, course.description_en)}
        </p>
        <dl className="grid grid-cols-2 gap-3 text-sm">
          <Info label={pick('মেন্টর', 'Mentor')} value={instructor ? pick(instructor.name_bn, instructor.name_en) : '-'} />
          <Info label={pick('সময়কাল', 'Duration')} value={`${formatCount(course.duration_hours, lang)} ${pick('ঘণ্টা', 'hours')}`} />
          <Info label={pick('শিক্ষার্থী', 'Learners')} value={formatCount(course.total_learners, lang)} />
          <Info label={pick('আসন বাকি', 'Seats left')} value={formatCount(course.seats_available, lang)} />
        </dl>
        <div className="flex items-end justify-between gap-4 border-t border-line pt-4">
          <div>
            <p className="text-2xl font-bold text-ink">
              {course.is_free ? pick('বিনামূল্যে', 'Free') : formatTaka(course.discount_price ?? course.price, lang)}
            </p>
            {!course.is_free && course.discount_price !== null && (
              <p className="text-sm text-ink-muted line-through">{formatTaka(course.price, lang)}</p>
            )}
          </div>
          <Button variant="primary" size="lg" onClick={() => onEnroll(course)}>
            {pick('এনরোল করুন', 'Enroll Now')}
          </Button>
        </div>
      </div>
    </Dialog>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl bg-canvas p-3">
      <dt className="text-xs text-ink-muted">{label}</dt>
      <dd className="mt-0.5 font-medium text-ink">{value}</dd>
    </div>
  );
}
