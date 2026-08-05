import type { ReactNode } from 'react';

interface SectionProps {
  id?: string;
  /** Tamaño del espaciado vertical + horizontal estándar */
  size?: 'sm' | 'md' | 'xl' | 'lg';
  /** Ancho del contenido interior */
  width?: '6xl' | '7xl' | '4xl' | 'full';
  className?: string;
  children: ReactNode;
}

const PADDING: Record<NonNullable<SectionProps['size']>, string> = {
  sm: 'py-10 md:py-14 px-4',
  md: 'py-12 md:py-16 px-4',
  xl: 'py-16 md:py-24 px-4',
  lg: 'py-20 md:py-28 px-4',
};

const INNER: Record<NonNullable<SectionProps['width']>, string> = {
  '6xl': 'max-w-6xl mx-auto',
  '7xl': 'max-w-7xl mx-auto',
  '4xl': 'max-w-4xl mx-auto',
  full: '',
};

// Sección con los espaciados y contenedor estándar de la página.
export default function Section({
  id,
  size = 'lg',
  width = '7xl',
  className = '',
  children,
}: SectionProps) {
  return (
    <section id={id} className={`relative ${PADDING[size]} ${className}`}>
      <div className={INNER[width]}>{children}</div>
    </section>
  );
}
