import React from 'react';
import { Clock } from 'lucide-react';
import { Article } from './types/article';
import { formatDate } from '../utills/formatters';
import { Link } from 'react-router-dom'; 

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
  const cardClasses = compact
    ? 'h-[360px]'
    : `${featured ? 'md:col-span-2 md:row-span-2 h-[480px]' : 'h-[400px]'}`;

  return (
    <div 
      className={`group relative overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-all duration-300 ${cardClasses}`}
    >
      <div className="absolute inset-0">
        <img 
          src={article.heroImage} 
          alt={article.title}
          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500" 
        />
      </div>
      
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-70 group-hover:opacity-90 transition-opacity duration-300"></div>
      
      <div className="absolute bottom-0 left-0 right-0 p-6 text-white z-10">
        <div className="flex items-center space-x-2 mb-3">
          <span className="text-xs font-semibold uppercase tracking-wider px-2 py-1 rounded bg-red-600">{article.category.replace('-', ' ')}</span>
          <div className="flex items-center text-xs">
            <Clock size={12} className="mr-1" />
            <span>{article.readTimeMinutes} min read</span>
          </div>
        </div>
        
        <h3 className={`font-serif font-bold tracking-tight mb-2 group-hover:text-red-500 transition-colors duration-300 ${
          compact ? 'text-lg' : (featured ? 'text-2xl md:text-3xl' : 'text-xl')
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

export default ArticleCard;