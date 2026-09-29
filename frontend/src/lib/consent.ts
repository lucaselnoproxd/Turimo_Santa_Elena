export type ConsentPreference = 'all' | 'essential' | null;

const KEY = 'se-cookie-consent';

export function getConsent(): ConsentPreference {
  try {
    const value = localStorage.getItem(KEY);
    return value === 'all' || value === 'essential' ? value : null;
  } catch {
    return null;
  }
}

export function setConsent(pref: Exclude<ConsentPreference, null>) {
  try {
    localStorage.setItem(KEY, pref);
  } catch {
    // almacenamiento no disponible (p. ej. modo privado): la analítica no carga
  }
}