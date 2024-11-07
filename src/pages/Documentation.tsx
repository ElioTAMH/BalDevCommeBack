import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ChevronRight, BookOpen } from 'lucide-react';
import Sidebar from '../components/Sidebar';
import { documentationData } from '../data/documentation';

interface Section {
  title: string;
  content: string;
  code?: string;
}

interface DocContent {
  title: string;
  sections: Section[];
}

interface DocData {
  [key: string]: DocContent;
}

export default function Documentation() {
  const { category } = useParams<{ category?: string }>();
  const currentDocs = category ? (documentationData as DocData)[category] : documentationData.javascript;

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 p-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center space-x-2 text-sm text-gray-500 mb-8">
            <Link to="/" className="hover:text-gray-900">Home</Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-gray-900">Documentation</span>
          </div>

          <div className="prose prose-indigo max-w-none">
            <h1 className="flex items-center space-x-3 text-4xl font-bold text-gray-900">
              <BookOpen className="h-8 w-8 text-indigo-600" />
              <span>{currentDocs.title}</span>
            </h1>

            <div className="mt-8 space-y-12">
              {currentDocs.sections.map((section: Section, index: number) => (
                <section key={index} className="bg-white rounded-lg shadow-sm p-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">{section.title}</h2>
                  <div className="prose prose-indigo max-w-none"
                    dangerouslySetInnerHTML={{ __html: section.content }} />

                  {section.code && (
                    <div className="mt-4">
                      <div className="bg-gray-800 rounded-lg p-4">
                        <pre className="text-sm text-gray-100">
                          <code>{section.code}</code>
                        </pre>
                      </div>
                    </div>
                  )}
                </section>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}