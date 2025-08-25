import { useState, useRef, useEffect } from 'react';
import { Button } from "./ui/button";
import AutoScrollCarousel from './AutoScrollCarousel';

const categories = ['all', 'commercial', 'a.i.', 'beauty', 'documentary', 'music video'];

// Mock data with project content
const mockWorks = [
  {
    id: 1,
    title: "Grand Soir, by Maison Francis Kurkdjian",
    category: "beauty commercial",
    description: "Grand Soir, by Maison Francis Kurkdjian. A spec film crafted entirely with artificial intelligence. 100% AI-made",
    client: "Maison Francis Kurkdjian",
    videos: [
      { 
        id: 1, 
        thumbnail: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='480' height='480' viewBox='0 0 480 480'%3E%3Crect width='480' height='480' fill='%23f3f4f6'/%3E%3C/svg%3E", 
        title: "Scene 1"
      },
      { 
        id: 2, 
        thumbnail: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='480' height='480' viewBox='0 0 480 480'%3E%3Crect width='480' height='480' fill='%23f3f4f6'/%3E%3C/svg%3E", 
        title: "Scene 2"
      },
      { 
        id: 3, 
        thumbnail: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='480' height='480' viewBox='0 0 480 480'%3E%3Crect width='480' height='480' fill='%23f3f4f6'/%3E%3C/svg%3E", 
        title: "Scene 3"
      }
    ]
  },
  {
    id: 2,
    title: "Ernesto Neto for Le Bon Marché Rive Gauche",
    category: "documentary",
    description: "Capturing the artist before and after the exhibition. Where brand and art meet through cinema.",
    client: "Le Bon Marché Rive Gauche",
    videos: [
      { 
        id: 4, 
        thumbnail: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='480' height='480' viewBox='0 0 480 480'%3E%3Crect width='480' height='480' fill='%23f3f4f6'/%3E%3C/svg%3E", 
        title: "Scene 1"
      },
      { 
        id: 5, 
        thumbnail: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='480' height='480' viewBox='0 0 480 480'%3E%3Crect width='480' height='480' fill='%23f3f4f6'/%3E%3C/svg%3E", 
        title: "Scene 2"
      },
      { 
        id: 6, 
        thumbnail: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='480' height='480' viewBox='0 0 480 480'%3E%3Crect width='480' height='480' fill='%23f3f4f6'/%3E%3C/svg%3E", 
        title: "Scene 3"
      }
    ]
  },
  {
    id: 3,
    title: "Three Short Films",
    category: "music video",
    description: "Three short films with Manu Gavassi, blending fashion, music, and cinema. A trilogy that explores image as performance and persona.",
    client: "Manu Gavassi",
    videos: [
      { 
        id: 7, 
        thumbnail: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='480' height='480' viewBox='0 0 480 480'%3E%3Crect width='480' height='480' fill='%23f3f4f6'/%3E%3C/svg%3E", 
        title: "Film 1"
      },
      { 
        id: 8, 
        thumbnail: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='480' height='480' viewBox='0 0 480 480'%3E%3Crect width='480' height='480' fill='%23f3f4f6'/%3E%3C/svg%3E", 
        title: "Film 2"
      },
      { 
        id: 9, 
        thumbnail: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='480' height='480' viewBox='0 0 480 480'%3E%3Crect width='480' height='480' fill='%23f3f4f6'/%3E%3C/svg%3E", 
        title: "Film 3"
      }
    ]
  },
  {
    id: 4,
    title: "Elsa Schiaparelli's Private Album",
    category: "documentary",
    description: "Elsa Schiaparelli remembered through an animated short film. A dialogue between fashion, memory, and the cosmos.",
    client: "Biblioteca Mário de Andrade",
    videos: [
      { 
        id: 10, 
        thumbnail: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='480' height='480' viewBox='0 0 480 480'%3E%3Crect width='480' height='480' fill='%23f3f4f6'/%3E%3C/svg%3E", 
        title: "Scene 1"
      },
      { 
        id: 11, 
        thumbnail: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='480' height='480' viewBox='0 0 480 480'%3E%3Crect width='480' height='480' fill='%23f3f4f6'/%3E%3C/svg%3E", 
        title: "Scene 2"
      },
      { 
        id: 12, 
        thumbnail: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='480' height='480' viewBox='0 0 480 480'%3E%3Crect width='480' height='480' fill='%23f3f4f6'/%3E%3C/svg%3E", 
        title: "Scene 3"
      }
    ]
  },
  {
    id: 5,
    title: "Gisele Bündchen and Cauã Raymond",
    category: "commercial",
    description: "A cinematic launch set to Jorge Ben Jor's classic Lá Vem Ela.",
    client: "Democrata",
    videos: [
      { 
        id: 13, 
        thumbnail: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='480' height='480' viewBox='0 0 480 480'%3E%3Crect width='480' height='480' fill='%23f3f4f6'/%3E%3C/svg%3E", 
        title: "Scene 1"
      },
      { 
        id: 14, 
        thumbnail: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='480' height='480' viewBox='0 0 480 480'%3E%3Crect width='480' height='480' fill='%23f3f4f6'/%3E%3C/svg%3E", 
        title: "Scene 2"
      },
      { 
        id: 15, 
        thumbnail: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='480' height='480' viewBox='0 0 480 480'%3E%3Crect width='480' height='480' fill='%23f3f4f6'/%3E%3C/svg%3E", 
        title: "Scene 3"
      }
    ]
  },
  {
    id: 6,
    title: "Mother's Day '25",
    category: "commercial",
    description: "Sasha, Bruna Marquezine, Xuxa and Neide — a celebration of generations and love.",
    client: "Hering",
    videos: [
      { 
        id: 16, 
        thumbnail: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='480' height='480' viewBox='0 0 480 480'%3E%3Crect width='480' height='480' fill='%23f3f4f6'/%3E%3C/svg%3E", 
        title: "Scene 1"
      },
      { 
        id: 17, 
        thumbnail: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='480' height='480' viewBox='0 0 480 480'%3E%3Crect width='480' height='480' fill='%23f3f4f6'/%3E%3C/svg%3E", 
        title: "Scene 2"
      },
      { 
        id: 18, 
        thumbnail: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='480' height='480' viewBox='0 0 480 480'%3E%3Crect width='480' height='480' fill='%23f3f4f6'/%3E%3C/svg%3E", 
        title: "Scene 3"
      }
    ]
  },
  {
    id: 7,
    title: "Il Neige Rive Gauche",
    category: "commercial",
    description: "An animated winter tale for Le Bon Marché, where Paris becomes poetry.",
    client: "Le Bon Marché Rive Gauche",
    videos: [
      { 
        id: 19, 
        thumbnail: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='480' height='480' viewBox='0 0 480 480'%3E%3Crect width='480' height='480' fill='%23f3f4f6'/%3E%3C/svg%3E", 
        title: "Scene 1"
      },
      { 
        id: 20, 
        thumbnail: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='480' height='480' viewBox='0 0 480 480'%3E%3Crect width='480' height='480' fill='%23f3f4f6'/%3E%3C/svg%3E", 
        title: "Scene 2"
      },
      { 
        id: 21, 
        thumbnail: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='480' height='480' viewBox='0 0 480 480'%3E%3Crect width='480' height='480' fill='%23f3f4f6'/%3E%3C/svg%3E", 
        title: "Scene 3"
      }
    ]
  },
  {
    id: 8,
    title: "Desejo",
    category: "beauty commercial",
    description: "A sensorial film where intimacy, fragrance, and memory intertwine.",
    client: "Natura",
    videos: [
      { 
        id: 22, 
        thumbnail: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='480' height='480' viewBox='0 0 480 480'%3E%3Crect width='480' height='480' fill='%23f3f4f6'/%3E%3C/svg%3E", 
        title: "Scene 1"
      },
      { 
        id: 23, 
        thumbnail: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='480' height='480' viewBox='0 0 480 480'%3E%3Crect width='480' height='480' fill='%23f3f4f6'/%3E%3C/svg%3E", 
        title: "Scene 2"
      },
      { 
        id: 24, 
        thumbnail: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='480' height='480' viewBox='0 0 480 480'%3E%3Crect width='480' height='480' fill='%23f3f4f6'/%3E%3C/svg%3E", 
        title: "Scene 3"
      }
    ]
  },
  {
    id: 9,
    title: "Brilho Lamelar",
    category: "beauty commercial",
    description: "Technology and beauty meet in a film where hair becomes light.",
    client: "TRESemmé",
    videos: [
      { 
        id: 25, 
        thumbnail: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='480' height='480' viewBox='0 0 480 480'%3E%3Crect width='480' height='480' fill='%23f3f4f6'/%3E%3C/svg%3E", 
        title: "Scene 1"
      },
      { 
        id: 26, 
        thumbnail: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='480' height='480' viewBox='0 0 480 480'%3E%3Crect width='480' height='480' fill='%23f3f4f6'/%3E%3C/svg%3E", 
        title: "Scene 2"
      },
      { 
        id: 27, 
        thumbnail: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='480' height='480' viewBox='0 0 480 480'%3E%3Crect width='480' height='480' fill='%23f3f4f6'/%3E%3C/svg%3E", 
        title: "Scene 3"
      }
    ]
  },
  {
    id: 10,
    title: "Gracinha",
    category: "music video",
    description: "A music film that blends pop, fantasy, and cinema. Directed by Dietrich with Manu Gavassi.",
    client: "Manu Gavassi",
    videos: [
      { 
        id: 28, 
        thumbnail: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='480' height='480' viewBox='0 0 480 480'%3E%3Crect width='480' height='480' fill='%23f3f4f6'/%3E%3C/svg%3E", 
        title: "Scene 1"
      },
      { 
        id: 29, 
        thumbnail: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='480' height='480' viewBox='0 0 480 480'%3E%3Crect width='480' height='480' fill='%23f3f4f6'/%3E%3C/svg%3E", 
        title: "Scene 2"
      },
      { 
        id: 30, 
        thumbnail: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='480' height='480' viewBox='0 0 480 480'%3E%3C/svg%3E", 
        title: "Scene 3"
      }
    ]
  },
  {
    id: 11,
    title: "Mother's Day Fernandas",
    category: "commercial",
    description: "Fernanda Torres and Fernanda Montenegro star in an intimate film celebrating motherhood and timeless connection. Directed by Dietrich.",
    client: "Hering",
    videos: [
      { 
        id: 31, 
        thumbnail: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='480' height='480' viewBox='0 0 480 480'%3E%3Crect width='480' height='480' fill='%23f3f4f6'/%3E%3C/svg%3E", 
        title: "Scene 1"
      },
      { 
        id: 32, 
        thumbnail: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='480' height='480' viewBox='0 0 480 480'%3E%3Crect width='480' height='480' fill='%23f3f4f6'/%3E%3C/svg%3E", 
        title: "Scene 2"
      },
      { 
        id: 33, 
        thumbnail: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='480' height='480' viewBox='0 0 480 480'%3E%3Crect width='480' height='480' fill='%23f3f4f6'/%3E%3C/svg%3E", 
        title: "Scene 3"
      }
    ]
  }
];



