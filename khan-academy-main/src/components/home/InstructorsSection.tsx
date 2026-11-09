import { useLanguage } from '@/hooks/useLanguage';
import { SectionHeading } from '@/components/ui/SectionHeading';
import type { Course, Instructor } from '@/types/content';

export function InstructorsSection({
  instructors,
  courses,
}: {
  instructors: Instructor[];
  courses: Course[];
}) {
  const { pick } = useLanguage();
  return (
    <section id="instructors" className="scroll-mt-24 py-16 sm:py-20">
      <div className="container-page">
        <SectionHeading
          eyebrow={pick('আমাদের মেন্টর', 'Our mentors')}
          title={pick('ইন্ডাস্ট্রি থেকে আসা এক্সপার্ট ইন্সট্রাক্টর', 'Industry experts who teach')}
        />
        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {instructors.map((instructor) => {
            const taught = courses.filter((course) => course.instructor_id === instructor.id);
            return (
              <article key={instructor.id} className="card flex flex-col gap-5 p-6 hover:-translate-y-1 hover:shadow-lift">
                <div className="flex items-center gap-4">
                  {instructor.avatar_url && (
                    <img
                      src={instructor.avatar_url}
                      alt={pick(instructor.name_bn, instructor.name_en)}
                      loading="lazy"
                      className="h-16 w-16 rounded-2xl object-cover"
                    />
                  )}
                  <div className="min-w-0">
                    <h3 className="text-lg font-bold text-ink">{pick(instructor.name_bn, instructor.name_en)}</h3>
                    <p className="text-sm text-primary-700">
                      {pick(instructor.designation_bn, instructor.designation_en)}
                    </p>
                  </div>
                </div>
                <p className="text-sm leading-normal text-ink-muted">{pick(instructor.bio_bn, instructor.bio_en)}</p>
                <div className="flex flex-wrap gap-2">
                  {instructor.expertise.map((skill) => (
                    <span key={skill} className="rounded-full bg-canvas px-3 py-1 text-xs font-medium text-ink-muted">
                      {skill}
                    </span>
                  ))}
                </div>
                <p className="mt-auto border-t border-line pt-4 text-sm text-ink-muted">
                  {pick('কোর্স:', 'Courses:')} {taught.length > 0 ? taught.map((c) => pick(c.title_bn, c.title_en)).join(', ') : '-'}
                </p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
