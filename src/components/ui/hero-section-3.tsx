"use client";

import * as React from "react";
import { cn } from "../../lib/utils";

interface ScrollFlyInProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  imageUrl: string;
  imageAlt?: string;
}

/** CTA final com movimento nativo: evita carregar uma biblioteca de animação para um único avião. */
const ScrollFlyIn = React.forwardRef<HTMLDivElement, ScrollFlyInProps>(({ children, imageUrl, imageAlt = "Animated image", className, ...props }, ref) => {
  const planeRef = React.useRef<HTMLDivElement>(null);

  const setPlaneTransform = (x = 0, y = 0, rotate = 0) => {
    if (planeRef.current) planeRef.current.style.transform = `translate3d(${x}px, ${y}px, 0) rotate(${rotate}deg)`;
  };

  const trackPointer = (event: React.PointerEvent<HTMLDivElement>) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    const horizontal = (event.clientX - bounds.left) / bounds.width - 0.5;
    const vertical = (event.clientY - bounds.top) / bounds.height - 0.5;
    setPlaneTransform(horizontal * Math.max(0, bounds.width - 230), vertical * Math.max(0, bounds.height - 120), horizontal * 13 + vertical * 3);
  };

  return <div className={cn("relative h-[78vh] min-h-[500px]", className)} onPointerMove={trackPointer} onPointerLeave={() => setPlaneTransform()} {...props}>
    <div ref={ref} className="flex h-full min-h-[500px] items-center justify-center">
      <div className="z-10 text-center">{children}</div>
      <div ref={planeRef} className="pointer-events-none absolute left-0 top-0 z-0 flex h-full w-full items-center justify-center will-change-transform" style={{ transition: "transform 420ms cubic-bezier(.2,.8,.2,1)" }}>
        <img src={imageUrl} alt={imageAlt} className="h-auto w-auto max-w-none" loading="lazy" decoding="async" />
      </div>
    </div>
  </div>;
});

ScrollFlyIn.displayName = "ScrollFlyIn";
export { ScrollFlyIn };
