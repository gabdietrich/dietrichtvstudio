import { ImageWithFallback } from './figma/ImageWithFallback';
import { useTranslation } from 'react-i18next';

interface LogoOverlayProps {
  logoSrc: string;
  logoAlt?: string;
  buttonSize?: 'default' | 'pill';
  x: number;
  y: number;
  className?: string;
}

export default function LogoOverlay({ 
  logoSrc, 
  logoAlt, 
  buttonSize = 'default',
  x,
  y,
  className = '' 
}: LogoOverlayProps) {
  const { t } = useTranslation();
  // Calculate logo size as 35% of the button's smaller dimension
  const logoSize = {
    default: 170 * 0.35, // 59.5px
    pill: 170 * 0.35 // 59.5px (using height as smaller dimension)
  };

  return (
    <div
      className={`fixed pointer-events-none z-30 transition-all duration-300 ease-out ${className}`}
      style={{
        left: x - logoSize[buttonSize] / 2,
        top: y - logoSize[buttonSize] / 2,
        width: logoSize[buttonSize],
        height: logoSize[buttonSize],
      }}
    >
      <ImageWithFallback
        src={logoSrc}
        alt={logoAlt || t('ui.logo')}
        className="w-full h-full object-contain"
        style={{
          filter: `
            brightness(1.1) 
            contrast(1.1) 
            saturate(0.95)
            drop-shadow(0 2px 8px rgba(255, 255, 255, 0.3))
            drop-shadow(0 1px 4px rgba(255, 255, 255, 0.5))
          `,
        }}
      />
    </div>
  );
}