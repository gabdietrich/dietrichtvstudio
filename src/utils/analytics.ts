// Google Analytics 4 utility functions
declare global {
  interface Window {
    gtag: (command: string, targetId: string, config?: any) => void;
  }
}

const GA_TRACKING_ID = 'G-NX85GZHKTK';

// Initialize Google Analytics
export const initGA = () => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', GA_TRACKING_ID, {
      page_title: document.title,
      page_location: window.location.href,
      custom_map: { custom_parameter: 'page_category' }
    });
  }
};

// Track page views
export const trackPageView = (pagePath: string, pageTitle?: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', GA_TRACKING_ID, {
      page_path: pagePath,
      page_title: pageTitle || document.title,
      page_location: window.location.href
    });
  }
};

// Track custom events
export const trackEvent = (action: string, parameters?: {
  event_category?: string;
  event_label?: string;
  value?: number;
  custom_parameter?: string;
  [key: string]: any;
}) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, {
      event_category: parameters?.event_category || 'engagement',
      event_label: parameters?.event_label,
      value: parameters?.value,
      ...parameters
    });
  }
};

// Specific tracking functions for your site
export const analytics = {
  // Navigation tracking
  navigateToPage: (pageName: string, fromPage: string) => {
    trackEvent('page_navigation', {
      event_category: 'navigation',
      event_label: `${fromPage} -> ${pageName}`,
      custom_parameter: 'navigation'
    });
  },

  // Project interactions
  viewProject: (projectName: string, projectId: number) => {
    trackEvent('view_project', {
      event_category: 'projects',
      event_label: projectName,
      value: projectId,
      custom_parameter: 'project_engagement'
    });
  },

  // Video interactions
  playVideo: (videoId: string, projectName: string) => {
    trackEvent('play_video', {
      event_category: 'video',
      event_label: `${projectName} - ${videoId}`,
      custom_parameter: 'video_engagement'
    });
  },

  // Filter usage
  useFilter: (filterName: string) => {
    trackEvent('use_filter', {
      event_category: 'filters',
      event_label: filterName,
      custom_parameter: 'filter_usage'
    });
  },

  // Contact interactions
  viewContact: () => {
    trackEvent('view_contact', {
      event_category: 'contact',
      event_label: 'contact_page_view',
      custom_parameter: 'contact_engagement'
    });
  },

  // Social media clicks
  clickSocialMedia: (platform: string, location: string) => {
    trackEvent('click_social_media', {
      event_category: 'social',
      event_label: `${platform} - ${location}`,
      custom_parameter: 'social_engagement'
    });
  },

  // Language switching
  switchLanguage: (newLanguage: string, previousLanguage: string) => {
    trackEvent('switch_language', {
      event_category: 'i18n',
      event_label: `${previousLanguage} -> ${newLanguage}`,
      custom_parameter: 'language_preference'
    });
  },

  // SEO and performance
  trackLoadTime: (loadTime: number) => {
    trackEvent('page_load_time', {
      event_category: 'performance',
      value: Math.round(loadTime),
      custom_parameter: 'performance'
    });
  }
};

export default analytics;
