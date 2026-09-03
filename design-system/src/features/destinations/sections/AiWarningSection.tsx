import { useRevealOnce } from "../hooks/useRevealOnce";
import { AlertTriangle } from "lucide-react";

export function AiWarningSection() {
  const { ref, isPrepared, isRevealed } = useRevealOnce<HTMLElement>(0.18);
  const className = ["ep-us-ai-warning", isPrepared && "is-prepared", isRevealed && "is-in-view"].filter(Boolean).join(" ");

  return <section ref={ref} className={className} aria-label="Limite de informações isoladas para planejar uma viagem com pet"><div className="ep-container"><span className="ep-us-ai-warning__eyebrow" aria-hidden="true"><AlertTriangle size={15} /></span><span className="ep-us-ai-warning__typing-dot" aria-hidden="true" /><h2><span>Uma</span>{" "}<span>informação</span>{" "}<span>isolada</span>{" "}<span>do</span>{" "}<span>ChatGPT</span>{" "}<span>pode</span>{" "}<span>fazer</span>{" "}<span>seu</span>{" "}<span>pet</span>{" "}<em><span>não embarcar.</span></em></h2><p className="ep-us-ai-warning__proof">41% dos tutores não têm clareza se o próprio pet pode embarcar.</p></div></section>;
}
