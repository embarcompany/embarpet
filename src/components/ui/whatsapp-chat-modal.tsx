"use client";

import { useEffect } from "react";
import { Check, Phone, Video, X, Smile, Paperclip, Mic } from "lucide-react";
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
        {/* WhatsApp Top Bar with Thamires Felix */}
        <header className="ep-wa-header">
          <div className="ep-wa-header__profile">
            <div className="ep-wa-header__avatar-wrap">
              <img
                className="ep-wa-header__avatar"
                src="/embarpet-thamires-felix.webp"
                alt="Thamires Felix — Especialista Embarpet"
              />
              <span className="ep-wa-header__online-dot" aria-label="Online agora" />
            </div>

            <div className="ep-wa-header__info">
              <div className="ep-wa-header__name-row">
                <span className="ep-wa-header__name">Thamires Felix</span>
                <span className="ep-wa-header__badge" title="Especialista Verificada Embarpet">
                  ✓
                </span>
              </div>
              <span className="ep-wa-header__status">
                Online agora • Embarpet Oficial
              </span>
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

        {/* Conversational Step Flow */}
        <WhatsAppChatFlow
          initialRoute={initialRoute}
          analyticsSource={analyticsSource}
        />

        {/* Realistic WhatsApp Footer Bar */}
        <footer className="ep-wa-footer">
          <div className="ep-wa-footer__input-wrap">
            <Smile size={18} color="#8696a0" />
            <input
              type="text"
              className="ep-wa-footer__input"
              placeholder="Selecione ou digite sua resposta..."
              readOnly
            />
            <Paperclip size={18} color="#8696a0" />
          </div>
          <button
            type="button"
            className="ep-wa-footer__btn"
            aria-label="Gravar áudio"
          >
            <Mic size={18} />
          </button>
        </footer>
      </section>
    </div>
  );
}
