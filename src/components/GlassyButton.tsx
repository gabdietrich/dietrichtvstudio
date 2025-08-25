import { useState } from 'react';

interface GlassyButtonProps {
  onClick?: () => void;
  children?: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  logoSrc?: string;
  logoAlt?: string;
}

export default function GlassyButton({ onClick, children, size = 'md', logoSrc, logoAlt }: GlassyButtonProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);

  const sizeClasses = {
    sm: 'w-12 h-12',
    md: 'w-16 h-16',
    lg: 'w-20 h-20',
    xl: 'w-80 h-80'
  };

  const textSizeClasses = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
    xl: 'text-6xl'
  };

  const logoSizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-10 h-10',
    xl: 'w-40 h-40'
  };

  return (
    <div className="relative">
      {/* Background refraction layer - creates the iridescent backdrop effect */}
      <div 
        className={`absolute inset-0 rounded-full ${sizeClasses[size]}`}
        style={{
          background: `
            conic-gradient(from 0deg,
              #ff6b6b 0deg,
              #4ecdc4 60deg,
              #45b7d1 120deg,
              #96ceb4 180deg,
              #ffd93d 240deg,
              #ff9ff3 300deg,
              #ff6b6b 360deg
            )
          `,
          filter: 'blur(8px)',
          opacity: 0.7,
          transform: isHovered ? 'scale(1.1) rotate(10deg)' : 'scale(1.05) rotate(0deg)',
          transition: 'all 1s cubic-bezier(0.4, 0, 0.2, 1)',
          animation: 'glass-background-rotate 20s linear infinite',
        }}
      />
      
      {/* Outer luminous border ring */}
      <div 
        className={`absolute inset-0 rounded-full ${sizeClasses[size]}`}
        style={{
          background: `
            conic-gradient(from 0deg,
              rgba(255, 255, 255, 0.9) 0deg,
              rgba(255, 255, 255, 0.6) 90deg,
              rgba(255, 255, 255, 0.4) 180deg,
              rgba(255, 255, 255, 0.6) 270deg,
              rgba(255, 255, 255, 0.9) 360deg
            )
          `,
          padding: '3px',
          borderRadius: '50%',
          filter: 'blur(0.5px)',
          transform: isHovered ? 'scale(1.02)' : 'scale(1)',
          transition: 'all 0.4s ease-out',
        }}
      >
        {/* Inner border ring */}
        <div 
          className="w-full h-full rounded-full"
          style={{
            background: `
              conic-gradient(from 45deg,
                rgba(255, 255, 255, 0.8) 0deg,
                rgba(255, 255, 255, 0.3) 120deg,
                rgba(255, 255, 255, 0.1) 240deg,
                rgba(255, 255, 255, 0.8) 360deg
              )
            `,
            padding: '2px',
            borderRadius: '50%',
          }}
        >
          {/* Main glass surface */}
          <button
            onClick={onClick}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => {
              setIsHovered(false);
              setIsPressed(false);
            }}
            onMouseDown={() => setIsPressed(true)}
            onMouseUp={() => setIsPressed(false)}
            className={`
              w-full h-full rounded-full 
              flex items-center justify-center 
              transition-all duration-300 ease-out
              transform-gpu
              ${textSizeClasses[size]}
              font-['Instrument_Sans']
              text-white/95
              hover:text-white
              focus:outline-none
              cursor-pointer
              select-none
              overflow-hidden
              relative
            `}
            style={{
              background: `
                radial-gradient(circle at 30% 30%, 
                  rgba(255, 255, 255, 0.25) 0%,
                  rgba(255, 255, 255, 0.1) 30%,
                  rgba(255, 255, 255, 0.05) 60%,
                  rgba(255, 255, 255, 0.15) 100%
                )
              `,
              backdropFilter: 'blur(2px) saturate(1.8) brightness(1.1)',
              WebkitBackdropFilter: 'blur(2px) saturate(1.8) brightness(1.1)',
              boxShadow: `
                inset 0 1px 0 rgba(255, 255, 255, 0.4),
                inset 0 -1px 0 rgba(255, 255, 255, 0.1),
                inset 1px 0 0 rgba(255, 255, 255, 0.2),
                inset -1px 0 0 rgba(255, 255, 255, 0.2),
                0 8px 32px rgba(0, 0, 0, 0.1)
              `,
              transform: isPressed 
                ? 'scale(0.98) translateY(1px)' 
                : isHovered 
                  ? 'scale(1.01) translateY(-2px)' 
                  : 'scale(1)',
            }}
          >
            {/* Primary refraction layer */}
            <div 
              className="absolute inset-0 rounded-full pointer-events-none"
              style={{
                background: `
                  linear-gradient(135deg, 
                    rgba(255, 255, 255, 0.3) 0%,
                    transparent 30%,
                    transparent 70%,
                    rgba(255, 255, 255, 0.2) 100%
                  )
                `,
                opacity: 0.8,
              }}
            />
            
            {/* Secondary refraction highlights */}
            <div 
              className="absolute inset-0 rounded-full pointer-events-none"
              style={{
                background: `
                  radial-gradient(ellipse at 25% 25%,
                    rgba(255, 255, 255, 0.4) 0%,
                    transparent 50%
                  ),
                  radial-gradient(ellipse at 75% 75%,
                    rgba(255, 255, 255, 0.2) 0%,
                    transparent 40%
                  )
                `,
                opacity: isHovered ? 0.9 : 0.7,
                transition: 'opacity 0.3s ease-out',
              }}
            />
            
            {/* Chromatic aberration subtle effect */}
            <div 
              className="absolute inset-0 rounded-full pointer-events-none"
              style={{
                background: `
                  linear-gradient(45deg,
                    rgba(59, 130, 246, 0.08) 0%,
                    transparent 25%,
                    rgba(16, 185, 129, 0.06) 50%,
                    transparent 75%,
                    rgba(245, 158, 11, 0.08) 100%
                  )
                `,
                transform: isHovered ? 'rotate(5deg) scale(1.02)' : 'rotate(0deg)',
                transition: 'transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
              }}
            />
            
            {/* Content - Logo or Children */}
            <div className="relative z-20 flex items-center justify-center">
              {logoSrc ? (
                <img
                  src={logoSrc}
                  alt={logoAlt || 'Logo'}
                  className={`${logoSizeClasses[size]} object-contain transition-all duration-300`}
                  style={{
                    filter: `
                      brightness(1.1) 
                      contrast(1.1) 
                      saturate(0.95)
                      drop-shadow(0 2px 8px rgba(255, 255, 255, 0.3))
                      drop-shadow(0 1px 4px rgba(255, 255, 255, 0.5))
                    `,
                    transform: isHovered ? 'scale(1.02)' : 'scale(1)',
                  }}
                />
              ) : (
                <span 
                  style={{
                    filter: 'drop-shadow(0 2px 4px rgba(255, 255, 255, 0.5))',
                    textShadow: '0 0 10px rgba(255, 255, 255, 0.5)',
                  }}
                >
                  {children || '→'}
                </span>
              )}
            </div>
          </button>
        </div>
      </div>
      
      {/* Subtle floating animation */}
      <div 
        className="absolute inset-0 rounded-full pointer-events-none"
        style={{
          animation: 'glass-gentle-float 6s ease-in-out infinite',
        }}
      />
    </div>
  );
}