// ============================================================
// CONFIGURACION GENERAL DEL SITIO
// ============================================================
// Edita este archivo para cambiar los datos de contacto de todo
// el sitio: tu email, WhatsApp, teléfono y redes sociales.
// Los botones de contacto de hoteles, guías y operadoras también
// se configuran aquí abajo (tipo ContactInfo) y en sus archivos.

export interface ContactInfo {
  whatsapp?: string; // número con código de país, sin "+" ni espacios. Ej: "593999999999"
  email?: string;    // correo. Ej: "hola@misitio.com"
  phone?: string;    // teléfono con formato libre. Ej: "+593 99 999 9999"
  website?: string;  // sitio web o reserva. Ej: "https://booking.com/..."
}

// Datos generales del sitio
export const siteConfig = {
  name: 'Santa Elena · Turismo',
  shortName: 'Santa Elena',
  tagline: 'Experiencias únicas en cada rincón',
  description:
    'La guía oficial de experiencias turísticas de la provincia de Santa Elena, Ecuador: surf, ballenas jorobadas, culturas milenarias, gastronomía y más.',
  location: 'Provincia de Santa Elena, Ecuador',

  // ---- CONTACTO GENERAL DEL SITIO (CAMBIA ESTO) ----
  contact: {
    whatsapp: '593999999999',
    email: 'info@santaelena.travel',
    phone: '+593 99 999 9999',
  } satisfies ContactInfo,

  // ---- REDES SOCIALES (deja en '' el que no uses) ----
  social: {
    facebook: 'https://facebook.com/',
    instagram: 'https://instagram.com/',
    tiktok: '',
    youtube: '',
  },
};

// Convierte un número en enlace de WhatsApp
export function waLink(number?: string): string | null {
  if (!number) return null;
  return `https://wa.me/${number.replace(/\D/g, '')}`;
}

export function mailtoLink(email?: string): string | null {
  if (!email) return null;
  return `mailto:${email}`;
}

export function telLink(phone?: string): string | null {
  if (!phone) return null;
  return `tel:${phone.replace(/[^\d+]/g, '')}`;
}
