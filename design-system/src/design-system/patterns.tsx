import { useEffect, useState, type ReactNode } from "react";

export function ConversionHero({ imageSrc, imageAlt, aside, children }: { imageSrc?: string; imageAlt?: string; aside?: ReactNode; children: ReactNode }) {
  return <section className="ep-conversion-hero" id="analise"><div className="ep-conversion-hero__copy">{children}</div>{aside ? <div className="ep-conversion-hero__aside">{aside}</div> : imageSrc ? <div className="ep-conversion-hero__media"><img className="ep-conversion-hero__image" src={imageSrc} alt={imageAlt ?? ""} fetchPriority="high" decoding="async" /></div> : null}</section>;
}

export function AuthorityBand() {
  return <section className="ep-authority-band" aria-label="Números e credenciais da Embarpet">
    <div className="ep-authority-band__metric ep-authority-band__metric--people"><span className="ep-team-avatars" aria-hidden="true"><i /><i /><i /><i /></span><strong><i><ImpactCounter value={2000} prefix="+" /></i><span>embarques<br />realizados</span></strong></div>
    <div className="ep-authority-band__metric"><img className="ep-google-mark" src="/logo-google.svg" alt="Google" /><strong><i><ImpactCounter value={4.9} decimals={1} /></i><span>avaliação<br />no Google</span></strong></div>
    <div className="ep-authority-band__credential ep-authority-band__credential--associations"><strong><img src="/logo-ipata.webp" alt="IPATA" /><img src="/logo-iata.webp" alt="IATA" /></strong><span>Credenciados</span></div>
    <a className="ep-authority-band__credential ep-authority-band__credential--ra" href="https://www.reclameaqui.com.br/empresa/embarpet-embarque-de-animais/" target="_blank" rel="noreferrer"><img src="/logo-reclame-aqui-symbol.webp" alt="Reclame Aqui" /><strong><i>0</i><span>reclamações<br />no Reclame Aqui</span></strong></a>
  </section>;
}

function ImpactCounter({ value, prefix = "", decimals = 0 }: { value: number; prefix?: string; decimals?: number }) {
  const [current, setCurrent] = useState(0);
  useEffect(() => {
    const duration = 1100;
    const startedAt = performance.now();
    let frame = 0;
    const tick = (now: number) => {
      const progress = Math.min((now - startedAt) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCurrent(value * eased);
      if (progress < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [value]);
  const formatted = decimals ? current.toFixed(decimals).replace(".", ",") : Math.round(current).toLocaleString("pt-BR");
  return <>{prefix}{formatted}</>;
}
