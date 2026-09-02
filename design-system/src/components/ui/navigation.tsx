"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { ArrowRight, Check, ChevronDown, ClipboardCheck, Globe2, HeartHandshake, MapPin, Menu, Package, Plane, Route, Search, X, type LucideIcon } from "lucide-react";
import { cn } from "../../lib/utils";
import { languageOptions, localizePath, useLocale } from "../../i18n/locale";
import { countryFlagSvg } from "../../lib/country-flag";

export type NavigationLink = { label: string; href: string; description?: string; icon?: LucideIcon; flagSrc?: string };
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

export function SiteHeader({ logoSrc, items, cta, utilityItems = [], activeLabel, overlay = false, showLanguage = true, showMobileJourney = true, mobileCtaLabel }: { logoSrc: string; items?: NavigationItem[]; cta?: NavigationLink; utilityItems?: NavigationLink[]; activeLabel?: string; overlay?: boolean; showLanguage?: boolean; showMobileJourney?: boolean; mobileCtaLabel?: string }) {
  const { text, path } = useLocale();
  const [open, setOpen] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const standardItems = useMemo<NavigationItem[]>(() => [
    { label:text.navHow, href:path("/#como-funciona") },
    { label:text.navModalities, href:path("/#modalidades"), children:[
      { label:"Viagem na cabine", href:path("/modalidades/viagem-na-cabine"), description:"Com o tutor na cabine, quando perfil e rota permitem.", icon:Plane },
      { label:"Bagagem acompanhada", href:path("/modalidades/bagagem-acompanhada"), description:"No mesmo voo do tutor, em compartimento apropriado.", icon:Package },
      { label:"Compartimento de cargas", href:path("/modalidades/compartimento-de-cargas"), description:"Operação dedicada para diferentes portes e rotas.", icon:Route },
      { label:"Suporte emocional", href:path("/modalidades/suporte-emocional"), description:"Orientação para casos sujeitos a critérios específicos.", icon:HeartHandshake },
    ] },
    { label:text.navServices, href:path("/#servicos") },
    { label:text.navDestinations, href:path("/#destinos"), children:[
      { label:"Estados Unidos", href:path("/destinos/estados-unidos"), description:"Rota prioritária para muitas famílias.", flagSrc:countryFlagSvg("US") },
      { label:"Portugal", href:path("/#destinos"), description:"Planejamento para entrada na Europa.", flagSrc:countryFlagSvg("PT") },
      { label:"Espanha", href:path("/#destinos"), description:"Requisitos definidos pela rota e pelo pet.", flagSrc:countryFlagSvg("ES") },
      { label:"Itália", href:path("/#destinos"), description:"Uma leitura própria antes do embarque.", flagSrc:countryFlagSvg("IT") },
      { label:"Argentina", href:path("/#destinos"), description:"Planejamento regional com atenção ao caso.", flagSrc:countryFlagSvg("AR") },
      { label:"Uruguai", href:path("/#destinos"), description:"Documentação e operação conectadas.", flagSrc:countryFlagSvg("UY") },
      { label:"Paraguai", href:path("/#destinos"), description:"A rota orienta as próximas etapas.", flagSrc:countryFlagSvg("PY") },
      { label:"Outros destinos", href:path("/#destinos"), description:"Conte outra rota para começarmos a análise.", icon:Globe2 },
    ] },
    { label:text.navContent, href:path("/#faq") },
  ], [path, text.navContent, text.navDestinations, text.navHow, text.navModalities, text.navServices]);
  const navigationItems = items ?? standardItems;
  const resolvedCta = cta ?? { label: text.analyze, href: path("/analise") };
  const isHome = typeof window !== "undefined" && window.location.pathname === path("/");
  const openMobilePlanner = (route: unknown = {}) => {
    const detail = route && typeof route === "object" && ("origin" in route || "destination" in route) ? route : {};
    setMobileOpen(false);
    if (!isHome) { window.location.assign(path("/analise")); return; }
    window.dispatchEvent(new CustomEvent("embarp:open-analysis", { detail }));
  };
  const openPrimaryCta = () => {
    if (resolvedCta.href.startsWith("#")) {
      setMobileOpen(false);
      document.getElementById(resolvedCta.href.slice(1))?.scrollIntoView({ behavior: "smooth" });
      return;
    }
    openMobilePlanner();
  };
  const mobileShortcutItems = [
    { href: navigationItems[0]?.href ?? path("/#como-funciona"), icon:ClipboardCheck, label:text.navHow },
    { href: navigationItems[1]?.href ?? path("/#modalidades"), icon:Route, label:text.navModalities },
    { href: navigationItems[3]?.href ?? path("/#destinos"), icon:MapPin, label:text.navDestinations },
    { href:path("/#historias"), icon:HeartHandshake, label:"Histórias" },
  ];
  return <>
    <header className={cn("ep-site-header", overlay && "ep-site-header--overlay", !showMobileJourney && "ep-site-header--compact-mobile")}><nav className="ep-site-nav ep-container" aria-label="Main navigation">
      <div className="ep-site-nav__left"><a className="ep-site-logo" href={path("/")}><img src={logoSrc} alt="Embarpet" /></a><div className="ep-site-nav__desktop">{navigationItems.map((item) => item.children?.length ? <div key={item.label} className="ep-nav-dropdown" onMouseEnter={() => setOpen(item.label)} onMouseLeave={() => setOpen(null)} onFocus={() => setOpen(item.label)} onBlur={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) setOpen(null); }}><button type="button" className={cn(activeLabel === item.label && "is-active", open === item.label && "is-open")} aria-expanded={open === item.label} onClick={() => setOpen((current) => current === item.label ? null : item.label)}>{item.label}<ChevronDown size={15} /></button>{open === item.label ? <div className={cn("ep-mega-menu", item.label === text.navDestinations && "ep-mega-menu--destinations")}>{item.children.map((child) => { const ChildIcon = child.icon ?? ArrowRight; return <a key={child.label} href={child.href} onClick={() => setOpen(null)}><span>{child.flagSrc ? <img src={child.flagSrc} alt="" aria-hidden="true" /> : <ChildIcon size={16} />}</span><div><b>{child.label}</b>{child.description ? <small>{child.description}</small> : null}</div></a>; })}</div> : null}</div> : <a className={cn(activeLabel === item.label && "is-active")} key={item.label} href={item.href}>{item.label}</a>)}</div></div>
      <div className="ep-site-nav__right"><div className="ep-nav-utilities">{showLanguage ? <LanguageSelector /> : null}{utilityItems.map((item) => { const UtilityIcon = item.icon; return <a key={item.label} href={item.href}>{UtilityIcon ? <UtilityIcon size={15} /> : null}{item.label}</a>; })}</div><a className="ep-nav-cta" href={resolvedCta.href} onClick={(event) => { if (resolvedCta.href === path("/analise") && isHome) { event.preventDefault(); openMobilePlanner(); } }}><span>{resolvedCta.label}</span><img className="ep-nav-cta__plane" src="/embarpet-cta-plane-top.webp" alt="" aria-hidden="true" /></a></div>
      <button className="ep-nav-mobile-cta" type="button" onClick={openPrimaryCta}><span>{mobileCtaLabel ?? resolvedCta.label}</span></button><button className="ep-nav-mobile-toggle" type="button" aria-label={mobileOpen ? text.close : "Open menu"} aria-expanded={mobileOpen} onClick={() => setMobileOpen((value) => !value)}>{mobileOpen ? <X size={22} /> : <Menu size={22} />}</button>
    </nav>{showMobileJourney ? <div className="ep-mobile-journey"><div className="ep-mobile-shortcuts" aria-label="Navigation shortcuts">{mobileShortcutItems.map(({ href, icon: Icon, label }) => <a key={label} href={href}><Icon size={16} /><span>{label}</span></a>)}</div><div className="ep-mobile-route-search"><MapPin size={17} aria-hidden="true" /><button className="ep-mobile-route-search__trigger" type="button" onClick={openPrimaryCta}>{resolvedCta.label}</button><button className="ep-mobile-route-search__cta" type="button" onClick={openPrimaryCta}>{text.startTrip}</button></div></div> : null}{mobileOpen ? <div className="ep-mobile-menu"><div className="ep-container">{navigationItems.map((item) => <div key={item.label}><a href={item.href} onClick={() => setMobileOpen(false)}>{item.label}</a>{item.children?.map((child) => <a key={child.label} className="ep-mobile-menu__child" href={child.href} onClick={() => setMobileOpen(false)}>{child.label}</a>)}</div>)}{showLanguage ? <LanguageSelector /> : null}{showMobileJourney ? <button className="ep-nav-cta" type="button" onClick={openPrimaryCta}>{resolvedCta.label} →</button> : null}</div></div> : null}</header>
  </>;
}

export function Breadcrumbs({ items }: { items: Array<{ label: string; href?: string }> }) {
  return <nav className="ep-breadcrumbs" aria-label="Breadcrumb">{items.map((item, index) => <span key={item.label}>{index ? <i aria-hidden="true">/</i> : null}{item.href ? <a href={item.href}>{item.label}</a> : <b aria-current="page">{item.label}</b>}</span>)}</nav>;
}
