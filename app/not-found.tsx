'use client';

import React from 'react';
import Link from 'next/link';
import Lottie from 'lottie-react';
import notFoundAnimation from '@/public/Animation - 1750413481486.json';

export default function NotFoundPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white dark:bg-neutral-900 p-4">
      <div className="w-80 h-80">
        <Lottie animationData={notFoundAnimation} loop={true} />
      </div>
      <h1 className="text-2xl font-bold text-gray-800 dark:text-white mt-4">Oops! Page not found</h1>
      <p className="text-gray-600 dark:text-gray-400 mt-2 text-center max-w-sm">
         {/* fixed eslint error replaces ' with &#39;' */}
        The page you&#39;re looking for doesn&#39;t exist or has been moved.
     </p>
      <Link
        href="/"
        className="mt-6 inline-block px-6 py-2 text-sm font-semibold text-white bg-amber-600 rounded hover:bg-amber-500"
      >
        Go Home
      </Link>
    </div>
  );
}
