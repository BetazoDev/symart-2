"use client";

import Link from "next/link";
import { useState } from "react";
import { company } from "@/lib/data";

export function Footer() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  return (
    <footer id="footer" className="footer">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="footer-body">
              <div className="footer-left">
                <div className="footer-infor flex-grow-1">
                  <div className="footer-menu">
                    <div className="footer-col-block">
                      <h5 className="footer-heading text_white footer-heading-mobile">Información</h5>
                      <div className="tf-collapse-content">
                        <ul className="footer-menu-list">
                          <li className="text-body-default"><Link className="link footer-menu_item" href="/nosotros">Nosotros</Link></li>
                          <li className="text-body-default"><Link className="link footer-menu_item" href="/blog">Blog</Link></li>
                          <li className="text-body-default"><Link className="link footer-menu_item" href="/tienda">Tienda</Link></li>
                          <li className="text-body-default"><Link className="link footer-menu_item" href="/contacto">Contacto</Link></li>
                        </ul>
                      </div>
                    </div>
                    <div className="footer-col-block">
                      <h5 className="footer-heading text_white footer-heading-mobile">Servicio</h5>
                      <div className="tf-collapse-content">
                        <ul className="footer-menu-list">
                          <li className="text-body-default"><Link className="link footer-menu_item" href="/cotizar">Cotizar</Link></li>
                          <li className="text-body-default"><Link className="link footer-menu_item" href="/carrito">Carrito</Link></li>
                          <li className="text-body-default"><Link className="link footer-menu_item" href="/favoritos">Lista de deseos</Link></li>
                          <li className="text-body-default"><Link className="link footer-menu_item" href="/cuenta">Mi cuenta</Link></li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="footer-phone-number">
                    <h4 className="text_white number">
                      <a className="text_white" href={company.phoneHref}>{company.phone}</a>
                    </h4>
                    <h4 className="text_white mail">
                      <a className="text_white" href={`mailto:${company.email}`}>{company.email}</a>
                    </h4>
                  </div>
                </div>
              </div>
              <div className="footer-col-block footer-newsletter">
                <h3 className="footer-heading footer-heading-mobile text_white">Recibe novedades de la fábrica</h3>
                <div className="tf-collapse-content">
                  <form
                    className="form-newsletter subscribe-form"
                    onSubmit={(event) => {
                      event.preventDefault();
                      if (!email.trim()) return;
                      const current = JSON.parse(localStorage.getItem("symart-newsletter") ?? "[]") as string[];
                      localStorage.setItem("symart-newsletter", JSON.stringify([...current, email.trim()]));
                      setDone(true);
                      setEmail("");
                    }}
                  >
                    <div className="subscribe-content">
                      <fieldset className="email">
                        <input
                          type="email"
                          className="subscribe-email"
                          placeholder="Tu correo"
                          value={email}
                          onChange={(event) => setEmail(event.target.value)}
                          required
                        />
                      </fieldset>
                      <div className="button-submit">
                        <button className="subscribe-button text-body-default" type="submit">
                          Suscribirme<i className="icon-arrow-up-right" />
                        </button>
                      </div>
                    </div>
                    {done && <div className="subscribe-msg">Listo. Te avisamos desde la fábrica.</div>}
                  </form>
                  <ul className="tf-social-icon type-2">
                    <li>
                      <a className="social-instagram" href={company.instagram} target="_blank" rel="noreferrer" aria-label="Instagram">
                        <i className="icon icon-instagram" />
                      </a>
                    </li>
                    <li>
                      <a className="social-facebook" href={company.whatsapp} target="_blank" rel="noreferrer" aria-label="WhatsApp">
                        <i className="icon icon-phone" />
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="footer-bottom-wrap">
                <div className="left">
                  <p className="text-body-default text_white">© {new Date().getFullYear()} Symart. {company.city}.</p>
                </div>
                <div className="center">
                  <p className="text-body-default text_white">{company.years} años fabricando · Garantía de {company.warranty}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
