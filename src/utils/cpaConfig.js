/**
 * CPA Locker Configuration
 *
 * This file centralizes configuration for Content Locking functionality.
 * Content Locking is a monetization strategy that requires users to complete
 * an offer or action before accessing content (like downloads).
 */

// Core CPA configuration
const CPA_CONFIG = {
  // The base locker link from your CPA network
  // This would be replaced with the actual locker link provided by your network
  lockerLink: "https://example.com/locker?offerid=123&s1=",

  // Master toggle for CPA integration
  enabled: true,

  // Whether to append tracking parameters to the locker link
  appendParams: true,

  // Format IDs to exclude from locker (e.g., for free formats)
  // Users will get direct download links for these formats without seeing the locker
  excludedFormats: ['mp3-high', 'mp3-medium'],

  // Additional tracking parameters
  trackingParams: {
    // Source identifier (useful for differentiating traffic sources)
    source: window.location.hostname,

    // Campaign identifier (useful for A/B testing different implementations)
    campaign: "main_downloader"
  }
};

/**
 * Generates a CPA locker URL for a specific format
 *
 * @param {Object} format - The format object
 * @param {string} videoTitle - The title of the video
 * @returns {string} - The full locker URL
 */
export const getLockerUrl = (format, videoTitle = '') => {
  // If CPA is disabled or format is excluded, return direct URL
  if (!CPA_CONFIG.enabled || CPA_CONFIG.excludedFormats.includes(format.formatId)) {
    return format.fileUrl || '#'; // Return direct URL for excluded formats or fallback to '#'
  }

  let lockerUrl = CPA_CONFIG.lockerLink;

  // Append tracking parameters if needed
  if (CPA_CONFIG.appendParams) {
    const formatName = `${format.resolution}-${format.fileExtension}`;
    const encodedTitle = encodeURIComponent(videoTitle || 'video');
    const encodedFormat = encodeURIComponent(formatName);

    // Add custom tracking parameters
    lockerUrl += `&title=${encodedTitle}&format=${encodedFormat}`;

    // Add source and campaign
    lockerUrl += `&source=${encodeURIComponent(CPA_CONFIG.trackingParams.source)}`;
    lockerUrl += `&campaign=${encodeURIComponent(CPA_CONFIG.trackingParams.campaign)}`;

    // Add random number to prevent caching
    lockerUrl += `&r=${Math.random().toString(36).substring(7)}`;
  }

  return lockerUrl;
};

/**
 * Checks if a format should use the locker
 *
 * @param {string} formatId - The format ID to check
 * @returns {boolean} - Whether the format uses locker
 */
export const isFormatLocked = (formatId) => {
  return CPA_CONFIG.enabled && !CPA_CONFIG.excludedFormats.includes(formatId);
};

/**
 * Updates the CPA locker configuration
 *
 * @param {Object} newConfig - The new configuration object
 * @returns {Object} - The updated configuration
 */
export const updateCpaConfig = (newConfig) => {
  // Update specific properties
  Object.keys(newConfig).forEach(key => {
    if (key in CPA_CONFIG) {
      CPA_CONFIG[key] = newConfig[key];
    }
  });

  // Return the updated configuration
  return { ...CPA_CONFIG };
};

/**
 * Gets the current CPA configuration
 *
 * @returns {Object} - The current configuration
 */
export const getCpaConfig = () => {
  return { ...CPA_CONFIG };
};

/**
 * Sets the locker link directly
 *
 * @param {string} link - The new locker link
 * @returns {Object} - The updated configuration
 */
export const setLockerLink = (link) => {
  CPA_CONFIG.lockerLink = link;
  return { ...CPA_CONFIG };
};

export default {
  getLockerUrl,
  isFormatLocked,
  updateCpaConfig,
  getCpaConfig,
  setLockerLink
};
