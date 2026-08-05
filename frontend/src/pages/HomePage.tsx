import { useState, useCallback } from 'react';
import Navbar from '../components/Navbar';
import WavesBackground from '../components/WavesBackground';
import BeachCarousel from '../components/BeachCarousel';
import BeachInfo from '../components/BeachInfo';
import TravelServices from '../components/TravelServices';
import Footer from '../components/Footer';
import { beaches, type Beach } from '../data/beaches';

export default function HomePage() {
  const [currentBeach, setCurrentBeach] = useState<Beach>(beaches[0]);

  const handleBeachChange = useCallback((beach: Beach) => {
    setCurrentBeach(beach);
  }, []);

  return (
    <div className="min-h-screen">
      <WavesBackground />
      <Navbar />
      <BeachCarousel beaches={beaches} onBeachChange={handleBeachChange} />
      <BeachInfo beach={currentBeach} />
      <TravelServices beach={currentBeach} />
      <Footer />
    </div>
  );
}
