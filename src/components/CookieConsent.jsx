import { useState, useEffect, useContext } from 'react';
import { ThemeContext } from '../App';

const CookieConsent = () => {
  const [showConsent, setShowConsent] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);
  const { darkMode } = useContext(ThemeContext);

  const [cookiePreferences, setCookiePreferences] = useState({
    necessary: true, // Always true, can't be changed
    analytics: true,
    marketing: false,
    preferences: true
  });

  useEffect(() => {
    // Check if user has already given consent
    const hasConsent = localStorage.getItem('cookieConsent');

    if (!hasConsent) {
      // If no consent is found, show the banner after a delay
      const timer = setTimeout(() => {
        setShowConsent(true);
      }, 1500);

      return () => clearTimeout(timer);
    } else {
      // If consent exists, parse it
      try {
        const savedPreferences = JSON.parse(hasConsent);
        setCookiePreferences(savedPreferences);
      } catch (e) {
        console.error('Error parsing cookie preferences:', e);
      }
    }
  }, []);

  const handleAcceptAll = () => {
    const allAccepted = {
      necessary: true,
      analytics: true,
      marketing: true,
      preferences: true
    };

    setCookiePreferences(allAccepted);
    localStorage.setItem('cookieConsent', JSON.stringify(allAccepted));
    setShowConsent(false);
  };

  const handleSavePreferences = () => {
    localStorage.setItem('cookieConsent', JSON.stringify(cookiePreferences));
    setShowConsent(false);
    setShowPreferences(false);
  };

  const handleRejectNonEssential = () => {
    const minimalConsent = {
      necessary: true,
      analytics: false,
      marketing: false,
      preferences: false
    };

    setCookiePreferences(minimalConsent);
    localStorage.setItem('cookieConsent', JSON.stringify(minimalConsent));
    setShowConsent(false);
  };

  const togglePreference = (key) => {
    // Don't allow toggling necessary cookies
    if (key === 'necessary') return;

    setCookiePreferences(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  if (!showConsent) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center px-4 py-6 pointer-events-none sm:p-6">
      <div className={`w-full max-w-xl pointer-events-auto ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'} rounded-lg shadow-xl`}>
        {showPreferences ? (
          <div className="p-6">
            <div className="flex items-start justify-between">
              <h3 className="text-lg font-medium">Cookie Preferences</h3>
              <button
                onClick={() => setShowPreferences(false)}
                className="text-gray-400 hover:text-gray-500 focus:outline-none"
              >
                <span className="sr-only">Close</span>
                <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="mt-4 space-y-4">
              {/* Necessary Cookies - Always enabled */}
              <div className={`p-4 rounded-md ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="necessary"
                      name="necessary"
                      type="checkbox"
                      checked={cookiePreferences.necessary}
                      disabled
                      className="h-4 w-4 text-orange-600 border-gray-300 rounded focus:ring-orange-500"
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="necessary" className="font-medium">Necessary Cookies</label>
                    <p className={`mt-1 ${darkMode ? 'text-gray-300' : 'text-gray-500'}`}>
                      These cookies are essential for the website to function properly.
                    </p>
                  </div>
                </div>
              </div>

              {/* Analytics Cookies */}
              <div className={`p-4 rounded-md ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="analytics"
                      name="analytics"
                      type="checkbox"
                      checked={cookiePreferences.analytics}
                      onChange={() => togglePreference('analytics')}
                      className="h-4 w-4 text-orange-600 border-gray-300 rounded focus:ring-orange-500"
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="analytics" className="font-medium">Analytics Cookies</label>
                    <p className={`mt-1 ${darkMode ? 'text-gray-300' : 'text-gray-500'}`}>
                      These cookies allow us to count visits and traffic sources, so we can measure and improve the performance of our site.
                    </p>
                  </div>
                </div>
              </div>

              {/* Marketing Cookies */}
              <div className={`p-4 rounded-md ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="marketing"
                      name="marketing"
                      type="checkbox"
                      checked={cookiePreferences.marketing}
                      onChange={() => togglePreference('marketing')}
                      className="h-4 w-4 text-orange-600 border-gray-300 rounded focus:ring-orange-500"
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="marketing" className="font-medium">Marketing Cookies</label>
                    <p className={`mt-1 ${darkMode ? 'text-gray-300' : 'text-gray-500'}`}>
                      These cookies help us show you relevant advertisements and promotions.
                    </p>
                  </div>
                </div>
              </div>

              {/* Preferences Cookies */}
              <div className={`p-4 rounded-md ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="preferences"
                      name="preferences"
                      type="checkbox"
                      checked={cookiePreferences.preferences}
                      onChange={() => togglePreference('preferences')}
                      className="h-4 w-4 text-orange-600 border-gray-300 rounded focus:ring-orange-500"
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="preferences" className="font-medium">Preference Cookies</label>
                    <p className={`mt-1 ${darkMode ? 'text-gray-300' : 'text-gray-500'}`}>
                      These cookies remember your preferences like dark mode and download history.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 flex justify-end space-x-3">
              <button
                type="button"
                onClick={handleRejectNonEssential}
                className={`py-2 px-4 rounded-md text-sm font-medium ${
                  darkMode
                    ? 'bg-gray-600 text-white hover:bg-gray-500'
                    : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                }`}
              >
                Reject All
              </button>
              <button
                type="button"
                onClick={handleSavePreferences}
                className="py-2 px-4 bg-orange-600 hover:bg-orange-700 text-white rounded-md text-sm font-medium"
              >
                Save Preferences
              </button>
            </div>
          </div>
        ) : (
          <div className="p-6">
            <div className="sm:flex sm:items-start">
              <div className={`mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full ${darkMode ? 'bg-gray-700' : 'bg-orange-100'} sm:mx-0 sm:h-10 sm:w-10`}>
                <svg className="h-6 w-6 text-orange-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                <h3 className="text-lg leading-6 font-medium">Cookie Notice</h3>
                <div className="mt-2">
                  <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-500'}`}>
                    We use cookies to enhance your browsing experience, serve personalized ads or content, and analyze our traffic. By clicking "Accept All", you consent to our use of cookies.
                  </p>
                </div>
              </div>
            </div>
            <div className="mt-5 sm:mt-4 flex flex-col sm:flex-row-reverse gap-2">
              <button
                type="button"
                onClick={handleAcceptAll}
                className="w-full sm:w-auto py-2 px-4 bg-orange-600 hover:bg-orange-700 text-white rounded-md text-sm font-medium"
              >
                Accept All
              </button>
              <button
                type="button"
                onClick={() => setShowPreferences(true)}
                className={`w-full sm:w-auto py-2 px-4 rounded-md text-sm font-medium ${
                  darkMode
                    ? 'bg-gray-700 text-white hover:bg-gray-600'
                    : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                }`}
              >
                Customize
              </button>
              <button
                type="button"
                onClick={handleRejectNonEssential}
                className={`w-full sm:w-auto py-2 px-4 rounded-md text-sm font-medium ${
                  darkMode
                    ? 'bg-gray-700 text-white hover:bg-gray-600'
                    : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                }`}
              >
                Necessary Only
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CookieConsent;
