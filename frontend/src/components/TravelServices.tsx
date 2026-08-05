import type { Beach } from '../data/beaches';
import { getHotelsByBeach, getGuidesByBeach } from '../data/services';
import RatingStars from './RatingStars';

interface TravelServicesProps {
  beach: Beach;
}

export default function TravelServices({ beach }: TravelServicesProps) {
  const beachHotels = getHotelsByBeach(beach.id);
  const beachGuides = getGuidesByBeach(beach.id);

  return (
    <section id="servicios" className="relative py-20 md:py-28 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest mb-4"
            style={{
              background: 'linear-gradient(135deg, color-mix(in srgb, var(--clr-accent) 12%, transparent), color-mix(in srgb, var(--clr-primary) 8%, transparent))',
              border: '1px solid color-mix(in srgb, var(--clr-accent) 18%, transparent)',
              color: 'var(--clr-text-muted)',
            }}
          >
            <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            Hospedaje y tours
          </span>
          <h2 className="font-heading text-3xl md:text-4xl font-extrabold mb-3"
            style={{
              background: 'linear-gradient(135deg, var(--clr-primary-dark), var(--clr-primary))',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Hoteles y Guías en {beach.name}
          </h2>
          <p className="text-base max-w-xl mx-auto" style={{ color: 'var(--clr-text-muted)' }}>
            Los mejores lugares para hospedarte y expertos locales que te mostrarán lo mejor del destino.
          </p>
        </div>

        <div className="space-y-12">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center text-white shadow-lg"
                style={{
                  background: 'linear-gradient(135deg, var(--clr-primary), var(--clr-primary-dark))',
                  boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.3), 0 4px 12px var(--clr-glow)',
                }}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 7l9-4 9 4M3 7v10l9 4 9-4V7M3 7l9 4 9-4M12 11v10" />
                </svg>
              </div>
              <h3 className="font-heading text-xl font-bold" style={{ color: 'var(--clr-text-heading)' }}>Hoteles recomendados</h3>
            </div>

            {beachHotels.length === 0 ? (
              <div className="gel-card p-8 text-center">
                <p className="text-sm" style={{ color: 'var(--clr-text-muted)' }}>
                  Aún no tenemos hoteles recomendados para esta playa. ¡Muy pronto!
                </p>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 gap-6">
                {beachHotels.map((hotel) => (
                  <div key={hotel.id} className="gel-card shine p-6 flex flex-col">
                    <div className="flex items-start justify-between mb-3">
                      <h4 className="font-heading text-lg font-bold" style={{ color: 'var(--clr-text-heading)' }}>
                        {hotel.name}
                      </h4>
                      <RatingStars rating={hotel.rating} size="small" />
                    </div>
                    <p className="text-sm leading-relaxed mb-4 flex-1" style={{ color: 'var(--clr-text-body)' }}>
                      {hotel.description}
                    </p>
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {hotel.amenities.map((amenity) => (
                        <span key={amenity}
                          className="px-2.5 py-1 rounded-full text-[11px] font-medium"
                          style={{
                            background: 'color-mix(in srgb, var(--clr-primary) 8%, transparent)',
                            color: 'var(--clr-text-muted)',
                          }}
                        >
                          {amenity}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center justify-between pt-4 border-t"
                      style={{ borderColor: 'color-mix(in srgb, var(--clr-primary) 10%, transparent)' }}
                    >
                      <span className="text-xs font-semibold" style={{ color: 'var(--clr-accent)' }}>
                        {hotel.priceRange} / noche
                      </span>
                      <span className="text-[11px] font-medium px-3 py-1.5 rounded-full text-white gel-btn">Reservar</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center text-white shadow-lg"
                style={{
                  background: 'linear-gradient(135deg, var(--clr-accent), var(--clr-accent-light))',
                  boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.3), 0 4px 12px color-mix(in srgb, var(--clr-accent) 30%, transparent)',
                }}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="font-heading text-xl font-bold" style={{ color: 'var(--clr-text-heading)' }}>Guías turísticos locales</h3>
            </div>

            {beachGuides.length === 0 ? (
              <div className="gel-card p-8 text-center">
                <p className="text-sm" style={{ color: 'var(--clr-text-muted)' }}>
                  Aún no tenemos guías registrados para esta playa. ¡Muy pronto!
                </p>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {beachGuides.map((guide) => (
                  <div key={guide.id} className="gel-card shine p-6 flex flex-col items-center text-center">
                    <div className="w-16 h-16 rounded-full flex items-center justify-center text-white font-heading text-2xl font-bold mb-3"
                      style={{
                        background: 'linear-gradient(135deg, var(--clr-primary), var(--clr-primary-dark))',
                        boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.3), 0 4px 12px var(--clr-glow)',
                      }}
                    >
                      {guide.name.split(' ').map((n) => n[0]).join('').slice(0, 2)}
                    </div>
                    <h4 className="font-heading text-base font-bold" style={{ color: 'var(--clr-text-heading)' }}>{guide.name}</h4>
                    <p className="text-xs font-semibold mt-1" style={{ color: 'var(--clr-accent)' }}>{guide.specialty}</p>
                    <p className="text-xs mt-1" style={{ color: 'var(--clr-text-muted)' }}>{guide.experience}</p>
                    <div className="flex items-center gap-1 mt-2">
                      <RatingStars rating={guide.rating} size="small" />
                    </div>
                    <div className="flex flex-wrap justify-center gap-1.5 mt-3">
                      {guide.languages.map((lang) => (
                        <span key={lang}
                          className="px-2 py-0.5 rounded-full text-[10px] font-medium"
                          style={{
                            background: 'color-mix(in srgb, var(--clr-accent) 10%, transparent)',
                            color: 'var(--clr-text-muted)',
                          }}
                        >
                          {lang}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
