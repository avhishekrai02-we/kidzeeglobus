import { useEffect, useState } from 'react';
import {
  ArrowRight,
  Baby,
  BookOpen,
  Blocks,
  CheckCircle2,
  Clock,
  GraduationCap,
  Users,
  X,
} from 'lucide-react';
import { motion } from 'motion/react';
import { PROGRAMMES, type ProgrammeItem } from '../data/schoolData';
import { recommendProgrammeByAge } from '../utils/admissions';

interface ProgrammesSectionProps {
  onApplyForClass: (className: string) => void;
}

const AGE_CHOICES = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

function ProgrammeIcon({ iconKey }: { iconKey: ProgrammeItem['iconKey'] }) {
  switch (iconKey) {
    case 'playgroup':
      return <Baby className="w-6 h-6" />;
    case 'nursery':
      return <Blocks className="w-6 h-6" />;
    case 'kg':
      return <BookOpen className="w-6 h-6" />;
    case 'primary':
      return <GraduationCap className="w-6 h-6" />;
    case 'teacher':
      return <Users className="w-6 h-6" />;
  }
}

export function ProgrammesSection({ onApplyForClass }: ProgrammesSectionProps) {
  const [selectedAge, setSelectedAge] = useState<number>(3);
  const [activeModal, setActiveModal] = useState<ProgrammeItem | null>(null);

  const recommendation = recommendProgrammeByAge(selectedAge);

  useEffect(() => {
    if (!activeModal) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setActiveModal(null);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [activeModal]);

  return (
    <section
      id="programmes"
      className="relative z-20 bg-[#5B158C] text-white py-20 sm:py-28 overflow-hidden"
    >
      {/* Top & bottom wave edges + playful yellow organic curves matching PDF */}
      <svg
        aria-hidden="true"
        viewBox="0 0 1440 100"
        preserveAspectRatio="none"
        className="absolute top-0 left-0 w-full h-14 sm:h-20 pointer-events-none"
      >
        <path
          d="M0,0 L1440,0 L1440,38 C1120,105 420,-10 0,68 Z"
          fill="#FBF8FF"
        />
      </svg>

      <div
        aria-hidden="true"
        className="absolute right-0 top-24 w-72 h-72 rounded-full bg-[#FFE11D] opacity-90 translate-x-1/3 pointer-events-none"
      />
      <div
        aria-hidden="true"
        className="absolute left-0 bottom-20 w-56 h-56 rounded-full bg-[#FFE11D] opacity-80 -translate-x-1/2 pointer-events-none"
      />

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <p className="text-sm font-semibold text-[#FFE11D] tracking-wide">
            Playgroup to Class V · NEP 2020 Foundational & Preparatory Stages
          </p>
          <h2 className="font-display font-bold text-3xl sm:text-5xl text-white text-balance">
            Our Programmes
          </h2>
          <p className="text-base text-white/85 leading-relaxed">
            Every stage is crafted for young learners — combining joyful sensory play, creative arts,
            early literacy, and hands-on primary science.
          </p>
        </div>

        {/* Interactive Age-to-Class Finder */}
        <div className="mt-10 rounded-3xl bg-[#3E0B66] border border-white/15 p-6 sm:p-7 shadow-xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            <div className="lg:col-span-6 space-y-3">
              <h3 className="font-display font-bold text-xl text-white">
                Find the Right Class by Child’s Age
              </h3>
              <p className="text-sm text-white/80">
                Select your child’s age (in years) to see the matching Kidzee Globus class:
              </p>
              <div
                role="group"
                aria-label="Child age in years"
                className="grid grid-cols-5 gap-2 pt-1 max-w-sm"
              >
                {AGE_CHOICES.map((age) => {
                  const isActive = age === selectedAge;
                  return (
                    <button
                      key={age}
                      type="button"
                      aria-pressed={isActive}
                      onClick={() => setSelectedAge(age)}
                      className={`min-w-[44px] h-11 px-3 rounded-xl font-display font-bold text-sm tabular-nums transition-all duration-150 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FFE11D] ${
                        isActive
                          ? 'bg-[#FFE11D] text-[#3E0B66] shadow-md scale-105'
                          : 'bg-white/10 text-white hover:bg-white/20'
                      }`}
                    >
                      {age}y
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="lg:col-span-6 rounded-2xl bg-white text-[#241038] p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1.5">
                <p className="text-xs font-semibold text-[#5B158C]">
                  Recommended for Age {recommendation.ageYears} · {recommendation.duration}
                </p>
                <p className="font-display font-bold text-2xl text-[#241038]">
                  {recommendation.recommendedClass}
                </p>
                <p className="text-sm text-[#5C4670] leading-snug">
                  {recommendation.note}
                </p>
              </div>
              <button
                type="button"
                onClick={() => onApplyForClass(recommendation.recommendedClass)}
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#5B158C] text-white font-display font-semibold text-sm transition-colors duration-150 hover:bg-[#430C6C] whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#5B158C]"
              >
                <span>Apply for {recommendation.recommendedClass}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Student Programmes 2x2 Balanced Grid */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-7">
          {PROGRAMMES.filter((p) => p.id !== 'teacher-training').map((programme, idx) => {
            const isHighlighted = recommendation.programmeId === programme.id;
            return (
              <motion.article
                key={programme.id}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                className={`group flex flex-col rounded-3xl overflow-hidden bg-white text-[#241038] shadow-xl transition-transform duration-200 hover:-translate-y-1.5 ${
                  isHighlighted ? 'ring-4 ring-[#FFE11D]' : ''
                }`}
              >
                {/* Photo Header */}
                <div className="relative h-64 sm:h-72 overflow-hidden bg-[#3E0B66]">
                  <img
                    src={programme.image}
                    alt={programme.imageAlt}
                    referrerPolicy="no-referrer"
                    style={{ objectPosition: programme.imagePosition || 'center 30%' }}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  {/* Scalloped decorative white edge along photo bottom */}
                  <div
                    aria-hidden="true"
                    className="absolute bottom-0 inset-x-0 h-3 scallop-divider"
                  />
                </div>

                {/* Circular Purple Medallion Badge overlapping scalloped border */}
                <div className="relative flex justify-center -mt-9 mb-2 z-10">
                  <div className="w-16 h-16 rounded-full bg-[#5B158C] text-white border-4 border-white shadow-md flex items-center justify-center transition-transform duration-200 group-hover:scale-110">
                    <ProgrammeIcon iconKey={programme.iconKey} />
                  </div>
                </div>

                {/* Card Body */}
                <div className="px-6 pb-6 flex-1 flex flex-col text-center">
                  <h3 className="font-display font-bold text-xl text-[#241038]">
                    {programme.title}
                  </h3>
                  <p className="text-xs font-semibold text-[#5B158C] mt-1">
                    {programme.subtitle}
                  </p>
                  <p className="text-sm text-[#5C4670] mt-3 leading-relaxed flex-1">
                    {programme.shortDescription}
                  </p>

                  <div className="mt-4">
                    <button
                      type="button"
                      onClick={() => setActiveModal(programme)}
                      aria-label={`Read more about ${programme.title}`}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-display font-bold text-[#5B158C] hover:bg-[#F6EFFC] transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#5B158C]"
                    >
                      <span>Read More</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Clean Structured Age / Duration Table matching PDF */}
                  <div className="mt-5 pt-4 border-t border-[#EAE0F5] grid grid-cols-2 divide-x divide-[#EAE0F5] text-left">
                    <div className="pr-3">
                      <p className="text-[11px] font-semibold text-[#7A6490]">
                        Admission Age Group
                      </p>
                      <p className="font-display font-bold text-sm text-[#241038] tabular-nums mt-0.5">
                        {programme.ageGroup}
                      </p>
                    </div>
                    <div className="pl-3">
                      <p className="text-[11px] font-semibold text-[#7A6490]">Duration</p>
                      <p className="font-display font-bold text-sm text-[#241038] tabular-nums mt-0.5">
                        {programme.duration}
                      </p>
                    </div>
                  </div>
                  <p className="text-[11px] text-[#7A6490] mt-3">
                    (based on respective State regulations)
                  </p>
                </div>
              </motion.article>
            );
          })}
        </div>

        {/* Full-Width Featured Educator Track Card (Teacher Training Programme) */}
        {PROGRAMMES.filter((p) => p.id === 'teacher-training').map((programme) => (
          <motion.article
            key={programme.id}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.4 }}
            className="mt-7 rounded-3xl overflow-hidden bg-white text-[#241038] shadow-xl grid grid-cols-1 md:grid-cols-12 items-stretch"
          >
            <div className="md:col-span-5 relative min-h-[220px] bg-[#3E0B66]">
              <img
                src={programme.image}
                alt={programme.imageAlt}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center"
              />
            </div>
            <div className="md:col-span-7 p-6 sm:p-8 flex flex-col justify-center space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-full bg-[#5B158C] text-white flex items-center justify-center shrink-0">
                  <ProgrammeIcon iconKey={programme.iconKey} />
                </div>
                <div>
                  <p className="text-xs font-semibold text-[#5B158C]">{programme.subtitle}</p>
                  <h3 className="font-display font-bold text-xl sm:text-2xl text-[#241038]">
                    {programme.title}
                  </h3>
                </div>
              </div>
              <p className="text-sm sm:text-base text-[#5C4670] leading-relaxed">
                {programme.shortDescription}
              </p>
              <div className="pt-2 flex flex-wrap items-center justify-between gap-4 border-t border-[#EAE0F5]">
                <p className="text-xs font-semibold text-[#7A6490]">
                  {programme.nepStage} · {programme.duration}
                </p>
                <button
                  type="button"
                  onClick={() => setActiveModal(programme)}
                  aria-label={`Read more about ${programme.title}`}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#F6EFFC] text-sm font-display font-bold text-[#5B158C] hover:bg-[#FFE11D] hover:text-[#3E0B66] transition-colors cursor-pointer"
                >
                  <span>Read More</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.article>
        ))}
      </div>

      {/* Programme Detail Modal */}
      {activeModal && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="programme-modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1A072B]/80"
          onClick={() => setActiveModal(null)}
        >
          <div
            className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl bg-white text-[#241038] shadow-2xl border border-[#E7D8F5]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative h-60 sm:h-72 bg-[#3E0B66] overflow-hidden">
              <img
                src={activeModal.image}
                alt={activeModal.imageAlt}
                referrerPolicy="no-referrer"
                style={{ objectPosition: activeModal.imagePosition || 'center 35%' }}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#241038]/85 via-[#241038]/25 to-transparent" />
              <button
                type="button"
                aria-label="Close programme details"
                onClick={() => setActiveModal(null)}
                className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white text-[#241038] flex items-center justify-center shadow-md hover:bg-[#FFE11D] transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="absolute bottom-4 left-6 right-6 text-white">
                <p className="text-xs font-semibold text-[#FFE11D]">
                  {activeModal.nepStage} · {activeModal.ageGroup} · {activeModal.duration}
                </p>
                <h3
                  id="programme-modal-title"
                  className="font-display font-bold text-2xl sm:text-3xl mt-1"
                >
                  {activeModal.title}
                </h3>
              </div>
            </div>

            <div className="p-6 sm:p-8 space-y-6">
              <p className="text-base text-[#453159] leading-relaxed">
                {activeModal.fullDescription}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <h4 className="font-display font-bold text-lg text-[#5B158C]">
                    Learning Highlights
                  </h4>
                  <ul className="space-y-2.5 text-sm text-[#453159]">
                    {activeModal.highlights.map((item) => (
                      <li key={item} className="flex items-start gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-[#16A34A] shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-3">
                  <h4 className="font-display font-bold text-lg text-[#5B158C]">
                    Daily Rhythm
                  </h4>
                  <ul className="space-y-2.5 text-sm text-[#453159]">
                    {activeModal.dailyRhythm.map((slot) => (
                      <li key={slot} className="flex items-start gap-2.5">
                        <Clock className="w-4 h-4 text-[#F97316] shrink-0 mt-0.5" />
                        <span className="tabular-nums">{slot}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="pt-4 border-t border-[#EAE0F5] flex flex-wrap items-center justify-between gap-4">
                <button
                  type="button"
                  onClick={() => setActiveModal(null)}
                  className="px-5 py-2.5 rounded-xl border border-[#D8C5EC] text-sm font-semibold text-[#453159] hover:bg-[#F6EFFC] transition-colors cursor-pointer"
                >
                  Close
                </button>
                <button
                  type="button"
                  onClick={() => {
                    const targetClass = activeModal.classOptions[0] ?? 'Playgroup';
                    setActiveModal(null);
                    onApplyForClass(targetClass);
                  }}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#FFE11D] text-[#3E0B66] font-display font-bold text-sm hover:bg-[#ffea54] transition-colors cursor-pointer"
                >
                  <span>Apply for {activeModal.title}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
