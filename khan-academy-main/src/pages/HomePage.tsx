import { useMemo, useState } from 'react';
import { AlertCircle, Loader2 } from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Hero } from '@/components/home/Hero';
import { StatsBar } from '@/components/home/StatsBar';
import { CategoryGrid } from '@/components/home/CategoryGrid';
import { UpcomingCourses } from '@/components/home/UpcomingCourses';
import { WorkshopsSection } from '@/components/home/WorkshopsSection';
import { PromoBanner } from '@/components/home/PromoBanner';
import { FreeAndRecordedSection } from '@/components/home/FreeAndRecordedSection';
import { CorporateSection } from '@/components/home/CorporateSection';
import { Testimonials } from '@/components/home/Testimonials';
import { InstructorsSection } from '@/components/home/InstructorsSection';
import { WhyChooseUs } from '@/components/home/WhyChooseUs';
import { AppDownloadSection } from '@/components/home/AppDownloadSection';
import { CourseDetailsDialog } from '@/components/home/CourseDetailsDialog';
import { LeadForm } from '@/components/leads/LeadForm';
import { Button } from '@/components/ui/Button';
import { Dialog } from '@/components/ui/Dialog';
import { useHomeContent } from '@/hooks/useHomeContent';
import { useLanguage } from '@/hooks/useLanguage';
import type { Course, Workshop } from '@/types/content';

type ActiveDialog =
  | { type: 'details'; course: Course }
  | { type: 'enroll'; course: Course }
  | { type: 'workshop'; workshop: Workshop }
  | null;

export function HomePage() {
  const { pick } = useLanguage();
  const { state, reload } = useHomeContent();
  const [dialog, setDialog] = useState<ActiveDialog>(null);

  const content = state.status === 'ready' ? state.content : null;

  const instructorsById = useMemo(
    () => new Map(content?.instructors.map((instructor) => [instructor.id, instructor]) ?? []),
    [content],
  );
  const courseCounts = useMemo(() => {
    const counts = new Map<string, number>();
    content?.courses.forEach((course) => {
      if (course.category_id) counts.set(course.category_id, (counts.get(course.category_id) ?? 0) + 1);
    });
    return counts;
  }, [content]);

  if (state.status === 'loading') {
    return (
      <div className="flex min-h-screen items-center justify-center bg-canvas">
        <Loader2 className="h-8 w-8 animate-spin text-primary-700" aria-label={pick('লোড হচ্ছে', 'Loading')} />
      </div>
    );
  }

  if (!content) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-canvas px-4 text-center">
        <AlertCircle className="h-10 w-10 text-danger-600" />
        <p className="text-lg font-bold text-ink">
          {pick('কনটেন্ট লোড করা যায়নি', 'We could not load the page')}
        </p>
        <p className="text-sm text-ink-muted">
          {pick('ইন্টারনেট সংযোগ দেখে আবার চেষ্টা করুন।', 'Check your connection and try again.')}
        </p>
        <Button variant="primary" onClick={reload}>
          {pick('আবার চেষ্টা করুন', 'Try again')}
        </Button>
      </div>
    );
  }

  const closeDialog = () => setDialog(null);
  const liveCourses = content.courses.filter((course) => course.format === 'live');
  const featured = content.courses.filter((course) => course.is_featured);
  const activePromotion = content.promotions[0] ?? null;

  const openDetails = (course: Course) => setDialog({ type: 'details', course });
  const openEnroll = (course: Course) => setDialog({ type: 'enroll', course });

  const detailsCourse = dialog?.type === 'details' ? dialog.course : null;
  const detailsInstructor = detailsCourse
    ? instructorsById.get(detailsCourse.instructor_id ?? '')
    : undefined;

  return (
    <div className="min-h-screen bg-canvas text-ink">
      <Navbar courses={content.courses} categories={content.categories} onSelectCourse={openDetails} />
      <main>
        <Hero featured={featured.length > 0 ? featured : content.courses} />
        <StatsBar stats={content.stats} />
        <CategoryGrid categories={content.categories} courseCounts={courseCounts} />
        <UpcomingCourses
          courses={liveCourses}
          categories={content.categories}
          instructors={content.instructors}
          onViewDetails={openDetails}
          onEnroll={openEnroll}
        />
        <WorkshopsSection
          workshops={content.workshops}
          instructors={content.instructors}
          onRegister={(workshop) => setDialog({ type: 'workshop', workshop })}
        />
        <PromoBanner promotion={activePromotion} />
        <FreeAndRecordedSection courses={content.courses} onWatch={openDetails} />
        <CorporateSection />
        <Testimonials testimonials={content.testimonials} />
        <InstructorsSection instructors={content.instructors} courses={content.courses} />
        <WhyChooseUs />
        <AppDownloadSection />
      </main>
      <Footer categories={content.categories} />

      <CourseDetailsDialog
        course={detailsCourse}
        instructor={detailsInstructor}
        onClose={closeDialog}
        onEnroll={openEnroll}
      />

      <Dialog
        open={dialog?.type === 'enroll'}
        onClose={closeDialog}
        title={pick('কোর্সে এনরোল করুন', 'Enroll in this course')}
      >
        {dialog?.type === 'enroll' && (
          <div className="flex flex-col gap-4">
            <p className="text-sm text-ink-muted">{pick(dialog.course.title_bn, dialog.course.title_en)}</p>
            <LeadForm
              kind="course_enroll"
              courseId={dialog.course.id}
              submitLabel={pick('এনরোলমেন্ট অনুরোধ পাঠান', 'Send enrollment request')}
              successMessage={pick('আপনার অনুরোধ পাওয়া গেছে!', 'Request received!')}
            />
          </div>
        )}
      </Dialog>

      <Dialog
        open={dialog?.type === 'workshop'}
        onClose={closeDialog}
        title={pick('ওয়ার্কশপে রেজিস্ট্রেশন', 'Register for the workshop')}
      >
        {dialog?.type === 'workshop' && (
          <div className="flex flex-col gap-4">
            <p className="text-sm text-ink-muted">{pick(dialog.workshop.title_bn, dialog.workshop.title_en)}</p>
            <LeadForm
              kind="workshop_registration"
              workshopId={dialog.workshop.id}
              submitLabel={pick('ফ্রি রেজিস্ট্রেশন নিশ্চিত করুন', 'Confirm free registration')}
              successMessage={pick('রেজিস্ট্রেশন সম্পন্ন হয়েছে!', 'You are registered!')}
            />
          </div>
        )}
      </Dialog>
    </div>
  );
}
