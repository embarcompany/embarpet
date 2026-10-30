"use client";

import { useEffect, useRef, useState } from "react";
import type { PublicLead } from "../../lead-contract";
import { trackConversionEvent } from "../../lib/analytics";
import { WhatsAppChatModal } from "./whatsapp-chat-modal";

export type LeadContext = Omit<PublicLead, "consent">;

const defaultLeadContext: LeadContext = {
  source: "whatsapp_float",
  page: "global",
  origin: "Brasil",
  destination: "Internacional",
  species: "dog",
  size: "medium",
};

/** Helper global para abrir o modal de WhatsApp de qualquer lugar do site */
export function openWhatsAppModal(route?: { origin?: string; destination?: string; period?: string }) {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent("embarp:open-whatsapp", { detail: route }));
  }
}

const BALLOON_TEXT_TAGS = new Set(["P", "H1", "H2", "H3", "H4", "H5", "H6", "BUTTON", "A", "STRONG", "LI", "SPAN"]);

/** Evita que o balão cubra texto/CTAs reais da página: amostra alguns pontos da área onde ele apareceria. */
function regionHasForegroundContent(rect: { left: number; top: number; right: number; bottom: number }): boolean {
  if (typeof document === "undefined") return false;
  const points: Array<[number, number]> = [
    [rect.left + 10, rect.top + 10],
    [(rect.left + rect.right) / 2, (rect.top + rect.bottom) / 2],
    [rect.right - 10, rect.bottom - 10],
    [rect.left + 10, rect.bottom - 10],
  ];
  for (const [x, y] of points) {
    if (x < 0 || y < 0) continue;
    const stack = document.elementsFromPoint(x, y);
    for (const el of stack) {
      if (el.closest(".ep-whatsapp-float")) continue;
      if (BALLOON_TEXT_TAGS.has(el.tagName) && (el.textContent || "").trim().length > 0) return true;
    }
  }
  return false;
}

function getRouteFromLocation(): { origin?: string; destination?: string; period?: string } {
  if (typeof window === "undefined") return {};
  const query = new URLSearchParams(window.location.search);
  const origin = query.get("origin") || undefined;
  const destination = query.get("destination") || undefined;
  const period = query.get("period") || undefined;

  const pathname = window.location.pathname;
  if (pathname.startsWith("/destinos/")) {
    const slug = pathname.replace("/destinos/", "").replace(/\/+$/, "");
    const slugMap: Record<string, string> = {
      "estados-unidos": "Estados Unidos",
      "portugal": "Portugal",
      "espanha": "Espanha",
      "italia": "Itália",
      "franca": "França",
      "alemanha": "Alemanha",
      "reino-unido": "Reino Unido",
      "canada": "Canadá",
      "uruguai": "Uruguai",
      "argentina": "Argentina",
      "chile": "Chile",
      "japao": "Japão",
      "australia": "Austrália",
    };
    return {
      origin: origin || "Brasil",
      destination: destination || slugMap[slug] || slug.replace(/-/g, " "),
      period,
    };
  }

  return { origin, destination, period };
}

