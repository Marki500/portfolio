import type { ReactNode } from 'react';

interface SectionTitleProps {
  title: string;
  eyebrow?: string;
  description?: ReactNode;
  align?: 'left' | 'center';
}

export const SectionTitle = ({ title, eyebrow, description, align = 'center' }: SectionTitleProps) => (
  <div
    className={`mx-auto max-w-3xl space-y-4 ${
      align === 'left' ? 'text-left md:ml-0 md:mr-auto' : 'text-center'
    }`}
  >
    {eyebrow ? (
      <span className="text-xs uppercase tracking-[0.35em] text-primary/70">{eyebrow}</span>
    ) : null}
    <h2 className="text-3xl font-semibold text-white sm:text-4xl">{title}</h2>
    {description ? <p className="text-base text-white/70">{description}</p> : null}
  </div>
);
