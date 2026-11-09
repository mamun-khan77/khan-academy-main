import { useEffect, useMemo, useRef, useState } from 'react';
import { ChevronDown, GraduationCap, Globe, Menu, Search, X } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { useLanguage } from '@/hooks/useLanguage';
import { formatTaka } from '@/lib/format';
import type { Category, Course } from '@/types/content';

interface NavbarProps {
  courses: Course[];
  categories: Category[];
  onSelectCourse: (course: Course) => void;
}

export function Navbar({ courses, categories, onSelectCourse }: NavbarProps) {
  const { lang, setLang, pick } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [categoryOpen, setCategoryOpen] = useState(false);
  const [query, setQuery] = useState('');
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const onPointerDown = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setQuery('');
      }
    };
    document.addEventListener('mousedown', onPointerDown);
    return () => document.removeEventListener('mousedown', onPointerDown);
  }, []);

  const suggestions = useMemo(() => {
    const needle = query.trim().toLowerCase();
    if (!needle) return [];
    return courses
      .filter((course) =>
        [course.title_en, course.title_bn, course.subtitle_en].join(' ').toLowerCase().includes(needle),
      )
      .slice(0, 6);
  }, [courses, query]);

  const pickSuggestion = (course: Course) => {
    setQuery('');
    setMenuOpen(false);
    onSelectCourse(course);
  };

  const links = [
    { href: '#upcoming', label: pick('আসন্ন কোর্স', 'Upcoming Courses') },
    { href: '#free-recorded', label: pick('ফ্রি কোর্স', 'Free Courses') },
    { href: '#workshops', label: pick('ওয়ার্কশপ', 'Workshops') },
    { href: '#why-us', label: pick('ক্যারিয়ার রিসোর্স', 'Career Resources') },
    { href: '#download', label: pick('ডাউনলোড', 'Downloads') },
  ];

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'border-b border-line bg-white/95 shadow-card backdrop-blur-md'
          : 'bg-white/80 backdrop-blur-sm'
      }`}
    >
      <div className="container-page flex h-16 items-center justify-between gap-4">
        <a href="#top" className="flex shrink-0 items-center gap-2" aria-label="Khan Academy home">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary-700 text-white">
            <GraduationCap className="h-5 w-5" />
          </span>
          <span className="text-lg font-bold tracking-tight text-ink">
            Khan<span className="text-primary-700">Academy</span>
          </span>
        </a>

        <div ref={searchRef} className="relative hidden flex-1 max-w-md xl:block">
          <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-muted" />
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={pick('কোর্স খুঁজুন...', 'Search courses...')}
            aria-label={pick('কোর্স খুঁজুন', 'Search courses')}
            className="h-10 w-full rounded-full border border-line bg-canvas pl-10 pr-4 text-sm transition focus:border-primary-700 focus:bg-white focus:outline-none focus:ring-4 focus:ring-primary-100"
          />
          {suggestions.length > 0 && (
            <ul className="animate-dialog-in absolute left-0 right-0 top-12 overflow-hidden rounded-2xl border border-line bg-white shadow-lift">
              {suggestions.map((course) => (
                <li key={course.id}>
                  <button
                    type="button"
                    onClick={() => pickSuggestion(course)}
                    className="flex w-full items-center justify-between gap-3 px-4 py-3 text-left transition hover:bg-primary-50"
                  >
                    <span className="truncate text-sm font-medium text-ink">
                      {pick(course.title_bn, course.title_en)}
                    </span>
                    <span className="shrink-0 text-xs text-ink-muted">
                      {course.is_free ? pick('ফ্রি', 'Free') : formatTaka(course.discount_price ?? course.price, lang)}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Main">
          <div
            className="relative"
            onMouseEnter={() => setCategoryOpen(true)}
            onMouseLeave={() => setCategoryOpen(false)}
          >
            <button
              type="button"
              aria-expanded={categoryOpen}
              onClick={() => setCategoryOpen((open) => !open)}
              className="flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium text-ink transition hover:bg-primary-50 hover:text-primary-700"
            >
              {pick('ক্যাটাগরি', 'Categories')}
              <ChevronDown
                className={`h-4 w-4 transition-transform duration-200 ${categoryOpen ? 'rotate-180' : ''}`}
              />
            </button>
            {categoryOpen && (
              <div className="animate-dialog-in absolute left-1/2 top-full z-10 w-[36rem] -translate-x-1/2 pt-3">
                <div className="grid grid-cols-2 gap-1 rounded-2xl border border-line bg-white p-3 shadow-lift">
                  {categories.map((category) => (
                    <a
                      key={category.id}
                      href="#categories"
                      onClick={() => setCategoryOpen(false)}
                      className="rounded-xl px-3 py-2.5 text-sm font-medium text-ink transition hover:bg-primary-50 hover:text-primary-700"
                    >
                      {pick(category.name_bn, category.name_en)}
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="rounded-lg px-3 py-2 text-sm font-medium text-ink transition hover:bg-primary-50 hover:text-primary-700"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setLang(lang === 'bn' ? 'en' : 'bn')}
            aria-label={pick('Switch to English', 'বাংলায় দেখুন')}
            className="flex h-9 items-center gap-1.5 rounded-full border border-line bg-white px-3 text-sm font-medium text-ink transition hover:border-primary-700 hover:text-primary-700"
          >
            <Globe className="h-4 w-4" />
            {lang === 'bn' ? 'English' : 'বাংলা'}
          </button>
          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-label={pick('মেনু খুলুন', 'Open menu')}
            aria-expanded={menuOpen}
            className="rounded-lg p-2 text-ink transition hover:bg-primary-50 lg:hidden"
          >
            {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="animate-dialog-in border-t border-line bg-white px-4 pb-6 pt-4 lg:hidden">
          <div className="relative mb-4">
            <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-muted" />
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder={pick('কোর্স খুঁজুন...', 'Search courses...')}
              aria-label={pick('কোর্স খুঁজুন', 'Search courses')}
              className="h-11 w-full rounded-xl border border-line bg-canvas pl-10 pr-4 text-base focus:border-primary-700 focus:outline-none focus:ring-4 focus:ring-primary-100"
            />
            {suggestions.length > 0 && (
              <ul className="mt-2 overflow-hidden rounded-xl border border-line bg-white">
                {suggestions.map((course) => (
                  <li key={course.id}>
                    <button
                      type="button"
                      onClick={() => pickSuggestion(course)}
                      className="w-full px-4 py-3 text-left text-sm font-medium text-ink hover:bg-primary-50"
                    >
                      {pick(course.title_bn, course.title_en)}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div className="flex flex-col">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="rounded-lg px-3 py-3 text-base font-medium text-ink hover:bg-primary-50 hover:text-primary-700"
              >
                {link.label}
              </a>
            ))}
          </div>
          <Button variant="primary" className="mt-4 w-full" onClick={() => setMenuOpen(false)}>
            {pick('শেখা শুরু করুন', 'Start learning')}
          </Button>
        </div>
      )}
    </header>
  );
}
