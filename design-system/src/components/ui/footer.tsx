import { ArrowUpRight, BookOpenText, ChevronDown, Compass, Globe2, MapPinned, MessageCircle, Route, ShieldCheck } from "lucide-react";

export type FooterGroup = { title: string; links: Array<{ label: string; href: string }> };

const footerGroupIcons = [Route, BookOpenText, Compass];

export function SiteFooter({ logoSrc, groups, note = "Transporte internacional de pets com planejamento individual." }: { logoSrc: string; groups: FooterGroup[]; note?: string }) {
  const socials = [
    { label: "Instagram", href: "https://www.instagram.com/embarpet/", iconSrc: "https://cdn.simpleicons.org/instagram/ffffff" },
    { label: "Facebook", href: "https://www.facebook.com/embarpet/", iconSrc: "https://cdn.simpleicons.org/facebook/ffffff" },
    { label: "LinkedIn", href: "https://br.linkedin.com/company/embarpet", iconSrc: "https://cdn.simpleicons.org/linkedin/ffffff" },
    { label: "YouTube", href: "https://www.youtube.com/@embarpet", iconSrc: "https://cdn.simpleicons.org/youtube/ffffff" },
    { label: "TikTok", href: "https://www.tiktok.com/@embarpet", iconSrc: "https://cdn.simpleicons.org/tiktok/ffffff" },
  ];

  return (
    <footer className="ep-site-footer">
      <div className="ep-container">
        <div className="ep-footer-utility" aria-label="Acessos rápidos">
          <a href="#analise"><span className="ep-footer-utility__icon"><MessageCircle size={16} /></span><span><b>Começar uma análise</b><small>Conte a rota do seu pet</small></span><ArrowUpRight size={15} /></a>
          <a href="#destinos"><span className="ep-footer-utility__icon"><MapPinned size={16} /></span><span><b>Ver destinos atendidos</b><small>Planeje a rota com contexto</small></span><ArrowUpRight size={15} /></a>
          <a href="#faq"><span className="ep-footer-utility__icon"><ShieldCheck size={16} /></span><span><b>Tirar dúvidas da viagem</b><small>Informações antes do embarque</small></span><ArrowUpRight size={15} /></a>
        </div>

        <div className="ep-footer-grid">
          <div className="ep-footer-brand">
            <img src={logoSrc} alt="Embarpet" />
            <p>{note}</p>
            <div className="ep-footer-socials" aria-label="Redes sociais da Embarpet">
              {socials.map(({ label, href, iconSrc }) => <a key={label} href={href} target="_blank" rel="noreferrer" aria-label={label} title={label}><img src={iconSrc} alt="" /></a>)}
            </div>
            <a href="#analise">Falar sobre a viagem <ArrowUpRight size={15} /></a>
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

        <div className="ep-footer-bottom"><span>© Embarpet · Todos os direitos reservados</span><span className="ep-footer-credit">Criado por <b>Montuan MKT Digital</b> e <b>Igor Marin Santos</b></span><div><a href="#idioma"><Globe2 size={13} /> PT</a><a href="/privacidade">Privacidade</a><a href="/termos">Termos de uso</a></div></div>
      </div>
    </footer>
  );
}
