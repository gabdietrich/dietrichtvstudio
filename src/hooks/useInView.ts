import { useEffect, useState, RefObject } from 'react';

interface UseInViewOptions {
  rootMargin?: string;
  threshold?: number | number[];
  triggerOnce?: boolean;
}

export function useInView(
  ref: RefObject<Element>,
  options: UseInViewOptions = {}
): boolean {
  const [inView, setInView] = useState(false);
  const [hasTriggered, setHasTriggered] = useState(false);

  const {
    rootMargin = '200px',
    threshold = 0,
    triggerOnce = true
  } = options;

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    // If triggerOnce and already triggered, don't create new observer
    if (triggerOnce && hasTriggered) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const isIntersecting = entry.isIntersecting;
        setInView(isIntersecting);
        
        if (triggerOnce && isIntersecting) {
          setHasTriggered(true);
        }
      },
      {
        rootMargin,
        threshold,
      }
    );

    observer.observe(element);

    return () => {
      observer.unobserve(element);
    };
  }, [ref, rootMargin, threshold, triggerOnce, hasTriggered]);

  return inView;
}
