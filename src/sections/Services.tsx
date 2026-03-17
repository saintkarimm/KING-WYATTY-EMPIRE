import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Home,
  Key,
  MapPin,
  Building,
  Briefcase,
  FileText,
  Users,
  TrendingUp,
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    icon: Key,
    title: 'Property Rentals',
    description: 'Find vetted homes and apartments quickly.',
  },
  {
    icon: Home,
    title: 'Property Sales',
    description: 'List or buy with market-tested strategy.',
  },
  {
    icon: MapPin,
    title: 'Land Sales & Acquisition',
    description: 'Secure plots with verified documentation.',
  },
  {
    icon: Building,
    title: 'Architectural Drawings',
    description: 'Professional designs for your dream home.',
  },
  {
    icon: Briefcase,
    title: 'Land Surveillance',
    description: 'Protect your land investment with monitoring.',
  },
  {
    icon: TrendingUp,
    title: 'Building Materials Supply',
    description: 'Quality materials for construction projects.',
  },
  {
    icon: FileText,
    title: 'Property Consulting',
    description: 'Expert advice for informed decisions.',
  },
  {
    icon: Users,
    title: 'Property Valuation',
    description: 'Accurate assessments for buying or selling.',
  },
];

export default function Services() {
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

      // Grid items animation
      gsap.fromTo(
        gridRef.current?.querySelectorAll('.service-item') || [],
        { opacity: 0, y: 30, scale: 0.98 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          stagger: 0.08,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: gridRef.current,
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
      id="services"
      className="relative w-full bg-cloud-gray py-16 lg:py-24"
    >
      <div className="section-container">
        {/* Header */}
        <div
          ref={headerRef}
          className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4 lg:gap-8 mb-10 lg:mb-16"
        >
          <div>
            <h2 className="font-serif font-semibold text-3xl lg:text-5xl text-near-black mb-3 lg:mb-4">
              Our Real Estate Services
            </h2>
            <p className="text-base lg:text-lg text-cool-gray max-w-xl">
              A registered real estate company offering rentals, sales, land deals,
              architectural drawings, land surveillance, and building materials supply.
            </p>
          </div>
        </div>

        {/* Services Grid */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6"
        >
          {services.map((service, index) => (
            <div
              key={index}
              className="service-item group bg-white rounded-2xl lg:rounded-3xl p-5 lg:p-6 shadow-sm hover:shadow-card transition-all duration-300 border border-transparent hover:border-vivid-blue/10"
            >
              <div className="w-12 h-12 lg:w-14 lg:h-14 rounded-full bg-sky-blue flex items-center justify-center mb-4 lg:mb-5 group-hover:bg-vivid-blue transition-colors duration-300">
                <service.icon className="w-6 h-6 lg:w-7 lg:h-7 text-vivid-blue group-hover:text-white transition-colors duration-300" />
              </div>
              <h3 className="font-serif font-semibold text-near-black text-base lg:text-lg mb-2">
                {service.title}
              </h3>
              <p className="text-sm text-cool-gray leading-relaxed">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
