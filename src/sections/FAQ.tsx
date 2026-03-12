import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

gsap.registerPlugin(ScrollTrigger);

const faqs = [
  {
    question: 'Do you offer rental properties in East Legon?',
    answer:
      'Yes, we have a wide selection of rental properties in East Legon, ranging from apartments to family homes. Our listings are regularly updated with verified properties.',
  },
  {
    question: 'Can you help me buy land in Accra?',
    answer:
      'Absolutely. We specialize in land acquisition with verified documentation. Our team will guide you through the entire process, from site visits to final documentation.',
  },
  {
    question: 'Do you manage Airbnb properties?',
    answer:
      'Yes, we offer full Airbnb management services including listing optimization, guest communication, cleaning coordination, and pricing strategy to maximize your returns.',
  },
  {
    question: 'Which areas do you serve?',
    answer:
      'We proudly serve Spintex and prime areas including East Legon, Adjiringanor, Airport Residential, Trassaco, East Legon Hills, Cantonments, Tse Addo, Dzowulu, Adenta, and Oyarifa.',
  },
  {
    question: 'What documents do I need to rent?',
    answer:
      'Typically, you\'ll need a valid ID, proof of income or employment, and references. Our team will provide a complete checklist based on your specific situation.',
  },
];

export default function FAQ() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const accordionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header animation
      gsap.fromTo(
        headerRef.current,
        { opacity: 0, x: -30 },
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

      // Accordion items animation
      gsap.fromTo(
        accordionRef.current?.querySelectorAll('.faq-item') || [],
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.08,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: accordionRef.current,
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
      className="relative w-full bg-cloud-gray py-16 lg:py-24"
    >
      <div className="section-container">
        <div className="flex flex-col lg:flex-row lg:gap-16">
          {/* Header */}
          <div ref={headerRef} className="w-full lg:w-1/3 mb-8 lg:mb-0">
            <h2 className="font-serif font-semibold text-3xl lg:text-5xl text-near-black mb-3 lg:mb-4">
              Have Questions?
            </h2>
            <p className="text-base lg:text-lg text-cool-gray">
              Find answers to commonly asked questions about our services.
            </p>
          </div>

          {/* Accordion */}
          <div ref={accordionRef} className="w-full lg:w-2/3">
            <Accordion type="single" collapsible className="space-y-3 lg:space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  className="faq-item bg-white rounded-2xl border border-gray-100 px-4 lg:px-6 data-[state=open]:shadow-card transition-shadow"
                >
                  <AccordionTrigger className="text-left font-medium text-near-black text-sm lg:text-base py-4 lg:py-5 hover:no-underline">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-cool-gray text-sm lg:text-base pb-4 lg:pb-5 leading-relaxed">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </div>
    </section>
  );
}
