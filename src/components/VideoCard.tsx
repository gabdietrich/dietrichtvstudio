import React, { useRef, useState, useCallback } from 'react';
import { useInView } from '../hooks/useInView';
import { gatedLoad } from '../utils/loadingQueue';

interface VideoSource {
  src: string;
  type: string;
}

interface VideoCardProps {
  poster: string;
  sources: VideoSource[];
  className?: string;
  title?: string;
  autoPlay?: boolean;
  loop?: boolean;
  muted?: boolean;
  playsInline?: boolean;
  isHero?: boolean; // For LCP optimization
  onClick?: () => void;
}

export default function VideoCard({
  poster,
  sources,
  className = '',
  title = '',
  autoPlay = true,
  loop = true,
  muted = true,
  playsInline = true,
  isHero = false,
  onClick
}: VideoCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const inView = useInView(ref, { rootMargin: '200px', triggerOnce: true });
  const [canPlay, setCanPlay] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  const handleCanPlay = useCallback(async () => {
    if (isHero) {
      // Hero video gets priority, no gating
      setCanPlay(true);
    } else {
      // Other videos go through the loading queue
      await gatedLoad(async () => {
        setCanPlay(true);
      });
    }
  }, [isHero]);

  const handleLoadedData = useCallback(() => {
    setVideoLoaded(true);
  }, []);

  const handleError = useCallback(() => {
    setHasError(true);
  }, []);

  const shouldShowVideo = inView || isHero; // Hero videos should start loading immediately

  return (
    <div 
      ref={ref} 
      className={`video-card relative ${className}`}
      onClick={onClick}
    >
      {shouldShowVideo ? (
        <>
          {/* Poster background for immediate display */}
          <img
            src={poster}
            alt={title}
            className="absolute inset-0 w-full h-full object-cover"
            style={{
              opacity: hasError || !videoLoaded ? 1 : 0,
              transition: 'opacity 0.3s ease-out'
            }}
          />
          
          {/* Video that fades in on canPlay */}
          {!hasError && (
            <video
              ref={videoRef}
              autoPlay={autoPlay}
              loop={loop}
              muted={muted}
              playsInline={playsInline}
              preload={isHero ? "auto" : "metadata"}
              poster={poster}
              className="w-full h-full object-cover"
              onCanPlay={handleCanPlay}
              onLoadedData={handleLoadedData}
              onError={handleError}
              style={{
                opacity: canPlay && videoLoaded ? 1 : 0,
                transition: 'opacity 0.3s ease-out'
              }}
            >
              {sources.map((source, index) => (
                <source 
                  key={index}
                  src={source.src} 
                  type={source.type} 
                />
              ))}
              {/* Fallback text */}
              Your browser does not support the video tag.
            </video>
          )}
        </>
      ) : (
        /* Placeholder/poster while not in view */
        <img
          src={poster}
          alt={title}
          className="w-full h-full object-cover video-poster placeholder"
        />
      )}
    </div>
  );
}
