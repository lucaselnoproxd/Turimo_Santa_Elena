import { useEffect, useState } from 'react';
import { adminCrud } from '../../../lib/admin';
import { ErrorBox, Field, MetaLabel, TextInput, BtnPrimary, BtnGhost } from '../ui';
import type { TemaAdmin } from '../types';

const HEX_FIELDS: { key: string; label: string }[] = [
  { key: 'primary', label: 'Color primario' },
  { key: 'primaryDark', label: 'Primario oscuro' },
  { key: 'primaryDeeper', label: 'Primario profundo' },
  { key: 'primaryLight', label: 'Primario claro' },
  { key: 'accent', label: 'Acento' },
  { key: 'accentLight', label: 'Acento claro' },
  { key: 'textLink', label: 'Texto enlace' },
  { key: 'textHeading', label: 'Títulos' },
  { key: 'textBody', label: 'Texto' },
  { key: 'textMuted', label: 'Texto secundario' },
  { key: 'star', label: 'Estrellas' },
  { key: 'footerHeading', label: 'Footer títulos' },
  { key: 'footerAccent', label: 'Footer acento' },
  { key: 'surface', label: 'Superficie' },
];

const RGBA_FIELDS: { key: string; label: string }[] = [
  { key: 'glow', label: 'Brillo (rgba)' },
  { key: 'footerText', label: 'Footer texto (rgba)' },
];

export default function TemaTab() {
  const [tema, setTema] = useState<TemaAdmin | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [localError, setLocalError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [restored, setRestored] = useState(false);

  useEffect(() => {
    let cancelled = false;
    adminCrud
      .list<TemaAdmin>('/admin/tema')
      .then((res) => {
        if (cancelled) return;
        setTema(res[0] ?? null);
        setError(null);
      })
      .catch((e) => {
        if (cancelled) return;
        setError(e instanceof Error ? e.message : 'No se pudo cargar el tema');
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  if (loading) return <p className="text-sm" style={{ color: 'var(--clr-text-muted)' }}>Cargando…</p>;
  if (error) return <ErrorBox message={error} />;
  if (!tema) return <p className="text-sm" style={{ color: 'var(--clr-text-muted)' }}>Sin tema definido.</p>;

  const setColor = (key: string, value: string) =>
    setTema({ ...tema, colors: { ...tema.colors, [key]: value } });

  const guardar = async () => {
    setSaving(true);
    setLocalError(null);
    try {
      const res = await adminCrud.update<TemaAdmin>('/admin/tema', tema.colors);
      setTema({ ...tema, colors: res.colors, updatedAt: res.updatedAt, updatedBy: res.updatedBy });
      window.location.reload();
    } catch (e) {
      setLocalError(e instanceof Error ? e.message : 'No se pudo guardar el tema');
    } finally {
      setSaving(false);
    }
  };

  const restaurar = () => {
    if (!window.confirm('¿Restaurar el tema verde original? Se perderán los cambios sin guardar.')) return;
    const defaults: Record<string, string> = {
      primary: '#2dc653', primaryDark: '#24a843', primaryDeeper: '#0b4e1e', primaryLight: '#a5d6a7',
      accent: '#00b4d8', accentLight: '#4dd0e1', textLink: '#1b8a36', textHeading: '#0b4e1e',
      textBody: '#0b4e1e', textMuted: '#1b8a36', star: '#2dc653', glow: 'rgba(45,198,83,0.5)',
      footerHeading: '#81c784', footerText: 'rgba(129,199,132,0.6)', footerAccent: '#2dc653', surface: '#e8f5e9',
    };
    setTema({ ...tema, colors: { ...defaults } });
    setRestored(true);
  };

  return (
    <div className="space-y-4 max-w-3xl">
      {localError ? <ErrorBox message={localError} /> : null}
      <p className="text-sm" style={{ color: 'var(--clr-text-muted)' }}>
        Estos colores se aplican al instante en todo el sitio (sin recompilar). El panel usa el mismo lenguaje visual.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {HEX_FIELDS.map((f) => (
          <Field key={f.key} label={f.label}>
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={/^#[0-9a-f]{6}$/i.test(tema.colors[f.key] ?? '') ? tema.colors[f.key] : '#2dc653'}
                onChange={(e) => setColor(f.key, e.target.value)}
                className="w-10 h-10 rounded-lg border cursor-pointer bg-transparent"
              />
              <TextInput value={tema.colors[f.key] ?? ''} onChange={(e) => setColor(f.key, e.target.value)} />
            </div>
          </Field>
        ))}
      </div>

      {RGBA_FIELDS.map((f) => (
        <Field key={f.key} label={f.label}>
          <TextInput value={tema.colors[f.key] ?? ''} onChange={(e) => setColor(f.key, e.target.value)} />
        </Field>
      ))}

      <div className="flex flex-wrap gap-2">
        <BtnPrimary onClick={guardar} disabled={saving}>
          {saving ? 'Guardando…' : 'Guardar y aplicar'}
        </BtnPrimary>
        {restored ? null : <BtnGhost onClick={restaurar}>Restaurar verde original</BtnGhost>}
      </div>
      <MetaLabel updatedAt={tema.updatedAt} updatedBy={tema.updatedBy} />
    </div>
  );
}