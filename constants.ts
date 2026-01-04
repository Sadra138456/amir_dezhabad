import { PersonalInfo, Education, TeachingCourse, Article, Thesis, Language } from './types';

// Placeholder image (Professional man in suit) - Replace with your actual image path or URL
const PROFILE_IMAGE_URL = "https://sadracheraghi.ir/pics/dezhabad.jpg";

// CONFIGURATION
export const ADMIN_PASSWORD = "admin123";
export const STORAGE_KEY_IMAGE = "dr_dezhabad_profile_image";

// --- FARSI DATA ---
const PERSONAL_INFO_FA: PersonalInfo = {
  name: "امیر دژآباد",
  group: "گروه آموزشی زراعت",
  field: "دامپزشکی",
  rank: "استادیار",
  email: "drdezhabadvet@gmail.com",
  academicEmail: "drdezhabadvet@gmail.com",
  profileImage: PROFILE_IMAGE_URL
};

const EDUCATION_HISTORY_FA: Education[] = [
  {
    id: 1,
    degree: "دکترای حرفه‌ای",
    field: "دکترای عمومی دامپزشکی",
    university: "دانشگاه آزاد اسلامی واحد کرج",
    year: "1381"
  },
  {
    id: 2,
    degree: "دکترای تخصصی",
    field: "انگل‌شناسی دامپزشکی",
    university: "دانشگاه آزاد اسلامی واحد علوم و تحقیقات تهران",
    year: "1387"
  }
];

const TEACHING_COURSES_FA: TeachingCourse[] = [
  { id: 1, title: "درمانگاه درونی" },
  { id: 2, title: "کارورزی در روستا" },
  { id: 3, title: "انگل‌شناسی کرم‌ها" },
  { id: 4, title: "انگل‌شناسی تک‌یاخته و بندپا" },
  { id: 5, title: "سم‌شناسی" },
  { id: 6, title: "بیماری‌های طیور" },
  { id: 7, title: "همه‌گیری‌شناسی" },
  { id: 8, title: "ایمنی و سرم‌شناسی" },
  { id: 9, title: "آسیب‌شناسی" },
  { id: 10, title: "اصول تکنیک‌های اختصاصی انگل‌شناسی" },
  { id: 11, title: "انگل‌شناسی کاردانی دامپزشکی" },
];

const THESES_FA: Thesis[] = [
  {
    id: 1,
    title: "مطالعه فون گلسهای شهرستان چالوس براساس مطالعات مرفولوژیک و ساختار و رگبال ها",
    student: "ریتا بزرگ نیا",
    role: "مشاور",
    university: "دانشگاه آزاد واحد چالوس",
    year: "1394",
    level: "کارشناسی ارشد"
  }
];

// --- ENGLISH DATA ---
const PERSONAL_INFO_EN: PersonalInfo = {
  name: "Dr. Amir Dezhabad",
  group: "Department of Agronomy",
  field: "Veterinary Medicine",
  rank: "Assistant Professor",
  email: "drdezhabadvet@gmail.com",
  academicEmail: "drdezhabadvet@gmail.com",
  profileImage: PROFILE_IMAGE_URL
};

const EDUCATION_HISTORY_EN: Education[] = [
  {
    id: 1,
    degree: "DVM",
    field: "Doctor of Veterinary Medicine",
    university: "Islamic Azad University, Karaj Branch",
    year: "2002"
  },
  {
    id: 2,
    degree: "PhD",
    field: "Veterinary Parasitology",
    university: "Islamic Azad University, Science and Research Branch, Tehran",
    year: "2008"
  }
];

const TEACHING_COURSES_EN: TeachingCourse[] = [
  { id: 1, title: "Internal Medicine Clinic" },
  { id: 2, title: "Rural Internship" },
  { id: 3, title: "Helminthology" },
  { id: 4, title: "Protozoology and Entomology" },
  { id: 5, title: "Toxicology" },
  { id: 6, title: "Poultry Diseases" },
  { id: 7, title: "Epidemiology" },
  { id: 8, title: "Immunology and Serology" },
  { id: 9, title: "Pathology" },
  { id: 10, title: "Principles of Specialized Parasitology Techniques" },
  { id: 11, title: "Veterinary Associate Parasitology" },
];

const THESES_EN: Thesis[] = [
  {
    id: 1,
    title: "Study of the fauna of Chalus city based on morphological studies and structure",
    student: "Rita Bozorgnia",
    role: "Advisor",
    university: "Islamic Azad University, Chalus Branch",
    year: "2015",
    level: "MSc"
  }
];

