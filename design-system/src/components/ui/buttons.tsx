import { useCallback, useEffect, useState, type ButtonHTMLAttributes, type ReactNode } from "react";
import { ArrowLeft, ArrowRight, type LucideIcon } from "lucide-react";
import { cn } from "../../lib/utils";

export type ButtonSize = "sm" | "md" | "lg";
export type ButtonTone = "primary" | "secondary" | "ghost" | "danger";

type SharedProps = {
  children: ReactNode;
  className?: string;
  fullWidth?: boolean;
  size?: ButtonSize;
};

export function AnalysisButton({ children, className, fullWidth, size = "md", demoAutoPlay = false, demoDelay = 0, onPointerEnter, ...props }: SharedProps & ButtonHTMLAttributes<HTMLButtonElement> & { demoAutoPlay?: boolean; demoDelay?: number }) {
  const [flightId, setFlightId] = useState(0);
  const launchPlane = useCallback(() => {
    setFlightId((current) => current + 1);
  }, []);
  useEffect(() => {
    if (!demoAutoPlay) return;
    let interval = 0;
    const firstRun = window.setTimeout(() => {
      launchPlane();
      interval = window.setInterval(launchPlane, 6200);
    }, 850 + demoDelay);
    return () => { window.clearTimeout(firstRun); window.clearInterval(interval); };
  }, [demoAutoPlay, demoDelay, launchPlane]);
  const flying = flightId > 0;
  return <button
    className={cn("ep-ds-button ep-ds-button--analysis", `ep-ds-button--${size}`, flying && "is-flying", fullWidth && "ep-ds-button--full", className)}
    {...props}
    onPointerEnter={(event) => { launchPlane(); onPointerEnter?.(event); }}
    onFocus={(event) => { launchPlane(); props.onFocus?.(event); }}
  >
    <span>{children}</span>
    <img key={flightId} className={cn("ep-ds-button__plane", flying && "is-flying")} src="/embarpet-cta-plane-top.webp" alt="" aria-hidden="true" onAnimationEnd={() => setFlightId(0)} />
  </button>;
}

export function InternalLink({ children, className, fullWidth, size = "md", href, external = false }: SharedProps & { href: string; external?: boolean }) {
  return <a className={cn("ep-ds-button ep-ds-button--internal", `ep-ds-button--${size}`, fullWidth && "ep-ds-button--full", className)} href={href} {...(external ? { target:"_blank", rel:"noopener noreferrer" } : {})}>
    <span>{children}</span><i className="ep-ds-button__arrow" aria-hidden="true"><ArrowRight /></i>
  </a>;
}

export function InterfaceButton({ children, className, fullWidth, size = "md", tone = "primary", leadingIcon: LeadingIcon, trailingIcon: TrailingIcon, ...props }: SharedProps & ButtonHTMLAttributes<HTMLButtonElement> & { tone?: ButtonTone; leadingIcon?: LucideIcon; trailingIcon?: LucideIcon }) {
  return <button className={cn("ep-ds-button ep-ds-button--interface", `ep-ds-button--${tone}`, `ep-ds-button--${size}`, LeadingIcon && "ep-ds-button--has-leading", TrailingIcon && "ep-ds-button--has-trailing", fullWidth && "ep-ds-button--full", className)} {...props}>
    {LeadingIcon ? <LeadingIcon aria-hidden="true" /> : null}<span>{children}</span>{TrailingIcon ? <TrailingIcon aria-hidden="true" /> : null}
  </button>;
}

export function BackButton({ children = "Voltar", className, size = "md", ...props }: Omit<SharedProps, "children"> & { children?: ReactNode } & ButtonHTMLAttributes<HTMLButtonElement>) {
  return <InterfaceButton className={className} size={size} tone="ghost" leadingIcon={ArrowLeft} {...props}>{children}</InterfaceButton>;
}

export function CircleIconButton({ icon: Icon, label, className, size = "md", ...props }: Omit<SharedProps, "children"> & ButtonHTMLAttributes<HTMLButtonElement> & { icon: LucideIcon; label: string }) {
  return <button className={cn("ep-ds-icon-button", `ep-ds-icon-button--${size}`, className)} aria-label={label} {...props}><Icon aria-hidden="true" /></button>;
}
