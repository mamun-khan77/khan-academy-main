/*
# Khan Academy homepage schema

1. Plain-English summary
- Creates the content tables that power the public homepage: course categories, instructors, courses, live workshops, student testimonials, promotional banners, headline statistics, and a single lead-capture table for enrollment interest, workshop registration, and corporate proposal requests.

2. New tables
- `categories`: course categories shown on the homepage (bilingual names, icon key, sort order).
- `instructors`: instructor profiles (bilingual names, designation, bio, avatar).
- `courses`: course catalogue with pricing, discount, offer expiry, batch, seats, rating, level, live/recorded format, free and crash flags, and publish/feature flags.
- `workshops`: free live demo classes and workshops with start time and live status.
- `testimonials`: student feedback cards (marked as demo content in the UI).
- `promotions`: limited-time offer banners with an end time for the countdown.
- `site_stats`: headline numbers shown in the statistics section.
- `leads`: visitor requests (course enrollment interest, workshop registration, corporate proposal). Visitors can only insert rows; they cannot read them.

3. Security
- Row level security is enabled on every table.
- Public content tables are readable by anonymous and signed-in visitors, and only published/active rows are returned.
- `leads` allows INSERT only for anonymous and signed-in visitors, with length and phone-format checks. No SELECT, UPDATE, or DELETE is granted.

4. Notes
- Phone numbers accept Bangladeshi formats (01XXXXXXXXX or +8801XXXXXXXXX).
- Discount percentages are calculated from price and discount price at display time, not stored.
*/

