'use client';

import React from 'react';
import Lottie from 'lottie-react';
import animationData from '@/public/Animation - 1750413152895.json';

export default function LoadingPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-white dark:bg-neutral-900">
      <div className="flex flex-col items-center space-y-4">
        <div className="w-40 h-40">
          <Lottie animationData={animationData} loop={true} />
        </div>
        <p className="text-sm text-gray-600 dark:text-neutral-400">Loading, please wait...</p>
      </div>
    </div>
  );
}