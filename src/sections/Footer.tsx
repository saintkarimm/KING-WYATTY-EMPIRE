import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MapPin, Phone, Mail, Instagram, Facebook, Linkedin } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const footerLinks = {
  services: [
    { name: 'Property Rentals', href: '#listings' },
    { name: 'Property Sales', href: '#listings' },
    { name: 'Land Sales & Acquisition', href: '#services' },
    { name: 'Architectural Drawings', href: '#services' },
    { name: 'Land Surveillance', href: '#services' },
    { name: 'Property Consulting & Valuation', href: '#services' },
  ],
  locations: [
    { name: 'East Legon', href: '#locations' },
    { name: 'Airport Residential', href: '#locations' },
    { name: 'Cantonments', href: '#locations' },
    { name: 'Spintex', href: '#locations' },
    { name: 'Nmai-Dzorm', href: '#locations' },
    { name: 'Trasacco Estate', href: '#locations' },
  ],
};

const socialLinks = [
  { icon: Instagram, href: '#', label: 'Instagram' },
  { icon: Facebook, href: '#', label: 'Facebook' },
  { icon: Linkedin, href: '#', label: 'LinkedIn' },
];

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const columnsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        columnsRef.current?.querySelectorAll('.footer-column') || [],
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.08,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: footerRef.current,
            start: 'top 85%',
          },
        }
      );
    }, footerRef);

    return () => ctx.revert();
  }, []);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer
      ref={footerRef}
      className="relative w-full bg-cloud-gray pt-16 lg:pt-24 pb-8"
    >
      {/* Gradient fade to sky blue at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-sky-blue/50 to-transparent pointer-events-none" />

      <div className="section-container relative">
        <div
          ref={columnsRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-12 lg:mb-16"
        >
          {/* Brand Column */}
          <div className="footer-column sm:col-span-2 lg:col-span-1">
            <a href="#home" className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-full bg-vivid-blue flex items-center justify-center">
                <span className="text-white font-serif font-bold text-lg">D</span>
              </div>
              <span className="font-serif font-semibold text-near-black">
                Dream Luxury Real Estate
              </span>
            </a>
            <p className="text-sm text-cool-gray mb-6 leading-relaxed">
              Your trusted partner for rentals, sales, land, architectural drawings, and property consulting across Accra.
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  aria-label={social.label}
                  className="w-10 h-10 rounded-full bg-sky-blue flex items-center justify-center hover:bg-vivid-blue transition-colors group"
                >
                  <social.icon className="w-5 h-5 text-vivid-blue group-hover:text-white transition-colors" />
                </a>
              ))}
            </div>
          </div>

          {/* Services Column */}
          <div className="footer-column">
            <h4 className="font-serif font-semibold text-near-black mb-4">
              Services
            </h4>
            <ul className="space-y-3">
              {footerLinks.services.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection(link.href);
                    }}
                    className="text-sm text-cool-gray hover:text-vivid-blue transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Locations Column */}
          <div className="footer-column">
            <h4 className="font-serif font-semibold text-near-black mb-4">
              Locations
            </h4>
            <ul className="space-y-3">
              {footerLinks.locations.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection(link.href);
                    }}
                    className="text-sm text-cool-gray hover:text-vivid-blue transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Column */}
          <div className="footer-column">
            <h4 className="font-serif font-semibold text-near-black mb-4">
              Contact
            </h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-vivid-blue mt-0.5 flex-shrink-0" />
                <span className="text-sm text-cool-gray">
                  Nmai-Dzorm, E Legon - Trasacco Estate Rd
                </span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-vivid-blue flex-shrink-0" />
                <a
                  href="tel:+233246151688"
                  className="text-sm text-cool-gray hover:text-vivid-blue transition-colors"
                >
                  024 615 1688
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-vivid-blue flex-shrink-0" />
                <a
                  href="mailto:info@dreamluxuryrealestate.com"
                  className="text-sm text-cool-gray hover:text-vivid-blue transition-colors"
                >
                  info@dreamluxuryrealestate.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 lg:pt-8 border-t border-gray-200">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs lg:text-sm text-cool-gray text-center sm:text-left">
              &copy; {new Date().getFullYear()} Dream Luxury Real Estate Agency Ltd. All rights
              reserved.
            </p>
            <div className="flex gap-4 lg:gap-6">
              <a
                href="#"
                className="text-xs lg:text-sm text-cool-gray hover:text-vivid-blue transition-colors"
              >
                Privacy Policy
              </a>
              <a
                href="#"
                className="text-xs lg:text-sm text-cool-gray hover:text-vivid-blue transition-colors"
              >
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