CREATE TABLE IF NOT EXISTS categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text NOT NULL UNIQUE,
  name_bn text NOT NULL,
  name_en text NOT NULL,
  icon text NOT NULL DEFAULT 'BookOpen',
  sort_order int NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS instructors (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name_bn text NOT NULL,
  name_en text NOT NULL,
  designation_bn text NOT NULL,
  designation_en text NOT NULL,
  expertise text[] NOT NULL DEFAULT '{}',
  bio_bn text NOT NULL DEFAULT '',
  bio_en text NOT NULL DEFAULT '',
  avatar_url text,
  is_published boolean NOT NULL DEFAULT true,
  sort_order int NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS courses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text NOT NULL UNIQUE,
  title_bn text NOT NULL,
  title_en text NOT NULL,
  subtitle_bn text NOT NULL DEFAULT '',
  subtitle_en text NOT NULL DEFAULT '',
  description_bn text NOT NULL DEFAULT '',
  description_en text NOT NULL DEFAULT '',
  category_id uuid REFERENCES categories(id) ON DELETE SET NULL,
  instructor_id uuid REFERENCES instructors(id) ON DELETE SET NULL,
  thumbnail_url text,
  level text NOT NULL DEFAULT 'beginner' CHECK (level IN ('beginner', 'intermediate', 'advanced')),
  format text NOT NULL DEFAULT 'live' CHECK (format IN ('live', 'recorded')),
  is_free boolean NOT NULL DEFAULT false,
  is_crash_course boolean NOT NULL DEFAULT false,
  price numeric(10, 2) NOT NULL DEFAULT 0 CHECK (price >= 0),
  discount_price numeric(10, 2) CHECK (discount_price IS NULL OR discount_price >= 0),
  offer_ends_at timestamptz,
  rating numeric(2, 1) NOT NULL DEFAULT 0 CHECK (rating >= 0 AND rating <= 5),
  total_learners int NOT NULL DEFAULT 0 CHECK (total_learners >= 0),
  batch_number int NOT NULL DEFAULT 1 CHECK (batch_number >= 1),
  seats_available int NOT NULL DEFAULT 0 CHECK (seats_available >= 0),
  starts_on date,
  duration_hours int NOT NULL DEFAULT 0 CHECK (duration_hours >= 0),
  is_published boolean NOT NULL DEFAULT true,
  is_featured boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS courses_category_idx ON courses (category_id);
CREATE INDEX IF NOT EXISTS courses_instructor_idx ON courses (instructor_id);
CREATE INDEX IF NOT EXISTS courses_created_at_idx ON courses (created_at DESC);

CREATE TABLE IF NOT EXISTS workshops (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title_bn text NOT NULL,
  title_en text NOT NULL,
  topic_en text NOT NULL DEFAULT '',
  instructor_id uuid REFERENCES instructors(id) ON DELETE SET NULL,
  starts_at timestamptz NOT NULL,
  duration_minutes int NOT NULL DEFAULT 60 CHECK (duration_minutes > 0),
  is_live boolean NOT NULL DEFAULT false,
  is_published boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS workshops_starts_at_idx ON workshops (starts_at);

CREATE TABLE IF NOT EXISTS testimonials (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  student_name text NOT NULL,
  photo_url text,
  course_name_en text NOT NULL,
  feedback_bn text NOT NULL,
  feedback_en text NOT NULL,
  rating int NOT NULL CHECK (rating BETWEEN 1 AND 5),
  employment_bn text NOT NULL DEFAULT '',
  employment_en text NOT NULL DEFAULT '',
  is_published boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS promotions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title_bn text NOT NULL,
  title_en text NOT NULL,
  subtitle_bn text NOT NULL DEFAULT '',
  subtitle_en text NOT NULL DEFAULT '',
  cta_label_bn text NOT NULL DEFAULT 'এখনই কিনুন',
  cta_label_en text NOT NULL DEFAULT 'Grab the offer',
  ends_at timestamptz NOT NULL,
  is_active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS site_stats (
  key text PRIMARY KEY,
  label_bn text NOT NULL,
  label_en text NOT NULL,
  value int NOT NULL DEFAULT 0 CHECK (value >= 0),
  sort_order int NOT NULL DEFAULT 0
);

CREATE TABLE IF NOT EXISTS leads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  kind text NOT NULL CHECK (kind IN ('course_enroll', 'workshop_registration', 'corporate_proposal')),
  course_id uuid REFERENCES courses(id) ON DELETE SET NULL,
  workshop_id uuid REFERENCES workshops(id) ON DELETE SET NULL,
  name text NOT NULL CHECK (char_length(name) BETWEEN 2 AND 120),
  phone text NOT NULL CHECK (phone ~ '^(\+?880|0)1[3-9][0-9]{8}$'),
  email text CHECK (email IS NULL OR char_length(email) <= 254),
  company text CHECK (company IS NULL OR char_length(company) <= 160),
  team_size int CHECK (team_size IS NULL OR team_size BETWEEN 1 AND 100000),
  message text CHECK (message IS NULL OR char_length(message) <= 2000),
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE instructors ENABLE ROW LEVEL SECURITY;
ALTER TABLE courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE workshops ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE promotions ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_stats ENABLE ROW LEVEL SECURITY;
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;

GRANT SELECT ON categories, instructors, courses, workshops, testimonials, promotions, site_stats TO anon, authenticated;
GRANT INSERT ON leads TO anon, authenticated;

DROP POLICY IF EXISTS "public_read_categories" ON categories;
CREATE POLICY "public_read_categories" ON categories FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "public_read_published_instructors" ON instructors;
CREATE POLICY "public_read_published_instructors" ON instructors FOR SELECT
  TO anon, authenticated USING (is_published);

DROP POLICY IF EXISTS "public_read_published_courses" ON courses;
CREATE POLICY "public_read_published_courses" ON courses FOR SELECT
  TO anon, authenticated USING (is_published);

DROP POLICY IF EXISTS "public_read_published_workshops" ON workshops;
CREATE POLICY "public_read_published_workshops" ON workshops FOR SELECT
  TO anon, authenticated USING (is_published);

DROP POLICY IF EXISTS "public_read_published_testimonials" ON testimonials;
CREATE POLICY "public_read_published_testimonials" ON testimonials FOR SELECT
  TO anon, authenticated USING (is_published);

DROP POLICY IF EXISTS "public_read_active_promotions" ON promotions;
CREATE POLICY "public_read_active_promotions" ON promotions FOR SELECT
  TO anon, authenticated USING (is_active);

DROP POLICY IF EXISTS "public_read_site_stats" ON site_stats;
CREATE POLICY "public_read_site_stats" ON site_stats FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "public_insert_leads" ON leads;
CREATE POLICY "public_insert_leads" ON leads FOR INSERT
  TO anon, authenticated WITH CHECK (true);
