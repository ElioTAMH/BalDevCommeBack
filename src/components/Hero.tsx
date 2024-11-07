import React from 'react';
import { Search } from 'lucide-react';

export default function Hero() {
  return (
    <div className="relative overflow-hidden bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="relative z-10 pb-8 sm:pb-16 md:pb-20 lg:pb-28 xl:pb-32">
          <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
            <div className="text-center">
              <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                <span className="block">Web Development Documentation</span>
                <span className="block text-indigo-600">By the Community, For the Community</span>
              </h1>
              <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl">
                Discover, contribute, and learn from the collective knowledge of developers worldwide.
              </p>
              <div className="mt-8 flex justify-center">
                <div className="relative rounded-full w-full max-w-lg">
                  <input
                    type="text"
                    placeholder="Search documentation..."
                    className="w-full px-6 py-3 rounded-full border-2 border-gray-300 focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
                  />
                  <Search className="absolute right-4 top-3.5 h-5 w-5 text-gray-400" />
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}