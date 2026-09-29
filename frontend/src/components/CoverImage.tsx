import { useState } from 'react';

interface CoverImageProps {
  src: string;
  alt: string;
  /** Clases extra para la imagen principal */
  imgClassName?: string;
  /** Clases extra para el contenedor */
  wrapperClassName?: string;
  /** Fuerza mostrar la foto completa en pantallas verticales, aunque sea horizontal */
  fullOnPortrait?: boolean;
  /** Rinde la imagen como prioritaria (LCP), p. ej. en la portada */
  fetchPriority?: 'high' | 'low' | 'auto';
}

// Muestra la foto completa (sin recortar) en pantallas verticales/móvil
// cuando la imagen es vertical, y el recorte object-cover en escritorio.
// En móvil se añade un fondo difuminado con la misma foto para rellenar
// los espacios que deja la imagen centrada.
export default function CoverImage({
  src,
  alt,
  imgClassName = '',
  wrapperClassName = 'hero-shine',
  fullOnPortrait = false,
  fetchPriority,
}: CoverImageProps) {
  const [isVertical, setIsVertical] = useState(false);
  const full = isVertical || fullOnPortrait;

  return (
    <div className={`absolute inset-0 overflow-hidden ${wrapperClassName}`}>
      {full && (
        <img
          src={src}
          alt=""
          aria-hidden
          decoding="async"
          className="hidden portrait:block absolute inset-0 w-full h-full object-cover blur-md scale-110"
        />
      )}
      <img
        src={src}
        alt={alt}
        decoding="async"
        fetchPriority={fetchPriority}
        onLoad={(e) => setIsVertical(e.currentTarget.naturalHeight > e.currentTarget.naturalWidth)}
        className={`w-full h-full object-cover object-center ${full ? 'portrait:object-contain' : ''} ${imgClassName}`}
      />
    </div>
  );
}
