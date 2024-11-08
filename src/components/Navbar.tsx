import React from 'react';
import { Link } from 'react-router-dom';
import { Code2, Github } from 'lucide-react';
import LanguageSelector from './LanguageSelector';

export default function Navbar() {
  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <Code2 className="h-8 w-8 text-indigo-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">BalDev</span>
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <Link to="/docs" className="text-gray-700 hover:text-indigo-600">Documentation</Link>
            <Link to="/search" className="text-gray-700 hover:text-indigo-600">Search</Link>
            <LanguageSelector />
            <a href="https://github.com" className="text-gray-700 hover:text-indigo-600">
              <Github className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}