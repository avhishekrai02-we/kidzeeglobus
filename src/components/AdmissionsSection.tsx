import { useEffect, useState, type FormEvent } from 'react';
import { CheckCircle2, Clock, MapPin, Phone, Send } from 'lucide-react';
import { ALL_CLASS_OPTIONS, SCHOOL_INFO } from '../data/schoolData';
import {
  generateInquiryReference,
  validateAdmissionForm,
  type AdmissionFormInput,
} from '../utils/admissions';

interface AdmissionsSectionProps {
  preselectedClass: string;
}

interface SubmittedEnquiry {
  referenceId: string;
  parentName: string;
  childName: string;
  applyingClass: string;
  phone: string;
}

const ADMISSION_STEPS = [
  {
    step: '01. Submit Online Enquiry',
    detail: 'Share your child’s name, age group, and preferred class from Playgroup to Class V.',
  },
  {
    step: '02. Visit Our Kyongsa Campus',
    detail: 'Meet our caring teachers near District Court, Gayzing and tour our playrooms and classrooms.',
  },
  {
    step: '03. Welcome to Kidzee Globus',
    detail: 'Complete simple documentation and begin a joyful lifetime of learning.',
  },
];

export function AdmissionsSection({ preselectedClass }: AdmissionsSectionProps) {
  const [form, setForm] = useState<AdmissionFormInput>({
    parentName: '',
    phone: '',
    email: '',
    childName: '',
    applyingClass: preselectedClass || 'Playgroup',
    message: '',
  });
  const [errors, setErrors] = useState<Partial<Record<keyof AdmissionFormInput, string>>>({});
  const [submitted, setSubmitted] = useState<SubmittedEnquiry | null>(null);
  const [submissionCount, setSubmissionCount] = useState(1);

  useEffect(() => {
    if (preselectedClass) {
      setForm((prev) => ({ ...prev, applyingClass: preselectedClass }));
      setSubmitted(null);
    }
  }, [preselectedClass]);

  const updateField = <K extends keyof AdmissionFormInput>(
    field: K,
    value: AdmissionFormInput[K],
  ) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const validation = validateAdmissionForm(form);
    if (!validation.valid) {
      setErrors(validation.errors);
      return;
    }

    const referenceId = generateInquiryReference(
      form.childName,
      2026 + submissionCount * 137,
    );
    setSubmitted({
      referenceId,
      parentName: form.parentName.trim(),
      childName: form.childName.trim(),
      applyingClass: form.applyingClass,
      phone: form.phone.trim(),
    });
    setSubmissionCount((prev) => prev + 1);
    setErrors({});
  };

  const handleReset = () => {
    setSubmitted(null);
    setForm({
      parentName: '',
      phone: '',
      email: '',
      childName: '',
      applyingClass: preselectedClass || 'Playgroup',
      message: '',
    });
    setErrors({});
  };

  return (
    <>
      <section
        id="admissions"
        className="relative z-20 py-12 sm:py-24 bg-[#FBF8FF]"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            {/* Left Info & Steps Column */}
            <div className="lg:col-span-5 space-y-6">
              <div className="space-y-3">
                <div className="flex flex-wrap items-center gap-2">
                  <p className="text-sm font-semibold text-[#5B158C] tracking-wide">
                    Admissions Open · Academic Session
                  </p>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFE11D] text-[#3E0B66] text-xs font-display font-bold shadow-sm -rotate-2">
                    🎒 Admissions 2026–27 Open
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white text-[#5B158C] border border-[#E7D8F5] text-xs font-display font-bold shadow-sm rotate-1">
                    🏫 Campus Tours Mon–Sat
                  </span>
                </div>
                <h2 className="font-display font-bold text-3xl sm:text-4xl text-[#241038] text-balance leading-tight">
                  Begin Your Child’s Journey With Us
                </h2>
                <p className="text-base text-[#5C4670] leading-relaxed">
                  Admissions are open for <strong className="text-[#241038]">Playgroup through Class V</strong> at our
                  Kyongsa campus. Fill in the enquiry form and our admissions coordinator will call you back.
                </p>
              </div>

              {/* 3-Step Admission Journey */}
              <div className="space-y-4 pt-2">
                {ADMISSION_STEPS.map((item) => (
                  <div
                    key={item.step}
                    className="rounded-2xl bg-white border border-[#E7D8F5] p-4"
                  >
                    <h3 className="font-display font-bold text-base text-[#5B158C]">
                      {item.step}
                    </h3>
                    <p className="text-sm text-[#5C4670] mt-1 leading-relaxed">
                      {item.detail}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Validated Admissions Form Column */}
            <div className="lg:col-span-7">
              <div className="rounded-3xl bg-white border border-[#E7D8F5] shadow-xl p-5 sm:p-9">
                {submitted ? (
                  <div
                    role="status"
                    aria-live="polite"
                    className="py-6 text-center space-y-5"
                  >
                    <div className="w-16 h-16 rounded-full bg-[#ECFDF3] text-[#15803D] mx-auto flex items-center justify-center">
                      <CheckCircle2 className="w-9 h-9" />
                    </div>
                    <div className="space-y-2">
                      <p className="text-sm font-semibold text-[#15803D]">
                        Enquiry Received · Reference {submitted.referenceId}
                      </p>
                      <h3 className="font-display font-bold text-2xl sm:text-3xl text-[#241038]">
                        Thank You, {submitted.parentName}!
                      </h3>
                      <p className="text-base text-[#5C4670] max-w-md mx-auto">
                        We have recorded your admission enquiry for{' '}
                        <strong className="text-[#241038]">{submitted.childName}</strong> (
                        <strong className="text-[#5B158C]">{submitted.applyingClass}</strong>). Our
                        Kyongsa campus office will reach out on{' '}
                        <span className="font-semibold text-[#241038] tabular-nums">
                          {submitted.phone}
                        </span>{' '}
                        to schedule your school visit.
                      </p>
                    </div>
                    <div className="pt-2">
                      <button
                        type="button"
                        onClick={handleReset}
                        className="px-6 py-3 rounded-xl bg-[#5B158C] text-white font-display font-bold text-sm hover:bg-[#3E0B66] transition-colors cursor-pointer"
                      >
                        Submit Another Enquiry
                      </button>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} noValidate className="space-y-5">
                    <div className="space-y-1">
                      <h3 className="font-display font-bold text-2xl text-[#241038]">
                        Admission Enquiry Form
                      </h3>
                      <p className="text-sm text-[#5C4670]">
                        Fields marked with * are required.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label
                          htmlFor="parent-name"
                          className="block text-sm font-semibold text-[#241038] mb-1.5"
                        >
                          Parent / Guardian Name *
                        </label>
                        <input
                          id="parent-name"
                          type="text"
                          value={form.parentName}
                          onChange={(e) => updateField('parentName', e.target.value)}
                          placeholder="e.g., Pemba Bhutia"
                          aria-invalid={Boolean(errors.parentName)}
                          className="w-full rounded-xl border border-[#D8C5EC] bg-[#FBF8FF] px-4 py-3 text-sm text-[#241038] placeholder:text-[#8E7AA3] focus:outline-none focus:border-[#5B158C] focus:ring-2 focus:ring-[#5B158C]/20"
                        />
                        {errors.parentName && (
                          <p role="alert" className="text-xs font-semibold text-[#C81E1E] mt-1.5">
                            {errors.parentName}
                          </p>
                        )}
                      </div>

                      <div>
                        <label
                          htmlFor="parent-phone"
                          className="block text-sm font-semibold text-[#241038] mb-1.5"
                        >
                          Mobile Number *
                        </label>
                        <input
                          id="parent-phone"
                          type="tel"
                          value={form.phone}
                          onChange={(e) => updateField('phone', e.target.value)}
                          placeholder="e.g., 98320 12345"
                          aria-invalid={Boolean(errors.phone)}
                          className="w-full rounded-xl border border-[#D8C5EC] bg-[#FBF8FF] px-4 py-3 text-sm text-[#241038] placeholder:text-[#8E7AA3] tabular-nums focus:outline-none focus:border-[#5B158C] focus:ring-2 focus:ring-[#5B158C]/20"
                        />
                        {errors.phone && (
                          <p role="alert" className="text-xs font-semibold text-[#C81E1E] mt-1.5">
                            {errors.phone}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label
                          htmlFor="child-name"
                          className="block text-sm font-semibold text-[#241038] mb-1.5"
                        >
                          Child’s Full Name *
                        </label>
                        <input
                          id="child-name"
                          type="text"
                          value={form.childName}
                          onChange={(e) => updateField('childName', e.target.value)}
                          placeholder="e.g., Tenzin Bhutia"
                          aria-invalid={Boolean(errors.childName)}
                          className="w-full rounded-xl border border-[#D8C5EC] bg-[#FBF8FF] px-4 py-3 text-sm text-[#241038] placeholder:text-[#8E7AA3] focus:outline-none focus:border-[#5B158C] focus:ring-2 focus:ring-[#5B158C]/20"
                        />
                        {errors.childName && (
                          <p role="alert" className="text-xs font-semibold text-[#C81E1E] mt-1.5">
                            {errors.childName}
                          </p>
                        )}
                      </div>

                      <div>
                        <label
                          htmlFor="applying-class"
                          className="block text-sm font-semibold text-[#241038] mb-1.5"
                        >
                          Class Applying For *
                        </label>
                        <select
                          id="applying-class"
                          value={form.applyingClass}
                          onChange={(e) => updateField('applyingClass', e.target.value)}
                          aria-invalid={Boolean(errors.applyingClass)}
                          className="w-full rounded-xl border border-[#D8C5EC] bg-[#FBF8FF] px-4 py-3 text-sm text-[#241038] focus:outline-none focus:border-[#5B158C] focus:ring-2 focus:ring-[#5B158C]/20"
                        >
                          {ALL_CLASS_OPTIONS.map((opt) => (
                            <option key={opt} value={opt}>
                              {opt}
                            </option>
                          ))}
                        </select>
                        {errors.applyingClass && (
                          <p role="alert" className="text-xs font-semibold text-[#C81E1E] mt-1.5">
                            {errors.applyingClass}
                          </p>
                        )}
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="parent-email"
                        className="block text-sm font-semibold text-[#241038] mb-1.5"
                      >
                        Email Address (Optional)
                      </label>
                      <input
                        id="parent-email"
                        type="email"
                        value={form.email}
                        onChange={(e) => updateField('email', e.target.value)}
                        placeholder="parent@example.com"
                        aria-invalid={Boolean(errors.email)}
                        className="w-full rounded-xl border border-[#D8C5EC] bg-[#FBF8FF] px-4 py-3 text-sm text-[#241038] placeholder:text-[#8E7AA3] focus:outline-none focus:border-[#5B158C] focus:ring-2 focus:ring-[#5B158C]/20"
                      />
                      {errors.email && (
                        <p role="alert" className="text-xs font-semibold text-[#C81E1E] mt-1.5">
                          {errors.email}
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="enquiry-message"
                        className="block text-sm font-semibold text-[#241038] mb-1.5"
                      >
                        Questions or Preferred Visit Day (Optional)
                      </label>
                      <textarea
                        id="enquiry-message"
                        rows={3}
                        value={form.message}
                        onChange={(e) => updateField('message', e.target.value)}
                        placeholder="Let us know if you would like a morning campus tour or transport information."
                        className="w-full rounded-xl border border-[#D8C5EC] bg-[#FBF8FF] px-4 py-3 text-sm text-[#241038] placeholder:text-[#8E7AA3] focus:outline-none focus:border-[#5B158C] focus:ring-2 focus:ring-[#5B158C]/20"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full inline-flex items-center justify-center gap-2.5 px-6 py-4 rounded-2xl bg-[#FFE11D] text-[#3E0B66] font-display font-bold text-base shadow-md transition-all duration-150 hover:bg-[#ffea54] active:scale-[0.99] cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#5B158C]"
                    >
                      <Send className="w-4 h-4" />
                      <span>Submit Admission Enquiry</span>
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>

          {/* Full-Width Campus Visit Details Strip */}
          <div className="mt-8 w-full grid grid-cols-1 lg:grid-cols-3 gap-5 sm:gap-6 rounded-3xl bg-[#5B158C] text-white p-5 sm:p-8 shadow-xl border border-white/10">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-[#FFE11D] text-[#3E0B66] flex items-center justify-center shrink-0 shadow-md">
                <MapPin className="w-6 h-6" />
              </div>
              <div>
                <p className="font-display font-bold text-sm text-[#FFE11D] uppercase tracking-wider">
                  Campus Address
                </p>
                <p className="text-sm sm:text-base text-white/95 mt-0.5 font-medium">
                  {SCHOOL_INFO.currentLocation}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-[#FFE11D] text-[#3E0B66] flex items-center justify-center shrink-0 shadow-md">
                <Clock className="w-6 h-6" />
              </div>
              <div>
                <p className="font-display font-bold text-sm text-[#FFE11D] uppercase tracking-wider">
                  Admissions Desk Hours
                </p>
                <p className="text-sm sm:text-base text-white/95 mt-0.5 font-medium">
                  {SCHOOL_INFO.admissionsDeskHours}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-[#FFE11D] text-[#3E0B66] flex items-center justify-center shrink-0 shadow-md">
                <Phone className="w-6 h-6" />
              </div>
              <div>
                <p className="font-display font-bold text-sm text-[#FFE11D] uppercase tracking-wider">
                  School Office
                </p>
                <p className="text-sm sm:text-base text-white/95 mt-0.5 font-medium">
                  {SCHOOL_INFO.schoolHours}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quiet School Footer */}
      <footer className="relative z-20 bg-[#3E0B66] text-white border-t border-white/10 py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div className="flex items-center gap-4">
            <img
              src={SCHOOL_INFO.crestUrl}
              alt="Kidzee Globus International School Crest"
              referrerPolicy="no-referrer"
              className="w-14 h-14 object-contain shrink-0"
            />
            <div>
              <p className="font-display font-bold text-lg text-white">
                {SCHOOL_INFO.name}
              </p>
              <p className="text-sm text-white/80">
                {SCHOOL_INFO.currentLocation}
              </p>
              <p className="text-xs font-semibold text-[#FFE11D] mt-1">
                {SCHOOL_INFO.motto} · Est. {SCHOOL_INFO.establishedYear}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-sm text-white/80">
            <a href="#home" className="hover:text-[#FFE11D] transition-colors">
              Home
            </a>
            <a href="#about" className="hover:text-[#FFE11D] transition-colors">
              About Us
            </a>
            <a href="#programmes" className="hover:text-[#FFE11D] transition-colors">
              Programmes
            </a>
            <a href="#gallery" className="hover:text-[#FFE11D] transition-colors">
              Gallery
            </a>
            <a href="#admissions" className="hover:text-[#FFE11D] transition-colors">
              Admissions
            </a>
          </div>
        </div>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 pt-6 border-t border-white/10 text-xs text-white/65 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p>© {new Date().getFullYear()} {SCHOOL_INFO.name}, Gayzing, West Sikkim.</p>
          <p>Playgroup · Nursery · Junior KG · Senior KG · Classes I – V</p>
        </div>
      </footer>
    </>
  );
}
