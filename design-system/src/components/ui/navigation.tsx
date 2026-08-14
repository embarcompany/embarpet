"use client";

import { useState } from "react";
import { AlertTriangle, ArrowRight, ChevronDown, Globe2, Menu, X, type LucideIcon } from "lucide-react";
import { cn } from "../../lib/utils";

export type NavigationLink = { label: string; href: string; description?: string; icon?: LucideIcon };
export type NavigationItem = NavigationLink & { children?: NavigationLink[] };

export function SiteHeader({ logoSrc, items, cta = { label:"Analisar a viagem", href:"#analise" }, utilityItems = [{ label:"PT-BR", href:"#", icon:Globe2 },{ label:"Dúvidas", href:"#faq" }], activeLabel, overlay = false }: { logoSrc: string; items: NavigationItem[]; cta?: NavigationLink; utilityItems?: NavigationLink[]; activeLabel?: string; overlay?: boolean }) {
  const [open, setOpen] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [noticeOpen, setNoticeOpen] = useState(() => typeof window === "undefined" || window.localStorage.getItem("embarpets-notice-dismissed") !== "true");
  const dismissNotice = () => { window.localStorage.setItem("embarpets-notice-dismissed", "true"); setNoticeOpen(false); };
  return <>{noticeOpen ? <div className="ep-site-notice" role="note"><AlertTriangle size={14} /><p><b>Aviso importante:</b> atendemos somente destinos internacionais. Voos nacionais são auxiliados apenas quando conectam a uma viagem internacional.</p><button type="button" onClick={dismissNotice} aria-label="Fechar aviso"><X size={15} /></button></div> : null}<header className={cn("ep-site-header", overlay && "ep-site-header--overlay")}><nav className="ep-site-nav ep-container" aria-label="Navegação principal">
    <div className="ep-site-nav__left"><a className="ep-site-logo" href="/"><img src={logoSrc} alt="Embarpet" /></a>
    <div className="ep-site-nav__desktop">{items.map((item) => item.children?.length ? <div key={item.label} className="ep-nav-dropdown" onMouseEnter={() => setOpen(item.label)} onMouseLeave={() => setOpen(null)} onFocus={() => setOpen(item.label)} onBlur={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) setOpen(null); }}><button type="button" className={cn(activeLabel === item.label && "is-active", open === item.label && "is-open")} aria-expanded={open === item.label} onClick={() => setOpen((current) => current === item.label ? null : item.label)}>{item.label}<ChevronDown size={15} /></button>{open === item.label ? <div className="ep-mega-menu">{item.children.map((child) => { const ChildIcon = child.icon ?? ArrowRight; return <a key={child.label} href={child.href} onClick={() => setOpen(null)}><span><ChildIcon size={16} /></span><div><b>{child.label}</b>{child.description ? <small>{child.description}</small> : null}</div></a>; })}</div> : null}</div> : <a className={cn(activeLabel === item.label && "is-active")} key={item.label} href={item.href}>{item.label}</a>)}</div></div>
    <div className="ep-site-nav__right"><div className="ep-nav-utilities">{utilityItems.map((item) => { const UtilityIcon = item.icon; return <a key={item.label} href={item.href}>{UtilityIcon ? <UtilityIcon size={15} /> : null}{item.label}</a>; })}</div><a className="ep-nav-cta" href={cta.href}><span>{cta.label}</span><img className="ep-nav-cta__plane" src="/embarpet-cta-plane-top.png" alt="" aria-hidden="true" /></a></div>
    <button className="ep-nav-mobile-toggle" type="button" aria-label={mobileOpen ? "Fechar menu" : "Abrir menu"} aria-expanded={mobileOpen} onClick={() => setMobileOpen((value) => !value)}>{mobileOpen ? <X size={22} /> : <Menu size={22} />}</button>
  </nav>{mobileOpen ? <div className="ep-mobile-menu"><div className="ep-container">{items.map((item) => <div key={item.label}><a href={item.href} onClick={() => setMobileOpen(false)}>{item.label}</a>{item.children?.map((child) => <a key={child.label} className="ep-mobile-menu__child" href={child.href} onClick={() => setMobileOpen(false)}>{child.label}</a>)}</div>)}<a className="ep-nav-cta" href={cta.href} onClick={() => setMobileOpen(false)}>{cta.label} →</a></div></div> : null}</header></>;
}

export function Breadcrumbs({ items }: { items: Array<{ label: string; href?: string }> }) {
  return <nav className="ep-breadcrumbs" aria-label="Caminho da página">{items.map((item, index) => <span key={item.label}>{index ? <i aria-hidden="true">/</i> : null}{item.href ? <a href={item.href}>{item.label}</a> : <b aria-current="page">{item.label}</b>}</span>)}</nav>;
}
