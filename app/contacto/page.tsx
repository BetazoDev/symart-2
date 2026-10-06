import type { Metadata } from "next";
import { LeadForm } from "@/components/LeadForm";
import { company } from "@/lib/data";

export const metadata: Metadata = { title: "Contacto" };

export default function Page() {
  return (
    <div className="">
      <div className="bg-surface px-4 py-12 text-center">
        <h1 className="font-display text-4xl md:text-5xl">Contáctanos</h1>
      </div>
      <div className="mx-auto grid max-w-5xl gap-12 px-4 py-12 md:grid-cols-2 md:px-8">
        <div>
          <p className="text-sm leading-7 text-muted">Fábrica de muebles de oficina en {company.city}. Más de {company.years} años equipando empresas, instituciones, oficinas y consultorios.</p>
          <a href={company.phoneHref} className="mt-6 block font-display text-2xl leading-tight sm:text-3xl">{company.phone}</a>
          <a href={`mailto:${company.email}`} className="mt-1 block hover:text-brand">{company.email}</a>
          <a href={company.whatsapp} className="mt-4 inline-block bg-brand px-5 py-3 text-xs font-semibold uppercase tracking-wider text-white">WhatsApp</a>
          <a href={company.instagram} target="_blank" rel="noreferrer" className="mt-4 block text-sm underline">Instagram {company.instagramHandle}</a>
        </div>
        <LeadForm intent="contacto" />
      </div>
    </div>
  );
}
