import { useState, useContext, useRef } from 'react';
import { ThemeContext, LanguageContext } from '../App';
import { trackEvent, trackDownload } from '../utils/analytics';
import { getTranslation } from '../utils/translations';
import { getLockerUrl, isFormatLocked } from '../utils/cpaConfig';
import ResponsiveImage from './ResponsiveImage';

function DownloadCard({ videoInfo, videoOpt, audioOpt }) {
  const [activeTab, setActiveTab] = useState('video');
  const [hoveredFormat, setHoveredFormat] = useState(null);
  const [downloadProgress, setDownloadProgress] = useState({});
  const [recentDownloads, setRecentDownloads] = useState(() => {
    // Initialize from localStorage if available
    try {
      const stored = localStorage.getItem('recentDownloads');
      return stored ? JSON.parse(stored) : [];
    } catch (e) {
      return [];
    }
  });
  const { darkMode } = useContext(ThemeContext);
  const { language } = useContext(LanguageContext);
  const downloadRef = useRef(null);

  // Get translations
  const t = (key) => getTranslation(key, language);

  const {
    videoTitle,
    videoDuration,
    videoThumbnail,
    videoUrl,
    author,
    authorThumbnail,
    channelUrl
  } = videoInfo;

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    // Track tab change
    trackEvent('UI Interaction', 'Tab Change', tab);
  };

  // Store a download in recent history
  const saveToRecentDownloads = (downloadInfo) => {
    const newDownloads = [
      downloadInfo,
      ...recentDownloads.slice(0, 4) // Keep only the most recent 5 downloads
    ];

    setRecentDownloads(newDownloads);
    localStorage.setItem('recentDownloads', JSON.stringify(newDownloads));
  };

  // Simulate a download with progress
  const simulateDownload = (formatId, format) => {
    // Track download attempt
    const formatType = format.resolution.includes('Audio Only') ? 'Audio' : 'Video';
    const quality = format.videoQuality || format.audioQuality;

    trackEvent('Download', 'Attempt', `${formatType} - ${format.resolution}`);

    // Check if this format uses the locker
    const useLocker = isFormatLocked(formatId);

    // For formats that don't go through the locker, simulate progress
    if (!useLocker) {
      // Show progress for non-CPA downloads
      showDownloadProgress(formatId, format);
    } else {
      // For CPA locked downloads, redirect to locker without showing progress
      // Just mark as completed immediately for the UI
      setDownloadProgress((prev) => ({
        ...prev,
        [formatId]: { percent: 100, status: 'completed' }
      }));

      // Open the locker link
      window.open(getLockerUrl(format, videoTitle), '_blank');

      // Track the CPA redirect
      trackEvent('CPA', 'Redirect', `${formatType} - ${format.resolution}`);

      // Add to recent downloads
      saveToRecentDownloads({
        id: Date.now().toString(),
        title: videoTitle,
        thumbnail: videoThumbnail,
        format: format.resolution,
        quality: format.videoQuality,
        date: new Date().toISOString(),
        url: videoUrl
      });
    }
  };

  // Show download progress for non-CPA formats
  const showDownloadProgress = (formatId, format) => {
    // Reset download progress
    setDownloadProgress((prev) => ({
      ...prev,
      [formatId]: { percent: 0, status: 'downloading' }
    }));

    // Simulate download progress
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 10;
      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);

        setDownloadProgress((prev) => ({
          ...prev,
          [formatId]: { percent: 100, status: 'completed' }
        }));

        // After completion, scroll to show the download button again
        if (downloadRef.current) {
          setTimeout(() => {
            downloadRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }, 500);
        }

        // Track successful download completion
        trackDownload(
          videoUrl,
          format.fileExtension,
          format.resolution,
          true
        );

        // Add to recent downloads
        const downloadFormat = [...videoOpt, ...audioOpt].find(f => f.formatId === formatId);
        if (downloadFormat) {
          saveToRecentDownloads({
            id: Date.now().toString(),
            title: videoTitle,
            thumbnail: videoThumbnail,
            format: downloadFormat.resolution,
            quality: downloadFormat.videoQuality,
            date: new Date().toISOString(),
            url: videoUrl
          });
        }
      } else {
        setDownloadProgress((prev) => ({
          ...prev,
          [formatId]: { percent: Math.round(progress), status: 'downloading' }
        }));
      }
    }, 200);
  };

  return (
    <div className="w-full mx-auto max-w-6xl p-2 md:p-4 mt-4">
      <div className={`${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'} rounded-lg shadow-md p-3 sm:p-4 md:p-6 flex flex-col animate-slide-up transition-colors duration-300`}>
        <div className="flex flex-col md:flex-row">
          {/* Video Thumbnail */}
          <div className="w-full md:w-2/5 mb-4 md:mb-0 overflow-hidden rounded-md">
            <ResponsiveImage
              src={videoThumbnail || '/images/thumbnail.jpg'}
              alt={videoTitle}
              className="w-full h-48 md:h-64 object-cover rounded-md transition-transform duration-500 hover:scale-105"
              sizes="(max-width: 768px) 100vw, 40vw"
              loading="eager"
            />
          </div>

          {/* Video Information */}
          <div className="md:w-3/5 md:pl-6 flex flex-col">
            <h2 className="text-xl md:text-2xl font-bold mb-2 transition-colors duration-300 hover:text-orange-500">{videoTitle}</h2>

            {/* Author info */}
            <div className="flex items-center mb-3 md:mb-4">
              <div className="overflow-hidden rounded-full mr-2 md:mr-3">
                <ResponsiveImage
                  src={authorThumbnail || '/images/author.jpg'}
                  alt={author}
                  className="w-8 h-8 md:w-12 md:h-12 rounded-full transition-transform duration-500 hover:scale-110"
                  sizes="(max-width: 768px) 32px, 48px"
                  loading="lazy"
                />
              </div>
              <a
                href={channelUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`text-sm md:text-base ${darkMode ? 'text-gray-300 hover:text-orange-400' : 'text-gray-800 hover:text-orange-500'} transition-colors duration-300`}
                onClick={() => trackEvent('External Link', 'Channel Visit', author)}
              >
                {author}
              </a>
            </div>

            {/* Duration */}
            <div className="flex items-center mb-3 md:mb-4">
              <img
                src="/images/time.svg"
                alt="Duration"
                className="w-5 h-5 md:w-6 md:h-6 mr-2"
                loading="lazy"
              />
              <span className={`text-sm md:text-base ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>{videoDuration}</span>
            </div>

            {/* Tab buttons */}
            <div className="flex gap-2 md:gap-4 mb-3 md:mb-4">
              <button
                className={`px-3 md:px-4 py-1 md:py-2 text-sm md:text-base rounded transition-colors duration-300 ${
                  activeTab === 'video'
                    ? 'bg-gray-800 text-white dark:bg-gray-600'
                    : `${darkMode ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`
                }`}
                onClick={() => handleTabChange('video')}
              >
                {t('videoTab')}
              </button>
              <button
                className={`px-3 md:px-4 py-1 md:py-2 text-sm md:text-base rounded transition-colors duration-300 ${
                  activeTab === 'audio'
                    ? 'bg-gray-800 text-white dark:bg-gray-600'
                    : `${darkMode ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`
                }`}
                onClick={() => handleTabChange('audio')}
              >
                {t('audioTab')}
              </button>
              <button
                className={`px-3 md:px-4 py-1 md:py-2 text-sm md:text-base rounded transition-colors duration-300 ${
                  activeTab === 'history'
                    ? 'bg-gray-800 text-white dark:bg-gray-600'
                    : `${darkMode ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`
                }`}
                onClick={() => handleTabChange('history')}
              >
                {t('historyTab')}
              </button>
            </div>

            {/* Video Options */}
            {activeTab === 'video' && (
              <div className="space-y-2 md:space-y-3 mt-1 md:mt-2" ref={downloadRef}>
                {videoOpt && videoOpt.length > 0 ? (
                  videoOpt.map((format, index) => (
                    <FormatOption
                      key={index}
                      format={format}
                      type="video"
                      isHovered={hoveredFormat === `video-${index}`}
                      setHovered={() => setHoveredFormat(`video-${index}`)}
                      clearHovered={() => setHoveredFormat(null)}
                      animationDelay={index}
                      darkMode={darkMode}
                      progress={downloadProgress[format.formatId] || { percent: 0, status: 'idle' }}
                      onDownload={() => simulateDownload(format.formatId, format)}
                      t={t}
                      isLockerEnabled={isFormatLocked(format.formatId)}
                    />
                  ))
                ) : (
                  <p className={`text-sm md:text-base ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{t('noVideoOptions')}</p>
                )}
              </div>
            )}

            {/* Audio Options */}
            {activeTab === 'audio' && (
              <div className="space-y-2 md:space-y-3 mt-1 md:mt-2" ref={downloadRef}>
                {audioOpt && audioOpt.length > 0 ? (
                  audioOpt.slice(-2).map((format, index) => (
                    <FormatOption
                      key={index}
                      format={{...format, resolution: 'Audio Only'}}
                      type="audio"
                      isHovered={hoveredFormat === `audio-${index}`}
                      setHovered={() => setHoveredFormat(`audio-${index}`)}
                      clearHovered={() => setHoveredFormat(null)}
                      animationDelay={index}
                      darkMode={darkMode}
                      progress={downloadProgress[format.formatId] || { percent: 0, status: 'idle' }}
                      onDownload={() => simulateDownload(format.formatId, {...format, resolution: 'Audio Only'})}
                      t={t}
                      isLockerEnabled={isFormatLocked(format.formatId)}
                    />
                  ))
                ) : (
                  <p className={`text-sm md:text-base ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{t('noAudioOptions')}</p>
                )}
              </div>
            )}

            {/* Download History */}
            {activeTab === 'history' && (
              <div className="space-y-2 md:space-y-3 mt-1 md:mt-2">
                {recentDownloads && recentDownloads.length > 0 ? (
                  <div className="space-y-2">
                    <h3 className={`text-lg font-semibold ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>{t('recentDownloads')}</h3>
                    {recentDownloads.map((download, index) => (
                      <div
                        key={download.id || index}
                        className={`flex items-center p-2 rounded-md ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'} transition-colors duration-300`}
                      >
                        <div className="w-12 h-12 rounded overflow-hidden flex-shrink-0 mr-3">
                          <ResponsiveImage
                            src={download.thumbnail || '/images/thumbnail.jpg'}
                            alt={download.title}
                            className="w-full h-full object-cover"
                            sizes="48px"
                            loading="lazy"
                          />
                        </div>
                        <div className="flex-grow min-w-0">
                          <p className={`font-medium text-sm truncate ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>
                            {download.title}
                          </p>
                          <div className="flex items-center text-xs">
                            <span className={`mr-2 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                              {download.format} • {download.quality}
                            </span>
                            <span className={`${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>
                              {new Date(download.date).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                        <a
                          href={download.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="ml-2 p-1 rounded-full bg-gray-200 hover:bg-gray-300 dark:bg-gray-600 dark:hover:bg-gray-500 transition-colors duration-300"
                          onClick={() => trackEvent('History', 'Revisit Download', download.title)}
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                          </svg>
                        </a>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className={`text-sm md:text-base ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{t('noHistoryAvailable')}</p>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Additional content - Quick tips */}
        <div className={`mt-6 p-4 rounded-md ${darkMode ? 'bg-gray-700' : 'bg-gray-100'} transition-colors duration-300`}>
          <h3 className={`text-lg font-semibold mb-2 ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>{t('quickTips')}</h3>
          <ul className={`list-disc list-inside text-sm space-y-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            <li>{t('tipHighQuality')}</li>
            <li>{t('tipAudioOnly')}</li>
            <li>{t('tipFormats')}</li>
            <li>{t('tipHistory')}</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

function FormatOption({ format, type, isHovered, setHovered, clearHovered, animationDelay, darkMode, progress, onDownload, t, isLockerEnabled }) {
  const {
    resolution,
    fileSize,
    fileExtension,
    videoQuality,
    audioQuality,
    fileUrl
  } = format;

  const displayQuality = type === 'video'
    ? `${resolution} (${videoQuality})`
    : `${audioQuality} Audio`;

  const handleDownload = () => {
    // Only proceed if not already downloading
    if (progress.status !== 'downloading') {
      onDownload();
    }
  };

  return (
    <div
      className={`flex flex-col md:flex-row md:items-center justify-between p-2 md:p-3 border rounded-md transition-all duration-300 animate-slide-up stagger-${animationDelay}
        ${darkMode
          ? `${isHovered ? 'bg-gray-700 shadow-md border-gray-600' : 'hover:bg-gray-700 hover:shadow-sm border-gray-700'}`
          : `${isHovered ? 'bg-gray-50 shadow-md border-gray-300' : 'hover:bg-gray-50 hover:shadow-sm border-gray-200'}`
        }`}
      onMouseEnter={setHovered}
      onMouseLeave={clearHovered}
    >
      <div className="flex flex-col mb-2 md:mb-0">
        <span className={`font-medium text-sm md:text-base ${darkMode ? 'text-gray-200' : 'text-gray-900'}`}>{displayQuality}</span>
        <span className={`text-xs md:text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
          {fileExtension.toUpperCase()} · {fileSize}
        </span>
      </div>

      {progress.status === 'downloading' ? (
        <div className="w-full md:w-1/3">
          <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
            <div
              className="h-full bg-green-500 transition-all duration-200 ease-out"
              style={{ width: `${progress.percent}%` }}
            ></div>
          </div>
          <div className="text-xs text-center mt-1 text-gray-500 dark:text-gray-400">
            {t('downloading')} {progress.percent}%
          </div>
        </div>
      ) : progress.status === 'completed' ? (
        <div className="flex items-center justify-center">
          <span className={`text-green-500 font-medium text-sm flex items-center`}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            {t('downloaded')}
          </span>
        </div>
      ) : (
        <button
          onClick={handleDownload}
          className={`${isLockerEnabled ? 'bg-red-600 hover:bg-red-700' : 'bg-green-600 hover:bg-green-700'} text-white py-1 md:py-2 px-3 md:px-4 rounded-md text-sm md:text-base flex items-center justify-center transition-all duration-300 ${isHovered ? 'transform scale-105' : ''}`}
        >
          <img
            src="/images/326639_download_file_icon.svg"
            alt="Download"
            className={`w-4 h-4 md:w-5 md:h-5 mr-1 md:mr-2 transition-transform duration-300 ${isHovered ? 'animate-pulse-slow' : ''}`}
            loading="lazy"
          />
          {isLockerEnabled ? t('unlock') : t('download')}
        </button>
      )}
    </div>
  );
}

export default DownloadCard;