// Articles are shared but we can localize specific fields if needed.
// For now, titles remain as they are (mixed), but year and journal could be localized.
// Since we don't have full translations for all article titles, we'll use the existing ones.
export const ARTICLES: Article[] = [
  {
    id: 1,
    title: "Secretary excretory and somatic immunogenic antigens profiles and adult faciolo spp",
    authors: "Dr. Amir Dezhabad, Dr. Abdolhossein Dalimi Asl",
    journal: "Razi Institute Journal",
    year: "1401",
    type: "journal"
  },
  {
    id: 2,
    title: "Amino acid Profile of Kutun, Silver…",
    authors: "Dr. Amir Dezhabad, Dr. Morteza Sam Daliri",
    journal: "African Journal",
    year: "1397",
    type: "journal"
  },
  {
    id: 3,
    title: "رابطه بین وزن و میزان کادمیوم در ماهی کپور معمولی (Cyprinus carpio) دریای خزر",
    authors: "دژآباد امیر، خواجه رحیمی امیر اقبال",
    journal: "فیزیولوژی و تکوین جانوری (علوم زیستی)",
    year: "1396",
    volume: "11",
    page: "73",
    type: "journal"
  },
  {
    id: 4,
    title: "رابطه بین وزن و میزان کادمیوم در ماهی کپور معمولی",
    authors: "دکتر امیر دژآباد، سید رسول تودار",
    journal: "فصلنامه تخصصی علوم زیستی موسسه رازی",
    year: "1395",
    type: "journal"
  },
  {
    id: 5,
    title: "مقایسه پروفایل اسیدهای چرب و آمینه ماهیان قزل آلا و کپور",
    authors: "دکتر امیر دژآباد، دکتر محمدرضا قمی",
    journal: "دانشگاه آزاد اسلامی چالوس",
    year: "1390",
    type: "journal"
  },
  {
    id: 6,
    title: "مقایسه نمایه پروتئینی فاسیولا و متاسرکر آن با استفاده از روش های بیوشیمیایی",
    authors: "دژآباد امیر، دلیمی اصل عبدالحسین، حقوقی راد ناصر، مدنی رسول، معتمدی غلامرضا، کریمی غلامرضا",
    journal: "علوم دامپزشکی ایران",
    year: "1388",
    volume: "3",
    page: "49",
    type: "journal"
  },
  {
    id: 7,
    title: "مقایسه پروفایل پروتئینی انگل فاسیولا با مقایسه آن با روش های بیوشیمیایی",
    authors: "دکتر امیر دژآباد، دکتر عبدالحسین دیلمی",
    journal: "اولین کنگره انگل شناسی منطقه ای",
    year: "1387",
    type: "journal"
  },
  {
    id: 8,
    title: "مقایسه پروفایل پروتئینی انگل فاسیولا با متاسرکر با استفاده از روشهای بیوشیمیایی",
    authors: "امیر دژاباد، عبدالحسین دیلمی اصل، ناصر حقوقی، فریبا گلچین",
    journal: "اولین کنگره انگل شناسی و بیماریهای انگلی کرج",
    year: "1387",
    type: "conference"
  }
];

