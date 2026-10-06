"use client";

import {
  createContext,
  useContext,
  useMemo,
  useState,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import { COUPON, products } from "./data";
import type { CartLine } from "./types";

type Persisted = {
  cart: CartLine[];
  wishlist: string[];
  viewed: string[];
  note: string;
  coupon: string;
  shippingCity: string;
};

type Ui = {
  cartOpen: boolean;
  searchOpen: boolean;
  quickSlug: string | null;
};

const defaults: Persisted = {
  cart: [],
  wishlist: [],
  viewed: [],
  note: "",
  coupon: "",
  shippingCity: "Aguascalientes",
};

const KEY = "symart-demo";
let snapshot: Persisted = defaults;
const listeners = new Set<() => void>();
let loaded = false;

function load(): Persisted {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return defaults;
    const parsed = JSON.parse(raw) as Partial<Persisted>;
    return {
      cart: parsed.cart ?? [],
      wishlist: parsed.wishlist ?? [],
      viewed: parsed.viewed ?? [],
      note: parsed.note ?? "",
      coupon: parsed.coupon ?? "",
      shippingCity: parsed.shippingCity ?? "Aguascalientes",
    };
  } catch {
    return defaults;
  }
}

function commit(next: Persisted) {
  snapshot = next;
  localStorage.setItem(KEY, JSON.stringify(next));
  listeners.forEach((listener) => listener());
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function getClientSnapshot() {
  if (!loaded) {
    snapshot = load();
    loaded = true;
  }
  return snapshot;
}

type Store = Persisted &
  Ui & {
    addToCart: (slug: string, finishId: string, qty?: number) => void;
    setQty: (slug: string, finishId: string, qty: number) => void;
    removeFromCart: (slug: string, finishId: string) => void;
    toggleWish: (slug: string) => void;
    wished: (slug: string) => boolean;
    view: (slug: string) => void;
    setNote: (note: string) => void;
    setCoupon: (coupon: string) => void;
    setShippingCity: (city: string) => void;
    clearCart: () => void;
    setCartOpen: (open: boolean) => void;
    setSearchOpen: (open: boolean) => void;
    setQuickSlug: (slug: string | null) => void;
    count: number;
  };

const StoreContext = createContext<Store | null>(null);

export function StoreProvider({ children }: { children: ReactNode }) {
  const data = useSyncExternalStore(subscribe, getClientSnapshot, () => defaults);
  const [ui, setUi] = useState<Ui>({
    cartOpen: false,
    searchOpen: false,
    quickSlug: null,
  });

  const api = useMemo<Store>(() => {
    const count = data.cart.reduce((sum, line) => sum + line.qty, 0);
    return {
      ...data,
      ...ui,
      count,
      addToCart: (slug, finishId, qty = 1) => {
        const cart = [...data.cart];
        const index = cart.findIndex((line) => line.slug === slug && line.finishId === finishId);
        if (index >= 0) cart[index] = { ...cart[index], qty: cart[index].qty + qty };
        else cart.push({ slug, finishId, qty });
        commit({ ...data, cart });
        setUi((current) => ({ ...current, cartOpen: true }));
      },
      setQty: (slug, finishId, qty) => {
        commit({
          ...data,
          cart: data.cart
            .map((line) =>
              line.slug === slug && line.finishId === finishId ? { ...line, qty } : line,
            )
            .filter((line) => line.qty > 0),
        });
      },
      removeFromCart: (slug, finishId) => {
        commit({
          ...data,
          cart: data.cart.filter((line) => !(line.slug === slug && line.finishId === finishId)),
        });
      },
      toggleWish: (slug) => {
        commit({
          ...data,
          wishlist: data.wishlist.includes(slug)
            ? data.wishlist.filter((item) => item !== slug)
            : [...data.wishlist, slug],
        });
      },
      wished: (slug) => data.wishlist.includes(slug),
      view: (slug) => {
        if (data.viewed[0] === slug) return;
        commit({
          ...data,
          viewed: [slug, ...data.viewed.filter((item) => item !== slug)].slice(0, 8),
        });
      },
      setNote: (note) => commit({ ...data, note }),
      setCoupon: (coupon) => commit({ ...data, coupon }),
      setShippingCity: (shippingCity) => commit({ ...data, shippingCity }),
      clearCart: () => commit({ ...data, cart: [], coupon: "", note: "" }),
      setCartOpen: (cartOpen) => setUi((current) => ({ ...current, cartOpen })),
      setSearchOpen: (searchOpen) => setUi((current) => ({ ...current, searchOpen })),
      setQuickSlug: (quickSlug) => setUi((current) => ({ ...current, quickSlug })),
    };
  }, [data, ui]);

  return <StoreContext.Provider value={api}>{children}</StoreContext.Provider>;
}

export function useStore() {
  const store = useContext(StoreContext);
  if (!store) throw new Error("useStore debe usarse dentro de StoreProvider");
  return store;
}

export function lineProduct(line: CartLine) {
  const product = products.find((item) => item.slug === line.slug);
  const finish =
    product?.finishes.find((item) => item.id === line.finishId) ?? product?.finishes[0];
  return { product, finish };
}

export function couponRate(code: string) {
  return code.trim().toUpperCase() === COUPON.code ? COUPON.rate : 0;
}
