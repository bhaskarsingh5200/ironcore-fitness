/**
 * Concept content for IronCore Fitness.
 * Used as the offline/fallback dataset when Supabase is not configured,
 * and as the source for supabase/seed.sql. All content is fictional demo data.
 */
import { IMG } from './images'

export const conceptPrograms = [
  {
    id: 'program-strength',
    title: 'Strength Training',
    slug: 'strength-training',
    short_description:
      'Build strength, power, and confidence with structured resistance training.',
    description:
      'Strength Training at IronCore is built on progressive overload, sound technique, and measurable progress. You will train in small, focused groups with programming that adapts to your level — from first-time lifters to experienced athletes. Every session is guided by a coach who corrects form, tracks your numbers, and keeps the weights moving in the right direction.',
    benefits: [
      'Progressive, coach-guided programming',
      'Core barbell and dumbbell movements',
      'Personal progress tracking',
      'Small group sizes for quality coaching',
      'Technique-first coaching culture',
    ],
    approach:
      'We train in blocks of 6–8 weeks. Each block targets a clear outcome — raw strength, muscle mass, or power. Sessions combine a main lift, accessory work, and a short conditioning finisher, so you get strong without burning out.',
    who_for:
      'Anyone who wants to get measurably stronger in a structured, coach-led environment — beginners learning the basics or lifters chasing their next PR.',
    image: IMG.strength,
    icon: 'dumbbell',
    level: 'Beginner to advanced',
    duration_weeks: 8,
    sessions_per_week: 3,
    group_size: 'Up to 8',
    status: 'published',
    sort_order: 1,
  },
  {
    id: 'program-personal-training',
    title: 'Personal Training',
    slug: 'personal-training',
    short_description:
      'One-on-one coaching tailored to your goals, fitness level, and progress.',
    description:
      'Our Personal Training program pairs you with a dedicated coach who builds a plan around your body, your schedule, and your goals. Sessions are fully one-on-one: every rep, every set, and every session is planned for you. Your coach handles the programming, the accountability, and the adjustments — you focus on showing up.',
    benefits: [
      'Dedicated one-on-one coach',
      'Custom programming around your goals',
      'Weekly progress reviews',
      'Flexible scheduling',
      'Nutrition and habit guidance',
    ],
    approach:
      'Your journey begins with a full assessment — movement, strength baseline, and goals. From there your coach designs a plan and reviews it weekly, adjusting load, volume, and focus as you progress.',
    who_for:
      'People who want maximum results in minimum time: busy professionals, complete beginners, and athletes working around specific goals or limitations.',
    image: IMG.personalTraining,
    icon: 'user-check',
    level: 'All levels',
    duration_weeks: 12,
    sessions_per_week: 2,
    group_size: '1-on-1',
    status: 'published',
    sort_order: 2,
  },
  {
    id: 'program-functional-fitness',
    title: 'Functional Fitness',
    slug: 'functional-fitness',
    short_description:
      'Improve mobility, endurance, strength, and everyday performance.',
    description:
      'Functional Fitness develops strength you can use. Through varied, multi-joint workouts you will build mobility, stamina, and core stability that transfers directly to daily life and sport. Expect a mix of bodyweight, kettlebell, and engine work in high-energy group sessions.',
    benefits: [
      'Full-body, movement-focused workouts',
      'Improved mobility and stability',
      'Cardio and strength combined',
      'Scalable for every fitness level',
      'High-energy group environment',
    ],
    approach:
      'Every class follows a warm-up, a skill or strength segment, and a conditioning circuit. Coaches scale movements and loads so each athlete works at the right intensity — no experience required.',
    who_for:
      'Anyone who wants to feel stronger, move better, and get a complete workout — especially people who train for life, not just the mirror.',
    image: IMG.functional,
    icon: 'activity',
    level: 'All levels',
    duration_weeks: 6,
    sessions_per_week: 3,
    group_size: 'Up to 12',
    status: 'published',
    sort_order: 3,
  },
  {
    id: 'program-transformation',
    title: 'Transformation Program',
    slug: 'transformation-program',
    short_description:
      'A structured program combining training, accountability, and sustainable habits.',
    description:
      'The Transformation Program is IronCore’s flagship guided journey. Over 12 weeks you combine structured training, nutrition guidance, and weekly check-ins with a dedicated coach. It is built around habit change — not quick fixes — so the results stick long after the program ends.',
    benefits: [
      '12-week structured training plan',
      'Nutrition guidance and meal templates',
      'Weekly coach check-ins',
      'Body composition tracking',
      'Habit and mindset coaching',
    ],
    approach:
      'Each week has a clear training schedule, a nutrition focus, and a habit goal. Your coach reviews your progress weekly and adjusts the plan. You track the numbers that matter and see the trend in real time.',
    who_for:
      'People who want a complete reset — defined goals, full accountability, and a structured path to sustainable transformation.',
    image: IMG.transformation,
    icon: 'target',
    level: 'All levels',
    duration_weeks: 12,
    sessions_per_week: 4,
    group_size: 'Up to 6',
    status: 'published',
    sort_order: 4,
  },
]

