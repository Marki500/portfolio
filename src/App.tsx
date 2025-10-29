import { useEffect, useMemo } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Portfolio } from './components/Portfolio';
import { Services } from './components/Services';
import { About } from './components/About';
import { Testimonials } from './components/Testimonials';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { useMotionStore } from './components/motionStore';

const backgroundStars = Array.from({ length: 80 }, (_, index) => index);

const randomPosition = (index: number) => {
  const top = Math.random() * 100;
  const left = (index * 37) % 100;
  const size = Math.random() * 3 + 1;
  const delay = Math.random() * 4;
  return { top: `${top}%`, left: `${left}%`, size, delay };
};

export default function App() {
  const setup = useMotionStore((state) => state.setup);

  const starPositions = useMemo(
    () => backgroundStars.map((star, index) => ({ key: star, ...randomPosition(index + star) })),
    []
  );

  useEffect(() => {
    const dispose = setup();
    return () => dispose();
  }, [setup]);

  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <div className="pointer-events-none fixed inset-0 -z-10 opacity-50">
        {starPositions.map(({ key, top, left, size, delay }) => {
          return (
            <span
              key={key}
              className="absolute block rounded-full bg-white/40"
              style={{
                top,
                left,
                width: size,
                height: size,
                animation: `pulse ${6 + delay}s ease-in-out infinite`,
                animationDelay: `${delay}s`,
                boxShadow: '0 0 12px rgba(152,0,203,0.35)'
              }}
            />
          );
        })}
      </div>
      <Header />
      <main className="flex flex-col gap-12">
        <Hero />
        <Portfolio />
        <Services />
        <About />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
