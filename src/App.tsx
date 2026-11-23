import { useCallback, useState } from 'react';
import { AboutSection } from './components/AboutSection';
import { ActivitiesGallerySection } from './components/ActivitiesGallerySection';
import { AdmissionsSection } from './components/AdmissionsSection';
import { HeroSection } from './components/HeroSection';
import { Navbar } from './components/Navbar';
import { ProgrammesSection } from './components/ProgrammesSection';
import { ScrollToyCanvas } from './components/ScrollToyCanvas';
import type { ToySpec } from './utils/scroll3d';

export default function App() {
  const [preselectedClass, setPreselectedClass] = useState<string>('Playgroup');
  const [spinRequest, setSpinRequest] = useState<{
    toyId: ToySpec['id'] | 'all';
    nonce: number;
  } | null>(null);
  const [lastSpunToy, setLastSpunToy] = useState<string | null>(null);

  const scrollToAdmissions = useCallback((className?: string) => {
    if (className) {
      setPreselectedClass(className);
    }
    const el = document.getElementById('admissions');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  const handleSpinToy = useCallback((toyId: ToySpec['id'] | 'all') => {
    setSpinRequest((prev) => ({
      toyId,
      nonce: (prev?.nonce ?? 0) + 1,
    }));
  }, []);

  return (
    <div className="min-h-screen bg-[#FBF8FF] text-[#241038] relative overflow-x-clip">
      {/* Persistent Scroll-Driven 3D Playful Toys Canvas */}
      <ScrollToyCanvas
        spinRequest={spinRequest}
        onToySpun={(label) => setLastSpunToy(label)}
      />

      <Navbar onEnrolClick={() => scrollToAdmissions()} />

      <main>
        <HeroSection
          onEnrolClick={() => scrollToAdmissions()}
          onSpinToy={handleSpinToy}
          lastSpunToy={lastSpunToy}
        />
        <AboutSection />
        <ProgrammesSection onApplyForClass={(cls) => scrollToAdmissions(cls)} />
        <ActivitiesGallerySection />
        <AdmissionsSection preselectedClass={preselectedClass} />
      </main>
    </div>
  );
}
