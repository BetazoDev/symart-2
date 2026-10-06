"use client";

import { Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ProductCard } from "@/components/ProductCard";
import { keywords, searchProducts } from "@/lib/data";

const banner = "https://symart.com.mx/wp-content/uploads/2025/10/fabrica-de-muebles-de-oficina-1.webp";

function Results() {
  const params = useSearchParams();
  const query = params.get("q") ?? "";
  const results = query.trim() ? searchProducts(query) : [];

  return (
    <>
      <div className="page-title relative">
        <div className="paralaximg" style={{ backgroundImage: `url(${banner})` }} />
        <div className="content">
          <div className="container">
            <h3 className="title">Búsqueda</h3>
            <ul className="breadcrumb">
              <li><Link href="/">Inicio</Link></li>
              <li>{query ? `“${query}”` : "Buscar"}</li>
            </ul>
          </div>
        </div>
      </div>
      <section className="flat-spacing">
        <div className="container">
          {!query && (
            <ul className="list-tags mb_16">
              {keywords.map((word) => (
                <li key={word}>
                  <Link className="radius-60 link" href={`/buscar?q=${encodeURIComponent(word)}`}>{word}</Link>
                </li>
              ))}
            </ul>
          )}
          {query && results.length === 0 && (
            <p className="text-center text_secondary">No encontramos “{query}”. Prueba con escritorio, silla o estación.</p>
          )}
          <div className="tf-grid-layout tf-col-2 lg-col-3 xl-col-4">
            {results.map((product) => (
              <ProductCard key={product.slug} product={product} variant="1" />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

export default function Page() {
  return (
    <Suspense>
      <Results />
    </Suspense>
  );
}