export const UI_LABELS = {
  fa: {
    dashboard: 'خلاصه وضعیت',
    profile: 'بیوگرافی',
    education: 'تحصیلات',
    publications: 'پژوهش‌ها',
    teaching: 'تدریس',
    thesis: 'پایان‌نامه‌ها',
    role: 'عضو هیئت علمی و پژوهشگر',
    
    // Dashboard
    yearsExperience: 'سال سابقه',
    articlesCount: 'مقاله علمی',
    thesesCount: 'پایان‌نامه',
    researcherDesc: 'پژوهشگر پیشرو در زمینه تحقیقات بالینی و سلامت عمومی.',
    publishedArticles: 'مقالات منتشر شده',
    journalConf: 'ژورنال و کنفرانس',
    specialty: 'حوزه تخصصی',
    lastDegree: 'آخرین مدرک',
    rank: 'مرتبه علمی',
    clinicName: 'کلینیک دامپزشکی پارسیان',
    clinicSub: 'تحت نظر دکتر امیر دژآباد',
    clinicDesc: 'ارائه دهنده خدمات تخصصی درمانی، جراحی و مشاوره‌ای حیوانات خانگی و دام‌های بزرگ.',
    getDirections: 'مسیریابی در نقشه',
    researchAnalysis: 'تحلیل فعالیت‌های پژوهشی',
    researchDist: 'توزیع سالانه انتشار مقالات علمی',
    contactInfo: 'اطلاعات تماس',
    personalEmail: 'ایمیل شخصی',
    academicEmail: 'ایمیل آکادمیک',
    socials: 'شبکه‌های اجتماعی',
    articlesChart: 'تعداد مقالات',

    // Profile
    bioTitle: 'بیوگرافی و اطلاعات شخصی',
    bioSubtitle: 'مشخصات فردی و جایگاه علمی',
    nameLabel: 'نام و نام خانوادگی',
    rankLabel: 'مرتبه علمی',
    groupLabel: 'گروه آموزشی',
    fieldLabel: 'رشته تحصیلی',
    contactMe: 'ارتباط با من',
    emailLabel: 'ایمیل',
    uniEmailLabel: 'ایمیل دانشگاهی',

    // Education
    eduTitle: 'سوابق تحصیلی',
    
    // Teaching
    teachingTitle: 'دروس تدریس شده',

    // Publications
    pubTitle: 'آثار پژوهشی',
    pubSubtitle: 'فهرست مقالات منتشر شده در مجلات و کنفرانس‌های معتبر',
    filterAll: 'همه',
    filterJournal: 'مجلات',
    filterConf: 'کنفرانس‌ها',
    searchPlaceholder: 'جستجو در عنوان یا نویسنده...',

    // Thesis
    thesisTitle: 'پایان‌نامه‌های تحت راهنمایی و مشاوره',
    student: 'دانشجو',
    thesisRole: 'نقش',
    level: 'مقطع',
    
    // Footer
    footerRights: 'تمامی حقوق برای این وب‌سایت محفوظ است.',
    footerRole: 'عضو هیئت علمی و پژوهشگر دامپزشکی'
  },
  en: {
    dashboard: 'Dashboard',
    profile: 'Biography',
    education: 'Education',
    publications: 'Publications',
    teaching: 'Teaching',
    thesis: 'Theses',
    role: 'Faculty Member & Researcher',
    
    // Dashboard
    yearsExperience: 'Years Exp.',
    articlesCount: 'Articles',
    thesesCount: 'Theses',
    researcherDesc: 'Leading researcher in clinical studies and public health.',
    publishedArticles: 'Published Articles',
    journalConf: 'Journals & Conferences',
    specialty: 'Specialty',
    lastDegree: 'Latest Degree',
    rank: 'Academic Rank',
    clinicName: 'Parsian Veterinary Clinic',
    clinicSub: 'Supervised by Dr. Amir Dezhabad',
    clinicDesc: 'Providing specialized therapeutic, surgical, and consulting services for pets and large animals.',
    getDirections: 'Get Directions',
    researchAnalysis: 'Research Activity Analysis',
    researchDist: 'Annual distribution of scientific publications',
    contactInfo: 'Contact Information',
    personalEmail: 'Personal Email',
    academicEmail: 'Academic Email',
    socials: 'Social Media',
    articlesChart: 'No. of Articles',

    // Profile
    bioTitle: 'Biography & Personal Info',
    bioSubtitle: 'Personal details and academic status',
    nameLabel: 'Full Name',
    rankLabel: 'Academic Rank',
    groupLabel: 'Department',
    fieldLabel: 'Field of Study',
    contactMe: 'Contact Me',
    emailLabel: 'Email',
    uniEmailLabel: 'University Email',

    // Education
    eduTitle: 'Educational History',
    
    // Teaching
    teachingTitle: 'Teaching Courses',

    // Publications
    pubTitle: 'Research Publications',
    pubSubtitle: 'List of articles published in prestigious journals and conferences',
    filterAll: 'All',
    filterJournal: 'Journals',
    filterConf: 'Conferences',
    searchPlaceholder: 'Search title or author...',

    // Thesis
    thesisTitle: 'Supervised & Advised Theses',
    student: 'Student',
    thesisRole: 'Role',
    level: 'Level',
    
    // Footer
    footerRights: 'All rights reserved.',
    footerRole: 'Faculty Member & Researcher'
  }
};

export const getData = (lang: Language) => {
  const isFa = lang === 'fa';
  return {
    personalInfo: isFa ? PERSONAL_INFO_FA : PERSONAL_INFO_EN,
    education: isFa ? EDUCATION_HISTORY_FA : EDUCATION_HISTORY_EN,
    teaching: isFa ? TEACHING_COURSES_FA : TEACHING_COURSES_EN,
    theses: isFa ? THESES_FA : THESES_EN,
    articles: ARTICLES, // Shared for now
    ui: isFa ? UI_LABELS.fa : UI_LABELS.en
  };
};

// Default export for backward compatibility if needed, but preferred to use getData
export const PERSONAL_INFO = PERSONAL_INFO_FA;
export const EDUCATION_HISTORY = EDUCATION_HISTORY_FA;
export const TEACHING_COURSES = TEACHING_COURSES_FA;
export { THESES_FA as THESES }; // exported as THESES
