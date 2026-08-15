import EmbarpetHome from "../features/home/HomePage";
import AnalysisPage from "../features/analysis/AnalysisPage";
import ThankYouPage from "../features/thank-you/ThankYouPage";

/** Application shell. Future routes should be composed here, never inside the design system. */
export function App() {
  if (typeof window !== "undefined" && window.location.pathname === "/analise") return <AnalysisPage />;
  if (typeof window !== "undefined" && window.location.pathname === "/obrigado") return <ThankYouPage />;
  return <EmbarpetHome />;
}
