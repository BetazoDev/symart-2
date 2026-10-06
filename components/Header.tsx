"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { categories, company, products } from "@/lib/data";
import { useStore } from "@/lib/store";

const links = [
  { href: "/nosotros", label: "NOSOTROS" },
  { href: "/blog", label: "BLOG" },
  { href: "/contacto", label: "CONTACTO" },
];

export function Header() {
  const pathname = usePathname();
  const home = pathname === "/";
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { count, wishlist, setCartOpen, setSearchOpen } = useStore();
  const overlay = home && !scrolled && !menuOpen;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const [seenPath, setSeenPath] = useState(pathname);
  if (seenPath !== pathname) {
    setSeenPath(pathname);
    setMenuOpen(false);
  }

  const headerClass = home
    ? `header-default header-absolute header-style-2 header-fixed ${overlay ? "" : "header-bg"}`
    : "header-default border-bot";

  return (
    <>
      {home ? <div className="space-1" /> : null}
      <header id="header" className={headerClass}>
        <div className={`main-header ${home ? "has-border-y" : ""}`}>
          <div className="container-full">
            <div className="row wrapper-header align-items-center">
              <div className="col-xl-3 col-2 d-xl-none">
                <button type="button" className="mobile-menu" aria-label="Menú" onClick={() => setMenuOpen(true)}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#181818" viewBox="0 0 256 256">
                    <path d="M224,128a8,8,0,0,1-8,8H40a8,8,0,0,1,0-16H216A8,8,0,0,1,224,128ZM40,72H216a8,8,0,0,0,0-16H40a8,8,0,0,0,0,16ZM216,184H40a8,8,0,0,0,0,16H216a8,8,0,0,0,0-16Z" />
                  </svg>
                </button>
              </div>
              <div className="col-xl-5 d-none d-xl-block">
                <nav className="box-navigation text-center">
                  <ul className="box-nav-ul justify-content-start">
                    <li className="menu-item">
                        <Link className="item-link" href="/tienda">
                        TIENDA<i className="icon icon-down" />
                      </Link>
                      <div className="sub-menu mega-menu mega-menu-1">
                        <div className="container">
                          <div className="row-demo-1">
                            <div className="mega-menu-list">
                              <div className="mega-menu-item">
                                <div className="list-categories-inner">
                                  <div className="menu-heading text-title">Líneas</div>
                                  <ul>
                                    {categories.map((item) => (
                                      <li key={item.id}>
                                        <Link className="categories-item text_secondary" href={`/tienda?categoria=${item.id}`}>
                                          <span className="inner-left">
                                            {item.name} ({products.filter((product) => product.category === item.id).length})
                                          </span>
                                        </Link>
                                      </li>
                                    ))}
                                  </ul>
                                  <div className="box-cate-bottom">
                                    <Link className="btn-line" href="/tienda">
                                      <span>Ver todos los productos </span>
                                      <i className="icon-arrow-up-right" />
                                    </Link>
                                  </div>
                                </div>
                              </div>
                              <div className="mega-menu-item">
                                <div className="menu-heading text-title">La empresa</div>
                                <ul className="menu-list">
                                  <li><Link className="menu-link-text text_secondary link" href="/nosotros">Nosotros</Link></li>
                                  <li><Link className="menu-link-text text_secondary link" href="/blog">Blog</Link></li>
                                  <li><Link className="menu-link-text text_secondary link" href="/cotizar">Cotizar</Link></li>
                                  <li><Link className="menu-link-text text_secondary link" href="/contacto">Contacto</Link></li>
                                  <li><Link className="menu-link-text text_secondary link" href="/favoritos">Lista de deseos</Link></li>
                                  <li><Link className="menu-link-text text_secondary link" href="/carrito">Carrito</Link></li>
                                  <li><Link className="menu-link-text text_secondary link" href="/cuenta">Mi cuenta</Link></li>
                                </ul>
                              </div>
                              <div className="mega-menu-item">
                                <div className="collection-position style-2">
                                  <div className="img-style">
                                    <img className="opacity-100" src={categories[2].image} alt="" />
                                  </div>
                                  <div className="content cls-content">
                                    <div className="cls-heading">
                                      <h4 className="text_white">Estaciones</h4>
                                      <p className="text_white">A la medida del equipo</p>
                                    </div>
                                    <Link className="tf-btn btn-white" href="/tienda?categoria=estaciones">
                                      Ver colección <i className="icon-arrow-up-right" />
                                    </Link>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>
                    {links.map((link) => (
                      <li className="menu-item" key={link.href}>
                        <Link className="item-link" href={link.href}>
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </nav>
              </div>
              <div className="col-xl-2 col-8 d-flex justify-content-center">
                <Link className="logo-header d-flex" href="/">
                  <img src={company.logo} alt="Symart" className="logo logo-symart" />
                </Link>
              </div>
              <div className="col-xl-5 col-2">
                <ul className="nav-icon">
                  <li className="nav-search">
                    <button type="button" className="nav-icon-item" aria-label="Buscar" onClick={() => setSearchOpen(true)}>
                      <span className="icon icon-search" />
                    </button>
                  </li>
                  <li className="nav-account d-none d-sm-block">
                    <Link className="nav-icon-item" href="/cuenta" aria-label="Cuenta">
                      <span className="icon icon-user" />
                    </Link>
                  </li>
                  <li className="nav-wishlist">
                    <Link className="nav-icon-item" href="/favoritos" aria-label="Lista de deseos">
                      <span className="icon icon-heart" />
                      {wishlist.length > 0 && <span className="count-box text-button-small">{wishlist.length}</span>}
                    </Link>
                  </li>
                  <li className="nav-cart">
                    <button type="button" className="nav-icon-item" aria-label="Carrito" onClick={() => setCartOpen(true)}>
                      <span className="icon icon-cart" />
                      <span className="count-box text-button-small">{count}</span>
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </header>

      {menuOpen && (
        <div className="offcanvas offcanvas-start canvas-mb show" id="mobileMenu">
          <button type="button" className="icon-close icon-close-popup" aria-label="Cerrar" onClick={() => setMenuOpen(false)} />
          <div className="mb-canvas-content">
            <div className="mb-body">
              <ul className="nav-ul-mb">
                <li className="nav-mb-item">
                  <button
                    type="button"
                    className="mb-menu-link"
                    onClick={() => { setMenuOpen(false); setSearchOpen(true); }}
                  >
                    Buscar
                  </button>
                </li>
                <li className="nav-mb-item">
                  <Link className="mb-menu-link" href="/tienda" onClick={() => setMenuOpen(false)}>Tienda</Link>
                </li>
                {categories.map((item) => (
                  <li className="nav-mb-item" key={item.id}>
                    <Link className="mb-menu-link" href={`/tienda?categoria=${item.id}`} onClick={() => setMenuOpen(false)}>
                      {item.name}
                    </Link>
                  </li>
                ))}
                {links.map((link) => (
                  <li className="nav-mb-item" key={link.href}>
                    <Link className="mb-menu-link" href={link.href} onClick={() => setMenuOpen(false)}>
                      {link.label}
                    </Link>
                  </li>
                ))}
                <li className="nav-mb-item">
                  <Link className="mb-menu-link" href="/favoritos" onClick={() => setMenuOpen(false)}>Lista de deseos</Link>
                </li>
                <li className="nav-mb-item">
                  <Link className="mb-menu-link" href="/cuenta" onClick={() => setMenuOpen(false)}>Mi cuenta</Link>
                </li>
              </ul>
              <div className="mb-other-content">
                <div className="mb-notice">
                  <Link className="text-need" href="/contacto" onClick={() => setMenuOpen(false)}>¿Necesitas ayuda?</Link>
                </div>
                <ul className="mb-info">
                  <li>Ciudad: {company.city}</li>
                  <li>Correo: <b>{company.email}</b></li>
                  <li>Teléfono: <b>{company.phone}</b></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
