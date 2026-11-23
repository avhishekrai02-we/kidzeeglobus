import { ArrowRight, RotateCw } from 'lucide-react';
import { motion } from 'motion/react';
import { SCHOOL_INFO } from '../data/schoolData';
import type { ToySpec } from '../utils/scroll3d';

interface HeroSectionProps {
  onEnrolClick: () => void;
  onSpinToy: (toyId: ToySpec['id'] | 'all') => void;
  lastSpunToy: string | null;
}

const TOY_TRIGGERS: Array<{ id: ToySpec['id']; label: string }> = [
  { id: 'abc-block', label: 'ABC Block' },
  { id: 'plane', label: 'Biplane' },
  { id: 'pencil', label: 'Craft Pencil' },
  { id: 'star', label: 'Gold Star' },
  { id: 'stacker', label: 'Ring Stacker' },
];

export function HeroSection({ onEnrolClick, onSpinToy, lastSpunToy }: HeroSectionProps) {
  return (
    <section
      id="home"
      className="relative overflow-hidden bg-[#5B158C] text-white pt-10 pb-24 sm:pt-14 sm:pb-32"
    >
      {/* Sweeping Sunshine Yellow & Deep Purple Wave Art echoing the school PDF theme */}
      <svg
        aria-hidden="true"
        viewBox="0 0 1440 720"
        preserveAspectRatio="none"
        className="hidden lg:block absolute inset-0 w-full h-full pointer-events-none select-none"
      >
        <path
          d="M0,0 L1440,0 L1440,560 C1180,680 860,640 600,560 C330,475 130,570 0,520 Z"
          fill="#4A0E75"
          opacity="0.55"
        />
        <path
          d="M960,60 C1140,-10 1380,30 1440,150 L1440,390 C1310,435 1130,360 1030,455 C910,570 760,695 520,710 L1440,720 L1440,540 C1310,500 1200,560 1120,470 C1020,355 1120,255 1290,225 C1355,212 1370,130 1275,115 C1165,98 1060,150 960,60 Z"
          fill="#FFE11D"
        />
        {/* Crisp concentric geometric circle & playful squiggle motifs tucked cleanly beside portrait */}
        <g stroke="#FFFFFF" strokeOpacity="0.22" fill="none" strokeWidth="1.5">
          <circle cx="845" cy="115" r="22" />
          <circle cx="845" cy="115" r="34" />
          <circle cx="845" cy="115" r="46" />
          <circle cx="845" cy="115" r="58" />
        </g>
        <path
          d="M780,550 Q795,532 810,550 T840,550"
          fill="none"
          stroke="#FFE11D"
          strokeWidth="6"
          strokeLinecap="round"
        />
        <circle cx="1325" cy="465" r="26" fill="#FFE11D" stroke="#241038" strokeWidth="3" />
      </svg>

      {/* Bottom white/lavender curved wave transition */}
      <svg
        aria-hidden="true"
        viewBox="0 0 1440 120"
        preserveAspectRatio="none"
        className="absolute bottom-0 left-0 w-full h-16 sm:h-24 pointer-events-none"
      >
        <path
          d="M0,40 C360,130 980,-20 1440,68 L1440,120 L0,120 Z"
          fill="#FBF8FF"
        />
      </svg>

      <div className="relative z-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Content Column */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 space-y-6"
          >
            <p className="text-sm sm:text-base font-semibold text-[#FFE11D] tracking-wide">
              Admission Open · {SCHOOL_INFO.gradesOffered} · Gayzing, West Sikkim
            </p>

            <h1
              className="font-display font-bold text-white leading-[1.08] tracking-tight text-balance"
              style={{ fontSize: 'clamp(2.4rem, 4.6vw, 4.1rem)' }}
            >
              {SCHOOL_INFO.tagline}
            </h1>

            {/* Mobile Layout (< lg): Stacked and centered */}
            <div className="block lg:hidden space-y-4 pt-1">
              <p className="text-sm sm:text-base text-white/90 leading-relaxed">
                Welcome to <strong className="font-semibold text-white">{SCHOOL_INFO.name}</strong> in
                Kyongsa, Gayzing. A joyful, colourful learning home where curious toddlers and primary
                learners up to Class V grow with confidence, creativity, and care.
              </p>

              <div className="flex flex-wrap items-center gap-3 pt-1">
                <button
                  type="button"
                  onClick={onEnrolClick}
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-[#FFE11D] text-[#3E0B66] font-display font-bold text-sm sm:text-base shadow-lg transition-transform active:scale-95 whitespace-nowrap shrink-0 cursor-pointer"
                >
                  <span>Enrol Now</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <a
                  href="#programmes"
                  className="inline-flex items-center px-4 py-3 rounded-2xl border-2 border-white/35 text-white font-display font-semibold text-xs sm:text-sm whitespace-nowrap shrink-0 transition-colors hover:bg-white/10"
                >
                  Explore Programmes
                </a>
              </div>

              {/* Mobile Student Portrait Showcase */}
              <div className="relative w-full max-w-sm sm:max-w-md mx-auto pt-3 flex justify-center items-end">
                <div
                  aria-hidden="true"
                  className="absolute w-64 h-64 rounded-full bg-[#FFE11D]/20 -bottom-4 left-1/2 -translate-x-1/2 pointer-events-none"
                />
                <img
                  src={SCHOOL_INFO.heroPhotoUrl}
                  alt="Kidzee Globus Student"
                  referrerPolicy="no-referrer"
                  className="w-full h-auto max-h-[380px] sm:max-h-[460px] object-contain drop-shadow-2xl select-none relative z-10"
                />
              </div>
            </div>

            {/* Desktop Content (lg:block): 2-column layout */}
            <div className="hidden lg:block space-y-6">
              <p className="text-base sm:text-lg text-white/90 max-w-xl leading-relaxed">
                Welcome to <strong className="font-semibold text-white">{SCHOOL_INFO.name}</strong> in
                Kyongsa, Gayzing. A joyful, colourful learning home where curious toddlers and primary
                learners up to Class V grow with confidence, creativity, and care.
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <button
                  type="button"
                  onClick={onEnrolClick}
                  className="group inline-flex items-center gap-3 px-7 py-4 rounded-2xl bg-[#FFE11D] text-[#3E0B66] font-display font-bold text-lg shadow-lg transition-all duration-150 hover:bg-[#ffea54] hover:-translate-y-0.5 active:translate-y-0 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-white"
                >
                  <span>Enrol Now</span>
                  <ArrowRight className="w-5 h-5 transition-transform duration-150 group-hover:translate-x-1" />
                </button>

                <a
                  href="#programmes"
                  className="inline-flex items-center px-6 py-4 rounded-2xl border-2 border-white/35 text-white font-display font-semibold text-base transition-colors duration-150 hover:bg-white/10 hover:border-white/70 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#FFE11D]"
                >
                  Explore Programmes
                </a>
              </div>
            </div>

            {/* Interactive 3D Toy Bar (Desktop) */}
            <div className="hidden lg:block pt-4 border-t border-white/15">
              <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                <p className="text-sm font-medium text-white/85">
                  Scroll to spin our 3D classroom toys, or tap any toy to twirl it now:
                </p>
                {lastSpunToy && (
                  <span
                    aria-live="polite"
                    className="text-xs font-semibold text-[#FFE11D]"
                  >
                    Spinning {lastSpunToy}
                  </span>
                )}
              </div>
              <div className="flex flex-wrap items-center gap-2">
                {TOY_TRIGGERS.map((toy) => (
                  <button
                    key={toy.id}
                    type="button"
                    onClick={() => onSpinToy(toy.id)}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#3E0B66]/85 border border-white/20 text-xs sm:text-sm font-semibold text-white transition-all duration-150 hover:bg-[#FFE11D] hover:text-[#3E0B66] hover:border-[#FFE11D] active:scale-95 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FFE11D]"
                  >
                    <RotateCw className="w-3.5 h-3.5" />
                    <span>{toy.label}</span>
                  </button>
                ))}
                <button
                  type="button"
                  onClick={() => onSpinToy('all')}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white/15 border border-[#FFE11D]/60 text-xs sm:text-sm font-semibold text-[#FFE11D] transition-all duration-150 hover:bg-[#FFE11D] hover:text-[#3E0B66] active:scale-95 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                >
                  <span>Spin All</span>
                </button>
              </div>
            </div>
          </motion.div>

          {/* Right Featured Student Portrait Column - Desktop */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="hidden lg:flex lg:col-span-5 justify-center lg:justify-end"
          >
            <div className="relative w-full max-w-[620px] xl:max-w-[700px] flex justify-center items-end">
              <img
                src={SCHOOL_INFO.heroPhotoUrl}
                alt="Kidzee Globus International School student in uniform holding a bright orange balloon"
                referrerPolicy="no-referrer"
                className="w-full h-auto max-h-[720px] xl:max-h-[820px] object-contain drop-shadow-2xl select-none"
                style={{ transform: 'translateY(32px) scale(1.25)', transformOrigin: 'bottom center' }}
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
