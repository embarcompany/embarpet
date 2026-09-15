"use client";

import { X } from "lucide-react";
import { useEffect, useState } from "react";
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

export function WhatsAppFloat({
  context = defaultLeadContext,
  onStart,
}: {
  context?: LeadContext;
  onStart?: (context: LeadContext) => void;
}) {
  const [open, setOpen] = useState(false);
  const [showNudge, setShowNudge] = useState(false);
  const [chatModalOpen, setChatModalOpen] = useState(false);

  useEffect(() => {
    let dismissTimer: ReturnType<typeof setTimeout> | undefined;
    const reveal = () => {
      if (window.scrollY > 120) {
        setShowNudge(true);
        dismissTimer = setTimeout(() => setShowNudge(false), 4200);
        window.removeEventListener("scroll", reveal);
      }
    };
    window.addEventListener("scroll", reveal, { passive: true });
    return () => {
      window.removeEventListener("scroll", reveal);
      if (dismissTimer) clearTimeout(dismissTimer);
    };
  }, []);

  const start = () => {
    trackConversionEvent("whatsapp_clicked", {
      source: "floating_assistant",
      has_route: Boolean(context.origin && context.destination),
    });
    onStart?.(context);
    setOpen(false);
    setShowNudge(false);
    setChatModalOpen(true);
  };

  const handleDirectTrigger = () => {
    trackConversionEvent("whatsapp_clicked", {
      source: "floating_trigger_direct",
      has_route: Boolean(context.origin && context.destination),
    });
    setChatModalOpen(true);
    setOpen(false);
    setShowNudge(false);
  };

  return (
    <>
      <aside className="ep-whatsapp-float" aria-label="Ajuda pelo WhatsApp com Thamires Felix">
        {showNudge && !open && !chatModalOpen ? (
          <button
            type="button"
            className="ep-whatsapp-nudge"
            onClick={start}
          >
            <b>Thamires Felix está online</b>
            <span>Tire dúvidas sobre a viagem do seu pet</span>
          </button>
        ) : null}

        {open && !chatModalOpen ? (
          <div className="ep-whatsapp-popover">
            <button
              className="ep-whatsapp-close"
              type="button"
              aria-label="Fechar conversa"
              onClick={() => setOpen(false)}
            >
              <X size={16} />
            </button>
            <span className="ep-whatsapp-avatar">
              <img src="/embarpet-thamires-felix.webp" alt="Thamires Felix" style={{ borderRadius: "50%", objectFit: "cover" }} />
            </span>
            <p>
              <b>Precisa de ajuda com a viagem?</b>
              <small>Fale com a Thamires e veja os requisitos da sua rota.</small>
            </p>
            <button type="button" onClick={start}>
              Conversar com Thamires <span aria-hidden="true">→</span>
            </button>
          </div>
        ) : null}

        <button
          className="ep-whatsapp-trigger"
          type="button"
          aria-label="Abrir ajuda pelo WhatsApp"
          aria-expanded={chatModalOpen}
          onClick={handleDirectTrigger}
        >
          <img src="/icons/social/whatsapp-white.svg" alt="" />
        </button>
      </aside>

      <WhatsAppChatModal
        open={chatModalOpen}
        onClose={() => setChatModalOpen(false)}
        initialRoute={{
          origin: context.origin,
          destination: context.destination,
          period: context.period,
        }}
        analyticsSource="whatsapp_floating_widget"
      />
    </>
  );
}
