"use client";

import { FormEvent, useState } from "react";
import { company } from "@/lib/data";
import { money } from "@/lib/format";
import { lineProduct, useStore } from "@/lib/store";

export function LeadForm({
  intent,
  includeCart = false,
}: {
  intent: "cotizacion" | "contacto" | "pedido";
  includeCart?: boolean;
}) {
  const store = useStore();
  const [sent, setSent] = useState(false);
  const lines = store.cart
    .map((line) => ({ line, ...lineProduct(line) }))
    .filter((item) => item.product);

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const payload = {
      intent,
      name: data.get("name"),
      email: data.get("email"),
      phone: data.get("phone"),
      company: data.get("company"),
      message: data.get("message"),
      items: lines.map((item) => ({
        sku: item.product!.sku,
        name: item.product!.name,
        finish: item.finish?.name,
        qty: item.line.qty,
        price: item.product!.price,
      })),
    };
    const previous = JSON.parse(localStorage.getItem("symart-leads") ?? "[]");
    localStorage.setItem("symart-leads", JSON.stringify([payload, ...previous]));
    if (intent === "pedido") store.clearCart();
    setSent(true);
  }

  if (sent) {
    return (
      <div className="border border-line p-8">
        <h2 className="font-display text-3xl">Ya está en manos de un asesor</h2>
        <p className="mt-3 text-sm leading-6 text-muted">
          Este demo guarda la solicitud en el navegador. Cuando se conecte el backend, el mismo formulario se enviará a Node.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="space-y-4">
      {includeCart && (
        <div className="border border-line p-4 text-sm">
          {lines.length === 0 ? (
            <p className="text-muted">Todavía no hay piezas en el carrito.</p>
          ) : (
            <ul className="space-y-2">
              {lines.map((item) => (
                <li key={`${item.line.slug}-${item.line.finishId}`} className="flex justify-between gap-3">
                  <span>{item.line.qty} × {item.product!.name} · {item.finish?.name}</span>
                  <span>{money(item.product!.price * item.line.qty)}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
      <Field name="name" label="Nombre" required />
      <Field name="email" label="Correo" type="email" required />
      <Field name="phone" label="Teléfono o WhatsApp" />
      <Field name="company" label="Empresa o institución" />
      <label className="block text-sm">
        <span className="mb-1 block text-muted">¿Algo que debamos saber?</span>
        <textarea name="message" rows={4} className="w-full border border-line px-3 py-3 outline-none focus:border-ink" />
      </label>
      <button className="w-full bg-ink py-3.5 text-xs font-semibold uppercase tracking-[0.16em] text-white hover:bg-brand">
        {intent === "pedido" ? "Confirmar pedido demo" : "Enviar"}
      </button>
      <p className="text-xs text-muted">
        Usamos tus datos solo para atender esta solicitud. También puedes escribir a {company.email} o llamar al {company.phone}.
      </p>
    </form>
  );
}

function Field({ name, label, type = "text", required = false }: { name: string; label: string; type?: string; required?: boolean }) {
  return (
    <label className="block text-sm">
      <span className="mb-1 block text-muted">{label}{required ? " *" : ""}</span>
      <input name={name} type={type} required={required} className="w-full border border-line px-3 py-3 outline-none focus:border-ink" />
    </label>
  );
}
