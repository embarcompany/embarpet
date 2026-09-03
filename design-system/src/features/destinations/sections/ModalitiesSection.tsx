import { ModalityRail } from "../../../design-system/components";

const modalities = [
  { icon:"plane" as const, title:"Viagem na cabine", copy:"Seu pet viaja com você dentro da cabine, acomodado em uma bolsa ou caixa aprovada pela companhia aérea. É a alternativa que mantém vocês mais próximos durante o voo quando porte, peso e rota atendem aos critérios.", ctaLabel:"Saiba mais", detailHref:"/modalidades/viagem-na-cabine", imageSrc:"/embarpet-modalidade-viagem-cabine.jpg", imageAlt:"Cachorro observando a paisagem pela janela durante uma viagem na cabine" },
  { icon:"document" as const, title:"Bagagem acompanhada", copy:"Seu pet embarca no mesmo voo que você, em uma caixa de transporte adequada, e segue no compartimento apropriado da aeronave. Organizamos os requisitos para que pet e família cumpram o itinerário de forma coordenada.", ctaLabel:"Saiba mais", detailHref:"/modalidades/bagagem-acompanhada", imageSrc:"/embarpet-bagagem-acompanhada.webp", imageAlt:"Consultora Embarpet acompanhando pets em aeroporto" },
  { icon:"home" as const, title:"Compartimento de cargas", copy:"Uma operação aérea dedicada ao transporte de animais vivos, com reserva, documentação e logística próprias. É uma alternativa flexível para diferentes portes e rotas e pode tornar a jornada mais prática e econômica.", ctaLabel:"Saiba mais", detailHref:"/modalidades/compartimento-de-cargas", imageSrc:"/embarpet-compartimento-cargas.jpg", imageAlt:"Pet em caixa de transporte na esteira operacional do aeroporto" },
  { icon:"shield" as const, title:"Suporte emocional", copy:"Uma possibilidade para casos com necessidade comprovada de apoio emocional, sujeita às regras da companhia e às autorizações aplicáveis. Avaliamos a documentação e orientamos cada etapa para um embarque responsável.", ctaLabel:"Saiba mais", detailHref:"/modalidades/suporte-emocional", imageSrc:"/embarpet-suporte-emocional.jpg", imageAlt:"Família com pet em voo durante uma viagem" },
] as const;

export function ModalitiesSection({ onStartPlanning }: { onStartPlanning: (modality: string) => void }) {
  return <section className="ep-home-modalities" id="modalidades" aria-labelledby="modalities-title"><div className="ep-container">
    <div className="ep-home-modalities__intro"><div><p className="ep-eyebrow">Modalidades de embarque</p><h2 className="ep-title-lg" id="modalities-title">Entenda como seu pet pode <em>viajar de avião.</em></h2></div><p className="ep-copy">Cabine, bagagem acompanhada, compartimento de cargas e suporte emocional funcionam de maneiras diferentes. Conheça cada modalidade antes de avaliarmos qual pode fazer sentido para o seu pet, a sua rota e a sua família.</p></div>
    <ModalityRail items={[...modalities]} onItemAction={onStartPlanning} />
  </div></section>;
}
