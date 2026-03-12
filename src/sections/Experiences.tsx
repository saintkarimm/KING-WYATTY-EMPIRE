import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const experiences = [
  {
    image: '/images/experience-01.jpg',
    title: 'Food & Nightlife',
  },
  {
    image: '/images/experience-02.jpg',
    title: 'Arts & Culture',
  },
  {
    image: '/images/experience-03.jpg',
    title: 'Parks & Wellness',
  },
  {
    image: '/images/experience-04.jpg',
    title: 'Shopping & Markets',
  },
];

export default function Experiences() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

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
        cardsRef.current?.querySelectorAll('.experience-card') || [],
        { opacity: 0, x: 50, scale: 0.98 },
        {
          opacity: 1,
          x: 0,
          scale: 1,
          duration: 0.7,
          stagger: 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: cardsRef.current,
            start: 'top 75%',
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
              Experience Accra
            </h2>
            <p className="text-base lg:text-lg text-cool-gray max-w-xl">
              Discover the vibrant lifestyle that awaits in Ghana&apos;s capital.
            </p>
          </div>
          <Button
            variant="outline"
            className="border-vivid-blue text-vivid-blue hover:bg-vivid-blue hover:text-white rounded-xl px-4 lg:px-6 py-4 lg:py-5 text-sm group w-full sm:w-auto"
          >
            Plan a Tour
            <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
          </Button>
        </div>

        {/* Experience Cards */}
        <div
          ref={cardsRef}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6"
        >
          {experiences.map((experience, index) => (
            <div
              key={index}
              className="experience-card group relative rounded-2xl lg:rounded-3xl overflow-hidden shadow-card aspect-[16/10] cursor-pointer"
            >
              <img
                src={experience.image}
                alt={experience.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-near-black/70 via-near-black/30 to-transparent" />

              {/* Title */}
              <div className="absolute bottom-4 left-4 right-4">
                <h3 className="font-serif font-semibold text-white text-sm lg:text-lg">
                  {experience.title}
                </h3>
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
