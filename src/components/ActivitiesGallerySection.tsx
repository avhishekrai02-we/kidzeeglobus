import { useEffect, useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  Award,
  FlaskConical,
  Palette,
  Trophy,
  X,
} from 'lucide-react';
import { motion } from 'motion/react';
import {
  GALLERY_ITEMS,
  type GalleryCategory,
  type GalleryItem,
} from '../data/schoolData';
import { filterGalleryItems } from '../utils/admissions';

const CATEGORIES: GalleryCategory[] = [
  'All',
  'Art & Craft',
  'Sports & Outdoors',
  'Science & Learning',
  'Awards & Events',
];

const ACTIVITY_PILLARS: Array<{
  title: string;
  description: string;
  category: GalleryCategory;
  icon: typeof Palette;
  bg: string;
  fg: string;
}> = [
  {
    title: 'Science & Discovery',
    description: 'Working student models like Types of Teeth, nature walks, and interactive classroom charts.',
    category: 'Science & Learning',
    icon: FlaskConical,
    bg: '#F3E8FF',
    fg: '#5B158C',
  },
  {
    title: 'Garden & Craft Studio',
    description: 'Sunny outdoor painting mats, umbrella paper mosaics, and tactile shape lacing.',
    category: 'Art & Craft',
    icon: Palette,
    bg: '#FFF4E5',
    fg: '#C2410C',
  },
  {
    title: 'Turf Sports & Relays',
    description: 'Ribbon baton relays, balance drills, and energetic morning games on green turf.',
    category: 'Sports & Outdoors',
    icon: Trophy,
    bg: '#ECFDF3',
    fg: '#15803D',
  },
  {
    title: 'Celebrations & Awards',
    description: 'Halloween dress-up walks, stage presentations, and proud certificates for every class.',
    category: 'Awards & Events',
    icon: Award,
    bg: '#FEF9C3',
    fg: '#854D0E',
  },
];

const PAGE_SIZE = 6;

