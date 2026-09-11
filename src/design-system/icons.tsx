import type { ReactElement, SVGProps } from "react";

export type IconName = "arrow" | "calendar" | "check" | "chevron" | "document" | "home" | "location" | "plane" | "route" | "shield" | "world";

const paths: Record<IconName, ReactElement> = {
  arrow: <path d="M5 12h14m-6-6 6 6-6 6" />,
  calendar: <><rect x="4" y="5" width="16" height="15" rx="2" /><path d="M8 3v4m8-4v4M4 10h16" /></>,
  check: <path d="m5 12 4 4L19 6" />,
  chevron: <path d="m8 10 4 4 4-4" />,
  document: <><rect x="4" y="3" width="16" height="18" rx="2" /><path d="M8 8h8M8 12h8M8 16h5" /></>,
  home: <><path d="m3 11 9-7 9 7" /><path d="M5 10v9h14v-9M9 19v-5h6v5" /></>,
  location: <><path d="M12 21s6-5.2 6-11a6 6 0 1 0-12 0c0 5.8 6 11 6 11z" /><circle cx="12" cy="10" r="2" /></>,
  plane: <><path d="M3 16h18" /><path d="m5 16 4-8 3 4 3-6 2 10" /><path d="m16 8 5 2-5 2" /></>,
  route: <path d="M4 16h16M12 16V5M8 9l4-4 4 4" />,
  shield: <><path d="M12 3 4 7v5c0 5 3.4 8 8 9 4.6-1 8-4 8-9V7l-8-4z" /><path d="m8.5 12 2.2 2.2 4.8-4.8" /></>,
  world: <><circle cx="12" cy="12" r="8" /><path d="M4 12h16M12 4c2.2 2.2 2.2 13.8 0 16M12 4c-2.2 2.2-2.2 13.8 0 16" /></>,
};

export function Icon({ name, title, ...props }: { name: IconName; title?: string } & SVGProps<SVGSVGElement>) {
  return <svg viewBox="0 0 24 24" aria-hidden={title ? undefined : true} role={title ? "img" : undefined} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...props}>{title ? <title>{title}</title> : null}{paths[name]}</svg>;
}
