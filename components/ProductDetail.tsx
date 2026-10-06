"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { categoryName, products, relatedProducts } from "@/lib/data";
import { discount, money } from "@/lib/format";
import { useStore } from "@/lib/store";
import type { Product } from "@/lib/types";
import { ProductCard } from "./ProductCard";

export function ProductDetail({ product }: { product: Product }) {
  const { addToCart, toggleWish, wished, view } = useStore();
  const [finishId, setFinishId] = useState(product.finishes[0]?.id ?? "");
  const [image, setImage] = useState(product.images[0]);
  const [qty, setQty] = useState(1);
  const [tab, setTab] = useState<"desc" | "specs" | "warranty">("desc");
  const finish = product.finishes.find((item) => item.id === finishId) ?? product.finishes[0];
  const off = discount(product.price, product.compareAt);
  const index = products.findIndex((item) => item.slug === product.slug);
  const prev = products[(index - 1 + products.length) % products.length];
  const next = products[(index + 1) % products.length];
  const related = relatedProducts(product);
  const saved = wished(product.slug);

  useEffect(() => {
    view(product.slug);
  }, [product.slug, view]);

  const tabs = [
    ["desc", "Descripción"],
    ["specs", "Especificaciones"],
    ["warranty", "Garantía"],
  ] as const;

  return (
    <>
      <div className="tf-breadcrumb-wrap">
        <div className="container">
          <div className="tf-breadcrumb-wrap">
            <div className="tf-breadcrumb-list">
              <Link className="text text-caption-1" href="/">Inicio</Link>
              <i className="icon icon-right" />
              <Link className="text text-caption-1" href={`/tienda?categoria=${product.category}`}>{categoryName(product.category)}</Link>
              <i className="icon icon-right" />
              <span className="text_secondary2 text-caption-1">{product.name}</span>
            </div>
            <div className="tf-breadcrumb-prev-next">
              <Link className="tf-breadcrumb-prev" href={`/producto/${prev.slug}`} aria-label="Anterior"><i className="icon icon-left" /></Link>
              <Link className="tf-breadcrumb-back" href="/tienda" aria-label="Tienda"><i className="icon icon-squaresfour" /></Link>
              <Link className="tf-breadcrumb-next" href={`/producto/${next.slug}`} aria-label="Siguiente"><i className="icon icon-right" /></Link>
            </div>
          </div>
        </div>
      </div>

      <section className="flat-spacing">
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <div className="tf-product-media-wrap sticky-top">
                <div className="thumbs-slider flex-row-reverse symart-thumbs">
                  <div className="swiper tf-product-media-thumbs">
                    <div className="swiper-wrapper">
                      {product.images.map((src) => (
                        <button
                          type="button"
                          key={src}
                          className={`swiper-slide ${image === src ? "swiper-slide-thumb-active" : ""}`}
                          onClick={() => setImage(src)}
                        >
                          <div className="item">
                            <img src={src} alt="" />
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="swiper tf-product-media-main">
                    <a className="item" href={image} target="_blank" rel="noreferrer">
                      <img className="tf-image-zoom" src={image} alt={product.name} />
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="sticky-top">
                <div className="tf-product-info-wrap position-relative">
                  <div className="tf-product-info-list">
                    <div className="tf-product-info-heading">
                      <div className="tf-product-info-name">
                        <h3 className="name">{product.name}</h3>
                        <div className="sub">
                          {product.badge && <div className="tf-product-tag text-caption-1">{product.badge}</div>}
                          <div className="tf-product-info-rate">
                            <div className="list-star-default">
                              {Array.from({ length: 5 }).map((_, star) => (
                                <i className="icon icon-star" key={star} />
                              ))}
                            </div>
                            <div className="text text-caption-1">({product.reviews} reseñas de catálogo)</div>
                          </div>
                        </div>
                      </div>
                      <div className="tf-product-info-desc">
                        <div className="tf-product-info-price">
                          <h5 className="price-on-sale">{money(product.price)}</h5>
                          {product.compareAt && <div className="compare-at-price">{money(product.compareAt)}</div>}
                          {off > 0 && <div className="badges-on-sale text-btn-uppercase">-{off}%</div>}
                        </div>
                        <p>{product.description}</p>
                        <p className="text-caption-1">SKU {product.sku}. Elegir otro color del catálogo no cambia el precio.</p>
                      </div>
                    </div>
                    <div className="tf-product-info-choose-option gap-19">
                      <div className="variant-picker-item">
                        <div className="variant-picker-label mb_12">
                          Acabado:<span className="text-title variant-picker-label-value">{finish?.name}</span>
                        </div>
                        <div className="variant-picker-values">
                          {product.finishes.map((item) => (
                            <button
                              key={item.id}
                              type="button"
                              className={`hover-tooltip tooltip-bot radius-60 color-btn ${item.id === finish?.id ? "active" : ""}`}
                              onClick={() => { setFinishId(item.id); setImage(item.image); }}
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
                        <button type="button" className={`box-icon wishlist ${saved ? "is-saved" : ""}`} aria-label="Guardar en lista de deseos" onClick={() => toggleWish(product.slug)}>
                          <span className="icon icon-heart" />
                        </button>
                      </div>
                      <ul>
                        {product.highlights.map((item) => (
                          <li className="text_secondary" key={item}>{item}</li>
                        ))}
                      </ul>
                      <p>{product.inStock ? "Disponible para cotizar y fabricar." : "Este modelo está agotado en el demo."}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="flat-spacing pt-0">
        <div className="container">
          <div className="widget-tabs style-1">
            <ul className="widget-menu-tab">
              {tabs.map(([id, label]) => (
                <li key={id} className={`item-title ${tab === id ? "active" : ""}`}>
                  <button type="button" className="inner" onClick={() => setTab(id)}>{label}</button>
                </li>
              ))}
            </ul>
            <div className="widget-content-tab">
              {tab === "desc" && (
                <div className="widget-content-inner active">
                  <p className="text_secondary">{product.description}</p>
                </div>
              )}
              {tab === "specs" && (
                <div className="widget-content-inner active">
                  <ul>
                    <li>SKU: {product.sku}</li>
                    <li>Línea: {categoryName(product.category)}</li>
                    <li>Materiales: {product.materials.join(", ")}</li>
                    {product.widthCm ? <li>Ancho: {product.widthCm} cm</li> : null}
                    {product.drawers !== undefined ? <li>Cajones: {product.drawers}</li> : null}
                    <li>Origen: fabricado en Aguascalientes</li>
                    <li>Tiempo de proyecto: 5 a 15 días hábiles</li>
                  </ul>
                </div>
              )}
              {tab === "warranty" && (
                <div className="widget-content-inner active">
                  <p className="text_secondary">
                    5 años contra defectos de fabricación. En sillas: pistón que no funcione, mecanismo descompuesto y una llanta rota. En muebles: una pija que atore la corredera, una vista mal colocada y jaladeras sin un tornillo.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section className="flat-spacing-7">
          <div className="container">
            <div className="heading-section text-center">
              <h3>También en esta línea</h3>
            </div>
            <div className="tf-grid-layout tf-col-2 lg-col-4">
              {related.map((item) => (
                <ProductCard key={item.slug} product={item} variant="1" />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
