import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { adminSession, type AdminSession } from '../../lib/admin';
import ActividadesTab from './tabs/ActividadesTab';
import UbicacionesTab from './tabs/UbicacionesTab';
import EventosTab from './tabs/EventosTab';
import TemaTab from './tabs/TemaTab';
import ImagenesTab from './tabs/ImagenesTab';
import AdminLoginPage from './AdminLoginPage';

type TabKey = 'actividades' | 'ubicaciones' | 'eventos' | 'tema' | 'imagenes';

const TABS: { key: TabKey; label: string }[] = [
  { key: 'actividades', label: 'Actividades' },
  { key: 'ubicaciones', label: 'Ubicaciones' },
  { key: 'eventos', label: 'Eventos' },
  { key: 'tema', label: 'Tema' },
  { key: 'imagenes', label: 'Imágenes' },
];

export default function AdminDashboardPage() {
  const navigate = useNavigate();
  const [status, setStatus] = useState<'checking' | 'auth' | 'guest'>('checking');
  const [session, setSession] = useState<AdminSession | null>(null);
  const [tab, setTab] = useState<TabKey>('actividades');
  const [signingOut, setSigningOut] = useState(false);

  useEffect(() => {
    let cancelled = false;
    adminSession
      .me()
      .then((me) => {
        if (cancelled) return;
        setSession(me);
        setStatus('auth');
      })
      .catch(() => {
        if (!cancelled) setStatus('guest');
      });
    return () => {
      cancelled = true;
    };
  }, []);

  if (status === 'checking') {
    return (
      <p className="min-h-screen flex items-center justify-center text-sm" style={{ color: 'var(--clr-text-muted)' }}>
        Verificando sesión…
      </p>
    );
  }

  if (status === 'guest') return <AdminLoginPage />;

  const salir = async () => {
    setSigningOut(true);
    try {
      await adminSession.logout();
    } finally {
      navigate('/admin', { replace: true });
      window.location.reload();
    }
  };

  return (
    <main className="min-h-screen">
      <header className="sticky top-0 z-20 backdrop-blur border-b" style={{ background: 'color-mix(in srgb, var(--clr-primary) 8%, #ffffff)', borderColor: 'color-mix(in srgb, var(--clr-primary) 20%, #eee)' }}>
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between gap-3">
          <div className="min-w-0">
            <p className="font-heading font-bold truncate" style={{ color: 'var(--clr-text-heading)' }}>
              Panel de administración
            </p>
            <p className="text-xs truncate" style={{ color: 'var(--clr-text-muted)' }}>
              {session?.name ?? 'admin'}
            </p>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            <Link
              to="/"
              className="px-3 py-2 rounded-lg text-sm font-bold text-center"
              style={{ background: 'color-mix(in srgb, var(--clr-primary) 12%, #fff)', color: 'var(--clr-primary)' }}
            >
              Ver sitio
            </Link>
            <button
              type="button"
              onClick={salir}
              disabled={signingOut}
              className="px-3 py-2 rounded-lg text-sm font-bold text-white disabled:opacity-50"
              style={{ background: 'linear-gradient(135deg, #ef4444, #b91c1c)' }}
            >
              Salir
            </button>
          </div>
        </div>
      </header>

      <nav className="sticky top-[52px] z-10 border-b bg-white/80 backdrop-blur" style={{ borderColor: 'color-mix(in srgb, var(--clr-primary) 15%, #eee)' }}>
        <div className="max-w-5xl mx-auto px-4 flex gap-1 overflow-x-auto">
          {TABS.map((t) => (
            <button
              key={t.key}
              type="button"
              onClick={() => setTab(t.key)}
              className="px-3 py-2.5 text-sm font-semibold whitespace-nowrap border-b-2 transition"
              style={
                tab === t.key
                  ? { borderColor: 'var(--clr-primary)', color: 'var(--clr-primary)' }
                  : { borderColor: 'transparent', color: 'var(--clr-text-muted)' }
              }
            >
              {t.label}
            </button>
          ))}
        </div>
      </nav>

      <section className="max-w-5xl mx-auto px-4 py-6">
        {tab === 'actividades' && <ActividadesTab />}
        {tab === 'ubicaciones' && <UbicacionesTab />}
        {tab === 'eventos' && <EventosTab />}
        {tab === 'tema' && <TemaTab />}
        {tab === 'imagenes' && <ImagenesTab />}
      </section>
    </main>
  );
}