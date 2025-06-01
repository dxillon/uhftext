import React from 'react';
import { Clock, TrendingUp } from 'lucide-react';
import { Article } from '../types/article';
import { formatDate } from '../utills/formatters';
import { Link } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';

interface ArticleCardProps {
  article: Article;
  featured?: boolean;
  compact?: boolean;
}

const ArticleCard: React.FC<ArticleCardProps> = ({
  article,
  featured = false,
  compact = false
}) => {
  const isTrending = article.trending || article.category === 'trending';
  const isMobile = useMediaQuery({ maxWidth: 767 });

  if (isMobile) {
    return (
      <div className="group relative overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-all duration-300 h-[180px]">

        {isTrending && (
          <div className="md:hidden absolute top-2 right-2 z-10 flex items-center bg-gradient-to-r from-orange-400 to-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-md">
            <TrendingUp size={12} className="mr-1" />
            <span>TRENDING</span>
          </div>
        )}

        <div className="absolute inset-0">
          <img
            src={article.heroImage}
            alt={article.title}
            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
        </div>

        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>

        <div className="absolute bottom-0 left-0 right-0 p-3 text-white z-10">
          <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-1 rounded bg-red-600 inline-block mb-1">
            {article.category.replace('-', ' ')}
          </span>

          <h3 className="font-serif font-bold text-sm tracking-tight line-clamp-2 mb-2">
            {article.title}
          </h3>

          <div className="flex justify-between items-end">
            {/* Author Info */}
            <div className="flex items-start">
              <img
                src={article.author.avatar}
                alt={article.author.name}
                className="w-7 h-7 rounded-full mr-2 object-cover"
                loading="lazy"
              />
              <div className="flex flex-col leading-tight">
                <span className="text-[12px] font-semibold">{article.author.name}</span>
                <span className="text-[10px] text-gray-300 mt-0.5">{formatDate(article.publishDate, true)}</span>
              </div>
            </div>

            {/* Read Time in bottom-right */}
            <div className="flex items-center text-[10px] bg-black/50 px-2 py-1 rounded">
              <Clock size={10} className="mr-1" />
              <span>{article.readTimeMinutes} min</span>
            </div>
          </div>
        </div>

        <Link
          to={`/articles/${article.slug}`}
          className="absolute inset-0 z-20"
          aria-label={`Read ${article.title}`}
        />
      </div>
    );
  }


  // Desktop layout (unchanged)
  const cardClasses = compact
    ? 'h-[360px]'
    : `${featured ? 'md:col-span-2 md:row-span-2 h-[480px]' : 'h-[400px]'}`;

  return (
    <div
      className={`group relative overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-all duration-300 ${cardClasses}`}>


      {isTrending && (
        <div className="hidden md:flex absolute top-4 left-4 z-10 items-center bg-gradient-to-r from-orange-500 to-red-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg transform group-hover:scale-105 transition-transform duration-300">
          <TrendingUp size={14} className="mr-1" />
          <span>TRENDING</span>
        </div>
      )}


      <div className="absolute inset-0">
        <img
          src={article.heroImage}
          alt={article.title}
          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
      </div>

      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-70 group-hover:opacity-90 transition-opacity duration-300"></div>

      <div className="absolute bottom-0 left-0 right-0 p-6 text-white z-10">
        <div className="flex items-center space-x-2 mb-3">
          <span className="text-xs font-semibold uppercase tracking-wider px-2 py-1 rounded bg-red-600">
            {article.category.replace('-', ' ')}
          </span>
          <div className="flex items-center text-xs">
            <Clock size={12} className="mr-1" />
            <span>{article.readTimeMinutes} min read</span>
          </div>
        </div>

        <h3 className={`font-serif font-bold tracking-tight mb-2 group-hover:text-red-500 transition-colors duration-300 ${compact ? 'text-lg' : (featured ? 'text-2xl md:text-3xl' : 'text-xl')
          }`}>
          {article.title}
        </h3>

        {!compact && (
          <p className={`text-gray-200 mb-4 line-clamp-2 ${featured ? 'md:line-clamp-3' : ''}`}>
            {article.excerpt}
          </p>
        )}

        <div className="flex items-center">
          <img
            src={article.author.avatar}
            alt={article.author.name}
            className="w-8 h-8 rounded-full mr-2 object-cover"
            loading="lazy"
          />
          <div>
            <p className="text-sm font-medium">{article.author.name}</p>
            <p className="text-xs text-gray-300">{formatDate(article.publishDate)}</p>
          </div>
        </div>
      </div>

      <Link
        to={`/articles/${article.slug}`}
        className="absolute inset-0 z-20"
        aria-label={`Read ${article.title}`}
      />
    </div>
  );
};

export default React.memo(ArticleCard);