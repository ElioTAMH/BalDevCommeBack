import React from 'react';
import { Book, Code2, Users } from 'lucide-react';

export default function Features() {
  const features = [
    {
      icon: <Book className="h-6 w-6 text-white" />,
      title: 'Comprehensive Documentation',
      description: 'Detailed guides and references for HTML, CSS, JavaScript, and more.'
    },
    {
      icon: <Users className="h-6 w-6 text-white" />,
      title: 'Community Driven',
      description: 'Content created and verified by developers like you.'
    },
    {
      icon: <Code2 className="h-6 w-6 text-white" />,
      title: 'Live Examples',
      description: 'Interactive code examples to help you learn faster.'
    }
  ];

  return (
    <div className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {features.map((feature, index) => (
            <div key={index} className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-indigo-700 rounded-lg transform transition-transform group-hover:scale-105" />
              <div className="relative p-6 bg-white rounded-lg border border-gray-200 transform transition-transform group-hover:-translate-y-1 group-hover:shadow-xl">
                <div className="w-12 h-12 rounded-full bg-indigo-600 flex items-center justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-medium text-gray-900">{feature.title}</h3>
                <p className="mt-2 text-gray-500">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}