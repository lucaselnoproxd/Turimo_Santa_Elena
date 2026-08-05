import Icon from './Icon';

interface WhatsAppButtonProps {
  href: string;
  label?: string;
  size?: 'sm' | 'md';
}

export default function WhatsAppButton({ href, label = 'Contactar por WhatsApp', size = 'md' }: WhatsAppButtonProps) {
  const padding = size === 'sm' ? 'px-4 py-2.5' : 'px-7 py-3';

  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className={`inline-flex items-center gap-2 ${padding} text-sm font-bold text-white transition-all duration-200`}
      style={{
        background: 'linear-gradient(180deg, #25D366 0%, #128C7E 100%)',
        boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.35), 0 4px 12px rgba(37,211,102,0.35)',
      }}
      onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-2px)'; }}
      onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; }}
    >
      <Icon name="whatsapp" className="w-4 h-4" />
      {label}
    </a>
  );
}
