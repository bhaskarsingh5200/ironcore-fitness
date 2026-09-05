-- IronCore Fitness — demo seed data
-- Run after schema.sql. Mirrors src/data/concept.js so the site looks the
-- same whether it reads from Supabase or from the offline fallback dataset.
-- All content is fictional demo data for this concept/demo installation.

-- =============================================================
-- Programs
-- =============================================================
insert into public.programs (title, slug, short_description, description, approach, who_for, benefits, image, icon, level, duration_weeks, sessions_per_week, group_size, status, sort_order)
values
  (
    'Strength Training',
    'strength-training',
    'Build strength, power, and confidence with structured resistance training.',
    'Strength Training at IronCore is built on progressive overload, sound technique, and measurable progress. You will train in small, focused groups with programming that adapts to your level — from first-time lifters to experienced athletes. Every session is guided by a coach who corrects form, tracks your numbers, and keeps the weights moving in the right direction.',
    'We train in blocks of 6–8 weeks. Each block targets a clear outcome — raw strength, muscle mass, or power. Sessions combine a main lift, accessory work, and a short conditioning finisher, so you get strong without burning out.',
    'Anyone who wants to get measurably stronger in a structured, coach-led environment — beginners learning the basics or lifters chasing their next PR.',
    '["Progressive, coach-guided programming", "Core barbell and dumbbell movements", "Personal progress tracking", "Small group sizes for quality coaching", "Technique-first coaching culture"]'::jsonb,
    'https://images.unsplash.com/photo-1517963879433-6ad2b056d712?auto=format&fit=crop&w=1000&q=80',
    'dumbbell',
    'Beginner to advanced',
    8,
    3,
    'Up to 8',
    'published',
    1
  ),
  (
    'Personal Training',
    'personal-training',
    'One-on-one coaching tailored to your goals, fitness level, and progress.',
    'Our Personal Training program pairs you with a dedicated coach who builds a plan around your body, your schedule, and your goals. Sessions are fully one-on-one: every rep, every set, and every session is planned for you. Your coach handles the programming, the accountability, and the adjustments — you focus on showing up.',
    'Your journey begins with a full assessment — movement, strength baseline, and goals. From there your coach designs a plan and reviews it weekly, adjusting load, volume, and focus as you progress.',
    'People who want maximum results in minimum time: busy professionals, complete beginners, and athletes working around specific goals or limitations.',
    '["Dedicated one-on-one coach", "Custom programming around your goals", "Weekly progress reviews", "Flexible scheduling", "Nutrition and habit guidance"]'::jsonb,
    'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=1000&q=80',
    'user-check',
    'All levels',
    12,
    2,
    '1-on-1',
    'published',
    2
  ),
  (
    'Functional Fitness',
    'functional-fitness',
    'Improve mobility, endurance, strength, and everyday performance.',
    'Functional Fitness develops strength you can use. Through varied, multi-joint workouts you will build mobility, stamina, and core stability that transfers directly to daily life and sport. Expect a mix of bodyweight, kettlebell, and engine work in high-energy group sessions.',
    'Every class follows a warm-up, a skill or strength segment, and a conditioning circuit. Coaches scale movements and loads so each athlete works at the right intensity — no experience required.',
    'Anyone who wants to feel stronger, move better, and get a complete workout — especially people who train for life, not just the mirror.',
    '["Full-body, movement-focused workouts", "Improved mobility and stability", "Cardio and strength combined", "Scalable for every fitness level", "High-energy group environment"]'::jsonb,
    'https://images.unsplash.com/photo-1550345332-09e3ac987658?auto=format&fit=crop&w=1000&q=80',
    'activity',
    'All levels',
    6,
    3,
    'Up to 12',
    'published',
    3
  ),
  (
    'Transformation Program',
    'transformation-program',
    'A structured program combining training, accountability, and sustainable habits.',
    'The Transformation Program is IronCore’s flagship guided journey. Over 12 weeks you combine structured training, nutrition guidance, and weekly check-ins with a dedicated coach. It is built around habit change — not quick fixes — so the results stick long after the program ends.',
    'Each week has a clear training schedule, a nutrition focus, and a habit goal. Your coach reviews your progress weekly and adjusts the plan. You track the numbers that matter and see the trend in real time.',
    'People who want a complete reset — defined goals, full accountability, and a structured path to sustainable transformation.',
    '["12-week structured training plan", "Nutrition guidance and meal templates", "Weekly coach check-ins", "Body composition tracking", "Habit and mindset coaching"]'::jsonb,
    'https://images.unsplash.com/photo-1574680096145-d05b474e2155?auto=format&fit=crop&w=1000&q=80',
    'target',
    'All levels',
    12,
    4,
    'Up to 6',
    'published',
    4
  );

