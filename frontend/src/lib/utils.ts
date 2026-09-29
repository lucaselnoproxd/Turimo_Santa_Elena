// Iniciales de un nombre (para avatares de hoteles, guías y operadoras).
// Ejemplo: "Juan Pérez" -> "JP". Si el nombre es de una sola palabra, toma
// las primeras letras de esa palabra.
export function initials(name: string): string {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .slice(0, 2);
}

// Enlace a Google Maps de la zona general (barrio, comuna, cantón o
// provincia), nunca el punto exacto. Siempre ancla a Santa Elena, Ecuador.
export function mapsUrl(lugar: string): string {
  const query = `${lugar}, Santa Elena, Ecuador`;
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
}
