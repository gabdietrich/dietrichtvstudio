import { useState } from 'react';
import ImageCard from './ImageCard';

interface VerticalCarouselProps {
  images: string[];
}

export default function VerticalCarousel({ images }: VerticalCarouselProps) {
  // Triple the images for seamless loop
  const tripleImages = [...images, ...images, ...images];

  return (
    <div className="w-full overflow-hidden mb-12 h-[400px] md:h-[600px]">
      <div 
        className="animate-scroll-continuous-vertical"
        style={{ 
          height: `${tripleImages.length * 100}%`,
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        {tripleImages.map((imageSrc, index) => {
          const imageKey = `${imageSrc}-${index}`;
          const isHero = index === 0; // First image is hero (LCP)
          
          return (
            <div 
              key={imageKey}
              className="w-full overflow-hidden"
              style={{ 
                height: `${100 / tripleImages.length}%`,
                flexShrink: 0
              }}
            >
              <ImageCard
                src={imageSrc}
                alt={`Carousel image ${index + 1}`}
                className="w-full h-full"
                isHero={isHero}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}