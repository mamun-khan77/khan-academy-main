import { supabase } from '@/lib/supabase';
import type {
  Category,
  Course,
  HomeContent,
  Instructor,
  Promotion,
  SiteStat,
  Testimonial,
  Workshop,
} from '@/types/content';

interface QueryResult {
  data: unknown[] | null;
  error: { message: string } | null;
}

function rowsOf<T>(result: QueryResult, table: string): T[] {
  if (result.error) {
    throw new Error(`Failed to load ${table}: ${result.error.message}`);
  }
  return (result.data ?? []) as T[];
}

export async function fetchHomeContent(): Promise<HomeContent> {
  const nowIso = new Date().toISOString();

  const [categories, instructors, courses, workshops, testimonials, promotions, stats] =
    await Promise.all([
      supabase.from('categories').select('*').order('sort_order'),
      supabase.from('instructors').select('*').order('sort_order'),
      supabase.from('courses').select('*').order('created_at', { ascending: false }),
      supabase.from('workshops').select('*').order('starts_at'),
      supabase.from('testimonials').select('*').order('created_at', { ascending: false }),
      supabase.from('promotions').select('*').gt('ends_at', nowIso).order('ends_at').limit(1),
      supabase.from('site_stats').select('*').order('sort_order'),
    ]);

  return {
    categories: rowsOf<Category>(categories, 'categories'),
    instructors: rowsOf<Instructor>(instructors, 'instructors'),
    courses: rowsOf<Course>(courses, 'courses'),
    workshops: rowsOf<Workshop>(workshops, 'workshops'),
    testimonials: rowsOf<Testimonial>(testimonials, 'testimonials'),
    promotions: rowsOf<Promotion>(promotions, 'promotions'),
    stats: rowsOf<SiteStat>(stats, 'site_stats'),
  };
}
