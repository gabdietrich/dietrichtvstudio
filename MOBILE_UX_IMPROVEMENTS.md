# Mobile UX Improvements - Progressive Video Loading

## Overview
This update fixes mobile UX by implementing progressive video loading instead of blocking "all-or-nothing" loading gates.

## Key Changes

### 1. ✅ Progressive Loading Components
- **`useInView` hook**: IntersectionObserver-based lazy loading with 200px rootMargin
- **`VideoCard` component**: Progressive video loading with poster → video fade-in
- **`ImageCard` component**: Progressive image loading for vertical carousels
- **Loading queue utility**: Prevents network burst by limiting concurrent loads (max 2)

### 2. ✅ Removed Loading Gates
- **AutoScrollCarousel**: Removed `videosLoaded` state blocking - cards render immediately with posters
- **VerticalCarousel**: Removed `imagesLoaded` state blocking - images render progressively
- **ProjectPage**: Updated "Other Projects" section to use progressive VideoCard

### 3. ✅ Performance Optimizations
- **Hero/LCP priority**: First video in each carousel gets `preload="auto"` and bypasses loading queue
- **Lazy loading**: Other videos use `preload="metadata"` and only start loading when near viewport
- **Staggered loading**: Maximum 2 concurrent video loads to prevent network congestion
- **Poster fallback**: Videos show posters immediately, fade to video on `canPlay`

### 4. ✅ Caching Headers (`public/_headers`)
- **Video files**: `Accept-Ranges: bytes` for seeking, `Cache-Control: public, max-age=31536000, immutable`
- **Images**: Long-term caching for gallery and carousel assets
- **Progressive download**: Enables partial content loading for large videos

## Technical Implementation

### Video Loading Flow
1. **Immediate render**: Poster shows instantly (no loading gate)
2. **Viewport detection**: Video element only mounts when near viewport (200px margin)
3. **Metadata loading**: `preload="metadata"` for non-hero videos
4. **Queued loading**: Staggered through loading semaphore (max 2 concurrent)
5. **Smooth transition**: Fade from poster to video on `canPlay` event

### Mobile Optimizations
- **Separate mobile videos**: Uses `mobileVideoUrl` when available and screen < 768px
- **Touch-friendly**: Maintains existing touch interactions
- **Reduced data usage**: Only loads videos that enter viewport
- **No layout shift**: Consistent poster → video dimensions

## Testing Recommendations

### QA Checklist
- ✅ On 3G/4G throttle: Cards show posters immediately
- ✅ No "blank grid" waiting for all videos
- ✅ Videos fade in independently as ready
- ✅ First video (hero) loads with higher priority
- ✅ Smooth scrolling carousels without frame drops
- ✅ Touch interactions preserved on mobile

### Lighthouse Improvements Expected
- **LCP (Largest Contentful Paint)**: Faster due to immediate poster display
- **CLS (Cumulative Layout Shift)**: Reduced by eliminating loading gates
- **Network payloads**: Reduced unused video downloads
- **Mobile performance**: Better scores due to progressive loading

## Browser Support
- **IntersectionObserver**: Modern browsers (fallback: immediate loading)
- **Video features**: `preload`, `autoplay`, `loop`, `muted`, `playsInline`
- **Range requests**: Requires server support for `Accept-Ranges: bytes`

## Files Modified
- `src/hooks/useInView.ts` - New lazy loading hook
- `src/components/VideoCard.tsx` - New progressive video component
- `src/components/ImageCard.tsx` - New progressive image component
- `src/utils/loadingQueue.ts` - New staggered loading utility
- `src/components/AutoScrollCarousel.tsx` - Updated to use VideoCard
- `src/components/VerticalCarousel.tsx` - Updated to use ImageCard
- `src/components/ProjectPage.tsx` - Updated Other Projects section
- `public/_headers` - New Netlify caching configuration

## Next Steps
- Monitor Lighthouse scores after deployment
- Consider adding WebM/AVIF formats for better compression
- Implement video quality switching based on connection speed
- Add loading progress indicators for slower connections
