import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import WavesBackground from '../components/WavesBackground';
import ActivityCarousel from '../components/ActivityCarousel';
import ActivityCard from '../components/ActivityCard';
import SectionHeading from '../components/SectionHeading';
import Section from '../components/Section';
import Icon from '../components/Icon';
import WhatsAppButton from '../components/WhatsAppButton';
import TravelServices from '../components/TravelServices';
import Footer from '../components/Footer';
import { categories, getActivitiesByCategory, categoryColor } from '../data/activities';
import { beaches } from '../data/beaches';
import { siteConfig, waLink } from '../config/site';

const categoryIds: Array<'Acuaticas' | 'Culturales' | 'Deportivas' | 'Naturales'> = [
  'Acuaticas',
  'Culturales',
  'Deportivas',
  'Naturales',
];

const sectionIds: Record<string, string> = {
  Acuaticas: 'acuaticas',
  Culturales: 'culturales',
  Deportivas: 'deportivas',
  Naturales: 'naturales',
};

export default function HomePage() {
  const wa = waLink(siteConfig.contact.whatsapp);

  return (
    <div className="min-h-screen">
      <WavesBackground />
      <Navbar />

      <ActivityCarousel />

      {/* Experiencias por categoría */}
      <Section id="experiencias" className="scroll-mt-16">
        <SectionHeading
          badge="Qué hacer en Santa Elena"
          title="Experiencias únicas en cada rincón"
          subtitle="De las olas de Montañita a las culturas milenarias y la Cordillera Chongón Colonche: 20 experiencias que contarás al volver a casa."
        />

        <div className="space-y-20">
          {categoryIds.map((catId) => {
            const cat = categories.find((c) => c.id === catId);
            const color = categoryColor(catId);
            const items = getActivitiesByCategory(catId);

            return (
              <div key={catId} id={sectionIds[catId]} className="scroll-mt-24">
                <div className="flex items-end justify-between gap-4 mb-8">
                  <div>
                    <span
                      className="inline-block w-2.5 h-2.5 mb-3"
                      style={{ background: color, boxShadow: `0 0 10px ${color}` }}
                    />
                    <h2
                      className="font-heading text-2xl md:text-4xl font-extrabold"
                      style={{ color: 'var(--clr-text-heading)' }}
                    >
                      {cat?.name}
                    </h2>
                    <p className="text-sm mt-1" style={{ color: 'var(--clr-text-muted)' }}>
                      {cat?.description}
                    </p>
                  </div>
                  <span className="hidden sm:block text-xs font-bold uppercase tracking-widest pb-1" style={{ color }}>
                    {items.length} experiencias
                  </span>
                </div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {items.map((activity) => (
                    <ActivityCard key={activity.slug} activity={activity} compact />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </Section>

      {/* Playas */}
      <Section id="playas">
        <SectionHeading
          badge="Nuestro litoral"
          title="Playas para cada momento"
          subtitle="Desde el surf internacional de Montañita hasta la calma de Ballenita y la joya escondida de Chuyuipe."
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {beaches.map((beach) => (
            <Link
              key={beach.id}
              to={`/playa/${beach.id}`}
              className="gel-card shine push-card group block overflow-hidden"
            >
              <div className="relative h-52 overflow-hidden">
                <img
                  src={beach.imageUrl}
                  alt={beach.name}
                  loading="lazy"
                  className="w-full h-full object-cover object-center push-img"
                />
                <span
                  className="absolute bottom-3 left-3 px-3 py-1 text-[11px] font-bold text-white"
                  style={{
                    background: 'rgba(0,0,0,0.45)',
                    backdropFilter: 'blur(6px)',
                    border: '1px solid rgba(255,255,255,0.25)',
                  }}
                >
                  {beach.knownFor}
                </span>
              </div>
              <div className="p-5">
                <h3 className="font-heading text-lg font-bold mb-1" style={{ color: 'var(--clr-text-heading)' }}>
                  {beach.name}
                </h3>
                <p className="text-sm mb-4" style={{ color: 'var(--clr-text-muted)' }}>
                  {beach.shortDescription}
                </p>
                <span
                  className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider"
                  style={{ color: 'var(--clr-primary-dark)' }}
                >
                  Ver playa
                  <Icon name="arrow-right" className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </Section>

      {/* Hoteles y guías */}
      <TravelServices />

      {/* CTA */}
      <Section size="xl" width="4xl">
        <div
          className="gel-card shine p-10 md:p-14 text-center relative overflow-hidden"
          style={{
            background: 'linear-gradient(145deg, color-mix(in srgb, var(--clr-primary) 8%, #ffffff), color-mix(in srgb, var(--clr-primary-light) 25%, #ffffff))',
          }}
        >
          <h2 className="font-heading text-3xl md:text-4xl font-extrabold mb-4 text-gradient">
            ¿Listo para tu próxima aventura?
          </h2>
          <p className="text-base max-w-xl mx-auto mb-8" style={{ color: 'var(--clr-text-muted)' }}>
            Escríbenos por WhatsApp y te ayudamos a armar tu itinerario: operadoras, hospedaje, guías y transporte.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {wa && <WhatsAppButton href={wa} label="Contactar por WhatsApp" />}
            <a href="#experiencias" className="inline-flex items-center gap-2 px-7 py-3 text-sm font-bold gel-btn text-white">
              Explorar experiencias
              <Icon name="chevron-down" className="w-4 h-4" />
            </a>
          </div>
        </div>
      </Section>

      <Footer />
    </div>
  );
}