// Individual project wrapper with fade-in effect
function ProjectWrapper({ work, speed, onNavigate, delay }: {
  work: any;
  speed: number;
  onNavigate?: (page: string, projectId?: number) => void;
  delay: number;
}) {
  const [isVisible, setIsVisible] = useState(false);
  const [shouldFadeIn, setShouldFadeIn] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Reset states when component remounts (category change)
    setIsVisible(false);
    setShouldFadeIn(false);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Add a delay before fading in
          setTimeout(() => {
            setShouldFadeIn(true);
          }, delay);
        }
      },
      {
        threshold: 0.1,
        rootMargin: '50px 0px -50px 0px'
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [delay, work.id]); // Add work.id to dependencies to reset on category change

  return (
    <div 
      ref={ref} 
      className={`transition-opacity duration-700 ease-out ${
        isVisible && shouldFadeIn ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <AutoScrollCarousel
        work={work}
        speed={speed}
        onNavigate={onNavigate}
      />
    </div>
  );
}

interface WorkPageProps {
  onNavigate?: (page: string, projectId?: number) => void;
}

export default function WorkPage({ onNavigate }: WorkPageProps) {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [displayedCategory, setDisplayedCategory] = useState('all');

  const handleCategoryChange = (newCategory: string) => {
    if (newCategory === selectedCategory || isTransitioning) return;
    
    setIsTransitioning(true);
    
    // After fade-out completes, change the category and fade back in
    setTimeout(() => {
      setSelectedCategory(newCategory);
      setDisplayedCategory(newCategory);
      setIsTransitioning(false);
    }, 300); // 300ms for fade-out
  };

  const getWorksByCategory = (category: string) => {
    return category === 'all' 
      ? mockWorks 
      : mockWorks.filter(work => work.category.includes(category));
  };

  const filteredWorks = getWorksByCategory(displayedCategory);

  return (
    <div className="min-h-screen bg-white text-black pt-20">
      <div className="max-w-full py-12">
        {/* Header Section */}
        <div className="max-w-7xl mx-auto px-[15px] mb-16">
          {/* Main statement */}
          <div className="mb-12">
            <h1 className="text-black max-w-4xl text-[48px] leading-[1.0]">
              we are a mixed-media production company based in são paulo brazil - working in the intersection of design, film production & post-production.
            </h1>
          </div>
          
          {/* Another horizontal line */}
          <div className="w-full h-px bg-black mb-8"></div>
          
          {/* Our work title */}
          <div className="mb-6">
            <h2 className="text-black font-['Instrument_Sans'] mb-4 text-[21px] font-normal no-underline">Our Work</h2>
            
            {/* Category Filter */}
            <div className="flex flex-wrap gap-4">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant="ghost"
                  onClick={() => handleCategoryChange(category)}
                  className={`text-base capitalize transition-all duration-200 ${
                    selectedCategory === category
                      ? 'text-black bg-black/5'
                      : 'text-black/70 hover:text-black hover:bg-black/5'
                  } ${isTransitioning ? 'opacity-50 pointer-events-none' : 'opacity-100'}`}
                >
                  {category === 'a.i.' ? 'A.I.' : category === 'music video' ? 'Music Video' : category}
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* Works with Auto-scrolling Videos and Transition Effects */}
        <div 
          className={`space-y-20 transition-opacity duration-300 ease-out ${
            isTransitioning ? 'opacity-0' : 'opacity-100'
          }`}
        >
          {filteredWorks.map((work, index) => (
            <ProjectWrapper
              key={`${displayedCategory}-${work.id}`} // Include category in key to force re-render
              work={work}
              speed={15 + (index * 3)} // Slower speeds for visual interest
              onNavigate={onNavigate}
              delay={isTransitioning ? 0 : index * 200} // Faster staggering during transitions, none during category change
            />
          ))}
        </div>

        {/* Bottom section with statistics and contact */}
        <div className="max-w-7xl mx-auto mt-20 px-[15px]">
          {/* Statistics section */}
          <div className="mb-20">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
              {/* Left column - Statement */}
              <div>
                <p className="text-black text-base">
                  We transform ideas into images that resonate across cultures.
                </p>
              </div>
              
              {/* Right column - Statistics */}
              <div className="space-y-12">
                {/* 15+ */}
                <div>
                  <div className="text-8xl md:text-9xl text-black mb-2 font-['Instrument_Sans'] leading-none">15+</div>
                  <div className="text-black text-sm max-w-xs">
                    Years of experience combining cinema, design and technology.
                  </div>
                </div>
                
                {/* 5 */}
                <div className="border-t border-black pt-8">
                  <div className="text-8xl md:text-9xl text-black mb-2 font-['Instrument_Sans'] leading-none">5</div>
                  <div className="text-black text-sm max-w-xs">
                    Continents where our films were exhibited or produced.
                  </div>
                </div>
                
                {/* 1 */}
                <div className="border-t border-black pt-8">
                  <div className="text-8xl md:text-9xl text-black mb-2 font-['Instrument_Sans'] leading-none">1</div>
                  <div className="text-black text-sm max-w-xs">
                    Pioneering studio in Brazil integrating AI as a creative language.
                  </div>
                </div>
                
                {/* About link */}
                <div className="pt-8">
                  <button 
                    className="text-black text-sm hover:opacity-70 transition-opacity flex items-center gap-1"
                    onClick={() => onNavigate?.('contact')}
                  >
                    About
                    <span className="text-xs">→</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          {/* Horizontal line */}
          <div className="w-full h-px bg-black mb-8"></div>
          
          {/* Connect text */}
          <div className="mb-8">
            <p className="text-black text-base">
              Connect with us to create your next project.
            </p>
          </div>
          
          {/* Horizontal line */}
          <div className="w-full h-px bg-black mb-12"></div>
          
          {/* Contact information */}
          <div className="mb-20">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {/* Office */}
              <div>
                <div className="text-xs text-black uppercase tracking-wide mb-4">OFFICE</div>
                <div className="space-y-1 text-sm text-black">
                  <div>Rua Lira, 151 - Sala 12 - Vila Madalena</div>
                  <div>São Paulo - Brazil</div>
                  <div>05443-060</div>
                </div>
              </div>
              
              {/* Social */}
              <div>
                <div className="text-xs text-black uppercase tracking-wide mb-4">SOCIAL</div>
                <div className="space-y-1 text-sm text-black">
                  <div className="cursor-pointer hover:opacity-70 transition-opacity underline">Instagram</div>
                  <div className="cursor-pointer hover:opacity-70 transition-opacity underline">Behance</div>
                  <div className="cursor-pointer hover:opacity-70 transition-opacity underline">LinkedIn</div>
                </div>
              </div>
              
              {/* Contact */}
              <div>
                <div className="text-xs text-black uppercase tracking-wide mb-4">CONTACT</div>
                <div className="space-y-1 text-sm text-black">
                  <div className="cursor-pointer hover:opacity-70 transition-opacity">+55 11 99306 8428</div>
                  <div className="cursor-pointer hover:opacity-70 transition-opacity underline">contact@dietrich.tv</div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Large logo */}
          <div className="text-center">
            <div className="text-5xl md:text-6xl lg:text-8xl text-black font-['Instrument_Sans']">
              dietrich.tv studio
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}