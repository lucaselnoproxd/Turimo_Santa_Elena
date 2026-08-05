interface SectionHeadingProps {
  badge: string;
  title: string;
  subtitle?: string;
  light?: boolean;
}

export default function SectionHeading({ badge, title, subtitle, light = false }: SectionHeadingProps) {
  return (
    <div className="text-center mb-12 md:mb-16">
      <span
        className="inline-flex items-center gap-2 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest mb-4"
        style={{
          background: light
            ? 'rgba(255,255,255,0.15)'
            : 'linear-gradient(135deg, color-mix(in srgb, var(--clr-accent) 12%, transparent), color-mix(in srgb, var(--clr-primary) 8%, transparent))',
          border: `1px solid ${light ? 'rgba(255,255,255,0.3)' : 'color-mix(in srgb, var(--clr-accent) 18%, transparent)'}`,
          color: light ? 'rgba(255,255,255,0.9)' : 'var(--clr-text-muted)',
        }}
      >
        <span
          className="w-1.5 h-1.5"
          style={{
            background: light ? 'var(--clr-accent-light)' : 'var(--clr-accent)',
            boxShadow: `0 0 8px ${light ? 'var(--clr-accent-light)' : 'var(--clr-accent)'}`,
          }}
        />
        {badge}
      </span>
      <h2
        className="font-heading text-3xl md:text-5xl font-extrabold mb-3 leading-tight"
        style={
          light
            ? { color: 'white', textShadow: '0 2px 30px var(--clr-glow)' }
            : {
                background: 'linear-gradient(135deg, var(--clr-primary-dark), var(--clr-primary))',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }
        }
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className="text-base max-w-2xl mx-auto"
          style={{ color: light ? 'rgba(255,255,255,0.8)' : 'var(--clr-text-muted)' }}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
