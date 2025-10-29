import type { FC, ReactNode } from 'react';

type SectionTitleProps = {
  eyebrow: string;
  title: string;
  description?: ReactNode;
  align?: 'left' | 'center';
};

const SectionTitle: FC<SectionTitleProps> = ({ eyebrow, title, description, align = 'left' }) => {
  const alignment = align === 'center' ? 'text-center mx-auto' : '';

  return (
    <div className={`mb-10 ${alignment}`}>
      <p className={`section-subtitle ${align === 'center' ? 'mx-auto' : ''}`}>{eyebrow}</p>
      <h2 className="text-3xl font-display font-semibold text-white sm:text-4xl">{title}</h2>
      {description ? <div className={`mt-4 section-description ${alignment}`}>{description}</div> : null}
    </div>
  );
};

export default SectionTitle;
