import { ArrowRight, Heart, Plus, X } from "lucide-react";
import { AnalysisButton, BackButton, CircleIconButton, InterfaceButton, InternalLink } from "../../components/ui/buttons";
import "./buttons-page.css";

const Demo = ({ title, note, children, dark = false }: { title: string; note: string; children: React.ReactNode; dark?: boolean }) => <article className={dark ? "ep-buttons-demo is-dark" : "ep-buttons-demo"}><header><h2>{title}</h2><p>{note}</p></header><div>{children}</div></article>;

export default function ButtonsPage() {
  return <main className="ep-buttons-page">
    <header className="ep-buttons-page__hero"><a href="/">← Voltar ao site</a><p>Embarpet Design System</p><h1>Botões com função clara.</h1><span>Uma fonte de verdade para conversão, navegação e interface.</span></header>
    <section className="ep-buttons-page__content">
      <Demo title="01 · Conversão" note="Exclusivo para iniciar ou retomar a análise da viagem. O avião comunica movimento e intenção."><AnalysisButton size="sm">Analisar viagem</AnalysisButton><AnalysisButton>Começar minha análise</AnalysisButton><AnalysisButton size="lg">Planejar viagem do meu pet</AnalysisButton></Demo>
      <Demo title="02 · Navegação interna" note="Para conhecer equipe, histórias, modalidades e outros conteúdos do site."><InternalLink href="#">Saiba mais</InternalLink><InternalLink href="#">Conhecer a equipe</InternalLink><InternalLink href="#" size="lg">Assistir completo</InternalLink></Demo>
      <Demo title="03 · Interface" note="Ações funcionais. Sem avião e sem competir com a conversão principal."><InterfaceButton>Continuar</InterfaceButton><InterfaceButton tone="secondary" trailingIcon={ArrowRight}>Ver resumo</InterfaceButton><BackButton /><InterfaceButton tone="ghost">Cancelar</InterfaceButton></Demo>
      <Demo title="04 · Estados" note="Hover, foco, pressionado e desativado permanecem previsíveis e acessíveis."><InterfaceButton>Normal</InterfaceButton><InterfaceButton disabled>Desativado</InterfaceButton><InterfaceButton tone="danger">Excluir</InterfaceButton><AnalysisButton aria-disabled="true">Aguardando dados</AnalysisButton></Demo>
      <Demo title="05 · Ícones" note="Controles compactos exigem rótulo acessível e nunca substituem CTAs com texto."><CircleIconButton icon={Plus} label="Adicionar" /><CircleIconButton icon={Heart} label="Favoritar" /><CircleIconButton icon={X} label="Fechar" /></Demo>
      <Demo title="06 · Sobre fundo escuro" note="O sistema mantém contraste e hierarquia nos blocos institucionais." dark><AnalysisButton>Iniciar análise</AnalysisButton><InternalLink href="#">Conheça nossa história</InternalLink><InterfaceButton tone="secondary">Ação secundária</InterfaceButton></Demo>
      <Demo title="07 · Largura responsiva" note="Use largura total apenas em formulários, cards estreitos e mobile."><div className="ep-buttons-demo__stack"><AnalysisButton fullWidth>Continuar análise</AnalysisButton><InternalLink href="#" fullWidth>Entender esta modalidade</InternalLink></div></Demo>
    </section>
  </main>;
}
