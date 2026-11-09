import { ArrowRight } from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';
import { formatCount } from '@/lib/format';
import type { Category } from '@/types/content';
import { CategoryIcon } from '@/components/home/CategoryIcon';

interface CategoryGridProps {
  categories: Category[];
  courseCounts: Map<string, number>;
}

export function CategoryGrid({ categories, courseCounts }: CategoryGridProps) {
  const { lang, pick } = useLanguage();
  return (
    <section id="categories" className="scroll-mt-24 py-16 sm:py-20">
      <div className="container-page">
        <div className="mb-10 max-w-2xl">
          <p className="mb-2 text-sm font-medium uppercase tracking-wide text-primary-700">
            {pick('ক্যাটাগরি', 'Categories')}
          </p>
          <h2 className="section-title">{pick('আপনার পছন্দের ক্ষেত্র বেছে নিন', 'Choose your field')}</h2>
        </div>
        <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
          {categories.map((category) => {
            const count = courseCounts.get(category.id) ?? 0;
            return (
              <a
                key={category.id}
                href="#upcoming"
                className="card group flex flex-col gap-4 p-5 hover:-translate-y-1 hover:border-primary-100 hover:shadow-lift sm:p-6"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-50 text-primary-700 transition duration-300 group-hover:scale-110 group-hover:bg-primary-700 group-hover:text-white">
                  <CategoryIcon name={category.icon} className="h-6 w-6" />
                </span>
                <div className="flex flex-col gap-1">
                  <h3 className="text-base font-bold leading-tight text-ink sm:text-lg">
                    {pick(category.name_bn, category.name_en)}
                  </h3>
                  <p className="text-sm text-ink-muted">
                    {pick(`${formatCount(count, lang)}টি কোর্স`, `${formatCount(count, lang)} courses`)}
                  </p>
                </div>
                <span className="mt-auto inline-flex items-center gap-1 text-sm font-medium text-primary-700 transition group-hover:gap-2">
                  {pick('এক্সপ্লোর করুন', 'Explore')}
                  <ArrowRight className="h-4 w-4" />
                </span>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
