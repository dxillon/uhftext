import React, { useState } from 'react';
import { Search, X, Loader2 } from 'lucide-react';

interface SearchBarProps {
  onSearch: (term: string) => void;
  isLoading?: boolean;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, isLoading = false }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchTerm);
  };

  const handleClear = () => {
    setSearchTerm('');
    onSearch('');
  };

  return (
    <form onSubmit={handleSubmit} className="relative w-full max-w-xl mx-auto">
      <div
        className={`flex items-center gap-3 px-4 py-2 rounded-full border transition-all duration-300 backdrop-blur-md 
          ${isFocused ? 'border-red-500 bg-white/20' : 'border-white/20 bg-white/10'}
        `}
      >
        <div className="text-white/70">
          {isLoading ? (
            <Loader2 size={20} className="animate-spin" />
          ) : (
            <Search size={20} />
          )}
        </div>

        <input
          type="text"
          placeholder="Search articles..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className="flex-grow bg-transparent outline-none text-white placeholder-white/60 text-base sm:text-lg"
        />

        {/* Clear */}
        {searchTerm && !isLoading && (
          <button
            type="button"
            onClick={handleClear}
            className="text-white/60 hover:text-red-500 transition"
            aria-label="Clear search"
          >
            <X size={18} />
          </button>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={!searchTerm || isLoading}
          className={`ml-2 px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 flex items-center gap-1
            ${searchTerm && !isLoading
              ? 'bg-red-600 hover:bg-red-700 text-white'
              : 'bg-white/20 text-white/50 cursor-not-allowed'}
          `}
        >
          {isLoading ? (
            <Loader2 size={16} className="animate-spin" />
          ) : (
            'Search'
          )}
        </button>
      </div>
    </form>
  );
};

export default SearchBar;
