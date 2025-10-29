import { create } from 'zustand';

interface MotionState {
  reduced: boolean;
  toggle: () => void;
  set: (value: boolean) => void;
  setup: () => () => void;
}

const getSystemPreference = () => {
  if (typeof window === 'undefined' || !window.matchMedia) return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

export const useMotionStore = create<MotionState>((set, get) => ({
  reduced: getSystemPreference(),
  toggle: () => set((state) => ({ reduced: !state.reduced })),
  set: (value) => set({ reduced: value }),
  setup: () => {
    if (typeof window === 'undefined' || !window.matchMedia) {
      return () => undefined;
    }
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handler = (event: MediaQueryListEvent) => {
      if (!get().reduced) {
        set({ reduced: event.matches });
      }
    };
    media.addEventListener('change', handler);
    return () => media.removeEventListener('change', handler);
  }
}));
