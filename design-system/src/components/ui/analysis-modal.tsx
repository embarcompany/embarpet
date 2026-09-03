"use client";

import { useEffect } from "react";
import { X } from "lucide-react";
import { useLocale } from "../../i18n/locale";
import { DiagnosticFlow } from "./diagnostic-flow";

export type AnalysisRouteContext = {
  origin?: string;
  destination?: string;
  period?: string;
  originCode?: string;
  destinationCode?: string;
};

type AnalysisModalProps = {
  open: boolean;
  onClose: () => void;
  initialRoute?: AnalysisRouteContext;
  analyticsSource: string;
};

/** Entrada única para o diagnóstico. Cada página só informa contexto e origem do CTA. */
export function AnalysisModal({ open, onClose, initialRoute = {}, analyticsSource }: AnalysisModalProps) {
  const { text } = useLocale();

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    const closeOnEscape = (event: KeyboardEvent) => { if (event.key === "Escape") onClose(); };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", closeOnEscape);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [onClose, open]);

  if (!open) return null;

  const routeIsComplete = Boolean(initialRoute.origin && initialRoute.destination && initialRoute.period);
  const flowKey = `${analyticsSource}:${initialRoute.origin ?? ""}:${initialRoute.destination ?? ""}:${initialRoute.period ?? ""}`;

  return <div className="ep-analysis-modal" role="dialog" aria-modal="true" aria-label={text.startAnalysis}>
    <button className="ep-analysis-modal__backdrop" type="button" onClick={onClose} aria-label={text.close} />
    <section className="ep-analysis-modal__panel">
      <button className="ep-analysis-modal__close" type="button" onClick={onClose} aria-label={text.close}><X size={21} /></button>
      <div className="ep-analysis-modal__content">
        <DiagnosticFlow key={flowKey} routeFirst startAtPet={routeIsComplete} initialRoute={initialRoute} analyticsSource={analyticsSource} />
      </div>
    </section>
  </div>;
}
