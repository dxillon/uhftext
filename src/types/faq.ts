// types/faq.ts
export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  views: number;
  category: string;
  isFeatured?: boolean;
  keywords: string[];
  hasActionButton?: boolean;
  actionText?: string;
  actionLink?: string;
}