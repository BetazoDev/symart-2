import type { Metadata } from "next";
import Link from "next/link";
import { clients, company, reasons } from "@/lib/data";

export const metadata: Metadata = { title: "Nosotros" };

const photos = [
  "https://symart.com.mx/wp-content/uploads/2025/10/fabrica-de-muebles-de-oficina-1.webp",
  "https://symart.com.mx/wp-content/uploads/2026/03/muebles-de-oficina-1.webp",
  "https://symart.com.mx/wp-content/uploads/2025/11/muebles-de-oficina-de-buena-calidad-1.webp",
];

export default function Page() {
  return (
    <div className="">
      <div className="bg-surface px-4 py-16 text-center">
        <p className="text-xs uppercase tracking-[0.22em] text-brand">Aguascalientes</p>
        <h1 className="mt-3 font-display text-5xl">Conócenos</h1>
        <p className="mx-auto mt-4 max-w-2xl text-muted">
          Fábrica de muebles de oficina con más de {company.years} años equipando empresas, instituciones, oficinas y consultorios. Fabricamos, entregamos e instalamos.
        </p>
      </div>
      <div className="mx-auto grid max-w-[1440px] gap-3 px-4 py-12 md:grid-cols-3 md:px-8">
        {photos.map((src) => (
          <img key={src} src={src} alt="Planta y proyectos Symart" className="aspect-[4/3] w-full object-cover" />
        ))}
      </div>
      <section className="mx-auto grid max-w-[1440px] gap-8 px-4 pb-16 md:grid-cols-3 md:px-8">
        {reasons.map((item) => (
          <article key={item.title} className="border border-line p-6">
            <h2 className="text-2xl">{item.title}</h2>
            <p className="mt-3 text-sm leading-6 text-muted">{item.text}</p>
          </article>
        ))}
      </section>
      <section className="bg-surface py-14">
        <div className="mx-auto max-w-[1440px] px-4 text-center md:px-8">
          <h2 className="font-display text-3xl">Han confiado en nosotros</h2>
          <div className="client-logos mt-8 flex flex-wrap items-center justify-center gap-10">
            {clients.map((item) => (
              <img key={item.name} src={item.logo} alt={item.name} className="h-14 w-auto object-contain" />
            ))}
          </div>
          <Link href="/cotizar" className="mt-10 inline-block bg-brand px-6 py-3 text-xs font-semibold uppercase tracking-wider text-white">Solicitar cotización</Link>
        </div>
      </section>
    </div>
  );
}
