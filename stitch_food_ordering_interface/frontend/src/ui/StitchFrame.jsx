import React from "react";
import { NavLink } from "react-router-dom";

function cx(...parts) {
  return parts.filter(Boolean).join(" ");
}

function NavItem({ to, children }) {
  return (
    <NavLink
      className={({ isActive }) =>
        cx(
          "rounded-xl px-3 py-2 text-sm font-semibold",
          isActive ? "bg-stone-900 text-white" : "hover:bg-stone-100"
        )
      }
      to={to}
    >
      {children}
    </NavLink>
  );
}

export default function StitchFrame({ title, src }) {
  return (
    <div className="min-h-screen bg-stone-50">
      <header className="sticky top-0 z-50 border-b border-stone-100 bg-white/80 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4">
          <div className="min-w-0">
            <div className="truncate text-lg font-extrabold tracking-tight text-stone-900">
              {title}
            </div>
          </div>
          <nav className="flex flex-wrap items-center gap-2">
            <NavItem to="/stitch/home">Home</NavItem>
            <NavItem to="/stitch/restaurants">Restaurants</NavItem>
            <NavItem to="/stitch/restaurant-menu">Menu detail</NavItem>
            <NavItem to="/stitch/checkout">Checkout</NavItem>
            <NavItem to="/stitch/tracking">Tracking</NavItem>
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-4">
        <div className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-stone-100">
          <iframe className="h-[calc(100vh-120px)] w-full" src={src} title={title} />
        </div>
      </main>
    </div>
  );
}

