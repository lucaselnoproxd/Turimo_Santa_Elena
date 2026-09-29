import { type FormEvent, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { adminSession } from '../../lib/admin';
import { ErrorBox } from './ui';

export default function AdminLoginPage() {
  const navigate = useNavigate();
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    if (!user.trim() || !password) {
      setError('Escribe usuario y contraseña');
      return;
    }
    setLoading(true);
    setError(null);
    try {
      await adminSession.login(user.trim(), password);
      navigate('/admin', { replace: true });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'No se pudo iniciar sesión');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="gel-card shine p-8" style={{ background: 'color-mix(in srgb, var(--clr-primary) 4%, #ffffff)' }}>
          <header className="text-center mb-6">
            <p className="text-xs font-bold uppercase tracking-widest" style={{ color: 'var(--clr-accent)' }}>
              Santa Elena · Turismo
            </p>
            <h1 className="font-heading text-2xl font-bold mt-1" style={{ color: 'var(--clr-text-heading)' }}>
              Panel de administración
            </h1>
          </header>

          {error ? <div className="mb-4"><ErrorBox message={error} /></div> : null}

          <form onSubmit={submit} className="space-y-4">
            <label className="block text-sm">
              <span className="block mb-1 font-semibold" style={{ color: 'var(--clr-text-heading)' }}>
                Usuario (ADMIN_USER)
              </span>
              <input
                value={user}
                onChange={(e) => setUser(e.target.value)}
                autoComplete="username"
                className="w-full px-3 py-2 rounded-lg border text-sm outline-none focus:ring-2"
                style={{
                  borderColor: 'color-mix(in srgb, var(--clr-primary) 35%, #ccc)',
                  color: 'var(--clr-text-body)',
                }}
              />
            </label>
            <label className="block text-sm">
              <span className="block mb-1 font-semibold" style={{ color: 'var(--clr-text-heading)' }}>
                Contraseña
              </span>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                className="w-full px-3 py-2 rounded-lg border text-sm outline-none focus:ring-2"
                style={{
                  borderColor: 'color-mix(in srgb, var(--clr-primary) 35%, #ccc)',
                  color: 'var(--clr-text-body)',
                }}
              />
            </label>
            <button
              type="submit"
              disabled={loading}
              className="w-full px-4 py-2.5 rounded-lg text-white text-sm font-bold transition disabled:opacity-50"
              style={{ background: 'linear-gradient(135deg, var(--clr-primary), var(--clr-primary-dark))' }}
            >
              {loading ? 'Entrando…' : 'Entrar'}
            </button>
          </form>

          <p className="text-center text-xs mt-5">
            <Link to="/" className="font-semibold" style={{ color: 'var(--clr-text-link)' }}>
              ← Volver al sitio
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}