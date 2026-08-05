import { useState } from 'react';
import { Link } from 'react-router-dom';
import Icon from './Icon';
import { categories, getActivitiesByCategory } from '../data/activities';

type MenuKey = 'Acuaticas' | 'Culturales' | 'Deportivas' | 'Naturales';

const MENU_KEYS: MenuKey[] = ['Acuaticas', 'Culturales', 'Deportivas', 'Naturales'];

export default function Navbar() {
  const [openMenu, setOpenMenu] = useState<MenuKey | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileMenu, setMobileMenu] = useState<MenuKey | null>(null);

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50"
      style={{
        background: 'linear-gradient(180deg, rgba(255,255,255,0.95) 0%, rgba(240,248,255,0.9) 100%)',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid rgba(0,180,216,0.15)',
        boxShadow: '0 4px 30px rgba(0,119,182,0.08)',
      }}
    >
      <div className="relative">
        <div
          className="absolute top-0 left-0 right-0 h-px"
          style={{ background: 'linear-gradient(90deg, transparent, var(--clr-primary), transparent)' }}
        />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center gap-3">
              <div
                className="w-9 h-9 gel-btn flex items-center justify-center text-white text-base"
                style={{ borderRadius: 0, boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.4), 0 4px 12px var(--clr-glow)' }}
              >
                <Icon name="brand" className="w-5 h-5" />
              </div>
              <div>
                <span className="font-heading text-lg font-bold text-gradient">Santa Elena</span>
                <span
                  className="block text-[10px] font-body font-light tracking-widest uppercase -mt-0.5"
                  style={{ color: 'var(--clr-text-muted)' }}
                >
                  Ecuador · Turismo
                </span>
              </div>
            </Link>

            {/* Menú escritorio */}
            <div className="hidden lg:flex items-center gap-1">
              {MENU_KEYS.map((key) => {
                const cat = categories.find((c) => c.id === key);
                return (
                  <div
                    key={key}
                    className="relative"
                    onMouseEnter={() => setOpenMenu(key)}
                    onMouseLeave={() => setOpenMenu(null)}
                  >
                    <button
                      className="px-4 py-2 text-sm font-semibold transition-all duration-200 inline-flex items-center gap-1.5"
                      style={{
                        color: openMenu === key ? 'var(--clr-primary-dark)' : 'var(--clr-text-link)',
                        background: openMenu === key ? 'color-mix(in srgb, var(--clr-primary) 10%, transparent)' : 'transparent',
                      }}
                    >
                      {cat?.name}
                      <Icon name="chevron-down" className="w-3.5 h-3.5" />
                    </button>

                    {openMenu === key && (
                      <div className="absolute left-0 top-full pt-1 w-64">
                        <div
                          className="p-2"
                          style={{
                            background: 'rgba(255,255,255,0.98)',
                            backdropFilter: 'blur(12px)',
                            border: '1px solid color-mix(in srgb, var(--clr-primary) 15%, transparent)',
                            boxShadow: '0 12px 40px rgba(0,119,182,0.15)',
                          }}
                        >
                          {getActivitiesByCategory(key).map((a) => (
                            <Link
                              key={a.slug}
                              to={`/experiencia/${a.slug}`}
                              className="block px-3 py-2 text-sm font-medium transition-all duration-150 nav-dropdown-link"
                            >
                              {a.cardTitle}
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}

              <Link to="/#playas" className="px-4 py-2 text-sm font-semibold transition-all duration-200 nav-item">
                Playas
              </Link>
              <Link
                to="/#contacto"
                className="px-4 py-2 text-sm font-bold text-white gel-btn ml-2"
              >
                Contáctanos
              </Link>
            </div>

            {/* Botón móvil */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-2 transition-all duration-200"
              style={{ background: mobileOpen ? 'color-mix(in srgb, var(--clr-primary) 10%, transparent)' : 'transparent' }}
            >
              <Icon name={mobileOpen ? 'x' : 'menu'} className="w-5 h-5" style={{ color: 'var(--clr-primary-dark)' }} />
            </button>
          </div>
        </div>
      </div>

      {/* Menú móvil */}
      {mobileOpen && (
        <div
          className="lg:hidden max-h-[80vh] overflow-y-auto"
          style={{
            background: 'rgba(255,255,255,0.98)',
            backdropFilter: 'blur(12px)',
            borderTop: '1px solid color-mix(in srgb, var(--clr-primary) 15%, transparent)',
          }}
        >
          <div className="px-4 py-3 space-y-1">
            {MENU_KEYS.map((key) => {
              const cat = categories.find((c) => c.id === key);
              const open = mobileMenu === key;
              return (
                <div key={key}>
                  <button
                    onClick={() => setMobileMenu(open ? null : key)}
                    className="w-full flex items-center justify-between px-4 py-3 text-sm font-semibold transition-all"
                    style={{ color: 'var(--clr-text-link)' }}
                  >
                    {cat?.name}
                    <Icon name="chevron-down" className={`w-4 h-4 transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
                  </button>
                  {open && (
                    <div className="pl-4 space-y-1 pb-1">
                      {getActivitiesByCategory(key).map((a) => (
                        <Link
                          key={a.slug}
                          to={`/experiencia/${a.slug}`}
                          className="block px-4 py-2 text-sm font-medium transition-all"
                          style={{ color: 'var(--clr-text-muted)' }}
                          onClick={() => setMobileOpen(false)}
                        >
                          {a.cardTitle}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
            <Link to="/#playas" className="block px-4 py-3 text-sm font-semibold nav-item" onClick={() => setMobileOpen(false)}>
              Playas
            </Link>
            <Link to="/#contacto" className="block px-4 py-3 text-sm font-bold text-white gel-btn text-center" onClick={() => setMobileOpen(false)}>
              Contáctanos
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
