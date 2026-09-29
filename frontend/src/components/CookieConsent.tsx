import { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getConsent, setConsent, type ConsentPreference } from '../lib/consent';
import { syncAnalytics } from '../lib/analytics';

export default function CookieConsent() {
  const [pref, setPref] = useState<ConsentPreference>(getConsent);

  useEffect(() => {
    syncAnalytics();
  }, [pref]);

  const choose = useCallback((next: Exclude<ConsentPreference, null>) => {
    setConsent(next);
    setPref(next);
  }, []);

  if (pref !== null) return null;

  return (
    <aside
      role="region"
      aria-label="Aviso de cookies"
      className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6"
      style={{ fontFamily: 'Nunito, system-ui, sans-serif' }}
    >
      <div
        className="max-w-3xl mx-auto gel-card shine p-6"
        style={{
          background: 'color-mix(in srgb, var(--clr-primary-deeper) 92%, #000000)',
          border: '1px solid color-mix(in srgb, var(--clr-primary) 30%, transparent)',
        }}
      >
        <div className="flex flex-col md:flex-row md:items-center gap-4">
          <div className="flex-1">
            <p className="font-heading text-sm font-bold mb-1" style={{ color: 'var(--clr-primary-light)' }}>
              Usamos cookies
            </p>
            <p className="text-xs leading-relaxed" style={{ color: 'var(--clr-footer-text)' }}>
              Las necesarias para que el sitio funcione y, si aceptas, una medición de
              audiencia anónima. Puedes rechazar las opcionales sin pérdida de
              funcionalidad.{' '}
              <Link to="/cookies" className="underline underline-offset-2 font-semibold" style={{ color: 'var(--clr-primary-light)' }}>
                Más información
              </Link>
            </p>
          </div>
          <div className="flex flex-wrap gap-3 md:flex-shrink-0">
            <button
              type="button"
              onClick={() => choose('all')}
              className="px-5 py-2.5 text-xs font-bold text-white transition-all duration-200"
              style={{
                background: 'linear-gradient(135deg, var(--clr-primary), var(--clr-primary-dark))',
                boxShadow: '0 4px 12px var(--clr-glow)',
              }}
            >
              Aceptar todas
            </button>
            <button
              type="button"
              onClick={() => choose('essential')}
              className="px-5 py-2.5 text-xs font-semibold transition-all duration-200"
              style={{
                border: '1px solid color-mix(in srgb, var(--clr-primary-light) 35%, transparent)',
                color: 'var(--clr-primary-light)',
              }}
            >
              Solo esenciales
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
}