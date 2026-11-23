export type GalleryCategory =
  | 'All'
  | 'Art & Craft'
  | 'Sports & Outdoors'
  | 'Science & Learning'
  | 'Awards & Events';

export interface ProgrammeItem {
  id: string;
  title: string;
  subtitle: string;
  ageGroup: string;
  duration: string;
  minAge: number;
  maxAge: number;
  nepStage: string;
  image: string;
  imageAlt: string;
  imagePosition?: string;
  iconKey: 'playgroup' | 'nursery' | 'kg' | 'primary' | 'teacher';
  shortDescription: string;
  fullDescription: string;
  highlights: string[];
  dailyRhythm: string[];
  classOptions: string[];
}

export interface GalleryItem {
  id: string;
  src: string;
  alt: string;
  title: string;
  caption: string;
  category: Exclude<GalleryCategory, 'All'>;
  spanWide?: boolean;
}

export interface CoreValue {
  title: string;
  summary: string;
  accent: string;
}

export const SCHOOL_INFO = {
  name: 'Kidzee Globus International School',
  shortName: 'Kidzee Globus',
  motto: 'Believe, Create, Achieve',
  tagline: 'A Little Beginning, A Lifetime of Learning',
  establishedYear: 2017,
  previousLocation: 'Gyalshing Bazar',
  currentLocation: 'Kyongsa, Near District Court, Gayzing, West Sikkim',
  gradesOffered: 'Playgroup to Class V',
  crestUrl: '/assets/aistudio/Kidzee_Globus_School_Crest_3b98668b.png',
  heroPhotoUrl: '/assets/aistudio/Kidzee_Hero_Student_Cutout.png',
  aboutPhotoUrl: '/assets/aistudio/WhatsApp_Image_2026-11-19_at_2.30.20_PM__1__2e5c8f7c.jpeg',
  schoolHours: 'Mon – Sat · 8:30 AM to 2:30 PM',
  admissionsDeskHours: 'Mon – Sat · 9:00 AM to 3:30 PM',
  phoneDisplay: '+91 98320 00000',
  email: 'admissions@kidzeeglobusgayzing.edu.in',
};

export const CORE_VALUES: CoreValue[] = [
  {
    title: 'Integrity',
    summary: 'Building honesty, kindness, and respectful habits from the very first classroom circle.',
    accent: '#5B158C',
  },
  {
    title: 'Creativity',
    summary: 'Hands-on art, paper crafts, storytelling, and joyful expression every single week.',
    accent: '#F97316',
  },
  {
    title: 'Originality',
    summary: 'Encouraging curious questions, science models, and each child’s unique pace of learning.',
    accent: '#15803D',
  },
  {
    title: 'Nobility',
    summary: 'Nurturing empathy, teamwork on the field, and pride in our West Sikkim community.',
    accent: '#D91E2A',
  },
];

