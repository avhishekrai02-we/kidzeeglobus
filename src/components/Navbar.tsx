import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { SCHOOL_INFO } from '../data/schoolData';

interface NavbarProps {
  onEnrolClick: () => void;
  onNavigate?: (href: string) => void;
}

const NAV_LINKS = [
  { label: 'Home', href: '#home' },
  { label: 'About Us', href: './about.html' },
  { label: 'Programmes', href: '#programmes' },
  { label: 'Activities', href: '#activities' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Admissions', href: '#admissions' },
];

export function Navbar({ onEnrolClick, onNavigate }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleNavClick = (href?: string) => {
    setMobileOpen(false);
    if (href && onNavigate) {
      onNavigate(href);
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-[#4B0F78] border-b border-white/10 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-2 sm:gap-8">
        {/* Zone 1: Single-line brand mark + crest */}
        <a
          href="#home"
          onClick={() => handleNavClick('#home')}
          className="flex items-center gap-3 text-white font-display font-bold text-lg sm:text-xl tracking-tight whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#FFE11D] rounded-md"
        >
          <img
            src={SCHOOL_INFO.crestUrl}
            alt="Kidzee Globus International School Crest"
            referrerPolicy="no-referrer"
            className="h-11 w-11 object-contain shrink-0"
          />
          <span>{SCHOOL_INFO.shortName}</span>
        </a>

        {/* Zone 2: 5 clean single-line text nav links */}
        <nav
          aria-label="Primary Navigation"
          className="hidden md:flex items-center gap-5 lg:gap-7 text-sm font-semibold text-white/90"
        >
          {NAV_LINKS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => handleNavClick(item.href)}
              className="relative py-1 whitespace-nowrap shrink-0 transition-colors duration-150 hover:text-[#FFE11D] after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-0.5 after:w-0 after:bg-[#FFE11D] after:transition-all after:duration-150 hover:after:w-full focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#FFE11D] rounded-sm"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Zone 3: 1 Primary Action + Mobile toggle */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={() => {
              setMobileOpen(false);
              onEnrolClick();
            }}
            className="px-3.5 py-2 sm:px-5 sm:py-2.5 rounded-xl bg-[#FFE11D] text-[#3E0B66] font-display font-bold text-xs sm:text-sm tracking-wide shadow-sm transition-transform duration-150 hover:bg-[#ffea54] active:scale-95 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            Enrol Now
          </button>

          <button
            type="button"
            aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((prev) => !prev)}
            className="md:hidden inline-flex items-center justify-center w-11 h-11 rounded-xl text-white hover:bg-white/10 transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FFE11D]"
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileOpen && (
        <nav
          aria-label="Mobile Navigation"
          className="md:hidden bg-[#3E0B66] border-t border-white/10 px-4 py-4"
        >
          <div className="flex flex-col gap-1">
            {NAV_LINKS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => handleNavClick(item.href)}
                className="px-3 py-3 rounded-lg text-base font-semibold text-white hover:bg-white/10 hover:text-[#FFE11D] transition-colors"
              >
                {item.label}
              </a>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}
