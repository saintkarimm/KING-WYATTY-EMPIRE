import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Button } from '@/components/ui/button';
import { ArrowRight, Home, Search, Building } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function PropertyMatch() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const iconsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const isMobile = window.innerWidth < 1024;
    
    const ctx = gsap.context(() => {
      if (isMobile) {
        // Mobile: Simple reveal animation with scale and fade
        gsap.fromTo(
          cardRef.current,
          { scale: 0.95, opacity: 0 },
          {
            scale: 1, opacity: 1,
            duration: 0.8,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: cardRef.current,
              start: 'top 85%',
            },
          }
        );
        
        // Floating icons pop in with back.out easing
        gsap.fromTo(
          iconsRef.current?.querySelectorAll('.floating-icon') || [],
          { scale: 0, opacity: 0 },
          {
            scale: 1, opacity: 1,
            stagger: 0.1,
            duration: 0.6,
            ease: 'back.out(1.7)',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 80%',
            },
          }
        );
      } else {
        // Desktop: Pinned scroll animation with reduced scale and exit distance
        const scrollTl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: '+=130%',
            pin: true,
            scrub: 0.6,
          },
        });

        // Entrance animations (0% - 30%) - Reduced scale from 0.65 to 0.8
        scrollTl
          .fromTo(
            cardRef.current,
            { scale: 0.8, opacity: 0, y: '10vh' },
            { scale: 1, opacity: 1, y: 0, ease: 'power2.out' },
            0
          )
          .fromTo(
            cardRef.current?.querySelectorAll('.animate-text') || [],
            { y: 30, opacity: 0 },
            { y: 0, opacity: 1, stagger: 0.03, ease: 'power2.out' },
            0.1
          )
          .fromTo(
            iconsRef.current?.querySelectorAll('.floating-icon') || [],
            { scale: 0, opacity: 0 },
            { scale: 1, opacity: 1, stagger: 0.05, ease: 'back.out(1.7)' },
            0.15
          );

        // Exit animations (70% - 100%) - Reduced from 18vh to 12vh
        scrollTl
          .fromTo(
            cardRef.current,
            { y: 0, opacity: 1 },
            { y: '-12vh', opacity: 0, ease: 'power2.in' },
            0.7
          )
          .fromTo(
            iconsRef.current?.querySelectorAll('.floating-icon') || [],
            { opacity: 1 },
            { opacity: 0, stagger: 0.02, ease: 'power2.in' },
            0.7
          );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const scrollToContact = () => {
    const element = document.querySelector('#contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen w-full bg-sky-blue overflow-hidden"
    >
      {/* Floating Icons */}
      <div ref={iconsRef} className="absolute inset-0 pointer-events-none">
        <div className="floating-icon absolute top-[15%] left-[8%] w-14 h-14 lg:w-20 lg:h-20 rounded-full bg-white shadow-card flex items-center justify-center animate-float">
          <Home className="w-6 h-6 lg:w-10 lg:h-10 text-vivid-blue" />
        </div>
        <div className="floating-icon absolute top-[12%] right-[10%] w-12 h-12 lg:w-16 lg:h-16 rounded-full bg-white shadow-card flex items-center justify-center animate-float" style={{ animationDelay: '0.5s' }}>
          <Search className="w-5 h-5 lg:w-8 lg:h-8 text-vivid-blue" />
        </div>
        <div className="floating-icon absolute bottom-[20%] left-[50%] -translate-x-1/2 w-14 h-14 lg:w-20 lg:h-20 rounded-full bg-white shadow-card flex items-center justify-center animate-float" style={{ animationDelay: '1s' }}>
          <Building className="w-6 h-6 lg:w-10 lg:h-10 text-vivid-blue" />
        </div>
      </div>

      <div className="section-container h-full">
        <div className="min-h-screen flex items-center justify-center py-20 lg:py-0">
          {/* CTA Card */}
          <div
            ref={cardRef}
            className="w-full max-w-4xl bg-white rounded-3xl lg:rounded-[34px] shadow-card p-8 lg:p-16 text-center relative z-10"
          >
            <h2 className="animate-text font-serif font-semibold text-2xl sm:text-3xl lg:text-5xl text-near-black mb-4 lg:mb-6 leading-tight">
              Let Us Find the Perfect Property for You
            </h2>
            <p className="animate-text text-base lg:text-lg text-cool-gray mb-6 lg:mb-8 max-w-2xl mx-auto leading-relaxed">
              Tell us your budget, location, and timeline—we&apos;ll shortlist options
              within 48 hours.
            </p>
            <div className="animate-text">
              <Button
                onClick={scrollToContact}
                className="bg-vivid-blue hover:bg-vivid-blue/90 text-white rounded-2xl px-6 lg:px-8 py-5 lg:py-6 text-sm lg:text-base font-medium group"
              >
                Start Property Search
                <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
