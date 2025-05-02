import React, { useState } from 'react';
import { Search, X } from 'lucide-react';

interface SearchBarProps {
  onSearch: (term: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchTerm);
  };

  const handleClear = () => {
    setSearchTerm('');
    onSearch('');
  };

  return (
    <form onSubmit={handleSubmit} className="relative w-full flex items-center">
      <input
        type="text"
        placeholder="Search articles..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
      />
      <Search size={18} className="absolute left-3 text-gray-400" />
      
      {searchTerm && (
        <button
          type="button"
          onClick={handleClear}
          className="absolute right-10 text-gray-400 hover:text-gray-600"
        >
          <X size={18} />
        </button>
      )}
      
      <button
        type="submit"
        className="absolute right-2 bg-red-600 hover:bg-red-700 text-white p-1 rounded-md transition-colors duration-200"
      >
        <Search size={16} />
      </button>
    </form>
  );
};

export default SearchBar;