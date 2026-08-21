"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowRight, Check, ChevronDown, ClipboardCheck, HeartHandshake, MapPin, Menu, Route, Search, X, type LucideIcon } from "lucide-react";
import { cn } from "../../lib/utils";
import { languageOptions, localizePath, useLocale } from "../../i18n/locale";

export type NavigationLink = { label: string; href: string; description?: string; icon?: LucideIcon };
export type NavigationItem = NavigationLink & { children?: NavigationLink[] };

export function LanguageSelector({ compact = false }: { compact?: boolean }) {
  const { locale, text } = useLocale();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const current = languageOptions.find((option) => option.code === locale) ?? languageOptions[0];
  const normalize = (value: string) => value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLocaleLowerCase();
  const filteredOptions = languageOptions.filter((option) => normalize(`${option.label} ${option.shortLabel} ${option.code}`).includes(normalize(query.trim())));
  const cancelScheduledClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = null;
  };
  const openMenu = () => { cancelScheduledClose(); setOpen(true); };
  const close = () => { cancelScheduledClose(); setOpen(false); setQuery(""); };
  const scheduleClose = () => {
    cancelScheduledClose();
    closeTimer.current = setTimeout(close, 180);
  };
  useEffect(() => () => cancelScheduledClose(), []);
  return <div className={cn("ep-language-selector", compact && "ep-language-selector--compact")} onMouseEnter={openMenu} onMouseLeave={scheduleClose} onBlur={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) close(); }}>
    <button type="button" aria-label={text.language} aria-haspopup="listbox" aria-expanded={open} onClick={() => setOpen((currentOpen) => !currentOpen)}><span><img src={current.flagSrc} alt="" aria-hidden="true" />{current.shortLabel}</span></button>
    {open ? <div className="ep-language-selector__menu">
      <label className="ep-language-selector__search"><Search size={15} aria-hidden="true" /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Buscar idioma" aria-label="Buscar idioma" /></label>
      <div className="ep-language-selector__list" role="listbox" aria-label={text.language}>{filteredOptions.map((option) => <a key={option.code} href={localizePath(option.code, window.location.pathname + window.location.search)} role="option" aria-selected={locale === option.code} onClick={close}><span><img src={option.flagSrc} alt="" aria-hidden="true" /></span><b>{option.label}</b>{locale === option.code ? <Check size={14} aria-hidden="true" /> : null}</a>)}{filteredOptions.length === 0 ? <p>Nenhum idioma encontrado.</p> : null}</div>
    </div> : null}
  </div>;
}

export function SiteHeader({ logoSrc, items, cta, utilityItems = [], activeLabel, overlay = false }: { logoSrc: string; items: NavigationItem[]; cta?: NavigationLink; utilityItems?: NavigationLink[]; activeLabel?: string; overlay?: boolean }) {
  const { text, path } = useLocale();
  const [open, setOpen] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const resolvedCta = cta ?? { label: text.analyze, href: "#analise" };
  const openMobilePlanner = (route: unknown = {}) => { const detail = route && typeof route === "object" && ("origin" in route || "destination" in route) ? route : {}; setMobileOpen(false); window.dispatchEvent(new CustomEvent("embarp:open-analysis", { detail })); };
  return <>
    <header className={cn("ep-site-header", overlay && "ep-site-header--overlay")}><nav className="ep-site-nav ep-container" aria-label="Main navigation">
      <div className="ep-site-nav__left"><a className="ep-site-logo" href={path("/")}><img src={logoSrc} alt="Embarpet" /></a><div className="ep-site-nav__desktop">{items.map((item) => item.children?.length ? <div key={item.label} className="ep-nav-dropdown" onMouseEnter={() => setOpen(item.label)} onMouseLeave={() => setOpen(null)} onFocus={() => setOpen(item.label)} onBlur={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) setOpen(null); }}><button type="button" className={cn(activeLabel === item.label && "is-active", open === item.label && "is-open")} aria-expanded={open === item.label} onClick={() => setOpen((current) => current === item.label ? null : item.label)}>{item.label}<ChevronDown size={15} /></button>{open === item.label ? <div className="ep-mega-menu">{item.children.map((child) => { const ChildIcon = child.icon ?? ArrowRight; return <a key={child.label} href={child.href} onClick={() => setOpen(null)}><span><ChildIcon size={16} /></span><div><b>{child.label}</b>{child.description ? <small>{child.description}</small> : null}</div></a>; })}</div> : null}</div> : <a className={cn(activeLabel === item.label && "is-active")} key={item.label} href={item.href}>{item.label}</a>)}</div></div>
      <div className="ep-site-nav__right"><div className="ep-nav-utilities"><LanguageSelector />{utilityItems.map((item) => { const UtilityIcon = item.icon; return <a key={item.label} href={item.href}>{UtilityIcon ? <UtilityIcon size={15} /> : null}{item.label}</a>; })}</div><a className="ep-nav-cta" href={resolvedCta.href} onClick={(event) => { if (resolvedCta.href === "#analise") { event.preventDefault(); openMobilePlanner(); } }}><span>{resolvedCta.label}</span><img className="ep-nav-cta__plane" src="/embarpet-cta-plane-top.webp" alt="" aria-hidden="true" /></a></div>
      <button className="ep-nav-mobile-cta" type="button" onClick={() => openMobilePlanner()}><span>{text.startTrip}</span></button><button className="ep-nav-mobile-toggle" type="button" aria-label={mobileOpen ? text.close : "Open menu"} aria-expanded={mobileOpen} onClick={() => setMobileOpen((value) => !value)}>{mobileOpen ? <X size={22} /> : <Menu size={22} />}</button>
    </nav><div className="ep-mobile-journey"><div className="ep-mobile-shortcuts" aria-label="Navigation shortcuts"><a href="#como-funciona"><ClipboardCheck size={16} /><span>{text.navHow}</span></a><a href="#modalidades"><Route size={16} /><span>{text.navModalities}</span></a><a href="#destinos"><MapPin size={16} /><span>{text.navDestinations}</span></a><a href="#historias"><HeartHandshake size={16} /><span>Histórias</span></a></div><div className="ep-mobile-route-search"><MapPin size={17} aria-hidden="true" /><button className="ep-mobile-route-search__trigger" type="button" onClick={openMobilePlanner}>{text.wherePetGoes}</button><button className="ep-mobile-route-search__cta" type="button" onClick={openMobilePlanner}>{text.startTrip}</button></div></div>{mobileOpen ? <div className="ep-mobile-menu"><div className="ep-container">{items.map((item) => <div key={item.label}><a href={item.href} onClick={() => setMobileOpen(false)}>{item.label}</a>{item.children?.map((child) => <a key={child.label} className="ep-mobile-menu__child" href={child.href} onClick={() => setMobileOpen(false)}>{child.label}</a>)}</div>)}<LanguageSelector /><button className="ep-nav-cta" type="button" onClick={openMobilePlanner}>{resolvedCta.label} →</button></div></div> : null}</header>
  </>;
}

export function Breadcrumbs({ items }: { items: Array<{ label: string; href?: string }> }) {
  return <nav className="ep-breadcrumbs" aria-label="Breadcrumb">{items.map((item, index) => <span key={item.label}>{index ? <i aria-hidden="true">/</i> : null}{item.href ? <a href={item.href}>{item.label}</a> : <b aria-current="page">{item.label}</b>}</span>)}</nav>;
}
