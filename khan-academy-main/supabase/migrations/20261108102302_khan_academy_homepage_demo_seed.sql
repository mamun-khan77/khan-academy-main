/*
# Demo seed data for the Khan Academy homepage

1. Plain-English summary
- Fills the homepage with realistic sample content so every section has something to show: 8 categories, 6 instructors, 12 courses, 5 workshops, 10 testimonials, 1 promotion, and 4 headline statistics.

2. Important
- All instructors, testimonials, and statistics are DEMO data and are labelled as such on the website. Replace them from the admin area before launch.
- The seed runs only when the categories table is empty, so re-running the migration never duplicates content.

3. Security
- No security or access changes. Only content rows are inserted.
*/

DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM categories) THEN

    INSERT INTO categories (slug, name_bn, name_en, icon, sort_order) VALUES
      ('ai', 'আর্টিফিশিয়াল ইন্টেলিজেন্স', 'Artificial Intelligence', 'Brain', 1),
      ('web-app', 'ওয়েব ও অ্যাপ ডেভেলপমেন্ট', 'Web & App Development', 'Code2', 2),
      ('data-science', 'ডেটা সায়েন্স ও অ্যানালিটিক্স', 'Data Science & Analytics', 'BarChart3', 3),
      ('cyber-security', 'সাইবার সিকিউরিটি ও নেটওয়ার্কিং', 'Cyber Security & Networking', 'ShieldCheck', 4),
      ('ui-ux', 'UI/UX ডিজাইন', 'UI/UX Design', 'PenTool', 5),
      ('digital-marketing', 'ডিজিটাল মার্কেটিং', 'Digital Marketing', 'Megaphone', 6),
      ('business', 'বিজনেস ও এন্ট্রেপ্রেনিউরশিপ', 'Business & Entrepreneurship', 'Briefcase', 7),
      ('programming', 'প্রোগ্রামিং ও সফটওয়্যার ইঞ্জিনিয়ারিং', 'Programming & Software Engineering', 'Terminal', 8);

    INSERT INTO instructors (name_bn, name_en, designation_bn, designation_en, expertise, bio_bn, bio_en, avatar_url, sort_order) VALUES
      ('রাহাত হোসেন', 'Rahat Hossain', 'সিনিয়র মেশিন লার্নিং ইঞ্জিনিয়ার', 'Senior Machine Learning Engineer', ARRAY['Machine Learning', 'Generative AI'],
        'দশ বছরের বেশি সময় ধরে এআই সিস্টেম তৈরি করছেন। প্রোডাকশন-গ্রেড মডেল নিয়ে কাজ করার অভিজ্ঞতা শেয়ার করেন।',
        'Builds production AI systems for over a decade and teaches students to ship models that work in the real world.',
        'https://images.pexels.com/photos/7752811/pexels-photo-7752811.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', 1),
      ('নুসরাত জাহান', 'Nusrat Jahan', 'ফুল-স্ট্যাক ওয়েব ডেভেলপার', 'Full-Stack Web Developer', ARRAY['React', 'Django', 'PostgreSQL'],
        'স্টার্টআপ ও এন্টারপ্রাইজ প্রজেক্টে ফুল-স্ট্যাক ডেভেলপার হিসেবে কাজ করেছেন। ছাত্রদের প্রথম দিন থেকেই প্রজেক্ট বানাতে শেখান।',
        'Full-stack engineer who has shipped products for startups and enterprises. Focuses on project-based learning from day one.',
        'https://images.pexels.com/photos/16160809/pexels-photo-16160809.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', 2),
      ('তানভীর আহমেদ', 'Tanvir Ahmed', 'সিনিয়র ডেটা সায়েন্টিস্ট', 'Senior Data Scientist', ARRAY['Python', 'Statistics', 'Power BI'],
        'ই-কমার্স ও ফিনটেক প্রতিষ্ঠানে ডেটা দিয়ে ব্যবসায়িক সিদ্ধান্ত নেওয়ার কাজে অভিজ্ঞ।',
        'Turns messy business data into clear decisions. Experienced across e-commerce and fintech teams.',
        'https://images.pexels.com/photos/14950779/pexels-photo-14950779.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', 3),
      ('ফারহানা আক্তার', 'Farhana Akter', 'সাইবার সিকিউরিটি স্পেশালিস্ট', 'Cyber Security Specialist', ARRAY['Ethical Hacking', 'Network Security'],
        'সার্টিফায়েড এথিক্যাল হ্যাকার। ব্যাংক ও টেলিকম খাতে নিরাপত্তা অডিটের অভিজ্ঞতা রয়েছে।',
        'Certified ethical hacker with security audit experience in banking and telecom.',
        'https://images.pexels.com/photos/6497114/pexels-photo-6497114.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', 4),
      ('ইমরান চৌধুরী', 'Imran Chowdhury', 'প্রোডাক্ট ডিজাইনার', 'Product Designer & UX Researcher', ARRAY['UI Design', 'Figma', 'User Research'],
        'মোবাইল ব্যাংকিং ও ই-লার্নিং অ্যাপের ডিজাইন টিমে কাজ করেছেন। ব্যবহারকারী-কেন্দ্রিক ডিজাইন শেখান।',
        'Designs mobile banking and e-learning products with a strong focus on user research.',
        'https://images.pexels.com/photos/804009/pexels-photo-804009.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', 5),
      ('সাদিয়া রহমান', 'Sadia Rahman', 'ডিজিটাল মার্কেটিং স্ট্র্যাটেজিস্ট', 'Digital Marketing Strategist', ARRAY['Meta Ads', 'SEO', 'Growth'],
        'বাংলাদেশের বিভিন্ন ব্র্যান্ডের ডিজিটাল মার্কেটিং ক্যাম্পেইন পরিচালনা করেছেন।',
        'Runs paid and organic growth campaigns for consumer brands across Bangladesh.',
        'https://images.pexels.com/photos/10850674/pexels-photo-10850674.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', 6);

    INSERT INTO courses (slug, title_bn, title_en, subtitle_bn, subtitle_en, description_bn, description_en, category_id, instructor_id, thumbnail_url, level, format, is_free, is_crash_course, price, discount_price, offer_ends_at, rating, total_learners, batch_number, seats_available, starts_on, duration_hours, is_featured) VALUES
      ('generative-ai-prompt-engineering', 'জেনারেটিভ এআই ও প্রম্পট ইঞ্জিনিয়ারিং', 'Generative AI & Prompt Engineering',
        'ChatGPT ও অন্যান্য এআই টুল দিয়ে কাজ দ্রুত করুন', 'Use ChatGPT and modern AI tools to work faster',
        'প্রম্পট লেখা থেকে শুরু করে এআই দিয়ে কনটেন্ট, কোড ও গবেষণার কাজ সহজ করার পূর্ণাঙ্গ কোর্স।',
        'A complete course from prompt writing to using AI for content, code, and research.',
        (SELECT id FROM categories WHERE slug = 'ai'), (SELECT id FROM instructors WHERE name_en = 'Rahat Hossain'),
        'https://images.pexels.com/photos/2599244/pexels-photo-2599244.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
        'beginner', 'live', false, false, 6000, 3500, now() + interval '3 days', 4.8, 2400, 12, 18, current_date + 7, 24, true),
      ('machine-learning-foundations', 'মেশিন লার্নিং ফাউন্ডেশন', 'Machine Learning Foundations',
        'প্রথম মেশিন লার্নিং মডেল নিজে বানান', 'Build your first machine learning models',
        'রিগ্রেশন, ক্লাসিফিকেশন ও মডেল মূল্যায়নের বাস্তব প্রজেক্টসহ কোর্স।',
        'Regression, classification, and model evaluation with hands-on projects.',
        (SELECT id FROM categories WHERE slug = 'ai'), (SELECT id FROM instructors WHERE name_en = 'Rahat Hossain'),
        'https://images.pexels.com/photos/8566470/pexels-photo-8566470.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
        'intermediate', 'live', false, false, 12000, 8500, null, 4.7, 1800, 4, 9, current_date + 14, 40, false),
      ('full-stack-web-development', 'ফুল-স্ট্যাক ওয়েব ডেভেলপমেন্ট', 'Full-Stack Web Development',
        'শূন্য থেকে পূর্ণাঙ্গ ওয়েব অ্যাপ বানানো শিখুন', 'Go from zero to a complete web application',
        'HTML, React এবং Django দিয়ে ডেটাবেসসহ একটি প্রোডাকশন-রেডি ওয়েব অ্যাপ তৈরি।',
        'Build a production-ready web app with HTML, React, Django, and a real database.',
        (SELECT id FROM categories WHERE slug = 'web-app'), (SELECT id FROM instructors WHERE name_en = 'Nusrat Jahan'),
        'https://images.pexels.com/photos/574071/pexels-photo-574071.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
        'beginner', 'live', false, false, 15000, 9900, now() + interval '5 days', 4.9, 3200, 7, 22, current_date + 3, 60, true),
      ('mobile-app-react-native', 'React Native দিয়ে মোবাইল অ্যাপ', 'Mobile App Development with React Native',
        'একই কোডে Android ও iOS অ্যাপ', 'One codebase for both Android and iOS apps',
        'রিয়েল-ওয়ার্ল্ড মোবাইল অ্যাপ বানিয়ে Play Store ও App Store-এ প্রকাশের প্রক্রিয়া।',
        'Build real mobile apps and learn how to publish them to Play Store and App Store.',
        (SELECT id FROM categories WHERE slug = 'web-app'), (SELECT id FROM instructors WHERE name_en = 'Nusrat Jahan'),
        'https://images.pexels.com/photos/574077/pexels-photo-574077.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
        'intermediate', 'recorded', false, false, 12000, 9000, null, 4.6, 960, 2, 0, null, 36, false),
      ('data-analysis-with-python', 'Python দিয়ে ডেটা অ্যানালাইসিস', 'Data Analysis with Python',
        'Excel থেকে Python-এ যান, ডেটা থেকে সিদ্ধান্ত নিন', 'Move from Excel to Python and make data-driven decisions',
        'Pandas, NumPy ও চার্ট দিয়ে বাস্তব ব্যবসায়িক ডেটা বিশ্লেষণ।',
        'Analyse real business data with Pandas, NumPy, and charts.',
        (SELECT id FROM categories WHERE slug = 'data-science'), (SELECT id FROM instructors WHERE name_en = 'Tanvir Ahmed'),
        'https://images.pexels.com/photos/4604639/pexels-photo-4604639.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
        'beginner', 'live', false, false, 8000, 5500, null, 4.7, 2100, 9, 15, current_date + 10, 30, true),
      ('power-bi-data-visualization', 'Power BI ও ডেটা ভিজ্যুয়ালাইজেশন', 'Power BI & Data Visualization',
        'ড্যাশবোর্ড বানিয়ে ম্যানেজমেন্টকে রিপোর্ট দিন', 'Build dashboards that management actually uses',
        'Power BI দিয়ে ইন্টারেক্টিভ ড্যাশবোর্ড তৈরির রেকর্ডেড কোর্স।',
        'A recorded course on building interactive dashboards with Power BI.',
        (SELECT id FROM categories WHERE slug = 'data-science'), (SELECT id FROM instructors WHERE name_en = 'Tanvir Ahmed'),
        'https://images.pexels.com/photos/3861957/pexels-photo-3861957.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
        'beginner', 'recorded', false, true, 4000, 2500, null, 4.5, 1450, 1, 0, null, 12, false),
      ('ethical-hacking-network-security', 'এথিক্যাল হ্যাকিং ও নেটওয়ার্ক সিকিউরিটি', 'Ethical Hacking & Network Security',
        'আক্রমণ বুঝে প্রতিরোধ গড়ে তুলুন', 'Understand attacks and build defences',
        'বৈধ পেনেট্রেশন টেস্টিংয়ের মাধ্যমে নেটওয়ার্ক ও ওয়েব নিরাপত্তা দুর্বলতা খুঁজে বের করা।',
        'Find network and web weaknesses through authorised penetration testing.',
        (SELECT id FROM categories WHERE slug = 'cyber-security'), (SELECT id FROM instructors WHERE name_en = 'Farhana Akter'),
        'https://images.pexels.com/photos/6466141/pexels-photo-6466141.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
        'advanced', 'live', false, false, 14000, 10500, now() + interval '2 days', 4.8, 1200, 3, 6, current_date + 21, 48, true),
      ('ui-ux-design-fundamentals', 'UI/UX ডিজাইন ফান্ডামেন্টালস', 'UI/UX Design Fundamentals',
        'Figma দিয়ে ব্যবহারযোগ্য অ্যাপ ডিজাইন করুন', 'Design usable apps in Figma',
        'ইউজার রিসার্চ, ওয়্যারফ্রেম ও প্রোটোটাইপিংয়ের হাতে-কলমে কোর্স।',
        'Hands-on user research, wireframing, and prototyping.',
        (SELECT id FROM categories WHERE slug = 'ui-ux'), (SELECT id FROM instructors WHERE name_en = 'Imran Chowdhury'),
        'https://images.pexels.com/photos/196645/pexels-photo-196645.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
        'beginner', 'live', false, false, 7000, 4900, null, 4.8, 2750, 5, 11, current_date + 5, 28, false),
      ('digital-marketing-masterclass', 'ডিজিটাল মার্কেটিং মাস্টারক্লাস', 'Digital Marketing Masterclass',
        'Facebook ও Google বিজ্ঞাপনে ROI বাড়ান', 'Grow ROI with Facebook and Google ads',
        'SEO, সোশ্যাল মিডিয়া এবং পেইড অ্যাডস ক্যাম্পেইনের সম্পূর্ণ প্রক্রিয়া।',
        'The full process for SEO, social media, and paid ad campaigns.',
        (SELECT id FROM categories WHERE slug = 'digital-marketing'), (SELECT id FROM instructors WHERE name_en = 'Sadia Rahman'),
        'https://images.pexels.com/photos/15635241/pexels-photo-15635241.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
        'beginner', 'live', false, false, 9000, 6500, now() + interval '4 days', 4.6, 3900, 8, 14, current_date + 9, 32, false),
      ('freelancing-online-business', 'ফ্রিল্যান্সিং ও অনলাইন ব্যবসা', 'Freelancing & Online Business',
        'প্রথম ক্লায়েন্ট থেকে নিয়মিত আয় পর্যন্ত', 'From your first client to steady income',
        'ফ্রিল্যান্স প্রোফাইল, প্রপোজাল ও পেমেন্ট সংগ্রহের ব্যবহারিক ক্র্যাশ কোর্স।',
        'A practical crash course on freelance profiles, proposals, and getting paid.',
        (SELECT id FROM categories WHERE slug = 'business'), (SELECT id FROM instructors WHERE name_en = 'Sadia Rahman'),
        'https://images.pexels.com/photos/7964413/pexels-photo-7964413.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
        'beginner', 'recorded', false, true, 3000, 1500, null, 4.4, 2600, 1, 0, null, 6, false),
      ('python-programming-crash-course', 'Python প্রোগ্রামিং ক্র্যাশ কোর্স', 'Python Programming Crash Course',
        'একদম শূন্য থেকে Python শিখুন বিনামূল্যে', 'Learn Python from absolute zero, free',
        'ভেরিয়েবল, লুপ, ফাংশন ও ছোট ছোট প্রজেক্টের মাধ্যমে Python-এর মূল ধারণা।',
        'Variables, loops, functions, and small projects to learn the core of Python.',
        (SELECT id FROM categories WHERE slug = 'programming'), (SELECT id FROM instructors WHERE name_en = 'Nusrat Jahan'),
        'https://images.pexels.com/photos/7988113/pexels-photo-7988113.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
        'beginner', 'recorded', true, true, 0, null, null, 4.7, 8400, 1, 0, null, 8, false),
      ('dsa-cpp-interview-prep', 'ডেটা স্ট্রাকচার ও অ্যালগরিদম (C++)', 'Data Structures & Algorithms in C++',
        'ইন্টারভিউয়ের জন্য কোডিং প্রস্তুতি', 'Coding interview preparation',
        'Array, Linked List, Tree, Graph এবং সমস্যা সমাধানের কৌশল।',
        'Arrays, linked lists, trees, graphs, and problem-solving strategies.',
        (SELECT id FROM categories WHERE slug = 'programming'), (SELECT id FROM instructors WHERE name_en = 'Tanvir Ahmed'),
        'https://images.pexels.com/photos/36706459/pexels-photo-36706459.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
        'intermediate', 'live', false, false, 11000, 7999, null, 4.7, 1900, 2, 12, current_date + 12, 45, false);

    INSERT INTO workshops (title_bn, title_en, topic_en, instructor_id, starts_at, duration_minutes, is_live) VALUES
      ('লাইভ ডেমো: এআই দিয়ে প্রোডাক্টিভিটি', 'Live demo: AI for productivity', 'Using AI tools to plan and finish work faster',
        (SELECT id FROM instructors WHERE name_en = 'Rahat Hossain'), now() - interval '20 minutes', 60, true),
      ('ফ্রি ওয়ার্কশপ: প্রথম ওয়েবসাইট', 'Free workshop: Your first website', 'Build and publish a simple landing page',
        (SELECT id FROM instructors WHERE name_en = 'Nusrat Jahan'), now() + interval '2 days', 90, false),
      ('ডেটা ডেমো ক্লাস: Excel থেকে Python', 'Data demo class: From Excel to Python', 'See how a spreadsheet task becomes a 3-line script',
        (SELECT id FROM instructors WHERE name_en = 'Tanvir Ahmed'), now() + interval '4 days', 60, false),
      ('সাইবার সিকিউরিটি বেসিকস ওয়েবিনার', 'Cyber security basics webinar', 'Passwords, phishing, and protecting your accounts',
        (SELECT id FROM instructors WHERE name_en = 'Farhana Akter'), now() + interval '6 days', 60, false),
      ('ডিজাইন রিভিউ সেশন', 'Design review session', 'Get live feedback on your app screens',
        (SELECT id FROM instructors WHERE name_en = 'Imran Chowdhury'), now() + interval '8 days', 75, false);

    INSERT INTO testimonials (student_name, photo_url, course_name_en, feedback_bn, feedback_en, rating, employment_bn, employment_en) VALUES
      ('সুমাইয়া ইসলাম', 'https://images.pexels.com/photos/17265129/pexels-photo-17265129.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', 'Full-Stack Web Development',
        'প্রজেক্ট-ভিত্তিক শেখার কারণে প্রথম মাসেই নিজের পোর্টফোলিও তৈরি করতে পেরেছি।', 'Project-based learning got me a working portfolio within the first month.', 5,
        'ফ্রন্ট-এন্ড ডেভেলপার', 'Front-end Developer'),
      ('আরিফ হাসান', 'https://images.pexels.com/photos/12414845/pexels-photo-12414845.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', 'Generative AI & Prompt Engineering',
        'এআই টুল ব্যবহার করে আমার কনটেন্ট লেখার সময় অর্ধেক হয়ে গেছে।', 'AI tools cut my content writing time in half.', 5,
        'ফ্রিল্যান্স কনটেন্ট স্ট্র্যাটেজিস্ট', 'Freelance Content Strategist'),
      ('নাফিসা তাবাসসুম', 'https://images.pexels.com/photos/6682476/pexels-photo-6682476.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', 'Data Analysis with Python',
        'মেন্টররা প্রতিটি ধাপে সাহায্য করেছেন। এখন আমি আমার অফিসে রিপোর্ট অটোমেট করছি।', 'Mentors helped at every step. I now automate reports at my office.', 5,
        'ডেটা অ্যানালিস্ট', 'Data Analyst'),
      ('মেহেদী হাসান', 'https://images.pexels.com/photos/7752805/pexels-photo-7752805.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', 'Ethical Hacking & Network Security',
        'ল্যাবে করা প্র্যাকটিক্যাল চ্যালেঞ্জগুলো ইন্টারভিউয়ে সবচেয়ে বেশি কাজে এসেছে।', 'The practical labs were the most useful part during my job interviews.', 4,
        'জুনিয়র সিকিউরিটি অ্যানালিস্ট', 'Junior Security Analyst'),
      ('তাসনিম ফারজানা', 'https://images.pexels.com/photos/26871122/pexels-photo-26871122.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', 'UI/UX Design Fundamentals',
        'ইউজার রিসার্চের অংশটি সবচেয়ে ভালো লেগেছে। এখন আমি একটি ফিনটেক অ্যাপে কাজ করছি।', 'The user research module was my favourite. I now work on a fintech app.', 5,
        'UI ডিজাইনার', 'UI Designer'),
      ('রাকিব উদ্দিন', 'https://images.pexels.com/photos/804009/pexels-photo-804009.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', 'Digital Marketing Masterclass',
        'ক্যাম্পেইনের ROI দেখার পদ্ধতি শিখে আমার ছোট ব্যবসার বিজ্ঞাপন খরচ কমেছে।', 'Learning how to read campaign ROI cut my small business ad spend.', 4,
        'মার্কেটিং এক্সিকিউটিভ', 'Marketing Executive'),
      ('ফাতেমা বেগম', 'https://images.pexels.com/photos/26871123/pexels-photo-26871123.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', 'Freelancing & Online Business',
        'প্রথম ক্লায়েন্ট পেতে ছয় সপ্তাহ লেগেছে। প্রোফাইল ও প্রপোজালের টেমপ্লেট সবচেয়ে কাজে এসেছে।', 'It took me six weeks to land my first client. The proposal templates helped most.', 4,
        'ফ্রিল্যান্স ভার্চুয়াল অ্যাসিস্ট্যান্ট', 'Freelance Virtual Assistant'),
      ('সাজিদ করিম', 'https://images.pexels.com/photos/7752811/pexels-photo-7752811.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', 'Machine Learning Foundations',
        'গাণিতিক ধারণাগুলো সহজভাবে বোঝানো হয়েছে। প্রথম মডেলটি এক সপ্তাহেই বানিয়ে ফেলেছি।', 'The maths was explained simply. I built my first model within a week.', 5,
        'ডেটা সায়েন্টিস্ট ইন্টার্ন', 'Data Science Intern'),
      ('জান্নাতুল ফেরদৌস', 'https://images.pexels.com/photos/40322798/pexels-photo-40322798.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', 'Python Programming Crash Course',
        'বিনামূল্যে এত ভালো কোর্স আশা করিনি। এখন আমি নিজে স্ক্রিপ্ট লিখতে পারি।', 'I did not expect a free course this good. I can now write my own scripts.', 5,
        'ট্রেইনি সফটওয়্যার ইঞ্জিনিয়ার', 'Trainee Software Engineer'),
      ('আশিকুর রহমান', 'https://images.pexels.com/photos/14950779/pexels-photo-14950779.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', 'Data Structures & Algorithms in C++',
        'ইন্টারভিউয়ের আগে সমস্যা সমাধানের অভ্যাস গড়তে এই কোর্সটি অসাধারণ।', 'An excellent course for building problem-solving habits before interviews.', 4,
        'সফটওয়্যার ইঞ্জিনিয়ার', 'Software Engineer');

    INSERT INTO promotions (title_bn, title_en, subtitle_bn, subtitle_en, cta_label_bn, cta_label_en, ends_at) VALUES
      ('১১.১১ স্পেশাল অফার', '11.11 Special Offer', 'আপনার পছন্দের কোর্সে পান বিশেষ ছাড়!', 'Get a special discount on the course you love!', 'এখনই কোর্স দেখুন', 'Browse discounted courses', now() + interval '3 days');

    INSERT INTO site_stats (key, label_bn, label_en, value, sort_order) VALUES
      ('students', 'মোট শিক্ষার্থী', 'Total Students', 12500, 1),
      ('graduates', 'সফল গ্র্যাজুয়েট', 'Successful Graduates', 4800, 2),
      ('courses', 'উপলব্ধ কোর্স', 'Available Courses', 12, 3),
      ('instructors', 'ইন্ডাস্ট্রি এক্সপার্ট ইন্সট্রাক্টর', 'Industry Expert Instructors', 6, 4);
  END IF;
END $$;
