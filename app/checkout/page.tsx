"use client";

import { LeadForm } from "@/components/LeadForm";

export default function Page() {
  return (
    <div className="">
      <div className="bg-surface py-12 text-center">
        <h1 className="font-display text-4xl">Checkout</h1>
        <p className="mt-2 text-sm text-muted">Pedido de demostración. No se realiza ningún cobro.</p>
      </div>
      <div className="mx-auto max-w-xl px-4 py-12">
        <LeadForm intent="pedido" includeCart />
      </div>
    </div>
  );
}
