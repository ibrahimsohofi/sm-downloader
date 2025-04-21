import { useState, useContext, useRef, useEffect } from 'react';
import { LanguageContext } from '../App';
import { availableLanguages } from '../utils/translations';
import { trackEvent } from '../utils/analytics';

const LanguageSelector = () => {
  const { language, setLanguage } = useContext(LanguageContext);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleLanguageChange = (langCode) => {
    if (language !== langCode) {
      setLanguage(langCode);
      trackEvent('User Preference', 'Language Change', langCode);
    }
    setIsOpen(false);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  // Get the current language display name
  const currentLanguage = availableLanguages.find(lang => lang.code === language);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        className="flex items-center px-3 py-2 text-sm font-medium rounded-md focus:outline-none transition-colors duration-200 hover:bg-gray-200 dark:hover:bg-gray-700"
        onClick={toggleDropdown}
      >
        <span className="mr-1">{currentLanguage?.name || 'English'}</span>
        <svg
          className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'transform rotate-180' : ''}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-40 rounded-md shadow-lg z-50">
          <div className="rounded-md ring-1 ring-black ring-opacity-5 py-1 bg-white dark:bg-gray-800">
            {availableLanguages.map((lang) => (
              <button
                key={lang.code}
                className={`block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 ${
                  language === lang.code
                    ? 'bg-gray-100 dark:bg-gray-700 text-orange-500 font-medium'
                    : 'text-gray-700 dark:text-gray-200'
                }`}
                onClick={() => handleLanguageChange(lang.code)}
              >
                {lang.name}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default LanguageSelector;
