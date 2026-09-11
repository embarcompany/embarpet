import { useEffect, useRef, useState } from "react";

export function useRevealOnce<T extends HTMLElement>(threshold = 0.35) {
  const ref = useRef<T>(null);
  const [isPrepared, setIsPrepared] = useState(false);
  const [isRevealed, setIsRevealed] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element || isPrepared) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      setIsPrepared(true);
      observer.disconnect();
    }, { threshold });

    observer.observe(element);
    return () => observer.disconnect();
  }, [isPrepared, threshold]);

  useEffect(() => {
    if (!isPrepared) return;
    const frame = requestAnimationFrame(() => setIsRevealed(true));
    return () => cancelAnimationFrame(frame);
  }, [isPrepared]);

  return { ref, isPrepared, isRevealed };
}
