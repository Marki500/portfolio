import { FormEvent, useEffect, useRef, useState } from 'react';
import { gsap } from './gsapConfig';
import { SectionTitle } from './SectionTitle';
import { useMotionStore } from './motionStore';

export const Contact = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const reduced = useMotionStore((state) => state.reduced);
  const [status, setStatus] = useState<string>('');

  useEffect(() => {
    if (!sectionRef.current || reduced) return;
    const ctx = gsap.context(() => {
      gsap.from('[data-contact]', {
        opacity: 0,
        y: 40,
        duration: 1,
        ease: 'power3.out',
        stagger: 0.15,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%'
        }
      });
    }, sectionRef);
    return () => ctx.revert();
  }, [reduced]);

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }
    const formData = new FormData(form);
    const name = formData.get('name');
    setStatus(`Gracias ${name}, responderé muy pronto.`);
    form.reset();
  };

  return (
    <section id="contact" ref={sectionRef} className="relative py-24">
      <div className="mx-auto flex max-w-5xl flex-col gap-14 px-6">
        <SectionTitle
          eyebrow="Contacto"
          title="¿Hablamos de tu próximo proyecto?"
          description="Cuéntame en qué etapa estás y diseñamos juntos un roadmap sólido."
        />
        <div className="grid gap-10 rounded-[32px] border border-white/5 bg-white/5 p-10 backdrop-blur-xl lg:grid-cols-[1.1fr_0.9fr]">
          <form data-contact className="space-y-6" onSubmit={onSubmit} noValidate>
            <div className="grid gap-6 md:grid-cols-2">
              <label className="flex flex-col gap-2 text-sm text-white/70">
                Nombre
                <input
                  type="text"
                  name="name"
                  required
                  placeholder="Tu nombre"
                  className="rounded-xl border border-white/20 bg-black/40 px-4 py-3 text-white focus:border-primary/60"
                />
              </label>
              <label className="flex flex-col gap-2 text-sm text-white/70">
                Email
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="tu@email.com"
                  className="rounded-xl border border-white/20 bg-black/40 px-4 py-3 text-white focus:border-primary/60"
                />
              </label>
            </div>
            <label className="flex flex-col gap-2 text-sm text-white/70">
              Mensaje
              <textarea
                name="message"
                required
                rows={5}
                placeholder="Describe brevemente qué necesitas"
                className="rounded-2xl border border-white/20 bg-black/40 px-4 py-3 text-white focus:border-primary/60"
              />
            </label>
            <button
              type="submit"
              className="magnetic inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-base font-semibold text-white shadow-glow transition hover:bg-primary/90"
            >
              Enviar mensaje
            </button>
            <p role="status" className="text-sm text-cyanSoft" aria-live="polite">
              {status}
            </p>
          </form>
          <div data-contact className="flex flex-col gap-6 text-sm text-white/70">
            <p>
              Respondo normalmente en 24h. Si prefieres, puedes escribirme directamente a través de correo electrónico o
              conectar en redes.
            </p>
            <a
              href="mailto:hola@marc-iglesias.dev"
              className="inline-flex items-center gap-3 text-base font-semibold text-primary transition hover:text-cyanSoft"
            >
              hola@marc-iglesias.dev
            </a>
            <div className="space-y-3 text-white/60">
              <p className="font-semibold text-white">Preferencias</p>
              <ul className="space-y-2">
                <li>• Sesiones estratégicas por videollamada</li>
                <li>• Roadmaps trimestrales con hitos y métricas</li>
                <li>• Mantenimiento proactivo y soporte continuo</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
