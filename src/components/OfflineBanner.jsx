import { useState, useEffect, useContext } from 'react';
import { ThemeContext } from '../App';

const OfflineBanner = () => {
  const [isOffline, setIsOffline] = useState(false);
  const [showBanner, setShowBanner] = useState(false);
  const { darkMode } = useContext(ThemeContext);

  // Check online status on mount and set up listeners
  useEffect(() => {
    // Initial check
    setIsOffline(!navigator.onLine);

    const handleOnline = () => {
      setIsOffline(false);
      // Show "back online" message briefly
      setShowBanner(true);
      setTimeout(() => setShowBanner(false), 3000);
    };

    const handleOffline = () => {
      setIsOffline(true);
      setShowBanner(true);
    };

    // Add event listeners
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Clean up
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  if (!showBanner) return null;

  return (
    <div
      className={`fixed top-16 inset-x-0 z-50 p-2 ${
        isOffline
          ? (darkMode ? 'bg-red-900' : 'bg-red-100')
          : (darkMode ? 'bg-green-900' : 'bg-green-100')
      } transition-all duration-300 animate-slide-down`}
    >
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between flex-wrap">
          <div className="w-0 flex-1 flex items-center">
            <span className={`flex p-2 rounded-lg ${
              isOffline
                ? (darkMode ? 'bg-red-800' : 'bg-red-200')
                : (darkMode ? 'bg-green-800' : 'bg-green-200')
            }`}>
              {isOffline ? (
                <svg className="h-5 w-5 text-red-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              ) : (
                <svg className="h-5 w-5 text-green-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              )}
            </span>
            <p className={`ml-3 font-medium truncate ${
              isOffline
                ? (darkMode ? 'text-red-50' : 'text-red-700')
                : (darkMode ? 'text-green-50' : 'text-green-700')
            }`}>
              {isOffline
                ? "You are currently offline. Some features may be unavailable."
                : "You're back online! All features are now available."}
            </p>
          </div>
          <div className="order-2 flex-shrink-0 sm:order-3 sm:ml-2">
            <button
              onClick={() => setShowBanner(false)}
              type="button"
              className={`-mr-1 flex p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-white ${
                isOffline
                  ? (darkMode ? 'hover:bg-red-800' : 'hover:bg-red-200')
                  : (darkMode ? 'hover:bg-green-800' : 'hover:bg-green-200')
              }`}
            >
              <span className="sr-only">Dismiss</span>
              <svg
                className={`h-5 w-5 ${
                  isOffline
                    ? (darkMode ? 'text-red-50' : 'text-red-500')
                    : (darkMode ? 'text-green-50' : 'text-green-500')
                }`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OfflineBanner;
