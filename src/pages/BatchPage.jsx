import React, { useContext } from 'react';
import { ThemeContext, LanguageContext } from '../App';
import BatchDownloader from '../components/BatchDownloader';
import ShareButtons from '../components/ShareButtons';
import { getTranslation, renderTranslation } from '../utils/translations';

const BatchPage = () => {
  const { darkMode } = useContext(ThemeContext);
  const { language } = useContext(LanguageContext);

  // Translations
  const t = (key) => getTranslation(key, language);

  return (
    <div className="py-6">
      {/* Hero Section */}
      <section className="py-8 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6" dangerouslySetInnerHTML={{ __html: t('batchHeroTitle') }} />
          <p className="text-lg md:text-xl max-w-3xl mx-auto mb-8">
            {t('batchHeroSubtitle')}
          </p>
        </div>
      </section>

      {/* Main Batch Downloader */}
      <section className="py-6">
        <BatchDownloader />
      </section>

      {/* Features Section */}
      <section className={`py-12 ${darkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">
            {t('batchFeatures')}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard
              icon={
                <svg className="w-10 h-10 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                </svg>
              }
              title={t('batchFeature1Title')}
              description={t('batchFeature1Desc')}
              darkMode={darkMode}
            />

            <FeatureCard
              icon={
                <svg className="w-10 h-10 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              }
              title={t('batchFeature2Title')}
              description={t('batchFeature2Desc')}
              darkMode={darkMode}
            />

            <FeatureCard
              icon={
                <svg className="w-10 h-10 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              }
              title={t('batchFeature3Title')}
              description={t('batchFeature3Desc')}
              darkMode={darkMode}
            />
          </div>
        </div>
      </section>

      {/* How to Use Section */}
      <section className="py-12">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">
            {t('batchHowToUse')}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <StepCard
              number="1"
              title={t('batchStep1Title')}
              description={t('batchStep1Desc')}
              darkMode={darkMode}
            />

            <StepCard
              number="2"
              title={t('batchStep2Title')}
              description={t('batchStep2Desc')}
              darkMode={darkMode}
            />

            <StepCard
              number="3"
              title={t('batchStep3Title')}
              description={t('batchStep3Desc')}
              darkMode={darkMode}
            />
          </div>
        </div>
      </section>

      {/* Share Section */}
      <section className={`py-12 ${darkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-2xl font-bold mb-6 text-center">
            {t('shareTitle')}
          </h2>
          <ShareButtons
            title="MS Downloader - Batch Video Downloader"
            description="Download multiple videos at once with this powerful batch downloader tool"
          />
        </div>
      </section>
    </div>
  );
};

// Helper components
const FeatureCard = ({ icon, title, description, darkMode }) => (
  <div className={`p-6 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-white'} shadow-md transition-transform duration-300 hover:shadow-lg hover:-translate-y-1`}>
    <div className="flex flex-col items-center text-center">
      <div className="mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
        {description}
      </p>
    </div>
  </div>
);

const StepCard = ({ number, title, description, darkMode }) => (
  <div className={`relative p-6 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-white'} shadow-md`}>
    <div className="absolute -top-5 -left-5 w-12 h-12 rounded-full bg-orange-500 flex items-center justify-center text-white font-bold text-xl">
      {number}
    </div>
    <div className="mt-4 ml-2">
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
        {description}
      </p>
    </div>
  </div>
);

export default BatchPage;
