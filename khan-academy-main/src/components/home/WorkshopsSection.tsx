import { CalendarClock, Radio, Video } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { useLanguage } from '@/hooks/useLanguage';
import { formatDateTime } from '@/lib/format';
import type { Instructor, Workshop } from '@/types/content';

interface WorkshopsSectionProps {
  workshops: Workshop[];
  instructors: Instructor[];
  onRegister: (workshop: Workshop) => void;
}

export function WorkshopsSection({ workshops, instructors, onRegister }: WorkshopsSectionProps) {
  const { lang, pick } = useLanguage();
  const instructorById = new Map(instructors.map((instructor) => [instructor.id, instructor]));

  return (
    <section id="workshops" className="scroll-mt-24 bg-white py-16 sm:py-20">
      <div className="container-page">
        <SectionHeading
          eyebrow={pick('ফ্রি ডেমো ক্লাস', 'Free demo classes')}
          title={pick('ফ্রি লাইভ ওয়ার্কশপ ও ডেমো ক্লাস', 'Free live workshops and demo classes')}
          description={pick(
            'কোর্সের আগে মেন্টরদের সাথে বিনামূল্যে শিখে দেখুন। রেজিস্ট্রেশন করে আপনার আসন নিশ্চিত করুন।',
            'Try a class with our mentors before you commit. Register to reserve your seat.',
          )}
        />

        {workshops.length === 0 ? (
          <p className="card px-6 py-12 text-center text-ink-muted">
            {pick('এই মুহূর্তে কোনো ওয়ার্কশপ নির্ধারিত নেই।', 'No workshops are scheduled right now.')}
          </p>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {workshops.map((workshop) => {
              const instructor = instructorById.get(workshop.instructor_id ?? '');
              return (
                <article key={workshop.id} className="card flex flex-col gap-4 p-6 hover:-translate-y-1 hover:shadow-lift">
                  <div className="flex items-center justify-between gap-3">
                    {workshop.is_live ? (
                      <Badge tone="danger">
                        <Radio className="h-3 w-3 animate-pulse" /> {pick('লাইভ চলছে', 'Live now')}
                      </Badge>
                    ) : (
                      <Badge tone="success">{pick('আসন্ন', 'Upcoming')}</Badge>
                    )}
                    <span className="text-xs text-ink-muted">
                      {workshop.duration_minutes} {pick('মিনিট', 'min')}
                    </span>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <h3 className="text-lg font-bold leading-tight text-ink">
                      {pick(workshop.title_bn, workshop.title_en)}
                    </h3>
                    <p className="text-sm text-ink-muted">{workshop.topic_en}</p>
                  </div>
                  <div className="flex flex-col gap-2 text-sm text-ink-muted">
                    <span className="flex items-center gap-2">
                      <CalendarClock className="h-4 w-4 text-primary-700" />
                      {formatDateTime(workshop.starts_at, lang)}
                    </span>
                    {instructor && (
                      <span className="flex items-center gap-2">
                        <Video className="h-4 w-4 text-primary-700" />
                        {pick(instructor.name_bn, instructor.name_en)}
                      </span>
                    )}
                  </div>
                  <Button
                    variant={workshop.is_live ? 'secondary' : 'primary'}
                    className="mt-auto w-full"
                    onClick={() => onRegister(workshop)}
                  >
                    {pick('ফ্রি রেজিস্ট্রেশন', 'Register free')}
                  </Button>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
