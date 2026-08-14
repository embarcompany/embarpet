"use client";

import { ArrowRight, Clock3, Globe2, ShieldCheck } from "lucide-react";

export interface Country { code: string; name: string; }
export interface Region { id: string; label: string; countries: Country[]; }
interface InternationalTransferProps { subtitle?: string; title?: string; description: string; regions: Region[]; onCountrySelect?: (country: Country) => void; }

/** Explorador de destinos prioritários: escolha simples, sem aspecto de catálogo. */
export function InternationalTransfer({ subtitle, title, description, regions, onCountrySelect }: InternationalTransferProps) {
  const priorityOrder = ["us", "pt", "es", "it", "ar", "uy", "py"];
  const allCountries = regions.flatMap((region) => region.countries);
  const countries = priorityOrder.map((code) => allCountries.find((country) => country.code === code)).filter((country): country is Country => Boolean(country));
  return <section className="ep-home-destinations" id="destinos" aria-label="Destinos internacionais"><div className="ep-destination-selector">
    <div className="ep-destination-selector__intro">{subtitle ? <p className="ep-eyebrow">{subtitle}</p> : null}{title ? <h2>{title}</h2> : null}<p>{description}</p><div className="ep-destination-selector__benefits"><span><i><ShieldCheck size={18} /></i><b>Informações atualizadas<small>Leitura cuidadosa da rota.</small></b></span><span><i><Clock3 size={18} /></i><b>Planejamento inteligente<small>Menos incertezas, mais clareza.</small></b></span></div></div>
    <div className="ep-destination-selector__panel"><div className="ep-destination-selector__panel-title"><span><Globe2 size={22} /></span><div><b>Escolha seu destino</b><small>Selecione uma rota para começarmos.</small></div></div><div className="ep-destination-selector__choices">{countries.map((country) => <button type="button" key={country.code} onClick={() => onCountrySelect?.(country)}><img src={`https://flagcdn.com/w80/${country.code}.png`} alt="" width="40" height="30" loading="lazy" /><span>{country.name}</span><ArrowRight size={17} /></button>)}<button type="button" className="ep-destination-selector__other" onClick={() => document.getElementById("analise")?.scrollIntoView({ behavior:"smooth" })}><i><Globe2 size={20} /></i><span>Outros destinos</span><ArrowRight size={17} /></button></div></div>
  </div></section>;
}
