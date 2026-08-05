import { useState } from 'react';
import Icon from './Icon';
import Section from './Section';
import type { Beach } from '../data/beaches';
import { beaches } from '../data/beaches';
import { getHotelsByBeach, getGuidesByBeach, type Hotel, type Guide } from '../data/services';
import { initials } from '../lib/utils';
import RatingStars from './RatingStars';
import ContactButtons from './ContactButtons';

interface TravelServicesProps {
  beach?: Beach;
}

function HotelPhoto({ hotel, size = 'md' }: { hotel: Hotel; size?: 'md' | 'lg' }) {
  const dim = size === 'lg' ? 'w-16 h-16' : 'w-12 h-12';
  if (hotel.photo) {
    return (
      <img
        src={hotel.photo}
        alt={hotel.name}
        className={`${dim} object-cover flex-shrink-0`}
      />
    );
  }
  return (
    <div
      className={`${dim} flex items-center justify-center text-white font-heading font-bold flex-shrink-0`}
      style={{
        background: 'linear-gradient(135deg, var(--clr-primary), var(--clr-primary-dark))',
        boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.3), 0 4px 12px var(--clr-glow)',
      }}
    >
      {initials(hotel.name).toUpperCase()}
    </div>
  );
}

function GuidePhoto({ guide }: { guide: Guide }) {
  if (guide.photo) {
    return (
      <img
        src={guide.photo}
        alt={guide.name}
        className="w-16 h-16 object-cover flex-shrink-0"
      />
    );
  }
  return (
    <div
      className="w-16 h-16 flex items-center justify-center text-white font-heading text-2xl font-bold flex-shrink-0"
      style={{
        background: 'linear-gradient(135deg, var(--clr-accent), var(--clr-accent-light))',
        boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.3), 0 4px 12px color-mix(in srgb, var(--clr-accent) 30%, transparent)',
      }}
    >
      {initials(guide.name)}
    </div>
  );
}

export default function TravelServices({ beach }: TravelServicesProps) {
  const [selectedId, setSelectedId] = useState(beach?.id ?? beaches[0].id);
  const selected = beaches.find((b) => b.id === selectedId) ?? beaches[0];

  const beachHotels = getHotelsByBeach(selected.id);
  const beachGuides = getGuidesByBeach(selected.id);

  return (
    <Section id="servicios" width="6xl">
      <div className="text-center mb-10">
          <span
            className="inline-flex items-center gap-2 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest mb-4"
            style={{
              background: 'linear-gradient(135deg, color-mix(in srgb, var(--clr-accent) 12%, transparent), color-mix(in srgb, var(--clr-primary) 8%, transparent))',
              border: '1px solid color-mix(in srgb, var(--clr-accent) 18%, transparent)',
              color: 'var(--clr-text-muted)',
            }}
          >
            Hospedaje y tours
          </span>
          <h2
            className="font-heading text-3xl md:text-4xl font-extrabold mb-3"
            style={{
              background: 'linear-gradient(135deg, var(--clr-primary-dark), var(--clr-primary))',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Hoteles y Guías
          </h2>
          <p className="text-base max-w-xl mx-auto" style={{ color: 'var(--clr-text-muted)' }}>
            Elige una playa para ver sus hoteles y guías turísticos locales.
          </p>
        </div>

        {/* Selector de playas */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {beaches.map((b) => (
            <button
              key={b.id}
              onClick={() => setSelectedId(b.id)}
              className="px-4 py-2 text-sm font-semibold transition-all duration-200"
              style={{
                background: b.id === selected.id
                  ? 'linear-gradient(180deg, var(--clr-primary), var(--clr-primary-dark))'
                  : 'color-mix(in srgb, var(--clr-primary) 6%, transparent)',
                border: `1px solid ${b.id === selected.id ? 'transparent' : 'color-mix(in srgb, var(--clr-primary) 20%, transparent)'}`,
                color: b.id === selected.id ? 'white' : 'var(--clr-text-muted)',
                boxShadow: b.id === selected.id ? '0 4px 12px var(--clr-glow)' : 'none',
              }}
            >
              {b.name}
            </button>
          ))}
        </div>

        <div className="space-y-12">
          {/* Hoteles */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div
                className="w-9 h-9 flex items-center justify-center text-white"
                style={{
                  background: 'linear-gradient(135deg, var(--clr-primary), var(--clr-primary-dark))',
                  boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.3), 0 4px 12px var(--clr-glow)',
                }}
              >
                <Icon name="hotel" className="w-5 h-5" />
              </div>
              <h3 className="font-heading text-xl font-bold" style={{ color: 'var(--clr-text-heading)' }}>
                Hoteles en {selected.name}
              </h3>
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
                    <div className="flex items-start gap-4 mb-3">
                      <HotelPhoto hotel={hotel} />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <h4 className="font-heading text-lg font-bold" style={{ color: 'var(--clr-text-heading)' }}>
                            {hotel.name}
                          </h4>
                          <RatingStars rating={hotel.rating} size="small" />
                        </div>
                        <p className="text-sm leading-relaxed mt-1" style={{ color: 'var(--clr-text-body)' }}>
                          {hotel.description}
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {hotel.amenities.map((amenity) => (
                        <span
                          key={amenity}
                          className="px-2.5 py-1 text-[11px] font-medium"
                          style={{
                            background: 'color-mix(in srgb, var(--clr-primary) 8%, transparent)',
                            color: 'var(--clr-text-muted)',
                          }}
                        >
                          {amenity}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center justify-between pt-4 border-t mt-auto"
                      style={{ borderColor: 'color-mix(in srgb, var(--clr-primary) 10%, transparent)' }}
                    >
                      <span className="text-xs font-semibold" style={{ color: 'var(--clr-accent)' }}>
                        {hotel.priceRange} / noche
                      </span>
                      <ContactButtons contact={hotel.contact} whatsappLabel="Reservar" size="sm" />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Guías */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div
                className="w-9 h-9 flex items-center justify-center text-white"
                style={{
                  background: 'linear-gradient(135deg, var(--clr-accent), var(--clr-accent-light))',
                  boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.3), 0 4px 12px color-mix(in srgb, var(--clr-accent) 30%, transparent)',
                }}
              >
                <Icon name="users" className="w-5 h-5" />
              </div>
              <h3 className="font-heading text-xl font-bold" style={{ color: 'var(--clr-text-heading)' }}>
                Guías turísticos en {selected.name}
              </h3>
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
                    <GuidePhoto guide={guide} />
                    <h4 className="font-heading text-base font-bold mt-3" style={{ color: 'var(--clr-text-heading)' }}>
                      {guide.name}
                    </h4>
                    <p className="text-xs font-semibold mt-1" style={{ color: 'var(--clr-accent)' }}>{guide.specialty}</p>
                    <p className="text-xs mt-1 mb-2" style={{ color: 'var(--clr-text-muted)' }}>{guide.experience}</p>
                    <RatingStars rating={guide.rating} size="small" />
                    <div className="flex flex-wrap justify-center gap-1.5 mt-3 mb-4">
                      {guide.languages.map((lang) => (
                        <span
                          key={lang}
                          className="px-2 py-0.5 text-[10px] font-medium"
                          style={{
                            background: 'color-mix(in srgb, var(--clr-accent) 10%, transparent)',
                            color: 'var(--clr-text-muted)',
                          }}
                        >
                          {lang}
                        </span>
                      ))}
                    </div>
                    <ContactButtons contact={guide.contact} whatsappLabel="Contactar" size="sm" align="center" />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
    </Section>
  );
}
