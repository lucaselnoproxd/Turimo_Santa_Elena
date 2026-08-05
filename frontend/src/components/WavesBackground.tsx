interface WaveTileProps {
  color: string;
  opacity: number;
}

function WaveTile({ color, opacity }: WaveTileProps) {
  return (
    <svg
      viewBox="0 0 800 100"
      preserveAspectRatio="none"
      className="w-full h-full shrink-0"
    >
      <path
        d="M0 50 C 133 0, 267 0, 400 50 C 533 100, 667 100, 800 50 L 800 150 L 0 150 Z"
        fill={color}
        opacity={opacity}
      />
    </svg>
  );
}

interface Wave {
  position: string;
  reverse?: boolean;
  duration: string;
  color: string;
  opacity: number;
}

const WAVES: Wave[] = [
  { position: 'top-0 h-56', duration: '45s', color: 'var(--clr-primary)', opacity: 0.06 },
  { position: 'top-16 h-48', reverse: true, duration: '32s', color: 'var(--clr-primary-dark)', opacity: 0.05 },
  { position: 'top-32 h-40', duration: '24s', color: 'var(--clr-primary-light)', opacity: 0.07 },
  { position: 'bottom-0 h-56', reverse: true, duration: '38s', color: 'var(--clr-primary)', opacity: 0.04 },
  { position: 'bottom-16 h-48', duration: '26s', color: 'var(--clr-accent)', opacity: 0.04 },
];

export default function WavesBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      {WAVES.map((wave, index) => (
        <div
          key={index}
          className={`absolute inset-x-0 ${wave.position} wave-drift ${wave.reverse ? 'wave-drift-reverse' : ''}`}
          style={{ animationDuration: wave.duration }}
        >
          <WaveTile color={wave.color} opacity={wave.opacity} />
          <WaveTile color={wave.color} opacity={wave.opacity} />
        </div>
      ))}
    </div>
  );
}
