import { useState, useEffect } from 'react';
import { Menu, X, Phone, Home, Building2, Briefcase, MapPin, Users, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';

const navLinks = [
  { name: 'Home', href: '#home', icon: Home },
  { name: 'Properties', href: '#listings', icon: Building2 },
  { name: 'Services', href: '#services', icon: Briefcase },
  { name: 'Locations', href: '#locations', icon: MapPin },
  { name: 'About', href: '#mission', icon: Users },
  { name: 'Contact', href: '#contact', icon: Mail },
];

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-cloud-gray/90 backdrop-blur-md shadow-sm'
            : 'bg-transparent'
        }`}
      >
        <div className="section-container">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <a
              href="#home"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('#home');
              }}
              className="flex items-center gap-2"
            >
              <div className="w-8 h-8 lg:w-10 lg:h-10 rounded-full bg-vivid-blue flex items-center justify-center">
                <span className="text-white font-serif font-bold text-sm lg:text-lg">K</span>
              </div>
              <span className="font-serif font-semibold text-near-black text-sm lg:text-base">
                King Wyatt Empire
              </span>
            </a>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(link.href);
                  }}
                  className="text-sm font-medium text-near-black/80 hover:text-vivid-blue transition-colors relative group"
                >
                  {link.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-vivid-blue transition-all duration-300 group-hover:w-full" />
                </a>
              ))}
            </div>

            {/* Right Side */}
            <div className="flex items-center gap-3 lg:gap-4">
              <a
                href="tel:+233556885510"
                className="hidden md:flex items-center gap-2 text-sm text-near-black/80 hover:text-vivid-blue transition-colors"
              >
                <Phone className="w-4 h-4" />
                <span>+233 55 688 5510</span>
              </a>
              <Button
                onClick={() => scrollToSection('#contact')}
                className="hidden sm:flex bg-vivid-blue hover:bg-vivid-blue/90 text-white rounded-full px-4 lg:px-6 text-sm"
              >
                Book a Call
              </Button>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-2 text-near-black"
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 z-40 lg:hidden transition-all duration-300 ${
          isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
      >
        <div className="absolute inset-0 bg-near-black/20 backdrop-blur-sm" onClick={() => setIsMobileMenuOpen(false)} />
        <div
          className={`absolute top-16 left-0 right-0 bg-white shadow-lg transition-transform duration-300 ${
            isMobileMenuOpen ? 'translate-y-0' : '-translate-y-full'
          }`}
        >
          <div className="p-4 space-y-2">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(link.href);
                }}
                className="flex items-center gap-3 p-3 rounded-xl hover:bg-sky-blue/50 transition-colors"
              >
                <link.icon className="w-5 h-5 text-vivid-blue" />
                <span className="font-medium text-near-black">{link.name}</span>
              </a>
            ))}
            <div className="pt-2 border-t border-gray-100">
              <a
                href="tel:+233556885510"
                className="flex items-center gap-3 p-3 text-vivid-blue"
              >
                <Phone className="w-5 h-5" />
                <span className="font-medium">+233 55 688 5510</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
