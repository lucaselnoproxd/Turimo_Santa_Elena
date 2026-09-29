import { type ReactNode } from 'react';

const inputCls =
  'w-full px-3 py-2 rounded-lg border text-sm outline-none transition ' +
  'focus:ring-2 bg-white/60';

function inputStyle(): React.CSSProperties {
  return {
    borderColor: 'color-mix(in srgb, var(--clr-primary) 35%, #ccc)',
    color: 'var(--clr-text-body)',
  };
}

export function Field({
  label,
  children,
  hint,
}: {
  label: string;
  children: ReactNode;
  hint?: string;
}) {
  return (
    <label className="block text-sm">
      <span className="block mb-1 font-semibold" style={{ color: 'var(--clr-text-heading)' }}>
        {label}
      </span>
      {children}
      {hint ? (
        <span className="block mt-1 text-xs" style={{ color: 'var(--clr-text-muted)' }}>
          {hint}
        </span>
      ) : null}
    </label>
  );
}

export function TextInput(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input {...props} className={`${inputCls} ${props.className ?? ''}`} style={inputStyle()} />;
}

export function TextArea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea {...props} className={`${inputCls} ${props.className ?? ''}`} style={inputStyle()} />;
}

export function Select(props: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return <select {...props} className={`${inputCls} ${props.className ?? ''}`} style={inputStyle()} />;
}

export function Checkbox({
  checked,
  onChange,
  label,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
  label: string;
}) {
  return (
    <label className="flex items-center gap-2 text-sm cursor-pointer select-none">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="w-4 h-4 rounded accent-[var(--clr-primary)]"
      />
      <span className="font-semibold" style={{ color: 'var(--clr-text-heading)' }}>
        {label}
      </span>
    </label>
  );
}

/** Editor de array de strings: un elemento por línea. */
export function LinesEditor({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string[];
  onChange: (v: string[]) => void;
}) {
  return (
    <Field label={label} hint="Un elemento por línea">
      <TextArea
        rows={4}
        value={value.join('\n')}
        onChange={(e) => onChange(e.target.value.split('\n'))}
      />
    </Field>
  );
}

export function OperadoresEditor({
  value,
  onChange,
}: {
  value: { name: string; contact?: Record<string, string> }[];
  onChange: (v: { name: string; contact?: Record<string, string> }[]) => void;
}) {
  const setRow = (idx: number, patch: { name?: string; contact?: Record<string, string> }) => {
    onChange(value.map((op, i) => (i === idx ? { ...op, ...patch } : op)));
  };
  const setContact = (idx: number, key: string, v: string) => {
    setRow(idx, { contact: { ...(value[idx].contact ?? {}), [key]: v } });
  };

  return (
    <div className="space-y-3">
      {value.map((op, idx) => (
        <div
          key={idx}
          className="p-3 rounded-lg border space-y-2"
          style={{ borderColor: 'color-mix(in srgb, var(--clr-primary) 25%, #ddd)' }}
        >
          <div className="flex items-center gap-2">
            <TextInput
              placeholder="Nombre del operador"
              value={op.name}
              onChange={(e) => setRow(idx, { name: e.target.value })}
            />
            <button
              type="button"
              onClick={() => onChange(value.filter((_, i) => i !== idx))}
              className="px-2 py-2 rounded-lg text-xs font-bold whitespace-nowrap"
              style={{ background: '#fee2e2', color: '#b91c1c' }}
            >
              Quitar
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <TextInput
              placeholder="WhatsApp (5939...) sin +"
              value={op.contact?.whatsapp ?? ''}
              onChange={(e) => setContact(idx, 'whatsapp', e.target.value)}
            />
            <TextInput
              placeholder="Email"
              value={op.contact?.email ?? ''}
              onChange={(e) => setContact(idx, 'email', e.target.value)}
            />
            <TextInput
              placeholder="Teléfono"
              value={op.contact?.phone ?? ''}
              onChange={(e) => setContact(idx, 'phone', e.target.value)}
            />
            <TextInput
              placeholder="Sitio web"
              value={op.contact?.website ?? ''}
              onChange={(e) => setContact(idx, 'website', e.target.value)}
            />
          </div>
        </div>
      ))}
      <button
        type="button"
        onClick={() => onChange([...value, { name: '', contact: {} }])}
        className="px-3 py-2 rounded-lg text-xs font-bold"
        style={{ background: 'color-mix(in srgb, var(--clr-primary) 12%, #fff)', color: 'var(--clr-primary)' }}
      >
        + Añadir operador
      </button>
    </div>
  );
}

export function MetaLabel({ updatedAt, updatedBy }: { updatedAt?: string; updatedBy?: string | null }) {
  if (!updatedAt && !updatedBy) return null;
  let text = 'Sin fecha de edición registrada';
  if (updatedAt) {
    text = `Última modificación ${new Date(updatedAt).toLocaleString('es-EC', {
      day: '2-digit',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit',
    })}`;
    if (updatedBy) text += ` por ${updatedBy}`;
  }
  return (
    <p className="text-[11px] mt-1" style={{ color: 'var(--clr-text-muted)' }}>
      {text}
    </p>
  );
}

export function BtnPrimary({
  children,
  onClick,
  disabled,
  type = 'button',
}: {
  children: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  type?: 'button' | 'submit';
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className="px-4 py-2 rounded-lg text-white text-sm font-bold transition disabled:opacity-50"
      style={{ background: 'linear-gradient(135deg, var(--clr-primary), var(--clr-primary-dark))' }}
    >
      {children}
    </button>
  );
}

export function BtnGhost({
  children,
  onClick,
}: {
  children: ReactNode;
  onClick?: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="px-3 py-2 rounded-lg text-sm font-bold transition"
      style={{ background: '#f1f5f9', color: 'var(--clr-text-muted)' }}
    >
      {children}
    </button>
  );
}

export function ErrorBox({ message }: { message: string }) {
  return (
    <p className="rounded-lg px-3 py-2 text-sm font-semibold" style={{ background: '#fee2e2', color: '#b91c1c' }}>
      {message}
    </p>
  );
}

export function EmptyBox({ children }: { children: ReactNode }) {
  return (
    <p className="text-sm py-6 text-center" style={{ color: 'var(--clr-text-muted)' }}>
      {children}
    </p>
  );
}