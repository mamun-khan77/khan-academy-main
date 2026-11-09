export type CourseLevel = 'beginner' | 'intermediate' | 'advanced';
export type CourseFormat = 'live' | 'recorded';
export type LeadKind = 'course_enroll' | 'workshop_registration' | 'corporate_proposal';

export interface Category {
  id: string;
  slug: string;
  name_bn: string;
  name_en: string;
  icon: string;
  sort_order: number;
}

export interface Instructor {
  id: string;
  name_bn: string;
  name_en: string;
  designation_bn: string;
  designation_en: string;
  expertise: string[];
  bio_bn: string;
  bio_en: string;
  avatar_url: string | null;
  sort_order: number;
}

export interface Course {
  id: string;
  slug: string;
  title_bn: string;
  title_en: string;
  subtitle_bn: string;
  subtitle_en: string;
  description_bn: string;
  description_en: string;
  category_id: string | null;
  instructor_id: string | null;
  thumbnail_url: string | null;
  level: CourseLevel;
  format: CourseFormat;
  is_free: boolean;
  is_crash_course: boolean;
  price: number;
  discount_price: number | null;
  offer_ends_at: string | null;
  rating: number;
  total_learners: number;
  batch_number: number;
  seats_available: number;
  starts_on: string | null;
  duration_hours: number;
  is_featured: boolean;
  created_at: string;
}

export interface Workshop {
  id: string;
  title_bn: string;
  title_en: string;
  topic_en: string;
  instructor_id: string | null;
  starts_at: string;
  duration_minutes: number;
  is_live: boolean;
}

export interface Testimonial {
  id: string;
  student_name: string;
  photo_url: string | null;
  course_name_en: string;
  feedback_bn: string;
  feedback_en: string;
  rating: number;
  employment_bn: string;
  employment_en: string;
}

export interface Promotion {
  id: string;
  title_bn: string;
  title_en: string;
  subtitle_bn: string;
  subtitle_en: string;
  cta_label_bn: string;
  cta_label_en: string;
  ends_at: string;
}

export interface SiteStat {
  key: string;
  label_bn: string;
  label_en: string;
  value: number;
  sort_order: number;
}

export interface HomeContent {
  categories: Category[];
  instructors: Instructor[];
  courses: Course[];
  workshops: Workshop[];
  testimonials: Testimonial[];
  promotions: Promotion[];
  stats: SiteStat[];
}