-- =============================================================
-- Trainers
-- =============================================================
insert into public.trainers (name, slug, role, bio, experience, specialization, social_links, certifications, focus, quote, image, status)
values
  (
    'Alex Morgan',
    'alex-morgan',
    'Head Strength Coach',
    'Alex leads the coaching team at IronCore, with a decade of experience building strong, healthy lifters. He believes technique comes first and numbers follow.',
    '10+ years',
    '["Strength Training", "Powerlifting", "Technique"]'::jsonb,
    '{"instagram": "https://instagram.com", "linkedin": "https://linkedin.com"}'::jsonb,
    '["CSCS — Certified Strength & Conditioning Specialist", "Level 2 Powerlifting Coach", "First Aid Certified"]'::jsonb,
    'Builts raw strength and bulletproof technique through progressive, measured programming.',
    'Technique is the foundation. Numbers are just the result of doing it right, consistently.',
    'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=800&q=80',
    'published'
  ),
  (
    'Jordan Lee',
    'jordan-lee',
    'Performance Coach',
    'Jordan designs the functional and conditioning programs at IronCore, blending athletic preparation with everyday performance.',
    '8+ years',
    '["Functional Fitness", "Conditioning", "Mobility"]'::jsonb,
    '{"instagram": "https://instagram.com", "youtube": "https://youtube.com"}'::jsonb,
    '["NSCA-CPT — Certified Personal Trainer", "Kettlebell Instructor", "Precision Nutrition Level 1"]'::jsonb,
    'Builds engine, mobility, and work capacity so training transfers to real life and sport.',
    'You don’t just get fit at the gym — you get fit for the life you actually live.',
    'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=800&q=80',
    'published'
  ),
  (
    'Maya Carter',
    'maya-carter',
    'Personal Trainer',
    'Maya coaches one-on-one clients through structured, goal-driven programs — with a focus on sustainable habits and confident lifting.',
    '6+ years',
    '["Personal Training", "Transformations", "Nutrition"]'::jsonb,
    '{"instagram": "https://instagram.com", "linkedin": "https://linkedin.com"}'::jsonb,
    '["ACE-CPT — Certified Personal Trainer", "Functional Movement Systems", "Womens Health & Coaching"]'::jsonb,
    'Builds confidence, consistency, and sustainable habits with fully personalized one-on-one coaching.',
    'The best program is the one you actually stick to. My job is to make that easy.',
    'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80',
    'published'
  );

-- =============================================================
-- Memberships
-- =============================================================
insert into public.memberships (name, price, billing_period, description, features, featured, status, sort_order)
values
  (
    'Starter',
    1499,
    'month',
    'A clean entry point for your first month of focused training.',
    '["Gym Access", "Locker Access", "Basic Fitness Assessment"]'::jsonb,
    false,
    'published',
    1
  ),
  (
    'Performance',
    2499,
    'month',
    'Our most popular plan — full access plus group classes and guidance.',
    '["Unlimited Gym Access", "Fitness Assessment", "Group Classes", "Training Guidance"]'::jsonb,
    true,
    'published',
    2
  ),
  (
    'Elite',
    4999,
    'month',
    'The complete IronCore experience with personal training included.',
    '["Unlimited Access", "Personal Training Sessions", "Nutrition Guidance", "Priority Support"]'::jsonb,
    false,
    'published',
    3
  );

