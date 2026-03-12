import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronLeft, ChevronRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const featuredProperties = [
  {
    image: '/images/featured-01.jpg',
    title: 'Luxury Villa Collection',
  },
  {
    image: '/images/featured-02.jpg',
    title: 'Penthouse Suites',
  },
  {
    image: '/images/featured-03.jpg',
    title: 'Family Homes',
  },
];

export default function FeaturedCarousel() {
  const sectionRef = useRef<HTMLElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const isMobile = window.innerWidth < 1024;
    
    const ctx = gsap.context(() => {
      if (isMobile) {
        // Mobile: Simple fade-in from bottom, no clip-path animation
        gsap.fromTo(
          carouselRef.current,
          { y: 50, opacity: 0 },
          {
            y: 0, opacity: 1,
            duration: 0.8,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: carouselRef.current,
              start: 'top 85%',
            },
          }
        );
        
        gsap.fromTo(
          '.carousel-arrow',
          { scale: 0, opacity: 0 },
          {
            scale: 1, opacity: 1,
            stagger: 0.1,
            duration: 0.5,
            ease: 'back.out(1.7)',
            scrollTrigger: {
              trigger: carouselRef.current,
              start: 'top 80%',
            },
          }
        );
      } else {
        // Desktop: Pinned scroll animation with dramatic clip-path wipe
        const scrollTl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: '+=140%',
            pin: true,
            scrub: 0.6,
          },
        });

        // Entrance animations (0% - 30%) - dramatic wipe effect
        scrollTl
          .fromTo(
            carouselRef.current,
            { clipPath: 'inset(0 100% 0 0)' },
            { clipPath: 'inset(0 0% 0 0)', ease: 'power2.out' },
            0
          )
          .fromTo(
            '.carousel-arrow',
            { scale: 0, opacity: 0 },
            { scale: 1, opacity: 1, stagger: 0.05, ease: 'back.out(1.7)' },
            0.15
          )
          .fromTo(
            '.featured-label',
            { y: 20, opacity: 0 },
            { y: 0, opacity: 1, ease: 'power2.out' },
            0.2
          );

        // Exit animations (70% - 100%) - Reduced exit scale from 0.92 to 0.95
        scrollTl
          .fromTo(
            carouselRef.current,
            { scale: 1, opacity: 1 },
            { scale: 0.95, opacity: 0, ease: 'power2.in' },
            0.7
          )
          .fromTo(
            '.carousel-arrow',
            { scale: 1, opacity: 1 },
            { scale: 0.8, opacity: 0, ease: 'power2.in' },
            0.7
          );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % featuredProperties.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + featuredProperties.length) % featuredProperties.length);
  };

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen w-full bg-cloud-gray overflow-hidden"
    >
      <div className="section-container h-full">
        <div className="min-h-screen flex items-center justify-center py-20 lg:py-0">
          {/* Carousel Container */}
          <div className="relative w-full">
            {/* Main Image Card */}
            <div
              ref={carouselRef}
              className="relative w-full aspect-[16/9] lg:aspect-[21/9] rounded-3xl lg:rounded-[32px] overflow-hidden shadow-card"
            >
              {featuredProperties.map((property, index) => (
                <div
                  key={index}
                  className={`absolute inset-0 transition-opacity duration-500 ${
                    index === currentSlide ? 'opacity-100' : 'opacity-0'
                  }`}
                >
                  <img
                    src={property.image}
                    alt={property.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}

              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-near-black/40 via-transparent to-transparent" />

              {/* Label */}
              <div className="featured-label absolute bottom-6 left-6 lg:bottom-10 lg:left-10">
                <div className="bg-white/95 backdrop-blur-sm rounded-2xl px-4 py-2 lg:px-6 lg:py-3">
                  <span className="text-xs lg:text-sm text-cool-gray uppercase tracking-wider">
                    Featured Collection
                  </span>
                  <p className="font-serif font-semibold text-near-black text-base lg:text-xl mt-0.5">
                    {featuredProperties[currentSlide].title}
                  </p>
                </div>
              </div>

              {/* Slide indicators */}
              <div className="absolute bottom-6 right-6 lg:bottom-10 lg:right-10 flex gap-2">
                {featuredProperties.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`w-2 h-2 lg:w-3 lg:h-3 rounded-full transition-all duration-300 ${
                      index === currentSlide
                        ? 'bg-white w-6 lg:w-8'
                        : 'bg-white/50 hover:bg-white/70'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Navigation Arrows */}
            <button
              onClick={prevSlide}
              className="carousel-arrow absolute left-2 lg:left-4 top-1/2 -translate-y-1/2 w-10 h-10 lg:w-14 lg:h-14 rounded-full bg-white shadow-card flex items-center justify-center hover:bg-vivid-blue hover:text-white transition-colors duration-300 z-10"
            >
              <ChevronLeft className="w-5 h-5 lg:w-6 lg:h-6" />
            </button>
            <button
              onClick={nextSlide}
              className="carousel-arrow absolute right-2 lg:right-4 top-1/2 -translate-y-1/2 w-10 h-10 lg:w-14 lg:h-14 rounded-full bg-white shadow-card flex items-center justify-center hover:bg-vivid-blue hover:text-white transition-colors duration-300 z-10"
            >
              <ChevronRight className="w-5 h-5 lg:w-6 lg:h-6" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
