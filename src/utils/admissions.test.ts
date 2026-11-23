import test from 'node:test';
import assert from 'node:assert/strict';
import {
  filterGalleryItems,
  generateInquiryReference,
  normalizeIndianPhone,
  recommendProgrammeByAge,
  validateAdmissionForm,
} from './admissions';
import { GALLERY_ITEMS } from '../data/schoolData';

test('recommendProgrammeByAge maps ages 2 to 11 accurately across Playgroup to Class V', () => {
  assert.equal(recommendProgrammeByAge(2).recommendedClass, 'Playgroup');
  assert.equal(recommendProgrammeByAge(3).recommendedClass, 'Nursery');
  assert.equal(recommendProgrammeByAge(4).recommendedClass, 'Junior KG');
  assert.equal(recommendProgrammeByAge(5).recommendedClass, 'Senior KG');
  assert.equal(recommendProgrammeByAge(6).recommendedClass, 'Class I');
  assert.equal(recommendProgrammeByAge(8).recommendedClass, 'Class III');
  assert.equal(recommendProgrammeByAge(10).recommendedClass, 'Class V');
  assert.equal(recommendProgrammeByAge(10).programmeId, 'primary');
});

test('normalizeIndianPhone strips +91, leading 0, and punctuation cleanly', () => {
  assert.equal(normalizeIndianPhone('+91 98320-12345'), '9832012345');
  assert.equal(normalizeIndianPhone('09832012345'), '9832012345');
  assert.equal(normalizeIndianPhone('98320 12345'), '9832012345');
});

test('validateAdmissionForm catches missing required fields and invalid phone/email', () => {
  const emptyResult = validateAdmissionForm({
    parentName: '',
    phone: '12345',
    email: 'not-an-email',
    childName: '',
    applyingClass: '',
    message: '',
  });
  assert.equal(emptyResult.valid, false);
  assert.ok(emptyResult.errors.parentName);
  assert.ok(emptyResult.errors.phone);
  assert.ok(emptyResult.errors.email);
  assert.ok(emptyResult.errors.childName);
  assert.ok(emptyResult.errors.applyingClass);

  const validResult = validateAdmissionForm({
    parentName: 'Karma Bhutia',
    phone: '+91 98321 44556',
    email: '',
    childName: 'Tenzin Bhutia',
    applyingClass: 'Class II',
    message: 'Looking for morning campus visit.',
  });
  assert.equal(validResult.valid, true);
  assert.deepEqual(validResult.errors, {});
});

test('generateInquiryReference creates deterministic KGIS reference code', () => {
  assert.equal(generateInquiryReference('Aanshik', 42), 'KGIS-AA-1042');
  assert.equal(generateInquiryReference('Ishanvi', 5123), 'KGIS-IS-6123');
});

test('filterGalleryItems returns full list for All and exact matches for specific category', () => {
  assert.equal(filterGalleryItems(GALLERY_ITEMS, 'All').length, GALLERY_ITEMS.length);
  const artItems = filterGalleryItems(GALLERY_ITEMS, 'Art & Craft');
  assert.ok(artItems.length > 0);
  assert.ok(artItems.every((item) => item.category === 'Art & Craft'));
});
