import { useState } from 'react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50"
      style={{
        background: 'linear-gradient(180deg, rgba(255,255,255,0.95) 0%, rgba(240,248,255,0.9) 100%)',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid rgba(0,180,216,0.15)',
        boxShadow: '0 4px 30px rgba(0,119,182,0.08)',
      }}
    >
      <div className="relative">
        <div className="absolute top-0 left-0 right-0 h-px"
          style={{ background: 'linear-gradient(90deg, transparent, var(--clr-primary), transparent)' }}
        />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl gel-btn flex items-center justify-center text-white text-base shadow-lg">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6l4 2" />
                </svg>
              </div>
              <div>
                <span className="font-heading text-lg font-bold"
                  style={{
                    background: 'linear-gradient(135deg, var(--clr-primary-dark), var(--clr-primary))',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}
                >
                  Playas Santa Elena
                </span>
                <span className="block text-[10px] font-body font-light tracking-widest uppercase -mt-0.5"
                  style={{ color: 'var(--clr-text-muted)' }}
                >
                  Ecuador · Turismo
                </span>
              </div>
            </div>

            <div className="hidden md:flex items-center gap-1">
              {[
                { href: '#inicio', label: 'Inicio' },
                { href: '#playas', label: 'Playas' },
                { href: '#servicios', label: 'Hoteles y Guías' },
                { href: '#contacto', label: 'Contacto' },
              ].map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="relative px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200"
                  style={{ color: 'var(--clr-text-link)' }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = 'color-mix(in srgb, var(--clr-primary) 10%, transparent)'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; }}
                >
                  {item.label}
                </a>
              ))}
            </div>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 rounded-xl transition-all duration-200"
              style={{ background: isOpen ? 'color-mix(in srgb, var(--clr-primary) 10%, transparent)' : 'transparent' }}
            >
              <svg className="w-5 h-5" style={{ color: 'var(--clr-primary-dark)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden"
          style={{
            background: 'rgba(255,255,255,0.98)',
            backdropFilter: 'blur(12px)',
            borderTop: '1px solid color-mix(in srgb, var(--clr-primary) 15%, transparent)',
          }}
        >
          <div className="px-4 py-3 space-y-1">
            {[
              { href: '#inicio', label: 'Inicio' },
              { href: '#playas', label: 'Playas' },
              { href: '#servicios', label: 'Hoteles y Guías' },
              { href: '#contacto', label: 'Contacto' },
            ].map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="block px-4 py-3 text-sm font-medium rounded-xl transition-all"
                style={{ color: 'var(--clr-text-link)' }}
                onClick={() => setIsOpen(false)}
                onMouseEnter={(e) => { e.currentTarget.style.background = 'color-mix(in srgb, var(--clr-primary) 8%, transparent)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; }}
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
