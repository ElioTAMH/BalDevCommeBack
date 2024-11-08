import { useParams, Link } from "react-router-dom";
import DOMPurify from "dompurify";
import { useTranslation } from "../contexts/TranslationContext";
import { useEffect } from "react";
import { ChevronRight, BookOpen } from "lucide-react";
import Sidebar from "../components/Sidebar";

interface Section {
  title: string;
  content: string;
  code?: string;
  preview?: {
    type: string;
    html: string;
    output?: string;
  };
}

interface Documentation {
  title: string;
  sections: Section[];
}

export default function Documentation() {
  const { category } = useParams<{ category?: string }>();
  const { getDocumentation, isLoading } = useTranslation();
  const currentDocs = category
    ? (getDocumentation(category) as unknown as Documentation)
    : (getDocumentation("javascript") as unknown as Documentation);

  const sanitizeHTML = (html: string) => {
    return {
      __html: DOMPurify.sanitize(html),
    };
  };

  const scrollToHash = () => {
    const hash = window.location.hash;
    if (hash) {
      const element = document.querySelector(hash);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  useEffect(() => {
    scrollToHash();
  }, [category]);

  const handleCopyCode = async (code: string | undefined) => {
    if (!code) return;
    try {
      await navigator.clipboard.writeText(code);
    } catch (err) {
      console.error("Failed to copy code:", err);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 p-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center space-x-2 text-sm text-gray-500 mb-8">
            <Link to="/" className="hover:text-gray-900">
              Home
            </Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-gray-900">Documentation</span>
          </div>

          <div className="prose prose-indigo max-w-none">
            <h1 className="flex items-center space-x-3 text-4xl font-bold text-gray-900">
              <BookOpen className="h-8 w-8 text-indigo-600" />
              <span>{currentDocs?.title || ""}</span>
            </h1>
            <div className="mt-8 space-y-12">
              {currentDocs?.sections &&
                Array.isArray(currentDocs.sections) &&
                currentDocs.sections.map((section, index) => {
                  const sectionId = section.title
                    .toLowerCase()
                    .replace(/[^a-z0-9]+/g, "-")
                    .replace(/(^-|-$)/g, "");

                  return (
                    <section
                      key={index}
                      id={sectionId}
                      className="bg-white rounded-lg shadow-sm p-6"
                    >
                      <h2 className="text-2xl font-bold text-gray-900 mb-4">
                        {section.title}
                      </h2>
                      <div
                        className="prose prose-indigo max-w-none"
                        dangerouslySetInnerHTML={sanitizeHTML(section.content)}
                      />

                      {section.code && (
                        <div className="mt-4">
                          <div className="relative bg-gray-900 rounded-lg p-4 shadow-lg border border-gray-700">
                            <div className="flex items-center mb-2 bg-gray-800 rounded-t-lg p-2 -mt-4 -mx-4 border-b border-gray-700">
                              <div className="flex space-x-2">
                                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                              </div>
                              <span className="ml-4 text-sm text-gray-400">
                                Code
                              </span>
                              <button
                                onClick={() => handleCopyCode(section.code)}
                                className="ml-auto p-1 text-gray-400 hover:text-white rounded"
                              >
                                Copy Code
                              </button>
                            </div>
                            <pre className="text-sm text-gray-100 overflow-x-auto font-mono">
                              <code>{section.code}</code>
                            </pre>
                          </div>
                          {section.preview && (
                            <div className="mt-4">
                              <h4 className="text-sm font-medium text-gray-500 mb-2">
                                Preview
                              </h4>
                              {section.preview.type === "visual" ? (
                                <div
                                  className="border rounded-lg p-4 bg-white"
                                  dangerouslySetInnerHTML={sanitizeHTML(
                                    section.preview.html ?? ""
                                  )}
                                />
                              ) : (
                                <div className="bg-gray-900 rounded-lg p-4 shadow-lg border border-gray-700">
                                  <div className="flex items-center mb-2 bg-gray-800 rounded-t-lg p-2 -mt-4 -mx-4 border-b border-gray-700">
                                    <div className="flex space-x-2">
                                      <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                                      <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                                    </div>
                                    <span className="ml-4 text-sm text-gray-400">
                                      Output
                                    </span>
                                  </div>
                                  <pre className="text-sm text-green-400 font-mono">
                                    {section.preview.output}
                                  </pre>
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      )}
                    </section>
                  );
                })}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
