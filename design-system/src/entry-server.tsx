import { renderToString } from "react-dom/server";
import { App } from "./app/App";

/** HTML base da home para crawlers; as interações continuam hidratadas no cliente. */
export function render() {
  return renderToString(<App />);
}
