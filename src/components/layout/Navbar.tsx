import { Link } from "react-router-dom";
import { Code2, Github, Menu } from "lucide-react";
import LanguageSelector from "../LanguageSelector";
import { useState } from "react";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-white shadow-lg border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center group">
              <Code2 className="h-8 w-8 text-indigo-600 group-hover:scale-110 transition-transform" />
              <span className="ml-2 text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                BalDev
              </span>
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-6">
            <Link
              to="/docs"
              className="text-gray-700 hover:text-indigo-600 font-medium transition-colors"
            >
              Documentation
            </Link>
            <Link
              to="/search"
              className="text-gray-700 hover:text-indigo-600 font-medium transition-colors"
            >
              Search
            </Link>
            <LanguageSelector />
            <a
              href="https://github.com/AigloOo/BalDevCommeBack"
              className="text-gray-700 hover:text-indigo-600 transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github className="h-5 w-5 hover:scale-110 transition-transform" />
            </a>
          </div>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-md text-gray-700 hover:text-indigo-600 hover:bg-gray-100 transition-colors"
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 bg-gray-50">
            <Link
              to="/docs"
              className="block px-4 py-2.5 rounded-lg text-gray-700 hover:text-indigo-600 hover:bg-white transition-all duration-200 font-medium"
            >
              Documentation
            </Link>
            <Link
              to="/search"
              className="block px-4 py-2.5 rounded-lg text-gray-700 hover:text-indigo-600 hover:bg-white transition-all duration-200 font-medium"
            >
              Search
            </Link>
            <div className="px-4 py-2.5">
              <LanguageSelector />
            </div>
            <a
              href="https://github.com/AigloOo/BalDevCommeBack"
              className="flex items-center px-4 py-2.5 rounded-lg text-gray-700 hover:text-indigo-600 hover:bg-white transition-all duration-200"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github className="h-5 w-5" />
              <span className="ml-2 font-medium">GitHub</span>
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
