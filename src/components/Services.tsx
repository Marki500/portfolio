import { useEffect, useRef } from 'react';
import { gsap } from './gsapConfig';
import { SectionTitle } from './SectionTitle';
import { useMotionStore } from './motionStore';

const services = [
  {
    title: 'WordPress avanzado',
    description: 'Temas a medida, bloques Gutenberg personalizados, multisite, WooCommerce y automatizaciones.',
    icon: '🪐'
  },
  {
    title: 'Apps React / Node',
    description: 'SPAs y PWAs escalables con arquitecturas modulares, APIs GraphQL/REST y pruebas automatizadas.',
    icon: '⚙️'
  },
  {
    title: 'Performance & SEO técnico',
    description: 'Auditorías Core Web Vitals, optimización de renderizado, accesibilidad AA/AAA y microdatos.',
    icon: '🚀'
  },
  {
    title: 'DevOps & Cloud',
    description: 'Docker, orquestación en servidores dedicados/ VPS, pipelines CI/CD, Cloudflare y seguridad avanzada.',
    icon: '☁️'
  }
];

export const Services = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const reduced = useMotionStore((state) => state.reduced);

  useEffect(() => {
    if (!sectionRef.current || reduced) return;
    const ctx = gsap.context(() => {
      gsap.from('[data-service-card]', {
        opacity: 0,
        y: 40,
        duration: 1,
        ease: 'power3.out',
        stagger: 0.18,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%'
        }
      });
    }, sectionRef);
    return () => ctx.revert();
  }, [reduced]);

  return (
    <section id="services" ref={sectionRef} className="relative py-24">
      <div className="mx-auto flex max-w-6xl flex-col gap-16 px-6">
        <SectionTitle
          eyebrow="Servicios"
          title="Soluciones enfocadas en impacto"
          description="Desde plataformas WordPress de alto rendimiento hasta productos digitales complejos, acompaño todo el ciclo de vida."
        />
        <div className="grid gap-8 md:grid-cols-2">
          {services.map((service) => (
            <article
              key={service.title}
              data-service-card
              className="glass card-hover flex h-full flex-col gap-4 rounded-3xl border border-white/5 bg-white/5 p-8"
            >
              <span className="text-4xl" aria-hidden>
                {service.icon}
              </span>
              <h3 className="text-2xl font-semibold text-white">{service.title}</h3>
              <p className="text-sm text-white/70">{service.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
