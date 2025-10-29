import { Suspense, useEffect, useMemo, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { TechPlanet } from './TechPlanet';
import { useMotionStore } from '../components/motionStore';

const isWebGLAvailable = () => {
  if (typeof document === 'undefined') return false;
  try {
    const canvas = document.createElement('canvas');
    return !!(
      canvas.getContext('webgl') ||
      canvas.getContext('experimental-webgl') ||
      canvas.getContext('webgl2')
    );
  } catch (error) {
    return false;
  }
};

export const TechPlanetCanvas = () => {
  const reduced = useMotionStore((state) => state.reduced);
  const [supportsWebGL, setSupportsWebGL] = useState(true);
  const [active, setActive] = useState(true);

  useEffect(() => {
    setSupportsWebGL(isWebGLAvailable());
  }, []);

  useEffect(() => {
    const onVisibility = () => setActive(!document.hidden);
    document.addEventListener('visibilitychange', onVisibility);
    return () => document.removeEventListener('visibilitychange', onVisibility);
  }, []);

  const dpr = useMemo(() => {
    if (typeof window === 'undefined') return 1;
    return Math.min(window.devicePixelRatio ?? 1, 1.8);
  }, []);

  if (!supportsWebGL) {
    return (
      <div className="relative flex h-full w-full items-center justify-center overflow-hidden rounded-[32px] bg-[radial-gradient(circle_at_30%_30%,rgba(152,0,203,0.45),rgba(12,12,28,0.85))]">
        <div className="absolute inset-0 -z-10 animate-[spin_24s_linear_infinite] rounded-full border border-primary/40 opacity-60" />
        <svg
          className="absolute inset-0 h-full w-full opacity-60"
          viewBox="0 0 400 400"
          role="presentation"
        >
          <defs>
            <linearGradient id="orbit" x1="0%" x2="100%" y1="0%" y2="100%">
              <stop offset="0%" stopColor="#9800cb" />
              <stop offset="100%" stopColor="#00d4ff" />
            </linearGradient>
          </defs>
          <circle cx="200" cy="200" r="160" fill="none" stroke="url(#orbit)" strokeDasharray="12 18" strokeWidth="1.5">
            <animate attributeName="stroke-dashoffset" from="0" to="-300" dur="10s" repeatCount="indefinite" />
          </circle>
          <circle cx="200" cy="200" r="120" fill="none" stroke="url(#orbit)" strokeDasharray="8 12" strokeWidth="1">
            <animate attributeName="stroke-dashoffset" from="0" to="260" dur="7s" repeatCount="indefinite" />
          </circle>
        </svg>
        <div className="glass relative mx-auto max-w-xs rounded-3xl p-8 text-center">
          <p className="text-sm text-white/70">
            WebGL no está disponible en este dispositivo. Se muestra una versión ilustrada del planeta tecnológico.
          </p>
        </div>
      </div>
    );
  }

  return (
    <Canvas
      dpr={dpr}
      frameloop={active && !reduced ? 'always' : 'demand'}
      performance={{ min: reduced ? 0.2 : 0.4 }}
      gl={{ antialias: true, alpha: true }}
      camera={{ position: [0, 0, 4], fov: 45 }}
      eventPrefix="client"
    >
      <Suspense fallback={null}>
        <TechPlanet />
      </Suspense>
    </Canvas>
  );
};
