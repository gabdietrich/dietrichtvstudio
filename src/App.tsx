import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import Navigation from './components/Navigation';
import WorkPage, { getProjectBySlug, getProjectById } from './components/WorkPage';
import ContactPage from './components/ContactPage';
import FornecedoresPage from './components/FornecedoresPage';
import ProjectPage from './components/ProjectPage';
import MetaUpdater from './components/MetaUpdater';
import StructuredData from './components/StructuredData';
import { initGA, trackPageView, analytics } from './utils/analytics';
import { slugToCategory, categoryToSlug, isAnyFilterSlug, Locale, CategoryKey } from './utils/categoryUrls';

export default function App() {
  const { i18n } = useTranslation();
  const [currentPage, setCurrentPage] = useState('work');
  const [displayedPage, setDisplayedPage] = useState('work');
  const [currentProjectId, setCurrentProjectId] = useState<number | null>(null);
  const [displayedProjectId, setDisplayedProjectId] = useState<number | null>(null);
  const [currentCategory, setCurrentCategory] = useState<CategoryKey>('all');
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Parse URL and set initial state
  useEffect(() => {
    // Initialize Google Analytics
    initGA();
    
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
        setCurrentCategory('all');
      } else if (basePath === '/fornecedores') {
        setCurrentPage('fornecedores');
        setDisplayedPage('fornecedores');
        setCurrentProjectId(null);
        setDisplayedProjectId(null);
        setCurrentCategory('all');
      } else if (basePath !== '/' && basePath !== '') {
        const slug = basePath.slice(1);

        // First, check if the slug is a category filter (in current locale or any locale)
        const activeLocale: Locale = (locale as Locale) || 'en';
        const filterCategory = slugToCategory(slug, activeLocale) ?? slugToCategory(slug, activeLocale === 'pt' ? 'en' : 'pt');

        if (filterCategory) {
          setCurrentPage('work');
          setDisplayedPage('work');
          setCurrentProjectId(null);
          setDisplayedProjectId(null);
          setCurrentCategory(filterCategory);
        } else {
          const project = getProjectBySlug(slug);

          if (project) {
            setCurrentPage('project');
            setDisplayedPage('project');
            setCurrentProjectId(project.id);
            setDisplayedProjectId(project.id);
            setCurrentCategory('all');
          } else {
            setCurrentPage('work');
            setDisplayedPage('work');
            setCurrentProjectId(null);
            setDisplayedProjectId(null);
            setCurrentCategory('all');
          }
        }
      } else {
        setCurrentPage('work');
        setDisplayedPage('work');
        setCurrentProjectId(null);
        setDisplayedProjectId(null);
        setCurrentCategory('all');
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

  const handleLanguageChange = (lng: string) => {
    // Don't start a new transition if one is already in progress
    if (isTransitioning) return;
    
    // If same language, no transition needed
    if (lng === i18n.language) return;

    // Track language switch
    analytics.switchLanguage(lng, i18n.language);
    
    setIsTransitioning(true);
    
    // After fade-out completes, change the language
    setTimeout(() => {
      // Change the language in i18next
      i18n.changeLanguage(lng);
      
      // Set cookie to persist language choice
      document.cookie = `lang=${lng}; path=/; max-age=${365 * 24 * 60 * 60}`; // 1 year
      
      // Update URL with new locale
      const currentPath = window.location.pathname;
      let newPath = '';
      
      // Check if current path has locale prefix
      const localeMatch = currentPath.match(/^\/(pt|en)(.*)/);
      const previousLocale = (localeMatch?.[1] as Locale) || 'en';
      const remainingPath = (localeMatch ? localeMatch[2] : currentPath) || '/';

      // If the path ends with a filter slug, translate it to the new locale
      const segment = remainingPath.replace(/^\//, '');
      let translatedRemaining = remainingPath === '/' ? '/' : remainingPath;
      if (segment && isAnyFilterSlug(segment)) {
        const category = slugToCategory(segment, previousLocale) ?? slugToCategory(segment, previousLocale === 'pt' ? 'en' : 'pt');
        if (category) {
          const translatedSlug = categoryToSlug(category, lng as Locale);
          translatedRemaining = translatedSlug ? `/${translatedSlug}` : '/';
        }
      }

      newPath = `/${lng}${translatedRemaining === '/' ? '/' : translatedRemaining}`;
      
      // Navigate to new URL
      window.history.pushState({}, '', newPath);
      
      setIsTransitioning(false);
    }, 300); // 300ms for fade-out
  };

  const handleNavigate = (page: string, projectId?: number, replaceHistory = false) => {
    // Don't start a new transition if one is already in progress
    if (isTransitioning) return;
    
    // If navigating to the same page, no transition needed
    if (page === currentPage && (!projectId || projectId === currentProjectId)) return;

    // Track navigation event
    analytics.navigateToPage(page, currentPage);
    
    // Get current locale for URL construction
    const currentLocale = getCurrentLocale();
    
    // Create URL based on page and projectId with locale prefix
    let url = '';
    if (page === 'contact') {
      url = `/${currentLocale}/contact`;
    } else if (page === 'fornecedores') {
      url = `/${currentLocale}/fornecedores`;
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

    // Reset filter when navigating to non-filtered pages or the bare work page
    if (page !== 'work' || !projectId) {
      setCurrentCategory('all');
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

  const handleCategoryChange = (category: CategoryKey) => {
    setCurrentCategory(category);

    const currentLocale = getCurrentLocale() as Locale;
    const slug = categoryToSlug(category, currentLocale);
    const newPath = slug ? `/${currentLocale}/${slug}` : `/${currentLocale}/`;

    if (window.location.pathname !== newPath) {
      window.history.pushState({ page: 'work', category }, '', newPath);
    }
  };

  const renderPage = () => {
    switch (displayedPage) {
      case 'work':
        return (
          <WorkPage
            onNavigate={handleNavigate}
            initialCategory={currentCategory}
            onCategoryChange={handleCategoryChange}
          />
        );
      case 'contact':
        return <ContactPage />;
      case 'fornecedores':
        return <FornecedoresPage />;
      case 'project':
        return displayedProjectId ? (
          <ProjectPage projectId={displayedProjectId} onNavigate={handleNavigate} />
        ) : (
          <WorkPage
            onNavigate={handleNavigate}
            initialCategory={currentCategory}
            onCategoryChange={handleCategoryChange}
          />
        );
      default:
        return (
          <WorkPage
            onNavigate={handleNavigate}
            initialCategory={currentCategory}
            onCategoryChange={handleCategoryChange}
          />
        );
    }
  };

  const getCurrentProjectData = () => {
    if (currentPage === 'project' && currentProjectId) {
      const project = getProjectById(currentProjectId);
      return project ? {
        title: project.title,
        description: project.description
      } : undefined;
    }
    return undefined;
  };

  return (
    <div className="min-h-screen bg-black relative">
      <MetaUpdater 
        page={currentPage as 'work' | 'contact' | 'fornecedores' | 'project'} 
        projectData={getCurrentProjectData()}
      />
      <StructuredData type="organization" />
      <StructuredData type="website" />
      {currentPage === 'project' && currentProjectId && (() => {
        const project = getProjectById(currentProjectId);
        return project ? (
          <StructuredData 
            type="project" 
            data={{
              projectTitle: project.title,
              projectDescription: project.description,
              projectClient: project.client,
              projectType: project.category,
              projectSlug: project.slug
            }}
          />
        ) : null;
      })()}
      <Navigation 
        currentPage={currentPage} 
        onPageChange={handleNavigate} 
        onLanguageChange={handleLanguageChange}
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