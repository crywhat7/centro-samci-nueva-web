"use client";
import { useEffect, useRef } from "react";
import Lenis from "lenis";

export function SmoothScroll() {
  useEffect(() => {
    // Only on fine pointers (desktop): touch devices already have native momentum scrolling.
    if (window.matchMedia("(prefers-reduced-motion: reduce), (pointer: coarse)").matches) return;
    const lenis = new Lenis({ lerp: 0.14, wheelMultiplier: 1, autoRaf: true });
    return () => lenis.destroy();
  }, []);
  return null;
}

/** Adds .in when the element enters the viewport. */
export function Reveal({
  children,
  className = "",
  as: Tag = "div",
  clip = false,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  as?: "div" | "section" | "li" | "article" | "p" | "h2" | "h3";
  clip?: boolean;
  delay?: number;
}) {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          el.classList.add("in");
          io.disconnect();
        }
      },
      { rootMargin: "0px 0px -12% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  const Comp = Tag as React.ElementType;
  return (
    <Comp ref={ref} className={`${clip ? "reveal-clip" : "reveal"} ${className}`} style={delay ? { transitionDelay: `${delay}ms` } : undefined}>
      {children}
    </Comp>
  );
}
