import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./tailwind.css";
import "./design-system/components.css";
import "./features/home/home.css";
import { App } from "./app/App";

createRoot(document.getElementById("root")!).render(<StrictMode><App /></StrictMode>);
