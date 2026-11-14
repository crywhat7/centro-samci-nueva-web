"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

type Labels = { text: [string, string]; hint: string; hintTouch: string; done: string; doneSub: string; again: string; cta: string; ctaHref: string };

type Pt = { x: number; y: number; h: number };
type Part = { x: number; y: number; vx: number; vy: number; life: number; max: number; s: number; k: 0 | 1 };

const FONT_STACK = () => getComputedStyle(document.documentElement).getPropertyValue("--f-display").trim() || "sans-serif";

function sprite(inner: string, outer: string, size = 64) {
  const c = document.createElement("canvas");
  c.width = c.height = size;
  const g = c.getContext("2d")!;
  const r = g.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
  r.addColorStop(0, inner);
  r.addColorStop(0.4, outer);
  r.addColorStop(1, "rgba(0,0,0,0)");
  g.fillStyle = r;
  g.fillRect(0, 0, size, size);
  return c;
}

/** Big footer wordmark that burns; the cursor becomes an extinguisher that puts it out. */
export function FireText({ labels }: { labels: Labels }) {
  const wrap = useRef<HTMLDivElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const [state, setState] = useState<"burning" | "out">("burning");
  const [progress, setProgress] = useState(1);
  const [reduced, setReduced] = useState(false);
  const [touch, setTouch] = useState(false);
  const reignite = useRef<() => void>(() => {});

  useEffect(() => {
    const rm = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setReduced(rm);
    const touch = window.matchMedia("(pointer: coarse)").matches;
    setTouch(touch);
    if (rm) return;

    const el = wrap.current!;
    const cv = canvas.current!;
    const ctx = cv.getContext("2d", { alpha: true })!;
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);

    const flame = [sprite("rgba(255,244,214,1)", "rgba(255,186,64,0.75)"), sprite("rgba(255,170,40,0.95)", "rgba(237,28,36,0.55)"), sprite("rgba(237,60,30,0.7)", "rgba(120,20,10,0.35)")];
    const smoke = sprite("rgba(242,237,228,0.75)", "rgba(220,214,205,0.35)");
    const ember = sprite("rgba(255,150,40,0.9)", "rgba(237,28,36,0.4)", 48);

    let W = 0, H = 0, fontPx = 0, lines: { y: number }[] = [];
    let pts: Pt[] = [];
    const parts: Part[] = [];
    let running = false, visible = false, raf = 0, frame = 0;
    const pointer = { x: -999, y: -999, inside: false, down: false };
    let spraying = false;
    let burnt = 1;
    let font = "";

    const layout = () => {
      const r = el.getBoundingClientRect();
      W = r.width;
      H = r.height;
      cv.width = Math.round(W * dpr);
      cv.height = Math.round(H * dpr);
      cv.style.width = W + "px";
      cv.style.height = H + "px";
      fontPx = Math.min(W * 0.2, H * 0.42);
      font = `800 ${fontPx}px ${FONT_STACK()}`;
      const gap = fontPx * 0.9;
      const top = H / 2 - gap / 2 + fontPx * 0.36;
      lines = [{ y: top }, { y: top + gap }];
      sample();
    };

    const setFont = (g: CanvasRenderingContext2D) => {
      g.font = font;
      g.textAlign = "center";
      g.textBaseline = "alphabetic";
      // Archivo is a width-variable font: ask for its condensed cut like the CSS does
      try { (g as unknown as { fontStretch: string }).fontStretch = "condensed"; } catch {}
    };

    const drawText = (g: CanvasRenderingContext2D) => {
      setFont(g);
      g.fillText(labels.text[0].toUpperCase(), W / 2, lines[0].y);
      g.fillText(labels.text[1].toUpperCase(), W / 2, lines[1].y);
    };

    // Sample the glyph pixels at low resolution → fire spawn points
    const sample = () => {
      const s = 0.22;
      const o = document.createElement("canvas");
      o.width = Math.ceil(W * s);
      o.height = Math.ceil(H * s);
      const g = o.getContext("2d")!;
      g.scale(s, s);
      g.fillStyle = "#000";
      drawText(g);
      const data = g.getImageData(0, 0, o.width, o.height).data;
      const prev = pts;
      pts = [];
      for (let y = 0; y < o.height; y++)
        for (let x = 0; x < o.width; x++) if (data[(y * o.width + x) * 4 + 3] > 128) pts.push({ x: x / s, y: y / s, h: 1 });
      if (prev.length && burnt < 1) for (const p of pts) p.h = burnt; // keep state roughly on resize
    };

    const nozzle = () => ({ x: pointer.x, y: pointer.y });
    // The extinguisher hangs to the right of the nozzle, so it sprays to the left
    const target = () => ({ x: pointer.x - 95, y: pointer.y - 12 });

    const spawnFire = (n: number) => {
      if (!pts.length) return;
      for (let i = 0; i < n; i++) {
        const p = pts[(Math.random() * pts.length) | 0];
        if (p.h < 0.08 || Math.random() > p.h) continue;
        const max = 26 + Math.random() * 34;
        parts.push({ x: p.x + (Math.random() - 0.5) * 6, y: p.y, vx: (Math.random() - 0.5) * 0.5, vy: -(0.9 + Math.random() * 1.8) * (fontPx / 260), life: max, max, s: (fontPx / 11) * (0.5 + Math.random() * 0.8) * p.h, k: 0 });
      }
    };

    const spawnSpray = () => {
      const n = nozzle();
      const t = target();
      const ang = Math.atan2(t.y - n.y, t.x - n.x);
      for (let i = 0; i < 9; i++) {
        const a = ang + (Math.random() - 0.5) * 0.55;
        const v = 7 + Math.random() * 6;
        const max = 22 + Math.random() * 14;
        parts.push({ x: n.x, y: n.y, vx: Math.cos(a) * v, vy: Math.sin(a) * v, life: max, max, s: 10 + Math.random() * 14, k: 1 });
      }
    };

    const extinguish = () => {
      const t = target();
      const R = Math.max(70, fontPx * 0.32);
      const R2 = R * R;
      for (const p of pts) {
        const dx = p.x - t.x, dy = p.y - t.y;
        const d2 = dx * dx + dy * dy;
        if (d2 < R2) p.h = Math.max(0, p.h - 0.09 * (1 - d2 / R2) - 0.02);
      }
    };

    // Fire creeps back slowly where it wasn't fully put out
    const regrow = () => {
      for (let i = 0; i < 120; i++) {
        const p = pts[(Math.random() * pts.length) | 0];
        if (p && p.h > 0.05 && p.h < 1) p.h = Math.min(1, p.h + 0.04);
      }
    };

    const drawExtinguisher = (x: number, y: number, shake: number) => {
      const j = shake ? (Math.random() - 0.5) * 2.5 : 0;
      ctx.save();
      ctx.translate(x + j, y + j);
      // hose from nozzle (0,0) to valve
      ctx.strokeStyle = "#16120f";
      ctx.lineWidth = 5;
      ctx.lineCap = "round";
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.bezierCurveTo(26, 6, 30, 36, 48, 30);
      ctx.stroke();
      // nozzle tip
      ctx.fillStyle = "#16120f";
      ctx.beginPath();
      ctx.moveTo(-4, -4); ctx.lineTo(10, -3); ctx.lineTo(10, 4); ctx.lineTo(-4, 4); ctx.closePath();
      ctx.fill();
      // body
      ctx.fillStyle = "#ed1c24";
      ctx.beginPath();
      ctx.roundRect(40, 28, 34, 84, [14, 14, 6, 6]);
      ctx.fill();
      // label band
      ctx.fillStyle = "#f2ede4";
      ctx.fillRect(44, 58, 26, 22);
      ctx.fillStyle = "#ed1c24";
      ctx.font = "800 12px sans-serif";
      ctx.textAlign = "center";
      ctx.fillText("ABC", 57, 74);
      // valve + handle
      ctx.fillStyle = "#16120f";
      ctx.fillRect(50, 18, 14, 12);
      ctx.beginPath();
      ctx.moveTo(46, 18); ctx.lineTo(82, 12 + (spraying ? 6 : 0)); ctx.lineTo(82, 17 + (spraying ? 6 : 0)); ctx.lineTo(48, 23); ctx.closePath();
      ctx.fill();
      ctx.fillRect(40, 10, 30, 6);
      ctx.restore();
    };

    const tick = () => {
      frame++;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, W, H);

      // 1. glyphs: charcoal where out, glowing where burning
      ctx.globalCompositeOperation = "source-over";
      ctx.fillStyle = "#2b2420";
      drawText(ctx);
      ctx.globalCompositeOperation = "source-atop";
      const es = fontPx * 0.5;
      for (let i = 0; i < 260 && pts.length; i++) {
        const p = pts[(Math.random() * pts.length) | 0];
        if (p.h < 0.1) continue;
        ctx.globalAlpha = p.h * 0.55;
        ctx.drawImage(ember, p.x - es / 2, p.y - es / 2, es, es);
      }
      ctx.globalAlpha = 1;

      // 2. simulate
      if (pointer.down && pointer.inside) {
        spraying = true;
        spawnSpray();
        extinguish();
      } else spraying = false;
      spawnFire(touch ? 70 : 110);
      if (frame % 6 === 0) regrow();
      if (frame % 15 === 0) {
        let s = 0;
        for (const p of pts) s += p.h;
        burnt = pts.length ? s / pts.length : 0;
        setProgress(burnt);
        if (burnt < 0.035) {
          for (const p of pts) p.h = 0;
          setState("out");
        }
      }
      if (parts.length > 2200) parts.splice(0, parts.length - 2200);

      // 3. draw particles
      ctx.globalCompositeOperation = "lighter";
      let w = 0;
      for (let i = 0; i < parts.length; i++) {
        const p = parts[i];
        p.life--;
        if (p.life <= 0) continue;
        p.x += p.vx;
        p.y += p.vy;
        const t = p.life / p.max;
        if (p.k === 0) {
          p.vx += (Math.random() - 0.5) * 0.25;
          p.vy *= 1.01;
          const img = t > 0.66 ? flame[0] : t > 0.33 ? flame[1] : flame[2];
          const s = p.s * (0.5 + t * 0.7);
          ctx.globalAlpha = Math.min(1, t * 1.4);
          ctx.drawImage(img, p.x - s / 2, p.y - s / 2, s, s);
        } else {
          p.vx *= 0.93;
          p.vy = p.vy * 0.93 + 0.08;
          const s = p.s * (1.6 - t);
          ctx.globalCompositeOperation = "source-over";
          ctx.globalAlpha = t * 0.7;
          ctx.drawImage(smoke, p.x - s / 2, p.y - s / 2, s, s);
          ctx.globalCompositeOperation = "lighter";
        }
        parts[w++] = p;
      }
      parts.length = w;
      ctx.globalAlpha = 1;
      ctx.globalCompositeOperation = "source-over";

      // 4. cursor
      if (pointer.inside && !touch) drawExtinguisher(pointer.x, pointer.y, spraying ? 1 : 0);

      if (running) raf = requestAnimationFrame(tick);
    };

    const start = () => {
      if (running || !visible) return;
      running = true;
      raf = requestAnimationFrame(tick);
    };
    const stop = () => {
      running = false;
      cancelAnimationFrame(raf);
    };

    reignite.current = () => {
      for (const p of pts) p.h = 1;
      burnt = 1;
      setProgress(1);
      setState("burning");
    };

    const pos = (e: PointerEvent) => {
      const r = cv.getBoundingClientRect();
      pointer.x = e.clientX - r.left;
      pointer.y = e.clientY - r.top;
    };
    const onMove = (e: PointerEvent) => { pos(e); pointer.inside = true; };
    const onDown = (e: PointerEvent) => { pos(e); pointer.inside = true; pointer.down = true; if (e.pointerType !== "mouse") cv.setPointerCapture(e.pointerId); };
    const onUp = () => { pointer.down = false; if (touch) pointer.inside = false; };
    const onLeave = () => { pointer.inside = false; pointer.down = false; };

    cv.addEventListener("pointermove", onMove);
    cv.addEventListener("pointerdown", onDown);
    window.addEventListener("pointerup", onUp);
    cv.addEventListener("pointerleave", onLeave);

    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      if (visible) start();
      else stop();
    });
    const ro = new ResizeObserver(() => layout());

    document.fonts.ready.then(() => {
      layout();
      ro.observe(el);
      io.observe(el);
    });

    return () => {
      stop();
      io.disconnect();
      ro.disconnect();
      cv.removeEventListener("pointermove", onMove);
      cv.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      cv.removeEventListener("pointerleave", onLeave);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [labels.text.join(" ")]);

  if (reduced) {
    return <p aria-hidden className="display select-none py-10 text-center text-[clamp(4rem,21vw,22rem)] leading-[0.8] text-paper/[0.06]">{labels.text.join(" ")}</p>;
  }

  return (
    <div className="relative">
      <div ref={wrap} className="relative h-[clamp(300px,52vw,640px)] w-full">
        <canvas ref={canvas} aria-hidden className={`absolute inset-0 touch-none ${state === "burning" ? "cursor-none" : ""}`} />
        {state === "out" && (
          <div className="fade-in absolute inset-0 flex flex-col items-center justify-center text-center">
            <p className="display text-[clamp(2.4rem,6vw,5.5rem)] text-paper">{labels.done}</p>
            <p className="mt-3 max-w-md text-paper/70">{labels.doneSub}</p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-6">
              <Link href={labels.ctaHref} className="rounded-full bg-fire px-6 py-3 text-[15px] font-semibold text-paper transition-colors duration-500 hover:bg-paper hover:text-ink">{labels.cta}</Link>
              <button onClick={() => reignite.current()} className="ulink text-[15px] font-semibold text-paper/80 hover:text-paper">{labels.again}</button>
            </div>
          </div>
        )}
      </div>
      {state === "burning" && (
        <div className="pointer-events-none flex items-center justify-center gap-4 pb-2 text-[12px] uppercase tracking-[0.2em] text-paper/50">
          <span>{touch ? labels.hintTouch : labels.hint}</span>
          <span className="h-px w-24 overflow-hidden bg-paper/15">
            <span className="block h-full bg-fire transition-transform duration-300" style={{ transform: `scaleX(${progress})`, transformOrigin: "left" }} />
          </span>
        </div>
      )}
    </div>
  );
}
