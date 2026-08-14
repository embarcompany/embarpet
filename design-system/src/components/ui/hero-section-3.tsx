"use client";

import * as React from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { cn } from "../../lib/utils";

interface ScrollFlyInProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  imageUrl: string;
  imageAlt?: string;
}

/* Implementação literal do componente ScrollFlyIn fornecido como referência. */
const ScrollFlyIn = React.forwardRef<HTMLDivElement, ScrollFlyInProps>(({ children, imageUrl, imageAlt = "Animated image", className, ...props }, ref) => {
  const targetRef = React.useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotate = useMotionValue(0);
  const smoothX = useSpring(x, { stiffness: 85, damping: 20, mass: 0.5 });
  const smoothY = useSpring(y, { stiffness: 85, damping: 20, mass: 0.5 });
  const smoothRotate = useSpring(rotate, { stiffness: 90, damping: 22, mass: 0.45 });

  const trackPointer = (event: React.PointerEvent<HTMLDivElement>) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    const horizontal = (event.clientX - bounds.left) / bounds.width - 0.5;
    const vertical = (event.clientY - bounds.top) / bounds.height - 0.5;
    // O centro do avião parte do meio; o deslocamento ocupa todo o campo útil da CTA.
    x.set(horizontal * Math.max(0, bounds.width - 230));
    y.set(vertical * Math.max(0, bounds.height - 120));
    rotate.set(horizontal * 13 + vertical * 3);
  };

  const resetPlane = () => { x.set(0); y.set(0); rotate.set(0); };

  return <div ref={targetRef} className={cn("relative h-[78vh] min-h-[500px]", className)} onPointerMove={trackPointer} onPointerLeave={resetPlane} {...props}>
    <div ref={ref} className="flex h-full min-h-[500px] items-center justify-center">
      <div className="z-10 text-center">{children}</div>
      <motion.div style={{ x: smoothX, y: smoothY, rotate: smoothRotate }} className="pointer-events-none absolute left-0 top-0 z-0 flex h-full w-full items-center justify-center">
        <img src={imageUrl} alt={imageAlt} className="h-auto w-auto max-w-none" />
      </motion.div>
    </div>
  </div>;
});

ScrollFlyIn.displayName = "ScrollFlyIn";
export { ScrollFlyIn };
