import { useEffect, useState, type ReactNode } from 'react';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { useLanguage } from '@/hooks/useLanguage';
import type { Testimonial } from '@/types/content';

const AUTO_ADVANCE_MS = 6000;

export function Testimonials({ testimonials }: { testimonials: Testimonial[] }) {
  const { pick } = useLanguage();
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const count = testimonials.length;

  useEffect(() => {
    if (paused || count < 2) return;
    const timer = window.setInterval(() => setIndex((i) => (i + 1) % count), AUTO_ADVANCE_MS);
    return () => window.clearInterval(timer);
  }, [paused, count]);

  if (count === 0) return null;

  const current = testimonials[index % count];
  const go = (delta: number) => setIndex((i) => (i + delta + count) % count);

  return (
    <section id="testimonials" className="scroll-mt-24 bg-white py-16 sm:py-20">
      <div className="container-page">
        <SectionHeading
          eyebrow={pick('শিক্ষার্থীদের অভিজ্ঞতা', 'Student stories')}
          title={pick('যারা আমাদের সাথে শিখেছেন', 'Learners who grew with us')}
          description={pick(
            'নিচের মতামতগুলো ডেমো কনটেন্ট হিসেবে দেখানো হচ্ছে।',
            'The feedback below is sample content for demonstration.',
          )}
        />

        <div
          className="card relative mx-auto max-w-3xl p-6 sm:p-10"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          aria-roledescription="carousel"
        >
          <div key={current.id} className="animate-fade-up flex flex-col gap-6">
            <div className="flex gap-1" aria-label={`${current.rating} / 5`}>
              {Array.from({ length: 5 }, (_, i) => (
                <Star
                  key={i}
                  className={`h-5 w-5 ${i < current.rating ? 'fill-accent-500 text-accent-500' : 'text-line'}`}
                />
              ))}
            </div>
            <blockquote className="text-lg leading-normal text-ink sm:text-xl">
              “{pick(current.feedback_bn, current.feedback_en)}”
            </blockquote>
            <div className="flex items-center gap-4 border-t border-line pt-6">
              {current.photo_url && (
                <img
                  src={current.photo_url}
                  alt=""
                  className="h-14 w-14 rounded-full object-cover"
                  loading="lazy"
                />
              )}
              <div className="min-w-0">
                <p className="font-bold text-ink">{current.student_name}</p>
                <p className="text-sm text-ink-muted">{current.course_name_en}</p>
                <p className="text-sm font-medium text-success-700">
                  {pick(current.employment_bn, current.employment_en)}
                </p>
              </div>
            </div>
          </div>

          <div className="mt-8 flex items-center justify-between">
            <div className="flex gap-2" role="tablist" aria-label={pick('মতামত বেছে নিন', 'Choose a testimonial')}>
              {testimonials.map((item, i) => (
                <button
                  key={item.id}
                  type="button"
                  role="tab"
                  aria-selected={i === index}
                  aria-label={`${i + 1}`}
                  onClick={() => setIndex(i)}
                  className={`h-2.5 rounded-full transition-all duration-300 ${
                    i === index ? 'w-8 bg-primary-700' : 'w-2.5 bg-line hover:bg-ink-muted'
                  }`}
                />
              ))}
            </div>
            <div className="flex gap-2">
              <NavButton label={pick('আগের মতামত', 'Previous')} onClick={() => go(-1)}>
                <ChevronLeft className="h-5 w-5" />
              </NavButton>
              <NavButton label={pick('পরের মতামত', 'Next')} onClick={() => go(1)}>
                <ChevronRight className="h-5 w-5" />
              </NavButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function NavButton({ label, onClick, children }: { label: string; onClick: () => void; children: ReactNode }) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className="flex h-10 w-10 items-center justify-center rounded-full border border-line text-ink transition hover:border-primary-700 hover:bg-primary-50 hover:text-primary-700"
    >
      {children}
    </button>
  );
}
