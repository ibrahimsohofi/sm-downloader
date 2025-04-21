// Utility for analytics tracking
// This is a simple implementation that could be replaced with a real analytics service

// Check if analytics is enabled in cookie preferences
const isAnalyticsEnabled = () => {
  try {
    const cookieConsent = localStorage.getItem('cookieConsent');
    if (!cookieConsent) return false;

    const preferences = JSON.parse(cookieConsent);
    return preferences && preferences.analytics === true;
  } catch (error) {
    console.error('Error checking analytics preferences:', error);
    return false;
  }
};

// Track page view
export const trackPageView = (pageName) => {
  if (!isAnalyticsEnabled()) return;

  try {
    // Log page view to console (in a real implementation, this would send data to an analytics service)
    console.log(`[Analytics] Page View: ${pageName}`);

    // Store in localStorage for demo purposes
    const pageViews = JSON.parse(localStorage.getItem('analytics_pageViews') || '[]');
    pageViews.push({
      page: pageName,
      timestamp: new Date().toISOString()
    });

    // Limit stored page views to last 50
    if (pageViews.length > 50) {
      pageViews.splice(0, pageViews.length - 50);
    }

    localStorage.setItem('analytics_pageViews', JSON.stringify(pageViews));
  } catch (error) {
    console.error('Error tracking page view:', error);
  }
};

// Track event (like button clicks, form submissions, etc.)
export const trackEvent = (category, action, label = null, value = null) => {
  if (!isAnalyticsEnabled()) return;

  try {
    // Log event to console (in a real implementation, this would send data to an analytics service)
    console.log(`[Analytics] Event: ${category} / ${action}${label ? ` / ${label}` : ''}${value ? ` / ${value}` : ''}`);

    // Store in localStorage for demo purposes
    const events = JSON.parse(localStorage.getItem('analytics_events') || '[]');
    events.push({
      category,
      action,
      label,
      value,
      timestamp: new Date().toISOString()
    });

    // Limit stored events to last 100
    if (events.length > 100) {
      events.splice(0, events.length - 100);
    }

    localStorage.setItem('analytics_events', JSON.stringify(events));
  } catch (error) {
    console.error('Error tracking event:', error);
  }
};

// Track video download attempt
export const trackDownload = (videoUrl, format, quality, success = true) => {
  if (!isAnalyticsEnabled()) return;

  try {
    // Extract video ID or domain for analytics
    let videoIdentifier;
    try {
      const url = new URL(videoUrl);
      if (videoUrl.includes('youtube.com') || videoUrl.includes('youtu.be')) {
        // For YouTube, try to get the video ID
        const videoId = url.searchParams.get('v') || url.pathname.split('/').pop();
        videoIdentifier = `youtube_${videoId}`;
      } else {
        // For other sources, just use the hostname
        videoIdentifier = url.hostname;
      }
    } catch (e) {
      videoIdentifier = 'unknown';
    }

    trackEvent(
      'Download',
      success ? 'Success' : 'Failure',
      videoIdentifier,
      `${format} - ${quality}`
    );

    // Store download history for analytics in localStorage
    const downloads = JSON.parse(localStorage.getItem('analytics_downloads') || '[]');
    downloads.push({
      videoUrl,
      format,
      quality,
      success,
      timestamp: new Date().toISOString()
    });

    // Limit stored downloads to last 50
    if (downloads.length > 50) {
      downloads.splice(0, downloads.length - 50);
    }

    localStorage.setItem('analytics_downloads', JSON.stringify(downloads));
  } catch (error) {
    console.error('Error tracking download:', error);
  }
};

// Get analytics data (for admin or debugging purposes)
export const getAnalyticsData = () => {
  if (!isAnalyticsEnabled()) return null;

  try {
    return {
      pageViews: JSON.parse(localStorage.getItem('analytics_pageViews') || '[]'),
      events: JSON.parse(localStorage.getItem('analytics_events') || '[]'),
      downloads: JSON.parse(localStorage.getItem('analytics_downloads') || '[]')
    };
  } catch (error) {
    console.error('Error getting analytics data:', error);
    return null;
  }
};

// Clear all analytics data
export const clearAnalyticsData = () => {
  try {
    localStorage.removeItem('analytics_pageViews');
    localStorage.removeItem('analytics_events');
    localStorage.removeItem('analytics_downloads');
    return true;
  } catch (error) {
    console.error('Error clearing analytics data:', error);
    return false;
  }
};

export default {
  trackPageView,
  trackEvent,
  trackDownload,
  getAnalyticsData,
  clearAnalyticsData
};
