import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, Code2, Layout, Terminal, Database } from 'lucide-react';
import { useTranslation } from '../contexts/TranslationContext';

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    totalDocs: 0,
    totalContributors: 0,
    lastUpdated: ''
  });
  const { t } = useTranslation();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch('https://api.github.com/repos/J-W-devlopment/BalDev', {
          headers: {
            Accept: 'application/vnd.github.v3+json'
          }
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setStats({
          totalDocs: data.size || 0,
          totalContributors: data.subscribers_count || 0,
          lastUpdated: data.updated_at ? new Date(data.updated_at).toLocaleDateString() : ''
        });
      } catch (error) {
        console.error('Error fetching stats:', error);
        setStats({
          totalDocs: 0,
          totalContributors: 0,
          lastUpdated: ''
        });
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center">
        <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
          <span className="block">{t('home.title')}</span>
          <span className="block text-indigo-600">{t('home.subtitle')}</span>
        </h1>
        <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
          {t('home.description')}
        </p>

        <div className="mt-4 flex justify-center space-x-6">
          <div className="text-gray-600">
            <span className="block text-2xl font-bold">{stats.totalDocs}</span>
            <span className="text-sm">{t('home.stats.totalDocs')}</span>
          </div>
          <div className="text-gray-600">
            <span className="block text-2xl font-bold">{stats.totalContributors}</span>
            <span className="text-sm">{t('home.stats.contributors')}</span>
          </div>
          <div className="text-gray-600">
            <span className="block text-2xl font-bold">{stats.lastUpdated}</span>
            <span className="text-sm">{t('home.stats.lastUpdated')}</span>
          </div>
        </div>

        <div className="mt-8 flex justify-center">
          <form onSubmit={handleSearch} className="relative rounded-full w-full max-w-lg">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search documentation..."
              className="w-full px-6 py-3 rounded-full border-2 border-gray-300 focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
            />
            <button
              type="submit"
              className="absolute right-4 top-3.5 text-gray-400 hover:text-indigo-600"
            >
              <Search className="h-5 w-5" />
            </button>
          </form>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-3">
          <Link to="/docs/html" className="group">
            <div className="relative rounded-lg p-6 bg-white shadow-sm hover:shadow-md transition-shadow">
              <div className="absolute inset-x-0 bottom-0 h-2 bg-gradient-to-r from-indigo-500 to-indigo-600 transform origin-bottom scale-x-0 group-hover:scale-x-100 transition-transform"></div>
              <Code2 className="h-8 w-8 text-indigo-600 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900">HTML</h3>
              <p className="mt-2 text-gray-500">Core HTML concepts, semantic markup, and accessibility best practices.</p>
            </div>
          </Link>

          <Link to="/docs/css" className="group">
            <div className="relative rounded-lg p-6 bg-white shadow-sm hover:shadow-md transition-shadow">
              <div className="absolute inset-x-0 bottom-0 h-2 bg-gradient-to-r from-indigo-500 to-indigo-600 transform origin-bottom scale-x-0 group-hover:scale-x-100 transition-transform"></div>
              <Layout className="h-8 w-8 text-indigo-600 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900">CSS</h3>
              <p className="mt-2 text-gray-500">Modern layouts, animations, and responsive design techniques.</p>
            </div>
          </Link>

          <Link to="/docs/javascript" className="group">
            <div className="relative rounded-lg p-6 bg-white shadow-sm hover:shadow-md transition-shadow">
              <div className="absolute inset-x-0 bottom-0 h-2 bg-gradient-to-r from-indigo-500 to-indigo-600 transform origin-bottom scale-x-0 group-hover:scale-x-100 transition-transform"></div>
              <Terminal className="h-8 w-8 text-indigo-600 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900">JavaScript</h3>
              <p className="mt-2 text-gray-500">Modern JavaScript features, async programming, and best practices.</p>
            </div>
          </Link>

          <Link to="/docs/nodejs" className="group">
            <div className="relative rounded-lg p-6 bg-white shadow-sm hover:shadow-md transition-shadow">
              <div className="absolute inset-x-0 bottom-0 h-2 bg-gradient-to-r from-indigo-500 to-indigo-600 transform origin-bottom scale-x-0 group-hover:scale-x-100 transition-transform"></div>
              <Database className="h-8 w-8 text-indigo-600 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900">Node.js</h3>
              <p className="mt-2 text-gray-500">Server-side JavaScript, APIs, and backend development.</p>
            </div>
          </Link>

          <Link to="/docs/react" className="group">
            <div className="relative rounded-lg p-6 bg-white shadow-sm hover:shadow-md transition-shadow">
              <div className="absolute inset-x-0 bottom-0 h-2 bg-gradient-to-r from-indigo-500 to-indigo-600 transform origin-bottom scale-x-0 group-hover:scale-x-100 transition-transform"></div>
              <Code2 className="h-8 w-8 text-indigo-600 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900">React</h3>
              <p className="mt-2 text-gray-500">Components, hooks, state management, and React patterns.</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}