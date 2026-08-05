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
