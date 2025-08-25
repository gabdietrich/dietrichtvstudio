import { useEffect, useRef, useState } from 'react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface Video {
  id: number;
  thumbnail: string;
  title?: string;
  description?: string;
}

interface Work {
  id: number;
  title: string;
  category: string;
  year: string;
  description: string;
  client?: string;
  videos: Video[];
}

interface AutoScrollCarouselProps {
  work: Work;
  speed?: number;
  onNavigate?: (page: string, projectId?: number) => void;
}

export default function AutoScrollCarousel({ work, speed = 10, onNavigate }: AutoScrollCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [videosLoaded, setVideosLoaded] = useState<Set<string>>(new Set());

  const handleVideoLoad = (videoKey: string) => {
    setVideosLoaded(prev => new Set(prev).add(videoKey));
  };

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    let animationId: number;
    let scrollPosition = 0;

    const animate = () => {
      scrollPosition += speed / 60; // 60fps assumption
      
      if (scrollPosition >= scrollContainer.scrollWidth / 3) {
        scrollPosition = 0;
      }
      
      scrollContainer.scrollLeft = scrollPosition;
      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, [speed]);

  // Triple the videos for seamless loop
  const tripleVideos = [...work.videos, ...work.videos, ...work.videos];

  return (
    <div className="mb-[120px]">
      {/* Scrolling videos first */}
      <div className="overflow-hidden mb-8">
        <div 
          ref={scrollRef}
          className="flex gap-6 overflow-x-hidden px-[15px]"
          style={{ scrollBehavior: 'auto' }}
        >
          {tripleVideos.map((video, index) => {
            const videoKey = `${video.id}-${index}`;
            const isLoaded = videosLoaded.has(videoKey);
            
            return (
              <div 
                key={videoKey}
                className="flex-shrink-0 w-[384px] md:w-[480px]"
              >
                {/* Square video container - non-interactive with sharp corners */}
                <div className="relative aspect-square bg-gray-900 overflow-hidden">
                  <div className={`transition-opacity duration-700 ease-out ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
                    <ImageWithFallback
                      src={video.thumbnail}
                      alt={video.title || work.title}
                      className="w-full h-full object-cover"
                      onLoad={() => handleVideoLoad(videoKey)}
                    />
                    <div className="absolute inset-0 bg-black/10" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Fixed project info in two-column layout */}
      <div className="px-[15px]">
        <div className="flex justify-between items-start">
          {/* Left column - Project info */}
          <div className="space-y-1">
            <div className="text-sm text-gray-500">Project</div>
            <h2 className="text-2xl font-normal text-black font-['Instrument_Sans']">{work.title}</h2>
            {work.client && (
              <p className="text-gray-600 text-sm">by {work.client}</p>
            )}
            <p className="text-gray-600 text-sm">{work.category}</p>
          </div>
          
          {/* Right column - Description and actions */}
          <div className="flex flex-col items-end space-y-4 max-w-md mt-[70px] md:mt-[50px]">
            <p className="text-gray-600 text-sm text-right">
              {work.description}
            </p>
            
            <button 
              onClick={() => onNavigate?.('project', work.id)}
              className="text-gray-700 hover:text-black text-sm transition-colors flex items-center gap-1"
            >
              See Project 
              <span className="text-xs">→</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}