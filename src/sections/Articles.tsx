import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Badge } from '@/components/ui/badge';
import { ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const articles = [
  {
    image: '/images/article-01.jpg',
    category: 'Guide',
    title: 'Best Areas to Buy Property in Accra',
    excerpt:
      'A local\'s guide to value, lifestyle, and future growth in Accra\'s prime neighborhoods.',
  },
  {
    image: '/images/article-02.jpg',
    category: 'Investment',
    title: 'How to Invest in Ghana Real Estate',
    excerpt:
      'What to check before you sign—documents, permits, and red flags to watch for.',
  },
  {
    image: '/images/article-03.jpg',
    category: 'Lifestyle',
    title: 'Luxury Homes in East Legon',
    excerpt:
      'What premium living looks like and what it costs in one of Accra\'s most sought-after areas.',
  },
];

export default function Articles() {
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
        gridRef.current?.querySelectorAll('.article-card') || [],
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: gridRef.current,
            start: 'top 75%',
          },
        }
      );

      // Thumbnail animations
      gsap.fromTo(
        gridRef.current?.querySelectorAll('.article-image') || [],
        { scale: 1.05, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.7,
          stagger: 0.1,
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
              News and Articles
            </h2>
            <p className="text-base lg:text-lg text-cool-gray">
              Insights and tips from our real estate experts.
            </p>
          </div>
          <a
            href="#"
            className="text-vivid-blue hover:text-vivid-blue/80 font-medium text-sm flex items-center gap-1 group"
          >
            View all articles
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </a>
        </div>

        {/* Articles Grid */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6"
        >
          {articles.map((article, index) => (
            <article
              key={index}
              className="article-card group bg-white rounded-2xl lg:rounded-3xl overflow-hidden shadow-sm hover:shadow-card transition-all duration-300 border border-transparent hover:border-vivid-blue/10 cursor-pointer"
            >
              {/* Image */}
              <div className="relative aspect-[16/10] overflow-hidden">
                <img
                  src={article.image}
                  alt={article.title}
                  className="article-image w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>

              {/* Content */}
              <div className="p-4 lg:p-6">
                <Badge
                  variant="outline"
                  className="border-vivid-blue text-vivid-blue rounded-full px-3 py-1 text-xs mb-3"
                >
                  {article.category}
                </Badge>
                <h3 className="font-serif font-semibold text-near-black text-base lg:text-lg mb-2 line-clamp-2 group-hover:text-vivid-blue transition-colors">
                  {article.title}
                </h3>
                <p className="text-sm text-cool-gray line-clamp-2 mb-4">
                  {article.excerpt}
                </p>
                <a
                  href="#"
                  className="text-sm font-medium text-vivid-blue flex items-center gap-1 group/link"
                >
                  Read more
                  <ArrowRight className="w-4 h-4 transition-transform group-hover/link:translate-x-1" />
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
