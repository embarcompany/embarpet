import { X } from "lucide-react";

const painPoints = [
  { title: "Seu pet pode não embarcar", copy: "Um documento incompatível, uma exigência sanitária fora do prazo ou uma regra da operação ignorada podem interromper a viagem no aeroporto." },
  { title: "Prazo perdido não se recupera no dia do voo", copy: "Vacina, exame, certificado e validação têm datas próprias. Descobrir isso quando a viagem está perto pode mudar todo o plano da sua família." },
  { title: "A passagem não garante o transporte do seu pet", copy: "Companhia, conexão, porte, caixa de transporte e destino precisam funcionar juntos antes de o seu pet chegar ao aeroporto." },
  { title: "Uma conexão pode comprometer todo o plano", copy: "Seu pet não pode ser incluído no roteiro no último momento. Cada trecho precisa estar compatível com a operação da viagem." },
];

export function RiskSection() {
  return <section className="ep-us-doubt"><div className="ep-container"><div className="ep-us-doubt__heading"><p className="ep-us-kicker">UM ERRO PODE PARAR O EMBARQUE</p><h2>Sem suporte especializado, seu pet <em>pode não embarcar.</em></h2></div><div className="ep-us-doubt__content"><figure className="ep-us-doubt__visual"><img src="/embarpet-pet-caixa-bagagem-dor.png" alt="Pet ao lado da caixa de transporte e bagagem para viagem" loading="lazy" /></figure><div className="ep-us-doubt__questions">{painPoints.map(({ title, copy }) => <article key={title}><X size={30} aria-hidden="true" /><p><b>{title}</b><small>{copy}</small></p></article>)}</div></div></div></section>;
}
