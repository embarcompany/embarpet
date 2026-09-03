import { AnalysisButton } from "../../../components/ui/buttons";

const destinationContexts = [
  {
    place: "Flórida",
    label: "Rota muito procurada",
    copy: "Muitas famílias brasileiras escolhem a Flórida para começar uma nova fase perto de quem amam.",
    route: "A rota é lida de acordo com o aeroporto, o período e o perfil do seu pet.",
    tone: "sun",
  },
  {
    place: "Nova York e Nordeste",
    label: "Conexões importam",
    copy: "Quando a família chega ao Nordeste, cada trecho da viagem precisa fazer sentido até o destino final.",
    route: "Origem, conexão e operação são avaliadas juntas antes de decidir.",
    tone: "city",
  },
  {
    place: "Califórnia e Costa Oeste",
    label: "Uma jornada mais longa",
    copy: "Para chegar mais longe com o seu pet, o planejamento começa antes de definir o dia do voo.",
    route: "A viagem é construída olhando a rota completa, não apenas a passagem.",
    tone: "coast",
  },
] as const;

export function DestinationContextSection({ onStartPlanning }: { onStartPlanning: () => void }) {
  return <section className="ep-us-destination-context"><div className="ep-container"><div className="ep-us-destination-context__heading"><p className="ep-us-kicker">Seu destino, com contexto</p><h2>O lugar onde sua família vai viver <em>também faz parte do plano.</em></h2><p>Uma viagem para os Estados Unidos não é uma rota genérica. <strong>O destino final ajuda a definir como o seu pet chega com você.</strong></p></div><div className="ep-us-destination-context__grid">{destinationContexts.map(({ place, label, copy, route, tone }) => <article key={place} className={`ep-us-destination-context__card is-${tone}`}><div className="ep-us-destination-context__visual" aria-label={`Espaço reservado para imagem de ${place}`}><span>{place}</span><small>Imagem do destino em breve</small></div><div className="ep-us-destination-context__copy"><small>{label}</small><h3>{place}</h3><p>{copy}</p><strong>{route}</strong></div></article>)}</div><div className="ep-us-destination-context__closing"><p>Seu destino não precisa estar nesta lista. <strong>A viagem do seu pet é analisada da origem até onde a sua família vai chegar.</strong></p><AnalysisButton onClick={onStartPlanning}>Quero planejar a viagem do meu pet</AnalysisButton></div></div></section>;
}
