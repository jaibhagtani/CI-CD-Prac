"use client";

import React, { useMemo, useState } from "react";

type MenuItem = {
  id: number;
  name: string;
  desc: string;
  price: number;
  emoji: string;
};

const MENU: MenuItem[] = [
  { id: 1, name: "Latte", desc: "Creamy espresso with steamed milk", price: 3.5, emoji: "☕️" },
  { id: 2, name: "Cappuccino", desc: "Espresso, steamed milk, and foam", price: 3.8, emoji: "🫧" },
  { id: 3, name: "Americano", desc: "Espresso and hot water", price: 2.8, emoji: "🔥" },
  { id: 4, name: "Iced Coffee", desc: "Chilled brew with ice", price: 3.0, emoji: "🧊" },
  { id: 5, name: "Blueberry Muffin", desc: "Fresh baked muffin", price: 2.5, emoji: "🧁" },
  { id: 6, name: "Bagel", desc: "Toasted bagel with butter", price: 2.0, emoji: "🥯" },
];

export default function Home() {
  const [cart, setCart] = useState<Record<number, number>>({});

  function addToCart(id: number) {
    setCart((c) => ({ ...c, [id]: (c[id] || 0) + 1 }));
  }

  function decFromCart(id: number) {
    setCart((c) => {
      const next = { ...c };
      if (!next[id]) return next;
      next[id] = Math.max(0, next[id] - 1);
      if (next[id] === 0) delete next[id];
      return next;
    });
  }

  const items = useMemo(() => MENU.map((m) => ({ ...m, qty: cart[m.id] || 0 })), [cart]);

  const subtotal = useMemo(() => Object.entries(cart).reduce((sum, [id, qty]) => {
    const item = MENU.find((m) => m.id === Number(id));
    return sum + (item ? item.price * qty : 0);
  }, 0), [cart]);

  function checkout() {
    if (subtotal === 0) return alert("Your cart is empty.");
    alert(`Order placed — total $${subtotal.toFixed(2)} (demo)`);
    setCart({});
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white dark:from-slate-900 dark:to-black text-slate-900 dark:text-slate-100">
      <header className="mx-auto max-w-6xl px-6 py-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="rounded-full bg-amber-100 dark:bg-amber-900/20 p-2 text-2xl">☕️</div>
          <div>
            <div className="font-bold text-lg">Cafe QuickOrder</div>
            <div className="text-sm text-slate-600 dark:text-slate-400">Order ahead & pickup</div>
          </div>
        </div>
        <div className="hidden md:flex gap-4">
          <button className="rounded-full border px-4 py-2 text-sm">Menu</button>
          <button className="rounded-full bg-amber-600 px-4 py-2 text-sm text-white">Sign in</button>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 pb-16 grid gap-8 md:grid-cols-3">
        <section className="md:col-span-2">
          <h1 className="text-3xl font-extrabold">Order from our menu</h1>
          <p className="text-slate-600 dark:text-slate-400 mt-2">Select items to add them to your cart. Adjust quantities in the cart.</p>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {items.map((it) => (
              <div key={it.id} className="flex items-center justify-between rounded-lg border bg-white p-4 shadow-sm dark:bg-slate-800 dark:border-slate-700">
                <div className="flex items-center gap-4">
                  <div className="text-3xl">{it.emoji}</div>
                  <div>
                    <div className="font-medium">{it.name}</div>
                    <div className="text-sm text-slate-500 dark:text-slate-400">{it.desc}</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="text-sm font-semibold">${it.price.toFixed(2)}</div>
                  <div className="flex items-center gap-2">
                    <button onClick={() => decFromCart(it.id)} className="px-2 py-1 rounded bg-slate-100 text-sm">-</button>
                    <div className="w-6 text-center text-sm">{it.qty}</div>
                    <button onClick={() => addToCart(it.id)} className="px-2 py-1 rounded bg-amber-600 text-white text-sm">+</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
{/* 
        <aside className="rounded-lg border p-4 bg-white shadow-sm dark:bg-slate-800 dark:border-slate-700">
          <h2 className="font-semibold">Your Cart</h2>
          <div className="mt-4">
            {Object.keys(cart).length === 0 && <div className="text-sm text-slate-500">Cart is empty</div>}
            {Object.entries(cart).map(([id, qty]) => {
              const m = MENU.find((x) => x.id === Number(id))!;
              return (
                <div key={id} className="flex items-center justify-between py-2">
                  <div className="text-sm">
                    <div className="font-medium">{m.name} × {qty}</div>
                    <div className="text-xs text-slate-500">${(m.price * qty).toFixed(2)}</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button onClick={() => decFromCart(m.id)} className="px-2 py-1 rounded bg-slate-100 text-sm">-</button>
                    <button onClick={() => addToCart(m.id)} className="px-2 py-1 rounded bg-amber-600 text-white text-sm">+</button>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-4 border-t pt-4 flex items-center justify-between">
            <div className="text-sm text-slate-600 dark:text-slate-300">Subtotal</div>
            <div className="font-semibold">${subtotal.toFixed(2)}</div>
          </div>

          <button onClick={checkout} className="mt-4 w-full rounded-full bg-amber-600 px-4 py-2 text-white font-semibold">Checkout</button>
        </aside> */}
      </main>
    </div>
  );
}
