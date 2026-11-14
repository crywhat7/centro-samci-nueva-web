import Link from "next/link";
import { Reveal } from "./motion";

export function Container({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-[1440px] px-5 sm:px-8 lg:px-12 ${className}`}>{children}</div>;
}

/** Section label: "— 02 / Servicios" */
export function Label({ n, children, light = false }: { n?: string; children: React.ReactNode; light?: boolean }) {
  return (
    <p className={`flex items-center gap-3 text-[12px] font-semibold uppercase tracking-[0.22em] ${light ? "text-paper/60" : "text-mute"}`}>
      <span className="h-px w-8 bg-fire" />
      {n && <span className="text-fire">{n}</span>}
      {children}
    </p>
  );
}

export function Arrow({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.6" className={className} aria-hidden>
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

export function CTA({ href, children, tone = "fire" }: { href: string; children: React.ReactNode; tone?: "fire" | "ink" | "paper" }) {
  const t = {
    fire: "bg-fire text-paper hover:bg-fire-deep",
    ink: "bg-ink text-paper hover:bg-fire",
    paper: "bg-paper text-ink hover:bg-fire hover:text-paper",
  }[tone];
  return (
    <Link href={href} className={`group inline-flex items-center gap-4 rounded-full py-4 pl-7 pr-5 text-[15px] font-semibold transition-colors duration-500 [transition-timing-function:var(--ease-expo)] ${t}`}>
      {children}
      <span className="grid h-8 w-8 place-items-center rounded-full bg-current/0 transition-transform duration-700 [transition-timing-function:var(--ease-expo)] group-hover:translate-x-1">
        <Arrow />
      </span>
    </Link>
  );
}

export function PageHead({ label, title, sub, n }: { label: string; title: string; sub?: string; n?: string }) {
  return (
    <header className="border-b border-line pb-14 pt-16 sm:pt-24">
      <Container>
        <Label n={n}>{label}</Label>
        <h1 className="display balance mt-8 max-w-[14ch] text-[clamp(3.2rem,10vw,9.5rem)]">
          {title.split(" ").length > 0 && <span>{title}</span>}
        </h1>
        {sub && (
          <Reveal className="mt-10 grid lg:grid-cols-12">
            <p className="pretty text-lg text-ink/75 lg:col-span-6 lg:col-start-7 lg:text-xl">{sub}</p>
          </Reveal>
        )}
      </Container>
    </header>
  );
}

export function Crumbs({ items }: { items: { label: string; href?: string }[] }) {
  return (
    <nav aria-label="Breadcrumb" className="text-[13px] text-mute">
      <ol className="flex flex-wrap items-center gap-2">
        {items.map((it, i) => (
          <li key={i} className="flex items-center gap-2">
            {i > 0 && <span className="text-line">/</span>}
            {it.href ? <Link href={it.href} className="ulink hover:text-ink">{it.label}</Link> : <span className="text-ink">{it.label}</span>}
          </li>
        ))}
      </ol>
    </nav>
  );
}