export function ActivitiesGallerySection() {
  const [selectedCategory, setSelectedCategory] = useState<GalleryCategory>('All');
  const [pageIndex, setPageIndex] = useState(0);
  const [showAll, setShowAll] = useState(false);
  const [lightboxItem, setLightboxItem] = useState<GalleryItem | null>(null);

  const filteredItems = filterGalleryItems(GALLERY_ITEMS, selectedCategory);
  const totalPages = Math.max(1, Math.ceil(filteredItems.length / PAGE_SIZE));
  const safePage = Math.min(pageIndex, totalPages - 1);

  const visibleItems = showAll
    ? filteredItems
    : filteredItems.slice(safePage * PAGE_SIZE, safePage * PAGE_SIZE + PAGE_SIZE);

  const handleCategoryChange = (cat: GalleryCategory) => {
    setSelectedCategory(cat);
    setPageIndex(0);
  };

  const handleNextPage = () => {
    setShowAll(false);
    setPageIndex((prev) => (prev + 1) % totalPages);
  };

  const handlePrevPage = () => {
    setShowAll(false);
    setPageIndex((prev) => (prev - 1 + totalPages) % totalPages);
  };

  const lightboxIndex = lightboxItem
    ? filteredItems.findIndex((i) => i.id === lightboxItem.id)
    : -1;

  const stepLightbox = (delta: number) => {
    if (lightboxIndex < 0 || filteredItems.length === 0) return;
    const nextIdx = (lightboxIndex + delta + filteredItems.length) % filteredItems.length;
    setLightboxItem(filteredItems[nextIdx]);
  };

  useEffect(() => {
    if (!lightboxItem) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightboxItem(null);
      if (e.key === 'ArrowRight') stepLightbox(1);
      if (e.key === 'ArrowLeft') stepLightbox(-1);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  });

  return (
    <>
      {/* Activities Pillar Band */}
      <section id="activities" className="relative z-20 py-20 bg-[#FBF8FF]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="space-y-2 max-w-2xl">
              <p className="text-sm font-semibold text-[#5B158C] tracking-wide">
                Learning Beyond Textbooks
              </p>
              <h2 className="font-display font-bold text-3xl sm:text-4xl text-[#241038] text-balance">
                Joyful Activities Every Week
              </h2>
            </div>
            <p className="text-sm text-[#5C4670] max-w-md">
              Tap any activity pillar below to jump straight to our students in action.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {ACTIVITY_PILLARS.map((pillar) => {
              const Icon = pillar.icon;
              return (
                <button
                  key={pillar.title}
                  type="button"
                  onClick={() => {
                    handleCategoryChange(pillar.category);
                    document.getElementById('gallery')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="text-left rounded-2xl bg-white border border-[#E7D8F5] p-6 transition-all duration-150 hover:-translate-y-1 hover:border-[#5B158C] hover:shadow-md cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#5B158C]"
                >
                  <div
                    className="w-12 h-12 rounded-2xl flex items-center justify-center mb-4"
                    style={{ backgroundColor: pillar.bg, color: pillar.fg }}
                  >
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-display font-bold text-lg text-[#241038]">
                    {pillar.title}
                  </h3>
                  <p className="text-sm text-[#5C4670] mt-2 leading-relaxed">
                    {pillar.description}
                  </p>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Gallery Showcase Band — matching the deep purple + sunshine yellow PDF Gallery */}
      <section
        id="gallery"
        className="relative z-20 py-20 sm:py-24 bg-[#5B158C] text-white overflow-hidden"
      >
        {/* Playful yellow organic wave sweep on bottom right echoing PDF */}
        <div
          aria-hidden="true"
          className="absolute -right-24 bottom-8 w-96 h-96 rounded-full bg-[#FFE11D] opacity-90 pointer-events-none"
        />

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div className="space-y-2">
              <p className="text-sm font-semibold text-[#FFE11D] tracking-wide">
                Campus Life in Gayzing, West Sikkim
              </p>
              <h2 className="font-display font-bold text-3xl sm:text-5xl text-white">
                Gallery
              </h2>
            </div>

            {/* Interactive Category Filter Segmented Bar */}
            <div
              role="group"
              aria-label="Filter gallery photos by activity"
              className="flex flex-wrap items-center gap-2 bg-[#3E0B66] p-1.5 rounded-2xl border border-white/15"
            >
              {CATEGORIES.map((category) => {
                const count = filterGalleryItems(GALLERY_ITEMS, category).length;
                const active = selectedCategory === category;
                return (
                  <button
                    key={category}
                    type="button"
                    aria-pressed={active}
                    onClick={() => handleCategoryChange(category)}
                    className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FFE11D] ${
                      active
                        ? 'bg-[#FFE11D] text-[#3E0B66]'
                        : 'text-white/85 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    {category}{' '}
                    <span className="tabular-nums opacity-75">({count})</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Photo Mosaic Grid */}
          <div
            data-testid="gallery-grid"
            className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
          >
            {visibleItems.map((item) => (
              <motion.button
                key={item.id}
                type="button"
                layout
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.28 }}
                onClick={() => setLightboxItem(item)}
                aria-label={`View photo: ${item.title}`}
                className={`group relative rounded-2xl overflow-hidden bg-[#3E0B66] border-2 border-white/25 text-left shadow-lg cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#FFE11D] ${
                  item.spanWide && visibleItems.length >= 4 ? 'sm:col-span-2 lg:col-span-2 aspect-[16/10]' : 'aspect-[4/4]'
                }`}
              >
                <img
                  src={item.src}
                  alt={item.alt}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-top transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#1A072B]/90 via-[#1A072B]/45 to-transparent p-4 pt-12">
                  <p className="text-[11px] font-semibold text-[#FFE11D]">
                    {item.category}
                  </p>
                  <p className="font-display font-bold text-base text-white leading-snug mt-0.5">
                    {item.title}
                  </p>
                </div>
              </motion.button>
            ))}
          </div>

          {/* Swipe / Pagination Controls echoing the PDF's "Swipe →" control */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            {totalPages > 1 && !showAll && (
              <button
                type="button"
                onClick={handlePrevPage}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-[#3E0B66] border border-white/25 text-white font-display font-semibold text-sm hover:bg-white/15 transition-colors cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Previous</span>
              </button>
            )}

            {totalPages > 1 && !showAll && (
              <button
                type="button"
                onClick={handleNextPage}
                className="inline-flex items-center gap-2 px-7 py-3 rounded-full bg-[#FFE11D] text-[#3E0B66] font-display font-bold text-sm shadow-md hover:bg-[#ffea54] transition-transform duration-150 active:scale-95 cursor-pointer"
              >
                <span>Swipe Next</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}

            {filteredItems.length > PAGE_SIZE && (
              <button
                type="button"
                onClick={() => setShowAll((prev) => !prev)}
                className="px-5 py-3 rounded-full bg-white/15 border border-white/25 text-white font-semibold text-sm hover:bg-white/25 transition-colors cursor-pointer"
              >
                {showAll
                  ? 'Show Paged View'
                  : `View All ${filteredItems.length} Photos`}
              </button>
            )}

            {!showAll && totalPages > 1 && (
              <span className="text-xs font-semibold text-white/80 tabular-nums">
                Page {safePage + 1} of {totalPages}
              </span>
            )}
          </div>
        </div>
      </section>

      {/* Interactive Lightbox Dialog */}
      {lightboxItem && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="lightbox-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#140522]/90"
          onClick={() => setLightboxItem(null)}
        >
          <div
            className="relative w-full max-w-4xl rounded-3xl overflow-hidden bg-white text-[#241038] shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative bg-[#1E0833] flex items-center justify-center max-h-[68vh] overflow-hidden">
              <img
                src={lightboxItem.src}
                alt={lightboxItem.alt}
                referrerPolicy="no-referrer"
                className="max-h-[68vh] w-auto object-contain"
              />
              <button
                type="button"
                aria-label="Close photo lightbox"
                onClick={() => setLightboxItem(null)}
                className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white text-[#241038] flex items-center justify-center shadow-md hover:bg-[#FFE11D] transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              {filteredItems.length > 1 && (
                <>
                  <button
                    type="button"
                    aria-label="Previous photo"
                    onClick={() => stepLightbox(-1)}
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/95 text-[#241038] flex items-center justify-center shadow-md hover:bg-[#FFE11D] transition-colors cursor-pointer"
                  >
                    <ArrowLeft className="w-5 h-5" />
                  </button>
                  <button
                    type="button"
                    aria-label="Next photo"
                    onClick={() => stepLightbox(1)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/95 text-[#241038] flex items-center justify-center shadow-md hover:bg-[#FFE11D] transition-colors cursor-pointer"
                  >
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </>
              )}
            </div>

            <div className="p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <p className="text-xs font-semibold text-[#5B158C]">
                  {lightboxItem.category} · Photo {lightboxIndex + 1} of {filteredItems.length}
                </p>
                <h3 id="lightbox-title" className="font-display font-bold text-xl text-[#241038] mt-1">
                  {lightboxItem.title}
                </h3>
                <p className="text-sm text-[#5C4670] mt-1">{lightboxItem.caption}</p>
              </div>
              <button
                type="button"
                onClick={() => setLightboxItem(null)}
                className="px-5 py-2.5 rounded-xl bg-[#5B158C] text-white font-display font-semibold text-sm hover:bg-[#3E0B66] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
