import { useState, useEffect, useContext } from 'react';
import { ThemeContext } from '../App';

const InstallPWA = () => {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [isInstallable, setIsInstallable] = useState(false);
  const [showBanner, setShowBanner] = useState(false);
  const [installStatus, setInstallStatus] = useState('idle'); // idle, installing, installed, error
  const { darkMode } = useContext(ThemeContext);

  useEffect(() => {
    // Check if the app is already installed
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches
      || window.navigator.standalone // For iOS
      || document.referrer.includes('android-app://');

    if (isStandalone) {
      return; // App is already installed, don't show the banner
    }

    const handleBeforeInstallPrompt = (e) => {
      // Prevent Chrome 76+ from automatically showing the prompt
      e.preventDefault();
      // Stash the event so it can be triggered later
      setDeferredPrompt(e);
      setIsInstallable(true);

      // Show the install banner after a delay
      setTimeout(() => {
        setShowBanner(true);
      }, 3000);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    // Check if app was successfully installed
    window.addEventListener('appinstalled', () => {
      setInstallStatus('installed');
      setShowBanner(true);

      // After 3 seconds, hide the success message
      setTimeout(() => {
        setShowBanner(false);
      }, 3000);

      // Clear the deferredPrompt
      setDeferredPrompt(null);
      setIsInstallable(false);

      // Log analytics event
      console.log('PWA was installed');
    });

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', () => {});
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) {
      setInstallStatus('error');
      return;
    }

    setInstallStatus('installing');

    // Show the install prompt
    deferredPrompt.prompt();

    // Wait for the user to respond to the prompt
    try {
      const choiceResult = await deferredPrompt.userChoice;

      if (choiceResult.outcome === 'accepted') {
        console.log('User accepted the install prompt');
        setInstallStatus('installed');
      } else {
        console.log('User dismissed the install prompt');
        setInstallStatus('idle');
        // Hide the banner after a delay if user dismisses
        setTimeout(() => {
          setShowBanner(false);
        }, 1000);
      }
    } catch (error) {
      console.error('Error during installation:', error);
      setInstallStatus('error');
    }

    // We no longer need the prompt. Clear it up.
    setDeferredPrompt(null);
  };

  const handleClose = () => {
    setShowBanner(false);
    // Save to localStorage to remember user preference
    localStorage.setItem('pwaInstallDismissed', 'true');
  };

  // Don't show anything if not installable or banner should be hidden
  if (!showBanner) return null;

  return (
    <div className={`fixed bottom-0 inset-x-0 pb-2 sm:pb-5 z-40 ${
      installStatus === 'installed'
        ? (darkMode ? 'bg-green-900 bg-opacity-90' : 'bg-green-50 bg-opacity-95')
        : installStatus === 'error'
          ? (darkMode ? 'bg-red-900 bg-opacity-90' : 'bg-red-50 bg-opacity-95')
          : (darkMode ? 'bg-blue-900 bg-opacity-90' : 'bg-blue-50 bg-opacity-95')
    } transition-all duration-300 animate-slide-up`}>
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <div className="p-2 rounded-lg shadow-lg sm:p-3 sm:flex sm:items-center sm:justify-between">
          <div className="flex items-center">
            <span className={`flex p-2 rounded-lg ${
              installStatus === 'installed'
                ? (darkMode ? 'bg-green-800' : 'bg-green-200')
                : installStatus === 'error'
                  ? (darkMode ? 'bg-red-800' : 'bg-red-200')
                  : (darkMode ? 'bg-blue-800' : 'bg-blue-200')
            }`}>
              {installStatus === 'installed' ? (
                <svg className="h-6 w-6 text-green-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              ) : installStatus === 'error' ? (
                <svg className="h-6 w-6 text-red-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              ) : (
                <svg className="h-6 w-6 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              )}
            </span>
            <div className="ml-3 sm:flex-1">
              <p className={`text-sm font-medium ${
                installStatus === 'installed'
                  ? (darkMode ? 'text-green-50' : 'text-green-800')
                  : installStatus === 'error'
                    ? (darkMode ? 'text-red-50' : 'text-red-800')
                    : (darkMode ? 'text-blue-50' : 'text-blue-800')
              }`}>
                {installStatus === 'installed'
                  ? "App successfully installed! You can now access it from your home screen."
                  : installStatus === 'error'
                    ? "There was an error installing the app. Please try again later."
                    : "Install MS Downloader on your device for faster access and offline capabilities!"}
              </p>
            </div>
          </div>

          {installStatus !== 'installed' && installStatus !== 'error' && (
            <div className="mt-2 flex-shrink-0 sm:mt-0 sm:ml-4">
              <button
                type="button"
                onClick={handleInstallClick}
                disabled={installStatus === 'installing'}
                className={`w-full sm:w-auto font-medium px-4 py-2 rounded-md shadow-sm text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                  installStatus === 'installing'
                    ? 'bg-gray-500 text-white cursor-not-allowed'
                    : 'bg-orange-600 text-white hover:bg-orange-700 focus:ring-orange-500'
                } transition-colors duration-300`}
              >
                {installStatus === 'installing' ? 'Installing...' : 'Install App'}
              </button>
            </div>
          )}

          <div className="mt-2 flex-shrink-0 sm:mt-0 sm:ml-2">
            <button
              type="button"
              onClick={handleClose}
              className={`flex p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors duration-300`}
            >
              <span className="sr-only">Dismiss</span>
              <svg className={`h-6 w-6 ${
                darkMode ? 'text-gray-300' : 'text-gray-600'
              }`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstallPWA;
