import { useState } from 'react';
import { useAdminCollection } from '../../../hooks/useAdminCollection';
import {
  ErrorBox, EmptyBox, Field, MetaLabel, Select, TextInput,
  LinesEditor, OperadoresEditor, Checkbox, BtnPrimary, BtnGhost,
} from '../ui';
import type { ActividadAdmin } from '../types';
import { blankActividad, CATEGORIAS, DIFICULTADES } from '../types';

type ActividadPayload = Omit<ActividadAdmin, 'id' | 'createdAt' | 'updatedAt' | 'updatedBy'>;

export default function ActividadesTab() {
  const { items, loading, error, create, update, remove } =
    useAdminCollection<ActividadAdmin>('/admin/activities');
  const [editing, setEditing] = useState<ActividadAdmin | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [draft, setDraft] = useState<ActividadPayload>(blankActividad());
  const [saving, setSaving] = useState(false);
  const [localError, setLocalError] = useState<string | null>(null);

  if (loading) return <p className="text-sm" style={{ color: 'var(--clr-text-muted)' }}>Cargando…</p>;
  if (error) return <ErrorBox message={error} />;

  const set = <K extends keyof ActividadPayload>(key: K, value: ActividadPayload[K]) =>
    setDraft((d) => ({ ...d, [key]: value }));

  const startNew = () => {
    setDraft(blankActividad());
    setIsNew(true);
    setEditing(null);
    setLocalError(null);
  };

  const startEdit = (a: ActividadAdmin) => {
    const { id: _id, createdAt: _c, updatedAt: _u, updatedBy: _b, ...resto } = a;
    void _id; void _c; void _u; void _b;
    setDraft(resto as ActividadPayload);
    setIsNew(false);
    setEditing(a);
    setLocalError(null);
  };

  const guardar = async () => {
    if (!draft.slug.trim() || !draft.title.trim() || !draft.cardTitle.trim()) {
      setLocalError('Slug, título y título de tarjeta son obligatorios');
      return;
    }
    setSaving(true);
    setLocalError(null);
    try {
      const ok = editing ? await update(editing.id, draft) : await create(draft);
      if (ok) {
        setEditing(null);
        setIsNew(false);
      }
    } catch (e) {
      setLocalError(e instanceof Error ? e.message : 'No se pudo guardar');
    } finally {
      setSaving(false);
    }
  };

  const cancelar = () => {
    setEditing(null);
    setIsNew(false);
    setLocalError(null);
  };

  if (editing || isNew) {
    return (
      <div className="space-y-4 max-w-3xl">
        {localError ? <ErrorBox message={localError} /> : null}
        <div className="gel-card p-4 space-y-3" style={{ background: 'color-mix(in srgb, var(--clr-primary) 5%, #fff)' }}>
          <Field label="Slug (URL) — solo minúsculas, números y guiones">
            <TextInput value={draft.slug} onChange={(e) => set('slug', e.target.value.toLowerCase().replace(/\s+/g, '-'))} disabled={!!editing} />
          </Field>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="sm:col-span-2">
              <Field label="Título largo (encabezado)">
                <TextInput value={draft.title} onChange={(e) => set('title', e.target.value)} />
              </Field>
            </div>
            <Field label="Título corto (tarjeta)">
              <TextInput value={draft.cardTitle} onChange={(e) => set('cardTitle', e.target.value)} />
            </Field>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <Field label="Categoría">
              <Select value={draft.category} onChange={(e) => set('category', e.target.value)}>
                {CATEGORIAS.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </Select>
            </Field>
            <Field label="Nivel de dificultad">
              <Select value={draft.dificultadLevel} onChange={(e) => set('dificultadLevel', e.target.value)}>
                {DIFICULTADES.map((d) => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </Select>
            </Field>
            <Field label="Destacada">
              <div className="pt-1">
                <Checkbox checked={draft.featured} onChange={(v) => set('featured', v)} label="En portada" />
              </div>
            </Field>
          </div>
          <Field label="Frase corta (tagline)">
            <TextInput value={draft.tagline} onChange={(e) => set('tagline', e.target.value)} />
          </Field>
          <LinesEditor label="Descripción (un párrafo por línea)" value={draft.description} onChange={(v) => set('description', v)} />
          <Field label="URL de la imagen principal (cover)">
            <TextInput value={draft.cover} onChange={(e) => set('cover', e.target.value)} placeholder="Copia la URL desde el módulo Imágenes" />
          </Field>
          <LinesEditor label="Galería (URLs, una por línea)" value={draft.gallery} onChange={(v) => set('gallery', v)} />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Field label="Estacionalidad">
              <TextInput value={draft.estacionalidad} onChange={(e) => set('estacionalidad', e.target.value)} />
            </Field>
            <Field label="Horario">
              <TextInput value={draft.horario} onChange={(e) => set('horario', e.target.value)} />
            </Field>
          </div>
          <Field label="Dificultad (texto visible)">
            <TextInput value={draft.dificultad} onChange={(e) => set('dificultad', e.target.value)} />
          </Field>
          <Field label="Operadores y contacto">
            <OperadoresEditor value={draft.operadores} onChange={(v) => set('operadores', v)} />
          </Field>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <LinesEditor label="Lugares donde practicar (uno por línea)" value={draft.lugares} onChange={(v) => set('lugares', v)} />
            <LinesEditor label="Cómo llegar / transporte (uno por línea)" value={draft.transporte} onChange={(v) => set('transporte', v)} />
          </div>
          <LinesEditor label="Playas relacionadas (nombres, uno por línea)" value={draft.beaches ?? []} onChange={(v) => set('beaches', v)} />
          <div className="flex gap-2">
            <BtnPrimary onClick={guardar} disabled={saving}>
              {saving ? 'Guardando…' : editing ? 'Guardar cambios' : 'Crear actividad'}
            </BtnPrimary>
            <BtnGhost onClick={cancelar}>Cancelar</BtnGhost>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {items.length === 0 ? (
        <EmptyBox>No hay actividades en la base de datos todavía. Crea una desde el inicio de los datos migrados si quieres editarlas aquí.</EmptyBox>
      ) : (
        <ul className="divide-y" style={{ borderColor: 'color-mix(in srgb, var(--clr-primary) 15%, #eee)' }}>
          {items.map((a) => (
            <li key={a.id} className="py-4">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="font-heading font-bold" style={{ color: 'var(--clr-text-heading)' }}>
                    {a.cardTitle}
                    <span className="ml-2 text-xs font-sans normal-case" style={{ color: 'var(--clr-text-muted)' }}>
                      {a.category} · /actividades/{a.slug}
                    </span>
                  </p>
                  <p className="text-sm mt-0.5 line-clamp-2" style={{ color: 'var(--clr-text-muted)' }}>
                    {a.tagline}
                  </p>
                  <MetaLabel updatedAt={a.updatedAt} updatedBy={a.updatedBy} />
                </div>
                <div className="flex gap-2 flex-shrink-0">
                  <BtnGhost onClick={() => startEdit(a)}>Editar</BtnGhost>
                  <button
                    type="button"
                    onClick={async () => {
                      if (window.confirm(`¿Eliminar la actividad «${a.cardTitle}»?`)) await remove(a.id);
                    }}
                    className="px-3 py-2 rounded-lg text-sm font-bold transition"
                    style={{ background: '#fee2e2', color: '#b91c1c' }}
                  >
                    Borrar
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
      <BtnPrimary onClick={startNew}>+ Nueva actividad</BtnPrimary>
    </div>
  );
}