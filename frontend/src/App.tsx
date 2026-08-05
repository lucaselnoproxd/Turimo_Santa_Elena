import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import BeachDetailPage from './pages/BeachDetailPage';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/playa/:id" element={<BeachDetailPage />} />
      </Routes>
    </BrowserRouter>
  );
}
