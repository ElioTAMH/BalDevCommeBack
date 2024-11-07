import React from 'react';

export default function LatestContributions() {
  const contributions = [
    {
      title: 'CSS Grid Layout Guide',
      author: 'Sarah Chen',
      date: '2 hours ago',
      category: 'CSS',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150'
    },
    {
      title: 'JavaScript Promises Deep Dive',
      author: 'Michael Rodriguez',
      date: '5 hours ago',
      category: 'JavaScript',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150'
    },
    {
      title: 'HTML Semantic Elements',
      author: 'Emma Wilson',
      date: '1 day ago',
      category: 'HTML',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150'
    }
  ];

  return (
    <div className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">Latest Contributions</h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {contributions.map((contribution, index) => (
            <div key={index} className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow">
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <img
                    src={contribution.avatar}
                    alt={contribution.author}
                    className="h-10 w-10 rounded-full object-cover"
                  />
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-900">{contribution.author}</p>
                    <p className="text-sm text-gray-500">{contribution.date}</p>
                  </div>
                </div>
                <div>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                    {contribution.category}
                  </span>
                  <h3 className="mt-2 text-lg font-medium text-gray-900">{contribution.title}</h3>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}