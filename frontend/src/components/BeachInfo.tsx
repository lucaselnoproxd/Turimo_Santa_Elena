import { Link } from 'react-router-dom';
import type { Beach } from '../data/beaches';

interface BeachInfoProps {
  beach: Beach;
}

export default function BeachInfo({ beach }: BeachInfoProps) {
  return (
    <section id="playas" className="relative py-20 md:py-32 px-4 overflow-hidden">
      <div className="absolute top-0 left-0 w-72 h-72 rounded-full"
        style={{
          background: 'radial-gradient(circle, color-mix(in srgb, var(--clr-primary) 8%, transparent) 0%, transparent 70%)',
          transform: 'translate(-30%, -30%)',
        }}
      />
      <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full"
        style={{
          background: 'radial-gradient(circle, color-mix(in srgb, var(--clr-accent) 6%, transparent) 0%, transparent 70%)',
          transform: 'translate(30%, 30%)',
        }}
      />

      <div className="max-w-6xl mx-auto relative">
        <div className="text-center mb-16">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest mb-4"
            style={{
              background: 'linear-gradient(135deg, color-mix(in srgb, var(--clr-primary) 10%, transparent), color-mix(in srgb, var(--clr-primary-dark) 5%, transparent))',
              border: '1px solid color-mix(in srgb, var(--clr-primary) 15%, transparent)',
              color: 'var(--clr-primary-dark)',
            }}
          >
            <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
            </svg>
            Explora
          </span>
          <h2 className="font-heading text-4xl md:text-5xl font-extrabold mb-3"
            style={{
              background: 'linear-gradient(135deg, var(--clr-primary-dark), var(--clr-primary))',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            {beach.name}
          </h2>
          <p className="text-base max-w-xl mx-auto" style={{ color: 'var(--clr-text-muted)' }}>
            {beach.shortDescription}
          </p>
        </div>

        <div className="grid md:grid-cols-5 gap-8">
          <div className="md:col-span-3">
            <div className="gel-card shine p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl gel-btn flex items-center justify-center text-white shadow-lg">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-heading text-lg font-bold" style={{ color: 'var(--clr-text-heading)' }}>Galería</h3>
                  <span className="text-xs" style={{ color: 'var(--clr-text-muted)' }}>Vista previa</span>
                </div>
              </div>
              <div className="relative rounded-xl overflow-hidden" style={{ boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.02)' }}>
                <img
                  src={beach.imageUrl}
                  alt={beach.name}
                  className="w-full h-[320px] md:h-[400px] object-cover"
                />
                <div className="absolute inset-0"
                  style={{
                    background: 'linear-gradient(135deg, color-mix(in srgb, var(--clr-primary) 5%, transparent) 0%, transparent 50%)',
                  }}
                />
              </div>
            </div>
          </div>

          <div className="md:col-span-2 space-y-6">
            <div className="gel-card shine p-6">
              <div className="flex items-center gap-2 mb-3">
                <svg className="w-5 h-5" style={{ color: 'var(--clr-primary)' }} fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
                <h3 className="font-heading text-base font-bold" style={{ color: 'var(--clr-text-heading)' }}>Información</h3>
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between py-2" style={{ borderBottom: '1px solid color-mix(in srgb, var(--clr-primary) 10%, transparent)' }}>
                  <span className="text-xs font-medium" style={{ color: 'var(--clr-text-muted)' }}>Ubicación</span>
                  <span className="text-xs font-semibold" style={{ color: 'var(--clr-text-heading)' }}>{beach.location}</span>
                </div>
                <div className="flex items-center justify-between py-2" style={{ borderBottom: '1px solid color-mix(in srgb, var(--clr-primary) 10%, transparent)' }}>
                  <span className="text-xs font-medium" style={{ color: 'var(--clr-text-muted)' }}>Valoración</span>
                  <div className="flex items-center gap-0.5">
                    {Array.from({ length: 5 }, (_, i) => (
                      <svg key={i} className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20"
                        style={{ color: i < beach.rating ? 'var(--clr-star)' : '#d0e8f0' }}
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                </div>
                <div className="flex items-center justify-between py-2">
                  <span className="text-xs font-medium" style={{ color: 'var(--clr-text-muted)' }}>Mejor época</span>
                  <span className="text-xs font-semibold" style={{ color: 'var(--clr-accent)' }}>{beach.bestSeason}</span>
                </div>
              </div>
            </div>

            <div className="gel-card shine p-6">
              <div className="flex items-center gap-2 mb-4">
                <svg className="w-5 h-5" style={{ color: 'var(--clr-accent)' }} fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
                </svg>
                <h3 className="font-heading text-base font-bold" style={{ color: 'var(--clr-text-heading)' }}>Actividades</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {beach.activities.map((activity) => (
                  <span key={activity} className="gel-btn px-4 py-2 text-white text-xs font-semibold rounded-full shadow-lg">
                    {activity}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8">
          <div className="gel-card shine p-8">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white shadow-lg"
                style={{
                  background: 'linear-gradient(135deg, var(--clr-accent), var(--clr-accent-light))',
                  boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.3), inset 0 -2px 0 rgba(0,0,0,0.15), 0 4px 12px color-mix(in srgb, var(--clr-accent) 25%, transparent)',
                }}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h7" />
                </svg>
              </div>
              <div>
                <h3 className="font-heading text-lg font-bold" style={{ color: 'var(--clr-text-heading)' }}>Descripción</h3>
                <span className="text-xs" style={{ color: 'var(--clr-text-muted)' }}>Conoce más sobre este destino</span>
              </div>
            </div>
            <p className="leading-relaxed text-base" style={{ color: 'var(--clr-text-body)' }}>
              {beach.longDescription}
            </p>
            <div className="mt-6">
              <Link
                to={`/playa/${beach.id}`}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold text-white gel-btn shadow-lg"
              >
                Explorar {beach.name}
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
