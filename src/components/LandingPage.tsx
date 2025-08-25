import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import newLogo from 'figma:asset/9849fdebf60cdadde6f1fd25b04cc944f5a30323.png';
import GlassyButton from './GlassyButton';
import LiquidGlassButton from './LiquidGlassButton';
import LogoOverlay from './LogoOverlay';

interface LandingPageProps {
  onNavigate?: (page: string) => void;
}

export default function LandingPage({ onNavigate }: LandingPageProps) {
  const { t } = useTranslation();
  // Background images list
  const backgroundImages = [
    'https://player.vimeo.com/video/1039858737?h=767ab0b596&autoplay=1&loop=1&muted=1&background=1&controls=0&title=0&byline=0&portrait=0', // Original Vimeo
    'https://images.unsplash.com/photo-1750610546688-64ff8b75da69?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaW5lbWF0aWMlMjBkYXJrJTIwbW9vZHl8ZW58MXx8fHwxNzU2MTQ3MzYxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    'https://images.unsplash.com/photo-1659039610441-1703a2a2806b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhYnN0cmFjdCUyMGRhcmslMjBncmFkaWVudHxlbnwxfHx8fDE3NTYxNDczNjF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    'https://images.unsplash.com/photo-1559318586-af0532d03c8e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1cmJhbiUyMG5pZ2h0JTIwbGlnaHRzfGVufDF8fHx8MTc1NjE0NzM2MXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    'https://images.unsplash.com/photo-1623916400613-6c13fa2f52a1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaW5pbWFsaXN0JTIwZGFyayUyMHRleHR1cmV8ZW58MXx8fHwxNzU2MTQ3MzYyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    'https://images.unsplash.com/photo-1612774837451-d83477dde707?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxub2lyJTIwYXRtb3NwaGVyZSUyMG1vb2R5fGVufDF8fHx8MTc1NjE0NzM2MXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    'https://images.unsplash.com/photo-1705147651064-36aedc005020?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYXJrJTIwY2luZW1hdGljJTIwbGFuZHNjYXBlfGVufDF8fHx8MTc1NjE0NzM2MXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
  ];

  const [currentBackgroundIndex, setCurrentBackgroundIndex] = useState(0);
  const [liquidGlassPosition, setLiquidGlassPosition] = useState({ x: 720, y: 300 }); // Center position
  const [logoPosition, setLogoPosition] = useState({ x: 720, y: 300 });

  const handleViewWork = () => {
    if (onNavigate) {
      onNavigate('work');
    }
  };

  const handleLiquidGlassClick = () => {
    const nextIndex = (currentBackgroundIndex + 1) % backgroundImages.length;
    setCurrentBackgroundIndex(nextIndex);
  };

  const handleLiquidGlassDrag = (x: number, y: number) => {
    setLiquidGlassPosition({ x, y });
    setLogoPosition({ x, y });
  };

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden" style={{ width: '1440px', height: '900px' }}>
      {/* BackgroundLayer */}
      <div className="absolute inset-0 z-0">
        <div className="w-full h-full bg-gradient-to-br from-gray-900 to-black opacity-40" />
        
        {/* Dynamic Background Content */}
        {currentBackgroundIndex === 0 ? (
          /* Original Vimeo Video */
          <iframe
            src={backgroundImages[0]}
            className="absolute top-1/2 left-1/2 w-screen h-screen transform -translate-x-1/2 -translate-y-1/2 pointer-events-none"
            style={{
              minWidth: '100vw',
              minHeight: '100vh',
              width: '177.77vh', // 16:9 aspect ratio
              height: '56.25vw'   // 16:9 aspect ratio
            }}
            frameBorder="0"
            allow="autoplay; fullscreen"
            title={t('ui.backgroundVideo')}
          />
        ) : (
          /* Background Images */
          <img
            src={backgroundImages[currentBackgroundIndex]}
            alt={t('ui.background')}
            className="absolute inset-0 w-full h-full object-cover"
            style={{ objectPosition: 'center' }}
          />
        )}
      </div>

      {/* Content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen px-[15px]">
        <div className="max-w-4xl mx-auto text-center">
          {/* Giant Glassy Button with Logo - UNCHANGED */}
          <div className="flex items-center justify-center mb-16">
            <GlassyButton 
              size="xl"
              onClick={handleViewWork}
              logoSrc={newLogo}
              logoAlt={t('navigation.logoAlt')}
            />
          </div>

          {/* Call to Action - UNCHANGED */}
          <div className="mt-16">
            <button 
              onClick={handleViewWork}
              className="text-white/80 hover:text-white text-lg border-b border-white/30 hover:border-white pb-1 transition-colors"
            >
{t('common.viewOurWork')}
            </button>
          </div>
        </div>
      </div>

      {/* LiquidGlassButton Layer - NEW */}
      <div className="absolute z-20" style={{ left: liquidGlassPosition.x - 85, top: liquidGlassPosition.y - 85 }}>
        <LiquidGlassButton
          onClick={handleLiquidGlassClick}
          onDrag={handleLiquidGlassDrag}
          size="default"
        />
      </div>

      {/* Optional Pill Variant - Uncomment to use */}
      {/* 
      <div className="absolute z-20" style={{ left: liquidGlassPosition.x - 192.5, top: liquidGlassPosition.y - 85 }}>
        <LiquidGlassButton
          onClick={handleLiquidGlassClick}
          onDrag={handleLiquidGlassDrag}
          size="pill"
        />
      </div>
      */}

      {/* LogoOverlayPNG Layer - NEW */}
      <LogoOverlay
        logoSrc={newLogo}
        logoAlt={t('navigation.logoAlt')}
        buttonSize="default"
        x={logoPosition.x}
        y={logoPosition.y}
      />
    </div>
  );
}