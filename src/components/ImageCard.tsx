import React, { useRef, useState, useCallback } from 'react';
import { useInView } from '../hooks/useInView';
import { gatedLoad } from '../utils/loadingQueue';

interface ImageCardProps {
  src: string;
  alt: string;
  className?: string;
  isHero?: boolean; // For LCP optimization
  onClick?: () => void;
}

export default function ImageCard({
  src,
  alt,
  className = '',
  isHero = false,
  onClick
}: ImageCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { rootMargin: '200px', triggerOnce: true });
  const [imageLoaded, setImageLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  const handleLoad = useCallback(async () => {
    if (isHero) {
      // Hero image gets priority, no gating
      setImageLoaded(true);
    } else {
      // Other images go through the loading queue
      await gatedLoad(async () => {
        setImageLoaded(true);
      });
    }
  }, [isHero]);

  const handleError = useCallback(() => {
    setHasError(true);
  }, []);

  const shouldShowImage = inView || isHero; // Hero images should start loading immediately

  return (
    <div 
      ref={ref} 
      className={`image-card relative bg-gray-900 ${className}`}
      onClick={onClick}
    >
      {shouldShowImage ? (
        <img
          src={src}
          alt={alt}
          className="w-full h-full object-cover"
          onLoad={handleLoad}
          onError={handleError}
          style={{
            opacity: imageLoaded && !hasError ? 1 : 0,
            transition: 'opacity 0.3s ease-out'
          }}
        />
      ) : (
        /* Placeholder while not in view */
        <div className="w-full h-full bg-gray-200 animate-pulse" />
      )}
      
      {/* Error state */}
      {hasError && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-200 text-gray-500 text-sm">
          Failed to load image
        </div>
      )}
    </div>
  );
}
