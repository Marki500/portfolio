import { useEffect, useRef } from 'react';
import { gsap } from './gsapConfig';
import { SectionTitle } from './SectionTitle';
import { useMotionStore } from './motionStore';

const testimonials = [
  {
    quote: 'Marc elevó nuestro sitio a otro nivel: migró a headless sin downtime, automatizó despliegues y optimizó el SEO técnico. Siempre un paso por delante.',
    name: 'Laura Martínez',
    role: 'CMO · Gravity Agency'
  },
  {
    quote: 'Su visión full-stack simplificó procesos internos. Montó infraestructura en Docker, pipelines y monitorización: ahora escalamos sin sobresaltos.',
    name: 'Carlos Ruiz',
    role: 'CTO · Atlas DevOps'
  },
  {
    quote: 'Destaco la comunicación y detalle pixel-perfect. Cada entrega venía documentada y con foco en accesibilidad y rendimiento.',
    name: 'Elena García',
    role: 'Product Manager · Lumen AI'
  }
];

export const Testimonials = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const reduced = useMotionStore((state) => state.reduced);

  useEffect(() => {
    if (!sectionRef.current || reduced) return;
    const ctx = gsap.context(() => {
      gsap.from('[data-testimonial]', {
        opacity: 0,
        y: 32,
        duration: 1,
        ease: 'power3.out',
        stagger: 0.2,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%'
        }
      });
    }, sectionRef);
    return () => ctx.revert();
  }, [reduced]);

  return (
    <section id="testimonials" ref={sectionRef} className="relative py-24">
      <div className="mx-auto flex max-w-6xl flex-col gap-16 px-6">
        <SectionTitle
          eyebrow="Testimonios"
          title="Confianza respaldada por resultados"
          description="Clientes y partners que han vivido transformaciones digitales reales."
        />
        <div className="grid gap-8 md:grid-cols-3">
          {testimonials.map((testimonial) => (
            <blockquote
              key={testimonial.name}
              data-testimonial
              className="glass card-hover flex h-full flex-col gap-6 rounded-3xl border border-white/5 bg-white/5 p-8 text-white/80"
            >
              <p className="text-sm leading-relaxed">“{testimonial.quote}”</p>
              <footer className="mt-auto text-sm text-white/60">
                <p className="font-semibold text-white">{testimonial.name}</p>
                <p>{testimonial.role}</p>
              </footer>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  );
};
