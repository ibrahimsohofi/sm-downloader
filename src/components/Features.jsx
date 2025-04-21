import { useContext } from 'react';
import { ThemeContext } from '../App';

function Features() {
  const { darkMode } = useContext(ThemeContext);

  const features = [
    {
      title: "High-Quality Downloads",
      description: "Get the highest quality videos with our advanced download technology supporting up to 8K resolution.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      )
    },
    {
      title: "Fast Conversion",
      description: "Convert videos to any format in seconds with our lightning-fast cloud-based conversion engine.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      )
    },
    {
      title: "Multi-Platform Support",
      description: "Download from YouTube, Facebook, Instagram, Twitter, TikTok, and 1000+ other sites.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
        </svg>
      )
    },
    {
      title: "Bulk Downloads",
      description: "Save time by downloading multiple videos at once with our batch processing feature.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
        </svg>
      )
    },
    {
      title: "Audio Extraction",
      description: "Extract high-quality audio from any video and save it in MP3, AAC, WAV, or FLAC format.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
        </svg>
      )
    },
    {
      title: "No Registration Required",
      description: "Start downloading immediately - no signup, no credit card, no hassle.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
      )
    }
  ];

  return (
    <section className={`w-full py-16 ${darkMode ? 'bg-gray-900' : 'bg-white'} transition-colors duration-300`} id="features">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4">
            Why Choose <span className="text-orange-500">MS Downloader</span>
          </h2>
          <p className={`text-sm md:text-base max-w-2xl mx-auto ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Powerful features designed to make downloading and converting videos simple and efficient.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              feature={feature}
              darkMode={darkMode}
              delay={index % 3}
            />
          ))}
        </div>

        <div className="mt-16 text-center">
          <a
            href="#download-section"
            className={`inline-block px-6 py-3 text-white font-medium rounded-md transition-colors duration-300 bg-orange-500 hover:bg-orange-600`}
          >
            Start Downloading Now
          </a>
          <p className={`mt-4 text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            No registration or software installation required
          </p>
        </div>
      </div>
    </section>
  );
}

function FeatureCard({ feature, darkMode, delay }) {
  const { title, description, icon } = feature;

  return (
    <div
      className={`p-6 rounded-lg ${darkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-gray-50 hover:bg-gray-100'} transition-all duration-300 animate-slide-up stagger-${delay} transform hover:-translate-y-1 hover:shadow-lg`}
    >
      <div className={`mb-4 ${darkMode ? 'text-orange-400' : 'text-orange-500'}`}>
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'} text-sm md:text-base`}>
        {description}
      </p>
    </div>
  );
}

export default Features;
