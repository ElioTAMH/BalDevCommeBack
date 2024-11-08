import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Search as SearchIcon } from 'lucide-react';
import { documentationData } from '../data/documentation';

interface SearchResult {
  category: string;
  title: string;
  content: string;
  path: string;
}

export default function Search() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get('q') || '');
  const [results, setResults] = useState<SearchResult[]>([]);

  const performSearch = (searchQuery: string) => {
    const searchResults: SearchResult[] = [];

    Object.entries(documentationData).forEach(([category, data]) => {
      data.sections.forEach((section) => {
        const titleMatch = section.title.toLowerCase().includes(searchQuery.toLowerCase());
        const contentMatch = section.content.toLowerCase().includes(searchQuery.toLowerCase());

        if (titleMatch || contentMatch) {
          const sectionId = section.title
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)/g, '');

          searchResults.push({
            category,
            title: section.title,
            content: section.content.replace(/<[^>]*>/g, '').slice(0, 150) + '...',
            path: `/docs/${category}#${sectionId}`
          });
        }
      });
    });

    setResults(searchResults);
  };

  useEffect(() => {
    if (query) {
      performSearch(query);
      setSearchParams({ q: query });
    }
  }, [query, setSearchParams]);

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

      <div className="mt-8 space-y-6">
        {results.length > 0 ? (
          results.map((result, index) => (
            <Link
              key={index}
              to={result.path}
              className="block bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-center space-x-2 text-sm text-indigo-600 mb-2">
                <span className="capitalize">{result.category}</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{result.title}</h3>
              <p className="text-gray-500">{result.content}</p>
            </Link>
          ))
        ) : query ? (
          <p className="text-gray-500 text-center">No results found for "{query}"</p>
        ) : (
          <p className="text-gray-500 text-center">Start typing to search...</p>
        )}
      </div>
    </div>
  );
}