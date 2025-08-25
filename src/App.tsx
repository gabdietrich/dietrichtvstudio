import { useState, useEffect } from 'react';
import Navigation from './components/Navigation';
import WorkPage from './components/WorkPage';
import ContactPage from './components/ContactPage';
import ProjectPage from './components/ProjectPage';

export default function App() {
  const [currentPage, setCurrentPage] = useState('work');
  const [displayedPage, setDisplayedPage] = useState('work');
  const [currentProjectId, setCurrentProjectId] = useState<number | null>(null);
  const [displayedProjectId, setDisplayedProjectId] = useState<number | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Parse URL and set initial state
  useEffect(() => {
    const parseURL = () => {
      const path = window.location.pathname;
      const searchParams = new URLSearchParams(window.location.search);
      
      if (path === '/contact') {
        setCurrentPage('contact');
        setDisplayedPage('contact');
        setCurrentProjectId(null);
        setDisplayedProjectId(null);
      } else if (path === '/project') {
        const projectId = searchParams.get('id');
        if (projectId) {
          setCurrentPage('project');
          setDisplayedPage('project');
          setCurrentProjectId(parseInt(projectId));
          setDisplayedProjectId(parseInt(projectId));
        } else {
          // Invalid project URL, redirect to work
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

  const handleNavigate = (page: string, projectId?: number, replaceHistory = false) => {
    // Don't start a new transition if one is already in progress
    if (isTransitioning) return;
    
    // If navigating to the same page, no transition needed
    if (page === currentPage && (!projectId || projectId === currentProjectId)) return;
    
    // Create URL based on page and projectId
    let url = '';
    if (page === 'contact') {
      url = '/contact';
    } else if (page === 'project' && projectId) {
      url = `/project?id=${projectId}`;
    } else {
      url = '/'; // Default to work page
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