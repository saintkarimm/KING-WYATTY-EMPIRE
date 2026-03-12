import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Button } from '@/components/ui/button';
import { ArrowRight, Check, Camera, Clock, FileText, HeartHandshake } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const highlights = [
  {
    icon: Camera,
    text: 'Verified listings with real photos',
  },
  {
    icon: Clock,
    text: '48-hour response guarantee',
  },
  {
    icon: FileText,
    text: 'End-to-end paperwork support',
  },
  {
    icon: HeartHandshake,
    text: 'Post-move-in care',
  },
];

export default function Mission() {
  const sectionRef = useRef<HTMLElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const isMobile = window.innerWidth < 1024;
    
    const ctx = gsap.context(() => {
      if (isMobile) {
        // Mobile: Simple reveal animations
        gsap.fromTo(
          leftRef.current?.querySelector('.mission-title') || null,
          { y: 50, opacity: 0 },
          {
            y: 0, opacity: 1,
            duration: 0.8,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: leftRef.current,
              start: 'top 85%',
            },
          }
        );
        
        // Highlights slide in from right with stagger
        gsap.fromTo(
          rightRef.current?.querySelectorAll('.highlight-item') || [],
          { x: 40, opacity: 0 },
          {
            x: 0, opacity: 1,
            stagger: 0.15,
            duration: 0.7,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: rightRef.current,
              start: 'top 85%',
            },
          }
        );
      } else {
        // Desktop: Pinned scroll animation with reduced entrance/exit distances
        const scrollTl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: '+=130%',
            pin: true,
            scrub: 0.6,
          },
        });

        // Entrance animations (0% - 30%) - Reduced from ±18vw to ±15vw for title, ±12vw to ±10vw for content
        scrollTl
          .fromTo(
            leftRef.current?.querySelector('.mission-title') || null,
            { x: '-15vw', opacity: 0 },
            { x: 0, opacity: 1, ease: 'power2.out' },
            0
          )
          .fromTo(
            leftRef.current?.querySelectorAll('.animate-item') || [],
            { y: 20, opacity: 0 },
            { y: 0, opacity: 1, stagger: 0.03, ease: 'power2.out' },
            0.1
          )
          .fromTo(
            rightRef.current?.querySelectorAll('.highlight-item') || [],
            { x: '10vw', opacity: 0 },
            { x: 0, opacity: 1, stagger: 0.04, ease: 'power2.out' },
            0.1
          );

        // Exit animations (70% - 100%)
        scrollTl
          .fromTo(
            leftRef.current,
            { x: 0, opacity: 1 },
            { x: '-10vw', opacity: 0, ease: 'power2.in' },
            0.7
          )
          .fromTo(
            rightRef.current,
            { x: 0, opacity: 1 },
            { x: '10vw', opacity: 0, ease: 'power2.in' },
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
      id="mission"
      className="relative min-h-screen w-full bg-cloud-gray overflow-hidden"
    >
      <div className="section-container h-full">
        <div className="min-h-screen flex flex-col lg:flex-row items-center justify-center gap-10 lg:gap-16 py-20 lg:py-0">
          {/* Left Content */}
          <div
            ref={leftRef}
            className="w-full lg:w-[45%] flex flex-col items-center lg:items-start text-center lg:text-left"
          >
            <h2 className="mission-title font-serif font-semibold text-3xl lg:text-5xl text-near-black mb-4 lg:mb-6 leading-tight">
              Our Mission — Your Comfort
            </h2>
            <p className="animate-item text-base lg:text-lg text-cool-gray mb-6 lg:mb-8 leading-relaxed max-w-lg">
              We believe finding a home should feel human. That means honest
              advice, fast responses, and support that doesn&apos;t end at the
              handshake.
            </p>
            <div className="animate-item">
              <Button
                onClick={scrollToContact}
                variant="outline"
                className="border-vivid-blue text-vivid-blue hover:bg-vivid-blue hover:text-white rounded-xl px-4 lg:px-6 py-4 lg:py-5 text-sm group"
              >
                Meet the Team
                <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
              </Button>
            </div>
          </div>

          {/* Right Highlights */}
          <div
            ref={rightRef}
            className="w-full lg:w-[40%] space-y-4 lg:space-y-5"
          >
            {highlights.map((highlight, index) => (
              <div
                key={index}
                className="highlight-item flex items-center gap-4 bg-white rounded-2xl p-4 lg:p-5 shadow-sm"
              >
                <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-full bg-vivid-blue/10 flex items-center justify-center flex-shrink-0">
                  <highlight.icon className="w-5 h-5 lg:w-6 lg:h-6 text-vivid-blue" />
                </div>
                <span className="text-sm lg:text-base text-near-black font-medium">
                  {highlight.text}
                </span>
                <div className="ml-auto w-6 h-6 rounded-full bg-vivid-blue flex items-center justify-center flex-shrink-0">
                  <Check className="w-4 h-4 text-white" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
