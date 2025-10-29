import { useEffect, useMemo, useRef, type MouseEvent } from 'react';
import { gsap } from './gsapConfig';
import { TechPlanetCanvas } from '../three/TechPlanetCanvas';
import { useMotionStore } from './motionStore';

const stackBadges = ['WordPress', 'React', 'Node', 'Docker', 'Tailwind', 'Cloudflare', 'IA'];

const heading = 'Transforming ideas into digital experiences';

export const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const reduced = useMotionStore((state) => state.reduced);
  const words = useMemo(() => heading.split(' '), []);

  useEffect(() => {
    if (!containerRef.current || reduced) return;
    const ctx = gsap.context(() => {
      gsap.from('.hero-word', {
        yPercent: 120,
        opacity: 0,
        duration: 1,
        ease: 'power4.out',
        stagger: 0.05,
        delay: 0.2
      });
      gsap.from('.hero-subtitle', {
        y: 24,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        delay: 0.8
      });
      if (ctaRef.current) {
        gsap.from(ctaRef.current.children, {
          opacity: 0,
          y: 16,
          duration: 0.8,
          ease: 'power3.out',
          stagger: 0.12,
          delay: 1
        });
      }
    }, containerRef);
    return () => ctx.revert();
  }, [reduced]);

  const onButtonMove = (event: MouseEvent<HTMLButtonElement>) => {
    if (reduced) return;
    const target = event.currentTarget;
    const rect = target.getBoundingClientRect();
    const x = event.clientX - rect.left - rect.width / 2;
    const y = event.clientY - rect.top - rect.height / 2;
    target.dataset.active = 'true';
    gsap.to(target, {
      x: x * 0.2,
      y: y * 0.2,
      duration: 0.3,
      ease: 'power2.out'
    });
  };

  const onButtonLeave = (event: MouseEvent<HTMLButtonElement>) => {
    const target = event.currentTarget;
    target.dataset.active = 'false';
    gsap.to(target, {
      x: 0,
      y: 0,
      duration: 0.4,
      ease: 'elastic.out(1, 0.4)'
    });
  };

  return (
    <section id="home" ref={containerRef} className="relative isolate flex min-h-screen items-center overflow-hidden pt-28">
      <div className="mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-16 px-6 pb-16 md:grid-cols-[1.1fr_1fr]">
        <div className="relative z-10 flex flex-col gap-8">
          <div className="space-y-4">
            <h1 className="text-4xl font-semibold leading-[1.05] text-white drop-shadow-[0_0_18px_rgba(152,0,203,0.25)] sm:text-5xl lg:text-6xl">
              {words.map((word, index) => (
                <span key={word + index} className="hero-word inline-block pr-2">
                  {word}
                </span>
              ))}
            </h1>
            <p className="hero-subtitle max-w-xl text-lg text-white/70">
              Full-Stack Developer — WordPress, React, Node.js, Tailwind, Docker. Gestión de servidores (Apache/Nginx,
              Virtualmin/Plesk), dominios y Cloudflare. Integración de IA.
            </p>
          </div>
          <div ref={ctaRef} className="flex flex-wrap items-center gap-4">
            <button
              type="button"
              onMouseMove={onButtonMove}
              onMouseLeave={onButtonLeave}
              onClick={() => document.querySelector('#portfolio')?.scrollIntoView({ behavior: 'smooth' })}
              className="magnetic inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-base font-semibold text-white shadow-glow transition hover:bg-primary/90"
            >
              Ver trabajos
            </button>
            <a
              href="#contact"
              className="magnetic inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-3 text-base font-semibold text-white/90 transition hover:border-primary/70 hover:text-white"
            >
              Contactar
            </a>
          </div>
          <ul className="flex flex-wrap gap-2 text-xs uppercase tracking-[0.25em] text-white/60">
            {stackBadges.map((badge) => (
              <li key={badge} className="glass rounded-full px-4 py-1 text-[0.7rem] font-medium text-white/80">
                {badge}
              </li>
            ))}
          </ul>
        </div>
        <div className="relative flex h-full min-h-[420px] items-center justify-center">
          <div className="absolute inset-0 rounded-[32px] bg-gradient-to-br from-primary/10 via-white/5 to-cyanSoft/10 blur-3xl" />
          <div className="relative h-full w-full max-w-[420px] rounded-[32px] bg-white/5 p-6 shadow-glow backdrop-blur-xl">
            <div className="relative flex h-full items-center justify-center overflow-hidden rounded-[28px] bg-black/60">
              <div className="absolute inset-0">
                <TechPlanetCanvas />
              </div>
              <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                <div className="halo relative h-40 w-40 rounded-full border border-white/20 bg-gradient-to-b from-white/10 to-transparent">
                  <img
                    src="/assets/marc.jpg"
                    alt="Retrato de Marc Iglesias Simón"
                    className="pointer-events-auto relative h-full w-full rounded-full object-cover object-center"
                  />
                  {/* TODO: Sustituir /assets/marc.jpg por el retrato definitivo */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
