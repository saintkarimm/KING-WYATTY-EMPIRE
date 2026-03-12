import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navigation from './sections/Navigation';
import Hero from './sections/Hero';
import FeatureBar from './sections/FeatureBar';
import Locations from './sections/Locations';
import Services from './sections/Services';
import PropertyMatch from './sections/PropertyMatch';
import Gallery from './sections/Gallery';
import Mission from './sections/Mission';
import FeaturedCarousel from './sections/FeaturedCarousel';
import Listings from './sections/Listings';
import Apartments from './sections/Apartments';
import Experiences from './sections/Experiences';
import Articles from './sections/Articles';
import FAQ from './sections/FAQ';
import Contact from './sections/Contact';
import ClosingHero from './sections/ClosingHero';
import Footer from './sections/Footer';
import Chatbot from './components/Chatbot';
import WhatsAppButton from './components/WhatsAppButton';
import './App.css';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const [isLoaded, setIsLoaded] = useState(false);
  const mainRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Page load animation
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);

    return () => {
      clearTimeout(timer);
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, []);

  return (
    <div ref={mainRef} className={`relative min-h-screen bg-cloud-gray transition-opacity duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
      {/* Grain overlay */}
      <div className="grain-overlay" />
      
      {/* Navigation */}
      <Navigation />
      
      {/* Main Content */}
      <main className="relative">
        {/* Section 1: Hero */}
        <Hero />
        
        {/* Section 2: Feature Bar */}
        <FeatureBar />
        
        {/* Section 3: Locations */}
        <Locations />
        
        {/* Section 4: Services */}
        <Services />
        
        {/* Section 5: Property Match CTA */}
        <PropertyMatch />
        
        {/* Section 6: Gallery */}
        <Gallery />
        
        {/* Section 7: Mission */}
        <Mission />
        
        {/* Section 8: Featured Carousel */}
        <FeaturedCarousel />
        
        {/* Section 9: Listings */}
        <Listings />
        
        {/* Section 10: Apartments */}
        <Apartments />
        
        {/* Section 11: Experiences */}
        <Experiences />
        
        {/* Section 12: Articles */}
        <Articles />
        
        {/* Section 13: FAQ */}
        <FAQ />
        
        {/* Section 14: Contact */}
        <Contact />
        
        {/* Section 15: Closing Hero */}
        <ClosingHero />
        
        {/* Section 16: Footer */}
        <Footer />
      </main>
      
      {/* Floating Components */}
      <Chatbot />
      <WhatsAppButton />
    </div>
  );
}

export default App;