-- =============================================================
-- Classes
-- =============================================================
insert into public.classes (name, trainer, day, start_time, end_time, category, capacity, status)
values
  ('Strength Training', 'Alex Morgan', 'Monday', '06:00', '07:00', 'Strength Training', 12, 'published'),
  ('Functional Fitness', 'Jordan Lee', 'Monday', '08:00', '09:00', 'Functional Fitness', 16, 'published'),
  ('HIIT', 'Jordan Lee', 'Monday', '18:00', '19:00', 'HIIT', 14, 'published'),
  ('Mobility', 'Maya Carter', 'Monday', '19:30', '20:15', 'Mobility', 10, 'published'),
  ('Personal Training', 'Maya Carter', 'Tuesday', '06:00', '07:00', 'Personal Training', 2, 'published'),
  ('Strength Training', 'Alex Morgan', 'Tuesday', '19:00', '20:00', 'Strength Training', 12, 'published'),
  ('HIIT', 'Jordan Lee', 'Wednesday', '06:00', '07:00', 'HIIT', 14, 'published'),
  ('Functional Fitness', 'Jordan Lee', 'Wednesday', '18:30', '19:30', 'Functional Fitness', 16, 'published'),
  ('Mobility', 'Maya Carter', 'Thursday', '07:00', '07:45', 'Mobility', 10, 'published'),
  ('Strength Training', 'Alex Morgan', 'Thursday', '18:00', '19:00', 'Strength Training', 12, 'published'),
  ('HIIT', 'Jordan Lee', 'Friday', '06:00', '07:00', 'HIIT', 14, 'published'),
  ('Functional Fitness', 'Jordan Lee', 'Friday', '18:30', '19:30', 'Functional Fitness', 16, 'published'),
  ('Strength Training', 'Alex Morgan', 'Saturday', '07:00', '08:00', 'Strength Training', 12, 'published'),
  ('Functional Fitness', 'Jordan Lee', 'Saturday', '09:00', '10:00', 'Functional Fitness', 16, 'published');

-- =============================================================
-- Gallery
-- =============================================================
insert into public.gallery (image_url, caption, category, status, sort_order)
values
  ('https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=1000&q=80', 'The strength floor at IronCore', 'Strength', 'published', 1),
  ('https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=1000&q=80', 'Conditioning in motion', 'Training', 'published', 2),
  ('https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?auto=format&fit=crop&w=1000&q=80', 'The IronCore crew', 'Community', 'published', 3),
  ('https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1000&q=80', 'Main training floor', 'Facilities', 'published', 4),
  ('https://images.unsplash.com/photo-1534367610401-9f5ed68180aa?auto=format&fit=crop&w=1000&q=80', 'Heavy sessions, sound technique', 'Strength', 'published', 5),
  ('https://images.unsplash.com/photo-1571902943202-507ec2618e8f?auto=format&fit=crop&w=1000&q=80', 'Functional training zone', 'Training', 'published', 6),
  ('https://images.unsplash.com/photo-1574680096145-d05b474e2155?auto=format&fit=crop&w=1000&q=80', 'Team transformation classes', 'Community', 'published', 7),
  ('https://images.unsplash.com/photo-1558611848-73f7eb4001a1?auto=format&fit=crop&w=1000&q=80', 'Cardio zone', 'Facilities', 'published', 8),
  ('https://images.unsplash.com/photo-1540497077202-7c8a3999166f?auto=format&fit=crop&w=1000&q=80', 'Rack city', 'Strength', 'published', 9),
  ('https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=1000&q=80', 'Mobility work', 'Training', 'published', 10),
  ('https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=1000&q=80', 'Small groups, big energy', 'Community', 'published', 11),
  ('https://images.unsplash.com/photo-1570829460005-c840387bb1ca?auto=format&fit=crop&w=1000&q=80', 'Personal training studio', 'Facilities', 'published', 12);

