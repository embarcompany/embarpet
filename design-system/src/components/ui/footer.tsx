import { ArrowUpRight, ChevronDown, Globe2 } from "lucide-react";

export type FooterGroup = { title: string; links: Array<{ label: string; href: string }> };

export function SiteFooter({ logoSrc, groups, note = "Transporte internacional de pets com planejamento individual." }: { logoSrc: string; groups: FooterGroup[]; note?: string }) {
  const socials = [
    { label:"Instagram", href:"https://www.instagram.com/embarpet/", iconSrc:"https://cdn.simpleicons.org/instagram/ffffff" },
    { label:"Facebook", href:"https://www.facebook.com/embarpet/", iconSrc:"https://cdn.simpleicons.org/facebook/ffffff" },
    { label:"LinkedIn", href:"https://br.linkedin.com/company/embarpet", iconSrc:"https://cdn.simpleicons.org/linkedin/ffffff" },
    { label:"YouTube", href:"https://www.youtube.com/@embarpet", iconSrc:"https://cdn.simpleicons.org/youtube/ffffff" },
    { label:"TikTok", href:"https://www.tiktok.com/@embarpet", iconSrc:"https://cdn.simpleicons.org/tiktok/ffffff" },
  ];

  return <footer className="ep-site-footer"><div className="ep-container"><div className="ep-footer-grid"><div className="ep-footer-brand"><img src={logoSrc} alt="Embarpet" /><p>{note}</p><div className="ep-footer-socials" aria-label="Redes sociais da Embarpet">{socials.map(({ label, href, iconSrc }) => <a key={label} href={href} target="_blank" rel="noreferrer" aria-label={label} title={label}><img src={iconSrc} alt="" /></a>)}</div><a href="#analise">Falar sobre a viagem <ArrowUpRight size={15} /></a></div>{groups.map((group) => <details key={group.title} className="ep-footer-group"><summary><b>{group.title}</b><ChevronDown size={16} aria-hidden="true" /></summary>{group.links.map((link) => <a key={link.label} href={link.href}>{link.label}</a>)}</details>)}</div><div className="ep-footer-bottom"><span>© Embarpet · Todos os direitos reservados</span><div><a href="#idioma"><Globe2 size={13} /> PT-BR</a><a href="/privacidade">Privacidade</a><a href="/termos">Termos de uso</a></div></div></div></footer>;
}