export const PROGRAMMES: ProgrammeItem[] = [
  {
    id: 'playgroup',
    title: 'PlayGroup',
    subtitle: 'Curious First Steps',
    ageGroup: '2 – 3 Years',
    duration: '3 Hours/Day',
    minAge: 2,
    maxAge: 3,
    nepStage: 'Early Childhood Explorers',
    image: '/assets/aistudio/WhatsApp_Image_2026-11-19_at_2.33.45_PM__1__1d17b7eb.jpeg',
    imageAlt: 'Playgroup student showing handmade triangle yarn craft in colourful playroom',
    imagePosition: 'center 30%',
    iconKey: 'playgroup',
    shortDescription:
      'Children in this age group are identified as toddlers. Born curious, they begin exploring shapes, textures, music, and warm friendships.',
    fullDescription:
      'Our PlayGroup programme turns everyday wonder into gentle foundational growth. Through tactile crafts like yarn-stitching shapes, sensory soft-play, action rhymes, and caring teacher guidance, toddlers gain confidence away from home.',
    highlights: [
      'Sensory playroom & fine-motor craft activities',
      'Action songs, storytelling, and early speech readiness',
      'Warm, safe transition from home to school routine',
      'Small teacher-to-child ratio for individual care',
    ],
    dailyRhythm: [
      '09:00 AM · Welcome Circle & Morning Songs',
      '09:45 AM · Sensory Discovery & Shape Craft',
      '10:45 AM · Healthy Tiffin & Story Time',
      '11:20 AM · Soft Play, Music & Home Time',
    ],
    classOptions: ['Playgroup'],
  },
  {
    id: 'nursery',
    title: 'Nursery',
    subtitle: 'Foundational Stage · Level 1',
    ageGroup: '3 – 4 Years',
    duration: '3 Hours/Day',
    minAge: 3,
    maxAge: 4,
    nepStage: 'Mandatory Level 1 of Foundational Stage (NEP)',
    image: '/assets/aistudio/WhatsApp_Image_2026-11-19_at_2.33.45_PM_bd26562c.jpeg',
    imageAlt: 'Smiling Nursery student holding handmade colourful paper mosaic umbrella artwork',
    imagePosition: 'center 25%',
    iconKey: 'nursery',
    shortDescription:
      'The child is now identified as a Pre-Schooler (Mandatory Level 1 of Foundational Stage as per NEP), growing through art, phonics, and play.',
    fullDescription:
      'Aligned with Level 1 of the NEP Foundational Stage, Nursery nurtures phonics awareness, pre-writing strokes, number sense, and imaginative paper-mosaic arts while building joyful social confidence.',
    highlights: [
      'Phonics sounds, picture reading & vocabulary games',
      'Paper collage, clay moulding, and outdoor nature art',
      'Early numeracy through blocks, patterns, and sorting',
      'Expressive stage activities & festival celebrations',
    ],
    dailyRhythm: [
      '09:00 AM · Morning Assembly & Warm-Up Rhymes',
      '09:30 AM · Phonics, Pre-Writing & Number Play',
      '10:45 AM · Tiffin Break & Outdoor Play',
      '11:25 AM · Art Studio, Show-and-Tell & Pack Up',
    ],
    classOptions: ['Nursery'],
  },
  {
    id: 'kg',
    title: 'Junior KG / Senior KG',
    subtitle: 'Foundational Stage · Levels 2 & 3',
    ageGroup: '4 – 6 Years',
    duration: '4 Hours/Day',
    minAge: 4,
    maxAge: 6,
    nepStage: 'Levels 2 & 3 of Foundational Stage (NEP)',
    image: '/assets/aistudio/WhatsApp_Image_2026-11-19_at_2.33.44_PM_992e7c44.jpeg',
    imageAlt: 'Junior and Senior KG students participating attentively in morning school assembly',
    imagePosition: 'center 22%',
    iconKey: 'kg',
    shortDescription:
      'Levels 2 and 3 of Foundational Stage as per NEP — strengthening reading fluency, early math, environmental awareness, and school readiness.',
    fullDescription:
      'Junior KG (4–5 Years) and Senior KG (5–6 Years) bridge joyful preschool play with confident primary-school readiness. Children read short stories, write clearly, explore nature outdoors, and participate in team sports.',
    highlights: [
      'Structured reading, sentence building & bilingual exposure',
      'Hands-on addition, subtraction, shapes, and time concepts',
      'Outdoor turf sports, relay games, and morning pledge',
      'Confidence building through costume walks & recitations',
    ],
    dailyRhythm: [
      '08:45 AM · Morning Assembly, Pledge & Movement',
      '09:15 AM · Language Arts & Interactive Numeracy',
      '11:00 AM · Tiffin & Turf Sports / Garden Activity',
      '11:50 AM · Environmental Science, Art & Reading Circle',
    ],
    classOptions: ['Junior KG', 'Senior KG'],
  },
  {
    id: 'primary',
    title: 'Primary Wing (Class I – V)',
    subtitle: 'Strong Academic & Creative Roots',
    ageGroup: '6 – 11 Years',
    duration: '5.5 Hours/Day',
    minAge: 6,
    maxAge: 11,
    nepStage: 'Foundational Completion & Preparatory Stage (NEP)',
    image: '/assets/aistudio/WhatsApp_Image_2026-11-19_at_2.33.45_PM__2__d1a082a5.jpeg',
    imageAlt: 'Primary school students presenting their Types of Teeth model at the school Science Exhibition',
    imagePosition: 'center 35%',
    iconKey: 'primary',
    shortDescription:
      'Classes I through V build strong core skills in English, Mathematics, Science Exhibitions, Nepali/Hindi languages, creative arts, and athletics.',
    fullDescription:
      'Our Primary Wing equips young learners from Class I to Class V with conceptual clarity and curiosity. Students build working science exhibition models, master foundational math and languages, and shine in athletics and stage presentations.',
    highlights: [
      'Project-based Science Exhibitions & hands-on models',
      'Strong English, Mathematics, EVS, Nepali & Hindi foundations',
      'Structured outdoor sports, relay races & fitness drills',
      'Public speaking, leadership & value-based education',
    ],
    dailyRhythm: [
      '08:30 AM · Morning Assembly, Thought of the Day & Pledge',
      '09:00 AM · Core Academics (English, Maths, Science & Languages)',
      '11:45 AM · Lunch Break & Outdoor Turf Games',
      '12:30 PM · Lab Models, Art, Reading & Co-Curricular Clubs',
    ],
    classOptions: ['Class I', 'Class II', 'Class III', 'Class IV', 'Class V'],
  },
  {
    id: 'teacher-training',
    title: 'Teacher Training Programme',
    subtitle: 'Zee Learn ECCE & CDE Excellence',
    ageGroup: 'Educators',
    duration: 'Certified Track',
    minAge: 18,
    maxAge: 60,
    nepStage: 'Early Childhood Care & Education (ECCE)',
    image: '/assets/aistudio/WhatsApp_Image_2026-11-19_at_2.30.21_PM__1__c5eb9409.jpeg',
    imageAlt: 'Teachers guiding young children during an outdoor garden art session at Kidzee Globus',
    iconKey: 'teacher',
    shortDescription:
      'Zee Learn Preschool Teacher Training Programme sets high standards in Child Development & Education (CDE) and Early Childhood Care & Education (ECCE).',
    fullDescription:
      'Great schools begin with inspired, empathetic teachers. Through continuous Zee Learn ECCE and CDE mentorship, our educators practice child-centric pedagogy, joyful classroom management, and modern NEP-aligned teaching methods.',
    highlights: [
      'Child Development & Education (CDE) practical pedagogy',
      'Activity-based classroom planning & storytelling techniques',
      'Mentored outdoor & studio learning workshops',
      'Continuous NEP foundational stage certification support',
    ],
    dailyRhythm: [
      'Module 1 · Child Psychology & Early Brain Development',
      'Module 2 · Activity-Based Curriculum & Toy Pedagogy',
      'Module 3 · Classroom Observation & Outdoor Facilitation',
      'Module 4 · Parent Partnership & Assessment Portfolios',
    ],
    classOptions: ['Teacher Training Enquiry'],
  },
];

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'science-teeth',
    src: '/assets/aistudio/WhatsApp_Image_2026-11-19_at_2.33.45_PM__2__d1a082a5.jpeg',
    alt: 'Primary students standing proudly behind their Types of Teeth Science Exhibition model',
    title: 'Science Exhibition — Types of Teeth',
    caption: 'Primary Wing students presenting their 3D dental anatomy model alongside chemistry and atom wall charts.',
    category: 'Science & Learning',
    spanWide: true,
  },
  {
    id: 'garden-art',
    src: '/assets/aistudio/WhatsApp_Image_2026-11-19_at_2.30.21_PM__1__c5eb9409.jpeg',
    alt: 'Teachers and preschool students painting together on sunny garden mats',
    title: 'Sunny Garden Art Studio',
    caption: 'Outdoor creative learning surrounded by the lush greenery of Gayzing with teachers guiding every table.',
    category: 'Art & Craft',
    spanWide: true,
  },
  {
    id: 'umbrella-smile',
    src: '/assets/aistudio/WhatsApp_Image_2026-11-19_at_2.33.45_PM_bd26562c.jpeg',
    alt: 'Smiling girl holding up her colourful paper mosaic umbrella art sheet',
    title: 'Rainbow Mosaic Umbrella',
    caption: 'Joyful fine-motor paper-tearing and pasting craft during monsoon-themed classroom art.',
    category: 'Art & Craft',
  },
  {
    id: 'umbrella-making',
    src: '/assets/aistudio/WhatsApp_Image_2026-11-19_at_2.33.44_PM__1__dde4a426.jpeg',
    alt: 'Young toddler carefully placing purple and green paper pieces onto umbrella craft',
    title: 'Little Hands at Work',
    caption: 'Focused colour-matching and finger coordination practice in our preschool classroom.',
    category: 'Art & Craft',
  },
  {
    id: 'triangle-craft',
    src: '/assets/aistudio/WhatsApp_Image_2026-11-19_at_2.33.45_PM__1__1d17b7eb.jpeg',
    alt: 'Toddler holding up a cardboard yarn-lacing triangle inside the colourful soft playroom',
    title: 'Shape Lacing Discovery',
    caption: 'Learning geometric triangles through tactile yarn threading inside the soft-play activity zone.',
    category: 'Science & Learning',
  },
  {
    id: 'turf-batons',
    src: '/assets/aistudio/WhatsApp_Image_2026-11-19_at_2.30.20_PM_ad5f4622.jpeg',
    alt: 'Young student raising colourful ribbon relay batons on the green sports turf',
    title: 'Ribbon Relay on the Turf',
    caption: 'Outdoor athletics, balance, and cheerful team races under the clear West Sikkim sky.',
    category: 'Sports & Outdoors',
  },
  {
    id: 'turf-victory',
    src: '/assets/aistudio/WhatsApp_Image_2026-11-19_at_2.30.20_PM__1__2e5c8f7c.jpeg',
    alt: 'Cheerful Kidzee student in yellow uniform raising both arms in victory signs on green field',
    title: 'Playfield Spirit',
    caption: 'Active mornings on the turf build stamina, coordination, and beaming confidence.',
    category: 'Sports & Outdoors',
  },
  {
    id: 'morning-assembly',
    src: '/assets/aistudio/WhatsApp_Image_2026-11-19_at_2.33.44_PM_992e7c44.jpeg',
    alt: 'Students standing together with hands over their hearts during morning assembly',
    title: 'Morning Pledge & Unity',
    caption: 'Starting every school day together with gratitude, discipline, and friendly smiles.',
    category: 'Science & Learning',
  },
  {
    id: 'halloween-balloon',
    src: '/assets/aistudio/WhatsApp_Image_2026-11-19_at_2.30.21_PM_6f1b2386.jpeg',
    alt: 'Child with pumpkin face paint holding bright orange balloon during school celebration',
    title: 'Festive Dress-Up Day',
    caption: 'Creative face-painting and joyful thematic celebrations that spark imagination.',
    category: 'Awards & Events',
  },
  {
    id: 'award-aanshik',
    src: '/assets/aistudio/WhatsApp_Image_2026-11-19_at_2.26.26_PM_bf1d7c28.jpeg',
    alt: 'Aanshik Khatiwoda of Class IV holding his Best Costume Presentation certificate',
    title: 'Best Costume Presentation · Class IV',
    caption: 'Aanshik Khatiwoda (Class IV) recognised for creativity, confidence, and expressive stage presence.',
    category: 'Awards & Events',
  },
  {
    id: 'award-ishanvi',
    src: '/assets/aistudio/WhatsApp_Image_2026-11-19_at_2.26.27_PM__1__50a35a5b.jpeg',
    alt: 'Ishanvi Khatiwoda of Playgroup proudly displaying her Best Walk certificate',
    title: 'Best Walk Award · Playgroup',
    caption: 'Ishanvi Khatiwoda (Playgroup) shining on stage with cheerful confidence.',
    category: 'Awards & Events',
  },
  {
    id: 'award-woeadchang',
    src: '/assets/aistudio/WhatsApp_Image_2026-11-19_at_2.26.27_PM__2__987077a0.jpeg',
    alt: 'Woeadchang Khandu Bhutia of Nursery A smiling with Best Dressed certificate',
    title: 'Best Dressed · Nursery A',
    caption: 'Woeadchang Khandu Bhutia (Nursery A) celebrated for enthusiasm and unique style.',
    category: 'Awards & Events',
  },
  {
    id: 'award-arius',
    src: '/assets/aistudio/WhatsApp_Image_2026-11-19_at_2.26.27_PM_13a91a10.jpeg',
    alt: 'Arius Chettri of Class I smiling with Best Dressed certificate',
    title: 'Best Dressed · Class I',
    caption: 'Arius Chettri (Class I) applauded for creative expression during dress-up celebrations.',
    category: 'Awards & Events',
  },
  {
    id: 'award-nimesh',
    src: '/assets/aistudio/WhatsApp_Image_2026-11-19_at_2.26.26_PM__1__20d4d888.jpeg',
    alt: 'Nimesh Rai of Class IV holding his Best Walk certificate in school sweater vest',
    title: 'Best Walk Award · Class IV',
    caption: 'Nimesh Rai (Class IV) honoured for spirited stage presentation and poise.',
    category: 'Awards & Events',
  },
  {
    id: 'award-tayenma',
    src: '/assets/aistudio/WhatsApp_Image_2026-11-19_at_2.26.28_PM_16a1e993.jpeg',
    alt: 'Tayenma D. Limboo of Senior KG B holding Best Costume Presentation certificate',
    title: 'Best Costume · Senior KG B',
    caption: 'Tayenma D. Limboo (Senior KG B) commended for enthusiastic storytelling and creativity.',
    category: 'Awards & Events',
  },
];

export const ALL_CLASS_OPTIONS = [
  'Playgroup',
  'Nursery',
  'Junior KG',
  'Senior KG',
  'Class I',
  'Class II',
  'Class III',
  'Class IV',
  'Class V',
  'Teacher Training Enquiry',
];
