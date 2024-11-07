import React, { useState } from 'react';
import { Search as SearchIcon } from 'lucide-react';

export default function Search() {
  const [query, setQuery] = useState('');

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search documentation..."
          className="w-full px-6 py-3 rounded-lg border-2 border-gray-300 focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
        />
        <SearchIcon className="absolute right-4 top-3.5 h-5 w-5 text-gray-400" />
      </div>

      <div className="mt-8">
        {query ? (
          <p className="text-gray-500">No results found for "{query}"</p>
        ) : (
          <p className="text-gray-500">Start typing to search...</p>
        )}
      </div>
    </div>
  );
}