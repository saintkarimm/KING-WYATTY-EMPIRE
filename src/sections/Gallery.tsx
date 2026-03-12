import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const galleryImages = [
  { src: '/images/gallery-01.jpg', caption: 'Sunset balconies' },
  { src: '/images/gallery-02.jpg', caption: 'Tree-lined streets' },
  { src: '/images/gallery-03.jpg', caption: 'Modern kitchens' },
  { src: '/images/gallery-04.jpg', caption: 'Rooftop views' },
  { src: '/images/gallery-05.jpg', caption: 'Quiet courtyards' },
  { src: '/images/gallery-06.jpg', caption: 'City lights' },
];

export default function Gallery() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);

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

      // Gallery items animation
      gsap.fromTo(
        galleryRef.current?.querySelectorAll('.gallery-item') || [],
        { opacity: 0, y: 40, scale: 0.96 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.7,
          stagger: 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: galleryRef.current,
            start: 'top 75%',
          },
        }
      );

      // Caption animations
      gsap.fromTo(
        galleryRef.current?.querySelectorAll('.gallery-caption') || [],
        { x: -15, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.5,
          stagger: 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: galleryRef.current,
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
        <div ref={headerRef} className="text-center mb-10 lg:mb-14">
          <h2 className="font-serif font-semibold text-3xl lg:text-5xl text-near-black mb-3 lg:mb-4">
            Accra, Seen Our Way
          </h2>
          <p className="text-base lg:text-lg text-cool-gray max-w-2xl mx-auto">
            Discover the beauty of premium living through our curated collection.
          </p>
        </div>

        {/* Gallery Grid */}
        <div
          ref={galleryRef}
          className="grid grid-cols-2 md:grid-cols-3 gap-4 lg:gap-6"
        >
          {galleryImages.map((image, index) => (
            <div
              key={index}
              className="gallery-item group relative rounded-2xl lg:rounded-3xl overflow-hidden shadow-card aspect-[16/10] cursor-pointer"
            >
              <img
                src={image.src}
                alt={image.caption}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-near-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              {/* Caption */}
              <div className="gallery-caption absolute bottom-3 left-3 lg:bottom-4 lg:left-4">
                <div className="bg-white/95 backdrop-blur-sm rounded-xl px-3 py-1.5 lg:px-4 lg:py-2">
                  <span className="text-xs lg:text-sm font-medium text-near-black">
                    {image.caption}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
