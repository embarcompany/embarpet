import { AlertTriangle } from "lucide-react";

export function AiWarningSection() {
  return <section className="ep-us-ai-warning" aria-label="Limite de informações isoladas para planejar uma viagem com pet"><div className="ep-container"><span className="ep-us-ai-warning__eyebrow" aria-hidden="true"><AlertTriangle size={24} /></span><h2>Uma informação isolada do ChatGPT pode fazer seu pet <em>não embarcar.</em></h2><p className="ep-us-ai-warning__proof">41% dos tutores não têm clareza se o próprio pet pode embarcar.</p></div></section>;
}
