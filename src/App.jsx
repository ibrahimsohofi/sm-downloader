import { Routes, Route, BrowserRouter, useLocation } from 'react-router-dom';
import { useState, createContext, useEffect, lazy, Suspense } from 'react';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import { trackPageView, trackEvent } from './utils/analytics';
import './index.css';

// Lazy load components
const Home = lazy(() => import('./pages/Home'));
const Downloader = lazy(() => import('./pages/Downloader'));
const Converter = lazy(() => import('./pages/Converter'));
const BatchPage = lazy(() => import('./pages/BatchPage'));
const About = lazy(() => import('./pages/About'));
const Faq = lazy(() => import('./pages/Faq'));
const Contact = lazy(() => import('./pages/Contact'));
const Terms = lazy(() => import('./pages/Terms'));
const Privacy = lazy(() => import('./pages/Privacy'));
const InstallPWA = lazy(() => import('./components/InstallPWA'));
const CookieConsent = lazy(() => import('./components/CookieConsent'));
const OfflineBanner = lazy(() => import('./components/OfflineBanner'));
const FeedbackSurvey = lazy(() => import('./components/FeedbackSurvey'));

// Loading component for Suspense fallback
const LoadingSpinner = () => (
  <div className="flex justify-center items-center h-64">
    <div className="spinner"></div>
    <span className="ml-2 text-gray-600 dark:text-gray-300">Loading...</span>
  </div>
);

// Create a context for dark mode
export const ThemeContext = createContext({
  darkMode: false,
  toggleDarkMode: () => {},
});

// Create a context for language
export const LanguageContext = createContext({
  language: 'en',
  setLanguage: () => {},
});

// PageTracker component to handle route changes for analytics
function PageTracker() {
  const location = useLocation();

  useEffect(() => {
    // Extract page name from location
    const pageName = location.pathname === '/'
      ? 'Home'
      : location.pathname.charAt(1).toUpperCase() + location.pathname.slice(2);

    // Track page view
    trackPageView(pageName);
  }, [location]);

  return null;
}

function App() {
  // Check the user's preference or saved setting
  const getInitialDarkMode = () => {
    // Check localStorage first
    const savedMode = localStorage.getItem('darkMode');
    if (savedMode !== null) {
      return savedMode === 'true';
    }

    // If not found in localStorage, check system preference
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  };

  const [darkMode, setDarkMode] = useState(getInitialDarkMode);
  const [language, setLanguage] = useState(() => {
    const savedLang = localStorage.getItem('language');
    return savedLang || 'en'; // Default to English
  });
  const [showFeedback, setShowFeedback] = useState(false);

  // Toggle dark mode
  const toggleDarkMode = () => {
    setDarkMode(prevMode => {
      const newMode = !prevMode;
      // Track theme change event
      trackEvent('User Preference', 'Toggle Theme', newMode ? 'Dark' : 'Light');
      return newMode;
    });
  };

  // Update document when dark mode changes
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }

    // Save in localStorage
    localStorage.setItem('darkMode', darkMode);
  }, [darkMode]);

  // Update document language attribute and save preference
  useEffect(() => {
    document.documentElement.lang = language;
    localStorage.setItem('language', language);
    trackEvent('User Preference', 'Language Change', language);
  }, [language]);

  // Track app initialization and online/offline events
  useEffect(() => {
    trackEvent('App', 'Initialize', `Dark Mode: ${darkMode}`);

    // Handle online/offline status change
    const handleOnline = () => trackEvent('System', 'Connection', 'Online');
    const handleOffline = () => trackEvent('System', 'Connection', 'Offline');

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Show feedback form after a delay
    const feedbackTimer = setTimeout(() => {
      setShowFeedback(true);
    }, 5 * 60 * 1000); // 5 minutes

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
      clearTimeout(feedbackTimer);
    };
  }, []);

  return (
    <ThemeContext.Provider value={{ darkMode, toggleDarkMode }}>
      <LanguageContext.Provider value={{ language, setLanguage }}>
        <div className={`min-h-screen flex flex-col ${darkMode ? 'dark bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'} transition-colors duration-300`}>
          <BrowserRouter>
            <PageTracker />
            <NavBar />
            <Suspense fallback={<LoadingSpinner />}>
              <OfflineBanner />
              <main className="flex-grow">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/downloader" element={<Downloader />} />
                  <Route path="/converter" element={<Converter />} />
                  <Route path="/batch" element={<BatchPage />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/faq" element={<Faq />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/terms" element={<Terms />} />
                  <Route path="/privacy" element={<Privacy />} />
                </Routes>
              </main>
              <InstallPWA />
              <CookieConsent />
              {showFeedback && <FeedbackSurvey onClose={() => setShowFeedback(false)} />}
            </Suspense>
            <Footer />
          </BrowserRouter>
        </div>
      </LanguageContext.Provider>
    </ThemeContext.Provider>
  );
}

export default App;
