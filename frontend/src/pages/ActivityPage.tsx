import { Link, useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import WavesBackground from '../components/WavesBackground';
import Footer from '../components/Footer';
import Icon, { type IconName } from '../components/Icon';
import Section from '../components/Section';
import SectionHeading from '../components/SectionHeading';
import GradientTitle from '../components/GradientTitle';
import ContactButtons from '../components/ContactButtons';
import ActivityCard from '../components/ActivityCard';
import {
  getActivityBySlug,
  getActivitiesByCategory,
  getCategoryById,
  categoryColor,
  difficultyColor,
} from '../data/activities';
import { initials } from '../lib/utils';
import { beaches } from '../data/beaches';

export default function ActivityPage() {
  const { slug } = useParams<{ slug: string }>();
  const activity = slug ? getActivityBySlug(slug) : undefined;

  if (!activity) {
    return (
      <div className="min-h-screen">
        <WavesBackground />
        <Navbar />
        <div className="flex flex-col items-center justify-center pt-40 pb-24 px-4 text-center">
          <div className="gel-card p-10">
            <h1 className="font-heading text-2xl font-bold mb-3" style={{ color: 'var(--clr-text-heading)' }}>
              Experiencia no encontrada
            </h1>
            <p className="text-sm mb-6" style={{ color: 'var(--clr-text-muted)' }}>
              La experiencia que buscas no existe o fue removida.
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

  const category = getCategoryById(activity.category);
  const color = categoryColor(activity.category);
  const related = getActivitiesByCategory(activity.category).filter((a) => a.slug !== activity.slug).slice(0, 3);
  const relatedBeaches = activity.beaches
    ?.map((id) => beaches.find((b) => b.id === id))
    .filter((b) => b !== undefined) ?? [];

  const quickInfo: { label: string; value: string; color: string; icon: IconName }[] = [
    { label: 'Estacionalidad', value: activity.estacionalidad, color: 'var(--clr-primary)', icon: 'calendar' },
    { label: 'Horario', value: activity.horario, color: 'var(--clr-accent)', icon: 'clock' },
    { label: 'Dificultad', value: activity.dificultad, color: difficultyColor(activity.dificultadLevel), icon: 'bolt' },
  ];

  return (
    <div className="min-h-screen">
      <WavesBackground />
      <Navbar />

      {/* Hero */}
      <section className="relative pt-16">
        <div className="relative h-[420px] md:h-[540px] overflow-hidden">
          <div className="absolute inset-0 hero-shine">
            <img src={activity.cover} alt={activity.title} className="w-full h-full object-cover object-center" />
          </div>
          <div className="absolute bottom-0 left-0 right-0 text-scrim">
            <div className="max-w-6xl mx-auto px-6 md:px-12 pt-32 pb-10">
              <Link
                to="/"
                className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold mb-5 transition-all text-white"
                style={{
                  background: 'rgba(0,0,0,0.35)',
                  backdropFilter: 'blur(8px)',
                  border: '1px solid rgba(255,255,255,0.25)',
                }}
              >
                <Icon name="arrow-left" className="w-3.5 h-3.5" />
                Volver al inicio
              </Link>
              <span
                className="inline-block px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-white mb-4"
                style={{ background: color }}
              >
                {category?.name}
              </span>
              <h1 className="font-heading text-4xl md:text-6xl font-extrabold text-white" style={{ textShadow: '0 2px 30px rgba(0,0,0,0.6)' }}>
                {activity.title}
              </h1>
              <p className="text-white/85 text-base md:text-lg mt-3 max-w-2xl font-light">{activity.tagline}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Datos rápidos estilo sitio de referencia */}
      <Section size="sm" width="6xl">
        <div className="gel-card shine p-6 md:p-8 grid sm:grid-cols-3 gap-6">
          {quickInfo.map((info) => (
            <div key={info.label} className="flex items-start gap-3">
              <div
                className="w-10 h-10 flex items-center justify-center text-white flex-shrink-0"
                style={{
                  background: `linear-gradient(135deg, ${info.color}, color-mix(in srgb, ${info.color} 60%, black))`,
                  boxShadow: `inset 0 1px 0 rgba(255,255,255,0.3), 0 4px 12px color-mix(in srgb, ${info.color} 30%, transparent)`,
                }}
              >
                <Icon name={info.icon} className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest mb-0.5" style={{ color: 'var(--clr-text-muted)' }}>
                  {info.label}
                </p>
                <p className="text-sm font-semibold" style={{ color: 'var(--clr-text-heading)' }}>{info.value}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Descripción */}
      <Section size="sm" width="6xl">
        <div className="grid md:grid-cols-5 gap-10">
          <div className="md:col-span-3">
            <GradientTitle className="text-2xl mb-5">Sobre esta experiencia</GradientTitle>
            <div className="space-y-4">
              {activity.description.map((paragraph, i) => (
                <p key={i} className="leading-relaxed text-base" style={{ color: 'var(--clr-text-body)' }}>
                  {paragraph}
                </p>
              ))}
            </div>
          </div>

          <div className="md:col-span-2 space-y-8">
            {activity.lugares.length > 0 && (
              <div className="gel-card shine p-6">
                <h3 className="font-heading text-lg font-bold mb-4" style={{ color: 'var(--clr-text-heading)' }}>
                  Lugares donde practicar
                </h3>
                <ul className="space-y-2.5">
                  {activity.lugares.map((place) => (
                    <li key={place} className="flex items-start gap-2.5 text-sm" style={{ color: 'var(--clr-text-body)' }}>
                      <Icon name="map-pin" className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color }} />
                      {place}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {relatedBeaches.length > 0 && (
              <div className="gel-card shine p-6">
                <h3 className="font-heading text-lg font-bold mb-4" style={{ color: 'var(--clr-text-heading)' }}>
                  Playas cercanas
                </h3>
                <div className="flex flex-wrap gap-2">
                  {relatedBeaches.map((beach) => (
                    <Link
                      key={beach.id}
                      to={`/playa/${beach.id}`}
                      className="px-3 py-1.5 text-xs font-semibold transition-all duration-200"
                      style={{
                        background: 'color-mix(in srgb, var(--clr-primary) 8%, transparent)',
                        border: '1px solid color-mix(in srgb, var(--clr-primary) 20%, transparent)',
                        color: 'var(--clr-text-muted)',
                      }}
                      onMouseEnter={(e) => { e.currentTarget.style.background = 'color-mix(in srgb, var(--clr-primary) 15%, transparent)'; }}
                      onMouseLeave={(e) => { e.currentTarget.style.background = 'color-mix(in srgb, var(--clr-primary) 8%, transparent)'; }}
                    >
                      {beach.name}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </Section>

      {/* Operadoras */}
      {activity.operadores.length > 0 && (
        <Section size="sm" width="6xl">
          <SectionHeading
            badge="Operadoras turísticas"
            title="¿Con quién vivir la experiencia?"
            subtitle="Contacta directamente con las operadoras autorizadas. Su WhatsApp se configura en src/data/activities.ts."
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {activity.operadores.map((op) => (
              <div key={op.name} className="gel-card shine p-6 flex flex-col items-center text-center">
                <div
                  className="w-14 h-14 flex items-center justify-center text-white font-heading text-lg font-bold mb-3"
                  style={{
                    background: 'linear-gradient(135deg, var(--clr-primary), var(--clr-primary-dark))',
                    boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.3), 0 4px 12px var(--clr-glow)',
                  }}
                >
                  {initials(op.name).toUpperCase()}
                </div>
                <h4 className="font-heading text-base font-bold mb-4" style={{ color: 'var(--clr-text-heading)' }}>
                  {op.name}
                </h4>
                <ContactButtons contact={op.contact} whatsappLabel="Reservar" size="sm" align="center" />
              </div>
            ))}
          </div>
        </Section>
      )}

      {/* Transporte público */}
      {activity.transporte.length > 0 && (
        <Section size="sm" width="6xl">
          <SectionHeading
            badge="Cómo llegar"
            title="Transporte público"
            subtitle="Estas son las cooperativas y servicios de transporte que te llevan al destino."
          />
          <div className="gel-card shine p-8">
            <ul className="grid sm:grid-cols-2 gap-3">
              {activity.transporte.map((t) => (
                <li key={t} className="flex items-center gap-3 text-sm" style={{ color: 'var(--clr-text-body)' }}>
                  <Icon name="calendar" className="w-4 h-4 flex-shrink-0" style={{ color: 'var(--clr-accent)' }} />
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </Section>
      )}

      {/* Galería */}
      {activity.gallery.length > 0 && (
        <Section size="sm" width="6xl">
          <GradientTitle className="text-2xl md:text-3xl text-center mb-10">Galería</GradientTitle>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {activity.gallery.map((img, index) => (
              <div key={index} className="gel-card overflow-hidden group push-card">
                <img
                  src={img}
                  alt={`${activity.cardTitle} ${index + 1}`}
                  loading="lazy"
                  className="w-full h-52 object-cover object-center push-img"
                />
              </div>
            ))}
          </div>
        </Section>
      )}

      {/* Relacionadas */}
      {related.length > 0 && (
        <Section size="sm" width="6xl">
          <SectionHeading
            badge="Sigue explorando"
            title={`Más ${category?.short.toLowerCase()}`}
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {related.map((a) => (
              <ActivityCard key={a.slug} activity={a} compact />
            ))}
          </div>
        </Section>
      )}

      <Footer />
    </div>
  );
}
