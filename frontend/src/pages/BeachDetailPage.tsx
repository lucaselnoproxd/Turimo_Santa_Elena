import { Link, useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import WavesBackground from '../components/WavesBackground';
import Footer from '../components/Footer';
import RatingStars from '../components/RatingStars';
import TravelServices from '../components/TravelServices';
import { beaches } from '../data/beaches';

export default function BeachDetailPage() {
  const { id } = useParams<{ id: string }>();
  const beach = beaches.find((b) => b.id === id);

  if (!beach) {
    return (
      <div className="min-h-screen">
        <WavesBackground />
        <Navbar />
        <div className="flex flex-col items-center justify-center pt-40 pb-24 px-4 text-center">
          <div className="gel-card p-10">
            <h1 className="font-heading text-2xl font-bold mb-3" style={{ color: 'var(--clr-text-heading)' }}>
              Playa no encontrada
            </h1>
            <p className="text-sm mb-6" style={{ color: 'var(--clr-text-muted)' }}>
              La playa que buscas no existe o fue removida.
            </p>
            <Link to="/" className="gel-btn px-5 py-2.5 rounded-full text-white text-sm font-semibold inline-block">
              Volver al inicio
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <WavesBackground />
      <Navbar />

      <section className="relative pt-16">
        <div className="relative h-[380px] md:h-[480px] overflow-hidden">
          <div className="absolute inset-0 hero-shine">
            <img src={beach.imageUrl} alt={beach.name} className="w-full h-full object-cover" />
          </div>
          <div className="absolute inset-0"
            style={{
              background: 'linear-gradient(180deg, rgba(0,0,0,0.15) 0%, color-mix(in srgb, var(--clr-primary-deeper) 55%, transparent) 100%)',
            }}
          />
          <div className="absolute bottom-0 left-0 right-0 p-8 md:p-16">
            <div className="max-w-6xl mx-auto">
              <Link to="/"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold mb-5 transition-all"
                style={{
                  background: 'rgba(255,255,255,0.12)',
                  backdropFilter: 'blur(8px)',
                  border: '1px solid rgba(255,255,255,0.25)',
                  color: 'white',
                }}
              >
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
                Volver al inicio
              </Link>
              <h1 className="font-heading text-4xl md:text-6xl font-extrabold text-white"
                style={{ textShadow: '0 2px 30px var(--clr-glow)' }}
              >
                {beach.name}
              </h1>
              <p className="text-white/85 text-base md:text-lg mt-3 max-w-2xl font-light">
                {beach.shortDescription}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-wrap items-center gap-3 mb-10">
            <span className="px-4 py-1.5 rounded-full text-xs font-semibold"
              style={{
                background: 'linear-gradient(135deg, color-mix(in srgb, var(--clr-primary) 10%, transparent), color-mix(in srgb, var(--clr-primary-dark) 5%, transparent))',
                border: '1px solid color-mix(in srgb, var(--clr-primary) 15%, transparent)',
                color: 'var(--clr-text-muted)',
              }}
            >
              {beach.location}
            </span>
            <RatingStars rating={beach.rating} />
            <span className="text-xs font-medium px-3 py-1.5 rounded-full"
              style={{
                background: 'color-mix(in srgb, var(--clr-accent) 10%, transparent)',
                color: 'var(--clr-accent)',
              }}
            >
              Mejor época: {beach.bestSeason}
            </span>
            <span className="text-xs font-medium px-3 py-1.5 rounded-full"
              style={{
                background: 'color-mix(in srgb, var(--clr-primary) 8%, transparent)',
                color: 'var(--clr-text-muted)',
              }}
            >
              {beach.knownFor}
            </span>
          </div>

          <div className="grid md:grid-cols-2 gap-8 items-start">
            <div className="gel-card shine p-8">
              <h2 className="font-heading text-xl font-bold mb-4" style={{ color: 'var(--clr-text-heading)' }}>
                Sobre {beach.name}
              </h2>
              <p className="leading-relaxed" style={{ color: 'var(--clr-text-body)' }}>
                {beach.longDescription}
              </p>
            </div>

            <div className="space-y-6">
              <div className="gel-card shine p-8">
                <h3 className="font-heading text-lg font-bold mb-4" style={{ color: 'var(--clr-text-heading)' }}>
                  Lo que la hace especial
                </h3>
                <ul className="space-y-3">
                  {beach.highlights.map((highlight) => (
                    <li key={highlight} className="flex items-start gap-2.5 text-sm" style={{ color: 'var(--clr-text-body)' }}>
                      <svg className="w-4 h-4 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20" style={{ color: 'var(--clr-accent)' }}>
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      {highlight}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="gel-card shine p-8">
                <h3 className="font-heading text-lg font-bold mb-4" style={{ color: 'var(--clr-text-heading)' }}>
                  Consejos del guía
                </h3>
                <ul className="space-y-3">
                  {beach.tips.map((tip) => (
                    <li key={tip} className="flex items-start gap-2.5 text-sm" style={{ color: 'var(--clr-text-body)' }}>
                      <svg className="w-4 h-4 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20" style={{ color: 'var(--clr-primary)' }}>
                        <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
                      </svg>
                      {tip}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-heading text-2xl md:text-3xl font-extrabold text-center mb-10"
            style={{
              background: 'linear-gradient(135deg, var(--clr-primary-dark), var(--clr-primary))',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Galería
          </h2>
          <div className="grid sm:grid-cols-3 gap-4">
            {beach.gallery.map((img, index) => (
              <div key={index} className="gel-card overflow-hidden group">
                <img
                  src={img}
                  alt={`${beach.name} ${index + 1}`}
                  className="w-full h-48 md:h-56 object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      <TravelServices beach={beach} />
      <Footer />
    </div>
  );
}
