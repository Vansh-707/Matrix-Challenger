import React from 'react';
import Link from 'next/link';

const HomePage = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-6">
          Welcome to the Comment App
        </h1>
        
        <p className="text-lg text-gray-600 mb-8">
          A modern platform for engaging discussions and meaningful conversations.
          Join our community to share your thoughts and connect with others.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-gray-800 mb-3">
              Features
            </h2>
            <ul className="text-gray-600 space-y-2">
              <li>• Nested comment threads</li>
              <li>• Real-time notifications</li>
              <li>• Edit and delete comments</li>
              <li>• Comment restoration</li>
            </ul>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-gray-800 mb-3">
              Getting Started
            </h2>
            <ul className="text-gray-600 space-y-2">
              <li>1. Create an account</li>
              <li>2. Browse existing discussions</li>
              <li>3. Start commenting</li>
              <li>4. Engage with others</li>
            </ul>
          </div>
        </div>

        <div className="space-x-4">
          <Link 
            href="/login" 
            className="btn btn-primary inline-block"
          >
            Get Started
          </Link>
          <Link 
            href="/comments" 
            className="btn btn-secondary inline-block"
          >
            Browse Comments
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomePage;