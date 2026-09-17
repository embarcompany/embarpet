"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  ArrowRight,
  Award,
  Check,
  ChevronDown,
  ChevronRight,
  ClipboardCheck,
  Compass,
  Crown,
  Globe2,
  HeartHandshake,
  HelpCircle,
  MapPin,
  Menu,
  MessageCircle,
  Package,
  Plane,
  Route,
  Search,
  ShieldCheck,
  Sparkles,
  Stethoscope,
  Users,
  X,
  type LucideIcon,
} from "lucide-react";
import { cn } from "../../lib/utils";
import { DEFAULT_EMBARPET_WHATSAPP, getSmartWhatsAppUrl, openWhatsApp } from "../../lib/whatsapp";
import { languageOptions, localizePath, useLocale } from "../../i18n/locale";
import { countryFlagSvg } from "../../lib/country-flag";

export type NavigationLink = {
  label: string;
  href: string;
  description?: string;
  icon?: LucideIcon;
  flagSrc?: string;
  badge?: string;
  badges?: string[];
  highlight?: boolean;
  colSpan?: number;
};

export type NavigationItem = NavigationLink & {
  children?: NavigationLink[];
  featuredChildren?: NavigationLink[];
  promoAction?: {
    badge?: string;
    badges?: string[];
    icon?: LucideIcon;
    title: string;
    description: string;
    buttonLabel: string;
    imageSrc?: string;
    href?: string;
  };
};

export function extractBadges(item?: { badge?: string; badges?: string[] } | null): string[] {
  if (!item) return [];
  if (item.badges && item.badges.length > 0) return item.badges;
  if (!item.badge) return [];
  if (item.badge.includes("·")) {
    return item.badge.split("·").map((s) => s.trim()).filter(Boolean);
  }
  return [item.badge];
}

export function LanguageSelector({ compact = false }: { compact?: boolean }) {
  const { locale, text } = useLocale();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const current = languageOptions.find((option) => option.code === locale) ?? languageOptions[0];
  const normalize = (value: string) => value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLocaleLowerCase();
  const filteredOptions = languageOptions.filter((option) =>
    normalize(`${option.label} ${option.shortLabel} ${option.code}`).includes(normalize(query.trim()))
  );
  const cancelScheduledClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = null;
  };
  const openMenu = () => {
    cancelScheduledClose();
    setOpen(true);
  };
  const close = () => {
    cancelScheduledClose();
    setOpen(false);
    setQuery("");
  };
  const scheduleClose = () => {
    cancelScheduledClose();
    closeTimer.current = setTimeout(close, 180);
  };
  useEffect(() => () => cancelScheduledClose(), []);
  return (
    <div
      className={cn("ep-language-selector", compact && "ep-language-selector--compact")}
      onMouseEnter={openMenu}
      onMouseLeave={scheduleClose}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) close();
      }}
    >
      <button
        type="button"
        aria-label={text.language}
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((currentOpen) => !currentOpen)}
      >
        <span>
          <img src={current.flagSrc} alt="" aria-hidden="true" />
          {current.shortLabel}
        </span>
      </button>
      {open ? (
        <div className="ep-language-selector__menu">
          <label className="ep-language-selector__search">
            <Search size={15} aria-hidden="true" />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Buscar idioma"
              aria-label="Buscar idioma"
            />
          </label>
          <div className="ep-language-selector__list" role="listbox" aria-label={text.language}>
            {filteredOptions.map((option) => (
              <a
                key={option.code}
                href={localizePath(option.code, window.location.pathname + window.location.search)}
                role="option"
                aria-selected={locale === option.code}
                onClick={close}
              >
                <span>
                  <img src={option.flagSrc} alt="" aria-hidden="true" />
                </span>
                <b>{option.label}</b>
                {locale === option.code ? <Check size={14} aria-hidden="true" /> : null}
              </a>
            ))}
            {filteredOptions.length === 0 ? <p>Nenhum idioma encontrado.</p> : null}
          </div>
        </div>
      ) : null}
    </div>
  );
}