export const conceptTrainers = [
  {
    id: 'trainer-alex',
    name: 'Alex Morgan',
    slug: 'alex-morgan',
    role: 'Head Strength Coach',
    bio: 'Alex leads the coaching team at IronCore, with a decade of experience building strong, healthy lifters. He believes technique comes first and numbers follow.',
    specialization: ['Strength Training', 'Powerlifting', 'Technique'],
    experience: '10+ years',
    image: IMG.trainerAlex,
    social_links: { instagram: 'https://instagram.com', linkedin: 'https://linkedin.com' },
    certifications: ['CSCS — Certified Strength & Conditioning Specialist', 'Level 2 Powerlifting Coach', 'First Aid Certified'],
    focus: 'Builts raw strength and bulletproof technique through progressive, measured programming.',
    quote: 'Technique is the foundation. Numbers are just the result of doing it right, consistently.',
    status: 'published',
  },
  {
    id: 'trainer-jordan',
    name: 'Jordan Lee',
    slug: 'jordan-lee',
    role: 'Performance Coach',
    bio: 'Jordan designs the functional and conditioning programs at IronCore, blending athletic preparation with everyday performance.',
    specialization: ['Functional Fitness', 'Conditioning', 'Mobility'],
    experience: '8+ years',
    image: IMG.trainerJordan,
    social_links: { instagram: 'https://instagram.com', youtube: 'https://youtube.com' },
    certifications: ['NSCA-CPT — Certified Personal Trainer', 'Kettlebell Instructor', 'Precision Nutrition Level 1'],
    focus: 'Builds engine, mobility, and work capacity so training transfers to real life and sport.',
    quote: 'You don’t just get fit at the gym — you get fit for the life you actually live.',
    status: 'published',
  },
  {
    id: 'trainer-maya',
    name: 'Maya Carter',
    slug: 'maya-carter',
    role: 'Personal Trainer',
    bio: 'Maya coaches one-on-one clients through structured, goal-driven programs — with a focus on sustainable habits and confident lifting.',
    specialization: ['Personal Training', 'Transformations', 'Nutrition'],
    experience: '6+ years',
    image: IMG.trainerMaya,
    social_links: { instagram: 'https://instagram.com', linkedin: 'https://linkedin.com' },
    certifications: ['ACE-CPT — Certified Personal Trainer', 'Functional Movement Systems', 'Womens Health & Coaching'],
    focus: 'Builds confidence, consistency, and sustainable habits with fully personalized one-on-one coaching.',
    quote: 'The best program is the one you actually stick to. My job is to make that easy.',
    status: 'published',
  },
]

export const conceptMemberships = [
  {
    id: 'membership-starter',
    name: 'Starter',
    price: 1499,
    billing_period: 'month',
    description: 'A clean entry point for your first month of focused training.',
    features: ['Gym Access', 'Locker Access', 'Basic Fitness Assessment'],
    featured: false,
    status: 'published',
    sort_order: 1,
  },
  {
    id: 'membership-performance',
    name: 'Performance',
    price: 2499,
    billing_period: 'month',
    description: 'Our most popular plan — full access plus group classes and guidance.',
    features: [
      'Unlimited Gym Access',
      'Fitness Assessment',
      'Group Classes',
      'Training Guidance',
    ],
    featured: true,
    status: 'published',
    sort_order: 2,
  },
  {
    id: 'membership-elite',
    name: 'Elite',
    price: 4999,
    billing_period: 'month',
    description: 'The complete IronCore experience with personal training included.',
    features: [
      'Unlimited Access',
      'Personal Training Sessions',
      'Nutrition Guidance',
      'Priority Support',
    ],
    featured: false,
    status: 'published',
    sort_order: 3,
  },
]

