"use client";

import Link from "next/link";
import { useState } from "react";
import { useTotals } from "@/components/CartDrawer";
import { COUPON, FREE_SHIPPING } from "@/lib/data";
import { money } from "@/lib/format";
import { couponRate, useStore } from "@/lib/store";

export default function Page() {
  const store = useStore();
  const { lines, subtotal, discount, shipping, total, rate } = useTotals();
  const [code, setCode] = useState(store.coupon);
  const [accepted, setAccepted] = useState(false);
  const [shipOpen, setShipOpen] = useState(false);
  const [couponOpen, setCouponOpen] = useState(false);
  const [noteOpen, setNoteOpen] = useState(false);
  const [message, setMessage] = useState("");

  return (
    <>
      <div className="page-title relative">
        <div className="paralaximg" style={{ backgroundImage: "url(https://symart.com.mx/wp-content/uploads/2025/10/fabrica-de-muebles-de-oficina-1.webp)" }} />
        <div className="content">
          <div className="container">
            <h3 className="title">Carrito</h3>
            <ul className="breadcrumb">
              <li><Link href="/">Inicio</Link></li>
              <li>Carrito</li>
            </ul>
          </div>
        </div>
      </div>
      <section className="flat-spacing">
      <div className="container">
      <div className="row">
      <div className="col-lg-8">
        <div>
          {lines.length === 0 ? (
            <div className="py-16">
              <p className="font-display text-3xl">El carrito está vacío</p>
              <Link href="/tienda" className="mt-4 inline-block text-sm underline">Ver la tienda</Link>
            </div>
          ) : (
            <ul className="divide-y divide-line border-y border-line">
              {lines.map(({ line, product, finish }) => (
                <li key={`${line.slug}-${line.finishId}`} className="grid gap-4 py-5 sm:grid-cols-[120px_1fr_auto]">
                  <img src={finish!.image} alt="" className="h-28 w-full object-cover sm:w-28" />
                  <div>
                    <Link href={`/producto/${product!.slug}`} className="hover:text-brand">{product!.name}</Link>
                    <p className="text-sm text-muted">{finish!.name} · {product!.sku}</p>
                    <div className="mt-3 flex items-center border border-line w-fit">
                      <button type="button" className="h-9 w-9" onClick={() => store.setQty(line.slug, line.finishId, line.qty - 1)}>-</button>
                      <span className="w-8 text-center text-sm">{line.qty}</span>
                      <button type="button" className="h-9 w-9" onClick={() => store.setQty(line.slug, line.finishId, line.qty + 1)}>+</button>
                    </div>
                  </div>
                  <div className="text-right">
                    <p>{money(product!.price * line.qty)}</p>
                    <button type="button" className="mt-2 text-xs uppercase text-muted" onClick={() => store.removeFromCart(line.slug, line.finishId)}>Quitar</button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
      <div className="col-lg-4">
        <aside className="h-fit border border-line p-6">
          <h2 className="font-display text-2xl">Resumen</h2>
          <Row label="Subtotal" value={money(subtotal)} />
          <Row label={rate ? `Cupón ${COUPON.code}` : "Cupón"} value={discount ? `-${money(discount)}` : money(0)} />
          <Row label="Envío de referencia" value={shipping === 0 ? "Sin costo" : money(shipping)} />
          <div className="mt-4 flex justify-between border-t border-line pt-4 text-lg">
            <span>Total</span>
            <span>{money(total)}</span>
          </div>
          <p className="mt-2 text-xs text-muted">
            Envío de referencia sin costo desde {money(FREE_SHIPPING)} o en Aguascalientes, donde la instalación va incluida.
          </p>

          <button type="button" className="mt-5 text-sm underline" onClick={() => setNoteOpen((value) => !value)}>Nota del pedido</button>
          {noteOpen && (
            <textarea value={store.note} onChange={(event) => store.setNote(event.target.value)} rows={3} placeholder="Medidas, piso, horario de instalación..." className="mt-2 w-full border border-line p-3 text-sm outline-none" />
          )}

          <button type="button" className="mt-4 block text-sm underline" onClick={() => setShipOpen((value) => !value)}>Estimar envío</button>
          {shipOpen && (
            <label className="mt-2 block text-sm">
              Ciudad
              <select value={store.shippingCity} onChange={(event) => store.setShippingCity(event.target.value)} className="mt-1 w-full border border-line px-3 py-2">
                <option>Aguascalientes</option>
                <option>Zacatecas</option>
                <option>León</option>
                <option>Guadalajara</option>
                <option>Ciudad de México</option>
              </select>
            </label>
          )}

          <button type="button" className="mt-4 block text-sm underline" onClick={() => setCouponOpen((value) => !value)}>Agregar cupón</button>
          {couponOpen && (
            <form
              className="mt-2 flex border border-line"
              onSubmit={(event) => {
                event.preventDefault();
                if (couponRate(code)) {
                  store.setCoupon(code.trim().toUpperCase());
                  setMessage("Cupón aplicado.");
                } else {
                  store.setCoupon("");
                  setMessage("Ese cupón no existe. Prueba SYMART10.");
                }
              }}
            >
              <input value={code} onChange={(event) => setCode(event.target.value)} placeholder="SYMART10" className="w-full px-3 py-2 text-sm outline-none" />
              <button className="bg-ink px-4 text-xs uppercase tracking-wider text-white">Aplicar</button>
            </form>
          )}
          {message && <p className="mt-2 text-xs text-muted">{message}</p>}

          <label className="mt-5 flex items-start gap-2 text-sm">
            <input type="checkbox" checked={accepted} onChange={(event) => setAccepted(event.target.checked)} className="mt-1 accent-brand" />
            Acepto que este total es un precio de referencia y que un asesor confirmará la cotización.
          </label>
          <Link
            href={accepted && lines.length ? "/checkout" : "#"}
            aria-disabled={!accepted || !lines.length}
            onClick={(event) => {
              if (!accepted || !lines.length) event.preventDefault();
            }}
            className={`mt-4 block py-3 text-center text-xs font-semibold uppercase tracking-[0.16em] text-white ${accepted && lines.length ? "bg-ink hover:bg-brand" : "pointer-events-none bg-neutral-300"}`}
          >
            Ir al checkout
          </Link>
        </aside>
      </div>
      </div>
      </div>
      </section>
    </>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="mt-3 flex justify-between text-sm">
      <span className="text-muted">{label}</span>
      <span>{value}</span>
    </div>
  );
}
