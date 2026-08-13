import type { ButtonHTMLAttributes, HTMLAttributes, ReactNode } from "react";
import { ChevronDown, type LucideIcon } from "lucide-react";
import { cn } from "../../lib/utils";

export function Card({ variant = "editorial", children, className, ...props }: HTMLAttributes<HTMLElement> & { variant?: "editorial" | "interactive" | "quiet"; children: ReactNode }) {
  return <article className={cn("ep-card", "ep-card--" + variant, className)} {...props}>{children}</article>;
}

export function IconButton({ icon: Icon, label, className, ...props }: ButtonHTMLAttributes<HTMLButtonElement> & { icon: LucideIcon; label: string }) {
  return <button className={cn("ep-icon-button", className)} aria-label={label} {...props}><Icon size={18} /></button>;
}

export function Tag({ children, tone = "default" }: { children: ReactNode; tone?: "default" | "accent" | "success" }) {
  return <span className={cn("ep-tag", "ep-tag--" + tone)}>{children}</span>;
}

export function Metric({ value, label, source }: { value: string; label: string; source?: string }) {
  return <div className="ep-metric"><strong>{value}</strong><span>{label}</span>{source ? <small>{source}</small> : null}</div>;
}

export function FAQItem({ question, children }: { question: string; children: ReactNode }) {
  return <details className="ep-faq-item"><summary>{question}<ChevronDown size={19} /></summary><div>{children}</div></details>;
}

export function FormChoice({ title, description, selected, onClick }: { title: string; description: string; selected?: boolean; onClick?: () => void }) {
  return <button type="button" onClick={onClick} className={cn("ep-form-choice", selected && "is-selected")} aria-pressed={selected}><span><b>{title}</b><small>{description}</small></span><i aria-hidden="true" /></button>;
}
