import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function FeatureBar() {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        textRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            end: 'top 50%',
            scrub: 1,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-cloud-gray py-12 lg:py-16"
    >
      <div className="section-container">
        <div className="max-w-3xl mx-auto text-center">
          <p
            ref={textRef}
            className="text-lg lg:text-xl text-cool-gray leading-relaxed font-light"
          >
            We handle the details—viewings, paperwork, negotiations—so you can
            focus on moving in.
          </p>
        </div>
      </div>
    </section>
  );
}
