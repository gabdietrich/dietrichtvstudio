import { Button } from "./ui/button";

interface NavigationProps {
  currentPage: string;
  onPageChange: (page: string) => void;
  isTransitioning?: boolean;
}

export default function Navigation({ currentPage, onPageChange, isTransitioning = false }: NavigationProps) {
  const pages = [
    { id: 'contact', label: 'Contact' }
  ];

  const isWorkPage = currentPage === 'work';
  
  // Logo click logic: always go to work page (home)
  const handleLogoClick = () => {
    onPageChange('work');
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 backdrop-blur-xl border-b transition-all duration-300 ${
      isWorkPage 
        ? 'bg-white/70 border-black'
        : 'bg-white/70 border-black' 
    }`}>
      {/* Glass effect overlay */}
      <div className={`absolute inset-0 ${
        isWorkPage
          ? 'bg-gradient-to-b from-white/20 to-transparent'
          : 'bg-gradient-to-b from-white/20 to-transparent'
      }`}></div>
      
      <div className="relative max-w-7xl mx-auto px-[15px] py-4">
        <div className="flex items-center justify-between">
          <button
            onClick={handleLogoClick}
            disabled={isTransitioning}
            className={`text-lg font-medium transition-all duration-200 hover:opacity-80 font-['Instrument_Sans'] ${
              isWorkPage ? 'text-black' : 'text-black'
            } ${isTransitioning ? 'opacity-50 pointer-events-none' : 'opacity-100'}`}
          >
            dietrich.tv studio
          </button>
          <div className="flex gap-8">
            {pages.map((page) => (
              <Button
                key={page.id}
                variant="ghost"
                onClick={() => onPageChange(page.id)}
                className={`text-base transition-all duration-200 ${
                  isWorkPage
                    ? currentPage === page.id 
                      ? 'text-black hover:text-black' 
                      : 'text-black/70 hover:text-black'
                    : currentPage === page.id 
                      ? 'text-black hover:text-black' 
                      : 'text-black/70 hover:text-black'
                } ${isTransitioning ? 'opacity-50 pointer-events-none' : 'opacity-100'}`}
              >
                {page.label}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}