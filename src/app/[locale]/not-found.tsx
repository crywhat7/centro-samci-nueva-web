import Link from "next/link";
import { Container } from "@/components/ui";

export default function NotFound() {
  return (
    <section className="py-32">
      <Container>
        <p className="display text-[clamp(8rem,30vw,26rem)] leading-[0.8] text-fire">404</p>
        <h1 className="mt-8 text-3xl font-semibold">Página no encontrada · Page not found</h1>
        <p className="mt-3 max-w-xl text-ink/70">La página que busca no existe o cambió de dirección. The page you&apos;re looking for doesn&apos;t exist or has moved.</p>
        <div className="mt-10 flex gap-6 font-semibold">
          <Link href="/" className="ulink">Ir al inicio</Link>
          <Link href="/en" className="ulink">Go home</Link>
        </div>
      </Container>
    </section>
  );
}
