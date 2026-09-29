import { useState } from 'react';
import { useAdminCollection } from '../../../hooks/useAdminCollection';
import { ErrorBox, EmptyBox, Field, MetaLabel, TextArea, TextInput, BtnPrimary, BtnGhost } from '../ui';
import type { UbicacionAdmin } from '../types';
import { blankUbicacion } from '../types';

export default function UbicacionesTab() {
  const { items, loading, error, create, update, remove } =
    useAdminCollection<UbicacionAdmin>('/admin/ubicaciones');
  const [editing, setEditing] = useState<UbicacionAdmin | null>(null);
  const [newOpen, setNewOpen] = useState(false);
  const [draft, setDraft] = useState<ReturnType<typeof blankUbicacion>>(blankUbicacion());
  const [saving, setSaving] = useState<string | null>(null);
  const [localError, setLocalError] = useState<string | null>(null);

  if (loading) return <p className="text-sm" style={{ color: 'var(--clr-text-muted)' }}>Cargando…</p>;
  if (error) return <ErrorBox message={error} />;

  const startEdit = (u: UbicacionAdmin) => {
    setEditing(u);
    setDraft({ nombre: u.nombre, zona: u.zona, descripcion: u.descripcion ?? '' });
  };

  const saveEdit = async () => {
    if (!editing) return;
    setSaving(editing.id);
    setLocalError(null);
    try {
      const ok = await update(editing.id, draft);
      if (ok) setEditing(null);
    } catch (e) {
      setLocalError(e instanceof Error ? e.message : 'No se pudo guardar');
    } finally {
      setSaving(null);
    }
  };

  const saveNew = async () => {
    if (!draft.nombre.trim() || !draft.zona.trim()) {
      setLocalError('Nombre y zona son obligatorios');
      return;
    }
    setSaving('nuevo');
    setLocalError(null);
    try {
      const ok = await create(draft);
      if (ok) {
        setNewOpen(false);
        setDraft(blankUbicacion());
      }
    } catch (e) {
      setLocalError(e instanceof Error ? e.message : 'No se pudo crear');
    } finally {
      setSaving(null);
    }
  };

  return (
    <div className="space-y-4">
      {localError ? <ErrorBox message={localError} /> : null}

      {!newOpen ? (
        <BtnPrimary onClick={() => setNewOpen(true)}>+ Nueva ubicación</BtnPrimary>
      ) : (
        <div className="gel-card p-4 space-y-3" style={{ background: 'color-mix(in srgb, var(--clr-primary) 5%, #fff)' }}>
          <Field label="Nombre (ej: Montañita)">
            <TextInput value={draft.nombre} onChange={(e) => setDraft({ ...draft, nombre: e.target.value })} />
          </Field>
          <Field label="Zona (ej: Ruta del Spondylus)">
            <TextInput value={draft.zona} onChange={(e) => setDraft({ ...draft, zona: e.target.value })} />
          </Field>
          <Field label="Descripción">
            <TextArea rows={3} value={draft.descripcion ?? ''} onChange={(e) => setDraft({ ...draft, descripcion: e.target.value })} />
          </Field>
          <div className="flex gap-2">
            <BtnPrimary onClick={saveNew} disabled={saving === 'nuevo'}>Guardar</BtnPrimary>
            <BtnGhost onClick={() => { setNewOpen(false); setDraft(blankUbicacion()); }}>Cancelar</BtnGhost>
          </div>
        </div>
      )}

      {items.length === 0 ? (
        <EmptyBox>No hay ubicaciones todavía.</EmptyBox>
      ) : (
        <ul className="divide-y" style={{ borderColor: 'color-mix(in srgb, var(--clr-primary) 15%, #eee)' }}>
          {items.map((u) =>
            editing?.id === u.id ? (
              <li key={u.id} className="py-4 space-y-3">
                <TextInput value={draft.nombre} onChange={(e) => setDraft({ ...draft, nombre: e.target.value })} />
                <TextInput value={draft.zona} onChange={(e) => setDraft({ ...draft, zona: e.target.value })} />
                <TextArea rows={3} value={draft.descripcion ?? ''} onChange={(e) => setDraft({ ...draft, descripcion: e.target.value })} />
                <div className="flex gap-2">
                  <BtnPrimary onClick={saveEdit} disabled={saving === u.id}>Guardar</BtnPrimary>
                  <BtnGhost onClick={() => setEditing(null)}>Cancelar</BtnGhost>
                </div>
              </li>
            ) : (
              <li key={u.id} className="py-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-heading font-bold" style={{ color: 'var(--clr-text-heading)' }}>
                      {u.nombre}
                      <span className="ml-2 text-xs font-sans normal-case" style={{ color: 'var(--clr-text-muted)' }}>
                        {u.zona}
                      </span>
                    </p>
                    <p className="text-sm mt-0.5" style={{ color: 'var(--clr-text-muted)' }}>
                      {u.descripcion || 'Sin descripción'}
                    </p>
                    <MetaLabel updatedAt={u.updatedAt} updatedBy={u.updatedBy} />
                  </div>
                  <div className="flex gap-2 flex-shrink-0">
                    <BtnGhost onClick={() => startEdit(u)}>Editar</BtnGhost>
                    <button
                      type="button"
                      onClick={async () => {
                        if (window.confirm(`¿Eliminar la ubicación «${u.nombre}»?`)) await remove(u.id);
                      }}
                      className="px-3 py-2 rounded-lg text-sm font-bold transition"
                      style={{ background: '#fee2e2', color: '#b91c1c' }}
                    >
                      Borrar
                    </button>
                  </div>
                </div>
              </li>
            ),
          )}
        </ul>
      )}
    </div>
  );
}