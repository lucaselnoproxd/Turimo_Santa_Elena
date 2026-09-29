import { getConsent } from './consent';

// Herramienta de analítica/medición opcional. Se activa SOLO si el
// usuario aceptó cookies opcionales Y se configuró la variable de
// entorno VITE_ANALYTICS_URL (por ejemplo un tag de Plausible o Umami).
// Sin esa variable este archivo no hace nada: cero peticiones externas.
const ANALYTICS_URL = import.meta.env.VITE_ANALYTICS_URL ?? '';
const ANALYTICS_DOMAIN = import.meta.env.VITE_ANALYTICS_DOMAIN;

function loadTag() {
  if (!ANALYTICS_URL || document.querySelector('script[data-analytics]')) return;

  const script = document.createElement('script');
  script.async = true;
  script.defer = true;
  script.src = ANALYTICS_URL;
  script.setAttribute('data-analytics', '');
  if (ANALYTICS_DOMAIN) script.setAttribute('data-domain', ANALYTICS_DOMAIN);
  document.head.appendChild(script);
}

function removeTag() {
  document.querySelectorAll('script[data-analytics]').forEach((el) => el.remove());
}

// Se llama al cargar el sitio y cada vez que el usuario cambia su decisión.
export function syncAnalytics() {
  if (getConsent() === 'all') {
    loadTag();
  } else {
    removeTag();
  }
}