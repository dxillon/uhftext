import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import { Category } from '../types/article';

interface CategoryFilterProps {
  categories: Category[];
  activeCategory: Category | null;
  onSelectCategory: (category: Category | null) => void;
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({ 
  categories, 
  activeCategory, 
  onSelectCategory 
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleDropdown = () => setIsOpen(!isOpen);
  
  const handleCategorySelect = (category: Category | null) => {
    onSelectCategory(category);
    setIsOpen(false);
  };

  const formatCategoryName = (category: string) => {
    return category.split('-').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={toggleDropdown}
        className="flex items-center justify-between w-full md:w-48 px-4 py-2 text-sm font-medium bg-gray-800 text-white rounded-lg hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-red-500"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <span>{activeCategory ? formatCategoryName(activeCategory) : 'All Categories'}</span>
        <ChevronDown size={16} className={`ml-2 transform transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 z-50 w-full md:w-48 mt-2 bg-gray-800 rounded-lg shadow-xl py-1 overflow-auto max-h-60">
          <ul role="listbox" className="py-1">
            <li
              role="option"
              className={`cursor-pointer select-none relative py-2 px-4 text-sm hover:bg-gray-700 ${
                !activeCategory ? 'text-red-500' : 'text-white'
              }`}
              onClick={() => handleCategorySelect(null)}
            >
              All Categories
            </li>
            {categories.map((category) => (
              <li
                key={category}
                role="option"
                className={`cursor-pointer select-none relative py-2 px-4 text-sm hover:bg-gray-700 ${
                  activeCategory === category ? 'text-red-500' : 'text-white'
                }`}
                onClick={() => handleCategorySelect(category)}
              >
                {formatCategoryName(category)}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default CategoryFilter;