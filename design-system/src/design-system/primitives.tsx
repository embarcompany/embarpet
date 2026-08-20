import type { ButtonHTMLAttributes, InputHTMLAttributes, ReactNode, SelectHTMLAttributes } from "react";
import { Icon, type IconName } from "./icons";

export function Button({ variant = "primary", icon, children, ...props }: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: "primary" | "secondary" | "text"; icon?: IconName }) {
  return <button className={`ep-button ep-button--${variant}`} {...props}>{children}{icon ? <Icon name={icon} /> : null}</button>;
}

export function SectionHeading({ eyebrow, title, copy, align = "left" }: { eyebrow?: string; title: ReactNode; copy?: string; align?: "left" | "center" }) {
  return <div className={`ep-section-heading ep-section-heading--${align}`}>{eyebrow ? <p className="ep-eyebrow">{eyebrow}</p> : null}<h2 className="ep-title-lg">{title}</h2>{copy ? <p className="ep-copy">{copy}</p> : null}</div>;
}

type BaseField = { label: string; hint?: string; icon?: IconName };
export function TextField({ label, hint, icon, ...props }: BaseField & InputHTMLAttributes<HTMLInputElement>) {
  return <label className="ep-field"><span>{icon ? <Icon name={icon} /> : null}{label}</span><input {...props} />{hint ? <small>{hint}</small> : null}</label>;
}
export function SelectField({ label, hint, icon, children, ...props }: BaseField & SelectHTMLAttributes<HTMLSelectElement> & { children: ReactNode }) {
  return <label className="ep-field"><span>{icon ? <Icon name={icon} /> : null}{label}</span><select {...props}>{children}</select>{hint ? <small>{hint}</small> : null}</label>;
}

export function Notice({ kind = "info", children }: { kind?: "info" | "warning" | "success"; children: ReactNode }) {
  const icon: IconName = kind === "success" ? "check" : kind === "warning" ? "document" : "shield";
  return <div className={`ep-notice ep-notice--${kind}`}><Icon name={icon} /> <span>{children}</span></div>;
}
