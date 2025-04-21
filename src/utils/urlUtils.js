/**
 * URL validation and platform detection utilities
 */

/**
 * Supported video platforms
 */
export const SUPPORTED_PLATFORMS = {
  YOUTUBE: 'youtube',
  VIMEO: 'vimeo',
  FACEBOOK: 'facebook',
  INSTAGRAM: 'instagram',
  TWITTER: 'twitter',
  TIKTOK: 'tiktok',
  TWITCH: 'twitch',
  DAILYMOTION: 'dailymotion',
  UNKNOWN: 'unknown'
};

/**
 * Validates if a string is a proper URL
 *
 * @param {string} url String to validate
 * @returns {boolean} Whether the string is a valid URL
 */
export const isValidUrl = (url) => {
  try {
    new URL(url);
    return true;
  } catch (e) {
    return false;
  }
};

/**
 * Checks if a URL is from a supported video platform
 *
 * @param {string} url URL to check
 * @returns {boolean} Whether the URL is from a supported platform
 */
export const isSupportedVideoUrl = (url) => {
  if (!isValidUrl(url)) return false;

  const platform = detectPlatform(url);
  return platform !== SUPPORTED_PLATFORMS.UNKNOWN;
};

/**
 * Detects the platform from a URL
 *
 * @param {string} url URL to check
 * @returns {string} Platform identifier
 */
export const detectPlatform = (url) => {
  if (!isValidUrl(url)) return SUPPORTED_PLATFORMS.UNKNOWN;

  const urlObj = new URL(url);
  const hostname = urlObj.hostname.toLowerCase();

  if (hostname.includes('youtube.com') || hostname.includes('youtu.be')) {
    return SUPPORTED_PLATFORMS.YOUTUBE;
  } else if (hostname.includes('vimeo.com')) {
    return SUPPORTED_PLATFORMS.VIMEO;
  } else if (hostname.includes('facebook.com') || hostname.includes('fb.watch')) {
    return SUPPORTED_PLATFORMS.FACEBOOK;
  } else if (hostname.includes('instagram.com')) {
    return SUPPORTED_PLATFORMS.INSTAGRAM;
  } else if (hostname.includes('twitter.com') || hostname.includes('x.com')) {
    return SUPPORTED_PLATFORMS.TWITTER;
  } else if (hostname.includes('tiktok.com')) {
    return SUPPORTED_PLATFORMS.TIKTOK;
  } else if (hostname.includes('twitch.tv')) {
    return SUPPORTED_PLATFORMS.TWITCH;
  } else if (hostname.includes('dailymotion.com')) {
    return SUPPORTED_PLATFORMS.DAILYMOTION;
  } else {
    return SUPPORTED_PLATFORMS.UNKNOWN;
  }
};

/**
 * Extracts the video ID from a URL
 *
 * @param {string} url URL to extract from
 * @returns {string|null} Video ID or null if not found
 */
export const extractVideoId = (url) => {
  if (!isValidUrl(url)) return null;

  const platform = detectPlatform(url);
  const urlObj = new URL(url);

  switch (platform) {
    case SUPPORTED_PLATFORMS.YOUTUBE:
      if (urlObj.hostname.includes('youtu.be')) {
        return urlObj.pathname.substring(1);
      } else {
        return urlObj.searchParams.get('v');
      }
    case SUPPORTED_PLATFORMS.VIMEO:
      return urlObj.pathname.split('/').pop();
    case SUPPORTED_PLATFORMS.FACEBOOK:
      // Facebook video URLs can be complex
      if (urlObj.pathname.includes('/videos/')) {
        return urlObj.pathname.split('/videos/')[1].split('/')[0];
      }
      return null;
    case SUPPORTED_PLATFORMS.INSTAGRAM:
      if (urlObj.pathname.includes('/reel/')) {
        return urlObj.pathname.split('/reel/')[1].split('/')[0];
      } else if (urlObj.pathname.includes('/p/')) {
        return urlObj.pathname.split('/p/')[1].split('/')[0];
      }
      return null;
    case SUPPORTED_PLATFORMS.TWITTER:
      if (urlObj.pathname.includes('/status/')) {
        return urlObj.pathname.split('/status/')[1].split('/')[0];
      }
      return null;
    case SUPPORTED_PLATFORMS.TIKTOK:
      if (urlObj.pathname.includes('/video/')) {
        return urlObj.pathname.split('/video/')[1].split('/')[0];
      }
      return null;
    case SUPPORTED_PLATFORMS.TWITCH:
      if (urlObj.pathname.includes('/videos/')) {
        return urlObj.pathname.split('/videos/')[1].split('/')[0];
      }
      return null;
    case SUPPORTED_PLATFORMS.DAILYMOTION:
      if (urlObj.pathname.includes('/video/')) {
        return urlObj.pathname.split('/video/')[1].split('/')[0];
      }
      return null;
    default:
      return null;
  }
};

/**
 * Gets the embed URL for a video
 *
 * @param {string} url Original video URL
 * @returns {string|null} Embed URL or null if not available
 */
export const getEmbedUrl = (url) => {
  if (!isValidUrl(url)) return null;

  const platform = detectPlatform(url);
  const videoId = extractVideoId(url);

  if (!videoId) return null;

  switch (platform) {
    case SUPPORTED_PLATFORMS.YOUTUBE:
      return `https://www.youtube.com/embed/${videoId}`;
    case SUPPORTED_PLATFORMS.VIMEO:
      return `https://player.vimeo.com/video/${videoId}`;
    case SUPPORTED_PLATFORMS.DAILYMOTION:
      return `https://www.dailymotion.com/embed/video/${videoId}`;
    case SUPPORTED_PLATFORMS.FACEBOOK:
      return `https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(url)}&show_text=0`;
    // Add more embed URL formats as needed
    default:
      return null;
  }
};

