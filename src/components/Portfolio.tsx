import { useEffect, useRef } from 'react';
import { gsap } from './gsapConfig';
import { SectionTitle } from './SectionTitle';
import { useMotionStore } from './motionStore';

const projects = [
  {
    title: 'Aurora Commerce',
    description: 'Ecommerce headless con Next.js y WordPress como CMS, integración Stripe y animaciones WebGL.',
    tags: ['React', 'WordPress', 'Stripe', 'Three.js'],
    image: '/assets/project-1.jpg',
    link: 'https://marc-iglesias.dev/proyecto/aurora'
  },
  {
    title: 'Nebula Analytics',
    description: 'Dashboard en tiempo real con sockets y visualizaciones personalizadas con D3 + Tailwind.',
    tags: ['Node.js', 'React', 'Tailwind', 'D3.js'],
    image: '/assets/project-2.jpg',
    link: 'https://marc-iglesias.dev/proyecto/nebula'
  },
  {
    title: 'Gravity Agency',
    description: 'Sitio corporativo premium en WordPress con bloques personalizados, SEO técnico y PageSpeed 98+.',
    tags: ['WordPress', 'PHP', 'SEO', 'GSAP'],
    image: '/assets/project-3.jpg',
    link: 'https://marc-iglesias.dev/proyecto/gravity'
  },
  {
    title: 'Atlas DevOps',
    description: 'Automatización CI/CD con Docker, despliegues en múltiples servidores y monitoreo centralizado.',
    tags: ['Docker', 'CI/CD', 'Node.js', 'Grafana'],
    image: '/assets/project-4.jpg',
    link: 'https://marc-iglesias.dev/proyecto/atlas'
  },
  {
    title: 'Pulse Events',
    description: 'Plataforma de reservas y ticketing con panel multi-rol y pasarela de pago segura.',
    tags: ['React', 'Express', 'PostgreSQL', 'Tailwind'],
    image: '/assets/project-5.jpg',
    link: 'https://marc-iglesias.dev/proyecto/pulse'
  },
  {
    title: 'Lumen AI Studio',
    description: 'Landing inmersiva con generación de contenido AI, integración OpenAI y flujos CRM.',
    tags: ['OpenAI', 'Next.js', 'Framer Motion', 'Cloudflare'],
    image: '/assets/project-6.jpg',
    link: 'https://marc-iglesias.dev/proyecto/lumen'
  }
];

export const Portfolio = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const reduced = useMotionStore((state) => state.reduced);

  useEffect(() => {
    if (!sectionRef.current || reduced) return;
    const cards = gsap.utils.toArray<HTMLDivElement>('[data-portfolio-card]');
    const ctx = gsap.context(() => {
      gsap.from(cards, {
        opacity: 0,
        y: 48,
        stagger: 0.15,
        duration: 1.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%'
        }
      });
    }, sectionRef);
    return () => ctx.revert();
  }, [reduced]);

  return (
    <section id="portfolio" ref={sectionRef} className="relative py-24">
      <div className="mx-auto flex max-w-6xl flex-col gap-16 px-6">
        <SectionTitle
          eyebrow="Selección"
          title="Portfolio destacado"
          description="Proyectos donde combino estrategia digital, desarrollo a medida y obsesión por el rendimiento."
        />
        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {projects.map((project) => (
            <article
              key={project.title}
              data-portfolio-card
              className="glass card-hover group flex h-full flex-col overflow-hidden rounded-3xl border border-white/5 bg-white/5"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={project.image}
                  alt={`Proyecto ${project.title}`}
                  className="h-full w-full object-cover transition duration-700 ease-out group-hover:scale-105"
                />
                {/* TODO: Sustituir ${project.image} por la captura real del proyecto */}
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/80" />
              </div>
              <div className="flex flex-1 flex-col gap-4 p-6">
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold text-white">{project.title}</h3>
                  <p className="text-sm text-white/70">{project.description}</p>
                </div>
                <div className="mt-auto flex flex-wrap gap-2 text-xs text-white/60">
                  {project.tags.map((tag) => (
                    <span key={tag} className="rounded-full border border-white/10 bg-white/10 px-3 py-1">
                      {tag}
                    </span>
                  ))}
                </div>
                <a
                  href={project.link}
                  className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-primary transition hover:text-cyanSoft"
                >
                  Ver proyecto
                  <span aria-hidden>→</span>
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
