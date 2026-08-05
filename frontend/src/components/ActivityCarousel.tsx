import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import Icon from './Icon';
import { getFeaturedActivities, getCategoryById, categoryColor, difficultyColor } from '../data/activities';
import { carouselImage } from '../config/images';

const AUTOPLAY_MS = 7000;

interface CarouselArrowProps {
  direction: 'prev' | 'next';
  onClick: () => void;
  label: string;
}

function CarouselArrow({ direction, onClick, label }: CarouselArrowProps) {
  return (
    <button
      onClick={onClick}
      aria-label={label}
      className="pointer-events-auto p-3 text-white transition-all duration-200"
      style={{
        background: 'rgba(0,0,0,0.35)',
        backdropFilter: 'blur(8px)',
        border: '1px solid rgba(255,255,255,0.25)',
      }}
      onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(0,0,0,0.6)'; }}
      onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(0,0,0,0.35)'; }}
    >
      <Icon name={direction === 'prev' ? 'arrow-left' : 'arrow-right'} className="w-5 h-5" />
    </button>
  );
}

export default function ActivityCarousel() {
  const slides = getFeaturedActivities();
  const [currentIndex, setCurrentIndex] = useState(0);

  const goTo = useCallback(
    (index: number) => setCurrentIndex((index + slides.length) % slides.length),
    [slides.length],
  );

  useEffect(() => {
    const timer = setInterval(() => goTo(currentIndex + 1), AUTOPLAY_MS);
    return () => clearInterval(timer);
  }, [currentIndex, goTo]);

  return (
    <section id="inicio" className="relative w-full h-screen overflow-hidden bg-black">
      {slides.map((slide, index) => {
        const category = getCategoryById(slide.category);
        const color = categoryColor(slide.category);
        const active = index === currentIndex;

        const infoChips = [
          { icon: 'calendar' as const, color: 'var(--clr-accent-light)', text: slide.horario },
          { icon: 'bolt' as const, color: difficultyColor(slide.dificultadLevel), text: slide.dificultad },
        ];

        return (
          <div
            key={slide.slug}
            className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
              active ? 'opacity-100' : 'opacity-0'
            }`}
            aria-hidden={!active}
          >
            {/* Imagen limpia: SIN filtro sobre la foto */}
            <div className="absolute inset-0 hero-shine">
              <img
                src={carouselImage(slide.slug)}
                alt={slide.title}
                className={`w-full h-full object-cover object-center transition-transform duration-[4000ms] ease-out ${
                  active ? 'scale-105' : 'scale-100'
                }`}
              />
            </div>

            {/* Scrim SOLO detrás del texto, para que sea legible */}
            <div className="absolute bottom-0 left-0 right-0 text-scrim">
              <div className="max-w-7xl mx-auto px-6 md:px-16 lg:px-24 pt-28 pb-16 md:pb-24">
                <div className="max-w-3xl">
                  <div className="flex flex-wrap items-center gap-2 mb-5">
                    <span
                      className="px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-white"
                      style={{ background: color }}
                    >
                      {category?.name}
                    </span>
                    <span
                      className="px-3 py-1 text-[11px] font-semibold uppercase tracking-wider"
                      style={{
                        background: 'rgba(255,255,255,0.14)',
                        backdropFilter: 'blur(8px)',
                        border: '1px solid rgba(255,255,255,0.25)',
                        color: 'white',
                      }}
                    >
                      {slide.estacionalidad}
                    </span>
                  </div>

                  <h1
                    className="font-heading text-4xl md:text-6xl lg:text-7xl font-extrabold mb-4 text-white"
                    style={{ textShadow: '0 2px 30px rgba(0,0,0,0.6)', lineHeight: '1.05' }}
                  >
                    {slide.cardTitle}
                  </h1>

                  <p className="text-base md:text-xl max-w-2xl font-light leading-relaxed mb-6 text-white/90">
                    {slide.tagline}
                  </p>

                  <div className="flex flex-wrap items-center gap-2 mb-8">
                    {infoChips.map((chip) => (
                      <span
                        key={chip.icon}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium"
                        style={{
                          background: 'rgba(0,0,0,0.35)',
                          backdropFilter: 'blur(6px)',
                          border: '1px solid rgba(255,255,255,0.2)',
                          color: 'white',
                        }}
                      >
                        <Icon name={chip.icon} className="w-3.5 h-3.5" style={{ color: chip.color }} />
                        {chip.text}
                      </span>
                    ))}
                  </div>

                  <Link
                    to={`/experiencia/${slide.slug}`}
                    className="inline-flex items-center gap-2 px-7 py-3 text-sm font-bold text-white gel-btn"
                  >
                    Ver experiencia
                    <Icon name="arrow-right" className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        );
      })}

      {/* Flechas */}
      <div className="absolute top-1/2 left-0 right-0 -translate-y-1/2 flex justify-between px-3 md:px-6 z-10 pointer-events-none">
        <CarouselArrow direction="prev" onClick={() => goTo(currentIndex - 1)} label="Anterior" />
        <CarouselArrow direction="next" onClick={() => goTo(currentIndex + 1)} label="Siguiente" />
      </div>

      {/* Indicadores */}
      <div className="absolute bottom-6 right-6 md:right-12 flex gap-2 z-10">
        {slides.map((slide, index) => (
          <button
            key={slide.slug}
            onClick={() => goTo(index)}
            aria-label={`Ir a ${slide.cardTitle}`}
            className="transition-all duration-500"
            style={{
              width: index === currentIndex ? '34px' : '10px',
              height: '6px',
              background:
                index === currentIndex
                  ? 'linear-gradient(90deg, var(--clr-primary), var(--clr-primary-dark))'
                  : 'rgba(255,255,255,0.4)',
              boxShadow: index === currentIndex ? '0 0 12px var(--clr-glow)' : 'none',
            }}
          />
        ))}
      </div>
    </section>
  );
}
