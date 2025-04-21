import { useState, useContext, useRef, useEffect } from 'react';
import { ThemeContext, LanguageContext } from '../App';
import { trackEvent } from '../utils/analytics';
import { getTranslation } from '../utils/translations';
import ResponsiveImage from './ResponsiveImage';
import {
  isValidUrl,
  isSupportedVideoUrl,
  detectPlatform,
  getEmbedUrl,
  getThumbnailUrl,
  getPlatformIcon,
  SUPPORTED_PLATFORMS,
} from '../utils/urlUtils';

const BatchDownloader = () => {
  const { darkMode } = useContext(ThemeContext);
  const { language } = useContext(LanguageContext);
  const [urls, setUrls] = useState('');
  const [batchItems, setBatchItems] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedFormat, setSelectedFormat] = useState('mp4-720p');
  const fileInputRef = useRef(null);
  const [validUrlCount, setValidUrlCount] = useState(0);
  const [invalidUrlCount, setInvalidUrlCount] = useState(0);

  // Translations
  const t = (key) => getTranslation(key, language);

  // Available formats
  const formats = [
    { id: 'mp4-1080p', label: 'MP4 1080p (HD)', quality: 'High', ext: 'mp4' },
    { id: 'mp4-720p', label: 'MP4 720p', quality: 'Medium', ext: 'mp4' },
    { id: 'mp4-480p', label: 'MP4 480p', quality: 'Low', ext: 'mp4' },
    { id: 'mp3-high', label: 'MP3 Audio (High)', quality: '192kbps', ext: 'mp3' },
    { id: 'mp3-medium', label: 'MP3 Audio (Medium)', quality: '128kbps', ext: 'mp3' },
  ];

  // Validate URLs as typing
  useEffect(() => {
    if (!urls.trim()) {
      setValidUrlCount(0);
      setInvalidUrlCount(0);
      return;
    }

    const urlList = urls
      .split('\n')
      .map((url) => url.trim())
      .filter((url) => url !== '');

    let validCount = 0;
    let invalidCount = 0;

    urlList.forEach((url) => {
      if (isSupportedVideoUrl(url)) {
        validCount++;
      } else if (url.length > 5) {
        invalidCount++;
      }
    });

    setValidUrlCount(validCount);
    setInvalidUrlCount(invalidCount);
  }, [urls]);

  // Handle text input change
  const handleUrlInputChange = (e) => {
    setUrls(e.target.value);
  };

  // Handle format selection
  const handleFormatChange = (e) => {
    setSelectedFormat(e.target.value);
  };

  // Process URLs to create batch items
  const processUrls = () => {
    if (!urls.trim()) return;

    setIsProcessing(true);

    // Split by newlines and filter empty lines
    const urlList = urls
      .split('\n')
      .map((url) => url.trim())
      .filter((url) => url !== '')
      .filter((url) => isSupportedVideoUrl(url)); // Only process valid URLs

    // Track the batch size
    trackEvent('Batch', 'Process', 'URL Count', urlList.length);

    // Create batch items with initial state
    const newItems = urlList.map((url, index) => {
      const platform = detectPlatform(url);

      return {
        id: `batch-${Date.now()}-${index}`,
        url,
        platform,
        status: 'pending', // pending, processing, completed, error
        progress: 0,
        error: null,
        title: null,
        thumbnail: null,
        embedUrl: getEmbedUrl(url),
      };
    });

    setBatchItems((prev) => [...prev, ...newItems]);
    setUrls('');

    setTimeout(() => {
      processBatchItems([...batchItems, ...newItems]);
      setIsProcessing(false);
    }, 500);
  };

  // Import from file
  const handleFileImport = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  // Process file input
  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    trackEvent('Batch', 'Import File', file.name);

    const reader = new FileReader();
    reader.onload = (event) => {
      setUrls(event.target.result);
    };
    reader.readAsText(file);

    e.target.value = '';
  };

  // Clear all items
  const clearAllItems = () => {
    trackEvent('Batch', 'Clear All');
    setBatchItems([]);
  };

  // Process batch items
  const processBatchItems = (items) => {
    if (items.length === 0) return;

    const pendingIndex = items.findIndex((item) => item.status === 'pending');
    if (pendingIndex === -1) return;

    const updatedItems = [...items];
    updatedItems[pendingIndex].status = 'processing';
    setBatchItems(updatedItems);

    const thumbnailUrl = getThumbnailUrl(updatedItems[pendingIndex].url);

    setTimeout(() => {
      const platform = updatedItems[pendingIndex].platform;
      const isWellSupportedPlatform = [
        SUPPORTED_PLATFORMS.YOUTUBE,
        SUPPORTED_PLATFORMS.VIMEO,
        SUPPORTED_PLATFORMS.DAILYMOTION,
      ].includes(platform);

      const success = isWellSupportedPlatform
        ? Math.random() < 0.9
        : Math.random() < 0.7;

      if (success) {
        const item = updatedItems[pendingIndex];

        const progressInterval = setInterval(() => {
          setBatchItems((current) => {
            const updated = [...current];
            const itemIndex = updated.findIndex((i) => i.id === item.id);

            if (itemIndex !== -1) {
              updated[itemIndex].progress += Math.floor(Math.random() * 10) + 5;

              if (updated[itemIndex].progress >= 100) {
                updated[itemIndex].progress = 100;
                updated[itemIndex].status = 'completed';
                clearInterval(progressInterval);

                setTimeout(() => {
                  processBatchItems(updated);
                }, 500);
              }
            }

            return updated;
          });
        }, 300);

        // Generate platform-specific title and use real thumbnails when available
        const platformName =
          platform && typeof platform === 'string'
            ? platform.charAt(0).toUpperCase() + platform.slice(1)
            : 'Video';

        let title = `Video from ${platformName}`;
        try {
          const urlObj = new URL(item.url);
          if (platform === SUPPORTED_PLATFORMS.YOUTUBE) {
            const videoId =
              urlObj.searchParams.get('v') || urlObj.pathname.substring(1);
            title = `YouTube Video ${videoId}`;
          } else if (platform === SUPPORTED_PLATFORMS.VIMEO) {
            const videoId = urlObj.pathname.split('/').pop();
            title = `Vimeo Video ${videoId}`;
          }
        } catch (e) {
          // Use default title if parsing fails
        }

        updatedItems[pendingIndex].title = title;
        updatedItems[pendingIndex].thumbnail = thumbnailUrl || '/images/thumbnail.jpg';
        setBatchItems(updatedItems);
      } else {
        updatedItems[pendingIndex].status = 'error';
        updatedItems[pendingIndex].error =
          t('batchErrorMessage') || 'Failed to fetch video information';
        setBatchItems(updatedItems);

        setTimeout(() => {
          processBatchItems(updatedItems);
        }, 500);
      }
    }, 1000);
  };

  const downloadAll = () => {
    const completedCount = batchItems.filter(
      (item) => item.status === 'completed'
    ).length;
    trackEvent('Batch', 'Download All', 'Count', completedCount);

    alert(`Downloading ${completedCount} files...`);
  };

  const removeItem = (id) => {
    trackEvent('Batch', 'Remove Item', id);
    setBatchItems((items) => items.filter((item) => item.id !== id));
  };

  const retryItem = (id) => {
    trackEvent('Batch', 'Retry Item', id);

    setBatchItems((items) => {
      const updated = [...items];
      const index = updated.findIndex((item) => item.id === id);

      if (index !== -1) {
        updated[index].status = 'pending';
        updated[index].progress = 0;
        updated[index].error = null;
      }

      return updated;
    });

    setTimeout(() => {
      processBatchItems(batchItems);
    }, 500);
  };

  const pendingCount = batchItems.filter((item) => item.status === 'pending').length;
  const processingCount = batchItems.filter((item) => item.status === 'processing').length;
  const completedCount = batchItems.filter((item) => item.status === 'completed').length;
  const errorCount = batchItems.filter((item) => item.status === 'error').length;
  const hasCompleted = completedCount > 0;

  const totalItemsCount = batchItems.length;

  const calculateOverallProgress = () => {
    if (totalItemsCount === 0) return 0;
    const totalProgress = batchItems.reduce((acc, item) => {
      return acc + (item.progress || 0);
    }, 0);
    return Math.round(totalProgress / totalItemsCount);
  };

  const overallProgress = calculateOverallProgress();

  return (
    <div
      className={`w-full max-w-6xl mx-auto p-4 ${
        darkMode ? 'text-white' : 'text-gray-900'
      }`}
    >
      <h2 className="text-2xl font-bold mb-6">{t('batchTitle')}</h2>

      {/* Input Section */}
      <div
        className={`p-6 rounded-lg mb-6 ${
          darkMode ? 'bg-gray-800' : 'bg-gray-100'
        }`}
      >
        <label htmlFor="batch-urls" className="block font-medium mb-2">
          {t('batchInputLabel')}
        </label>
        <textarea
          id="batch-urls"
          value={urls}
          onChange={handleUrlInputChange}
          placeholder={t('batchInputPlaceholder')}
          className={`w-full px-3 py-2 rounded-md border ${
            darkMode
              ? 'bg-gray-700 border-gray-600 text-white'
              : 'bg-white border-gray-300 text-gray-900'
          } min-h-[120px]`}
          aria-label="Enter one URL per line"
        />

        <div className="flex flex-col sm:flex-row gap-3 mt-4 items-center">
          <button
            onClick={processUrls}
            disabled={!urls.trim() || isProcessing || validUrlCount === 0}
            className={`px-4 py-2 rounded-md font-medium transition-colors ${
              !urls.trim() || isProcessing || validUrlCount === 0
                ? 'bg-gray-400 text-gray-700 cursor-not-allowed'
                : 'bg-orange-500 hover:bg-orange-600 text-white'
            }`}
          >
            {isProcessing ? t('batchProcessing') : t('batchAddToQueue')}
          </button>

          <button
            onClick={handleFileImport}
            className={`px-4 py-2 rounded-md font-medium ${
              darkMode
                ? 'bg-gray-700 hover:bg-gray-600 text-white'
                : 'bg-gray-200 hover:bg-gray-300 text-gray-800'
            }`}
          >
            {t('batchImportFromFile')}
          </button>

          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileInputChange}
            accept=".txt"
            className="hidden"
            aria-hidden="true"
          />

          <div className="flex-grow" />

          <select
            value={selectedFormat}
            onChange={handleFormatChange}
            className={`px-3 py-2 rounded-md ${
              darkMode
                ? 'bg-gray-700 border-gray-600 text-white'
                : 'bg-white border-gray-300 text-gray-900'
            } border`}
            aria-label="Select output format"
          >
            {formats.map((format) => (
              <option key={format.id} value={format.id}>
                {format.label}
              </option>
            ))}
          </select>
        </div>

        {/* URL validation summary */}
        {(validUrlCount > 0 || invalidUrlCount > 0) && (
          <div className="mt-3 flex gap-4 text-sm">
            {validUrlCount > 0 && (
              <span
                className={`px-2 py-1 rounded-full ${
                  darkMode
                    ? 'bg-green-900 text-green-200'
                    : 'bg-green-100 text-green-800'
                }`}
              >
                {validUrlCount} {t('batchValidLinks')}
              </span>
            )}
            {invalidUrlCount > 0 && (
              <span
                className={`px-2 py-1 rounded-full ${
                  darkMode
                    ? 'bg-red-900 text-red-200'
                    : 'bg-red-100 text-red-800'
                }`}
              >
                {invalidUrlCount} {t('batchInvalidLinks')}
              </span>
            )}
          </div>
        )}
      </div>

      {/* Queue Section */}
      {batchItems.length > 0 && (
        <div
          className={`p-6 rounded-lg ${
            darkMode ? 'bg-gray-800' : 'bg-gray-100'
          }`}
        >
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-bold">{t('batchQueue')}</h3>

            <div className="flex items-center gap-4">
              <div className="text-sm">
                <span
                  className={`px-2 py-1 rounded-full ${
                    darkMode ? 'bg-gray-700' : 'bg-gray-200'
                  }`}
                >
                  {batchItems.length} {t('batchItems')}
                </span>
              </div>

              <div className="flex gap-2">
                {hasCompleted && (
                  <button
                    onClick={downloadAll}
                    className="px-3 py-1 text-sm font-medium bg-green-600 hover:bg-green-700 text-white rounded-md transition-colors"
                  >
                    {t('batchDownloadAll')}
                  </button>
                )}

                <button
                  onClick={clearAllItems}
                  className="px-3 py-1 text-sm font-medium bg-red-500 hover:bg-red-600 text-white rounded-md transition-colors"
                >
                  {t('batchClearAll')}
                </button>
              </div>
            </div>
          </div>

          {/* Status summary */}
          <div className="flex flex-wrap gap-3 mb-4">
            <div
              className={`px-3 py-1 rounded-full text-sm ${
                darkMode
                  ? 'bg-blue-900 text-blue-200'
                  : 'bg-blue-100 text-blue-800'
              }`}
            >
              {pendingCount} {t('batchPending')}
            </div>
            <div
              className={`px-3 py-1 rounded-full text-sm ${
                darkMode
                  ? 'bg-yellow-900 text-yellow-200'
                  : 'bg-yellow-100 text-yellow-800'
              }`}
            >
              {processingCount} {t('batchProcessing')}
            </div>
            <div
              className={`px-3 py-1 rounded-full text-sm ${
                darkMode
                  ? 'bg-green-900 text-green-200'
                  : 'bg-green-100 text-green-800'
              }`}
            >
              {completedCount} {t('batchCompleted')}
            </div>
            <div
              className={`px-3 py-1 rounded-full text-sm ${
                darkMode
                  ? 'bg-red-900 text-red-200'
                  : 'bg-red-100 text-red-800'
              }`}
            >
              {errorCount} {t('batchError')}
            </div>
          </div>

          {/* Overall progress bar */}
          {totalItemsCount > 1 && overallProgress > 0 && (
            <div className="mb-4">
              <div className="w-full h-2 bg-gray-300 dark:bg-gray-700 rounded-full overflow-hidden">
                <div
                  className="h-full bg-orange-500 transition-all duration-300"
                  style={{ width: `${overallProgress}%` }}
                ></div>
              </div>
              <div className="text-xs text-right mt-1">
                {overallProgress}% {t('batchOverallProgress')}
              </div>
            </div>
          )}

          {/* Queue items */}
          <div className="space-y-3">
            {batchItems.map((item) => (
              <BatchItem
                key={item.id}
                item={item}
                selectedFormat={selectedFormat}
                formats={formats}
                onRemove={() => removeItem(item.id)}
                onRetry={() => retryItem(item.id)}
                darkMode={darkMode}
                t={t}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

const BatchItem = ({
  item,
  selectedFormat,
  formats,
  onRemove,
  onRetry,
  darkMode,
  t,
}) => {
  const formatDetails = formats.find((f) => f.id === selectedFormat) || formats[0];
  const platformIcon = getPlatformIcon(item.platform, darkMode);

  return (
    <div
      className={`flex flex-col sm:flex-row items-start sm:items-center gap-4 p-3 rounded-md ${
        darkMode ? 'bg-gray-700' : 'bg-white'
      } relative`}
    >
      {/* Thumbnail or status icon */}
      <div className="w-16 h-16 rounded overflow-hidden flex-shrink-0 flex items-center justify-center">
        {item.thumbnail && item.status === 'completed' ? (
          <ResponsiveImage
            src={item.thumbnail}
            alt={item.title || 'Video thumbnail'}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        ) : (
          <div
            className={`w-full h-full flex items-center justify-center ${getStatusBgColor(
              item.status,
              darkMode
            )}`}
          >
            {getStatusIcon(item.status)}
          </div>
        )}
        {/* Platform icon overlay */}
        {platformIcon && (
          <span className="absolute top-1 right-1 bg-white dark:bg-gray-800 rounded-full p-1 shadow">
            {platformIcon}
          </span>
        )}
      </div>

      {/* URL and status */}
      <div className="flex-grow min-w-0">
        <p className="text-sm mb-1 font-medium truncate">
          {item.title || item.url}
        </p>

        <div className="flex items-center text-xs gap-2">
          <span className={`rounded-full px-2 py-0.5 ${getStatusBgColor(item.status, darkMode)}`}>
            {getStatusLabel(item.status, t)}
          </span>
          <span>
            {formatDetails.label}
          </span>
        </div>

        {/* Progress bar */}
        {(item.status === 'processing' || item.status === 'completed') && (
          <div className="w-full h-1.5 bg-gray-200 dark:bg-gray-600 rounded-full mt-2 overflow-hidden">
            <div
              className="h-full bg-green-500 transition-all duration-300 ease-out"
              style={{ width: `${item.progress}%` }}
            ></div>
          </div>
        )}

        {/* Error message */}
        {item.status === 'error' && (
          <p className="text-xs text-red-500 mt-1">
            {item.error || t('batchGenericError')}
          </p>
        )}
      </div>

      {/* Actions */}
      <div className="flex gap-2">
        {item.status === 'completed' && (
          <button
            className="text-xs px-2 py-1 bg-green-600 hover:bg-green-700 text-white rounded transition-colors"
            aria-label={t('batchDownload')}
          >
            {t('batchDownload')}
          </button>
        )}

        {item.status === 'error' && (
          <button
            onClick={onRetry}
            className="text-xs px-2 py-1 bg-blue-500 hover:bg-blue-600 text-white rounded transition-colors"
            aria-label={t('batchRetry')}
          >
            {t('batchRetry')}
          </button>
        )}

        <button
          onClick={onRemove}
          className="text-xs px-2 py-1 bg-gray-500 hover:bg-gray-600 text-white rounded transition-colors"
          aria-label={t('batchRemove')}
        >
          {t('batchRemove')}
        </button>
      </div>
    </div>
  );
};

// Helper functions
const getStatusBgColor = (status, isDark) => {
  switch (status) {
    case 'pending':
      return isDark ? 'bg-blue-900 text-blue-200' : 'bg-blue-100 text-blue-800';
    case 'processing':
      return isDark
        ? 'bg-yellow-900 text-yellow-200'
        : 'bg-yellow-100 text-yellow-800';
    case 'completed':
      return isDark
        ? 'bg-green-900 text-green-200'
        : 'bg-green-100 text-green-800';
    case 'error':
      return isDark ? 'bg-red-900 text-red-200' : 'bg-red-100 text-red-800';
    default:
      return isDark ? 'bg-gray-700 text-gray-200' : 'bg-gray-100 text-gray-800';
  }
};

const getStatusLabel = (status, t) => {
  switch (status) {
    case 'pending':
      return t('batchStatusPending');
    case 'processing':
      return t('batchStatusProcessing');
    case 'completed':
      return t('batchStatusCompleted');
    case 'error':
      return t('batchStatusError');
    default:
      return status;
  }
};

const getStatusIcon = (status) => {
  switch (status) {
    case 'pending':
      return (
        <svg
          className="w-6 h-6 text-blue-600"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      );
    case 'processing':
      return (
        <svg
          className="w-6 h-6 text-yellow-600 animate-spin"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
          />
        </svg>
      );
    case 'completed':
      return (
        <svg
          className="w-6 h-6 text-green-600"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 13l4 4L19 7"
          />
        </svg>
      );
    case 'error':
      return (
        <svg
          className="w-6 h-6 text-red-600"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
          />
        </svg>
      );
    default:
      return null;
  }
};

export default BatchDownloader;
