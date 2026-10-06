"use client";

import { FormEvent, useState, useSyncExternalStore } from "react";

function subscribe(onStoreChange: () => void) {
  window.addEventListener("symart-account", onStoreChange);
  return () => window.removeEventListener("symart-account", onStoreChange);
}

export default function Page() {
  const saved = useSyncExternalStore(
    subscribe,
    () => localStorage.getItem("symart-account") ?? "",
    () => "",
  );
  const [email, setEmail] = useState("");

  function submit(event: FormEvent) {
    event.preventDefault();
    localStorage.setItem("symart-account", email);
    window.dispatchEvent(new Event("symart-account"));
  }

  return (
    <div className="">
      <div className="bg-surface py-12 text-center">
        <h1 className="font-display text-4xl">Cuenta</h1>
        <p className="mt-2 text-sm text-muted">El acceso real se conectará al backend. Este demo solo recuerda el correo en el navegador.</p>
      </div>
      <form onSubmit={submit} className="mx-auto max-w-md space-y-4 px-4 py-12">
        {saved && <p className="text-sm">Sesión demo: {saved}</p>}
        <label className="block text-sm">
          Correo
          <input required type="email" value={email} onChange={(event) => setEmail(event.target.value)} className="mt-1 w-full border border-line px-3 py-3 outline-none" />
        </label>
        <label className="block text-sm">
          Contraseña
          <input required type="password" minLength={4} className="mt-1 w-full border border-line px-3 py-3 outline-none" />
        </label>
        <button className="w-full bg-ink py-3 text-xs font-semibold uppercase tracking-[0.16em] text-white hover:bg-brand">Entrar</button>
      </form>
    </div>
  );
}
