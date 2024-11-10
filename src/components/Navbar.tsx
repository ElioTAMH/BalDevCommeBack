import { Link } from "react-router-dom";
import { Code2, Github, Menu } from "lucide-react";
import LanguageSelector from "./LanguageSelector";
import { useState } from "react";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <Code2 className="h-8 w-8 text-indigo-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">
                BalDev
              </span>
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <Link to="/docs" className="text-gray-700 hover:text-indigo-600">
              Documentation
            </Link>
            <Link to="/search" className="text-gray-700 hover:text-indigo-600">
              Search
            </Link>
            <LanguageSelector />
            <a
              href="https://github.com/AigloOo/BalDevCommeBack"
              className="text-gray-700 hover:text-indigo-600"
            >
              <Github className="h-5 w-5" />
            </a>
          </div>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-md text-gray-700 hover:text-indigo-600"
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link
              to="/docs"
              className="block px-3 py-2 rounded-md text-gray-700 hover:text-indigo-600 hover:bg-indigo-50"
            >
              Documentation
            </Link>
            <Link
              to="/search"
              className="block px-3 py-2 rounded-md text-gray-700 hover:text-indigo-600 hover:bg-indigo-50"
            >
              Search
            </Link>
            <div className="px-3 py-2">
              <LanguageSelector />
            </div>
            <a
              href="https://github.com/AigloOo/BalDevCommeBack"
              className="block px-3 py-2 rounded-md text-gray-700 hover:text-indigo-600 hover:bg-indigo-50"
            >
              <Github className="h-5 w-5" />
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
