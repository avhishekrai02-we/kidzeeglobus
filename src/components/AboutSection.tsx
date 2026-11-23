import { MapPin, Calendar, GraduationCap, ShieldCheck } from 'lucide-react';
import { motion } from 'motion/react';
import { CORE_VALUES, SCHOOL_INFO } from '../data/schoolData';

const SCHOOL_FACTS = [
  { icon: Calendar, label: 'Established', value: '2017' },
  { icon: GraduationCap, label: 'Classes', value: 'Playgroup – Class V' },
  { icon: ShieldCheck, label: 'Curriculum', value: 'NEP 2020 Aligned' },
  { icon: MapPin, label: 'Campus', value: 'Kyongsa, Gayzing' },
];

export function AboutSection() {
  return (
    <section
      id="about"
      className="relative z-20 py-20 sm:py-24 bg-[#FBF8FF] overflow-hidden"
    >
      {/* Subtle diagonal lavender band inspired by the PDF About section */}
      <div
        aria-hidden="true"
        className="absolute -left-24 top-12 w-80 h-80 rounded-full bg-[#FFE11D]/25 pointer-events-none"
      />

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Photo Showcase — matching the joyful yellow-uniform student in the PDF */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5"
          >
            <div className="relative mx-auto max-w-[400px]">
              <div
                aria-hidden="true"
                className="absolute -inset-3 rounded-[2.25rem] bg-[#5B158C] -rotate-3"
              />
              <div className="relative rounded-[2rem] overflow-hidden border-4 border-[#FFE11D] shadow-xl aspect-[4/5] bg-[#5B158C]">
                <img
                  src={SCHOOL_INFO.aboutPhotoUrl}
                  alt="Joyful Kidzee Globus student in bright yellow polo raising victory signs on the outdoor sports field"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center transition-transform duration-300 hover:scale-105"
                />
              </div>
            </div>
          </motion.div>

          {/* Right Story & Core Values Column */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 space-y-6"
          >
            <div className="space-y-3">
              <p className="text-sm font-semibold text-[#5B158C] tracking-wide">
                Our Story · {SCHOOL_INFO.motto}
              </p>
              <h2 className="font-display font-bold text-3xl sm:text-4xl text-[#241038] text-balance leading-tight">
                About Kidzee Globus International School
              </h2>
            </div>

            <div className="space-y-4 text-base sm:text-lg text-[#453159] leading-relaxed">
              <p>
                Established in 2017, Kidzee Globus International School was founded with a vision to provide quality, holistic, and value-based education to the people of Sikkim. With dedication, passion, and a commitment to nurturing young minds, we have steadily transformed this vision into reality.
              </p>
              <p>
                Today, our school stands as an established and growing institution, strengthened by the trust, faith, and unwavering support of the parents and community of Gyalshing. The increasing number of admissions reflects the confidence families place in us and inspires us to strive for excellence every day.
              </p>
              <p>
                At Kidzee Globus International School, we believe education goes beyond academics. We aim to nurture confident, compassionate, creative, and responsible individuals equipped with the knowledge, skills, and values to succeed in life.
              </p>
              <p>
                As we continue to grow, our commitment remains steadfast—to provide an enriching learning environment, embrace innovation, and uphold the trust of our parents and students, today and for generations to come.
              </p>
            </div>

            {/* 4 Pillars from the School Crest */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              {CORE_VALUES.map((val) => (
                <div
                  key={val.title}
                  className="rounded-2xl bg-white border border-[#E7D8F5] p-5 transition-transform duration-150 hover:-translate-y-0.5"
                >
                  <h3
                    className="font-display font-bold text-lg"
                    style={{ color: val.accent }}
                  >
                    {val.title}
                  </h3>
                  <p className="text-sm text-[#5C4670] mt-1.5 leading-relaxed">
                    {val.summary}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Full-Width Key Facts Strip below the 2-column split */}
        <div className="mt-14 grid grid-cols-2 lg:grid-cols-4 gap-4 rounded-2xl bg-[#5B158C] text-white p-6 sm:p-7 shadow-lg">
          {SCHOOL_FACTS.map((fact) => {
            const Icon = fact.icon;
            return (
              <div
                key={fact.label}
                className="flex items-start gap-3.5 sm:px-3"
              >
                <div className="w-10 h-10 rounded-xl bg-[#FFE11D] text-[#3E0B66] flex items-center justify-center shrink-0">
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-medium text-white/75">{fact.label}</p>
                  <p className="font-display font-bold text-base sm:text-lg text-white tabular-nums mt-0.5">
                    {fact.value}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
