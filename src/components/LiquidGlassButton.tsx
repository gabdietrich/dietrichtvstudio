import { useState, useRef } from 'react';

interface LiquidGlassButtonProps {
  onClick?: () => void;
  onDrag?: (x: number, y: number) => void;
  size?: 'default' | 'pill';
  className?: string;
  style?: React.CSSProperties;
}

export default function LiquidGlassButton({ 
  onClick, 
  onDrag, 
  size = 'default',
  className = '',
  style = {}
}: LiquidGlassButtonProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const dragStartPos = useRef({ x: 0, y: 0 });
  const dragThreshold = 6; // pixels

  const sizeClasses = {
    default: 'w-[170px] h-[170px]',
    pill: 'w-[385px] h-[170px]'
  };

  const borderRadius = {
    default: 'rounded-full',
    pill: 'rounded-full' // cornerRadius 100% = full rounding
  };

  const handlePointerDown = (e: React.PointerEvent) => {
    e.preventDefault();
    setIsDragging(true);
    dragStartPos.current = { x: e.clientX, y: e.clientY };
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging) return;
    
    const deltaX = e.clientX - dragStartPos.current.x;
    const deltaY = e.clientY - dragStartPos.current.y;
    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
    
    if (distance > dragThreshold && onDrag) {
      onDrag(e.clientX, e.clientY);
    }
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (!isDragging) return;
    
    const deltaX = e.clientX - dragStartPos.current.x;
    const deltaY = e.clientY - dragStartPos.current.y;
    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
    
    setIsDragging(false);
    (e.target as HTMLElement).releasePointerCapture(e.pointerId);
    
    // If movement is less than threshold, treat as click
    if (distance < dragThreshold && onClick) {
      onClick();
    }
  };

  return (
    <button
      className={`
        ${sizeClasses[size]} 
        ${borderRadius[size]}
        relative overflow-hidden
        cursor-pointer select-none
        transition-all duration-300 ease-out
        transform-gpu
        ${className}
      `}
      style={{
        touchAction: 'none',
        ...style,
        background: `
          radial-gradient(circle at 30% 30%, 
            rgba(255, 255, 255, 0.25) 0%,
            rgba(255, 255, 255, 0.1) 30%,
            rgba(255, 255, 255, 0.05) 60%,
            rgba(255, 255, 255, 0.15) 100%
          )
        `,
        backdropFilter: 'blur(1.8px) saturate(1.8) brightness(1.1)',
        WebkitBackdropFilter: 'blur(1.8px) saturate(1.8) brightness(1.1)',
        border: '1px solid rgba(255, 255, 255, 0.3)',
        borderTop: '2px solid rgba(255, 255, 255, 0.6)',
        borderLeft: '1px solid rgba(255, 255, 255, 0.5)',
        boxShadow: `
          0 12px 40px rgba(0, 0, 0, 0.25),
          inset 0 2px 0 rgba(255, 255, 255, 0.4),
          inset 0 -1px 0 rgba(255, 255, 255, 0.2),
          inset 2px 0 0 rgba(255, 255, 255, 0.3),
          inset -2px 0 0 rgba(255, 255, 255, 0.1)
        `,
        transform: isDragging 
          ? 'scale(1.02) translateY(-2px)' 
          : isHovered 
            ? 'scale(1.01) translateY(-4px)' 
            : 'scale(1)',
      }}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Chromatic aberration layer */}
      <div 
        className={`absolute inset-0 ${borderRadius[size]} pointer-events-none`}
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
          transform: isHovered ? 'rotate(2.4deg) scale(1.01)' : 'rotate(0deg)',
          transition: 'transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
        }}
      />
      
      {/* Refraction distortion layer */}
      <div 
        className={`absolute inset-0 ${borderRadius[size]} pointer-events-none`}
        style={{
          background: `
            radial-gradient(ellipse at 25% 25%,
              rgba(246, 255, 240, 0.1) 0%,
              transparent 50%
            ),
            radial-gradient(ellipse at 75% 75%,
              rgba(246, 255, 240, 0.08) 0%,
              transparent 40%
            )
          `,
          opacity: isHovered ? 0.9 : 0.7,
          transition: 'opacity 0.3s ease-out',
          transform: 'scale(1.02)',
        }}
      />
      
      {/* Fresnel edge highlights */}
      <div 
        className={`absolute inset-0 ${borderRadius[size]} pointer-events-none`}
        style={{
          background: `
            conic-gradient(from 0deg,
              rgba(59, 130, 246, 0.2) 0deg,
              transparent 60deg,
              rgba(16, 185, 129, 0.2) 120deg,
              transparent 180deg,
              rgba(245, 158, 11, 0.2) 240deg,
              transparent 300deg,
              rgba(59, 130, 246, 0.2) 360deg
            )
          `,
          mask: 'linear-gradient(45deg, transparent 85%, white 90%, white 95%, transparent 100%)',
          WebkitMask: 'linear-gradient(45deg, transparent 85%, white 90%, white 95%, transparent 100%)',
          opacity: isHovered ? 0.6 : 0.3,
          transform: `rotate(${isHovered ? '10deg' : '0deg'})`,
          transition: 'all 1.5s cubic-bezier(0.4, 0, 0.2, 1)',
        }}
      />
      
      {/* Specular highlight */}
      <div 
        className={`absolute inset-0 ${borderRadius[size]} pointer-events-none`}
        style={{
          background: `
            linear-gradient(135deg, 
              rgba(255, 255, 255, 0.4) 0%,
              rgba(255, 255, 255, 0.2) 20%,
              transparent 40%,
              transparent 60%,
              rgba(255, 255, 255, 0.1) 80%,
              rgba(255, 255, 255, 0.3) 100%
            )
          `,
          opacity: isHovered ? 0.8 : 0.5,
          transform: `translateX(${isHovered ? '3px' : '0px'}) translateY(${isHovered ? '-3px' : '0px'})`,
          transition: 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
        }}
      />
      
      {/* Floating animation */}
      <div 
        className={`absolute inset-0 ${borderRadius[size]} pointer-events-none`}
        style={{
          animation: 'liquid-glass-float 4s ease-in-out infinite',
        }}
      />
    </button>
  );
}