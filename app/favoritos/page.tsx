"use client";

import Link from "next/link";
import { products } from "@/lib/data";
import { money } from "@/lib/format";
import { useStore } from "@/lib/store";

const banner = "https://symart.com.mx/wp-content/uploads/2025/11/sillas-ergonomicas.webp";

export default function Page() {
  const { wishlist, toggleWish, addToCart } = useStore();
  const items = wishlist
    .map((slug) => products.find((product) => product.slug === slug))
    .filter((item): item is NonNullable<typeof item> => Boolean(item));

  return (
    <>
      <div className="page-title relative">
        <div className="paralaximg" style={{ backgroundImage: `url(${banner})` }} />
        <div className="content">
          <div className="container">
            <h3 className="title">Lista de deseos</h3>
            <ul className="breadcrumb">
              <li><Link href="/">Inicio</Link></li>
              <li>Lista de deseos</li>
            </ul>
          </div>
        </div>
      </div>
      <section className="flat-spacing">
        <div className="container">
          {items.length === 0 ? (
            <div className="text-center">
              <h4>Todavía no guardas piezas</h4>
              <Link className="tf-btn btn-onsurface" href="/tienda">Ir a la tienda</Link>
            </div>
          ) : (
            <table className="tf-table-page-cart">
              <thead>
                <tr>
                  <th>Producto</th>
                  <th>Precio</th>
                  <th />
                  <th />
                </tr>
              </thead>
              <tbody>
                {items.map((product) => (
                  <tr className="tf-cart-item" key={product.slug}>
                    <td>
                      <div className="tf-cart-item_product">
                        <Link className="img-box" href={`/producto/${product.slug}`}>
                          <img src={product.images[0]} alt="" />
                        </Link>
                        <div className="cart-info">
                          <Link className="name" href={`/producto/${product.slug}`}>{product.name}</Link>
                          <div className="text_secondary">{product.sku}</div>
                        </div>
                      </div>
                    </td>
                    <td>{money(product.price)}</td>
                    <td>
                      <button
                        type="button"
                        className={`tf-btn btn-onsurface ${product.inStock ? "" : "btn-sold-out"}`}
                        disabled={!product.inStock}
                        onClick={() => addToCart(product.slug, product.finishes[0]?.id ?? "")}
                      >
                        Agregar al carrito
                      </button>
                    </td>
                    <td>
                      <button type="button" className="remove" aria-label="Quitar" onClick={() => toggleWish(product.slug)}>
                        <i className="icon icon-close" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </section>
    </>
  );
}
