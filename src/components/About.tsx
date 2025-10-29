import { useEffect, useRef } from 'react';
import { gsap } from './gsapConfig';
import { SectionTitle } from './SectionTitle';
import { useMotionStore } from './motionStore';

const skills = [
  'HTML',
  'CSS',
  'JavaScript',
  'React',
  'Astro',
  'Tailwind',
  'PHP / WordPress',
  'Node.js',
  'Express',
  'MySQL / MariaDB',
  'Prisma (básico)',
  'Docker',
  'Apache / Nginx',
  'Virtualmin / Plesk',
  'Cloudflare',
  'Figma / Photoshop (básico)',
  'Vercel / Netlify'
];

export const About = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const reduced = useMotionStore((state) => state.reduced);

  useEffect(() => {
    if (!sectionRef.current || reduced) return;
    const ctx = gsap.context(() => {
      gsap.from('[data-about-content]', {
        opacity: 0,
        y: 60,
        duration: 1.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%'
        }
      });
      gsap.from('[data-skill-chip]', {
        opacity: 0,
        y: 20,
        duration: 0.8,
        ease: 'power2.out',
        stagger: 0.05,
        delay: 0.1,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%'
        }
      });
    }, sectionRef);
    return () => ctx.revert();
  }, [reduced]);

  return (
    <section id="about" ref={sectionRef} className="relative py-24">
      <div className="mx-auto flex max-w-6xl flex-col gap-12 px-6">
        <SectionTitle
          align="left"
          eyebrow="Sobre mí"
          title="Proactivo, resolutivo y orientado al detalle"
          description="Me gusta dejarlo todo perfecto y orientado a rendimiento y seguridad, acompañando cada proyecto desde la estrategia hasta el soporte post-lanzamiento."
        />
        <div data-about-content className="grid gap-12 rounded-[32px] border border-white/5 bg-white/5 p-10 backdrop-blur-xl lg:grid-cols-[1.1fr_1fr]">
          <p className="text-base leading-relaxed text-white/70">
            Disfruto creando experiencias digitales que transmiten confianza. Coordino equipos multidisciplinares, me
            involucro con las necesidades de negocio y traduzco objetivos en entregables iterativos. Documentación clara,
            procesos automatizados y métricas son parte de mi flujo.
          </p>
          <div className="grid grid-cols-2 gap-3 text-sm text-white/70 sm:grid-cols-3">
            {skills.map((skill) => (
              <span
                key={skill}
                data-skill-chip
                className="rounded-full border border-white/10 bg-black/30 px-4 py-2 text-center shadow-inner"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
