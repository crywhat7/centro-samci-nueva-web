"use client";
import { useEffect, useState } from "react";
import type { Dict } from "@/i18n/content";

export function ContactForm({ labels, email }: { labels: Dict["contact"]["form"]; email: string }) {
  const [product, setProduct] = useState("");
  useEffect(() => {
    setProduct(new URLSearchParams(window.location.search).get("producto") || "");
  }, []);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const body = `${labels.name}: ${f.get("name")}\n${labels.company}: ${f.get("company")}\n${labels.phone}: ${f.get("phone")}\n\n${f.get("message")}`;
    const subject = product ? `Cotización: ${product}` : "Cotización — sitio web";
    window.location.href = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  }

  const field =
    "peer w-full border-0 border-b border-line bg-transparent px-0 pb-3 pt-7 text-lg outline-none transition-colors duration-500 placeholder:text-transparent focus:border-fire";
  const label =
    "pointer-events-none absolute left-0 top-7 text-mute transition-all duration-500 [transition-timing-function:var(--ease-expo)] peer-focus:top-0 peer-focus:text-[12px] peer-focus:uppercase peer-focus:tracking-[0.18em] peer-focus:text-fire peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:text-[12px] peer-[:not(:placeholder-shown)]:uppercase peer-[:not(:placeholder-shown)]:tracking-[0.18em]";

  const F = ({ name, l, type = "text", required = false }: { name: string; l: string; type?: string; required?: boolean }) => (
    <div className="relative">
      <input id={name} name={name} type={type} required={required} placeholder={l} className={field} />
      <label htmlFor={name} className={label}>{l}{required && " *"}</label>
    </div>
  );

  return (
    <form onSubmit={onSubmit} className="bg-paper-2 p-8 sm:p-12">
      <h2 className="display text-[clamp(2.2rem,3.6vw,3.4rem)]">{labels.title}</h2>
      <div className="mt-8 grid gap-6">
        <div className="grid gap-6 sm:grid-cols-2">
          <F name="name" l={labels.name} required />
          <F name="company" l={labels.company} />
        </div>
        <F name="phone" l={labels.phone} type="tel" required />
        <div className="relative">
          <textarea id="message" name="message" rows={5} placeholder={labels.message} defaultValue={product ? `${product}\n` : ""} key={product} className={`${field} resize-none`} />
          <label htmlFor="message" className={label}>{labels.message}</label>
        </div>
      </div>
      <button type="submit" className="group mt-10 inline-flex w-full items-center justify-between rounded-full bg-fire py-4 pl-7 pr-6 text-[15px] font-semibold text-paper transition-colors duration-500 hover:bg-ink">
        {labels.send}
        <span className="transition-transform duration-700 [transition-timing-function:var(--ease-expo)] group-hover:translate-x-1" aria-hidden>→</span>
      </button>
      <p className="mt-4 text-[13px] text-mute">{labels.note}</p>
    </form>
  );
}
