import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { ThemeContext, LanguageContext } from '../App';
import LanguageSelector from './LanguageSelector';
import { getTranslation } from '../utils/translations';

function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { darkMode, toggleDarkMode } = useContext(ThemeContext);
  const { language } = useContext(LanguageContext);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Get translated navigation items
  const t = (key) => getTranslation(key, language);

  return (
    <nav className={`h-16 ${darkMode ? 'bg-gray-800 bg-opacity-95' : 'bg-gray-400 bg-opacity-90'} w-full flex items-center justify-between shadow-md sticky top-0 z-50 transition-colors duration-300`}>
      <div className="flex items-center">
        {/* Site Logo */}
        <div className="site-logo px-4 py-1 h-full flex items-center">
          <Link to="/">
            <img className="h-10 w-auto" src="/logo512.png" alt="Site Logo" />
          </Link>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:block">
          <div className="site-nav">
            <ul className={`navbar ${darkMode ? 'text-white' : 'text-gray-950'} text-xl font-bold flex h-16 items-center justify-center`}>
              <li className="nav-item">
                <Link to="/">{t('home')}</Link>
              </li>
              <li className="nav-item">
                <Link to="/downloader">{t('downloader')}</Link>
              </li>
              <li className="nav-item">
                <Link to="/batch">{t('batchTitle')}</Link>
              </li>
              <li className="nav-item">
                <Link to="/converter">{t('converter')}</Link>
              </li>
              <li className="nav-item">
                <Link to="/about">{t('about')}</Link>
              </li>
              <li className="nav-item">
                <Link to="/faq">{t('faq')}</Link>
              </li>
              <li className="nav-item">
                <Link to="/contact">{t('contact')}</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="flex items-center">
        {/* Language Selector (visible on all screen sizes) */}
        <LanguageSelector />

        {/* Dark Mode Toggle (visible on all screen sizes) */}
        <button
          onClick={toggleDarkMode}
          className="p-2 mr-4 focus:outline-none transition-transform duration-300 hover:rotate-12"
          aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
        >
          {darkMode ? (
            // Sun icon for light mode
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-yellow-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          ) : (
            // Moon icon for dark mode
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
            </svg>
          )}
        </button>

        {/* Mobile Menu Button */}
        <div className="md:hidden px-4">
          <button
            onClick={toggleMenu}
            className="focus:outline-none"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`h-6 w-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`h-6 w-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className={`md:hidden absolute top-16 left-0 right-0 ${darkMode ? 'bg-gray-800 bg-opacity-95' : 'bg-gray-400 bg-opacity-95'} shadow-md transition-all duration-300`}>
          <ul className="flex flex-col">
            <li className={`border-b ${darkMode ? 'border-gray-700' : 'border-gray-300'}`}>
              <Link
                to="/"
                className={`block py-3 px-4 ${darkMode ? 'text-white hover:bg-gray-700' : 'text-gray-950 hover:bg-gray-800 hover:text-white'} font-semibold`}
                onClick={() => setIsMenuOpen(false)}
              >
                {t('home')}
              </Link>
            </li>
            <li className={`border-b ${darkMode ? 'border-gray-700' : 'border-gray-300'}`}>
              <Link
                to="/downloader"
                className={`block py-3 px-4 ${darkMode ? 'text-white hover:bg-gray-700' : 'text-gray-950 hover:bg-gray-800 hover:text-white'} font-semibold`}
                onClick={() => setIsMenuOpen(false)}
              >
                {t('downloader')}
              </Link>
            </li>
            <li className={`border-b ${darkMode ? 'border-gray-700' : 'border-gray-300'}`}>
              <Link
                to="/batch"
                className={`block py-3 px-4 ${darkMode ? 'text-white hover:bg-gray-700' : 'text-gray-950 hover:bg-gray-800 hover:text-white'} font-semibold`}
                onClick={() => setIsMenuOpen(false)}
              >
                {t('batchTitle')}
              </Link>
            </li>
            <li className={`border-b ${darkMode ? 'border-gray-700' : 'border-gray-300'}`}>
              <Link
                to="/converter"
                className={`block py-3 px-4 ${darkMode ? 'text-white hover:bg-gray-700' : 'text-gray-950 hover:bg-gray-800 hover:text-white'} font-semibold`}
                onClick={() => setIsMenuOpen(false)}
              >
                {t('converter')}
              </Link>
            </li>
            <li className={`border-b ${darkMode ? 'border-gray-700' : 'border-gray-300'}`}>
              <Link
                to="/about"
                className={`block py-3 px-4 ${darkMode ? 'text-white hover:bg-gray-700' : 'text-gray-950 hover:bg-gray-800 hover:text-white'} font-semibold`}
                onClick={() => setIsMenuOpen(false)}
              >
                {t('about')}
              </Link>
            </li>
            <li className={`border-b ${darkMode ? 'border-gray-700' : 'border-gray-300'}`}>
              <Link
                to="/faq"
                className={`block py-3 px-4 ${darkMode ? 'text-white hover:bg-gray-700' : 'text-gray-950 hover:bg-gray-800 hover:text-white'} font-semibold`}
                onClick={() => setIsMenuOpen(false)}
              >
                {t('faq')}
              </Link>
            </li>
            <li>
              <Link
                to="/contact"
                className={`block py-3 px-4 ${darkMode ? 'text-white hover:bg-gray-700' : 'text-gray-950 hover:bg-gray-800 hover:text-white'} font-semibold`}
                onClick={() => setIsMenuOpen(false)}
              >
                {t('contact')}
              </Link>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}

export default NavBar;
