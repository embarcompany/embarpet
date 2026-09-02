import { ArrowUpRight, BookOpenText, ChevronDown, Compass, Globe2, MapPinned, MessageCircle, Route, ShieldCheck, type LucideIcon } from "lucide-react";

export type FooterGroup = { title: string; links: Array<{ label: string; href: string }> };
export type FooterQuickLink = { label: string; description: string; href: string; icon: LucideIcon };

const footerGroupIcons = [Route, BookOpenText, Compass];

export function SiteFooter({ logoSrc, groups, note = "Transporte internacional de pets com planejamento individual.", quickLinks = defaultQuickLinks, brandCta = { label: "Falar sobre a viagem", href: "#analise" }, showLanguageLink = true }: { logoSrc: string; groups: FooterGroup[]; note?: string; quickLinks?: FooterQuickLink[]; brandCta?: { label: string; href: string }; showLanguageLink?: boolean }) {
  const socials = [
    { label: "Instagram", href: "https://www.instagram.com/embarpet/", iconSrc: "/icons/social/instagram-white.svg" },
    { label: "Facebook", href: "https://www.facebook.com/embarpet/", iconSrc: "/icons/social/facebook-white.svg" },
    { label: "LinkedIn", href: "https://br.linkedin.com/company/embarpet", iconSrc: "/icons/social/linkedin-white.svg" },
    { label: "YouTube", href: "https://www.youtube.com/@embarpet", iconSrc: "/icons/social/youtube-white.svg" },
    { label: "TikTok", href: "https://www.tiktok.com/@embarpet", iconSrc: "/icons/social/tiktok-white.svg" },
  ];

  return (
    <footer className="ep-site-footer">
      <div className="ep-container">
        <div className="ep-footer-utility" aria-label="Acessos rápidos">
          {quickLinks.map(({ label, description, href, icon: Icon }) => <a href={href} key={label}><span className="ep-footer-utility__icon"><Icon size={16} /></span><span><b>{label}</b><small>{description}</small></span><ArrowUpRight size={15} /></a>)}
        </div>

        <div className="ep-footer-grid">
          <div className="ep-footer-brand">
            <img src={logoSrc} alt="Embarpet" />
            <p>{note}</p>
            <div className="ep-footer-socials" aria-label="Redes sociais da Embarpet">
              {socials.map(({ label, href, iconSrc }) => <a key={label} href={href} target="_blank" rel="noreferrer" aria-label={label} title={label}><img src={iconSrc} alt="" /></a>)}
            </div>
            <a href={brandCta.href}>{brandCta.label} <ArrowUpRight size={15} /></a>
          </div>

          <nav className="ep-footer-desktop-nav" aria-label="Navegação do rodapé">
            {groups.map((group, index) => {
              const Icon = footerGroupIcons[index] ?? Compass;
              return <section key={group.title} className="ep-footer-group ep-footer-group--desktop"><div className="ep-footer-group__title"><span><Icon size={16} /></span><b>{group.title}</b></div>{group.links.map((link) => <a key={link.label} href={link.href}><span>{link.label}</span><ArrowUpRight size={13} aria-hidden="true" /></a>)}</section>;
            })}
          </nav>

          <div className="ep-footer-mobile-nav">
            {groups.map((group) => <details key={group.title} className="ep-footer-group"><summary><b>{group.title}</b><ChevronDown size={16} aria-hidden="true" /></summary>{group.links.map((link) => <a key={link.label} href={link.href}>{link.label}</a>)}</details>)}
          </div>
        </div>

        <div className="ep-footer-bottom"><span>© Embarpet · Todos os direitos reservados</span><span className="ep-footer-credit">Criado por <b>Montuan MKT Digital</b> e <b>Igor Marin Santos</b></span><div>{showLanguageLink ? <a href="#idioma"><Globe2 size={13} /> PT</a> : null}<a href="/privacidade">Privacidade</a><a href="/termos">Termos de uso</a></div></div>
      </div>
    </footer>
  );
}

const defaultQuickLinks: FooterQuickLink[] = [
  { label: "Começar uma análise", description: "Conte a rota do seu pet", href: "#analise", icon: MessageCircle },
  { label: "Ver destinos atendidos", description: "Planeje a rota com contexto", href: "#destinos", icon: MapPinned },
  { label: "Tirar dúvidas da viagem", description: "Informações antes do embarque", href: "#faq", icon: ShieldCheck },
];
