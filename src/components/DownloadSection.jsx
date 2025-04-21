import { useState, useEffect, useRef, useContext } from "react";
import axios from "axios";
import DownloadCard from "./DownloadCard";
import DownloadCardSkeleton from "./DownloadCardSkeleton";
import Error from "./Error";
import { ThemeContext, LanguageContext } from '../App';
import { trackEvent } from '../utils/analytics';
import { getTranslation } from '../utils/translations';

function DownloadSection() {
  const [inputValue, setInputValue] = useState("");
  const [error, setError] = useState({ error: "", isActive: false });
  const [showDownloadCard, setShowDownloadCard] = useState(false);
  const [videoData, setVideoData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const scrollTo = useRef(null);
  const { darkMode } = useContext(ThemeContext);
  const { language } = useContext(LanguageContext);

  // Get translations
  const t = (key) => getTranslation(key, language);

  // Simplified URL validation function
  const isValidUrl = (url) => {
    try {
      new URL(url);
      return url.includes('youtube.com') || url.includes('youtu.be') ||
             url.includes('vimeo.com') || url.includes('dailymotion.com') ||
             url.includes('facebook.com') || url.includes('instagram.com');
    } catch (e) {
      return false;
    }
  };

  useEffect(() => {
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 0);
  }, []);

  function scrollToTop() {
    if (scrollTo.current) {
      scrollTo.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }

  function handleInputChange(e) {
    setInputValue(e.target.value);
  }

  const handleActiveError = () => {
    setError({ ...error, isActive: false });
  };

  // Get video ID from URL for embedding
  const getVideoEmbedUrl = (url) => {
    if (!url) return null;

    try {
      if (url.includes('youtube.com') || url.includes('youtu.be')) {
        let videoId = '';
        if (url.includes('youtube.com')) {
          const urlObj = new URL(url);
          videoId = urlObj.searchParams.get('v');
        } else if (url.includes('youtu.be')) {
          videoId = url.split('/').pop();
        }
        return videoId ? `https://www.youtube.com/embed/${videoId}` : null;
      } else if (url.includes('vimeo.com')) {
        const vimeoId = url.split('/').pop();
        return vimeoId ? `https://player.vimeo.com/video/${vimeoId}` : null;
      } else if (url.includes('dailymotion.com')) {
        const match = url.match(/dailymotion.com\/(?:video\/|embed\/|)([a-zA-Z0-9]+)/);
        return match && match[1] ? `https://www.dailymotion.com/embed/video/${match[1]}` : null;
      }
    } catch (e) {
      console.error("Error generating embed URL:", e);
    }

    return null;
  };

  async function fetchVideoData(url) {
    try {
      // For demo purposes, we'll use a YouTube ID extractor
      let videoId = '';
      let platform = 'unknown';

      if (url.includes('youtube.com')) {
        platform = 'youtube';
        const urlObj = new URL(url);
        videoId = urlObj.searchParams.get('v');
      } else if (url.includes('youtu.be')) {
        platform = 'youtube';
        videoId = url.split('/').pop();
      } else if (url.includes('vimeo.com')) {
        platform = 'vimeo';
        const urlPath = new URL(url).pathname;
        videoId = urlPath.split('/').pop();
      } else if (url.includes('facebook.com')) {
        platform = 'facebook';
      } else if (url.includes('instagram.com')) {
        platform = 'instagram';
      }

      // Track the platform being used
      trackEvent('Search', 'Video Platform', platform);

      if (!videoId && platform === 'youtube') {
        throw new Error(t('errorInvalidUrl'));
      }

      // Using a public API that doesn't require authentication
      const response = await axios.get(`https://noembed.com/embed?url=${encodeURIComponent(url)}`);

      // Track success
      trackEvent('Search', 'Video Info Fetched', platform, 1);

      // Create a format structure similar to what our app expects
      return {
        title: response.data.title || t('unknownTitle'),
        duration: "Unknown Duration", // This API doesn't provide duration
        thumbnail: response.data.thumbnail_url || "/images/thumbnail.jpg",
        url: url,
        author: response.data.author_name || t('unknownAuthor'),
        authorImg: "/images/author.jpg", // This API doesn't provide author image
        channelUrl: response.data.author_url || "",
        embedUrl: getVideoEmbedUrl(url),
        formats: [
          {
            formatId: "1",
            resolution: "1080p",
            fileSize: "~50MB",
            videoQuality: "High",
            audioBitrate: "192kbps",
            ext: "mp4",
            url: `https://example.com/download/${videoId}/1080p`, // In real implementation, this would be your backend endpoint
          },
          {
            formatId: "2",
            resolution: "720p",
            fileSize: "~30MB",
            videoQuality: "Medium",
            audioBitrate: "128kbps",
            ext: "mp4",
            url: `https://example.com/download/${videoId}/720p`,
          },
          {
            formatId: "3",
            resolution: "480p",
            fileSize: "~20MB",
            videoQuality: "Low",
            audioBitrate: "96kbps",
            ext: "mp4",
            url: `https://example.com/download/${videoId}/480p`,
          },
          {
            formatId: "4",
            resolution: "360p",
            fileSize: "~10MB",
            videoQuality: "Low",
            audioBitrate: "64kbps",
            ext: "mp4",
            url: `https://example.com/download/${videoId}/360p`,
          },
        ],
      };
    } catch (error) {
      // Track failure
      trackEvent('Search', 'Video Info Failed', url.substring(0, 50), 0);
      console.error("Error fetching video data:", error);
      throw new Error(t('errorFetchFailed'));
    }
  }

  async function handleDownload() {
    if (inputValue.trim() === "") {
      setError({
        ...error,
        error: t('errorEmptyUrl'),
        isActive: true,
      });
      setShowDownloadCard(false);
      setLoading(false);
      trackEvent('Search', 'Empty URL', '', 0);
      return;
    }

    if (!isValidUrl(inputValue)) {
      setError({
        ...error,
        error: t('errorInvalidUrl'),
        isActive: true,
      });
      setShowDownloadCard(false);
      setLoading(false);
      trackEvent('Search', 'Invalid URL', inputValue.substring(0, 50), 0);
      return;
    }

    try {
      scrollToTop();
      setLoading(true);
      setShowDownloadCard(true);
      setError({ ...error, isActive: false });

      // Track search attempt
      trackEvent('Search', 'URL Entered', inputValue.substring(0, 50));

      // Fetch actual video data from API
      const data = await fetchVideoData(inputValue);
      setVideoData(data);
      setLoading(false);
    } catch (err) {
      setError({
        error: err.message || t('errorGeneric'),
        isActive: true,
      });
      setShowDownloadCard(false);
      setLoading(false);
    }
  }

  const handlePasteClipboard = async () => {
    try {
      const link = await navigator.clipboard.readText();
      setInputValue(link);

      // Track clipboard paste
      trackEvent('UI Interaction', 'Clipboard Paste', link.substring(0, 50));

      if (link.trim() !== "") {
        handleDownload();
      }
    } catch (error) {
      setError({
        error: t('errorClipboard'),
        isActive: true
      });
      trackEvent('UI Interaction', 'Clipboard Error', error.message);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleDownload();
      trackEvent('UI Interaction', 'Enter Key Search');
    }
  }

  // Toggle video preview
  const togglePreview = () => {
    if (videoData && videoData.embedUrl) {
      setShowPreview(!showPreview);
      trackEvent('UI Interaction', showPreview ? 'Close Preview' : 'Open Preview', videoData.title);
    }
  };

  const videoInfo = videoData
    ? {
        videoTitle: videoData.title || t('unknownTitle'),
        videoDuration: videoData.duration || t('unknownDuration'),
        videoThumbnail: videoData.thumbnail || "",
        videoUrl: videoData.videoUrl || videoData.url,
        author: videoData.author || t('unknownAuthor'),
        authorThumbnail: videoData.authorImg || "",
        channelUrl: videoData.channelUrl || "",
        embedUrl: videoData.embedUrl || null,
      }
    : {};

  const videoOptions =
    videoData && Array.isArray(videoData.formats)
      ? videoData.formats.map((format) => ({
          formatId: format.formatId || "Unknown",
          resolution: format.resolution || "Unknown",
          fileSize: format.fileSize || "Unknown",
          videoQuality: format.videoQuality || "Unknown",
          audioQuality: format.audioBitrate || "Unknown",
          fileExtension: format.ext || "Unknown",
          fileUrl: format.url || "",
          videoUrl: inputValue,
        }))
      : [];

  return (
    <>
      <div className={`w-full flex flex-col items-center justify-start pt-3 px-4 sm:px-6 animate-fade-in ${darkMode ? 'text-white' : 'text-gray-900'}`}>
        <div className="flex flex-col items-center gap-3 md:gap-4 text-center w-full max-w-4xl">
          <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold animate-slide-up leading-tight" dangerouslySetInnerHTML={{ __html: t('heroTitle') }} />
          <p className="text-sm sm:text-base md:text-lg opacity-90 animate-slide-up stagger-1 px-2 max-w-md md:max-w-2xl mx-auto">
            {t('heroSubtitle')}
          </p>
        </div>
        <div
          className="my-4 md:my-5 flex flex-col md:flex-row items-center justify-center w-full sm:w-11/12 md:w-4/5 lg:w-3/5 gap-2 animate-slide-up stagger-2"
          ref={scrollTo}
        >
          <div className="flex w-full">
            <div className={`bg-gray-50 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 w-12 md:w-16 h-12 md:h-16 border ${darkMode ? 'border-gray-600' : 'border-gray-300'} rounded-l-lg flex-shrink-0 transition-colors duration-300`}>
              <button
                className="w-full h-full flex items-center justify-center focus:outline-none"
                onClick={handlePasteClipboard}
                aria-label="Paste from clipboard"
              >
                <img
                  className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 hover:scale-105 transition-transform duration-300"
                  src="/svg/clipboard-outline.svg"
                  alt="Clipboard"
                />
              </button>
            </div>
            <input
              value={inputValue}
              id="scrollTo"
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              aria-label="Download URL input"
              type="url"
              className={`text-gray-950 dark:text-white text-sm sm:text-base md:text-lg outline-none font-bold rounded-r-md md:rounded-r-none h-12 md:h-16 px-2 sm:px-3 md:px-5 w-full border-2 border-l-0 ${darkMode ? 'border-gray-600 bg-gray-800 focus:border-orange-500' : 'border-gray-600 focus:border-orange-400'} transition-all duration-300`}
              placeholder={t('pasteLink')}
            />
          </div>

          <button
            onClick={handleDownload}
            className="mt-2 md:mt-0 bg-gray-800 hover:bg-gray-900 dark:bg-gray-700 dark:hover:bg-gray-600 text-white
             font-semibold rounded-md md:rounded-none h-12 md:h-16 w-full md:w-40 px-5 text-lg md:text-xl flex items-center justify-center transition-all duration-300 hover:bg-orange-600"
          >
            {t('downloadButton')}
          </button>
        </div>
      </div>

      <div className="flex flex-col items-center w-full px-4">
        {loading && <DownloadCardSkeleton />}
        <div className="w-full max-w-6xl mx-auto">
          {error.isActive ? (
            <Error error={error.error} activeError={handleActiveError} />
          ) : (
            <>
              {showDownloadCard && !loading && videoData && (
                <div className="animate-fade-in">
                  {/* Video Preview */}
                  {videoData.embedUrl && (
                    <div className="mb-4 text-center">
                      <button
                        onClick={togglePreview}
                        className={`inline-flex items-center px-4 py-2 rounded-lg
                          ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'}
                          transition-colors duration-300 text-sm font-medium`}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 mr-2"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          {showPreview ? (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          ) : (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                          )}
                        </svg>
                        {showPreview ? t('hidePreview') : t('showPreview')}
                      </button>

                      {showPreview && (
                        <div className={`mt-3 w-full max-w-2xl mx-auto rounded-lg overflow-hidden border ${darkMode ? 'border-gray-700' : 'border-gray-300'} animate-slide-up`}>
                          <div className="relative pb-[56.25%] h-0">
                            <iframe
                              className="absolute top-0 left-0 w-full h-full"
                              src={videoData.embedUrl}
                              title={videoData.title}
                              frameBorder="0"
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                              allowFullScreen
                            ></iframe>
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  <DownloadCard
                    videoInfo={videoInfo}
                    videoOpt={videoOptions}
                    audioOpt={videoOptions}
                  />
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default DownloadSection;
