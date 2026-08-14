"use client";

import { Star, Volume2, VolumeX } from "lucide-react";
import { useEffect, useMemo, useRef, useState, type CSSProperties, type PointerEvent } from "react";

export type CaseCard = { id: string; title: string; subtitle: string; imageSrc: string; imageAlt: string; videoSrc?: string; instagramHandle?: string; instagramUrl?: string };
type Position = { x: number; y: number };
// Margem inicial considera a rotação dos cartões; eles já nascem inteiros dentro do canvas.
const positions: Position[] = [{ x: 7, y: 9 }, { x: 9, y: 48 }, { x: 74, y: 9 }, { x: 71, y: 48 }, { x: 17, y: 60 }];
const rotations = [-7, 5, 7, -5, 3];

export function CaseDragCards({ cases }: { cases: CaseCard[] }) {
  const [isMobile, setIsMobile] = useState(() => window.matchMedia("(max-width: 700px)").matches);
  const [mobileIndex, setMobileIndex] = useState(0);
  const areaRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<string | null>(null);
  const [currentPositions, setCurrentPositions] = useState<Record<string, Position>>({});
  const [topCard, setTopCard] = useState<string | null>(null);
  const [loadedVideos, setLoadedVideos] = useState<Record<string, boolean>>({});
  const [unmutedVideos, setUnmutedVideos] = useState<Record<string, boolean>>({});
  const cardRefs = useRef<Record<string, HTMLElement | null>>({});
  const mobileCases = useMemo(() => {
    const kiliquinha = cases.find((item) => item.id === "kiliquinha");
    return kiliquinha ? [kiliquinha, ...cases.filter((item) => item.id !== "kiliquinha")] : cases;
  }, [cases]);
  useEffect(() => {
    const media = window.matchMedia("(max-width: 700px)");
    const update = () => setIsMobile(media.matches);
    update(); media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);
  useEffect(() => {
    if (!isMobile || mobileCases.length < 2) return;
    const interval = window.setInterval(() => setMobileIndex((current) => (current + 1) % mobileCases.length), 5200);
    return () => window.clearInterval(interval);
  }, [isMobile, mobileCases.length]);
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const id = entry.target.getAttribute("data-case-id");
      if (id) setLoadedVideos((current) => current[id] ? current : { ...current, [id]: true });
      observer.unobserve(entry.target);
    }), { rootMargin: "180px" });
    cases.filter((item) => item.videoSrc).forEach((item) => { const card = cardRefs.current[item.id]; if (card) observer.observe(card); });
    return () => observer.disconnect();
  }, [cases]);
  const moveCard = (event: PointerEvent<HTMLElement>, item: CaseCard) => {
    const area = areaRef.current;
    if (!area) return;
    const bounds = area.getBoundingClientRect();
    const card = event.currentTarget.getBoundingClientRect();
    const inset = 22;
    let xPixels = Math.max(inset, Math.min(bounds.width - card.width - inset, event.clientX - bounds.left - card.width / 2));
    let yPixels = Math.max(inset, Math.min(bounds.height - card.height - inset, event.clientY - bounds.top - card.height / 2));
    const caseIndex = cases.findIndex((caseItem) => caseItem.id === item.id);
    const startsOnLeft = (positions[caseIndex]?.x ?? 50) < 50;
    const centerGap = 30;
    if (startsOnLeft) xPixels = Math.min(xPixels, Math.max(inset, bounds.width / 2 - centerGap - card.width));
    else xPixels = Math.max(xPixels, Math.min(bounds.width - card.width - inset, bounds.width / 2 + centerGap));
    const protectedCopy = area.querySelector<HTMLElement>(".ep-case-canvas__center")?.getBoundingClientRect();
    if (protectedCopy) {
      const gap = 22;
      const safe = { left: protectedCopy.left - bounds.left - gap, right: protectedCopy.right - bounds.left + gap, top: protectedCopy.top - bounds.top - gap, bottom: protectedCopy.bottom - bounds.top + gap };
      const overlapsCopy = xPixels < safe.right && xPixels + card.width > safe.left && yPixels < safe.bottom && yPixels + card.height > safe.top;
      if (overlapsCopy) {
        const cardCenterX = xPixels + card.width / 2;
        const cardCenterY = yPixels + card.height / 2;
        const copyCenterX = (safe.left + safe.right) / 2;
        const copyCenterY = (safe.top + safe.bottom) / 2;
        const horizontal = Math.abs(cardCenterX - copyCenterX) / Math.max(1, safe.right - safe.left) > Math.abs(cardCenterY - copyCenterY) / Math.max(1, safe.bottom - safe.top);
        if (horizontal) xPixels = cardCenterX < copyCenterX ? Math.max(inset, safe.left - card.width) : Math.min(bounds.width - card.width - inset, safe.right);
        else yPixels = cardCenterY < copyCenterY ? Math.max(inset, safe.top - card.height) : Math.min(bounds.height - card.height - inset, safe.bottom);
      }
    }
    if (startsOnLeft) xPixels = Math.min(xPixels, Math.max(inset, bounds.width / 2 - centerGap - card.width));
    else xPixels = Math.max(xPixels, Math.min(bounds.width - card.width - inset, bounds.width / 2 + centerGap));
    const x = (xPixels / bounds.width) * 100;
    const y = (yPixels / bounds.height) * 100;
    setCurrentPositions((current) => ({ ...current, [item.id]: { x, y } }));
  };
  const startDrag = (event: PointerEvent<HTMLElement>, item: CaseCard) => {
    event.currentTarget.setPointerCapture(event.pointerId);
    setActive(item.id); setTopCard(item.id);
    moveCard(event, item);
  };
  const toggleVideoSound = (item: CaseCard) => {
    if (!loadedVideos[item.id]) setLoadedVideos((current) => ({ ...current, [item.id]: true }));
    setUnmutedVideos((current) => ({ ...current, [item.id]: !current[item.id] }));
  };
  if (isMobile) return <div className="ep-case-carousel" aria-label="Histórias de famílias atendidas pela Embarpet">
    <div className="ep-case-carousel__heading"><div className="ep-case-canvas__proof"><p className="ep-eyebrow"><strong>+2.000</strong> embarques acompanhados</p><span className="ep-case-google"><img src="https://www.gstatic.com/images/branding/searchlogo/ico/favicon.ico" alt="Google" /><b>4,9</b><span aria-label="4,9 estrelas no Google"><Star size={9} fill="currentColor" /><Star size={9} fill="currentColor" /><Star size={9} fill="currentColor" /><Star size={9} fill="currentColor" /><Star size={9} fill="currentColor" /></span></span></div><h2>Histórias de quem<br />confiou na jornada.</h2><p>Relatos reais de jornadas acompanhadas pela Embarpet.</p></div>
    <div className="ep-case-carousel__viewport"><div className="ep-case-carousel__track" style={{ transform:`translateX(-${mobileIndex * 100}%)` }}>{mobileCases.map((item) => <article className="ep-case-carousel__card" key={item.id}>{item.videoSrc ? <video className="ep-case-card__image" src={item.videoSrc} aria-label={item.imageAlt} autoPlay loop muted={!unmutedVideos[item.id]} playsInline preload="metadata" onTimeUpdate={(event) => { if (event.currentTarget.currentTime >= 5) event.currentTarget.currentTime = 0; }} /> : <img className="ep-case-card__image" src={item.imageSrc} alt={item.imageAlt} />}{item.videoSrc ? <button type="button" className="ep-case-card__sound" onClick={() => toggleVideoSound(item)}>{unmutedVideos[item.id] ? <VolumeX size={12} /> : <Volume2 size={12} />}{unmutedVideos[item.id] ? "Silenciar" : "Ativar som"}</button> : null}<span><b>{item.title}</b><small>{item.subtitle}</small>{item.instagramHandle && item.instagramUrl ? <a className="ep-case-card__instagram" href={item.instagramUrl} target="_blank" rel="noreferrer"><img src="https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png" alt="" />{item.instagramHandle}</a> : null}</span></article>)}</div></div>
    <div className="ep-case-carousel__pagination" aria-label="Navegação das histórias">{mobileCases.map((item, index) => <button type="button" aria-label={`Ver história ${index + 1}: ${item.title}`} aria-current={mobileIndex === index} className={mobileIndex === index ? "is-active" : ""} key={item.id} onClick={() => setMobileIndex(index)} />)}</div><a className="ep-case-carousel__more" href="/historias">Veja mais histórias</a>
  </div>;
  return <div className="ep-case-canvas" ref={areaRef} aria-label="Depoimentos de famílias atendidas. Arraste os cartões para explorar.">
    <div className="ep-case-canvas__center"><div className="ep-case-canvas__proof"><p className="ep-eyebrow"><strong>+2.000</strong> embarques acompanhados</p><span className="ep-case-google"><img src="https://www.gstatic.com/images/branding/searchlogo/ico/favicon.ico" alt="Google" /><b>4,9</b><span aria-label="4,9 estrelas no Google"><Star size={9} fill="currentColor" /><Star size={9} fill="currentColor" /><Star size={9} fill="currentColor" /><Star size={9} fill="currentColor" /><Star size={9} fill="currentColor" /></span></span></div><h2>Histórias de quem<br />confiou na jornada.</h2><p>Arraste os cartões para explorar relatos.</p><a href="/historias">Veja mais histórias</a></div>
    {cases.map((item, index) => { const position = currentPositions[item.id] ?? positions[index]; return <article ref={(node) => { cardRefs.current[item.id] = node; }} data-case-id={item.id} className={active === item.id ? "ep-case-card is-active" : "ep-case-card"} key={item.id} style={{ left: `${position.x}%`, top: `${position.y}%`, "--ep-case-rotation": `${rotations[index]}deg`, zIndex: topCard === item.id ? 20 : index + 1 } as CSSProperties} onPointerDown={(event) => startDrag(event, item)} onPointerMove={(event) => active === item.id && moveCard(event, item)} onPointerUp={() => setActive(null)} onPointerCancel={() => setActive(null)}>
      {item.videoSrc && loadedVideos[item.id] ? <video className="ep-case-card__image" src={item.videoSrc} aria-label={item.imageAlt} autoPlay muted={!unmutedVideos[item.id]} playsInline preload="metadata" onTimeUpdate={(event) => { if (event.currentTarget.currentTime >= 5) event.currentTarget.currentTime = 0; }} /> : <img className="ep-case-card__image" src={item.imageSrc} alt={item.imageAlt} draggable={false} />}{item.videoSrc ? <button type="button" className="ep-case-card__sound" onPointerDown={(event) => event.stopPropagation()} onClick={() => toggleVideoSound(item)}>{unmutedVideos[item.id] ? <VolumeX size={12} /> : <Volume2 size={12} />}{unmutedVideos[item.id] ? "Silenciar" : "Ativar som"}</button> : null}<span><b>{item.title}</b><small>{item.subtitle}</small>{item.instagramHandle && item.instagramUrl ? <a className="ep-case-card__instagram" href={item.instagramUrl} target="_blank" rel="noreferrer" onPointerDown={(event) => event.stopPropagation()}><img src="https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png" alt="" />{item.instagramHandle}</a> : null}</span>
    </article>; })}
  </div>;
}
