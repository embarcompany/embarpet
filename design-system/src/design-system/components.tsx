import { useRef, type FormEvent, type PointerEvent as ReactPointerEvent, type ReactNode } from "react";
import { Icon, type IconName } from "./icons";
import { Button, Notice, SelectField, TextField } from "./primitives";
import { trackConversionEvent } from "../lib/analytics";
import { InternalLink } from "../components/ui/buttons";

export type RouteData = { origin: string; destination: string; period: string };

export function RouteFieldGroup({ values, onChange, compact = false }: { values: RouteData; onChange: (next: RouteData) => void; compact?: boolean }) {
  const change = (key: keyof RouteData, value: string) => onChange({ ...values, [key]: value });
  return <div className={`ep-route-fields ${compact ? "ep-route-fields--compact" : ""}`}><div className="ep-route-pair"><span className="ep-route-line" aria-hidden="true" /><TextField label="De onde seu pet parte?" icon="location" placeholder="Ex.: São Paulo, Brasil" value={values.origin} onChange={(event) => change("origin", event.target.value)} /><TextField label="Para onde ele vai?" icon="route" placeholder="Ex.: Lisboa, Portugal" value={values.destination} onChange={(event) => change("destination", event.target.value)} /></div><SelectField label="Quando pretende viajar?" icon="calendar" value={values.period} onChange={(event) => change("period", event.target.value)}><option value="">Escolher período</option><option>Nos próximos 3 meses</option><option>Entre 3 e 6 meses</option><option>Mais de 6 meses</option><option>Ainda estou planejando</option></SelectField></div>;
}

export function DiagnosticForm({ value, onChange, onSubmit }: { value: RouteData; onChange: (next: RouteData) => void; onSubmit: (data: RouteData) => void }) {
  const submit = (event: FormEvent) => { event.preventDefault(); onSubmit(value); };
  return <form className="ep-diagnostic-form" onSubmit={submit}><div className="ep-diagnostic-meta"><b>Etapa 1 de 3 · A sua viagem</b><span>Leva menos de um minuto</span></div><div className="ep-diagnostic-layout"><RouteFieldGroup values={value} onChange={onChange} /><Button type="submit" icon="arrow">Continuar análise</Button></div><Notice>A modalidade é definida a partir da rota, do pet e das regras vigentes.</Notice></form>;
}

export function TrustStrip({ items }: { items: Array<{ icon: IconName; children: string }> }) {
  return <div className="ep-trust-strip">{items.map((item) => <span key={item.children}><Icon name={item.icon} />{item.children}</span>)}</div>;
}

export function ModalityRail({ items, onItemAction }: { items: Array<{ icon: IconName; title: string; copy: string; detailHref: string; imageSrc: string; imageAlt: string; ctaLabel: string; featured?: boolean; videoSrc?: string }>; onItemAction?: (title: string) => void }) {
  const railRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef<{ pointerId: number; startX: number; startLeft: number } | null>(null);
  const suppressClickRef = useRef(false);
  const isMobileRail = () => typeof window !== "undefined" && window.matchMedia("(max-width: 900px)").matches;
  const startDrag = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (!isMobileRail() || event.pointerType === "mouse" && event.button !== 0) return;
    dragRef.current = { pointerId:event.pointerId, startX:event.clientX, startLeft:event.currentTarget.scrollLeft };
    event.currentTarget.setPointerCapture(event.pointerId);
  };
  const moveDrag = (event: ReactPointerEvent<HTMLDivElement>) => {
    const drag = dragRef.current;
    if (!drag || drag.pointerId !== event.pointerId) return;
    const distance = event.clientX - drag.startX;
    if (Math.abs(distance) > 4) suppressClickRef.current = true;
    event.currentTarget.scrollLeft = drag.startLeft - distance;
    event.preventDefault();
  };
  const endDrag = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (dragRef.current?.pointerId !== event.pointerId) return;
    dragRef.current = null;
    if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId);
    window.setTimeout(() => { suppressClickRef.current = false; }, 0);
  };
  return <div ref={railRef} className="ep-modality-rail" onPointerDown={startDrag} onPointerMove={moveDrag} onPointerUp={endDrag} onPointerCancel={endDrag} onClickCapture={(event) => { if (suppressClickRef.current) { event.preventDefault(); event.stopPropagation(); } }}>{items.map((item) => <article key={item.title} className={item.featured ? "is-featured" : ""}><div className="ep-modality-rail__media">{item.videoSrc ? <video className="ep-modality-rail__video" src={item.videoSrc} poster={item.imageSrc} aria-label={item.imageAlt} autoPlay loop muted playsInline preload="metadata" /> : <img src={item.imageSrc} alt={item.imageAlt} loading="lazy" decoding="async" />}</div><div><h3>{item.title}</h3><p>{item.copy}</p><div className="ep-modality-actions"><InternalLink href={onItemAction ? "#planejar" : item.detailHref} onClick={(event) => { if (onItemAction) { event.preventDefault(); trackConversionEvent("modality_clicked", { modality: item.title, action: "start_analysis" }); onItemAction(item.title); return; } trackConversionEvent("modality_clicked", { modality: item.title, action: "learn_more" }); }}>{item.ctaLabel}</InternalLink></div></div></article>)}</div>;
}

export function ProcessList({ items }: { items: Array<{ title: string; copy: string }> }) {
  return <ol className="ep-process-list">{items.map((item, index) => <li key={item.title}><b>{String(index + 1).padStart(2, "0")}</b><div><h3>{item.title}</h3><p>{item.copy}</p></div><Icon name="arrow" /></li>)}</ol>;
}

export function DestinationExplorer({ onSelect }: { onSelect: (destination: string) => void }) {
  const regions = [{ icon:"route" as IconName, title:"Estados Unidos", subtitle:"Planejamento para a rota Brasil–EUA", copy:"Uma boa viagem começa antes da passagem. Conte seu caso para uma análise individual.", countries:["Estados Unidos"] }, { icon:"world" as IconName, title:"União Europeia", subtitle:"Contextos diferentes dentro da mesma região", copy:"Comece pelos destinos mais procurados e mantenha o contexto no diagnóstico.", countries:["Portugal","Espanha","Itália","França","Alemanha"] }, { icon:"document" as IconName, title:"Mercosul", subtitle:"Planejamento regional, com atenção ao caso", copy:"A proximidade não tira a necessidade de um plano bem montado.", countries:["Argentina","Uruguai","Paraguai"] }];
  return <div className="ep-destination-explorer">{regions.map((region, index) => <details key={region.title} open={index === 0}><summary><span><Icon name={region.icon} /><span><b>{region.title}</b><small>{region.subtitle}</small></span></span><Icon name="chevron" /></summary><div className="ep-region-body"><p>{region.copy}</p><div>{region.countries.map((country) => <Button type="button" variant="secondary" key={country} onClick={() => onSelect(country)}>{country}</Button>)}</div></div></details>)}</div>;
}

export function ScrollRouteIn({ imageSrc, imageAlt, eyebrow, title }: { imageSrc: string; imageAlt: string; eyebrow: string; title: string }) {
  return <section className="ep-scroll-route"><div className="ep-scroll-route__frame"><div><p className="ep-eyebrow">{eyebrow}</p><h2 className="ep-title-lg">{title}</h2></div><img src={imageSrc} alt={imageAlt} loading="lazy" decoding="async" /></div></section>;
}

export function SourceBlock({ title, children }: { title: string; children: ReactNode }) {
  return <aside className="ep-source-block"><Icon name="document" /><div><b>{title}</b><p>{children}</p></div></aside>;
}
