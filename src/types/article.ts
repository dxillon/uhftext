export type Category = 
  | 'film-production' 
  | 'cinematography' 
  | 'directing' 
  | 'screenwriting'
  | 'acting'
  | 'post-production'
  | 'industry-news';

export type SubCategory =
  | 'interviews'
  | 'tutorials'
  | 'case-studies'
  | 'equipment'
  | 'techniques'
  | 'awards'
  | 'festivals'
  | 'behind-the-scenes';

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
  category: Category;
  subCategory?: SubCategory;
  author: Author;
  publishDate: string;
  readTimeMinutes: number;
  featured?: boolean;
  tags?: string[];
}