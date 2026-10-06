"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { ProductCard } from "@/components/ProductCard";
import { keywords, products, searchProducts } from "@/lib/data";
import { useStore } from "@/lib/store";

export function SearchModal() {
  const { searchOpen, setSearchOpen, viewed } = useStore();
  const [query, setQuery] = useState("");
  const router = useRouter();
  const results = useMemo(() => (query.trim() ? searchProducts(query).slice(0, 4) : []), [query]);
  const recent = viewed
    .map((slug) => products.find((item) => item.slug === slug))
    .filter((item): item is NonNullable<typeof item> => Boolean(item))
    .slice(0, 4);
  const shown = query.trim() ? results : recent;

  if (!searchOpen) return null;

  function go(value: string) {
    setSearchOpen(false);
    router.push(`/buscar?q=${encodeURIComponent(value)}`);
  }

  return (
    <>
      <div className="modal-backdrop fade show" onClick={() => setSearchOpen(false)} />
      <div className="modal fade show modal-search" id="search">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="d-flex justify-content-between align-items-center">
              <h5>Buscar</h5>
              <button type="button" className="icon-close icon-close-popup" aria-label="Cerrar" onClick={() => setSearchOpen(false)} />
            </div>
            <form
              className="form-search"
              onSubmit={(event) => {
                event.preventDefault();
                if (query.trim()) go(query.trim());
              }}
            >
              <fieldset className="text">
                <input
                  type="text"
                  placeholder="Buscar escritorio, silla, SKU..."
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                />
              </fieldset>
              <button type="submit" aria-label="Buscar">
                <span className="icon icon-search" />
              </button>
            </form>
            <div>
              <h5 className="mb_16">Búsquedas frecuentes</h5>
              <ul className="list-tags">
                {keywords.map((word) => (
                  <li key={word}>
                    <button type="button" className="radius-60 link" onClick={() => go(word)}>{word}</button>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h6 className="mb_16">{query.trim() ? "Resultados" : "Vistos recientemente"}</h6>
              {shown.length === 0 ? (
                <p className="text_secondary">Todavía no hay piezas vistas. Prueba con una palabra de arriba.</p>
              ) : (
                <div className="tf-grid-layout tf-col-2 lg-col-3 xl-col-4">
                  {shown.map((product) => (
                    <div key={product.slug} onClick={() => setSearchOpen(false)}>
                      <ProductCard product={product} variant="1" />
                    </div>
                  ))}
                </div>
              )}
              {query.trim() && (
                <Link className="btn-line" href={`/buscar?q=${encodeURIComponent(query.trim())}`} onClick={() => setSearchOpen(false)}>
                  <span>Ver todos los resultados</span>
                  <i className="icon-arrow-up-right" />
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
