import { useState } from "react";
import { Crown, HeartHandshake, ShieldCheck, Volume2, VolumeX } from "lucide-react";
import { InternalLink } from "./buttons";

export function PetLuxoSection() {
  const [isUnmuted, setIsUnmuted] = useState(false);
  const [isFullVideoLoaded, setIsFullVideoLoaded] = useState(false);

  const toggleSound = () => {
    if (!isFullVideoLoaded) {
      setIsFullVideoLoaded(true);
      setIsUnmuted(true);
      return;
    }
    setIsUnmuted((current) => !current);
  };

  return <section className="ep-home-luxury" id="pet-luxo"><div className="ep-container ep-home-luxury__grid"><div className="ep-home-luxury__image"><video key={isFullVideoLoaded ? "petluxo-full" : "petluxo-preview"} poster="/embarpet-pet-luxo-real.jpeg" aria-label="Consultora Embarpet acompanhando pets no aeroporto" autoPlay loop muted={isFullVideoLoaded ? !isUnmuted : true} playsInline preload="metadata">{!isFullVideoLoaded ? <source src="/embarpet-petluxo-preview-5s.webm" type="video/webm" /> : null}<source src={isFullVideoLoaded ? "/embarpet-petluxo-baeta-alpargata.mp4" : "/embarpet-petluxo-preview-5s.mp4"} type="video/mp4" /></video><button type="button" className="ep-home-luxury__sound" onClick={toggleSound}>{isUnmuted ? <VolumeX size={15} /> : <Volume2 size={15} />}{isUnmuted ? "Silenciar" : "Ativar som"}</button></div><div className="ep-home-luxury__content"><p className="ep-eyebrow">Acompanhamento especializado</p><h2 className="ep-title-lg">Um consultor especializado <em>acompanha seu pet até você.</em></h2><p className="ep-copy">PetLuxo é um acompanhamento dedicado para jornadas que pedem presença e coordenação ainda mais próximas. Um consultor especializado conduz o pet com atenção aos marcos definidos até o encontro com a família.</p><div className="ep-home-luxury__list"><span><i>01</i><Crown size={17} /><b>Planejamento individual</b><small>Uma leitura própria para a jornada da família.</small></span><span><i>02</i><HeartHandshake size={17} /><b>Presença especializada</b><small>Um consultor acompanha o pet nos marcos combinados.</small></span><span><i>03</i><ShieldCheck size={17} /><b>Coordenação até o encontro</b><small>Cuidado contínuo até a entrega planejada.</small></span></div><div className="ep-home-luxury__actions"><InternalLink className="ep-ds-button--luxury" href="/pet-luxo">Saiba mais</InternalLink></div></div></div></section>;
}
