import { useState } from 'react';

interface VerticalCarouselProps {
  images: string[];
}

export default function VerticalCarousel({ images }: VerticalCarouselProps) {
  const [imagesLoaded, setImagesLoaded] = useState<Set<string>>(new Set());

  const handleImageLoad = (imageSrc: string) => {
    setImagesLoaded(prev => new Set(prev).add(imageSrc));
  };

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
          const isLoaded = imagesLoaded.has(imageSrc);
          
          return (
            <div 
              key={imageKey}
              className="w-full bg-gray-900 overflow-hidden"
              style={{ 
                height: `${100 / tripleImages.length}%`,
                flexShrink: 0
              }}
            >
              <div className={`transition-opacity duration-700 ease-out w-full h-full ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
                <img
                  src={imageSrc}
                  alt={`Carousel image ${index + 1}`}
                  className="w-full h-full object-cover"
                  onLoad={() => handleImageLoad(imageSrc)}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}