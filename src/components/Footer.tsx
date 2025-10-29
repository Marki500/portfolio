const currentYear = new Date().getFullYear();

export const Footer = () => (
  <footer className="border-t border-white/10 bg-black/40 py-10 text-sm text-white/60">
    <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 md:flex-row">
      <p>© {currentYear} Marc Iglesias Simón. Todos los derechos reservados.</p>
      <div className="flex items-center gap-4">
        <a
          href="https://github.com/marc-iglesias"
          className="transition hover:text-white"
          aria-label="GitHub de Marc Iglesias"
        >
          GitHub
        </a>
        <a
          href="https://www.linkedin.com/in/marc-iglesias"
          className="transition hover:text-white"
          aria-label="LinkedIn de Marc Iglesias"
        >
          LinkedIn
        </a>
      </div>
    </div>
  </footer>
);
