import { ArrowUpRight, Globe2 } from "lucide-react";

export type FooterGroup = { title: string; links: Array<{ label: string; href: string }> };

export function SiteFooter({ logoSrc, groups, note = "Transporte internacional de pets com planejamento individual." }: { logoSrc: string; groups: FooterGroup[]; note?: string }) {
  return <footer className="ep-site-footer"><div className="ep-container"><div className="ep-footer-grid"><div className="ep-footer-brand"><img src={logoSrc} alt="Embarpet" /><p>{note}</p><a href="#analise">Falar sobre a viagem <ArrowUpRight size={15} /></a></div>{groups.map((group) => <div key={group.title} className="ep-footer-group"><b>{group.title}</b>{group.links.map((link) => <a key={link.label} href={link.href}>{link.label}</a>)}</div>)}</div><div className="ep-footer-bottom"><span>© Embarpet · Todos os direitos reservados</span><div><a href="#idioma"><Globe2 size={13} /> PT-BR</a><a href="/privacidade">Privacidade</a><a href="/termos">Termos de uso</a></div></div></div></footer>;
}
