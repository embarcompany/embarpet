"use client";

import { useEffect } from "react";
import { X } from "lucide-react";
import { useLocale } from "../../i18n/locale";
import { WhatsAppChatFlow } from "./whatsapp-chat-flow";
import "./whatsapp-chat.css";

export type AnalysisRouteContext = {
  origin?: string;
  destination?: string;
  period?: string;
  originCode?: string;
  destinationCode?: string;
};

type WhatsAppChatModalProps = {
  open: boolean;
  onClose: () => void;
  initialRoute?: AnalysisRouteContext;
  analyticsSource?: string;
};

export function WhatsAppVerifiedBadge({ size = 16 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Perfil Verificado"
      style={{ display: "inline-block", verticalAlign: "middle", flexShrink: 0 }}
    >
      <path
        d="M10.5858 2.41421C11.3668 1.63317 12.6332 1.63316 13.4142 2.41421L14.8284 3.82843C15.2035 4.20349 15.7122 4.41421 16.2426 4.41421H18.2426C19.3472 4.41421 20.2426 5.30964 20.2426 6.41421V8.41421C20.2426 8.94469 20.4534 9.45339 20.8284 9.82843L22.2426 11.2426C23.0237 12.0237 23.0237 13.2901 22.2426 14.0711L20.8284 15.4853C20.4534 15.8603 20.2426 16.369 20.2426 16.8995V18.8995C20.2426 20.0041 19.3472 20.8995 18.2426 20.8995H16.2426C15.7122 20.8995 15.2035 21.1102 14.8284 21.4853L13.4142 22.8995C12.6332 23.6805 11.3668 23.6805 10.5858 22.8995L9.17157 21.4853C8.79654 21.1102 8.28784 20.8995 7.75736 20.8995H5.75736C4.65279 20.8995 3.75736 20.0041 3.75736 18.8995V16.8995C3.75736 16.369 3.54664 15.8603 3.17157 15.4853L1.75736 14.0711C0.976311 13.2901 0.976311 12.0237 1.75736 11.2426L3.17157 9.82843C3.54664 9.45339 3.75736 8.94469 3.75736 8.41421V6.41421C3.75736 5.30964 4.65279 4.41421 5.75736 4.41421H7.75736C8.28784 4.41421 8.79654 4.20349 9.17157 3.82843L10.5858 2.41421Z"
        fill="#25D366"
      />
      <path
        d="M9 12.5L11 14.5L15.5 10"
        stroke="white"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function WhatsAppChatModal({
  open,
  onClose,
  initialRoute = {},
  analyticsSource = "whatsapp_modal",
}: WhatsAppChatModalProps) {
  const { text } = useLocale();

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", closeOnEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [onClose, open]);

  if (!open) return null;

  return (
    <div
      className="ep-wa-modal"
      role="dialog"
      aria-modal="true"
      aria-label="Atendimento WhatsApp com Thamires Felix"
    >
      <button
        className="ep-wa-modal__backdrop"
        type="button"
        onClick={onClose}
        aria-label={text.close}
      />

      <section className="ep-wa-modal__panel">
        {/* Minimalist WhatsApp Top Bar with Thamires Felix */}
        <header className="ep-wa-header">
          <div className="ep-wa-header__profile">
            <div className="ep-wa-header__avatar-wrap">
              <img
                className="ep-wa-header__avatar"
                src="/embarpet-thamires-felix.webp"
                alt="Thamires Felix — Especialista Embarpet"
              />
              <span className="ep-wa-header__online-dot" aria-label="Online" />
            </div>

            <div className="ep-wa-header__info">
              <div className="ep-wa-header__name-row">
                <span className="ep-wa-header__name">Thamires Felix</span>
                <WhatsAppVerifiedBadge size={16} />
              </div>
              <span className="ep-wa-header__status">Online</span>
            </div>
          </div>

          <div className="ep-wa-header__actions">
            <button
              className="ep-wa-header__btn"
              type="button"
              onClick={onClose}
              aria-label={text.close}
            >
              <X size={20} />
            </button>
          </div>
        </header>

        {/* Conversational Step Flow with AI Reasoning & Interactive Dock */}
        <WhatsAppChatFlow
          initialRoute={initialRoute}
          analyticsSource={analyticsSource}
        />
      </section>
    </div>
  );
}

