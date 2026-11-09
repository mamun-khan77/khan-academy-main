import { useMemo, useState, type ReactNode } from 'react';
import { Search } from 'lucide-react';
import { CourseCard } from '@/components/home/CourseCard';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Button } from '@/components/ui/Button';
import { useLanguage } from '@/hooks/useLanguage';
import type { Category, Course, Instructor } from '@/types/content';

interface UpcomingCoursesProps {
  courses: Course[];
  categories: Category[];
  instructors: Instructor[];
  onViewDetails: (course: Course) => void;
  onEnroll: (course: Course) => void;
}

type SortKey = 'popular' | 'rating' | 'price-asc' | 'price-desc' | 'starts';

const PAGE_SIZE = 6;

export function UpcomingCourses({
  courses,
  categories,
  instructors,
  onViewDetails,
  onEnroll,
}: UpcomingCoursesProps) {
  const { pick } = useLanguage();
  const [categoryId, setCategoryId] = useState<string>('all');
  const [query, setQuery] = useState('');
  const [sort, setSort] = useState<SortKey>('popular');
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  const instructorById = useMemo(
    () => new Map(instructors.map((instructor) => [instructor.id, instructor])),
    [instructors],
  );

  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase();
    const matches = courses.filter((course) => {
      if (categoryId !== 'all' && course.category_id !== categoryId) return false;
      if (!needle) return true;
      const instructorName = instructorById.get(course.instructor_id ?? '')?.name_en ?? '';
      return [course.title_en, course.title_bn, course.subtitle_en, instructorName]
        .join(' ')
        .toLowerCase()
        .includes(needle);
    });

    const sorted = [...matches];
    sorted.sort((a, b) => {
      switch (sort) {
        case 'rating':
          return b.rating - a.rating;
        case 'price-asc':
          return (a.discount_price ?? a.price) - (b.discount_price ?? b.price);
        case 'price-desc':
          return (b.discount_price ?? b.price) - (a.discount_price ?? a.price);
        case 'starts':
          return (a.starts_on ?? '9999').localeCompare(b.starts_on ?? '9999');
        case 'popular':
        default:
          return b.total_learners - a.total_learners;
      }
    });
    return sorted;
  }, [courses, categoryId, query, sort, instructorById]);

  const visible = filtered.slice(0, visibleCount);

  const changeFilter = (apply: () => void) => {
    apply();
    setVisibleCount(PAGE_SIZE);
  };

  return (
    <section id="upcoming" className="scroll-mt-24 py-16 sm:py-20">
      <div className="container-page">
        <SectionHeading
          eyebrow={pick('লাইভ ক্লাস', 'Live classes')}
          title={pick('আসন্ন লাইভ কোর্সসমূহ', 'Upcoming live courses')}
          description={pick(
            'অভিজ্ঞ মেন্টরদের সাথে লাইভ ক্লাস করুন, প্রজেক্ট বানান এবং ক্যারিয়ারের জন্য প্রস্তুত হন।',
            'Learn live with experienced mentors, build projects, and get ready for your career.',
          )}
        />

        <div className="mb-8 flex flex-col gap-4">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
            <div className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:flex-wrap sm:px-0">
              <FilterChip
                active={categoryId === 'all'}
                onClick={() => changeFilter(() => setCategoryId('all'))}
              >
                {pick('সব কোর্স', 'All courses')}
              </FilterChip>
              {categories.map((category) => (
                <FilterChip
                  key={category.id}
                  active={categoryId === category.id}
                  onClick={() => changeFilter(() => setCategoryId(category.id))}
                >
                  {pick(category.name_bn, category.name_en)}
                </FilterChip>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <label className="relative flex-1">
              <span className="sr-only">{pick('কোর্স খুঁজুন', 'Search courses')}</span>
              <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-ink-muted" />
              <input
                type="search"
                value={query}
                onChange={(event) => changeFilter(() => setQuery(event.target.value))}
                placeholder={pick('কোর্স, বিষয় বা মেন্টর খুঁজুন', 'Search by course, topic, or mentor')}
                className="h-12 w-full rounded-xl border border-line bg-white pl-12 pr-4 text-base transition focus:border-primary-700 focus:outline-none focus:ring-4 focus:ring-primary-100"
              />
            </label>
            <label className="flex items-center gap-2 text-sm text-ink-muted">
              <span className="whitespace-nowrap">{pick('সাজান', 'Sort by')}</span>
              <select
                value={sort}
                onChange={(event) => changeFilter(() => setSort(event.target.value as SortKey))}
                className="h-12 flex-1 rounded-xl border border-line bg-white px-3 text-base text-ink focus:border-primary-700 focus:outline-none focus:ring-4 focus:ring-primary-100 sm:flex-none"
              >
                <option value="popular">{pick('জনপ্রিয়', 'Most popular')}</option>
                <option value="rating">{pick('সর্বোচ্চ রেটিং', 'Top rated')}</option>
                <option value="starts">{pick('শীঘ্রই শুরু', 'Starting soon')}</option>
                <option value="price-asc">{pick('মূল্য: কম থেকে বেশি', 'Price: low to high')}</option>
                <option value="price-desc">{pick('মূল্য: বেশি থেকে কম', 'Price: high to low')}</option>
              </select>
            </label>
          </div>
        </div>

        {filtered.length === 0 ? (
          <div className="card flex flex-col items-center gap-2 px-6 py-16 text-center">
            <p className="text-lg font-bold text-ink">
              {pick('কোনো কোর্স পাওয়া যায়নি', 'No courses match your search')}
            </p>
            <p className="text-sm text-ink-muted">
              {pick('অন্য শব্দ দিয়ে খুঁজুন বা ক্যাটাগরি বদলান।', 'Try another keyword or category.')}
            </p>
          </div>
        ) : (
          <>
            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {visible.map((course) => (
                <CourseCard
                  key={course.id}
                  course={course}
                  instructor={instructorById.get(course.instructor_id ?? '')}
                  onViewDetails={onViewDetails}
                  onEnroll={onEnroll}
                />
              ))}
            </div>
            {visibleCount < filtered.length && (
              <div className="mt-10 flex justify-center">
                <Button variant="outline" size="lg" onClick={() => setVisibleCount((n) => n + PAGE_SIZE)}>
                  {pick('আরও কোর্স দেখুন', 'Load more courses')}
                </Button>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}

function FilterChip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`shrink-0 rounded-full border px-4 py-2 text-sm font-medium transition duration-200 hover:-translate-y-0.5 ${
        active
          ? 'border-primary-700 bg-primary-700 text-white shadow-sm'
          : 'border-line bg-white text-ink hover:border-primary-700 hover:text-primary-700'
      }`}
    >
      {children}
    </button>
  );
}
