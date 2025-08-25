import { useState } from 'react';
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

  const handleNavigate = (page: string, projectId?: number) => {
    // Don't start a new transition if one is already in progress
    if (isTransitioning) return;
    
    // If navigating to the same page, no transition needed
    if (page === currentPage && (!projectId || projectId === currentProjectId)) return;
    
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