"use client";

import Link from "next/link";
import { useState } from "react";
import { getProduct } from "@/lib/data";
import { discount, money } from "@/lib/format";
import { useStore } from "@/lib/store";

export function QuickView() {
  const { quickSlug, setQuickSlug, addToCart, toggleWish, wished } = useStore();
  const product = quickSlug ? getProduct(quickSlug) : undefined;
  const [finishId, setFinishId] = useState<string | null>(null);
  const [qty, setQty] = useState(1);

  if (!product) return null;
  const finish = product.finishes.find((item) => item.id === (finishId ?? product.finishes[0]?.id)) ?? product.finishes[0];
  const off = discount(product.price, product.compareAt);
  const saved = wished(product.slug);

  return (
    <>
      <div className="modal-backdrop fade show" onClick={() => setQuickSlug(null)} />
      <div className="modal fade show modal-quick-view" id="quickView">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <button type="button" className="icon-close icon-close-popup" aria-label="Cerrar" onClick={() => setQuickSlug(null)} />
            <div className="wrap">
              <div className="tf-product-media-wrap">
                <img src={finish?.image ?? product.images[0]} alt={product.name} />
              </div>
              <div className="tf-product-info-wrap">
                <div className="tf-product-info-list">
                  <div className="tf-product-info-heading">
                    <h3 className="name">{product.name}</h3>
                    <div className="tf-product-info-rate">
                      <div className="list-star-default">
                        {Array.from({ length: 5 }).map((_, index) => (
                          <i className={`icon icon-star ${index < Math.round(product.rating) ? "" : "text_secondary2"}`} key={index} />
                        ))}
                      </div>
                      <div className="text text-caption-1">({product.reviews} reseñas de catálogo)</div>
                    </div>
                    <div className="tf-product-info-price">
                      <h5 className="price-on-sale">{money(product.price)}</h5>
                      {product.compareAt && <div className="compare-at-price">{money(product.compareAt)}</div>}
                      {off > 0 && <div className="badges-on-sale text-btn-uppercase">-{off}%</div>}
                    </div>
                    <p>{product.description}</p>
                  </div>
                  <div className="variant-picker-item">
                    <div className="variant-picker-label mb_12">
                      Acabado: <span className="text-title">{finish?.name}</span>
                    </div>
                    <div className="variant-picker-values">
                      {product.finishes.map((item) => (
                        <button
                          key={item.id}
                          type="button"
                          className={`hover-tooltip tooltip-bot radius-60 color-btn ${item.id === finish?.id ? "active" : ""}`}
                          onClick={() => setFinishId(item.id)}
                          aria-label={item.name}
                        >
                          <span className="btn-checkbox" style={{ background: item.hex }} />
                          <span className="tooltip">{item.name}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="tf-product-info-by-btn">
                    <div className="wg-quantity">
                      <button type="button" className="btn-quantity btn-decrease" onClick={() => setQty((value) => Math.max(1, value - 1))}>-</button>
                      <input className="quantity-product" readOnly value={qty} />
                      <button type="button" className="btn-quantity btn-increase" onClick={() => setQty((value) => value + 1)}>+</button>
                    </div>
                    <button
                      type="button"
                      className={`tf-btn btn-onsurface ${product.inStock ? "" : "btn-sold-out"}`}
                      disabled={!product.inStock}
                      onClick={() => addToCart(product.slug, finish?.id ?? "", qty)}
                    >
                      {product.inStock ? "Agregar al carrito" : "Agotado"}
                    </button>
                    <button type="button" className={`box-icon wishlist ${saved ? "is-saved" : ""}`} aria-label="Lista de deseos" onClick={() => toggleWish(product.slug)}>
                      <span className="icon icon-heart" />
                    </button>
                  </div>
                  <Link className="btn-line" href={`/producto/${product.slug}`} onClick={() => setQuickSlug(null)}>
                    <span>Ver ficha completa</span>
                    <i className="icon-arrow-up-right" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
