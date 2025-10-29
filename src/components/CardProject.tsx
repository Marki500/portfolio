import type { FC } from 'react';

type CardProjectProps = {
  title: string;
  tech: string;
  description: string;
  image: string;
  url: string;
};

const CardProject: FC<CardProjectProps> = ({ title, tech, description, image, url }) => (
  <article className="glass-card flex flex-col overflow-hidden border-white/10 bg-white/10 backdrop-blur-xl">
    <div className="relative">
      <img
        src={image}
        alt={`Vista previa del proyecto ${title}`}
        loading="lazy"
        className="h-48 w-full object-cover"
        width="600"
        height="400"
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-primary/40 via-transparent to-cyanSoft/20 mix-blend-screen"></div>
    </div>
    <div className="flex flex-1 flex-col gap-3 p-6">
      <header>
        <h3 className="text-xl font-semibold text-white">{title}</h3>
        <p className="text-sm text-white/60">{tech}</p>
      </header>
      <p className="text-sm leading-relaxed text-white/70">{description}</p>
      <div className="mt-auto">
        <a
          className="focus-ring inline-flex items-center gap-2 text-sm font-medium text-cyanSoft hover:text-primary"
          href={url}
          target="_blank"
          rel="noreferrer noopener"
        >
          Ver proyecto
          <span aria-hidden>→</span>
        </a>
      </div>
    </div>
  </article>
);

export default CardProject;