export const conceptClasses = [
  { id: 'class-1', name: 'Strength Training', trainer: 'Alex Morgan', day: 'Monday', start_time: '06:00', end_time: '07:00', category: 'Strength Training', capacity: 12, status: 'published' },
  { id: 'class-2', name: 'Functional Fitness', trainer: 'Jordan Lee', day: 'Monday', start_time: '08:00', end_time: '09:00', category: 'Functional Fitness', capacity: 16, status: 'published' },
  { id: 'class-3', name: 'HIIT', trainer: 'Jordan Lee', day: 'Monday', start_time: '18:00', end_time: '19:00', category: 'HIIT', capacity: 14, status: 'published' },
  { id: 'class-4', name: 'Mobility', trainer: 'Maya Carter', day: 'Monday', start_time: '19:30', end_time: '20:15', category: 'Mobility', capacity: 10, status: 'published' },
  { id: 'class-5', name: 'Personal Training', trainer: 'Maya Carter', day: 'Tuesday', start_time: '06:00', end_time: '07:00', category: 'Personal Training', capacity: 2, status: 'published' },
  { id: 'class-6', name: 'Strength Training', trainer: 'Alex Morgan', day: 'Tuesday', start_time: '19:00', end_time: '20:00', category: 'Strength Training', capacity: 12, status: 'published' },
  { id: 'class-7', name: 'HIIT', trainer: 'Jordan Lee', day: 'Wednesday', start_time: '06:00', end_time: '07:00', category: 'HIIT', capacity: 14, status: 'published' },
  { id: 'class-8', name: 'Functional Fitness', trainer: 'Jordan Lee', day: 'Wednesday', start_time: '18:30', end_time: '19:30', category: 'Functional Fitness', capacity: 16, status: 'published' },
  { id: 'class-9', name: 'Mobility', trainer: 'Maya Carter', day: 'Thursday', start_time: '07:00', end_time: '07:45', category: 'Mobility', capacity: 10, status: 'published' },
  { id: 'class-10', name: 'Strength Training', trainer: 'Alex Morgan', day: 'Thursday', start_time: '18:00', end_time: '19:00', category: 'Strength Training', capacity: 12, status: 'published' },
  { id: 'class-11', name: 'HIIT', trainer: 'Jordan Lee', day: 'Friday', start_time: '06:00', end_time: '07:00', category: 'HIIT', capacity: 14, status: 'published' },
  { id: 'class-12', name: 'Functional Fitness', trainer: 'Jordan Lee', day: 'Friday', start_time: '18:30', end_time: '19:30', category: 'Functional Fitness', capacity: 16, status: 'published' },
  { id: 'class-13', name: 'Strength Training', trainer: 'Alex Morgan', day: 'Saturday', start_time: '07:00', end_time: '08:00', category: 'Strength Training', capacity: 12, status: 'published' },
  { id: 'class-14', name: 'Functional Fitness', trainer: 'Jordan Lee', day: 'Saturday', start_time: '09:00', end_time: '10:00', category: 'Functional Fitness', capacity: 16, status: 'published' },
]

export const conceptGallery = [
  { id: 'gal-1', image_url: IMG.galleryStrength1, category: 'Strength', caption: 'The strength floor at IronCore', status: 'published', sort_order: 1 },
  { id: 'gal-2', image_url: IMG.galleryTraining1, category: 'Training', caption: 'Conditioning in motion', status: 'published', sort_order: 2 },
  { id: 'gal-3', image_url: IMG.galleryCommunity1, category: 'Community', caption: 'The IronCore crew', status: 'published', sort_order: 3 },
  { id: 'gal-4', image_url: IMG.galleryFacilities1, category: 'Facilities', caption: 'Main training floor', status: 'published', sort_order: 4 },
  { id: 'gal-5', image_url: IMG.galleryStrength2, category: 'Strength', caption: 'Heavy sessions, sound technique', status: 'published', sort_order: 5 },
  { id: 'gal-6', image_url: IMG.galleryTraining2, category: 'Training', caption: 'Functional training zone', status: 'published', sort_order: 6 },
  { id: 'gal-7', image_url: IMG.galleryCommunity2, category: 'Community', caption: 'Team transformation classes', status: 'published', sort_order: 7 },
  { id: 'gal-8', image_url: IMG.galleryFacilities2, category: 'Facilities', caption: 'Cardio zone', status: 'published', sort_order: 8 },
  { id: 'gal-9', image_url: IMG.galleryStrength3, category: 'Strength', caption: 'Rack city', status: 'published', sort_order: 9 },
  { id: 'gal-10', image_url: IMG.galleryTraining3, category: 'Training', caption: 'Mobility work', status: 'published', sort_order: 10 },
  { id: 'gal-11', image_url: IMG.galleryCommunity3, category: 'Community', caption: 'Small groups, big energy', status: 'published', sort_order: 11 },
  { id: 'gal-12', image_url: IMG.galleryFacilities3, category: 'Facilities', caption: 'Personal training studio', status: 'published', sort_order: 12 },
]

