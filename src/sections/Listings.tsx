import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Bed, Bath, Square, MapPin, ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const properties = [
  {
    image: '/images/listing-01.jpg',
    title: '3-Bed Family Home',
    location: 'East Legon',
    beds: 3,
    baths: 3,
    area: '240 m²',
    price: '$1,200/mo',
    type: 'rent',
  },
  {
    image: '/images/listing-02.jpg',
    title: 'Modern 2-Bed Apartment',
    location: 'Airport Residential',
    beds: 2,
    baths: 2,
    area: '160 m²',
    price: '$950/mo',
    type: 'rent',
  },
  {
    image: '/images/listing-03.jpg',
    title: 'Spacious 4-Bed Villa',
    location: 'Cantonments',
    beds: 4,
    baths: 4,
    area: '380 m²',
    price: '$2,500/mo',
    type: 'rent',
  },
  {
    image: '/images/listing-04.jpg',
    title: 'Studio Near the Airport',
    location: 'Dzorwulu',
    beds: 1,
    baths: 1,
    area: '55 m²',
    price: '$450/mo',
    type: 'rent',
  },
  {
    image: '/images/listing-05.jpg',
    title: 'Penthouse with Pool',
    location: 'Trassaco',
    beds: 3,
    baths: 3,
    area: '300 m²',
    price: '$3,200/mo',
    type: 'rent',
  },
  {
    image: '/images/listing-06.jpg',
    title: 'New 2-Bed in Adenta',
    location: 'Adenta',
    beds: 2,
    baths: 2,
    area: '140 m²',
    price: '$600/mo',
    type: 'rent',
  },
];

export default function Listings() {
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
        gridRef.current?.querySelectorAll('.property-card') || [],
        { opacity: 0, y: 40, scale: 0.98 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.7,
          stagger: 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: gridRef.current,
            start: 'top 75%',
          },
        }
      );

      // Price badges animation
      gsap.fromTo(
        gridRef.current?.querySelectorAll('.price-badge') || [],
        { scale: 0.9, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.5,
          stagger: 0.1,
          ease: 'back.out(1.7)',
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
      id="listings"
      className="relative w-full bg-cloud-gray py-16 lg:py-24"
    >
      <div className="section-container">
        {/* Header */}
        <div
          ref={headerRef}
          className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10 lg:mb-14"
        >
          <div>
            <h2 className="font-serif font-semibold text-3xl lg:text-5xl text-near-black mb-2 lg:mb-3">
              Properties for Rent & Sale
            </h2>
            <p className="text-base lg:text-lg text-cool-gray">
              Browse our curated selection of premium properties.
            </p>
          </div>
          <div className="flex gap-2">
            <Badge
              variant="default"
              className="bg-vivid-blue text-white rounded-full px-4 py-2 cursor-pointer"
            >
              All
            </Badge>
            <Badge
              variant="outline"
              className="border-gray-200 text-cool-gray rounded-full px-4 py-2 cursor-pointer hover:border-vivid-blue hover:text-vivid-blue"
            >
              For Rent
            </Badge>
            <Badge
              variant="outline"
              className="border-gray-200 text-cool-gray rounded-full px-4 py-2 cursor-pointer hover:border-vivid-blue hover:text-vivid-blue"
            >
              For Sale
            </Badge>
          </div>
        </div>

        {/* Properties Grid */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6"
        >
          {properties.map((property, index) => (
            <div
              key={index}
              className="property-card group bg-white rounded-2xl lg:rounded-3xl overflow-hidden shadow-sm hover:shadow-card transition-all duration-300 border border-transparent hover:border-vivid-blue/10"
            >
              {/* Image */}
              <div className="relative aspect-[16/10] overflow-hidden">
                <img
                  src={property.image}
                  alt={property.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                {/* Price Badge */}
                <div className="price-badge absolute top-3 right-3 lg:top-4 lg:right-4">
                  <Badge className="bg-vivid-blue text-white rounded-xl px-3 py-1.5 text-sm font-semibold">
                    {property.price}
                  </Badge>
                </div>
              </div>

              {/* Content */}
              <div className="p-4 lg:p-5">
                <h3 className="font-serif font-semibold text-near-black text-base lg:text-lg mb-2">
                  {property.title}
                </h3>
                <div className="flex items-center gap-1 text-cool-gray text-sm mb-3 lg:mb-4">
                  <MapPin className="w-4 h-4" />
                  <span>{property.location}</span>
                </div>

                {/* Specs */}
                <div className="flex items-center gap-3 lg:gap-4 text-sm text-cool-gray mb-4">
                  <div className="flex items-center gap-1">
                    <Bed className="w-4 h-4" />
                    <span>{property.beds}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Bath className="w-4 h-4" />
                    <span>{property.baths}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Square className="w-4 h-4" />
                    <span>{property.area}</span>
                  </div>
                </div>

                {/* CTA */}
                <Button
                  variant="outline"
                  className="w-full border-vivid-blue text-vivid-blue hover:bg-vivid-blue hover:text-white rounded-xl py-4 lg:py-5 text-sm group"
                >
                  View Details
                  <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-10 lg:mt-14">
          <Button
            variant="outline"
            className="border-near-black text-near-black hover:bg-near-black hover:text-white rounded-xl px-6 lg:px-8 py-5 lg:py-6 text-sm group"
          >
            View All Properties
            <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
          </Button>
        </div>
      </div>
    </section>
  );
}
