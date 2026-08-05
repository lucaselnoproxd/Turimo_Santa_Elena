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

export default function WavesBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      <div
        className="absolute inset-x-0 top-0 h-56 wave-drift"
        style={{ animationDuration: '45s', opacity: 1 }}
      >
        <WaveTile color="var(--clr-primary)" opacity={0.06} />
        <WaveTile color="var(--clr-primary)" opacity={0.06} />
      </div>

      <div
        className="absolute inset-x-0 top-16 h-48 wave-drift wave-drift-reverse"
        style={{ animationDuration: '32s' }}
      >
        <WaveTile color="var(--clr-primary-dark)" opacity={0.05} />
        <WaveTile color="var(--clr-primary-dark)" opacity={0.05} />
      </div>

      <div
        className="absolute inset-x-0 top-32 h-40 wave-drift"
        style={{ animationDuration: '24s' }}
      >
        <WaveTile color="var(--clr-primary-light)" opacity={0.07} />
        <WaveTile color="var(--clr-primary-light)" opacity={0.07} />
      </div>

      <div
        className="absolute inset-x-0 bottom-0 h-56 wave-drift wave-drift-reverse"
        style={{ animationDuration: '38s' }}
      >
        <WaveTile color="var(--clr-primary)" opacity={0.04} />
        <WaveTile color="var(--clr-primary)" opacity={0.04} />
      </div>

      <div
        className="absolute inset-x-0 bottom-16 h-48 wave-drift"
        style={{ animationDuration: '26s' }}
      >
        <WaveTile color="var(--clr-accent)" opacity={0.04} />
        <WaveTile color="var(--clr-accent)" opacity={0.04} />
      </div>
    </div>
  );
}
