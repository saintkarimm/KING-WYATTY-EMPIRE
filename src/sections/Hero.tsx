import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Button } from '@/components/ui/button';
import { ArrowRight, Home, Key, MapPin, Building } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const features = [
  { icon: Home, label: 'Property Sales' },
  { icon: Key, label: 'Property Rentals' },
  { icon: MapPin, label: 'Land Acquisition' },
  { icon: Building, label: 'Property Management' },
];

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const subheadRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const socialRef = useRef<HTMLDivElement>(null);
  const featureBarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const isMobile = window.innerWidth < 1024;
    
    const ctx = gsap.context(() => {
      // Initial load animation
      const tl = gsap.timeline({ defaults: { ease: 'power2.out' } });

      tl.fromTo(
        imageRef.current,
        { opacity: 0, x: 100, scale: 0.96 },
        { opacity: 1, x: 0, scale: 1, duration: 0.9 }
      )
        .fromTo(
          headlineRef.current?.querySelectorAll('.headline-word') || [],
          { opacity: 0, y: 30, rotateX: -25 },
          { opacity: 1, y: 0, rotateX: 0, stagger: 0.08, duration: 0.7 },
          '-=0.5'
        )
        .fromTo(
          subheadRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.6 },
          '-=0.3'
        )
        .fromTo(
          ctaRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.6 },
          '-=0.4'
        )
        .fromTo(
          socialRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.6 },
          '-=0.4'
        )
        .fromTo(
          featureBarRef.current,
          { opacity: 0, y: 60 },
          { opacity: 1, y: 0, duration: 0.7 },
          '-=0.5'
        );

      // Mobile: Simple fade-in from bottom, no pin
      if (isMobile) {
        gsap.fromTo(
          sectionRef.current,
          { opacity: 1 },
          {
            opacity: 1,
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top top',
              end: 'bottom top',
              scrub: true,
            },
          }
        );
      } else {
        // Desktop: Pinned scroll animation with reduced exit distances
        const scrollTl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: '+=130%',
            pin: true,
            scrub: 0.6,
          },
        });

        // Exit animations (70% - 100%) - Reduced from ±18vw to ±10vw
        scrollTl
          .fromTo(
            headlineRef.current,
            { x: 0, opacity: 1 },
            { x: '-10vw', opacity: 0, ease: 'power2.in' },
            0.7
          )
          .fromTo(
            imageRef.current,
            { x: 0, scale: 1, opacity: 1 },
            { x: '10vw', scale: 0.92, opacity: 0, ease: 'power2.in' },
            0.7
          )
          .fromTo(
            featureBarRef.current,
            { y: 0, opacity: 1 },
            { y: '12vh', opacity: 0, ease: 'power2.in' },
            0.7
          );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const scrollToListings = () => {
    const element = document.querySelector('#listings');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative min-h-screen w-full bg-cloud-gray dot-pattern overflow-hidden pt-20"
    >
      <div className="section-container h-full">
        <div className="relative min-h-[calc(100vh-5rem)] flex flex-col lg:flex-row items-center justify-center lg:justify-between gap-8 lg:gap-0 py-8 lg:py-0">
          {/* Left Content */}
          <div className="w-full lg:w-[40%] xl:w-[35%] flex flex-col items-center lg:items-start text-center lg:text-left z-10">
            {/* Headline */}
            <div ref={headlineRef} className="mb-6 lg:mb-8">
              <h1 className="font-serif font-semibold text-near-black leading-[0.95] tracking-tight">
                <span className="headline-word block text-4xl sm:text-5xl lg:text-6xl xl:text-7xl">
                  Find Your
                </span>
                <span className="headline-word block text-4xl sm:text-5xl lg:text-6xl xl:text-7xl mt-1">
                  Perfect
                </span>
                <span className="headline-word block text-4xl sm:text-5xl lg:text-6xl xl:text-7xl mt-1 text-vivid-blue">
                  Property
                </span>
              </h1>
            </div>

            {/* Subheadline */}
            <p
              ref={subheadRef}
              className="text-base lg:text-lg text-cool-gray max-w-md mb-6 lg:mb-8 leading-relaxed"
            >
              Homes, apartments, land, and investments—guided by a team that puts
              your comfort first.
            </p>

            {/* CTA Button */}
            <div ref={ctaRef} className="mb-8 lg:mb-10">
              <Button
                onClick={scrollToListings}
                className="bg-vivid-blue hover:bg-vivid-blue/90 text-white rounded-2xl px-6 lg:px-8 py-5 lg:py-6 text-sm lg:text-base font-medium group"
              >
                Browse Properties
                <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
              </Button>
            </div>

            {/* Social Proof */}
            <div ref={socialRef} className="flex items-center gap-4">
              <div className="flex -space-x-3">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="w-9 h-9 lg:w-10 lg:h-10 rounded-full bg-gradient-to-br from-vivid-blue/80 to-vivid-blue border-2 border-white flex items-center justify-center"
                  >
                    <span className="text-white text-xs font-medium">
                      {String.fromCharCode(64 + i)}
                    </span>
                  </div>
                ))}
              </div>
              <p className="text-sm text-cool-gray">
                Trusted by <span className="font-semibold text-near-black">200+</span> clients
              </p>
            </div>
          </div>

          {/* Right Image */}
          <div
            ref={imageRef}
            className="w-full lg:w-[55%] xl:w-[50%] relative"
          >
            <div className="relative rounded-3xl overflow-hidden shadow-card aspect-[4/3] lg:aspect-[4/3]">
              <img
                src="/images/hero-building.jpg"
                alt="Modern luxury building"
                className="w-full h-full object-cover"
              />
              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-near-black/20 to-transparent" />
            </div>

            {/* Floating badge */}
            <div className="absolute -bottom-4 -left-4 lg:-bottom-6 lg:-left-6 bg-white rounded-2xl shadow-card p-3 lg:p-4 flex items-center gap-3">
              <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-full bg-vivid-blue/10 flex items-center justify-center">
                <Home className="w-5 h-5 lg:w-6 lg:h-6 text-vivid-blue" />
              </div>
              <div>
                <p className="text-xs text-cool-gray">Properties</p>
                <p className="text-lg lg:text-xl font-serif font-semibold text-near-black">500+</p>
              </div>
            </div>
          </div>
        </div>

        {/* Feature Bar */}
        <div
          ref={featureBarRef}
          className="absolute bottom-6 lg:bottom-10 left-1/2 -translate-x-1/2 w-[92%] max-w-4xl"
        >
          <div className="bg-white rounded-3xl shadow-card p-4 lg:p-6">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 justify-center lg:justify-start"
                >
                  <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-full bg-sky-blue flex items-center justify-center flex-shrink-0 animate-pulse-soft">
                    <feature.icon className="w-5 h-5 lg:w-6 lg:h-6 text-vivid-blue" />
                  </div>
                  <span className="text-xs lg:text-sm font-medium text-near-black hidden sm:block">
                    {feature.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
