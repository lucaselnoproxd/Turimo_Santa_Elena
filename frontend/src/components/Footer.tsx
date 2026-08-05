import { Link } from 'react-router-dom';
import Icon, { type IconName } from './Icon';
import WhatsAppButton from './WhatsAppButton';
import { siteConfig, waLink, mailtoLink, telLink } from '../config/site';
import { activities } from '../data/activities';
import { beaches } from '../data/beaches';

export default function Footer() {
  const featured = activities.filter((a) => a.featured).slice(0, 6);
  const wa = waLink(siteConfig.contact.whatsapp);
  const mail = mailtoLink(siteConfig.contact.email);
  const tel = telLink(siteConfig.contact.phone);

  const socials: { key: IconName; href: string }[] = [
    { key: 'facebook', href: siteConfig.social.facebook },
    { key: 'instagram', href: siteConfig.social.instagram },
    { key: 'tiktok', href: siteConfig.social.tiktok },
    { key: 'youtube', href: siteConfig.social.youtube },
  ].filter((s) => s.href);

  return (
    <footer
      id="contacto"
      className="relative overflow-hidden"
      style={{
        background:
          'linear-gradient(180deg, var(--clr-primary-deeper) 0%, color-mix(in srgb, var(--clr-primary-deeper) 55%, #000000) 100%)',
      }}
    >
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse at 50% 0%, color-mix(in srgb, var(--clr-primary) 10%, transparent) 0%, transparent 60%)',
        }}
      />
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background:
            'linear-gradient(90deg, transparent, color-mix(in srgb, var(--clr-primary) 35%, transparent), transparent)',
        }}
      />

      <div className="max-w-7xl mx-auto px-4 py-16 relative">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Marca */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div
                className="w-9 h-9 flex items-center justify-center text-white"
                style={{
                  background: 'linear-gradient(135deg, var(--clr-primary), var(--clr-primary-dark))',
                  boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.2), 0 4px 12px var(--clr-glow)',
                }}
              >
                <Icon name="brand" className="w-5 h-5" />
              </div>
              <div>
                <span className="font-heading text-lg font-bold" style={{ color: 'var(--clr-primary-light)' }}>
                  {siteConfig.name}
                </span>
                <span
                  className="block text-[10px] font-light tracking-widest uppercase"
                  style={{ color: 'color-mix(in srgb, var(--clr-primary-light) 50%, transparent)' }}
                >
                  Ecuador · Turismo
                </span>
              </div>
            </div>
            <p className="text-sm leading-relaxed mb-5" style={{ color: 'var(--clr-footer-text)' }}>
              {siteConfig.description}
            </p>
            {socials.length > 0 && (
              <div className="flex items-center gap-2">
                {socials.map((s) => (
                  <a
                    key={s.key}
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={s.key}
                    className="p-2 transition-all duration-200 social-link"
                  >
                    <Icon name={s.key} className="w-4 h-4" />
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* Experiencias */}
          <div>
            <h4
              className="font-heading text-sm font-bold uppercase tracking-widest mb-5"
              style={{ color: 'var(--clr-footer-heading)' }}
            >
              Experiencias
            </h4>
            <ul className="space-y-2.5">
              {featured.map((a) => (
                <li key={a.slug}>
                  <Link
                    to={`/experiencia/${a.slug}`}
                    className="text-sm transition-all duration-200 inline-flex items-center gap-1.5 footer-link"
                  >
                    <span style={{ color: 'var(--clr-footer-accent)', fontSize: '10px' }}>▶</span>
                    {a.cardTitle}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Playas */}
          <div>
            <h4
              className="font-heading text-sm font-bold uppercase tracking-widest mb-5"
              style={{ color: 'var(--clr-footer-heading)' }}
            >
              Playas
            </h4>
            <ul className="space-y-2.5">
              {beaches.map((b) => (
                <li key={b.id}>
                  <Link
                    to={`/playa/${b.id}`}
                    className="text-sm transition-all duration-200 inline-flex items-center gap-1.5 footer-link"
                  >
                    <span style={{ color: 'var(--clr-footer-accent)', fontSize: '10px' }}>▶</span>
                    {b.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contacto */}
          <div>
            <h4
              className="font-heading text-sm font-bold uppercase tracking-widest mb-5"
              style={{ color: 'var(--clr-footer-heading)' }}
            >
              Contacto
            </h4>
            <ul className="space-y-3 mb-5">
              <li className="flex items-center gap-2.5 text-sm" style={{ color: 'var(--clr-footer-text)' }}>
                <Icon name="pin" className="w-4 h-4 flex-shrink-0" style={{ color: 'var(--clr-footer-accent)' }} />
                {siteConfig.location}
              </li>
              {mail && (
                <li>
                  <a
                    href={mail}
                    className="flex items-center gap-2.5 text-sm transition-all duration-200 footer-link"
                  >
                    <Icon name="mail" className="w-4 h-4 flex-shrink-0" style={{ color: 'var(--clr-footer-accent)' }} />
                    {siteConfig.contact.email}
                  </a>
                </li>
              )}
              {tel && (
                <li>
                  <a
                    href={tel}
                    className="flex items-center gap-2.5 text-sm transition-all duration-200 footer-link"
                  >
                    <Icon name="phone" className="w-4 h-4 flex-shrink-0" style={{ color: 'var(--clr-footer-accent)' }} />
                    {siteConfig.contact.phone}
                  </a>
                </li>
              )}
            </ul>

            {wa && <WhatsAppButton href={wa} label="Escríbenos por WhatsApp" size="sm" />}
          </div>
        </div>

        <div
          className="mt-12 pt-8 text-center relative"
          style={{ borderTop: '1px solid color-mix(in srgb, var(--clr-primary) 12%, transparent)' }}
        >
          <p className="text-xs font-light" style={{ color: 'color-mix(in srgb, var(--clr-primary) 25%, transparent)' }}>
            &copy; {new Date().getFullYear()} {siteConfig.name}. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
