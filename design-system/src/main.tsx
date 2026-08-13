import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./tailwind.css";
import "./playground.css";
import DesignSystemPlayground from "./playground";

createRoot(document.getElementById("root")!).render(<StrictMode><DesignSystemPlayground /></StrictMode>);
