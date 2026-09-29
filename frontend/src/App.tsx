import { lazy, Suspense, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import HomePage from './pages/HomePage';
import CookieConsent from './components/CookieConsent';
import WhatsAppFloat from './components/WhatsAppFloat';

const BeachDetailPage = lazy(() => import('./pages/BeachDetailPage'));
const ActivityPage = lazy(() => import('./pages/ActivityPage'));
const EventosCalendarPage = lazy(() => import('./pages/EventosCalendarPage'));
const AdminLoginPage = lazy(() => import('./pages/admin/AdminLoginPage'));
const AdminDashboardPage = lazy(() => import('./pages/admin/AdminDashboardPage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));
const AvisoLegalPage = lazy(() => import('./pages/LegalPages').then((m) => ({ default: m.AvisoLegalPage })));
const PrivacidadPage = lazy(() => import('./pages/LegalPages').then((m) => ({ default: m.PrivacidadPage })));
const CookiesPage = lazy(() => import('./pages/LegalPages').then((m) => ({ default: m.CookiesPage })));

function ScrollManager() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const el = document.querySelector(hash);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        return;
      }
    }
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, [pathname, hash]);

  return null;
}

function SuspenseFallback() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <span className="w-8 h-8 rounded-full border-4 border-t-transparent animate-spin" style={{ borderColor: 'var(--clr-primary)', borderTopColor: 'transparent' }} />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollManager />
      <Suspense fallback={<SuspenseFallback />}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/experiencia/:slug" element={<ActivityPage />} />
          <Route path="/playa/:id" element={<BeachDetailPage />} />
          <Route path="/calendario" element={<EventosCalendarPage />} />
          <Route path="/aviso-legal" element={<AvisoLegalPage />} />
          <Route path="/privacidad" element={<PrivacidadPage />} />
          <Route path="/cookies" element={<CookiesPage />} />
          <Route path="/admin/login" element={<AdminLoginPage />} />
          <Route path="/admin" element={<AdminDashboardPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
      <WhatsAppFloat />
      <CookieConsent />
    </BrowserRouter>
  );
}