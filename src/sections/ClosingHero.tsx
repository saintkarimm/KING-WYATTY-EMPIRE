import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Button } from '@/components/ui/button';
import { ArrowRight, Phone } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function ClosingHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=120%',
          pin: true,
          scrub: 0.6,
        },
      });

      // Entrance animations (0% - 30%)
      scrollTl
        .fromTo(
          imageRef.current,
          { scale: 0.86, opacity: 0, y: '10vh' },
          { scale: 1, opacity: 1, y: 0, ease: 'power2.out' },
          0
        )
        .fromTo(
          contentRef.current?.querySelectorAll('.animate-item') || [],
          { x: '-10vw', opacity: 0 },
          { x: 0, opacity: 1, stagger: 0.04, ease: 'power2.out' },
          0.1
        );

      // Exit animations (70% - 100%)
      scrollTl.fromTo(
        imageRef.current,
        { scale: 1, opacity: 1 },
        { scale: 0.96, opacity: 0, ease: 'power2.in' },
        0.7
      );
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
      className="relative min-h-screen w-full bg-cloud-gray overflow-hidden"
    >
      <div className="section-container h-full">
        <div className="min-h-screen flex items-center justify-center py-20 lg:py-0">
          {/* Image Card */}
          <div
            ref={imageRef}
            className="relative w-full aspect-[16/9] lg:aspect-[21/9] rounded-3xl lg:rounded-[32px] overflow-hidden shadow-card"
          >
            <img
              src="/images/closing-hero.jpg"
              alt="Beautiful neighborhood"
              className="w-full h-full object-cover"
            />
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-near-black/70 via-near-black/40 to-transparent" />

            {/* Content */}
            <div
              ref={contentRef}
              className="absolute inset-0 flex flex-col justify-center p-6 lg:p-16"
            >
              <div className="max-w-lg">
                <h2 className="animate-item font-serif font-semibold text-2xl sm:text-3xl lg:text-5xl text-white mb-3 lg:mb-4 leading-tight">
                  Still Have Questions?
                </h2>
                <p className="animate-item text-base lg:text-lg text-white/80 mb-6 lg:mb-8 leading-relaxed">
                  Let&apos;s talk through your goals—no pressure, just clear next
                  steps.
                </p>
                <div className="animate-item flex flex-col sm:flex-row gap-3">
                  <Button
                    onClick={scrollToContact}
                    className="bg-vivid-blue hover:bg-vivid-blue/90 text-white rounded-xl px-5 lg:px-6 py-5 lg:py-6 text-sm font-medium group"
                  >
                    Book a Free Call
                    <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                  </Button>
                  <a
                    href="tel:+233556885510"
                    className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white rounded-xl px-5 lg:px-6 py-4 lg:py-5 text-sm font-medium backdrop-blur-sm transition-colors"
                  >
                    <Phone className="w-4 h-4" />
                    Call Now
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
