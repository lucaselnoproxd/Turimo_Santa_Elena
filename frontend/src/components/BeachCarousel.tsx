import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import type { Beach } from '../data/beaches';
import Bubbles from './Bubbles';

interface BeachCarouselProps {
  beaches: Beach[];
  onBeachChange: (beach: Beach) => void;
}

export default function BeachCarousel({ beaches, onBeachChange }: BeachCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goTo = useCallback((index: number) => {
    const newIndex = (index + beaches.length) % beaches.length;
    setCurrentIndex(newIndex);
    onBeachChange(beaches[newIndex]);
  }, [beaches, onBeachChange]);

  useEffect(() => {
    onBeachChange(beaches[0]);
  }, [beaches, onBeachChange]);

  useEffect(() => {
    const timer = setInterval(() => goTo(currentIndex + 1), 7000);
    return () => clearInterval(timer);
  }, [currentIndex, goTo]);

  return (
    <section id="inicio" className="relative w-full h-screen overflow-hidden">
      <Bubbles />

      {beaches.map((beach, index) => (
        <div
          key={beach.id}
          className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
            index === currentIndex ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
          }`}
        >
          <div className="absolute inset-0 hero-shine">
            <img
              src={beach.imageUrl}
              alt={beach.name}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="absolute inset-0"
            style={{
              background: `linear-gradient(180deg, color-mix(in srgb, var(--clr-primary-dark) var(--clr-overlay-top), transparent) 0%, color-mix(in srgb, var(--clr-primary-deeper) var(--clr-overlay-mid), transparent) 40%, color-mix(in srgb, black var(--clr-overlay-bottom), var(--clr-primary-deeper)) 100%)`,
            }}
          />

          <div className="absolute inset-0"
            style={{
              background: 'radial-gradient(ellipse at 20% 50%, color-mix(in srgb, var(--clr-primary) 15%, transparent) 0%, transparent 50%)',
            }}
          />
          <div className="absolute inset-0"
            style={{
              background: 'radial-gradient(ellipse at 80% 20%, color-mix(in srgb, var(--clr-primary-light) 10%, transparent) 0%, transparent 40%)',
            }}
          />

          <div className="absolute bottom-0 left-0 right-0 p-8 md:p-16 lg:p-24">
            <div className="max-w-7xl mx-auto">
              <div className="max-w-3xl">
                <div className="inline-block mb-4 px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase"
                  style={{
                    background: 'linear-gradient(135deg, rgba(255,255,255,0.2), rgba(255,255,255,0.05))',
                    backdropFilter: 'blur(8px)',
                    border: '1px solid rgba(255,255,255,0.25)',
                    color: 'rgba(255,255,255,0.9)',
                  }}
                >
                  <span className="mr-1.5">✦</span> Descubre
                </div>

                <h1 className="font-heading text-5xl md:text-7xl lg:text-8xl font-extrabold mb-4"
                  style={{
                    background: 'linear-gradient(135deg, #ffffff 0%, var(--clr-primary-light) 50%, #ffffff 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    textShadow: '0 2px 40px var(--clr-glow)',
                    lineHeight: '1.1',
                  }}
                >
                  {beach.name}
                </h1>

                <p className="text-base md:text-xl max-w-2xl font-light leading-relaxed mb-6"
                  style={{ color: 'rgba(255,255,255,0.85)', textShadow: '0 1px 12px rgba(0,0,0,0.3)' }}
                >
                  {beach.shortDescription}
                </p>

                <div className="flex flex-wrap items-center gap-3">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium"
                    style={{
                      background: 'rgba(255,255,255,0.1)',
                      backdropFilter: 'blur(8px)',
                      border: '1px solid rgba(255,255,255,0.2)',
                      color: 'rgba(255,255,255,0.85)',
                    }}
                  >
                    <svg className="w-3.5 h-3.5" style={{ color: 'var(--clr-primary-light)' }} fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                    </svg>
                    {beach.location}
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium"
                    style={{
                      background: 'rgba(255,255,255,0.1)',
                      backdropFilter: 'blur(8px)',
                      border: '1px solid rgba(255,255,255,0.2)',
                      color: 'rgba(255,255,255,0.85)',
                    }}
                  >
                    <svg className="w-3.5 h-3.5" style={{ color: 'var(--clr-accent-light)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    {beach.bestSeason}
                  </span>
                </div>

                <Link
                  to={`/playa/${beach.id}`}
                  className="inline-flex items-center gap-2 mt-8 px-6 py-3 rounded-full text-sm font-semibold text-white gel-btn shadow-lg"
                >
                  Ver detalles
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
      ))}

      <div className="absolute top-1/2 left-0 right-0 -translate-y-1/2 flex justify-between px-4 z-10 pointer-events-none">
        <button
          onClick={() => goTo(currentIndex - 1)}
          className="pointer-events-auto p-3 rounded-full transition-all duration-200"
          style={{
            background: 'rgba(255,255,255,0.12)',
            backdropFilter: 'blur(8px)',
            border: '1px solid rgba(255,255,255,0.2)',
            color: 'white',
            boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
          }}
          onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.25)'; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.12)'; }}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button
          onClick={() => goTo(currentIndex + 1)}
          className="pointer-events-auto p-3 rounded-full transition-all duration-200"
          style={{
            background: 'rgba(255,255,255,0.12)',
            backdropFilter: 'blur(8px)',
            border: '1px solid rgba(255,255,255,0.2)',
            color: 'white',
            boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
          }}
          onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.25)'; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.12)'; }}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      <div className="absolute bottom-8 right-8 md:right-16 flex gap-2 z-10">
        {beaches.map((_, index) => (
          <button
            key={index}
            onClick={() => goTo(index)}
            className="transition-all duration-500 rounded-full"
            style={{
              width: index === currentIndex ? '32px' : '8px',
              height: '8px',
              background: index === currentIndex
                ? 'linear-gradient(90deg, var(--clr-primary), var(--clr-primary-dark))'
                : 'rgba(255,255,255,0.35)',
              boxShadow: index === currentIndex ? '0 0 12px var(--clr-glow)' : 'none',
            }}
          />
        ))}
      </div>
    </section>
  );
}
