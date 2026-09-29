import Icon from './Icon';
import { siteConfig, waLink } from '../config/site';

// Botón flotante de WhatsApp. El número puede sobrescribirse en
// producción con la variable VITE_WHATSAPP (formato "593999999999").
// Si no hay número configurado, el botón no se muestra.
const WHATSAPP = import.meta.env.VITE_WHATSAPP ?? siteConfig.contact.whatsapp;

export default function WhatsAppFloat() {
  const href = waLink(WHATSAPP);
  if (!href) return null;

  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label="Chatear por WhatsApp"
      title="Escríbenos por WhatsApp"
      className="fixed bottom-5 right-5 z-40 flex items-center justify-center w-14 h-14 text-white shadow-lg transition-transform duration-200 hover:scale-110"
      style={{
        background: 'linear-gradient(180deg, #25D366 0%, #128C7E 100%)',
        boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.35), 0 8px 24px rgba(37,211,102,0.45)',
      }}
    >
      <Icon name="whatsapp" className="w-7 h-7" />
    </a>
  );
}