export function WhatsAppFloat({
  context = defaultLeadContext,
  onStart,
}: {
  context?: LeadContext;
  onStart?: (context: LeadContext) => void;
}) {
  const [nudgePhase, setNudgePhase] = useState<"hidden" | "typing" | "message">("hidden");
  const [personaRevealed, setPersonaRevealed] = useState(false);
  const [chatModalOpen, setChatModalOpen] = useState(false);
  const triggerWrapRef = useRef<HTMLSpanElement>(null);
  const [activeRoute, setActiveRoute] = useState<{ origin?: string; destination?: string; period?: string }>({
    origin: context.origin,
    destination: context.destination,
    period: context.period,
  });

  useEffect(() => {
    // 1. Contexto inteligente a partir da URL se não estiver explícito
    const routeFromUrl = getRouteFromLocation();
    if (routeFromUrl.origin || routeFromUrl.destination || routeFromUrl.period) {
      setActiveRoute((prev) => ({
        origin: prev.origin || routeFromUrl.origin,
        destination: prev.destination || routeFromUrl.destination,
        period: prev.period || routeFromUrl.period,
      }));
    }

    // 2. Efeito de balão digitando, disparado só ao passar a primeira dobra (nunca por timer).
    let messageTimer: ReturnType<typeof setTimeout> | undefined;
    let autoDismissTimer: ReturnType<typeof setTimeout> | undefined;
    let hasTriggered = false;

    const startTypingSequence = () => {
      if (hasTriggered) return;
      hasTriggered = true;
      setPersonaRevealed(true);
      setNudgePhase("typing");
      messageTimer = setTimeout(() => {
        setNudgePhase("message");
        autoDismissTimer = setTimeout(() => setNudgePhase("hidden"), 11000);
      }, 1400);
    };

    // "A dobra" = uma tela inteira rolada, não só um leve scroll.
    let firstEligibleY: number | null = null;
    let lastCheckAt = 0;
    const revealOnScroll = () => {
      if (window.scrollY <= window.innerHeight) return;
      const now = Date.now();
      if (now - lastCheckAt < 150) return;
      lastCheckAt = now;
      if (firstEligibleY === null) firstEligibleY = window.scrollY;
      // Depois de rolar 2 telas sem achar um ponto livre, mostra mesmo assim (nunca fica em silêncio pra sempre).
      const forceShow = window.scrollY - firstEligibleY > window.innerHeight * 2;
      if (!forceShow) {
        const anchor = triggerWrapRef.current?.getBoundingClientRect();
        if (anchor) {
          const balloonRect = { left: Math.max(4, anchor.left - 292), top: anchor.top - 12, right: anchor.left - 12, bottom: anchor.bottom + 12 };
          if (regionHasForegroundContent(balloonRect)) return;
        }
      }
      startTypingSequence();
      window.removeEventListener("scroll", revealOnScroll);
    };
    window.addEventListener("scroll", revealOnScroll, { passive: true });

    // 3. Ouvir eventos globais de abertura do WhatsApp
    const handleGlobalOpen = (event: Event) => {
      const customEvent = event as CustomEvent<{ origin?: string; destination?: string; period?: string }>;
      const detail = customEvent.detail || {};
      setActiveRoute((prev) => ({
        origin: detail.origin || prev.origin,
        destination: detail.destination || prev.destination,
        period: detail.period || prev.period,
      }));
      setNudgePhase("hidden");
      setChatModalOpen(true);
    };

    const handleAnalysisOpen = (event: Event) => {
      const customEvent = event as CustomEvent<{ origin?: string; destination?: string; period?: string; mode?: string }>;
      if (customEvent.detail?.mode === "whatsapp") {
        handleGlobalOpen(event);
      }
    };

    const handlePopState = () => {
      const isWhatsapp =
        window.location.pathname.endsWith("/whatsapp") ||
        (window.location.search.includes("mode=whatsapp"));
      if (isWhatsapp) {
        const route = getRouteFromLocation();
        setActiveRoute(route);
        setChatModalOpen(true);
      }
    };

    handlePopState();
    window.addEventListener("embarp:open-whatsapp", handleGlobalOpen);
    window.addEventListener("embarp:open-analysis", handleAnalysisOpen);
    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("scroll", revealOnScroll);
      window.removeEventListener("embarp:open-whatsapp", handleGlobalOpen);
      window.removeEventListener("embarp:open-analysis", handleAnalysisOpen);
      window.removeEventListener("popstate", handlePopState);
      if (messageTimer) clearTimeout(messageTimer);
      if (autoDismissTimer) clearTimeout(autoDismissTimer);
    };
  }, []);

  const handleStart = () => {
    trackConversionEvent("whatsapp_clicked", {
      source: "floating_balloon",
      has_route: Boolean(activeRoute.origin && activeRoute.destination),
    });
    setNudgePhase("hidden");
    if (onStart) {
      onStart({
        ...context,
        origin: activeRoute.origin || context.origin,
        destination: activeRoute.destination || context.destination,
        period: activeRoute.period || context.period,
      });
    } else {
      setChatModalOpen(true);
    }
  };

  const handleDirectTrigger = () => {
    trackConversionEvent("whatsapp_clicked", {
      source: "floating_trigger_direct",
      has_route: Boolean(activeRoute.origin && activeRoute.destination),
    });
    setNudgePhase("hidden");
    if (onStart) {
      onStart({
        ...context,
        origin: activeRoute.origin || context.origin,
        destination: activeRoute.destination || context.destination,
        period: activeRoute.period || context.period,
      });
    } else {
      setChatModalOpen((prev) => !prev);
    }
  };

  return (
    <>
      <aside className="ep-whatsapp-float" aria-label="Atendimento pelo WhatsApp">
        {nudgePhase !== "hidden" && !chatModalOpen ? (
          <div
            className={`ep-whatsapp-balloon ${nudgePhase === "typing" ? "ep-whatsapp-balloon--typing" : "ep-whatsapp-balloon--message"}`}
            onClick={handleStart}
            role="button"
            tabIndex={0}
            aria-label="Abrir atendimento pelo WhatsApp"
          >
            {nudgePhase === "typing" ? (
              <div className="ep-whatsapp-balloon__typing">
                <span className="ep-whatsapp-balloon__dots" aria-label="Digitando">
                  <i />
                  <i />
                  <i />
                </span>
              </div>
            ) : (
              <p className="ep-whatsapp-balloon__text">
                Vamos começar a analisar a viagem sua e do seu pet?
              </p>
            )}
            <span className="ep-whatsapp-balloon__tail" aria-hidden="true" />
          </div>
        ) : null}

        <span className="ep-whatsapp-trigger-wrap" ref={triggerWrapRef}>
          <button
            className={`ep-whatsapp-trigger ${personaRevealed ? "ep-whatsapp-trigger--persona" : ""}`}
            type="button"
            aria-label={personaRevealed ? "Abrir conversa com a Maya no WhatsApp" : "Abrir ajuda pelo WhatsApp"}
            aria-expanded={chatModalOpen}
            onClick={handleDirectTrigger}
          >
            <span className="ep-whatsapp-trigger__flip">
              <span className="ep-whatsapp-trigger__face ep-whatsapp-trigger__face--front">
                <img src="/icons/social/whatsapp-white.svg" alt="" width="26" height="26" />
              </span>
              <span className="ep-whatsapp-trigger__face ep-whatsapp-trigger__face--back">
                <img className="ep-whatsapp-trigger__avatar" src="/embarpet-maya.webp" alt="" />
              </span>
            </span>
          </button>
          {personaRevealed ? <span className="ep-whatsapp-trigger__online-dot" aria-label="Online" /> : null}
        </span>
      </aside>

      <WhatsAppChatModal
        open={chatModalOpen}
        onClose={() => setChatModalOpen(false)}
        initialRoute={{
          origin: activeRoute.origin,
          destination: activeRoute.destination,
          period: activeRoute.period,
        }}
        analyticsSource="whatsapp_floating_widget"
      />
    </>
  );
}
