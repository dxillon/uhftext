types
article.ts
export type Category =
  | 'post-production'
  | 'hollywood'
  | 'film-production'
  | 'filmmaking'
  | 'bollywood'
  | 'acting'
  | 'agritech'
  | 'cinematography'
  | 'digital'
  | 'directing'
  | 'emerging-tech'
  | 'industry-news'
  | 'international'
  | 'marketing'
  | 'AI'
  | 'trending'
  | 'web3'
  | 'neuroscience'
  | 'quantum-tech'
  | 'sustainability'
  | 'technology'
  | 'tollywood'
  | 'wellness';

export type SubCategory =
  | 'ai-innovation'
  | 'ai-music'
  | 'artificial-intelligence'
  | 'arts-culture'
  | 'awards'
  | 'behind-the-scenes'
  | 'case-studies'
  | 'crowdfunding'
  | 'digital-strategy'
  | 'education'
  | 'equipment'
  | 'experimental-cinema'
  | 'film-industry'
  | 'film-technology'
  | 'festivals'
  | 'green-tech'
  | 'industry-trends'
  | 'interviews'
  | 'movies'
  | 'music-tech'
  | 'screenwriting'
  | 'short-form-video'
  | 'smart-cities'
  | 'spiritual-tech'
  | 'sports-fandom'
  | 'synthetic-media'
  | 'techniques'
  | 'tutorials'
  | 'virtual-events'
  | 'virtual-lifestyle'
  | 'web-series'
  | 'web3';


export interface Author {
  id: string;
  name: string;
  avatar: string;
  bio: string;
  role: string;
}

export interface Article {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  summary?: string[];
  content: string;
  heroImage: string;
  trending?: boolean;
  category: Category;
  subCategory?: SubCategory;
  author: Author;
  publishDate: string;
  readTimeMinutes: number;
  featuredOnly?: boolean;
  tags?: string[];
}
