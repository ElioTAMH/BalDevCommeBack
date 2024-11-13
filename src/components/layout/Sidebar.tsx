import { Link, useLocation } from "react-router-dom";
import { Book, Code2, Layout, Terminal, Database, Plus } from "lucide-react";
import { useTranslation } from "../../hooks/useTranslation";

export default function Sidebar() {
  const location = useLocation();
  const { t } = useTranslation();

  const categories = [
    { name: "HTML", icon: Code2, path: "/docs/html" },
    { name: "CSS", icon: Layout, path: "/docs/css" },
    { name: "JavaScript", icon: Terminal, path: "/docs/javascript" },
    { name: "Node.js", icon: Database, path: "/docs/nodejs" },
    { name: "React", icon: Code2, path: "/docs/react" },
  ];

  return (
    <div className="w-64 bg-white border-r border-gray-200 flex flex-col h-full">
      <div className="flex-1 overflow-y-auto p-4">
        <div className="p-6">
          <div className="flex items-center space-x-3">
            <Book className="h-6 w-6 text-indigo-600" />
            <span className="text-xl font-semibold text-gray-900">
              Contents
            </span>
          </div>

          <nav className="mt-8 space-y-1">
            {categories.map((category) => {
              const Icon = category.icon;
              const isActive = location.pathname === category.path;

              return (
                <Link
                  key={category.name}
                  to={category.path}
                  className={`flex items-center px-4 py-2 text-sm font-medium rounded-md ${
                    isActive
                      ? "bg-indigo-50 text-indigo-600"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  }`}
                >
                  <Icon className="mr-3 h-5 w-5" />
                  {category.name}
                </Link>
              );
            })}
          </nav>
        </div>
      </div>

      <div className="p-4 border-t border-gray-200 bg-indigo-50">
        <h3 className="text-sm font-medium text-indigo-900 mb-2">
          {t("contribute.sidebar.title")}
        </h3>
        <p className="text-sm text-indigo-700 mb-4">
          {t("contribute.sidebar.description")}
        </p>
        <Link
          to="/contribute"
          className="flex items-center justify-center w-full bg-indigo-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-indigo-700 transition-colors"
        >
          <Plus className="w-4 h-4 mr-2" />
          {t("contribute.sidebar.button")}
        </Link>
      </div>
    </div>
  );
}
