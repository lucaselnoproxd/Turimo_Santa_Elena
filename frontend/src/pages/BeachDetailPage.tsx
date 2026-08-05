import { Link, useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import WavesBackground from '../components/WavesBackground';
import Footer from '../components/Footer';
import Icon from '../components/Icon';
import Section from '../components/Section';
import GradientTitle from '../components/GradientTitle';
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
            <Link to="/" className="gel-btn px-5 py-2.5 text-white text-sm font-semibold inline-block">
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

      {/* Hero */}
      <section className="relative pt-16">
        <div className="relative h-[380px] md:h-[480px] overflow-hidden">
          <div className="absolute inset-0 hero-shine">
            <img src={beach.imageUrl} alt={beach.name} className="w-full h-full object-cover object-center" />
          </div>
          <div className="absolute inset-0"
            style={{
              background: 'linear-gradient(180deg, rgba(0,0,0,0.15) 0%, color-mix(in srgb, var(--clr-primary-deeper) 55%, transparent) 100%)',
            }}
          />
          <div className="absolute bottom-0 left-0 right-0 p-8 md:p-16">
            <div className="max-w-6xl mx-auto">
              <Link to="/"
                className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold mb-5 transition-all"
                style={{
                  background: 'rgba(255,255,255,0.12)',
                  backdropFilter: 'blur(8px)',
                  border: '1px solid rgba(255,255,255,0.25)',
                  color: 'white',
                }}
              >
                <Icon name="arrow-left" className="w-3.5 h-3.5" />
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

      {/* Ficha + destacados + consejos */}
      <Section size="xl" width="6xl">
        <div className="flex flex-wrap items-center gap-3 mb-10">
          <span className="px-4 py-1.5 text-xs font-semibold"
            style={{
              background: 'linear-gradient(135deg, color-mix(in srgb, var(--clr-primary) 10%, transparent), color-mix(in srgb, var(--clr-primary-dark) 5%, transparent))',
              border: '1px solid color-mix(in srgb, var(--clr-primary) 15%, transparent)',
              color: 'var(--clr-text-muted)',
            }}
          >
            {beach.location}
          </span>
          <RatingStars rating={beach.rating} />
          <span className="text-xs font-medium px-3 py-1.5"
            style={{
              background: 'color-mix(in srgb, var(--clr-accent) 10%, transparent)',
              color: 'var(--clr-accent)',
            }}
          >
            Mejor época: {beach.bestSeason}
          </span>
          <span className="text-xs font-medium px-3 py-1.5"
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
                    <Icon name="check" className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: 'var(--clr-accent)' }} />
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
                    <Icon name="tip" className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: 'var(--clr-primary)' }} />
                    {tip}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </Section>

      {/* Galería */}
      <Section size="md" width="6xl">
        <GradientTitle className="text-2xl md:text-3xl text-center mb-10">Galería</GradientTitle>
        <div className="grid sm:grid-cols-3 gap-4">
          {beach.gallery.map((img, index) => (
            <div key={index} className="gel-card overflow-hidden push-card">
              <img
                src={img}
                alt={`${beach.name} ${index + 1}`}
                className="w-full h-48 md:h-56 object-cover object-center push-img"
              />
            </div>
          ))}
        </div>
      </Section>

      <TravelServices beach={beach} />
      <Footer />
    </div>
  );
}
