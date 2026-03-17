import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { MapPin, Phone, Mail, Send } from 'lucide-react';
import { toast } from 'sonner';

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Left content animation
      gsap.fromTo(
        leftRef.current,
        { opacity: 0, x: -50 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
          },
        }
      );

      // Right image animation
      gsap.fromTo(
        rightRef.current,
        { opacity: 0, x: 50, scale: 0.98 },
        {
          opacity: 1,
          x: 0,
          scale: 1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
          },
        }
      );

      // Form fields animation
      gsap.fromTo(
        '.form-field',
        { opacity: 0, y: 15 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.08,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: leftRef.current,
            start: 'top 60%',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Message sent successfully! We will get back to you soon.');
    setFormData({ name: '', email: '', phone: '', message: '' });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative w-full bg-cloud-gray py-16 lg:py-24"
    >
      <div className="section-container">
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-16">
          {/* Left Content - Form */}
          <div ref={leftRef} className="w-full lg:w-1/2">
            <h2 className="font-serif font-semibold text-3xl lg:text-5xl text-near-black mb-3 lg:mb-4">
              Get in Touch
            </h2>
            <p className="text-base lg:text-lg text-cool-gray mb-6 lg:mb-8">
              Ready to move? Send a message and we&apos;ll respond within one
              business day.
            </p>

            {/* Contact Info */}
            <div className="space-y-4 mb-8">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-sky-blue flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-vivid-blue" />
                </div>
                <span className="text-sm lg:text-base text-near-black">
                  Nmai-Dzorm, E Legon - Trasacco Estate Rd
                </span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-sky-blue flex items-center justify-center">
                  <Phone className="w-5 h-5 text-vivid-blue" />
                </div>
                <a
                  href="tel:+233246151688"
                  className="text-sm lg:text-base text-near-black hover:text-vivid-blue transition-colors"
                >
                  024 615 1688
                </a>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-sky-blue flex items-center justify-center">
                  <Mail className="w-5 h-5 text-vivid-blue" />
                </div>
                <a
                  href="mailto:info@dreamluxuryrealestate.com"
                  className="text-sm lg:text-base text-near-black hover:text-vivid-blue transition-colors"
                >
                  info@dreamluxuryrealestate.com
                </a>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="form-field grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-sm text-near-black">
                    Name
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your name"
                    required
                    className="rounded-xl border-gray-200 focus:border-vivid-blue focus:ring-vivid-blue/20 py-5"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm text-near-black">
                    Email
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="your@email.com"
                    required
                    className="rounded-xl border-gray-200 focus:border-vivid-blue focus:ring-vivid-blue/20 py-5"
                  />
                </div>
              </div>
              <div className="form-field space-y-2">
                <Label htmlFor="phone" className="text-sm text-near-black">
                  Phone
                </Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+233..."
                  className="rounded-xl border-gray-200 focus:border-vivid-blue focus:ring-vivid-blue/20 py-5"
                />
              </div>
              <div className="form-field space-y-2">
                <Label htmlFor="message" className="text-sm text-near-black">
                  Message
                </Label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell us what you're looking for..."
                  required
                  rows={4}
                  className="rounded-xl border-gray-200 focus:border-vivid-blue focus:ring-vivid-blue/20 resize-none"
                />
              </div>
              <div className="form-field">
                <Button
                  type="submit"
                  className="w-full bg-vivid-blue hover:bg-vivid-blue/90 text-white rounded-xl py-5 lg:py-6 text-sm font-medium group"
                >
                  Send Message
                  <Send className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                </Button>
              </div>
            </form>
          </div>

          {/* Right Content - Image */}
          <div ref={rightRef} className="w-full lg:w-1/2">
            <div className="relative rounded-3xl overflow-hidden shadow-card aspect-[4/5] lg:aspect-auto lg:h-full">
              <img
                src="/images/contact-image.jpg"
                alt="Contact us"
                className="w-full h-full object-cover"
              />
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-near-black/30 to-transparent" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