export const conceptFaqs = [
  {
    id: 'faq-1',
    question: 'Do I need previous gym experience?',
    answer:
      'Not at all. Every program at IronCore is built to scale from your current level. Coaches will guide you through technique from day one — most of our members started with zero experience.',
    category: 'Getting started',
    status: 'published',
    sort_order: 1,
  },
  {
    id: 'faq-2',
    question: 'What should I bring to my first session?',
    answer:
      'Comfortable training clothes, indoor training shoes, a water bottle, and a towel. A coach will give you a short orientation before your first session.',
    category: 'Getting started',
    status: 'published',
    sort_order: 2,
  },
  {
    id: 'faq-3',
    question: 'Do you offer personal training?',
    answer:
      'Yes. Our Personal Training program pairs you with a dedicated coach for fully custom, one-on-one sessions. Enquire on the membership page and we’ll help you find the right plan.',
    category: 'Training',
    status: 'published',
    sort_order: 3,
  },
  {
    id: 'faq-4',
    question: 'Can beginners join?',
    answer:
      'Absolutely — beginners are welcome across every program. Our coaches specialise in teaching safe, effective technique from the very first session.',
    category: 'Training',
    status: 'published',
    sort_order: 4,
  },
  {
    id: 'faq-5',
    question: 'Can I cancel my membership?',
    answer:
      'Yes, memberships can be cancelled as per the terms of your chosen plan. Our team will guide you through the process when you need it.',
    category: 'Membership',
    status: 'published',
    sort_order: 5,
  },
  {
    id: 'faq-6',
    question: 'Do you offer trial sessions?',
    answer:
      'Yes — we offer a trial day so you can experience the training floor and meet the coaching team before you commit.',
    category: 'Membership',
    status: 'published',
    sort_order: 6,
  },
]

export const conceptTestimonials = [
  {
    id: 'test-1',
    name: 'Rahul Sharma',
    role: 'Sample Member Story',
    content:
      'Sample testimonial for this concept installation. Structured coaching and a strong environment made a real difference in my consistency.',
    rating: 5,
    status: 'published',
  },
  {
    id: 'test-2',
    name: 'Priya Nair',
    role: 'Sample Member Story',
    content:
      'This is a fictional member story written for the demo. The one-on-one coaching approach here is easy to imagine working well.',
    rating: 5,
    status: 'published',
  },
  {
    id: 'test-3',
    name: 'Arjun Mehta',
    role: 'Sample Member Story',
    content:
      'Concept project feedback only — no real client was involved. The functional training classes are the highlight of the program lineup.',
    rating: 4,
    status: 'published',
  },
]

export const conceptFacilities = [
  {
    id: 'fac-1',
    name: 'Strength Zone',
    description: 'Power racks, barbells, and dumbbells up to 60kg in a dedicated strength floor.',
    image: IMG.facilityStrengthZone,
    highlights: ['6 power racks', 'Competition-grade barbells', 'Dumbbells to 60kg', 'Floor-to-ceiling mirrors'],
  },
  {
    id: 'fac-2',
    name: 'Cardio Zone',
    description: 'Treadmills, bikes, and rowers with personal screens and tracking.',
    image: IMG.facilityCardioZone,
    highlights: ['Modern treadmills & bikes', 'Rowing & ski ergs', 'Personal heart-rate tracking', 'Cooled climate control'],
  },
  {
    id: 'fac-3',
    name: 'Functional Training Area',
    description: 'Kettlebells, sleds, ropes, and open turf for dynamic movement.',
    image: IMG.facilityFunctional,
    highlights: ['Open turf floor', 'Kettlebells to 40kg', 'Sleds, ropes & med balls', 'Plyometric boxes'],
  },
  {
    id: 'fac-4',
    name: 'Personal Training Studio',
    description: 'A private studio for focused one-on-one coaching sessions.',
    image: IMG.facilityStudio,
    highlights: ['Private 1-on-1 sessions', 'Adjustable benches & racks', 'Body composition scale', 'By appointment'],
  },
  {
    id: 'fac-5',
    name: 'Recovery Area',
    description: 'Foam rolling, stretching zone, and mobility tools to reset between sessions.',
    image: IMG.facilityRecovery,
    highlights: ['Foam rolling station', 'Stretching floor', 'Mobility tools', 'Water & towel service'],
  },
]

export const conceptStats = [
  { value: '500+', label: 'Members' },
  { value: '12+', label: 'Expert Trainers' },
  { value: '8+', label: 'Years Experience' },
  { value: '20+', label: 'Weekly Classes' },
]
