import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import PageHead from '../components/PageHead';
import WavesBackground from '../components/WavesBackground';
import Footer from '../components/Footer';
import Section from '../components/Section';
import SectionHeading from '../components/SectionHeading';
import RatingStars from '../components/RatingStars';
import type { EventoCalendario } from '../data/eventos';
import { MESES, TIPO_INFO, eventosCalendario } from '../data/eventos';

const BASE_URL = import.meta.env.VITE_API_URL ?? '/api';

function useRemoteEventos(): EventoCalendario[] {
  const [eventos, setEventos] = useState<EventoCalendario[]>(eventosCalendario);

  useEffect(() => {
    let cancelled = false;
    fetch(`${BASE_URL}/eventos`)
      .then((res) => (res.ok ? (res.json() as Promise<EventoCalendario[]>) : null))
      .then((data) => {
        if (!cancelled && Array.isArray(data) && data.length > 0) {
          setEventos(data);
        }
      })
      .catch(() => {
        // sin backend: se usa el calendario local
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return eventos;
}

function FechaBadge({ evento }: { evento: EventoCalendario }) {
  if (evento.movil) {
    return (
      <span className="text-[10px] font-bold uppercase tracking-wider whitespace-nowrap flex-shrink-0" style={{ color: 'var(--clr-accent)' }}>
        Fecha móvil
      </span>
    );
  }
  return (
    <span
      className="w-7 h-7 flex-shrink-0 flex items-center justify-center text-white text-xs font-bold"
      style={{ background: 'linear-gradient(135deg, var(--clr-primary), var(--clr-primary-dark))' }}
    >
      {evento.dia ?? '—'}
    </span>
  );
}

function EventoCard({ evento }: { evento: EventoCalendario }) {
  const tipo = TIPO_INFO[evento.tipo];

  return (
    <li className="flex items-start gap-3 py-3 border-b last:border-b-0" style={{ borderColor: 'color-mix(in srgb, var(--clr-primary) 10%, transparent)' }}>
      <FechaBadge evento={evento} />
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center justify-between gap-x-2 gap-y-1 mb-0.5">
          <h4 className="font-heading text-sm font-bold leading-snug" style={{ color: 'var(--clr-text-heading)' }}>
            {evento.titulo}
          </h4>
          <RatingStars rating={evento.estrellas} size="small" />
        </div>
        <p className="text-xs leading-relaxed mb-1.5" style={{ color: 'var(--clr-text-muted)' }}>
          {evento.descripcion}
        </p>
        <span
          className="inline-block px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider"
          style={{ background: `color-mix(in srgb, ${tipo.color} 12%, transparent)`, color: tipo.color }}
        >
          {tipo.label}
        </span>
      </div>
    </li>
  );
}

function MesGrid({ titulo, eventos }: { titulo: string; eventos: EventoCalendario[] }) {
  return (
    <section
      className="gel-card shine p-5 flex flex-col"
      style={{ background: 'color-mix(in srgb, var(--clr-primary) 4%, #ffffff)' }}
    >
      <header className="flex items-baseline justify-between mb-2">
        <h3 className="font-heading text-lg font-bold" style={{ color: 'var(--clr-text-heading)' }}>
          {titulo}
        </h3>
        <span className="text-[10px] font-bold uppercase tracking-widest" style={{ color: 'var(--clr-text-muted)' }}>
          {eventos.length} {eventos.length === 1 ? 'evento' : 'eventos'}
        </span>
      </header>
      <ul className="mt-3">
        {eventos.map((e) => (
          <EventoCard key={`${e.mes}-${e.dia ?? 0}-${e.titulo}`} evento={e} />
        ))}
      </ul>
    </section>
  );
}

export default function EventosCalendarPage() {
  const eventos = useRemoteEventos();
  const deMes = (mes: number) => eventos.filter((e) => e.mes === mes);
  return (
    <div className="min-h-screen">
      <PageHead
        title="Calendario de eventos · Santa Elena Turismo"
        description="Feriados, fiestas y temporadas de la provincia de Santa Elena: los mejores momentos del año para visitarla."
        jsonLd={{
          '@context': 'https://schema.org',
          '@type': 'ItemList',
          name: 'Eventos del año en Santa Elena',
          itemListElement: eventos.map((e, i) => ({
            '@type': 'ListItem',
            position: i + 1,
            name: e.titulo,
          })),
        }}
      />
      <WavesBackground />
      <Navbar />

      <Section size="lg" width="7xl" className="pt-28 md:pt-32">
        <SectionHeading
          badge="Calendario anual"
          title="Eventos del año en Santa Elena"
          subtitle="Los mejores momentos del año para visitar la provincia: feriados, fiestas y temporadas, con su atractivo turístico."
        />

        {/* Grid escritorio / tablet */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {MESES.map((mesNom, i) => (
            <MesGrid key={mesNom} titulo={mesNom} eventos={deMes(i + 1)} />
          ))}
        </div>

        {/* Acordeón móvil */}
        <div className="md:hidden space-y-3">
          {MESES.map((mesNom, i) => (
            <details
              key={mesNom}
              className="gel-card shine group"
              style={{ background: 'color-mix(in srgb, var(--clr-primary) 4%, #ffffff)' }}
            >
              <summary
                className="flex items-center justify-between px-5 py-4 cursor-pointer list-none select-none"
                style={{ color: 'var(--clr-text-heading)' }}
              >
                <span className="font-heading text-base font-bold">{mesNom}</span>
                <span className="flex items-center gap-2">
                  <span className="text-[10px] font-bold uppercase tracking-widest" style={{ color: 'var(--clr-text-muted)' }}>
                    {deMes(i + 1).length} {deMes(i + 1).length === 1 ? 'evento' : 'eventos'}
                  </span>
                  <span
                    className="transition-transform duration-200 group-open:rotate-180"
                    style={{ color: 'var(--clr-primary)' }}
                  >
                    ▾
                  </span>
                </span>
              </summary>
              <ul className="px-5 pb-4">
                {deMes(i + 1).map((e) => (
                  <EventoCard key={`${e.mes}-${e.dia ?? 0}-${e.titulo}`} evento={e} />
                ))}
              </ul>
            </details>
          ))}
        </div>
      </Section>

      <Footer />
    </div>
  );
}