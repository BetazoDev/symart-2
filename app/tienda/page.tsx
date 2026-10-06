import type { Metadata } from "next";
import { Suspense } from "react";
import { ShopView } from "@/components/ShopView";

export const metadata: Metadata = {
  title: "Tienda",
  description: "Escritorios, sillas, estaciones, mesas, almacenamiento y recepciones Symart.",
};

export default function Page() {
  return (
    <Suspense fallback={<div className="px-8 py-32 text-center text-muted">Cargando tienda…</div>}>
      <ShopView />
    </Suspense>
  );
}
