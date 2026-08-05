import { useMemo } from 'react';

interface Bubble {
  id: number;
  size: number;
  left: number;
  delay: number;
  duration: number;
  opacity: number;
}

export default function Bubbles() {
  const bubbles = useMemo<Bubble[]>(() => {
    return Array.from({ length: 12 }, (_, i) => ({
      id: i,
      size: 20 + Math.random() * 60,
      left: Math.random() * 100,
      delay: Math.random() * 8,
      duration: 8 + Math.random() * 12,
      opacity: 0.08 + Math.random() * 0.2,
    }));
  }, []);

  return (
    <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden">
      {bubbles.map((b) => (
        <div
          key={b.id}
          className="absolute rounded-full"
          style={{
            width: b.size,
            height: b.size,
            left: `${b.left}%`,
            bottom: '-10%',
            background: `radial-gradient(circle at 30% 30%, rgba(255,255,255,0.4), color-mix(in srgb, var(--clr-primary) ${Math.round(b.opacity * 100)}%, transparent))`,
            border: '1px solid rgba(255,255,255,0.3)',
            boxShadow: `inset 0 -4px 8px rgba(0,0,0,0.05), 0 0 ${b.size * 0.3}px color-mix(in srgb, var(--clr-primary) 15%, transparent)`,
            animation: `bubble-rise ${b.duration}s ease-in-out ${b.delay}s infinite`,
          }}
        />
      ))}
    </div>
  );
}