/**
 * Gets the thumbnail image URL for a video
 *
 * @param {string} url Original video URL
 * @param {string} videoId Video ID (optional, will be extracted if not provided)
 * @returns {string|null} Thumbnail URL or null if not available
 */
export const getThumbnailUrl = (url, videoId = null) => {
  if (!isValidUrl(url)) return null;

  const platform = detectPlatform(url);
  const id = videoId || extractVideoId(url);

  if (!id) return null;

  switch (platform) {
    case SUPPORTED_PLATFORMS.YOUTUBE:
      return `https://img.youtube.com/vi/${id}/maxresdefault.jpg`;
    case SUPPORTED_PLATFORMS.VIMEO:
      // Vimeo doesn't have a direct thumbnail URL format, should be fetched via API
      return null;
    case SUPPORTED_PLATFORMS.DAILYMOTION:
      return `https://www.dailymotion.com/thumbnail/video/${id}`;
    // Add more thumbnail URL formats as needed
    default:
      return null;
  }
};

/**
 * Gets platform icon from platform name
 *
 * @param {string} platform Platform name
 * @returns {JSX.Element} SVG icon component
 */
export const getPlatformIcon = (platform) => {
  const iconSize = "h-5 w-5";

  switch (platform) {
    case SUPPORTED_PLATFORMS.YOUTUBE:
      return (
        <svg xmlns="http://www.w3.org/2000/svg" className={iconSize} fill="currentColor" viewBox="0 0 24 24">
          <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
        </svg>
      );
    case SUPPORTED_PLATFORMS.VIMEO:
      return (
        <svg xmlns="http://www.w3.org/2000/svg" className={iconSize} fill="currentColor" viewBox="0 0 24 24">
          <path d="M22.875 10.063c-2.442 5.217-8.337 12.319-12.063 12.319-3.672 0-4.203-7.831-6.208-13.043-.987-2.565-1.624-1.976-3.474-.681l-1.128-1.455c2.698-2.372 5.398-5.127 7.057-5.28 1.868-.179 3.018 1.098 3.448 3.832.568 3.593 1.362 9.17 2.748 9.17 1.08 0 3.741-4.424 3.878-6.006.243-2.316-1.703-2.386-3.392-1.663 2.673-8.754 13.793-7.142 9.134 2.807z" />
        </svg>
      );
    case SUPPORTED_PLATFORMS.FACEBOOK:
      return (
        <svg xmlns="http://www.w3.org/2000/svg" className={iconSize} fill="currentColor" viewBox="0 0 24 24">
          <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
        </svg>
      );
    case SUPPORTED_PLATFORMS.INSTAGRAM:
      return (
        <svg xmlns="http://www.w3.org/2000/svg" className={iconSize} fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
        </svg>
      );
    case SUPPORTED_PLATFORMS.TWITTER:
      return (
        <svg xmlns="http://www.w3.org/2000/svg" className={iconSize} fill="currentColor" viewBox="0 0 24 24">
          <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
        </svg>
      );
    case SUPPORTED_PLATFORMS.TIKTOK:
      return (
        <svg xmlns="http://www.w3.org/2000/svg" className={iconSize} fill="currentColor" viewBox="0 0 24 24">
          <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
        </svg>
      );
    case SUPPORTED_PLATFORMS.TWITCH:
      return (
        <svg xmlns="http://www.w3.org/2000/svg" className={iconSize} fill="currentColor" viewBox="0 0 24 24">
          <path d="M2.149 0l-1.612 4.119v16.836h5.731v3.045h3.224l3.045-3.045h4.657l6.269-6.269v-14.686h-21.314zm19.164 13.612l-3.582 3.582h-5.731l-3.045 3.045v-3.045h-4.836v-15.045h17.194v11.463zm-3.582-7.343v6.262h-2.149v-6.262h2.149zm-5.731 0v6.262h-2.149v-6.262h2.149z" fillRule="evenodd" clipRule="evenodd" />
        </svg>
      );
    case SUPPORTED_PLATFORMS.DAILYMOTION:
      return (
        <svg xmlns="http://www.w3.org/2000/svg" className={iconSize} fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm2 16.417v1.583h-1.619v-1.588c-1.465-.07-2.381-.784-2.381-.784l.556-1.773s.954.57 1.825.657c.662.067.952-.27.952-.667 0-.667-.952-.667-.952-.667h-.875c-1.827-.069-2.959-1.139-2.959-2.85 0-1.688 1.232-2.912 2.953-3.055v-1.273h1.619v1.5c.991.085 1.907.515 1.905.515l-.507 1.914s-.731-.444-1.631-.497c-.586-.035-.826.302-.826.556 0 .355.358.537.873.669 1.856.479 3.067 1.179 3.067 2.755 0 1.445-1.031 2.595-2.5 2.905zm0 0"></path>
        </svg>
      );
    default:
      return (
        <svg xmlns="http://www.w3.org/2000/svg" className={iconSize} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      );
  }
};

export default {
  isValidUrl,
  isSupportedVideoUrl,
  detectPlatform,
  extractVideoId,
  getEmbedUrl,
  getThumbnailUrl,
  getPlatformIcon,
  SUPPORTED_PLATFORMS
};
