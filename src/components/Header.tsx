import { useEffect, useState } from 'react';
import { MotionToggle } from './MotionToggle';

const navItems = [
  { label: 'Home', href: '#home' },
  { label: 'Portfolio', href: '#portfolio' },
  { label: 'Servicios', href: '#services' },
  { label: 'Sobre mí', href: '#about' },
  { label: 'Testimonios', href: '#testimonials' },
  { label: 'Contacto', href: '#contact' }
];

export const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setIsScrolled(window.scrollY > 24);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`no-print fixed inset-x-0 top-0 z-50 transition-[background,box-shadow,border] ${
        isScrolled ? 'bg-[#050510cc] backdrop-blur-xl border-b border-white/10 shadow-[0_1px_30px_rgba(0,0,0,0.45)]' : 'bg-transparent'
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-6 py-4">
        <a
          href="#home"
          className="text-lg font-semibold uppercase tracking-[0.28em] text-white/90 transition hover:text-white"
        >
          Marc Iglesias
        </a>
        <nav className="hidden items-center gap-1 text-sm font-medium text-white/70 md:flex">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="rounded-full px-3 py-2 transition hover:bg-white/10 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            >
              {item.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <MotionToggle />
        </div>
      </div>
    </header>
  );
};
