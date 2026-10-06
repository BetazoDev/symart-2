"use client";

import Link from "next/link";
import { useState } from "react";
import { ProductCard } from "@/components/ProductCard";
import {
  categories,
  company,
  instagramShots,
  posts,
  products,
  reasons,
  spaces,
  heroSlides,
} from "@/lib/data";
import { money } from "@/lib/format";
import { useStore } from "@/lib/store";

export function HomePage() {
  const [slide, setSlide] = useState(0);
  const [quote, setQuote] = useState(0);
  const current = heroSlides[slide];
  const picks = products.filter((item) => item.featured).slice(0, 8);
  const sellers = products.filter((item) => item.bestseller).slice(0, 3);
  const look = products.find((item) => item.featured) ?? products[0];
  const pin = products.find((item) => item.slug !== look.slug && item.featured) ?? products[1];
  const reason = reasons[quote];
  const { setQuickSlug } = useStore();

  return (
    <div id="wrapper">
      <div className="tf-slideshow style-3 slider-effect-fade">
        <div className="swiper">
          <div className="wrap-slider">
            <div className="img-style">
              <img src={current.image} alt="" />
            </div>
            <div className="box-content">
              <div className="box-title">
                <div className="text-white text-display">{current.title}</div>
                <p className="text-body-1 text_white">{current.text}</p>
              </div>
              <div>
                <Link className="tf-btn btn-white mx-auto" href={current.href}>
                  {current.cta} <i className="icon-arrow-up-right" />
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="wrap-pagination">
          <div className="container">
            <div className="sw-dots sw-pagination-slider type-circle white-circle-line justify-content-center">
              {heroSlides.map((item, index) => (
                <button
                  key={item.title}
                  type="button"
                  aria-label={`Diapositiva ${index + 1}`}
                  className={`swiper-pagination-bullet ${slide === index ? "swiper-pagination-bullet-active" : ""}`}
                  onClick={() => setSlide(index)}
                />
              ))}
            </div>
          </div>
        </div>
        <button type="button" className="sw-button swiper-button-next navigation-next-slider" aria-label="Siguiente" onClick={() => setSlide((value) => (value + 1) % heroSlides.length)} />
        <button type="button" className="sw-button swiper-button-prev navigation-prev-slider" aria-label="Anterior" onClick={() => setSlide((value) => (value + heroSlides.length - 1) % heroSlides.length)} />
      </div>

      <section className="flat-spacing-2">
        <div className="container">
          <div className="col-12">
            <div className="heading-section style-2">
              <div className="left">
                <h3>Comprar por línea</h3>
                <p className="text-body-default text_secondary">Escritorios, sillas y estaciones para empresas, escuelas y consultorios.</p>
              </div>
              <Link className="btn-line" href="/tienda">
                <span>Ver todos</span>
                <i className="icon-arrow-up-right" />
              </Link>
            </div>
            <div className="wrap-categories style-2">
              {categories.map((item) => (
                <div className="categories-item hover-img style-2" key={item.id}>
                  <div className="img-style">
                    <Link href={`/tienda?categoria=${item.id}`}>
                      <img src={item.image} alt={item.name} />
                    </Link>
                  </div>
                  <div className="content">
                    <h5 className="title">
                      <Link className="link" href={`/tienda?categoria=${item.id}`}>{item.name}</Link>
                    </h5>
                    <p className="text-body-default text_secondary">
                      {products.filter((product) => product.category === item.id).length} productos
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="flat-spacing-2 pt-0">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="heading-section text-center">
                <h3>Nuestra selección</h3>
                <p className="text-body-default text_secondary">Los modelos que más piden empresas e instituciones.</p>
              </div>
              <div className="tf-grid-layout tf-col-2 lg-col-4">
                {picks.map((item) => (
                  <ProductCard key={item.slug} product={item} variant="3" />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-lookbook">
        <div className="left-img">
          <div className="cls-lookbook">
            <div className="img-style">
              <img src={spaces[1].image} alt={spaces[1].title} />
            </div>
            <div className="lookbook-item position1">
              <div className="dropup-center dropup">
                <div className="tf-pin-btn style-2"><span /></div>
                <div className="loobook-product-wrap">
                  <div className="loobook-product">
                    <div className="img-style">
                      <img src={pin.images[0]} alt="" />
                    </div>
                    <div className="content">
                      <div className="info">
                        <Link className="text-title text-line-clamp-1 link" href={`/producto/${pin.slug}`}>{pin.name}</Link>
                        <div className="price text-button">{money(pin.price)}</div>
                      </div>
                      <button type="button" className="btn-lookbook btn-line" onClick={() => setQuickSlug(pin.slug)}>
                        Vista rápida
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="right-product">
          <div className="heading-section">
            <h3>Empieza por estos espacios</h3>
            <p className="text-body-default text_secondary">
              Proyectos para UAA, Universidad Panamericana, World Emblem, Orotex y MMPM.
            </p>
          </div>
          <ProductCard product={look} variant="1" />
        </div>
      </section>

      <section className="flat-spacing-2 section-tTop-sellers">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="heading-section text-center">
                <h3>Los más pedidos</h3>
                <p className="text-body-default text_secondary">Piezas de catálogo con fabricación en Aguascalientes.</p>
              </div>
              <div className="tf-grid-layout tf-col-2 lg-col-3">
                {sellers.map((item) => (
                  <ProductCard key={item.slug} product={item} variant="1" />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="flat-spacing-2 pt-0">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-6">
              <div className="swiper tf-sw-testimonial sw-button-bottom-right">
                <div className="testimonial-item hover-img style-3">
                  <div className="content">
                    <div className="content-top">
                      <div className="box-icon">
                        <div className="icon"><i className="icon-quote-1" /></div>
                        <p className="text-title">Así trabajamos</p>
                      </div>
                      <h4 className="text-onsurface">“{reason.text}”</h4>
                      <div className="box-author d-flex gap-6">
                        <div className="list-star-default color-primary">
                          {Array.from({ length: 5 }).map((_, index) => (
                            <i className="icon icon-star" key={index} />
                          ))}
                        </div>
                        <h6 className="author">
                          <span className="link">{reason.title}<span className="text-title text_secondary2"> / Symart</span></span>
                        </h6>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="wrap-button">
                  <button type="button" className="sw-button swiper-button-prev nav-prev-testimonial has-border" aria-label="Anterior" onClick={() => setQuote((value) => (value + reasons.length - 1) % reasons.length)} />
                  <button type="button" className="sw-button swiper-button-next nav-next-testimonial has-border" aria-label="Siguiente" onClick={() => setQuote((value) => (value + 1) % reasons.length)} />
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="collection-position style-3">
                <div className="img-style">
                  <img src={spaces[2].image} alt={spaces[2].title} />
                </div>
                <div className="content cls-content">
                  <div className="cart-item style-2">
                    <div className="image-cart">
                      <img src={look.images[0]} alt="" />
                    </div>
                    <div className="info">
                      <div className="name text-body-default">
                        <Link className="link text-title" href={`/producto/${look.slug}`}>{look.name}</Link>
                      </div>
                      <div className="price text-button">{money(look.price)}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="banner-cotizar">
        <div className="container-2">
          <div className="row">
            <div className="col-12">
              <div className="collection-position style-full style-6">
                <div className="img-style">
                  <img src={spaces[0].image} alt={spaces[0].title} />
                </div>
                <div className="content cls-content">
                  <div className="cls-heading">
                    <h3><span className="text_white">Garantía de {company.warranty}</span></h3>
                    <p className="text_white text-body-default">Fabricación e instalación en {company.city}. El color del catálogo no cambia el precio.</p>
                  </div>
                  <Link className="tf-btn btn-white mx-auto" href="/cotizar">
                    Cotizar un proyecto <i className="icon-arrow-up-right" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="flat-spacing-2 section-news-insight">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="heading-section">
                <h3>Del taller</h3>
                <p className="text-body-default text_secondary">Guías de mobiliario para uso intensivo.</p>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-6 col-xl-7">
              <div className="collection-position style-2 spacing-2 has-over">
                <Link className="img-style no-opacity w-100" href={`/blog/${posts[0].slug}`}>
                  <img src={posts[0].image} alt="" />
                </Link>
                <div className="content cls-content">
                  <div className="cls-heading">
                    <ul className="meta mb-0">
                      <li className="text-button-small"><span className="link text-white">{posts[0].date}</span></li>
                      <li className="text-button-small text-white">por Symart</li>
                    </ul>
                    <div>
                      <h4 className="mb_8">
                        <Link className="link text_white" href={`/blog/${posts[0].slug}`}>{posts[0].title}</Link>
                      </h4>
                      <p className="text_white">{posts[0].excerpt}</p>
                    </div>
                  </div>
                  <Link className="link text-white text-button" href={`/blog/${posts[0].slug}`}>Leer más</Link>
                </div>
              </div>
            </div>
            <div className="col-lg-6 col-xl-5">
              <div className="relatest-post">
                {posts.slice(1).map((post) => (
                  <div className="relatest-post-item style-2 style-row hover-image" key={post.slug}>
                    <div className="image">
                      <Link href={`/blog/${post.slug}`}>
                        <img src={post.image} alt="" />
                      </Link>
                      <div className="article-label">
                        <span className="text-button-small">{post.category}</span>
                      </div>
                    </div>
                    <div className="content">
                      <ul className="meta">
                        <li className="text-button-small"><span className="link">{post.date}</span></li>
                        <li className="text-button-small">por Symart</li>
                      </ul>
                      <h5 className="title mb-0">
                        <Link className="link" href={`/blog/${post.slug}`}>{post.title}</Link>
                      </h5>
                      <p>{post.excerpt}</p>
                      <Link className="text-button link text-decoration" href={`/blog/${post.slug}`}>Leer más</Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="flat-spacing-2 pt-0">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="heading-section text-center">
                <h3>Instagram</h3>
                <p className="text-body-default text_secondary">{company.instagramHandle}</p>
              </div>
              <div className="symart-gallery">
                {instagramShots.slice(0, 5).map((src) => (
                  <div className="gallery-item hover-overlay hover-img" key={src}>
                    <div className="img-style">
                      <img className="img-hover" src={src} alt="" />
                    </div>
                    <a className="box-icon hover-tooltip" href={company.instagram} target="_blank" rel="noreferrer">
                      <span className="icon icon-eye" />
                      <span className="tooltip">Ver en Instagram</span>
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="flat-spacing-2 pt-0">
        <div className="container">
          <div className="symart-iconrow">
            <div className="tf-box-icon">
              <div className="icon"><i className="icon-package" /></div>
              <div className="content">
                <h5 className="title">Instalación en Aguascalientes</h5>
                <p>Proyectos listos entre {company.leadTime}.</p>
              </div>
            </div>
            <div className="tf-box-icon">
              <div className="icon"><i className="icon-lifebuoy" /></div>
              <div className="content">
                <h5 className="title">Garantía de {company.warranty}</h5>
                <p>Contra defectos de fabricación.</p>
              </div>
            </div>
            <div className="tf-box-icon">
              <div className="icon"><i className="icon-headset" /></div>
              <div className="content">
                <h5 className="title">Cotización con visita</h5>
                <p>Se puede cotizar aunque aún no haya planos.</p>
              </div>
            </div>
            <div className="tf-box-icon">
              <div className="icon"><i className="icon-sealpercent" /></div>
              <div className="content">
                <h5 className="title">El color no cambia el precio</h5>
                <p>El acabado del catálogo se elige sin ajuste.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
