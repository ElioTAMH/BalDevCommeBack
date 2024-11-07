import React from 'react';
import { useParams } from 'react-router-dom';

export default function Guide() {
  const { slug } = useParams();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-gray-900">Guide: {slug}</h1>
      <div className="mt-6 prose prose-indigo">
        <p>This guide is coming soon...</p>
      </div>
    </div>
  );
}