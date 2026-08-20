import { StrictMode } from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import "./tailwind.css";
import "./design-system/components.css";
import "./design-system/buttons.css";
import "./features/home/home.css";
import "./features/analysis/analysis.css";
import "./features/thank-you/thank-you.css";
import "./design-system/visual-contract.css";
import { App } from "./app/App";

const root = document.getElementById("root")!;
const app = <StrictMode><App /></StrictMode>;

if (root.hasChildNodes()) hydrateRoot(root, app);
else createRoot(root).render(app);
