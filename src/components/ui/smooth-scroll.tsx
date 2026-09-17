"use client";

import { useEffect } from "react";
import Lenis from "lenis";

declare global {
  interface Window {
    __lenis?: Lenis;
  }
}

/**
 * Componente de Scroll em Duas Camadas:
 * - Desktop: Ativa o Lenis com lerp (0.075) e inércia física (efeito carro deslizando e freiando suavemente).
 * - Mobile / Touch nativo: syncTouch = false permite que o toque no dedo seja 100% nativo e sem latência.
 * - Links de âncora (#secao): Interceptados e rolados com offset de -80px para não cobrir o header fixo.
 */
export function SmoothScroll() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    // Desativa apenas em telas pequenas mobile se for exclusivamente touch
    const isMobileScreen = window.innerWidth <= 768 && window.matchMedia("(pointer: coarse)").matches;
    if (isMobileScreen) {
      return;
    }

    // Inicializar o Lenis com inércia e curva de frenagem progressiva (1.2s como um carro desacelerando)
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.0,
      syncTouch: false, // Mantém o toque nativo em telas touch
    });

    window.__lenis = lenis;

    // Conectar ao RequestAnimationFrame
    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    // Interceptar cliques em links âncoras para rolagem suave com offset do header
    const handleAnchorClick = (event: MouseEvent) => {
      const target = (event.target as HTMLElement).closest("a");
      if (!target) return;

      const href = target.getAttribute("href");
      if (href && href.startsWith("#") && href.length > 1) {
        const id = href.slice(1);
        const element = document.getElementById(id) || document.querySelector(href);
        if (element) {
          event.preventDefault();
          const offset = -80; // Compensação da barra de navegação superior

          lenis.scrollTo(element as HTMLElement, {
            offset,
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          });

          if (window.history.pushState) {
            window.history.pushState(null, "", href);
          }
        }
      }
    };

    document.addEventListener("click", handleAnchorClick, { capture: true });

    return () => {
      document.removeEventListener("click", handleAnchorClick, { capture: true });
      cancelAnimationFrame(rafId);
      lenis.destroy();
      delete window.__lenis;
    };
  }, []);

  return null;
}

export function scrollToSection(selectorOrElement: string | HTMLElement, offset = -80) {
  if (typeof window === "undefined") return;

  if (window.__lenis) {
    window.__lenis.scrollTo(selectorOrElement, {
      offset,
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });
  } else {
    const el =
      typeof selectorOrElement === "string"
        ? document.querySelector(selectorOrElement)
        : selectorOrElement;
    if (el) {
      const y = el.getBoundingClientRect().top + window.scrollY + offset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  }
}
