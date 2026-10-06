"use client";

import Link from "next/link";
import { useState } from "react";
import { discount, money } from "@/lib/format";
import { useStore } from "@/lib/store";
import type { Product } from "@/lib/types";

export function ProductCard({
  product,
  layout = "grid",
  variant = "1",
}: {
  product: Product;
  layout?: "grid" | "list";
  variant?: "1" | "3";
}) {
  const { toggleWish, wished, addToCart, setQuickSlug } = useStore();
  const [finishId, setFinishId] = useState(product.finishes[0]?.id ?? "");
  const finish = product.finishes.find((item) => item.id === finishId) ?? product.finishes[0];
  const image = finish?.image ?? product.images[0];
  const hover = product.images.find((item) => item !== image) ?? image;
  const off = discount(product.price, product.compareAt);
  const saved = wished(product.slug);
  const style = layout === "list" ? "style-list" : `style-${variant}`;
  const quickInBar = variant === "3" && layout !== "list";

  const icons = (
    <>
      <button
        type="button"
        className={`box-icon wishlist btn-icon-action ${saved ? "is-saved" : ""}`}
        aria-label="Lista de deseos"
        onClick={() => toggleWish(product.slug)}
      >
        <span className="icon icon-heart" />
        <span className="tooltip">Lista de deseos</span>
      </button>
      <button type="button" className="box-icon compare" aria-label="Comparar">
        <span className="icon icon-compare" />
        <span className="tooltip">Comparar</span>
      </button>
      {!quickInBar && (
        <button type="button" className="box-icon quickview" aria-label="Vista rápida" onClick={() => setQuickSlug(product.slug)}>
          <span className="icon icon-eye" />
          <span className="tooltip">Vista rápida</span>
        </button>
      )}
    </>
  );

  return (
    <div className={`card-product ${style}`}>
      <div className="card-product-wrapper">
        <Link className="image-wrap" href={`/producto/${product.slug}`}>
          <img className="img-product" src={image} alt={product.name} />
          <img className="img-hover" src={hover} alt="" />
        </Link>
        {off > 0 && (
          <div className="on-sale-wrap">
            <span className="on-sale-item">-{off}%</span>
          </div>
        )}
        <div className="list-product-btn">{icons}</div>
        <div className="list-btn-main">
          <button
            type="button"
            className={`btn-main-product ${product.inStock ? "" : "btn-sold-out"}`}
            disabled={!product.inStock}
            onClick={() => addToCart(product.slug, finish?.id ?? finishId)}
          >
            {product.inStock ? "Agregar al carrito" : "Agotado"}
          </button>
          {quickInBar && (
            <button type="button" className="box-icon quickview" aria-label="Vista rápida" onClick={() => setQuickSlug(product.slug)}>
              <span className="icon icon-eye" />
              <span className="tooltip">Vista rápida</span>
            </button>
          )}
        </div>
      </div>
      <div className="card-product-info">
        <Link className="text-body-default link" href={`/producto/${product.slug}`}>
          {product.name}
        </Link>
        <div className="price text-body-default">
          {product.compareAt ? <span className="text-caption-1 old-price">{money(product.compareAt)}</span> : null}
          {money(product.price)}
        </div>
        {product.finishes.length > 0 && (
          <ul className="list-color-product">
            {product.finishes.map((item) => (
              <li key={item.id}>
                <button
                  type="button"
                  className={`list-color-item color-swatch ${item.id === finish?.id ? "active" : ""}`}
                  aria-label={item.name}
                  onClick={() => setFinishId(item.id)}
                >
                  <span className="d-none text-capitalize color-filter">{item.name}</span>
                  <span className="swatch-value" style={{ background: item.hex }} />
                  <img src={item.image} alt="" />
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
