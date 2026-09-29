import { useState } from 'react';
import { useAdminCollection } from '../../../hooks/useAdminCollection';
import { ErrorBox, EmptyBox, Field, MetaLabel, Select, TextArea, TextInput, Checkbox, BtnPrimary, BtnGhost } from '../ui';
import type { EventoAdmin } from '../types';
import { blankEvento, MESES, TIPOS_EVENTO } from '../types';

export default function EventosTab() {
  const { items, loading, error, create, update, remove } =
    useAdminCollection<EventoAdmin>('/admin/eventos');
  const [editing, setEditing] = useState<EventoAdmin | null>(null);
  const [newOpen, setNewOpen] = useState(false);
  const [draft, setDraft] = useState<ReturnType<typeof blankEvento>>(blankEvento());
  const [saving, setSaving] = useState<string | null>(null);
  const [localError, setLocalError] = useState<string | null>(null);

  if (loading) return <p className="text-sm" style={{ color: 'var(--clr-text-muted)' }}>Cargando…</p>;
  if (error) return <ErrorBox message={error} />;

  const startEdit = (e: EventoAdmin) => {
    setEditing(e);
    setDraft({
      mes: e.mes,
      dia: e.dia,
      titulo: e.titulo,
      descripcion: e.descripcion,
      estrellas: e.estrellas,
      tipo: e.tipo,
      movil: e.movil,
    });
  };

  const run = async (fn: () => Promise<boolean>, done?: () => void) => {
    setLocalError(null);
    try {
      const ok = await fn();
      if (ok) done?.();
    } catch (err) {
      setLocalError(err instanceof Error ? err.message : 'No se pudo guardar');
    } finally {
      setSaving(null);
    }
  };

  const saveEdit = () => {
    if (!editing) return;
    setSaving(editing.id);
    void run(() => update(editing.id, draft), () => setEditing(null));
  };

  const saveNew = () => {
    if (!draft.titulo.trim()) {
      setLocalError('El título es obligatorio');
      return;
    }
    setSaving('nuevo');
    void run(
      () => create(draft),
      () => {
        setNewOpen(false);
        setDraft(blankEvento());
      },
    );
  };

  const form = () => (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <Field label="Mes">
          <Select
            value={draft.mes}
            onChange={(e) => setDraft({ ...draft, mes: Number(e.target.value) })}
          >
            {MESES.map((m, i) => (
              <option key={m} value={i + 1}>{m}</option>
            ))}
          </Select>
        </Field>
        <Field label="Día (opcional)">
          <TextInput
            type="number"
            min={1}
            max={31}
            value={draft.dia ?? ''}
            onChange={(e) => setDraft({ ...draft, dia: e.target.value ? Number(e.target.value) : null })}
          />
        </Field>
        <Field label="Tipo">
          <Select value={draft.tipo} onChange={(e) => setDraft({ ...draft, tipo: e.target.value as EventoAdmin['tipo'] })}>
            {TIPOS_EVENTO.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </Select>
        </Field>
      </div>
      <Field label="Título">
        <TextInput value={draft.titulo} onChange={(e) => setDraft({ ...draft, titulo: e.target.value })} />
      </Field>
      <Field label="Descripción">
        <TextArea rows={3} value={draft.descripcion} onChange={(e) => setDraft({ ...draft, descripcion: e.target.value })} />
      </Field>
      <div className="flex flex-wrap items-center gap-4">
        <Field label="Atractivo (1-5)">
          <Select value={draft.estrellas} onChange={(e) => setDraft({ ...draft, estrellas: Number(e.target.value) })}>
            {[1, 2, 3, 4, 5].map((n) => (
              <option key={n} value={n}>{n} {n === 1 ? 'estrella' : 'estrellas'}</option>
            ))}
          </Select>
        </Field>
        <div className="pt-5">
          <Checkbox checked={draft.movil} onChange={(v) => setDraft({ ...draft, movil: v })} label="Fecha móvil (Carnaval, Semana Santa…)" />
        </div>
      </div>
    </>
  );

  return (
    <div className="space-y-4">
      {localError ? <ErrorBox message={localError} /> : null}

      {!newOpen ? (
        <BtnPrimary onClick={() => setNewOpen(true)}>+ Nuevo evento</BtnPrimary>
      ) : (
        <div className="gel-card p-4 space-y-3" style={{ background: 'color-mix(in srgb, var(--clr-primary) 5%, #fff)' }}>
          {form()}
          <div className="flex gap-2">
            <BtnPrimary onClick={saveNew} disabled={saving === 'nuevo'}>Guardar</BtnPrimary>
            <BtnGhost onClick={() => { setNewOpen(false); setDraft(blankEvento()); }}>Cancelar</BtnGhost>
          </div>
        </div>
      )}

      {items.length === 0 ? (
        <EmptyBox>No hay eventos todavía.</EmptyBox>
      ) : (
        <ul className="divide-y" style={{ borderColor: 'color-mix(in srgb, var(--clr-primary) 15%, #eee)' }}>
          {items.map((e) =>
            editing?.id === e.id ? (
              <li key={e.id} className="py-4 space-y-3">
                {form()}
                <div className="flex gap-2">
                  <BtnPrimary onClick={saveEdit} disabled={saving === e.id}>Guardar</BtnPrimary>
                  <BtnGhost onClick={() => setEditing(null)}>Cancelar</BtnGhost>
                </div>
              </li>
            ) : (
              <li key={e.id} className="py-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-heading font-bold" style={{ color: 'var(--clr-text-heading)' }}>
                      {e.titulo}
                      <span className="ml-2 text-xs font-sans normal-case" style={{ color: 'var(--clr-text-muted)' }}>
                        {MESES[e.mes - 1]}{e.dia ? ` ${e.dia}` : ''} · {e.tipo}
                        {e.movil ? ' · fecha móvil' : ''}
                      </span>
                    </p>
                    <p className="text-sm mt-0.5" style={{ color: 'var(--clr-text-muted)' }}>
                      {e.descripcion}
                    </p>
                    <MetaLabel updatedAt={e.updatedAt} updatedBy={e.updatedBy} />
                  </div>
                  <div className="flex gap-2 flex-shrink-0">
                    <BtnGhost onClick={() => startEdit(e)}>Editar</BtnGhost>
                    <button
                      type="button"
                      onClick={async () => {
                        if (window.confirm(`¿Eliminar el evento «${e.titulo}»?`)) await remove(e.id);
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