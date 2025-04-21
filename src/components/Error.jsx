import React, { useContext } from "react";
import { ThemeContext } from '../App';

function Error({ error, activeError }) {
  const { darkMode } = useContext(ThemeContext);

  return (
    <div className={`w-full ${darkMode ? 'bg-red-900/60 border-red-800' : 'bg-red-200 border-red-400'} border text-red-100 dark:text-red-100 p-3 sm:p-4 rounded-md flex justify-between items-center transition-colors duration-300`}>
      <div className="text-sm sm:text-base flex-grow pr-2">
        <strong>Error:</strong> {error}
      </div>
      <button
        onClick={activeError}
        className={`${darkMode ? 'bg-red-800/60 hover:bg-red-700/60' : 'bg-red-100 hover:bg-red-300'} px-2 py-1 sm:px-3 sm:py-1 rounded-md transition-colors duration-300 flex-shrink-0`}
        aria-label="Close error message"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  );
}

export default Error;
