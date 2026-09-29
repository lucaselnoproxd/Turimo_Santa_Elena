import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import PageHead from '../components/PageHead';
import WavesBackground from '../components/WavesBackground';
import Footer from '../components/Footer';

export default function NotFoundPage() {
  return (
    <div className="min-h-screen">
      <PageHead title="Página no encontrada · Santa Elena Turismo" noindex />
      <WavesBackground />
      <Navbar />
      <div className="flex flex-col items-center justify-center pt-44 pb-28 px-4 text-center">
        <p
          className="font-heading text-7xl font-extrabold mb-3"
          style={{ background: 'linear-gradient(135deg, var(--clr-primary), var(--clr-primary-light))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}
        >
          404
        </p>
        <h1 className="font-heading text-2xl font-bold mb-3" style={{ color: 'var(--clr-text-heading)' }}>
          Esta página no existe
        </h1>
        <p className="text-sm max-w-md mb-8" style={{ color: 'var(--clr-text-muted)' }}>
          La dirección que buscas no está en el sitio o fue movida. Puedes volver al
          inicio o navegar por nuestras experiencias y playas.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <Link to="/" className="gel-btn px-6 py-3 text-white text-sm font-bold">
            Volver al inicio
          </Link>
          <Link
            to="/calendario"
            className="px-6 py-3 text-sm font-semibold transition-all duration-200 hover:underline underline-offset-4"
            style={{ color: 'var(--clr-text-link)' }}
          >
            Calendario de eventos
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  );
}