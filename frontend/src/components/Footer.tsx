export default function Footer() {
  return (
    <footer id="contacto" className="relative overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, var(--clr-primary-deeper) 0%, #002b5c 40%, #001840 100%)',
      }}
    >
      <div className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at 50% 0%, color-mix(in srgb, var(--clr-primary) 8%, transparent) 0%, transparent 60%)',
        }}
      />
      <div className="absolute top-0 left-0 right-0 h-px"
        style={{
          background: 'linear-gradient(90deg, transparent, color-mix(in srgb, var(--clr-primary) 30%, transparent), transparent)',
        }}
      />

      <div className="max-w-7xl mx-auto px-4 py-16 relative">
        <div className="grid md:grid-cols-3 gap-12">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center text-white shadow-lg"
                style={{
                  background: 'linear-gradient(135deg, var(--clr-primary), var(--clr-primary-dark))',
                  boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.2), 0 4px 12px var(--clr-glow)',
                }}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6l4 2" />
                </svg>
              </div>
              <div>
                <span className="font-heading text-lg font-bold" style={{ color: 'var(--clr-primary-light)' }}>
                  Playas Santa Elena
                </span>
                <span className="block text-[10px] font-light tracking-widest uppercase"
                  style={{ color: 'color-mix(in srgb, var(--clr-primary-light) 50%, transparent)' }}
                >
                  Ecuador · Turismo
                </span>
              </div>
            </div>
            <p className="text-sm leading-relaxed" style={{ color: 'var(--clr-footer-text)' }}>
              Descubre las playas más hermosas de la provincia de Santa Elena, Ecuador.
              Tu guía turística para el paraíso costero ecuatoriano.
            </p>
          </div>

          <div>
            <h4 className="font-heading text-sm font-bold uppercase tracking-widest mb-5" style={{ color: 'var(--clr-footer-heading)' }}>
              Enlaces rápidos
            </h4>
            <ul className="space-y-2.5">
              {[
                { href: '#inicio', label: 'Inicio' },
                { href: '#playas', label: 'Playas' },
                { href: '#servicios', label: 'Hoteles y Guías' },
                { href: '#contacto', label: 'Contacto' },
              ].map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm transition-all duration-200 inline-flex items-center gap-1.5"
                    style={{ color: 'var(--clr-footer-text)' }}
                    onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--clr-primary-light)'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--clr-footer-text)'; }}
                  >
                    <span style={{ color: 'var(--clr-footer-accent)', fontSize: '10px' }}>▶</span>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-heading text-sm font-bold uppercase tracking-widest mb-5" style={{ color: 'var(--clr-footer-heading)' }}>
              Contacto
            </h4>
            <ul className="space-y-3">
              {[
                { icon: 'M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z', label: 'Santa Elena, Ecuador' },
                { icon: 'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z', label: 'info@playassantaelena.com' },
                { icon: 'M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z', label: '+593 99 999 9999' },
              ].map((item) => (
                <li key={item.label} className="flex items-center gap-2.5 text-sm" style={{ color: 'var(--clr-footer-text)' }}>
                  <svg className="w-4 h-4 flex-shrink-0" style={{ color: 'var(--clr-footer-accent)' }} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d={item.icon} />
                  </svg>
                  {item.label}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 text-center relative"
          style={{ borderTop: '1px solid color-mix(in srgb, var(--clr-primary) 10%, transparent)' }}
        >
          <p className="text-xs font-light" style={{ color: 'color-mix(in srgb, var(--clr-primary) 20%, transparent)' }}>
            &copy; {new Date().getFullYear()} Playas Santa Elena. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