-- =============================================================
-- FAQs
-- =============================================================
insert into public.faqs (question, answer, category, status, sort_order)
values
  ('Do I need previous gym experience?', 'Not at all. Every program at IronCore is built to scale from your current level. Coaches will guide you through technique from day one — most of our members started with zero experience.', 'Getting started', 'published', 1),
  ('What should I bring to my first session?', 'Comfortable training clothes, indoor training shoes, a water bottle, and a towel. A coach will give you a short orientation before your first session.', 'Getting started', 'published', 2),
  ('Do you offer personal training?', 'Yes. Our Personal Training program pairs you with a dedicated coach for fully custom, one-on-one sessions. Enquire on the membership page and we’ll help you find the right plan.', 'Training', 'published', 3),
  ('Can beginners join?', 'Absolutely — beginners are welcome across every program. Our coaches specialise in teaching safe, effective technique from the very first session.', 'Training', 'published', 4),
  ('Can I cancel my membership?', 'Yes, memberships can be cancelled as per the terms of your chosen plan. Our team will guide you through the process when you need it.', 'Membership', 'published', 5),
  ('Do you offer trial sessions?', 'Yes — we offer a trial day so you can experience the training floor and meet the coaching team before you commit.', 'Membership', 'published', 6);

-- =============================================================
-- Testimonials (fictional sample member stories)
-- =============================================================
insert into public.testimonials (name, role, content, rating, status)
values
  ('Rahul Sharma', 'Sample Member Story', 'Sample testimonial for this concept installation. Structured coaching and a strong environment made a real difference in my consistency.', 5, 'published'),
  ('Priya Nair', 'Sample Member Story', 'This is a fictional member story written for the demo. The one-on-one coaching approach here is easy to imagine working well.', 5, 'published'),
  ('Arjun Mehta', 'Sample Member Story', 'Fictional demo feedback only — no real client was involved. The functional training classes are the highlight of the program lineup.', 4, 'published');

-- =============================================================
-- Site settings
-- =============================================================
insert into public.site_settings (key, value)
values
  ('brand_name', 'IronCore Fitness'),
  ('tagline', 'BUILD YOUR STRONGEST SELF.'),
  ('email', 'hello@ironcorefitness.example'),
  ('phone', '+91 90000 00000'),
  ('whatsapp', '+91 90000 00000'),
  ('address', 'MG Road, Bengaluru'),
  ('instagram', 'https://instagram.com'),
  ('youtube', 'https://youtube.com'),
  ('facebook', 'https://facebook.com'),
  ('opening_hours', '[{"day": "Monday – Saturday", "hours": "05:30 AM – 10:00 PM"}, {"day": "Sunday", "hours": "07:00 AM – 02:00 PM"}]'),
  ('hero_heading', 'Build your'),
  ('hero_highlight', 'strongest'),
  ('hero_tagline', 'self.'),
  ('hero_subtitle', 'Train smarter. Move stronger. Become the version of yourself you’ve been working toward.'),
  ('primary_cta_label', 'Start Your Journey'),
  ('primary_cta_to', '/membership'),
  ('secondary_cta_label', 'Explore Programs'),
  ('secondary_cta_to', '/programs'),
  ('footer_text', 'A premium fitness center built around purposeful training, expert coaching, and sustainable transformation.'),
  ('site_title', 'IronCore Fitness — Build Your Strongest Self.'),
  ('meta_description', 'IronCore Fitness — a premium fitness center built around purposeful training, expert coaching, and sustainable transformation.'),
  ('canonical_url', 'https://ironcore.bhaskarbhardwaj.com'),
  ('og_title', 'IronCore Fitness — Build Your Strongest Self.'),
  ('og_description', 'IronCore Fitness — a premium fitness center built around purposeful training, expert coaching, and sustainable transformation.'),
  ('og_image', ''),
  ('twitter_title', 'IronCore Fitness — Build Your Strongest Self.'),
  ('twitter_description', 'IronCore Fitness — a premium fitness center built around purposeful training, expert coaching, and sustainable transformation.'),
  ('twitter_image', '')
on conflict (key) do update set value = excluded.value;
