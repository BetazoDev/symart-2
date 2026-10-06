"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  PRICE_MAX,
  PRICE_MIN,
  categories,
  categoryName,
  materials,
  products,
} from "@/lib/data";
import { money } from "@/lib/format";
import type { CategoryId } from "@/lib/types";
import { ProductCard } from "./ProductCard";

type Sort = "best" | "az" | "za" | "low" | "high";
type Layout = "list" | "2" | "3" | "4";

const PER_PAGE = 9;

const sorts: { id: Sort; label: string }[] = [
  { id: "best", label: "Más vendidos" },
  { id: "az", label: "Alfabético, A-Z" },
  { id: "za", label: "Alfabético, Z-A" },
  { id: "low", label: "Precio, menor a mayor" },
  { id: "high", label: "Precio, mayor a menor" },
];

const banner = "https://symart.com.mx/wp-content/uploads/2025/10/fabrica-de-muebles-de-oficina-1.webp";

export function ShopView() {
  const params = useSearchParams();
  const initial = params.get("categoria");
  const [categoriesOn, setCategoriesOn] = useState<string[]>(
    initial && categories.some((item) => item.id === initial) ? [initial] : [],
  );
  const [materialsOn, setMaterialsOn] = useState<string[]>([]);
  const [finishesOn, setFinishesOn] = useState<string[]>([]);
  const [min, setMin] = useState(PRICE_MIN);
  const [max, setMax] = useState(PRICE_MAX);
  const [availability, setAvailability] = useState<"all" | "stock" | "out">("all");
  const [saleOnly, setSaleOnly] = useState(false);
  const [sort, setSort] = useState<Sort>("best");
  const [layout, setLayout] = useState<Layout>("4");
  const [page, setPage] = useState(1);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [sortOpen, setSortOpen] = useState(false);

  const finishOptions = useMemo(() => {
    const map = new Map<string, { id: string; name: string; hex: string }>();
    products.forEach((product) =>
      product.finishes.forEach((finish) => {
        if (!map.has(finish.id)) map.set(finish.id, finish);
      }),
    );
    return [...map.values()];
  }, []);

  const filtered = useMemo(() => {
    const list = products.filter((product) => {
      if (categoriesOn.length && !categoriesOn.includes(product.category)) return false;
      if (materialsOn.length && !product.materials.some((item) => materialsOn.includes(item))) return false;
      if (finishesOn.length && !product.finishes.some((item) => finishesOn.includes(item.id))) return false;
      if (product.price < min || product.price > max) return false;
      if (availability === "stock" && !product.inStock) return false;
      if (availability === "out" && product.inStock) return false;
      if (saleOnly && !product.sale) return false;
      return true;
    });
    return [...list].sort((a, b) => {
      if (sort === "az") return a.name.localeCompare(b.name, "es");
      if (sort === "za") return b.name.localeCompare(a.name, "es");
      if (sort === "low") return a.price - b.price;
      if (sort === "high") return b.price - a.price;
      return Number(b.bestseller) - Number(a.bestseller) || b.reviews - a.reviews;
    });
  }, [availability, categoriesOn, finishesOn, materialsOn, max, min, saleOnly, sort]);

  const pages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const current = Math.min(page, pages);
  const visible = filtered.slice((current - 1) * PER_PAGE, current * PER_PAGE);

  function toggle(list: string[], value: string, set: (next: string[]) => void) {
    set(list.includes(value) ? list.filter((item) => item !== value) : [...list, value]);
    setPage(1);
  }

  function clear() {
    setCategoriesOn([]);
    setMaterialsOn([]);
    setFinishesOn([]);
    setMin(PRICE_MIN);
    setMax(PRICE_MAX);
    setAvailability("all");
    setSaleOnly(false);
    setPage(1);
  }

  const chips: { label: string; clear: () => void }[] = [
    ...categoriesOn.map((id) => ({
      label: categoryName(id as CategoryId),
      clear: () => toggle(categoriesOn, id, setCategoriesOn),
    })),
    ...materialsOn.map((id) => ({
      label: id,
      clear: () => toggle(materialsOn, id, setMaterialsOn),
    })),
    ...finishesOn.map((id) => ({
      label: finishOptions.find((item) => item.id === id)?.name ?? id,
      clear: () => toggle(finishesOn, id, setFinishesOn),
    })),
  ];
  if (saleOnly) chips.push({ label: "Solo ofertas", clear: () => setSaleOnly(false) });
  if (availability !== "all") {
    chips.push({
      label: availability === "stock" ? "Disponible" : "Agotado",
      clear: () => setAvailability("all"),
    });
  }

  const gridClass =
    layout === "list"
      ? "tf-list-layout"
      : layout === "2"
        ? "tf-grid-layout tf-col-2"
        : layout === "3"
          ? "tf-grid-layout tf-col-2 lg-col-3"
          : "tf-grid-layout tf-col-2 lg-col-3 xl-col-4";

  const sidebar = (
    <div className="canvas-body">
      <div className="widget-facet facet-categories">
        <h6 className="facet-title">Categorías</h6>
        <ul className="facet-content">
          {categories.map((item) => {
            const count = products.filter((product) => product.category === item.id).length;
            const active = categoriesOn.includes(item.id);
            return (
              <li key={item.id}>
                <button type="button" className={`link ${active ? "active" : ""}`} onClick={() => toggle(categoriesOn, item.id, setCategoriesOn)}>
                  {item.name} <span className="count-cate">({count})</span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>
      <div className="widget-facet facet-fieldset">
        <h6 className="facet-title">Material</h6>
        <div className="box-fieldset-item">
          {materials.map((item) => {
            const count = products.filter((product) => product.materials.includes(item)).length;
            return (
              <fieldset className="fieldset-item" key={item}>
                <input
                  type="checkbox"
                  className="tf-check"
                  id={`mat-${item}`}
                  checked={materialsOn.includes(item)}
                  onChange={() => toggle(materialsOn, item, setMaterialsOn)}
                />
                <label htmlFor={`mat-${item}`}>{item} <span className="count-brand">({count})</span></label>
              </fieldset>
            );
          })}
        </div>
      </div>
      <div className="widget-facet facet-price">
        <h6 className="facet-title">Precio</h6>
        <input type="range" min={PRICE_MIN} max={PRICE_MAX} value={min} onChange={(event) => { setMin(Math.min(Number(event.target.value), max - 500)); setPage(1); }} />
        <input type="range" min={PRICE_MIN} max={PRICE_MAX} value={max} onChange={(event) => { setMax(Math.max(Number(event.target.value), min + 500)); setPage(1); }} />
        <div className="box-price-product">
          <div className="box-price-item">
            <span className="title-price">Mínimo</span>
            <div className="price-val">{money(min)}</div>
          </div>
          <div className="box-price-item">
            <span className="title-price">Máximo</span>
            <div className="price-val">{money(max)}</div>
          </div>
        </div>
      </div>
      <div className="widget-facet facet-color">
        <h6 className="facet-title">Acabado</h6>
        <div className="facet-color-box">
          {finishOptions.map((item) => (
            <button
              key={item.id}
              type="button"
              className={`color-item color-check ${finishesOn.includes(item.id) ? "active" : ""}`}
              onClick={() => toggle(finishesOn, item.id, setFinishesOn)}
            >
              <span className="color" style={{ background: item.hex }} />
              {item.name}
            </button>
          ))}
        </div>
      </div>
      <div className="widget-facet facet-fieldset">
        <h6 className="facet-title">Disponibilidad</h6>
        <div className="box-fieldset-item">
          <fieldset className="fieldset-item">
            <input type="radio" className="tf-check" name="availability" id="inStock" checked={availability === "stock"} onChange={() => { setAvailability("stock"); setPage(1); }} />
            <label htmlFor="inStock">Disponible <span className="count-stock">({products.filter((item) => item.inStock).length})</span></label>
          </fieldset>
          <fieldset className="fieldset-item">
            <input type="radio" className="tf-check" name="availability" id="outStock" checked={availability === "out"} onChange={() => { setAvailability("out"); setPage(1); }} />
            <label htmlFor="outStock">Agotado <span className="count-stock">({products.filter((item) => !item.inStock).length})</span></label>
          </fieldset>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <div className="page-title relative">
        <div className="paralaximg" style={{ backgroundImage: `url(${banner})` }} />
        <div className="content">
          <div className="container">
            <div className="row">
              <div className="col-12">
                <h3 className="title">Tienda</h3>
                <ul className="breadcrumb">
                  <li><Link href="/">Inicio</Link></li>
                  <li>Tienda</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <section className="flat-spacing">
        <div className="container">
          <div className="tf-shop-control">
            <div className="tf-control-filter">
              <button type="button" className="filterShop tf-btn-filter" onClick={() => setFiltersOpen(true)}>
                <span className="icon icon-filter" />
                <span className="text">Filtros</span>
              </button>
              <button type="button" className={`d-none d-lg-flex shop-sale-text ${saleOnly ? "active" : ""}`} onClick={() => { setSaleOnly((value) => !value); setPage(1); }}>
                <i className="icon icon-checkcircle" />
                <p className="text-caption-1">Solo piezas en oferta</p>
              </button>
            </div>
            <ul className="tf-control-layout">
              <LayoutButton active={layout === "list"} label="Lista" onClick={() => setLayout("list")} icon="list" />
              <LayoutButton active={layout === "2"} label="2 columnas" onClick={() => setLayout("2")} icon="2" />
              <LayoutButton active={layout === "3"} label="3 columnas" onClick={() => setLayout("3")} icon="3" />
              <LayoutButton active={layout === "4"} label="4 columnas" onClick={() => setLayout("4")} icon="4" />
            </ul>
            <div className="tf-control-sorting">
              <p className="d-none d-lg-block text-caption-1">Ordenar:</p>
              <div className={`tf-dropdown-sort ${sortOpen ? "show" : ""}`}>
                <button type="button" className="btn-select" onClick={() => setSortOpen((value) => !value)}>
                  <span className="text-sort-value">{sorts.find((item) => item.id === sort)?.label}</span>
                  <span className="icon icon-down" />
                </button>
                {sortOpen && (
                  <div className="dropdown-menu show">
                    {sorts.map((item) => (
                      <button
                        key={item.id}
                        type="button"
                        className={`select-item ${sort === item.id ? "active" : ""}`}
                        onClick={() => { setSort(item.id); setSortOpen(false); }}
                      >
                        <span className="text-value-item">{item.label}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="wrapper-control-shop">
            <div className="meta-filter-shop">
              <div className="count-text"><span className="count">{filtered.length}</span> productos</div>
              <div id="applied-filters">
                {chips.map((chip) => (
                  <button key={chip.label} type="button" className="filter-tag" onClick={chip.clear}>
                    {chip.label} <i className="icon icon-close remove-tag" />
                  </button>
                ))}
              </div>
              {chips.length > 0 && (
                <button type="button" className="remove-all-filters text-btn-uppercase" onClick={clear}>
                  QUITAR TODO <i className="icon icon-close" />
                </button>
              )}
            </div>
            <div className="row">
              <div className="col-xl-3">
                <div className={`sidebar-filter canvas-filter left ${filtersOpen ? "show" : ""}`}>
                  <div className="canvas-wrapper">
                    <div className="canvas-header d-flex d-xl-none">
                      <h5><span className="icon icon-filter" /> Filtros</h5>
                      <button type="button" className="icon-close close-filter" aria-label="Cerrar" onClick={() => setFiltersOpen(false)} />
                    </div>
                    {sidebar}
                    <div className="canvas-bottom d-block d-xl-none">
                      <button type="button" className="tf-btn btn-border btn-reset" onClick={() => { clear(); setFiltersOpen(false); }}>
                        Limpiar filtros
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xl-9">
                {visible.length === 0 ? (
                  <p className="text-center text_secondary">Ningún producto coincide con estos filtros.</p>
                ) : (
                  <div className={gridClass}>
                    {visible.map((product) => (
                      <ProductCard key={product.slug} product={product} layout={layout === "list" ? "list" : "grid"} variant="1" />
                    ))}
                  </div>
                )}
                {pages > 1 && (
                  <ul className="wg-pagination">
                    {Array.from({ length: pages }).map((_, index) => (
                      <li key={index} className={current === index + 1 ? "active" : ""}>
                        <button
                          type="button"
                          className="pagination-item"
                          onClick={() => { setPage(index + 1); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                        >
                          {index + 1}
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function LayoutButton({
  active,
  label,
  onClick,
  icon,
}: {
  active: boolean;
  label: string;
  onClick: () => void;
  icon: "list" | "2" | "3" | "4";
}) {
  return (
    <li className={`tf-view-layout-switch sw-layout-${icon === "list" ? "list list-layout" : icon} ${active ? "active" : ""}`}>
      <button type="button" className="item" aria-label={label} onClick={onClick}>
        {icon === "list" && (
          <svg className="icon" width="20" height="20" viewBox="0 0 20 20" fill="none">
            <circle cx="3" cy="6" r="2.5" stroke="#181818" />
            <rect x="7.5" y="3.5" width="12" height="5" rx="2.5" stroke="#181818" />
            <circle cx="3" cy="14" r="2.5" stroke="#181818" />
            <rect x="7.5" y="11.5" width="12" height="5" rx="2.5" stroke="#181818" />
          </svg>
        )}
        {icon === "2" && (
          <svg className="icon" width="20" height="20" viewBox="0 0 20 20" fill="none">
            <circle cx="6" cy="6" r="2.5" stroke="#181818" />
            <circle cx="14" cy="6" r="2.5" stroke="#181818" />
            <circle cx="6" cy="14" r="2.5" stroke="#181818" />
            <circle cx="14" cy="14" r="2.5" stroke="#181818" />
          </svg>
        )}
        {icon === "3" && (
          <svg className="icon" width="22" height="20" viewBox="0 0 22 20" fill="none">
            <circle cx="3" cy="6" r="2.5" stroke="#181818" />
            <circle cx="11" cy="6" r="2.5" stroke="#181818" />
            <circle cx="19" cy="6" r="2.5" stroke="#181818" />
            <circle cx="3" cy="14" r="2.5" stroke="#181818" />
            <circle cx="11" cy="14" r="2.5" stroke="#181818" />
            <circle cx="19" cy="14" r="2.5" stroke="#181818" />
          </svg>
        )}
        {icon === "4" && (
          <svg className="icon" width="30" height="20" viewBox="0 0 30 20" fill="none">
            <circle cx="3" cy="6" r="2.5" stroke="#181818" />
            <circle cx="11" cy="6" r="2.5" stroke="#181818" />
            <circle cx="19" cy="6" r="2.5" stroke="#181818" />
            <circle cx="27" cy="6" r="2.5" stroke="#181818" />
            <circle cx="3" cy="14" r="2.5" stroke="#181818" />
            <circle cx="11" cy="14" r="2.5" stroke="#181818" />
            <circle cx="19" cy="14" r="2.5" stroke="#181818" />
            <circle cx="27" cy="14" r="2.5" stroke="#181818" />
          </svg>
        )}
      </button>
    </li>
  );
}
