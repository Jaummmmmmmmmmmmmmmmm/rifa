import React, { useState, useEffect } from 'react';
import { testimonials } from '../data/testimonials';
import { Quote, ChevronLeft, ChevronRight, Star } from 'lucide-react';

export default function Testimonials() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent(prev => (prev + 1) % testimonials.length);
    }, 7000);
    return () => clearInterval(timer);
  }, []);

  const prevTestimonial = () => {
    setCurrent(prev => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const nextTestimonial = () => {
    setCurrent(prev => (prev + 1) % testimonials.length);
  };

  const item = testimonials[current];

  return (
    <section className="py-16 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-8">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-gold-soft px-3 py-1 text-xs font-semibold text-gold-deep dark:bg-gold/15 dark:text-gold">
          <Star className="h-3.5 w-3.5 fill-current" />
          Depoimentos Reais
        </span>
        <h2 className="font-display mt-2 text-2xl sm:text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
          A confiança de quem já organizou e vendeu
        </h2>
      </div>

      <div className="relative overflow-hidden rounded-3xl border border-gray-200/80 bg-white/90 p-8 sm:p-12 shadow-xl backdrop-blur-md dark:border-white/10 dark:bg-gray-900/90">
        <Quote className="absolute top-6 right-6 h-12 w-12 text-brand/15 dark:text-glow/10" />

        <div className="relative z-10">
          <div className="flex gap-1 mb-4">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="h-4 w-4 fill-gold text-gold" />
            ))}
          </div>

          <blockquote className="text-lg sm:text-xl md:text-2xl font-medium leading-relaxed text-gray-800 dark:text-gray-100 italic min-h-[90px]">
            “{item.message}”
          </blockquote>

          <div className="mt-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-6 border-t border-gray-100 dark:border-white/10">
            <div>
              <div className="font-bold text-gray-900 dark:text-white text-base">
                {item.name}
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400">
                {item.role}
              </div>
            </div>

            {/* Navigation buttons */}
            <div className="flex items-center gap-3">
              <div className="flex gap-1.5 mr-2">
                {testimonials.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrent(idx)}
                    aria-label={`Ver depoimento ${idx + 1}`}
                    className={`h-2 rounded-full transition-all ${
                      current === idx 
                        ? 'w-6 bg-brand dark:bg-glow' 
                        : 'w-2 bg-gray-300 dark:bg-white/20'
                    }`}
                  />
                ))}
              </div>

              <button
                onClick={prevTestimonial}
                aria-label="Depoimento anterior"
                className="flex h-9 w-9 items-center justify-center rounded-xl border border-gray-200 text-gray-700 hover:bg-gray-100 dark:border-white/10 dark:text-gray-300 dark:hover:bg-white/10 transition"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>

              <button
                onClick={nextTestimonial}
                aria-label="Próximo depoimento"
                className="flex h-9 w-9 items-center justify-center rounded-xl border border-gray-200 text-gray-700 hover:bg-gray-100 dark:border-white/10 dark:text-gray-300 dark:hover:bg-white/10 transition"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
