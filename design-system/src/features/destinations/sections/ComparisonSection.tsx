import { useEffect, useRef } from "react";
import { CheckCircle2, X } from "lucide-react";
import { AnalysisButton } from "../../../components/ui/buttons";

const comparisonRows = [
  ["Entender o que a rota pede", "Informações soltas e difíceis de confirmar", "Análise personalizada da viagem"],
  ["Organizar documentos e prazos", "Risco de deixar algo importante passar", "Checklist e orientação por etapa"],
  ["Escolher uma operação compatível", "Decisão sem leitura da rota completa", "Rota, pet e operação avaliados juntos"],
  ["Preparar o seu pet para o dia do voo", "Orientações genéricas, sem olhar para a viagem", "Orientações adequadas ao seu caso"],
  ["Acompanhar cada etapa", "Dúvidas e mudanças resolvidas por conta própria", "Equipe especialista ao seu lado"],
  ["Ajustar o plano quando algo muda", "Imprevistos tratados sem apoio especializado", "Suporte para reorganizar os próximos passos"],
  ["Chegar ao embarque com segurança", "Preocupação até o último momento", "Planejamento para o pet embarcar com você"],
];

export function ComparisonSection({ onStartPlanning }: { onStartPlanning: () => void }) {
  const tableRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const table = tableRef.current;
    if (!table) return;

    const motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");
    let timeout: ReturnType<typeof setTimeout> | undefined;
    let isVisible = false;

    const stop = () => {
      if (timeout) window.clearTimeout(timeout);
      timeout = undefined;
    };
    const canAutoplay = () => window.innerWidth <= 700 && !motionPreference.matches && !document.hidden && isVisible;
    const moveToNextCard = () => {
      const cards = Array.from(table.querySelectorAll<HTMLElement>(".ep-us-comparison__row:not(.ep-us-comparison__row--head)"));
      if (!cards.length) return;
      const current = cards.reduce((closestIndex, card, index) => {
        const closest = cards[closestIndex];
        return Math.abs(card.offsetLeft - table.scrollLeft) < Math.abs(closest.offsetLeft - table.scrollLeft) ? index : closestIndex;
      }, 0);
      const next = current >= cards.length - 1 ? 0 : current + 1;
      table.scrollTo({ left: cards[next].offsetLeft, behavior: "smooth" });
    };
    const schedule = (delay = 3600) => {
      stop();
      if (!canAutoplay()) return;
      timeout = window.setTimeout(() => {
        moveToNextCard();
        schedule();
      }, delay);
    };
    const restart = () => schedule(1200);
    const resumeAfterInteraction = () => schedule(5000);
    const onVisibilityChange = () => document.hidden ? stop() : restart();
    const observer = new IntersectionObserver(([entry]) => {
      isVisible = entry.isIntersecting;
      isVisible ? restart() : stop();
    }, { threshold: 0.35 });

    observer.observe(table);
    table.addEventListener("pointerenter", stop);
    table.addEventListener("pointerleave", restart);
    table.addEventListener("focusin", stop);
    table.addEventListener("focusout", restart);
    table.addEventListener("pointerdown", resumeAfterInteraction);
    window.addEventListener("resize", restart);
    document.addEventListener("visibilitychange", onVisibilityChange);
    motionPreference.addEventListener("change", restart);

    return () => {
      stop();
      table.removeEventListener("pointerenter", stop);
      table.removeEventListener("pointerleave", restart);
      table.removeEventListener("focusin", stop);
      table.removeEventListener("focusout", restart);
      table.removeEventListener("pointerdown", resumeAfterInteraction);
      window.removeEventListener("resize", restart);
      document.removeEventListener("visibilitychange", onVisibilityChange);
      motionPreference.removeEventListener("change", restart);
      observer.disconnect();
    };
  }, []);

  return <section className="ep-us-comparison"><div className="ep-container"><div className="ep-us-comparison__heading"><p className="ep-us-kicker">Planejamento com suporte</p><h2>Por que planejar com a <em>Embarpet?</em></h2></div><div ref={tableRef} className="ep-us-comparison__table" role="table" aria-label="Comparação entre fazer a viagem sozinho e contar com a Embarpet"><div className="ep-us-comparison__row ep-us-comparison__row--head" role="row"><b role="columnheader">O que a viagem do seu pet exige</b><b role="columnheader"><span className="ep-us-comparison__alone-heading">Fazer sozinho</span></b><b role="columnheader"><img src="/logo-embarpet-light.png" alt="Embarpet" /></b></div>{comparisonRows.map(([need, alone, withUs]) => <div className="ep-us-comparison__row" role="row" key={need}><b role="cell">{need}</b><span role="cell"><X size={15} aria-hidden="true" />{alone}</span><span role="cell"><CheckCircle2 size={15} aria-hidden="true" />{withUs}</span></div>)}</div><div className="ep-us-comparison__cta"><AnalysisButton onClick={onStartPlanning}>Quero planejar com a Embarpet</AnalysisButton></div></div></section>;
}
