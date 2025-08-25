import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import Navigation from './components/Navigation';
import WorkPage, { getProjectBySlug, getProjectById } from './components/WorkPage';
import ContactPage from './components/ContactPage';
import ProjectPage from './components/ProjectPage';
import MetaUpdater from './components/MetaUpdater';

export default function App() {
  const { i18n } = useTranslation();
  const [currentPage, setCurrentPage] = useState('work');
  const [displayedPage, setDisplayedPage] = useState('work');
  const [currentProjectId, setCurrentProjectId] = useState<number | null>(null);
  const [displayedProjectId, setDisplayedProjectId] = useState<number | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Parse URL and set initial state
  useEffect(() => {
    const parseURL = () => {
      const path = window.location.pathname;
      
      // Extract locale from URL path (e.g., /pt/contact or /en/project/slug)
      const localeMatch = path.match(/^\/(pt|en)(\/.*)?$/);
      const locale = localeMatch?.[1];
      const remainingPath = localeMatch?.[2] || '/';
      
      // Set language if locale is detected in URL
      if (locale && (locale === 'pt' || locale === 'en')) {
        if (i18n.language !== locale) {
          i18n.changeLanguage(locale);
          // Set cookie to remember preference
          document.cookie = `lang=${locale}; path=/; max-age=${365 * 24 * 60 * 60}`; // 1 year
        }
      }
      
      // Parse the remaining path after locale prefix
      const basePath = remainingPath === '/' ? '/' : remainingPath;
      
      if (basePath === '/contact') {
        setCurrentPage('contact');
        setDisplayedPage('contact');
        setCurrentProjectId(null);
        setDisplayedProjectId(null);
      } else if (basePath !== '/' && basePath !== '') {
        // Extract slug from remaining path (remove leading slash)
        const slug = basePath.slice(1);
        const project = getProjectBySlug(slug);
        
        if (project) {
          setCurrentPage('project');
          setDisplayedPage('project');
          setCurrentProjectId(project.id);
          setDisplayedProjectId(project.id);
        } else {
          // Invalid project slug, redirect to work
          setCurrentPage('work');
          setDisplayedPage('work');
          setCurrentProjectId(null);
          setDisplayedProjectId(null);
        }
      } else {
        // Default to work page
        setCurrentPage('work');
        setDisplayedPage('work');
        setCurrentProjectId(null);
        setDisplayedProjectId(null);
      }
    };

    // Parse initial URL
    parseURL();

    // Listen for browser back/forward events
    const handlePopState = () => {
      parseURL();
    };

    window.addEventListener('popstate', handlePopState);
    
    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  // Helper function to get current locale from URL or cookie
  const getCurrentLocale = () => {
    // First check URL
    const path = window.location.pathname;
    const localeMatch = path.match(/^\/(pt|en)/);
    if (localeMatch) {
      return localeMatch[1];
    }
    
    // Fallback to cookie
    const cookieMatch = document.cookie.match(/(?:^|;\s*)lang=(pt|en)(?:;|$)/);
    if (cookieMatch) {
      return cookieMatch[1];
    }
    
    // Default to English
    return 'en';
  };

  const handleNavigate = (page: string, projectId?: number, replaceHistory = false) => {
    // Don't start a new transition if one is already in progress
    if (isTransitioning) return;
    
    // If navigating to the same page, no transition needed
    if (page === currentPage && (!projectId || projectId === currentProjectId)) return;
    
    // Get current locale for URL construction
    const currentLocale = getCurrentLocale();
    
    // Create URL based on page and projectId with locale prefix
    let url = '';
    if (page === 'contact') {
      url = `/${currentLocale}/contact`;
    } else if (page === 'project' && projectId) {
      const project = getProjectById(projectId);
      if (project && project.slug) {
        url = `/${currentLocale}/${project.slug}`;
      } else {
        url = `/${currentLocale}/`; // Fallback to work page if project not found
      }
    } else {
      url = `/${currentLocale}/`; // Default to work page
    }
    
    // Update browser history
    if (replaceHistory) {
      window.history.replaceState({ page, projectId }, '', url);
    } else {
      window.history.pushState({ page, projectId }, '', url);
    }
    
    setIsTransitioning(true);
    setCurrentPage(page);
    
    // Update project ID state
    if (projectId) {
      setCurrentProjectId(projectId);
    } else {
      setCurrentProjectId(null);
    }
    
    // After fade-out completes, change the displayed content and fade back in
    setTimeout(() => {
      setDisplayedPage(page);
      if (projectId) {
        setDisplayedProjectId(projectId);
      } else {
        setDisplayedProjectId(null);
      }
      // Reset scroll position to top when changing pages
      window.scrollTo(0, 0);
      setIsTransitioning(false);
    }, 300); // 300ms for fade-out
  };

  const renderPage = () => {
    switch (displayedPage) {
      case 'work':
        return <WorkPage onNavigate={handleNavigate} />;
      case 'contact':
        return <ContactPage />;
      case 'project':
        return displayedProjectId ? (
          <ProjectPage projectId={displayedProjectId} onNavigate={handleNavigate} />
        ) : (
          <WorkPage onNavigate={handleNavigate} />
        );
      default:
        return <WorkPage onNavigate={handleNavigate} />;
    }
  };

  return (
    <div className="min-h-screen bg-black relative">
      <MetaUpdater />
      <Navigation 
        currentPage={currentPage} 
        onPageChange={handleNavigate} 
        isTransitioning={isTransitioning}
      />
      <div 
        className={`transition-opacity duration-300 ease-out ${
          isTransitioning ? 'opacity-0' : 'opacity-100'
        }`}
      >
        {renderPage()}
      </div>
      
      {/* White fade overlay */}
      <div 
        className={`fixed inset-0 bg-white pointer-events-none z-40 transition-opacity duration-300 ease-out ${
          isTransitioning ? 'opacity-100' : 'opacity-0'
        }`}
      />
    </div>
  );
}