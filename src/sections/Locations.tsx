import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Button } from '@/components/ui/button';
import { ArrowRight, MapPin } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const locations = [
  {
    name: 'East Legon',
    image: '/images/loc-east-legon.jpg',
    properties: '120+',
  },
  {
    name: 'Airport Residential',
    image: '/images/loc-airport.jpg',
    properties: '85+',
  },
  {
    name: 'Cantonments',
    image: '/images/loc-cantonments.jpg',
    properties: '64+',
  },
];

export default function Locations() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleCardRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const isMobile = window.innerWidth < 1024;
    
    const ctx = gsap.context(() => {
      if (isMobile) {
        // Mobile: Simple scroll-triggered reveal animations
        gsap.fromTo(
          titleCardRef.current,
          { y: 50, opacity: 0 },
          {
            y: 0, opacity: 1,
            duration: 0.8,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: titleCardRef.current,
              start: 'top 85%',
            },
          }
        );
        
        gsap.fromTo(
          cardsRef.current?.querySelectorAll('.location-card') || [],
          { y: 60, opacity: 0 },
          {
            y: 0, opacity: 1,
            stagger: 0.15,
            duration: 0.7,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: cardsRef.current,
              start: 'top 85%',
            },
          }
        );
      } else {
        // Desktop: Pinned scroll animation with reduced distances
        const scrollTl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: '+=130%',
            pin: true,
            scrub: 0.6,
          },
        });

        // Entrance animations (0% - 30%) - Reduced from ±50vw to ±30vw
        scrollTl
          .fromTo(
            titleCardRef.current,
            { x: '-30vw', opacity: 0 },
            { x: 0, opacity: 1, ease: 'power2.out' },
            0
          )
          .fromTo(
            titleCardRef.current?.querySelectorAll('.animate-item') || [],
            { x: '-10vw', opacity: 0 },
            { x: 0, opacity: 1, stagger: 0.03, ease: 'power2.out' },
            0.05
          )
          .fromTo(
            cardsRef.current?.querySelectorAll('.location-card') || [],
            { x: '40vw', opacity: 0, scale: 0.92 },
            { x: 0, opacity: 1, scale: 1, stagger: 0.04, ease: 'power2.out' },
            0.05
          )
          .fromTo(
            cardsRef.current?.querySelectorAll('.card-label') || [],
            { y: 20, opacity: 0 },
            { y: 0, opacity: 1, stagger: 0.03, ease: 'power2.out' },
            0.2
          );

        // Exit animations (70% - 100%) - Reduced from ±18vw to ±15vw
        scrollTl
          .fromTo(
            titleCardRef.current,
            { x: 0, opacity: 1 },
            { x: '-15vw', opacity: 0, ease: 'power2.in' },
            0.7
          )
          .fromTo(
            cardsRef.current?.querySelectorAll('.location-card') || [],
            { x: 0, opacity: 1 },
            { x: '-15vw', opacity: 0, stagger: 0.02, ease: 'power2.in' },
            0.7
          );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="locations"
      className="relative min-h-screen w-full bg-cloud-gray overflow-hidden"
    >
      <div className="section-container h-full">
        <div className="min-h-screen flex flex-col lg:flex-row items-center justify-center gap-6 lg:gap-8 py-20 lg:py-0">
          {/* Title Card */}
          <div
            ref={titleCardRef}
            className="w-full lg:w-[28%] bg-white rounded-3xl shadow-card p-6 lg:p-8 h-auto lg:h-[65vh] flex flex-col justify-center"
          >
            <div className="animate-item">
              <div className="w-12 h-12 rounded-full bg-sky-blue flex items-center justify-center mb-4 lg:mb-6">
                <MapPin className="w-6 h-6 text-vivid-blue" />
              </div>
            </div>
            <h2 className="animate-item font-serif font-semibold text-2xl lg:text-4xl text-near-black mb-4 lg:mb-6 leading-tight">
              Prime Locations in Accra
            </h2>
            <p className="animate-item text-sm lg:text-base text-cool-gray mb-6 lg:mb-8 leading-relaxed">
              From the energy of Spintex to the calm of East Legon Hills—discover
              the neighborhood that fits your lifestyle.
            </p>
            <div className="animate-item">
              <Button
                variant="outline"
                className="border-vivid-blue text-vivid-blue hover:bg-vivid-blue hover:text-white rounded-xl px-4 lg:px-6 py-4 lg:py-5 text-sm group w-full sm:w-auto"
              >
                View All Locations
                <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
              </Button>
            </div>
          </div>

          {/* Location Cards */}
          <div
            ref={cardsRef}
            className="w-full lg:w-[65%] grid grid-cols-1 sm:grid-cols-3 gap-4 lg:gap-6"
          >
            {locations.map((location, index) => (
              <div
                key={index}
                className="location-card relative rounded-3xl overflow-hidden shadow-card group cursor-pointer aspect-[3/4] lg:aspect-[3/4]"
              >
                <img
                  src={location.image}
                  alt={location.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-near-black/70 via-near-black/20 to-transparent" />

                {/* Card Label */}
                <div className="card-label absolute bottom-4 left-4 right-4">
                  <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-3 lg:p-4">
                    <h3 className="font-serif font-semibold text-near-black text-base lg:text-lg mb-1">
                      {location.name}
                    </h3>
                    <p className="text-xs lg:text-sm text-cool-gray">
                      {location.properties} Properties
                    </p>
                  </div>
                </div>

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-vivid-blue/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
