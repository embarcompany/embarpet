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
 * - Desktop: Ativa o Lenis com inércia de 1.2s para suavidade contínua sem saltos secos.
 * - Mobile / Touch: Desligado deliberadamente para usar o scroll nativo responsivo sem atraso.
 * - Links de âncora (#secao): Interceptados e rolados com offset de 80px (para não cobrir o header).
 */
export function SmoothScroll() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    // 1. Detectar dispositivos touch / mobile para desligar o Lenis e usar scroll nativo
    const isTouchDevice =
      window.matchMedia("(pointer: coarse)").matches ||
      "ontouchstart" in window ||
      navigator.maxTouchPoints > 0;

    if (isTouchDevice) {
      // No mobile, apenas mantemos o scroll nativo
      return;
    }

    // 2. Inicializar o Lenis para Desktop
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Curva exponencial suave
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.5,
      infinite: false,
    });

    window.__lenis = lenis;

    // 3. RequestAnimationFrame loop
    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    // 4. Interceptar links de âncoras para rolagem suave com offset
    const handleAnchorClick = (event: MouseEvent) => {
      const target = (event.target as HTMLElement).closest("a");
      if (!target) return;

      const href = target.getAttribute("href");
      if (href && href.startsWith("#") && href.length > 1) {
        const id = href.slice(1);
        const element = document.getElementById(id) || document.querySelector(href);
        if (element) {
          event.preventDefault();

          // Offset de 80px para compensar a barra de navegação fixa (header)
          const offset = -80;

          lenis.scrollTo(element as HTMLElement, {
            offset,
            duration: 1.2,
            immediate: false,
          });

          if (window.history.pushState) {
            window.history.pushState(null, "", href);
          }
        }
      }
    };

    document.addEventListener("click", handleAnchorClick);

    return () => {
      document.removeEventListener("click", handleAnchorClick);
      cancelAnimationFrame(rafId);
      lenis.destroy();
      delete window.__lenis;
    };
  }, []);

  return null;
}

/** Helper para rolar programaticamente até uma seção usando Lenis ou nativo */
export function scrollToSection(selectorOrElement: string | HTMLElement, offset = -80) {
  if (typeof window === "undefined") return;

  if (window.__lenis) {
    window.__lenis.scrollTo(selectorOrElement, { offset, duration: 1.2 });
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
