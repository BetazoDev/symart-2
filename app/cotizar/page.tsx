import type { Metadata } from "next";
import { LeadForm } from "@/components/LeadForm";

export const metadata: Metadata = { title: "Cotizar" };

export default function Page() {
  return (
    <div className="">
      <div className="bg-surface px-4 py-12 text-center">
        <h1 className="font-display text-4xl md:text-5xl">Solicita tu cotización</h1>
        <p className="mx-auto mt-3 max-w-xl text-sm text-muted">
          Completa el formulario y recibe una propuesta para tu mobiliario. Si no tienes planos, se agenda una visita.
        </p>
      </div>
      <div className="mx-auto grid max-w-5xl gap-10 px-4 py-12 md:grid-cols-2 md:px-8">
        <LeadForm intent="cotizacion" includeCart />
        <div className="text-sm leading-7 text-muted">
          <p>El color dentro del catálogo no cambia el precio.</p>
          <p className="mt-3">Un proyecto, en general, queda listo entre 5 y 15 días hábiles.</p>
          <p className="mt-3">Todos los muebles tienen 5 años de garantía contra defectos de fabricación.</p>
        </div>
      </div>
    </div>
  );
}
