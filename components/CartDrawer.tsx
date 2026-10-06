"use client";

import Link from "next/link";
import { COUPON, FREE_SHIPPING, SHIPPING_FEE, products } from "@/lib/data";
import { money } from "@/lib/format";
import { couponRate, lineProduct, useStore } from "@/lib/store";

export function useTotals() {
  const { cart, coupon, shippingCity } = useStore();
  const lines = cart
    .map((line) => ({ line, ...lineProduct(line) }))
    .filter((item) => item.product && item.finish);
  const subtotal = lines.reduce((sum, item) => sum + item.product!.price * item.line.qty, 0);
  const rate = couponRate(coupon);
  const discount = Math.round(subtotal * rate);
  const local = shippingCity.toLowerCase().includes("aguascalientes");
  const shipping = subtotal === 0 || subtotal >= FREE_SHIPPING || local ? 0 : SHIPPING_FEE;
  return { lines, subtotal, discount, shipping, total: subtotal - discount + shipping, rate, local };
}

export function CartDrawer() {
  const store = useStore();
  const { lines, subtotal } = useTotals();
  const progress = Math.min(100, (subtotal / FREE_SHIPPING) * 100);
  const picks = products.filter((item) => item.bestseller).slice(0, 4);
  if (!store.cartOpen) return null;

  return (
    <>
      <div className="modal-backdrop fade show" onClick={() => store.setCartOpen(false)} />
      <div className="modal fullRight fade show modal-shopping-cart" id="shoppingCart">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="tf-minicart-recommendations">
              <h6 className="title">También te puede interesar</h6>
              <div className="wrap-recommendations">
                <div className="list-cart">
                  {picks.map((item) => (
                    <div className="list-cart-item" key={item.slug}>
                      <div className="image">
                        <img src={item.images[0]} alt="" />
                      </div>
                      <div className="content">
                        <div className="name">
                          <Link className="link text-line-clamp-1" href={`/producto/${item.slug}`} onClick={() => store.setCartOpen(false)}>
                            {item.name}
                          </Link>
                        </div>
                        <div className="cart-item-bot">
                          <div className="text-button price">{money(item.price)}</div>
                          <button type="button" className="link text-button" onClick={() => store.addToCart(item.slug, item.finishes[0].id)}>
                            Agregar
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="d-flex flex-column flex-grow-1 h-100">
              <div className="header">
                <h5 className="title">Carrito</h5>
                <button type="button" className="icon-close icon-close-popup" aria-label="Cerrar" onClick={() => store.setCartOpen(false)} />
              </div>
              <div className="wrap">
                <div className="tf-mini-cart-threshold">
                  <div className="tf-progress-bar">
                    <div className="value" style={{ width: `${progress}%` }}>
                      <i className="icon icon-shipping" />
                    </div>
                  </div>
                  <p className="text-caption-1">
                    {subtotal >= FREE_SHIPPING
                      ? "Este pedido ya cubre el envío de referencia."
                      : `Te faltan ${money(Math.max(0, FREE_SHIPPING - subtotal))} para envío de referencia sin costo.`}
                  </p>
                </div>
                <div className="tf-mini-cart-wrap">
                  <div className="tf-mini-cart-main">
                    <div className="tf-mini-cart-sroll">
                      <div className="tf-mini-cart-items">
                        {lines.length === 0 && <p className="text-body-default" style={{ padding: 24 }}>El carrito está vacío.</p>}
                        {lines.map(({ line, product, finish }) => (
                          <div className="tf-mini-cart-item" key={`${line.slug}-${line.finishId}`}>
                            <div className="tf-mini-cart-image">
                              <img src={finish!.image} alt="" />
                            </div>
                            <div className="tf-mini-cart-info flex-grow-1">
                              <div className="content">
                                <div className="left">
                                  <div className="text-title">
                                    <Link className="link line-clamp-1" href={`/producto/${product!.slug}`} onClick={() => store.setCartOpen(false)}>
                                      {product!.name}
                                    </Link>
                                  </div>
                                  <div className="text-secondary-2">{finish!.name}</div>
                                  <div className="wg-quantity">
                                    <button type="button" className="btn-quantity btn-decrease" onClick={() => store.setQty(line.slug, line.finishId, line.qty - 1)}>-</button>
                                    <input className="quantity-product" readOnly value={line.qty} />
                                    <button type="button" className="btn-quantity btn-increase" onClick={() => store.setQty(line.slug, line.finishId, line.qty + 1)}>+</button>
                                  </div>
                                </div>
                                <div className="right">
                                  <button type="button" className="text-button tf-btn-remove remove" onClick={() => store.removeFromCart(line.slug, line.finishId)}>
                                    Quitar
                                  </button>
                                  <div className="text-button">{line.qty} × {money(product!.price)}</div>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="tf-mini-cart-bottom">
                    <div className="tf-mini-cart-bottom-wrap">
                      <div className="tf-cart-totals-discounts">
                        <h5>Subtotal</h5>
                        <h5 className="tf-totals-total-value">{money(subtotal)}</h5>
                      </div>
                      <p className="text-caption-1">Precio de referencia. Cupón demo: {COUPON.code}</p>
                      <div className="tf-mini-cart-view-checkout">
                        <Link className="tf-btn w-100 btn-white has-border" href="/carrito" onClick={() => store.setCartOpen(false)}>
                          Ver carrito
                        </Link>
                        <Link className="tf-btn w-100 btn-onsurface" href="/checkout" onClick={() => store.setCartOpen(false)}>
                          Checkout
                        </Link>
                      </div>
                      <div className="text-center">
                        <button type="button" className="link btn-line" onClick={() => store.setCartOpen(false)}>
                          Seguir comprando
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
