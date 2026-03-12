import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

gsap.registerPlugin(ScrollTrigger);

const apartments = [
  {
    image: '/images/apartment-01.jpg',
    label: 'Open-plan living',
  },
  {
    image: '/images/apartment-02.jpg',
    label: 'Modern kitchens',
  },
  {
    image: '/images/apartment-03.jpg',
    label: 'Master suites',
  },
  {
    image: '/images/apartment-04.jpg',
    label: 'Balcony views',
  },
];

export default function Apartments() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header animation
      gsap.fromTo(
        headerRef.current,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
          },
        }
      );

      // Cards animation
      gsap.fromTo(
        gridRef.current?.querySelectorAll('.apartment-card') || [],
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: gridRef.current,
            start: 'top 75%',
          },
        }
      );

      // Label animations
      gsap.fromTo(
        gridRef.current?.querySelectorAll('.card-label') || [],
        { y: 15, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          stagger: 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: gridRef.current,
            start: 'top 70%',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-cloud-gray py-16 lg:py-24"
    >
      <div className="section-container">
        {/* Header */}
        <div
          ref={headerRef}
          className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4 lg:gap-8 mb-10 lg:mb-14"
        >
          <div>
            <h2 className="font-serif font-semibold text-3xl lg:text-5xl text-near-black mb-2 lg:mb-3">
              Apartments
            </h2>
            <p className="text-base lg:text-lg text-cool-gray max-w-xl">
              Clean layouts, natural light, and spaces designed for real life.
            </p>
          </div>
          <Button
            variant="outline"
            className="border-vivid-blue text-vivid-blue hover:bg-vivid-blue hover:text-white rounded-xl px-4 lg:px-6 py-4 lg:py-5 text-sm group w-full sm:w-auto"
          >
            View All Apartments
            <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
          </Button>
        </div>

        {/* Apartments Grid */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6"
        >
          {apartments.map((apartment, index) => (
            <div
              key={index}
              className="apartment-card group relative rounded-2xl lg:rounded-3xl overflow-hidden shadow-card aspect-[16/10] cursor-pointer"
            >
              <img
                src={apartment.image}
                alt={apartment.label}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-near-black/60 via-near-black/20 to-transparent" />

              {/* Label */}
              <div className="card-label absolute bottom-4 left-4">
                <div className="bg-white/95 backdrop-blur-sm rounded-xl px-3 py-1.5 lg:px-4 lg:py-2">
                  <span className="text-xs lg:text-sm font-medium text-near-black">
                    {apartment.label}
                  </span>
                </div>
              </div>

              {/* Hover overlay */}
              <div className="absolute inset-0 bg-vivid-blue/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
