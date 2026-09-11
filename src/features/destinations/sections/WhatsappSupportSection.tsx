import { MessageCircle, PawPrint, Smartphone } from "lucide-react";
import { AnalysisButton } from "../../../components/ui/buttons";

const supportBenefits = [
  { icon: Smartphone, label: "Atendimento 100% digital-first" },
  { icon: MessageCircle, label: "Direto do seu WhatsApp" },
  { icon: PawPrint, label: "Orientação até o embarque do seu pet" },
];

export function WhatsappSupportSection({ onStartPlanning }: { onStartPlanning: () => void }) {
  return <section className="ep-us-support"><div className="ep-container ep-us-support__grid"><figure className="ep-us-support__visual"><img src="/embarpet-whatsapp-suporte-pet.png" alt="Conversa pelo WhatsApp com a equipe Embarpet acompanhada por um pet" loading="lazy" /></figure><div className="ep-us-support__copy"><p className="ep-us-kicker">Suporte pelo WhatsApp</p><h2>Da sua primeira dúvida<br />ao embarque,<br /><em>tudo pelo WhatsApp.</em></h2><p>Você tem uma <strong>equipe especialista</strong> para orientar cada decisão da viagem do seu pet.</p><ul>{supportBenefits.map(({ icon: Icon, label }) => <li key={label}><Icon size={19} aria-hidden="true" />{label}</li>)}</ul><AnalysisButton onClick={onStartPlanning}>Quero falar com a Embarpet</AnalysisButton></div></div></section>;
}
