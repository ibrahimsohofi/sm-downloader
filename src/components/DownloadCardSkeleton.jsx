import React, { useContext } from "react";
import { ThemeContext } from '../App';

function DownloadCardSkeleton() {
  const { darkMode } = useContext(ThemeContext);

  const bgClass = darkMode ? 'bg-gray-700' : 'bg-gray-300';
  const cardBgClass = darkMode ? 'bg-gray-800' : 'bg-white';

  return (
    <div className="w-full mx-auto max-w-6xl p-2 sm:p-3 md:p-4 mt-4 animate-pulse">
      <div className={`${cardBgClass} rounded-lg shadow-md p-3 sm:p-4 md:p-6 flex flex-col md:flex-row transition-colors duration-300`}>
        {/* Thumbnail skeleton */}
        <div className="w-full md:w-2/5 h-48 md:h-64 rounded-md mb-4 md:mb-0 overflow-hidden">
          <div className={`w-full h-full ${bgClass} rounded-md`}></div>
        </div>

        {/* Content skeleton */}
        <div className="md:w-3/5 md:pl-4 md:pl-6 flex flex-col">
          {/* Title skeleton */}
          <div className={`h-6 sm:h-7 md:h-8 ${bgClass} rounded-md w-3/4 mb-4`}></div>

          {/* Author info skeleton */}
          <div className="flex items-center mb-3 md:mb-4">
            <div className={`w-8 h-8 md:w-12 md:h-12 ${bgClass} rounded-full mr-3`}></div>
            <div className={`h-4 md:h-5 ${bgClass} rounded-md w-1/3`}></div>
          </div>

          {/* Duration skeleton */}
          <div className="flex items-center mb-3 md:mb-4">
            <div className={`w-5 h-5 md:w-6 md:h-6 ${bgClass} rounded-md mr-2`}></div>
            <div className={`h-4 md:h-4 ${bgClass} rounded-md w-1/4`}></div>
          </div>

          {/* Tab buttons skeleton */}
          <div className="flex gap-2 md:gap-4 mb-3 md:mb-4">
            <div className={`h-8 md:h-10 ${bgClass} rounded-md w-1/4`}></div>
            <div className={`h-8 md:h-10 ${bgClass} rounded-md w-1/4`}></div>
          </div>

          {/* Options skeleton */}
          <div className="space-y-2 md:space-y-3 mt-1 md:mt-2">
            <div className={`h-10 md:h-12 ${bgClass} rounded-md w-full`}></div>
            <div className={`h-10 md:h-12 ${bgClass} rounded-md w-full`}></div>
            <div className={`h-10 md:h-12 ${bgClass} rounded-md w-full`}></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DownloadCardSkeleton;
