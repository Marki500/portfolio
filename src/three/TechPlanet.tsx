import { useEffect, useMemo, useRef, useState } from 'react';
import { BufferGeometry, Color, Group, MathUtils, Mesh, Points, ShaderMaterial, Vector3 } from 'three';
import { useFrame, useThree } from '@react-three/fiber';
import { Html, Sphere, useCursor } from '@react-three/drei';
import { EffectComposer, Bloom, ChromaticAberration } from '@react-three/postprocessing';
import { BlendFunction } from 'postprocessing';
import { gsap, MotionPathPlugin } from '../components/gsapConfig';
import { useMotionStore } from '../components/motionStore';

const shader = {
  vertex: /* glsl */ `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragment: /* glsl */ `
    varying vec2 vUv;
    void main() {
      vec2 grid = abs(fract(vUv * 20.0 - 0.5) - 0.5) / fwidth(vUv * 20.0);
      float line = min(grid.x, grid.y);
      float mask = 1.0 - smoothstep(0.0, 1.0, line);
      vec3 color = mix(vec3(0.05, 0.05, 0.08), vec3(0.45, 0.0, 0.65), mask);
      gl_FragColor = vec4(color, 1.0);
    }
  `
};

type NodeInfo = {
  id: string;
  label: string;
  color: string;
  section: string;
};

const nodes: NodeInfo[] = [
  { id: 'react', label: 'React', color: '#00d4ff', section: '#portfolio' },
  { id: 'wordpress', label: 'WordPress', color: '#21759b', section: '#services' },
  { id: 'node', label: 'Node.js', color: '#7bc043', section: '#services' },
  { id: 'docker', label: 'Docker', color: '#0db7ed', section: '#services' },
  { id: 'tailwind', label: 'Tailwind', color: '#38bdf8', section: '#portfolio' }
];

const useBrownianOffsets = (count: number) =>
  useMemo(
    () => Array.from({ length: count }, () => new Vector3(Math.random(), Math.random(), Math.random())),
    [count]
  );

type OrbitProps = {
  radius: number;
  tilt: [number, number, number];
  color: string;
  speed: number;
};

const OrbitRing = ({ radius, tilt, color, speed }: OrbitProps) => {
  const torusRef = useRef<Group>(null);
  const reduced = useMotionStore((state) => state.reduced);

  useEffect(() => {
    if (!torusRef.current || reduced) return;
    const rotation = torusRef.current.rotation;
    const tween = gsap.to(rotation, {
      y: rotation.y + Math.PI * 2,
      duration: speed,
      repeat: -1,
      ease: 'none'
    });
    return () => tween.kill();
  }, [reduced, speed]);

  return (
    <group ref={torusRef} rotation={tilt}>
      <mesh>
        <torusGeometry args={[radius, 0.01, 16, 200]} />
        <meshBasicMaterial color={color} transparent opacity={0.6} />
      </mesh>
    </group>
  );
};

type NodeProps = {
  node: NodeInfo;
  position: [number, number, number];
};

const Node = ({ node, position }: NodeProps) => {
  const meshRef = useRef<Mesh>(null);
  const [hovered, setHovered] = useState(false);
  const reduced = useMotionStore((state) => state.reduced);
  useCursor(hovered);

  useEffect(() => {
    if (!meshRef.current || reduced) return;
    const tween = gsap.to(meshRef.current.rotation, {
      y: Math.PI * 2,
      duration: 6,
      repeat: -1,
      ease: 'none'
    });
    return () => tween.kill();
  }, [reduced]);

  const handleClick = () => {
    const section = document.querySelector(node.section);
    section?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <group position={position as unknown as Vector3}>
      <mesh
        ref={meshRef}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        onClick={handleClick}
      >
        <sphereGeometry args={[0.08, 32, 32]} />
        <meshStandardMaterial
          color={node.color}
          emissive={new Color(node.color).multiplyScalar(0.6)}
          emissiveIntensity={hovered ? 1.4 : 0.8}
        />
      </mesh>
      <Html center distanceFactor={8} occlude>
        <div
          className={`rounded-full border border-white/20 bg-black/70 px-3 py-1 text-xs font-medium text-white shadow-glow transition-opacity ${
            hovered ? 'opacity-100' : 'opacity-0'
          }`}
        >
          {node.label}
        </div>
      </Html>
    </group>
  );
};

const Particles = ({ count = 420 }: { count?: number }) => {
  const pointsRef = useRef<Points>(null);
  const positions = useMemo(() => {
    const array = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      array[i3 + 0] = MathUtils.randFloatSpread(6);
      array[i3 + 1] = MathUtils.randFloatSpread(6);
      array[i3 + 2] = MathUtils.randFloatSpread(6);
    }
    return array;
  }, [count]);
  const offsets = useBrownianOffsets(count);
  const reduced = useMotionStore((state) => state.reduced);

  useFrame(({ clock }) => {
    if (!pointsRef.current) return;
    const positionsAttr = (pointsRef.current.geometry as BufferGeometry).getAttribute('position');
    const time = clock.getElapsedTime();
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      const offset = offsets[i];
      const wobble = reduced ? 0.005 : 0.02;
      positionsAttr.setXYZ(
        i,
        positions[i3] + Math.sin(time * 0.15 + offset.x) * wobble,
        positions[i3 + 1] + Math.cos(time * 0.2 + offset.y) * wobble,
        positions[i3 + 2] + Math.sin(time * 0.18 + offset.z) * wobble
      );
    }
    positionsAttr.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={positions.length / 3} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial
        color="#ffffff"
        size={0.02}
        sizeAttenuation
        transparent
        opacity={0.7}
      />
    </points>
  );
};

export const TechPlanet = () => {
  const groupRef = useRef<Group>(null);
  const shaderMaterial = useMemo(
    () =>
      new ShaderMaterial({
        vertexShader: shader.vertex,
        fragmentShader: shader.fragment
      }),
    []
  );
  const reduced = useMotionStore((state) => state.reduced);
  const { viewport } = useThree();
  const satelliteGroup = useRef<Group>(null);
  const satelliteState = useRef({ progress: 0 });
  const orbitPath = useMemo(() => MotionPathPlugin.stringToRawPath('M0,0 C0.3,0.8 0.8,0.3 0,1 C-0.8,0.3 -0.3,0.8 0,0'), []);

  useEffect(() => {
    if (reduced) return;
    const tween = gsap.to(satelliteState.current, {
      progress: 1,
      duration: 9,
      repeat: -1,
      ease: 'none'
    });
    return () => tween.kill();
  }, [reduced]);

  useFrame((state, delta) => {
    if (!groupRef.current) return;
    const parallaxIntensity = reduced ? 0.02 : 0.08;
    const targetX = state.pointer.x * parallaxIntensity;
    const targetY = state.pointer.y * parallaxIntensity;
    groupRef.current.rotation.y = MathUtils.lerp(groupRef.current.rotation.y, targetX, 0.1);
    groupRef.current.rotation.x = MathUtils.lerp(groupRef.current.rotation.x, -targetY, 0.1);

    if (satelliteGroup.current) {
      if (reduced) {
        const angle = (state.clock.getElapsedTime() * 0.25) % (Math.PI * 2);
        satelliteGroup.current.position.set(Math.cos(angle) * 1.4, Math.sin(angle * 1.2) * 0.4, Math.sin(angle) * 0.6);
      } else {
        const { x, y } = MotionPathPlugin.getPositionOnPath(orbitPath, satelliteState.current.progress);
        satelliteGroup.current.position.set(x * 1.6, y * 1.1, Math.sin(satelliteState.current.progress * Math.PI * 2) * 0.8);
      }
    }
  });

  useEffect(() => {
    if (!groupRef.current || reduced) return;
    const ctx = gsap.context(() => {
      gsap.to(groupRef.current!.rotation, { y: '+=6.283', duration: 40, repeat: -1, ease: 'none' });
    }, groupRef);
    return () => ctx.revert();
  }, [reduced]);

  return (
    <group ref={groupRef}>
      <ambientLight intensity={0.5} />
      <directionalLight position={[2, 3, 5]} intensity={1.2} color={0x9800cb} />
      <directionalLight position={[-2, -3, -5]} intensity={0.6} color={0x00d4ff} />

      <mesh scale={viewport.width > 6 ? 1.6 : 1.2}>
        <sphereGeometry args={[1, 64, 64]} />
        <meshStandardMaterial
          color="#090818"
          emissive="#2a0a3f"
          emissiveIntensity={0.6}
          metalness={0.4}
          roughness={0.3}
        />
      </mesh>

      <mesh scale={viewport.width > 6 ? 1.6 : 1.2}>
        <sphereGeometry args={[1.01, 64, 64]} />
        <primitive object={shaderMaterial} attach="material" />
      </mesh>

      <OrbitRing radius={1.3} tilt={[0.8, 0.1, 0.3]} color="#9800cb" speed={18} />
      <OrbitRing radius={1.55} tilt={[0.2, 0.6, -0.4]} color="#00d4ff" speed={26} />
      <OrbitRing radius={1.8} tilt={[0.5, -0.4, 0.2]} color="#ffffff" speed={34} />

      <group ref={satelliteGroup}>
        <Sphere args={[0.12, 32, 32]}>
          <meshStandardMaterial
            color="#ffffff"
            emissive="#9800cb"
            emissiveIntensity={1.3}
            metalness={0.8}
            roughness={0.25}
          />
        </Sphere>
      </group>

      {nodes.map((node, index) => {
        const angle = (index / nodes.length) * Math.PI * 2;
        const radius = 1.4 + (index % 2) * 0.2;
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * 0.4;
        const z = Math.sin(angle) * radius * 0.6;
        return <Node key={node.id} node={node} position={[x, y, z]} />;
      })}

      <Particles count={reduced ? 220 : 520} />

      <EffectComposer disableNormalPass>
        <Bloom intensity={1.2} luminanceThreshold={0.15} luminanceSmoothing={0.9} mipmapBlur />
        <ChromaticAberration offset={[0.0025, 0.0015]} blendFunction={BlendFunction.NORMAL} />
      </EffectComposer>
    </group>
  );
};
