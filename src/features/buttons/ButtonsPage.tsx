import { ArrowRight, Heart, Plus, X } from "lucide-react";
import { AnalysisButton, BackButton, CircleIconButton, InterfaceButton, InternalLink } from "../../components/ui/buttons";
import "./buttons-page.css";

type DemoProps = {
  title: string;
  note: string;
  component: string;
  variant: string;
  use: string;
  avoid: string;
  code: string;
  children: React.ReactNode;
  dark?: boolean;
  interactive?: boolean;
};

const Demo = ({ title, note, component, variant, use, avoid, code, children, dark = false, interactive = false }: DemoProps) => (
  <article className={`ep-buttons-demo${dark ? " is-dark" : ""}`}>
    <header>
      <div className="ep-buttons-demo__heading">
        <h2>{title}</h2>
        <p>{note}</p>
      </div>
      <dl className="ep-buttons-demo__meta">
        <div><dt>Componente</dt><dd>{component}</dd></div>
        <div><dt>Variante</dt><dd>{variant}</dd></div>
        <div><dt>Use para</dt><dd>{use}</dd></div>
        <div><dt>Evite em</dt><dd>{avoid}</dd></div>
      </dl>
    </header>
    <div className={`ep-buttons-demo__body${interactive ? " is-interactive" : ""}`}>
      {interactive ? <span className="ep-buttons-demo__hint">Passe o mouse ou use o teclado para testar</span> : null}
      <div className="ep-buttons-demo__stage">{children}</div>
      <pre><code>{code}</code></pre>
    </div>
  </article>
);

const Sized = ({ label, children }: { label: string; children: React.ReactNode }) => <div className="ep-buttons-specimen"><span>{label}</span>{children}</div>;

export default function ButtonsPage() {
  return <main className="ep-buttons-page">
    <header className="ep-buttons-page__hero">
      <a href="/">← Voltar ao site</a>
      <p>Embarpet Design System</p>
      <h1>Botões com função clara.</h1>
      <span>Catálogo isolado, derivado dos padrões já aprovados na index. O site é a referência visual; esta página documenta função e comportamento.</span>
    </header>
    <section className="ep-buttons-page__content">
      <Demo title="01 · Conversão" note="O avião aparece apenas na interação e conclui o percurso iniciado. Fora do hover, o CTA permanece limpo, como na index aprovada." component="AnalysisButton" variant="analysis" use="Iniciar ou retomar a análise da viagem." avoid="Navegação editorial e ações utilitárias." code={'<AnalysisButton size="md">Começar minha análise</AnalysisButton>'} interactive>
        <Sized label="sm · uso compacto"><AnalysisButton size="sm">Analisar viagem</AnalysisButton></Sized>
        <Sized label="md · padrão do site"><AnalysisButton>Começar minha análise</AnalysisButton></Sized>
        <Sized label="lg · destaque excepcional"><AnalysisButton size="lg">Planejar viagem do meu pet</AnalysisButton></Sized>
      </Demo>
      <Demo title="02 · Navegação interna" note="A seta vive em um núcleo próprio e amplia o espaço da cápsula sem alterar sua altura." component="InternalLink" variant="internal" use="Equipe, histórias, modalidades e conteúdos." avoid="Envio de formulário ou conversão principal." code={'<InternalLink href="/equipe">Conhecer a equipe</InternalLink>'}>
        <Sized label="md · padrão do site"><InternalLink href="#">Saiba mais</InternalLink></Sized>
        <Sized label="md · mesmo componente"><InternalLink href="#">Conhecer a equipe</InternalLink></Sized>
        <Sized label="md · mesmo componente"><InternalLink href="#">Assistir completo</InternalLink></Sized>
      </Demo>
      <Demo title="03 · Interface" note="Ações funcionais com peso suficiente para modais e formulários, sem competir com a conversão." component="InterfaceButton / BackButton" variant="primary · secondary · ghost" use="Continuar, ver resumo, voltar e cancelar." avoid="CTAs comerciais fora de fluxos." code={'<InterfaceButton trailingIcon={ArrowRight}>Ver resumo</InterfaceButton>'}>
        <InterfaceButton>Continuar</InterfaceButton>
        <InterfaceButton tone="secondary" trailingIcon={ArrowRight}>Ver resumo</InterfaceButton>
        <BackButton />
        <InterfaceButton tone="ghost">Cancelar</InterfaceButton>
      </Demo>
      <Demo title="04 · Estados" note="CTAs do diagnóstico nunca são bloqueados: o clique valida os campos. Desativado fica reservado a ações tecnicamente impossíveis." component="InterfaceButton" variant="state" use="Feedback normal, processamento e ação destrutiva." avoid="Desativar o avanço do diagnóstico." code={'<InterfaceButton aria-busy="true">Processando</InterfaceButton>'}>
        <Sized label="normal"><InterfaceButton>Continuar</InterfaceButton></Sized>
        <Sized label="processando"><InterfaceButton aria-busy="true">Processando…</InterfaceButton></Sized>
        <Sized label="destrutivo"><InterfaceButton tone="danger">Excluir</InterfaceButton></Sized>
      </Demo>
      <Demo title="05 · Ícones" note="Controles compactos exigem rótulo acessível e nunca substituem CTAs com texto." component="CircleIconButton" variant="icon-only" use="Adicionar, favoritar e fechar interfaces." avoid="Ações cujo significado não é universal." code={'<CircleIconButton icon={X} label="Fechar" />'}>
        <CircleIconButton icon={Plus} label="Adicionar" />
        <CircleIconButton icon={Heart} label="Favoritar" />
        <CircleIconButton icon={X} label="Fechar" />
      </Demo>
      <Demo title="06 · Sobre fundo escuro" note="As mesmas funções mantêm contraste e hierarquia em blocos institucionais." component="Sistema completo" variant="dark context" use="Seções com fundo verde-petróleo." avoid="Criar uma nova variante apenas pela cor do fundo." code={'<InternalLink href="/historia">Conheça nossa história</InternalLink>'} dark>
        <AnalysisButton>Iniciar análise</AnalysisButton>
        <InternalLink href="#">Conheça nossa história</InternalLink>
        <InterfaceButton tone="secondary">Ação secundária</InterfaceButton>
      </Demo>
      <Demo title="07 · Largura responsiva" note="Em largura total, texto e seta ocupam extremos previsíveis; não sobra uma área morta após a seta." component="AnalysisButton / InternalLink" variant="fullWidth" use="Formulários, cards estreitos e mobile." avoid="Links editoriais soltos em desktop." code={'<InternalLink href="/modalidade" fullWidth>Entender esta modalidade</InternalLink>'}>
        <div className="ep-buttons-demo__stack">
          <AnalysisButton fullWidth>Continuar análise</AnalysisButton>
          <InternalLink href="#" fullWidth>Entender esta modalidade</InternalLink>
        </div>
      </Demo>
    </section>
  </main>;
}
