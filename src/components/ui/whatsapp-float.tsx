"use client";

import { X } from "lucide-react";
import { useEffect, useState } from "react";
import type { PublicLead } from "../../lead-contract";
import { trackConversionEvent } from "../../lib/analytics";

export type LeadContext = Omit<PublicLead, "consent">;

export function WhatsAppFloat({ context, onStart }: { context: LeadContext; onStart?: (context: LeadContext) => void }) {
  const [open, setOpen] = useState(false);
  const [showNudge, setShowNudge] = useState(false);
  useEffect(() => {
    let dismissTimer: ReturnType<typeof setTimeout> | undefined;
    const reveal = () => { if (window.scrollY > 120) { setShowNudge(true); dismissTimer = setTimeout(() => setShowNudge(false), 4200); window.removeEventListener("scroll", reveal); } };
    window.addEventListener("scroll", reveal, { passive:true });
    return () => { window.removeEventListener("scroll", reveal); if (dismissTimer) clearTimeout(dismissTimer); };
  }, []);
  const start = () => { trackConversionEvent("whatsapp_clicked", { source: "floating_assistant", has_route: Boolean(context.origin && context.destination) }); onStart?.(context); setOpen(false); setShowNudge(false); };
  return <aside className="ep-whatsapp-float" aria-label="Ajuda pelo WhatsApp">{showNudge && !open ? <button type="button" className="ep-whatsapp-nudge" onClick={() => { setOpen(true); setShowNudge(false); }}><b>A Jadi pode ajudar</b><span>com o embarque do seu pet</span></button> : null}{open ? <div className="ep-whatsapp-popover"><button className="ep-whatsapp-close" type="button" aria-label="Fechar conversa" onClick={() => setOpen(false)}><X size={16} /></button><span className="ep-whatsapp-avatar"><img src="/icons/social/whatsapp-green.svg" alt="WhatsApp" /></span><p><b>Precisa de ajuda com a viagem?</b><small>A Jadi e a equipe continuam com o contexto da sua rota.</small></p><button type="button" onClick={start}>Conversar com a Embarpet <span aria-hidden="true">→</span></button></div> : null}<button className="ep-whatsapp-trigger" type="button" aria-label="Abrir ajuda pelo WhatsApp" aria-expanded={open} onClick={() => { setOpen((value) => !value); setShowNudge(false); }}><img src="/icons/social/whatsapp-white.svg" alt="" /></button></aside>;
}
