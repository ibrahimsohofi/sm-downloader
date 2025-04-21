import React, { useContext } from 'react';
import DownloadSection from '../components/DownloadSection';
import HowToUse from '../components/HowToUse';
import Features from '../components/Features';
import Testimonials from '../components/Testimonials';
import { ThemeContext, LanguageContext } from '../App';
import { getTranslation, renderTranslation } from '../utils/translations';

function Home() {
  const { darkMode } = useContext(ThemeContext);
  const { language } = useContext(LanguageContext);

  // Get translations
  const t = (key) => getTranslation(key, language);

  return (
    <div className="py-4">
      <header id="download-section" className="w-full h-auto min-h-[50vh] flex flex-col items-center justify-start">
        <DownloadSection />
      </header>

      <Features />

      <section className={`w-full py-16 ${darkMode ? 'bg-gradient-to-br from-gray-900 to-gray-800' : 'bg-gradient-to-br from-orange-50 to-orange-100'} transition-colors duration-300`}>
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4">
              <span className="text-orange-500">1,000,000+</span> {t('downloads')}
            </h2>
            <p className={`text-sm md:text-base max-w-2xl mx-auto ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              {t('joinCommunity')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div className={`p-6 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-md animate-slide-up`}>
              <div className="text-3xl md:text-4xl font-bold text-orange-500 mb-2">1,000+</div>
              <p className={`${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>{t('supportedSites')}</p>
            </div>
            <div className={`p-6 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-md animate-slide-up stagger-1`}>
              <div className="text-3xl md:text-4xl font-bold text-orange-500 mb-2">50+</div>
              <p className={`${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>{t('outputFormats')}</p>
            </div>
            <div className={`p-6 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-md animate-slide-up stagger-2`}>
              <div className="text-3xl md:text-4xl font-bold text-orange-500 mb-2">24/7</div>
              <p className={`${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>{t('customerSupport')}</p>
            </div>
          </div>
        </div>
      </section>

      <main className="flex flex-col items-center h-full w-full">
        <HowToUse />
      </main>

      <Testimonials />

      <section className={`w-full py-16 ${darkMode ? 'bg-gray-800' : 'bg-gray-100'} transition-colors duration-300`}>
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-6" dangerouslySetInnerHTML={renderTranslation('readyToDownload', language)} />
          <p className={`text-sm md:text-base max-w-2xl mx-auto mb-8 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            {t('startDownloading')}
          </p>
          <a
            href="#download-section"
            className="inline-block px-8 py-4 text-lg text-white font-medium rounded-md bg-orange-500 hover:bg-orange-600 transition-colors duration-300 animate-pulse-slow"
          >
            {t('getStartedNow')}
          </a>
        </div>
      </section>

      {/* Affiliate Section */}
      <section className={`w-full py-12 ${darkMode ? 'bg-gray-900' : 'bg-white'}`}>
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">
            {t('affiliateTitle')}
          </h2>
          <p className="text-center mb-8 max-w-2xl mx-auto">
            {t('affiliateDesc')}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className={`p-6 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-gray-100'} hover:shadow-lg transition-all duration-300`}>
              <h3 className="text-xl font-bold mb-2">Premium VPN Service</h3>
              <p className="text-sm mb-4">Securely download videos and protect your privacy with this trusted VPN service.</p>
              <a href="#" className="text-orange-500 font-medium hover:underline">Learn More →</a>
            </div>
            <div className={`p-6 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-gray-100'} hover:shadow-lg transition-all duration-300`}>
              <h3 className="text-xl font-bold mb-2">Video Editing Software</h3>
              <p className="text-sm mb-4">Edit your downloaded videos with this easy-to-use professional video editor.</p>
              <a href="#" className="text-orange-500 font-medium hover:underline">Learn More →</a>
            </div>
            <div className={`p-6 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-gray-100'} hover:shadow-lg transition-all duration-300`}>
              <h3 className="text-xl font-bold mb-2">Cloud Storage</h3>
              <p className="text-sm mb-4">Store your downloaded videos safely with 2TB of encrypted cloud storage.</p>
              <a href="#" className="text-orange-500 font-medium hover:underline">Learn More →</a>
            </div>
          </div>
        </div>
      </section>

      {/* Donation Section */}
      <section className={`w-full py-10 ${darkMode ? 'bg-gray-800' : 'bg-orange-50'}`}>
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold mb-4">{t('supportUs')}</h2>
          <p className="mb-6 max-w-lg mx-auto">{t('donateDesc')}</p>
          <a
            href="https://www.buymeacoffee.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-6 py-3 bg-yellow-500 text-white font-medium rounded-lg hover:bg-yellow-600 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
            </svg>
            {t('buyMeCoffee')}
          </a>
        </div>
      </section>
    </div>
  );
}

export default Home;
