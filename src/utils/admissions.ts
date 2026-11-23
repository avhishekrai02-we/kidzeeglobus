import type { GalleryCategory, GalleryItem } from '../data/schoolData';

export interface AgeRecommendation {
  ageYears: number;
  recommendedClass: string;
  programmeId: string;
  programmeTitle: string;
  duration: string;
  nepStage: string;
  note: string;
}

export interface AdmissionFormInput {
  parentName: string;
  phone: string;
  email: string;
  childName: string;
  applyingClass: string;
  message: string;
}

export interface AdmissionValidationResult {
  valid: boolean;
  errors: Partial<Record<keyof AdmissionFormInput, string>>;
}

export function recommendProgrammeByAge(ageYears: number): AgeRecommendation {
  const clamped = Math.max(2, Math.min(11, Math.round(ageYears)));

  if (clamped === 2) {
    return {
      ageYears: clamped,
      recommendedClass: 'Playgroup',
      programmeId: 'playgroup',
      programmeTitle: 'PlayGroup',
      duration: '3 Hours/Day',
      nepStage: 'Early Childhood Explorers',
      note: 'Gentle sensory play, music, shape crafts, and warm social settling for 2–3 year olds.',
    };
  }
  if (clamped === 3) {
    return {
      ageYears: clamped,
      recommendedClass: 'Nursery',
      programmeId: 'nursery',
      programmeTitle: 'Nursery',
      duration: '3 Hours/Day',
      nepStage: 'NEP Foundational Stage · Level 1',
      note: 'Phonics sounds, early numbers, paper-mosaic arts, and joyful pre-writing skills.',
    };
  }
  if (clamped === 4) {
    return {
      ageYears: clamped,
      recommendedClass: 'Junior KG',
      programmeId: 'kg',
      programmeTitle: 'Junior KG / Senior KG',
      duration: '4 Hours/Day',
      nepStage: 'NEP Foundational Stage · Level 2',
      note: 'Reading readiness, story comprehension, hands-on counting, and outdoor turf play.',
    };
  }
  if (clamped === 5) {
    return {
      ageYears: clamped,
      recommendedClass: 'Senior KG',
      programmeId: 'kg',
      programmeTitle: 'Junior KG / Senior KG',
      duration: '4 Hours/Day',
      nepStage: 'NEP Foundational Stage · Level 3',
      note: 'Confident sentence writing, early mental math, and smooth readiness for Class I.',
    };
  }

  const gradeMap: Record<number, string> = {
    6: 'Class I',
    7: 'Class II',
    8: 'Class III',
    9: 'Class IV',
    10: 'Class V',
    11: 'Class V',
  };

  const recommendedClass = gradeMap[clamped] ?? 'Class I';
  return {
    ageYears: clamped,
    recommendedClass,
    programmeId: 'primary',
    programmeTitle: 'Primary Wing (Class I – V)',
    duration: '5.5 Hours/Day',
    nepStage: clamped <= 8 ? 'NEP Foundational Completion' : 'NEP Preparatory Stage',
    note: `Strong foundations in English, Mathematics, Science Exhibitions, Languages, Art & Sports for ${recommendedClass}.`,
  };
}

export function normalizeIndianPhone(raw: string): string {
  const digits = raw.replace(/\D/g, '');
  if (digits.length === 12 && digits.startsWith('91')) {
    return digits.slice(2);
  }
  if (digits.length === 11 && digits.startsWith('0')) {
    return digits.slice(1);
  }
  return digits;
}

export function validateAdmissionForm(input: AdmissionFormInput): AdmissionValidationResult {
  const errors: Partial<Record<keyof AdmissionFormInput, string>> = {};

  if (input.parentName.trim().length < 2) {
    errors.parentName = 'Please enter the parent or guardian full name.';
  }

  const normalizedPhone = normalizeIndianPhone(input.phone);
  if (!/^[6-9]\d{9}$/.test(normalizedPhone)) {
    errors.phone = 'Please enter a valid 10-digit mobile number.';
  }

  const trimmedEmail = input.email.trim();
  if (trimmedEmail.length > 0 && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
    errors.email = 'Please enter a valid email address or leave this field blank.';
  }

  if (input.childName.trim().length < 2) {
    errors.childName = 'Please enter the student’s name.';
  }

  if (!input.applyingClass.trim()) {
    errors.applyingClass = 'Please select the class you are enquiring for.';
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}

export function generateInquiryReference(childName: string, sequenceSeed: number): string {
  const clean = childName.replace(/[^a-zA-Z]/g, '').toUpperCase();
  const initials = (clean.slice(0, 2) || 'KG').padEnd(2, 'X');
  const code = String(1000 + (Math.abs(Math.floor(sequenceSeed)) % 9000));
  return `KGIS-${initials}-${code}`;
}

export function filterGalleryItems(
  items: GalleryItem[],
  category: GalleryCategory,
): GalleryItem[] {
  if (category === 'All') {
    return items;
  }
  return items.filter((item) => item.category === category);
}