export function SiteHeader({
  logoSrc,
  items,
  cta,
  utilityItems = [],
  activeLabel,
  overlay = false,
  showLanguage = true,
  showMobileJourney = true,
  mobileCtaLabel,
  onCtaClick,
}: {
  logoSrc: string;
  items?: NavigationItem[];
  cta?: NavigationLink;
  utilityItems?: NavigationLink[];
  activeLabel?: string;
  overlay?: boolean;
  showLanguage?: boolean;
  showMobileJourney?: boolean;
  mobileCtaLabel?: string;
  onCtaClick?: () => void;
}) {
  const { text, path } = useLocale();
  const [open, setOpen] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileAccordion, setMobileAccordion] = useState<string | null>(null);
  const closeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleMenuEnter = (label: string) => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
    setOpen(label);
  };

  const handleMenuLeave = () => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
    }
    closeTimeoutRef.current = setTimeout(() => {
      setOpen(null);
    }, 220);
  };

  const closeMenuImmediately = () => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
    setOpen(null);
  };

  useEffect(() => {
    return () => {
      if (closeTimeoutRef.current) {
        clearTimeout(closeTimeoutRef.current);
      }
    };
  }, []);

  const standardItems = useMemo<NavigationItem[]>(
    () => [
      {
        label: text.navDestinations,
        href: path("/#destinos"),
        children: [
          { label: "Estados Unidos", href: path("/destinos/estados-unidos"), description: "Conformidade CDC e entrada ágil", flagSrc: countryFlagSvg("US") },
          { label: "Portugal & Europa", href: path("/destinos/portugal"), description: "Porta de entrada na UE com microchip", flagSrc: countryFlagSvg("PT") },
          { label: "Espanha", href: path("/destinos/espanha"), description: "Planejamento e CVI oficial", flagSrc: countryFlagSvg("ES") },
          { label: "Itália", href: path("/destinos/italia"), description: "Rotas e trânsito comunitário", flagSrc: countryFlagSvg("IT") },
          { label: "Argentina", href: path("/destinos/argentina"), description: "Conexões e MERCOSUL", flagSrc: countryFlagSvg("AR") },
          { label: "Uruguai", href: path("/destinos/uruguai"), description: "Documentação fronteiriça", flagSrc: countryFlagSvg("UY") },
          { label: "Paraguai", href: path("/destinos/paraguai"), description: "Requisitos de entrada", flagSrc: countryFlagSvg("PY") },
          {
            label: "Outros 80+ Destinos",
            href: path("/#destinos"),
            description: "Consulte sua rota sob medida para mais de 80 países atendidos",
            badge: "Rotas Globais",
            icon: Globe2,
            colSpan: 2,
          },
        ],
        promoAction: {
          badge: "Planejamento Sob Medida",
          icon: Compass,
          title: "Vai para outro país?",
          description: "Planejamos rotas personalizadas com sincronia de laudos, vacinas e microchip para mais de 80 destinos internacionais.",
          buttonLabel: "Consultar Especialista",
          imageSrc: "/embarpet-megamenu-destinos.jpg",
        },
      },
      {
        label: text.navModalities,
        href: path("/#modalidades"),
        children: [
          {
            label: "Viagem na Cabine",
            href: path("/#modalidades"),
            badge: "Até 8–10kg",
            description: "Com o tutor dentro da cabine de passageiros, quando rota e porte permitem.",
            icon: Plane,
          },
          {
            label: "Bagagem Acompanhada",
            href: path("/#modalidades"),
            badge: "Mesmo Voo",
            description: "No mesmo voo do tutor, em compartimento apropriado, pressurizado e climatizado.",
            icon: Package,
          },
          {
            label: "Compartimento de Cargas",
            href: path("/#modalidades"),
            badge: "Carga Viva",
            description: "Operação dedicada para portes médios/grandes ou quando o tutor viaja em outra data.",
            icon: Route,
          },
          {
            label: "Suporte Emocional & Cão Guia",
            href: path("/#modalidades"),
            badge: "Casos Especiais",
            description: "Orientação e conformidade técnica para animais de assistência em viagens internacionais.",
            icon: HeartHandshake,
          },
          {
            label: "PetLuxo",
            href: path("/#modalidades"),
            badges: ["Exclusivo", "Acompanhamento VIP"],
            description: "Consultor dedicado acompanhando cada marco da jornada até a entrega com a família.",
            icon: Crown,
          },
        ],
        promoAction: {
          badge: "Diagnóstico Veterinário",
          icon: Stethoscope,
          title: "Dúvida sobre a modalidade?",
          description: "Nossa equipe avalia raça, medidas anatômicas e peso para indicar a modalidade 100% segura para seu pet.",
          buttonLabel: "Avaliar Modalidade",
          imageSrc: "/embarpet-megamenu-modalidades.jpg",
        },
      },
      {
        label: text.navHow,
        href: path("/#como-funciona"),
      },
      {
        label: "Sobre Nós",
        href: path("/sobre"),
        badges: ["Aeroporto GRU", "Desde 2018"],
      },
      {
        label: "Histórias",
        href: path("/#historias"),
      },
    ],
    [path, text.navDestinations, text.navHow, text.navModalities]
  );

  const navigationItems = items ?? standardItems;
  const resolvedCta = cta ?? { label: text.analyze, href: path("/analise") };
  const isHome = typeof window !== "undefined" && window.location.pathname === path("/");

  const openMobilePlanner = (route: unknown = {}) => {
    const detail = route && typeof route === "object" && ("origin" in route || "destination" in route) ? route : {};
    setMobileOpen(false);
    if (!isHome) {
      window.location.assign(path("/analise"));
      return;
    }
    window.dispatchEvent(new CustomEvent("embarp:open-analysis", { detail }));
  };

  const openPrimaryCta = () => {
    if (onCtaClick) {
      setMobileOpen(false);
      onCtaClick();
      return;
    }
    if (resolvedCta.href.startsWith("#")) {
      setMobileOpen(false);
      document.getElementById(resolvedCta.href.slice(1))?.scrollIntoView({ behavior: "smooth" });
      return;
    }
    openMobilePlanner();
  };

  return (
    <>
      <header className={cn("ep-site-header", overlay && "ep-site-header--overlay", !showMobileJourney && "ep-site-header--compact-mobile")}>
        <nav className="ep-site-nav ep-container" aria-label="Main navigation">
          {/* Left: Logo + Desktop Menu */}
          <div className="ep-site-nav__left">
            <a className="ep-site-logo" href={path("/")} title="Embarpet — Transporte Aéreo Internacional de Pets">
              <img src={logoSrc} alt="Embarpet" />
            </a>

            <div className="ep-site-nav__desktop">
              {navigationItems.map((item) => {
                const hasSubmenu = Boolean(item.children?.length || item.featuredChildren?.length);

                if (!hasSubmenu) {
                  return (
                    <a
                      key={item.label}
                      className={cn("ep-nav-link", activeLabel === item.label && "is-active")}
                      href={item.href}
                    >
                      {item.label}
                    </a>
                  );
                }

                const isOpen = open === item.label;

                return (
                  <div
                    key={item.label}
                    className="ep-nav-dropdown"
                    onMouseEnter={() => handleMenuEnter(item.label)}
                    onMouseLeave={handleMenuLeave}
                    onFocus={() => handleMenuEnter(item.label)}
                    onBlur={(event) => {
                      if (!event.currentTarget.contains(event.relatedTarget)) handleMenuLeave();
                    }}
                  >
                    <button
                      type="button"
                      className={cn("ep-nav-link", activeLabel === item.label && "is-active", isOpen && "is-open")}
                      aria-expanded={isOpen}
                      onClick={() => (isOpen ? closeMenuImmediately() : handleMenuEnter(item.label))}
                    >
                      {item.label}
                      <ChevronDown size={14} className="ep-nav-chevron" />
                    </button>

                    {isOpen ? (
                      <div
                        className={cn("ep-mega-menu", item.label === text.navDestinations ? "ep-mega-menu--destinations" : "ep-mega-menu--modalities")}
                        onMouseEnter={() => handleMenuEnter(item.label)}
                        onMouseLeave={handleMenuLeave}
                      >
                        <div className="ep-mega-menu__container">
                          <div className="ep-mega-menu__columns">
                            {/* Main Options Grid */}
                            <div className="ep-mega-menu__main-col">
                              <span className="ep-mega-menu__section-label">
                                {item.label === text.navDestinations ? "Destinos Internacionais" : "Modalidades de Voo"}
                              </span>
                              <div className="ep-mega-menu__grid">
                                {item.children?.map((child) => {
                                  const ChildIcon = child.icon ?? ArrowRight;
                                  const isLuxury = child.highlight || child.label === "PetLuxo";
                                  const isColSpan2 = child.colSpan === 2;
                                  const isFullWidth = child.colSpan === 3 || child.colSpan === -1;
                                  return (
                                    <a
                                      key={child.label}
                                      href={child.href}
                                      className={cn(
                                        "ep-mega-menu__item",
                                        isLuxury && "ep-mega-menu__item--luxury",
                                        isColSpan2 && "ep-mega-menu__item--span-2",
                                        isFullWidth && "ep-mega-menu__item--span-all"
                                      )}
                                      onClick={closeMenuImmediately}
                                    >
                                      <span className={cn("ep-mega-menu__icon", isLuxury && "ep-mega-menu__icon--luxury")}>
                                        {child.flagSrc ? (
                                          <img src={child.flagSrc} alt="" aria-hidden="true" />
                                        ) : (
                                          <ChildIcon size={18} />
                                        )}
                                      </span>
                                      <div className="ep-mega-menu__item-info">
                                        <div className="ep-mega-menu__item-head">
                                          <b>{child.label}</b>
                                          <div className="ep-mega-menu__badges-wrap">
                                            {extractBadges(child).map((b, i) => (
                                              <span
                                                key={i}
                                                className={cn(
                                                  isLuxury
                                                    ? (i === 0 ? "ep-mega-menu__badge--luxury" : "ep-mega-menu__badge--luxury-subtle")
                                                    : (i === 0 ? "ep-mega-menu__badge--subtle" : "ep-mega-menu__badge--secondary")
                                                )}
                                              >
                                                {isLuxury && i === 0 ? <Sparkles size={9} aria-hidden="true" /> : null}
                                                {b}
                                              </span>
                                            ))}
                                          </div>
                                        </div>
                                        {child.description ? <small>{child.description}</small> : null}
                                      </div>
                                    </a>
                                  );
                                })}
                              </div>
                            </div>

                            {/* Promotional / Conversion Column */}
                            {item.promoAction ? (
                              <div className="ep-mega-menu__promo-col">
                                <span className="ep-mega-menu__section-label">
                                  {item.label === text.navDestinations ? "Assessoria Personalizada" : "Diagnóstico Seguro"}
                                </span>
                                <div className="ep-mega-menu__promo-card">
                                  <div className="ep-mega-menu__promo-top">
                                    {item.promoAction.imageSrc ? (
                                      <div className="ep-mega-menu__promo-media">
                                        <img src={item.promoAction.imageSrc} alt="" />
                                      </div>
                                    ) : null}
                                    <div className="ep-mega-menu__badges-wrap">
                                      {extractBadges(item.promoAction).map((b, i) => {
                                        const PromoBadgeIcon = item.promoAction?.icon ?? (item.label === text.navDestinations ? Compass : Stethoscope);
                                        return (
                                          <span key={i} className="ep-mega-menu__promo-badge">
                                            <PromoBadgeIcon size={12} aria-hidden="true" />
                                            {b}
                                          </span>
                                        );
                                      })}
                                    </div>
                                    <b>{item.promoAction.title}</b>
                                    <p>{item.promoAction.description}</p>
                                  </div>
                                  <button
                                    type="button"
                                    className="ep-mega-menu__promo-btn"
                                    onClick={() => {
                                      closeMenuImmediately();
                                      openPrimaryCta();
                                    }}
                                  >
                                    {item.promoAction.buttonLabel}
                                  </button>
                                </div>
                              </div>
                            ) : null}
                          </div>
                        </div>
                      </div>
                    ) : null}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right: WhatsApp + Language + Primary Action */}
          {/* Right: WhatsApp + Language + Primary Action */}
          <div className="ep-site-nav__right">
            <div className="ep-nav-utilities">
              {showLanguage ? <LanguageSelector /> : null}

              {utilityItems.map((item) => {
                const UtilityIcon = item.icon;
                return (
                  <a key={item.label} href={item.href}>
                    {UtilityIcon ? <UtilityIcon size={15} /> : null}
                    {item.label}
                  </a>
                );
              })}
            </div>

            <a
              className="ep-nav-cta"
              href={resolvedCta.href}
              onClick={(event) => {
                if (onCtaClick || (resolvedCta.href === path("/analise") && isHome)) {
                  event.preventDefault();
                  onCtaClick ? openPrimaryCta() : openMobilePlanner();
                }
              }}
            >
              <span>{resolvedCta.label}</span>
              <img className="ep-nav-cta__plane" src="/embarpet-cta-plane-top.webp" alt="" aria-hidden="true" />
            </a>
          </div>

          {/* Mobile Right Controls: Fast CTA + Burger Trigger */}
          <div className="ep-site-nav__mobile-controls">
            <button className="ep-nav-mobile-cta" type="button" onClick={openPrimaryCta}>
              <span>{mobileCtaLabel ?? (resolvedCta.label === text.analyze ? "Analisar viagem" : resolvedCta.label)}</span>
            </button>
            <button
              className="ep-nav-mobile-toggle"
              type="button"
              aria-label={mobileOpen ? text.close : "Abrir menu"}
              aria-expanded={mobileOpen}
              onClick={() => setMobileOpen((value) => !value)}
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </nav>

        {/* Mobile Slide Drawer Menu */}
        {mobileOpen ? (
          <div className="ep-mobile-menu">
            <div className="ep-container ep-mobile-menu__inner">
              {/* Quick Trip Search inside Megamenu */}
              <div className="ep-mobile-menu__search">
                <MapPin size={17} className="ep-mobile-menu__search-icon" aria-hidden="true" />
                <button
                  className="ep-mobile-menu__search-trigger"
                  type="button"
                  onClick={openPrimaryCta}
                >
                  Analisar a viagem
                </button>
                <button
                  className="ep-mobile-menu__search-cta"
                  type="button"
                  onClick={openPrimaryCta}
                >
                  {text.startTrip}
                </button>
              </div>


              {/* WhatsApp Fast Header on Mobile */}
              <a
                href={getSmartWhatsAppUrl(
                  DEFAULT_EMBARPET_WHATSAPP,
                  "Olá, gostaria de informações sobre viagem internacional com meu pet."
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="ep-mobile-menu__whatsapp-bar"
                onClick={(e) => {
                  e.preventDefault();
                  openWhatsApp(
                    DEFAULT_EMBARPET_WHATSAPP,
                    "Olá, gostaria de informações sobre viagem internacional com meu pet."
                  );
                }}
              >
                <MessageCircle size={18} />
                <div>
                  <b>Falar com Especialista</b>
                  <small>Atendimento direto no WhatsApp</small>
                </div>
                <ArrowRight size={15} />
              </a>

              {/* Navigation Items with Accordions */}
              <div className="ep-mobile-menu__links">
                {navigationItems.map((item) => {
                  const hasSubmenu = Boolean(item.children?.length || item.featuredChildren?.length);
                  const isAccordionOpen = mobileAccordion === item.label;

                  if (!hasSubmenu) {
                    return (
                      <a
                        key={item.label}
                        href={item.href}
                        className="ep-mobile-menu__direct-link"
                        onClick={() => setMobileOpen(false)}
                      >
                        <span>{item.label}</span>
                        <div className="ep-mega-menu__badges-wrap">
                          {extractBadges(item).map((b, i) => (
                            <span key={i} className="ep-mobile-menu__badge">{b}</span>
                          ))}
                        </div>
                        <ChevronRight size={16} />
                      </a>
                    );
                  }

                  const allChildren = [
                    ...(item.featuredChildren ?? []),
                    ...(item.children ?? []),
                  ];

                  return (
                    <div key={item.label} className="ep-mobile-menu__accordion">
                      <button
                        type="button"
                        className={cn("ep-mobile-menu__accordion-trigger", isAccordionOpen && "is-open")}
                        onClick={() => setMobileAccordion((curr) => (curr === item.label ? null : item.label))}
                      >
                        <span>{item.label}</span>
                        <ChevronDown size={16} className="ep-mobile-menu__accordion-chevron" />
                      </button>

                      {isAccordionOpen ? (
                        <div className="ep-mobile-menu__accordion-content">
                          {allChildren.map((child) => {
                            const isLuxury = child.highlight || child.label === "PetLuxo";
                            const ChildIcon = child.icon ?? Route;
                            return (
                              <a
                                key={child.label}
                                href={child.href}
                                className={cn("ep-mobile-menu__child-link", isLuxury && "ep-mobile-menu__child-link--luxury")}
                                onClick={() => setMobileOpen(false)}
                              >
                                <span className={cn("ep-mobile-menu__child-icon", isLuxury && "ep-mobile-menu__child-icon--luxury")}>
                                  {child.flagSrc ? (
                                    <img src={child.flagSrc} alt="" aria-hidden="true" />
                                  ) : (
                                    <ChildIcon size={14} />
                                  )}
                                </span>
                                <div>
                                  <div className="ep-mobile-menu__child-title">
                                    <b>{child.label}</b>
                                    <div className="ep-mega-menu__badges-wrap">
                                      {extractBadges(child).map((b, i) => (
                                        <span
                                          key={i}
                                          className={cn(
                                            "ep-mobile-menu__badge",
                                            isLuxury && (i === 0 ? "ep-mobile-menu__badge--luxury" : "ep-mobile-menu__badge--luxury-subtle")
                                          )}
                                        >
                                          {isLuxury && i === 0 ? <Sparkles size={8} aria-hidden="true" /> : null}
                                          {b}
                                        </span>
                                      ))}
                                    </div>
                                  </div>
                                  {child.description ? <small>{child.description}</small> : null}
                                </div>
                              </a>
                            );
                          })}
                        </div>
                      ) : null}
                    </div>
                  );
                })}
              </div>

              {/* Bottom Actions in Drawer */}
              <div className="ep-mobile-menu__bottom">
                {showLanguage ? (
                  <div className="ep-mobile-menu__lang-wrap">
                    <LanguageSelector />
                  </div>
                ) : null}

                <button type="button" className="ep-button ep-button--primary ep-mobile-menu__cta-btn" onClick={openPrimaryCta}>
                  <span>Iniciar Análise da Viagem</span>
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>
          </div>
        ) : null}
      </header>
    </>
  );
}

export function Breadcrumbs({ items }: { items: Array<{ label: string; href?: string }> }) {
  return (
    <nav className="ep-breadcrumbs" aria-label="Breadcrumb">
      {items.map((item, index) => (
        <span key={item.label}>
          {index ? <i aria-hidden="true">/</i> : null}
          {item.href ? <a href={item.href}>{item.label}</a> : <b aria-current="page">{item.label}</b>}
        </span>
      ))}
    </nav>
  );
}

