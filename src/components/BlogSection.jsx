import React from 'react';
import { blogPosts } from '../data/blogPosts';
import { BookOpen, ExternalLink, Calendar } from 'lucide-react';

export default function BlogSection() {
  return (
    <section id="blog" className="py-16 bg-gray-50/50 dark:bg-gray-900/30">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
          <div>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-soft px-3 py-1 text-xs font-semibold text-brand dark:bg-brand/15 dark:text-glow">
              <BookOpen className="h-3.5 w-3.5" />
              Conteúdo & Dicas
            </span>
            <h2 className="font-display mt-2 text-2xl sm:text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
              Do nosso blog
            </h2>
            <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
              Descubra estratégias e novidades para criar rifas cada vez mais lucrativas.
            </p>
          </div>

          <a 
            href="#blog" 
            className="inline-flex items-center gap-2 self-start rounded-full border border-brand/20 px-4 py-2 text-xs font-bold text-brand hover:bg-brand-soft dark:border-brand/30 dark:text-glow transition"
          >
            Ver todos os artigos
            <ExternalLink className="h-3.5 w-3.5" />
          </a>
        </div>

        {/* Blog Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {blogPosts.map((post) => (
            <article 
              key={post.id}
              className="group relative flex flex-col overflow-hidden rounded-3xl border border-gray-200/80 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg dark:border-white/10 dark:bg-[#10212C]"
            >
              {/* Image */}
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-gray-100 dark:bg-gray-800">
                <img
                  src={post.image}
                  alt={post.title}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
              </div>

              {/* Body */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-1.5 text-[11px] font-semibold text-brand dark:text-glow mb-2">
                    <Calendar className="h-3 w-3" />
                    <span>{post.date}</span>
                  </div>

                  <h3 className="font-display text-sm sm:text-base font-bold text-gray-900 dark:text-white line-clamp-2 group-hover:text-brand transition-colors">
                    {post.title}
                  </h3>

                  <p className="mt-2 text-xs text-gray-500 dark:text-gray-400 line-clamp-2">
                    {post.excerpt}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-gray-100 dark:border-white/5 flex items-center justify-between text-xs font-semibold text-brand dark:text-glow">
                  <span>Ler artigo</span>
                  <ExternalLink className="h-3.5 w-3.5" />
                </div>
              </div>
            </article>
          ))}
        </div>

      </div>
    </section>
  );
}
