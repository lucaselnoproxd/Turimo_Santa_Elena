import type { ReactNode } from 'react';

interface GradientTitleProps {
  children: ReactNode;
  className?: string;
}

// Título con el degradado de marca (azul). El estilo de color vive en .text-gradient.
export default function GradientTitle({ children, className = '' }: GradientTitleProps) {
  return (
    <h2 className={`font-heading font-extrabold text-gradient ${className}`}>
      {children}
    </h2>
  );
}
