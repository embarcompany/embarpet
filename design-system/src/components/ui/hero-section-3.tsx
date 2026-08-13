"use client";

import * as React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { cn } from "../../lib/utils";

interface ScrollFlyInProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  imageUrl: string;
  imageAlt?: string;
}

/* Implementação literal do componente ScrollFlyIn fornecido como referência. */
const ScrollFlyIn = React.forwardRef<HTMLDivElement, ScrollFlyInProps>(({ children, imageUrl, imageAlt = "Animated image", className, ...props }, ref) => {
  const targetRef = React.useRef<HTMLDivElement>(null);
  const screenWidth = window.innerWidth;
  const { scrollYProgress } = useScroll({ target: targetRef, offset: ["start end", "end start"] });
  const x = useTransform(scrollYProgress, [0.1, 0.8], [`-${5 * screenWidth}px`, `${2.5 * screenWidth}px`]);
  const opacity = useTransform(scrollYProgress, [0.1, 0.25, 0.7, 0.8], [0, 1, 1, 0]);

  return <div ref={targetRef} className={cn("relative h-[200vh]", className)} {...props}>
    <div ref={ref} className="sticky top-0 flex h-screen items-center justify-center">
      <div className="z-10 text-center">{children}</div>
      <motion.div style={{ x, opacity }} className="pointer-events-none absolute left-0 top-0 z-20 flex h-full w-full items-center">
        <img src={imageUrl} alt={imageAlt} className="h-auto w-auto max-w-none" />
      </motion.div>
    </div>
  </div>;
});

ScrollFlyIn.displayName = "ScrollFlyIn";
export { ScrollFlyIn };
