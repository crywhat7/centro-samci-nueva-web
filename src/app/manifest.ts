import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Centro Samci — Extintores Honduras",
    short_name: "Centro Samci",
    start_url: "/",
    display: "standalone",
    background_color: "#f2ede4",
    theme_color: "#ed1c24",
    icons: [{ src: "/icon.png", sizes: "any", type: "image/png" }],
  };
}
