import { useEffect } from 'react';
import { useMotionStore } from './motionStore';

export const MotionToggle = () => {
  const reduced = useMotionStore((state) => state.reduced);
  const toggle = useMotionStore((state) => state.toggle);

  useEffect(() => {
    document.documentElement.dataset.motion = reduced ? 'reduced' : 'normal';
  }, [reduced]);

  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={reduced}
      className="magnetic relative inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 py-1.5 text-sm font-medium text-white shadow-glow transition hover:border-primary/60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
    >
      <span
        aria-hidden
        className={`block h-2.5 w-2.5 rounded-full transition ${reduced ? 'bg-primary shadow-glow' : 'bg-white/60'}`}
      />
      {reduced ? 'Motion: reducido' : 'Motion: completo'}
    </button>
  );
};
