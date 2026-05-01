import React, { useEffect, useMemo, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { createOrder, fetchMenu, fetchRestaurants, getOrder } from "../lib/api.js";
import { formatMoney } from "../lib/money.js";
import StitchFrame from "./StitchFrame.jsx";

function cx(...parts) {
  return parts.filter(Boolean).join(" ");
}

function Card({ className, children }) {
  return (
    <div className={cx("rounded-2xl bg-white shadow-sm ring-1 ring-stone-100", className)}>
      {children}
    </div>
  );
}

function TopBar({ cartCount, onGoHome, onGoCheckout, view, onSearchClick, onNotificationClick, onProfileClick }) {
  return (
    <header className="sticky top-0 z-50 border-b border-stone-100 bg-white/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <button className="flex items-center gap-2" onClick={onGoHome} type="button">
          <span className="text-xl font-extrabold tracking-tight text-brand-600">Quick</span>
          <span className="text-xl font-extrabold tracking-tight text-stone-900">Crave</span>
        </button>
        <div className="flex items-center gap-2">
          <button
            className={cx(
              "rounded-xl px-3 py-2 text-sm font-semibold",
              view === "browse" ? "bg-stone-900 text-white" : "hover:bg-stone-100"
            )}
            onClick={onGoHome}
            type="button"
          >
            Browse
          </button>
          <button
            className={cx(
              "relative rounded-xl px-3 py-2 text-sm font-semibold",
              view === "checkout" ? "bg-stone-900 text-white" : "hover:bg-stone-100"
            )}
            onClick={onGoCheckout}
            type="button"
          >
            Cart
            {cartCount > 0 ? (
              <span className="ml-2 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-brand-600 px-1 text-xs font-bold text-white">
                {cartCount}
              </span>
            ) : null}
          </button>
        </div>
        <div className="flex items-center gap-3">
          <button
            className="rounded-xl p-2 hover:bg-stone-100"
            onClick={onSearchClick}
            type="button"
            aria-label="Search"
          >
            <svg className="h-5 w-5 text-stone-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
          <button
            className="relative rounded-xl p-2 hover:bg-stone-100"
            onClick={onGoCheckout}
            type="button"
            aria-label="Cart"
          >
            <svg className="h-5 w-5 text-stone-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            {cartCount > 0 ? (
              <span className="absolute -top-1 -right-1 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-red-500 px-1 text-xs font-bold text-white">
                {cartCount}
              </span>
            ) : null}
          </button>
          <button
            className="relative rounded-xl p-2 hover:bg-stone-100"
            onClick={onNotificationClick}
            type="button"
            aria-label="Notifications"
          >
            <svg className="h-5 w-5 text-stone-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
            <span className="absolute -top-1 -right-1 inline-flex h-2 w-2 rounded-full bg-red-500"></span>
          </button>
          <button
            className="rounded-full p-1 hover:bg-stone-100"
            onClick={onProfileClick}
            type="button"
            aria-label="Profile"
          >
            <img 
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" 
              alt="Profile" 
              className="h-8 w-8 rounded-full object-cover"
            />
          </button>
        </div>
      </div>
    </header>
  );
}

function RestaurantPicker({ restaurants, selectedId, onSelect }) {
  return (
    <div className="flex flex-wrap gap-2">
      <button
        className={cx(
          "rounded-full px-4 py-2 text-sm font-semibold",
          !selectedId ? "bg-stone-900 text-white" : "bg-white ring-1 ring-stone-200 hover:bg-stone-50"
        )}
        onClick={() => onSelect("")}
        type="button"
      >
        All restaurants
      </button>
      {restaurants.map((r) => (
        <button
          key={r.id}
          className={cx(
            "rounded-full px-4 py-2 text-sm font-semibold",
            selectedId === r.id
              ? "bg-brand-600 text-white"
              : "bg-white ring-1 ring-stone-200 hover:bg-stone-50"
          )}
          onClick={() => onSelect(r.id)}
          type="button"
        >
          {r.name}
        </button>
      ))}
    </div>
  );
}

function MenuGrid({ items, onAdd }) {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
      {items.map((item) => (
        <Card key={item.id} className="overflow-hidden">
          <div className="flex gap-4 p-4">
            <div className="h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-stone-100">
              <img alt={item.name} className="h-full w-full object-cover" src={item.imageUrl} />
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <div className="truncate text-base font-bold">{item.name}</div>
                  <div className="line-clamp-2 text-sm text-stone-600">{item.description}</div>
                </div>
                <div className="shrink-0 text-sm font-bold text-stone-900">
                  {formatMoney(item.priceCents)}
                </div>
              </div>
              <div className="mt-3 flex items-center justify-between">
                <div className="flex flex-wrap gap-1">
                  {(item.tags ?? []).slice(0, 3).map((t) => (
                    <span
                      key={t}
                      className="rounded-full bg-stone-100 px-2 py-1 text-xs font-semibold text-stone-700"
                    >
                      {t}
                    </span>
                  ))}
                </div>
                <button
                  className="rounded-xl bg-stone-900 px-3 py-2 text-sm font-semibold text-white hover:bg-stone-800 active:scale-[0.99]"
                  onClick={() => onAdd(item)}
                  type="button"
                >
                  Add
                </button>
              </div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}

function Checkout({
  restaurants,
  menuById,
  cart,
  onSetQty,
  onRemove,
  onBack,
  onOrderCreated
}) {
  const [name, setName] = useState("Alex");
  const [address, setAddress] = useState("123 Culinary Lane, Bistro District");
  const [phone, setPhone] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const cartItems = useMemo(() => {
    return Object.entries(cart).map(([id, qty]) => ({
      item: menuById.get(id),
      qty
    }));
  }, [cart, menuById]);

  const grouped = useMemo(() => {
    const byRestaurant = new Map();
    for (const { item, qty } of cartItems) {
      if (!item) continue;
      const list = byRestaurant.get(item.restaurantId) ?? [];
      list.push({ item, qty });
      byRestaurant.set(item.restaurantId, list);
    }
    return byRestaurant;
  }, [cartItems]);

  const restaurantIds = Array.from(grouped.keys());
  const selectedRestaurantId = restaurantIds[0] ?? "";
  const canSubmit = restaurantIds.length === 1 && cartItems.length > 0;

  const subtotalCents = cartItems.reduce((sum, { item, qty }) => sum + (item?.priceCents ?? 0) * qty, 0);
  const deliveryFeeCents =
    restaurants.find((r) => r.id === selectedRestaurantId)?.deliveryFeeCents ?? 0;
  const taxCents = Math.round(subtotalCents * 0.05);
  const totalCents = subtotalCents + deliveryFeeCents + taxCents;

  async function onPlaceOrder() {
    setError("");
    if (!canSubmit) {
      setError("Your cart must contain items from a single restaurant.");
      return;
    }
    setSubmitting(true);
    try {
      const payload = {
        restaurantId: selectedRestaurantId,
        customer: { name, address, phone: phone || undefined },
        items: cartItems
          .filter((x) => x.item)
          .map((x) => ({ id: x.item.id, qty: x.qty }))
      };
      const { order } = await createOrder(payload);
      onOrderCreated(order.id);
    } catch (e) {
      setError(e?.message ?? "Could not place order.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <div className="mb-6 flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight">Checkout</h1>
          <p className="text-sm text-stone-600">Place your order in a couple of clicks.</p>
        </div>
        <button className="rounded-xl px-3 py-2 text-sm font-semibold hover:bg-stone-100" onClick={onBack} type="button">
          Back
        </button>
      </div>

      {restaurantIds.length > 1 ? (
        <Card className="mb-4 p-4">
          <div className="text-sm font-semibold text-stone-900">Heads up</div>
          <div className="mt-1 text-sm text-stone-600">
            This demo backend accepts orders from a single restaurant. Remove items until only one restaurant remains.
          </div>
        </Card>
      ) : null}

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Card className="p-4">
            <div className="text-sm font-bold text-stone-900">Delivery details</div>
            <div className="mt-3 grid grid-cols-1 gap-3 md:grid-cols-2">
              <label className="block">
                <div className="text-xs font-semibold text-stone-600">Name</div>
                <input
                  className="mt-1 w-full rounded-xl border border-stone-200 px-3 py-2 text-sm outline-none focus:border-stone-400"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </label>
              <label className="block">
                <div className="text-xs font-semibold text-stone-600">Phone (optional)</div>
                <input
                  className="mt-1 w-full rounded-xl border border-stone-200 px-3 py-2 text-sm outline-none focus:border-stone-400"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </label>
              <label className="block md:col-span-2">
                <div className="text-xs font-semibold text-stone-600">Address</div>
                <input
                  className="mt-1 w-full rounded-xl border border-stone-200 px-3 py-2 text-sm outline-none focus:border-stone-400"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </label>
            </div>
          </Card>

          <Card className="mt-6 p-4">
            <div className="flex items-center justify-between">
              <div className="text-sm font-bold text-stone-900">Cart</div>
              <div className="text-xs font-semibold text-stone-500">{cartItems.length} items</div>
            </div>
            <div className="mt-4 divide-y divide-stone-100">
              {cartItems.length === 0 ? (
                <div className="py-10 text-center text-sm text-stone-600">Your cart is empty.</div>
              ) : (
                cartItems.map(({ item, qty }) => (
                  <div key={item?.id ?? Math.random()} className="flex items-center gap-3 py-3">
                    <div className="min-w-0 flex-1">
                      <div className="truncate text-sm font-semibold">{item?.name ?? "Unknown item"}</div>
                      <div className="text-xs text-stone-500">{formatMoney(item?.priceCents ?? 0)} each</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        className="h-9 w-9 rounded-xl border border-stone-200 text-sm font-bold hover:bg-stone-50"
                        onClick={() => onSetQty(item.id, Math.max(1, qty - 1))}
                        type="button"
                      >
                        −
                      </button>
                      <div className="w-8 text-center text-sm font-bold">{qty}</div>
                      <button
                        className="h-9 w-9 rounded-xl border border-stone-200 text-sm font-bold hover:bg-stone-50"
                        onClick={() => onSetQty(item.id, Math.min(99, qty + 1))}
                        type="button"
                      >
                        +
                      </button>
                      <button
                        className="ml-2 rounded-xl px-3 py-2 text-sm font-semibold text-stone-700 hover:bg-stone-100"
                        onClick={() => onRemove(item.id)}
                        type="button"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </Card>
        </div>

        <div className="lg:col-span-1">
          <Card className="p-4">
            <div className="text-sm font-bold text-stone-900">Summary</div>
            <div className="mt-4 space-y-2 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-stone-600">Subtotal</span>
                <span className="font-semibold">{formatMoney(subtotalCents)}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-stone-600">Delivery</span>
                <span className="font-semibold">{deliveryFeeCents === 0 ? "Free" : formatMoney(deliveryFeeCents)}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-stone-600">Tax (5%)</span>
                <span className="font-semibold">{formatMoney(taxCents)}</span>
              </div>
              <div className="my-3 h-px bg-stone-100" />
              <div className="flex items-center justify-between text-base">
                <span className="font-bold">Total</span>
                <span className="font-extrabold">{formatMoney(totalCents)}</span>
              </div>
            </div>

            {error ? <div className="mt-4 rounded-xl bg-red-50 p-3 text-sm font-semibold text-red-700">{error}</div> : null}

            <button
              className={cx(
                "mt-4 w-full rounded-2xl px-4 py-3 text-sm font-extrabold",
                canSubmit && !submitting
                  ? "bg-brand-600 text-white hover:bg-brand-700"
                  : "cursor-not-allowed bg-stone-200 text-stone-500"
              )}
              disabled={!canSubmit || submitting}
              onClick={onPlaceOrder}
              type="button"
            >
              {submitting ? "Placing order..." : "Place order"}
            </button>

            <div className="mt-3 text-xs text-stone-500">
              Restaurant:{" "}
              <span className="font-semibold text-stone-700">
                {restaurants.find((r) => r.id === selectedRestaurantId)?.name ?? "—"}
              </span>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

function OrderTracking({ orderId, onGoHome }) {
  const [order, setOrder] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        const data = await getOrder(orderId);
        if (!cancelled) setOrder(data.order);
      } catch (e) {
        if (!cancelled) setError(e?.message ?? "Could not load order.");
      }
    }
    load();
    const t = setInterval(load, 2500);
    return () => {
      cancelled = true;
      clearInterval(t);
    };
  }, [orderId]);

  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight">Order status</h1>
          <p className="text-sm text-stone-600">Order ID: {orderId}</p>
        </div>
        <button className="rounded-xl px-3 py-2 text-sm font-semibold hover:bg-stone-100" onClick={onGoHome} type="button">
          New order
        </button>
      </div>

      {error ? <Card className="p-4 text-sm font-semibold text-red-700">{error}</Card> : null}

      {order ? (
        <div className="space-y-4">
          <Card className="p-4">
            <div className="flex items-center justify-between">
              <div className="text-sm font-bold text-stone-900">{order.restaurant?.name}</div>
              <div className="rounded-full bg-stone-900 px-3 py-1 text-xs font-extrabold uppercase tracking-wider text-white">
                {order.status.replaceAll("_", " ")}
              </div>
            </div>
            <div className="mt-4 space-y-2 text-sm">
              {(order.lineItems ?? []).map((li) => (
                <div key={li.id} className="flex items-center justify-between">
                  <span className="text-stone-700">
                    {li.qty}× {li.name}
                  </span>
                  <span className="font-semibold">{formatMoney(li.lineTotalCents)}</span>
                </div>
              ))}
              <div className="my-2 h-px bg-stone-100" />
              <div className="flex items-center justify-between">
                <span className="text-stone-600">Total</span>
                <span className="text-base font-extrabold">{formatMoney(order.totalCents)}</span>
              </div>
            </div>
          </Card>

          <Card className="p-4">
            <div className="text-sm font-bold text-stone-900">Delivery to</div>
            <div className="mt-1 text-sm text-stone-700">{order.customer?.name}</div>
            <div className="text-sm text-stone-600">{order.customer?.address}</div>
          </Card>

          <Card className="p-4">
            <div className="text-sm font-bold text-stone-900">Next steps (demo)</div>
            <div className="mt-1 text-sm text-stone-600">
              Use the backend endpoint <span className="font-mono">POST /api/orders/:id/status</span> to move between{" "}
              <span className="font-semibold">preparing</span> → <span className="font-semibold">out_for_delivery</span> →{" "}
              <span className="font-semibold">delivered</span>.
            </div>
          </Card>
        </div>
      ) : (
        <Card className="p-4 text-sm text-stone-600">Loading…</Card>
      )}
    </div>
  );
}

function DemoApp() {
  const [restaurants, setRestaurants] = useState([]);
  const [menu, setMenu] = useState([]);
  const [selectedRestaurantId, setSelectedRestaurantId] = useState("");
  const [cart, setCart] = useState({});
  const [view, setView] = useState("browse"); // browse | checkout | tracking
  const [trackingOrderId, setTrackingOrderId] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [showSearchModal, setShowSearchModal] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  const menuById = useMemo(() => new Map(menu.map((m) => [m.id, m])), [menu]);
  const cartCount = useMemo(() => Object.values(cart).reduce((a, b) => a + b, 0), [cart]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (showNotifications || showProfileMenu) {
        setShowNotifications(false);
        setShowProfileMenu(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showNotifications, showProfileMenu]);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      setLoading(true);
      setError("");
      try {
        const [r, m] = await Promise.all([fetchRestaurants(), fetchMenu("", isSearching ? searchQuery : "")]);
        if (cancelled) return;
        setRestaurants(r.restaurants ?? []);
        setMenu(m.items ?? []);
      } catch (e) {
        if (!cancelled) setError(e?.message ?? "Could not load data. Is the backend running?");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    load();
    return () => {
      cancelled = true;
    };
  }, [isSearching, searchQuery]);

  const filteredMenu = useMemo(() => {
    return selectedRestaurantId ? menu.filter((m) => m.restaurantId === selectedRestaurantId) : menu;
  }, [menu, selectedRestaurantId]);

  function addToCart(item) {
    setCart((prev) => ({ ...prev, [item.id]: Math.min(99, (prev[item.id] ?? 0) + 1) }));
  }

  function setQty(id, qty) {
    setCart((prev) => ({ ...prev, [id]: qty }));
  }

  function removeItem(id) {
    setCart((prev) => {
      const next = { ...prev };
      delete next[id];
      return next;
    });
  }

  function goHome() {
    setView("browse");
  }

  function goCheckout() {
    setView("checkout");
  }

  function onOrderCreated(orderId) {
    setTrackingOrderId(orderId);
    setView("tracking");
    setCart({});
  }

  function handleSearchClick() {
    setShowSearchModal(true);
  }

  function handleSearchSubmit() {
    if (searchQuery.trim()) {
      setIsSearching(true);
      setShowSearchModal(false);
    }
  }

  function handleClearSearch() {
    setSearchQuery("");
    setIsSearching(false);
  }

  function handleNotificationClick() {
    setShowNotifications(!showNotifications);
    setShowProfileMenu(false);
  }

  function handleProfileClick() {
    setShowProfileMenu(!showProfileMenu);
    setShowNotifications(false);
  }

  return (
    <div className="min-h-screen">
      <TopBar 
        cartCount={cartCount} 
        onGoHome={goHome} 
        onGoCheckout={goCheckout} 
        view={view}
        onSearchClick={handleSearchClick}
        onNotificationClick={handleNotificationClick}
        onProfileClick={handleProfileClick}
      />

      {view === "tracking" ? (
        <OrderTracking orderId={trackingOrderId} onGoHome={goHome} />
      ) : view === "checkout" ? (
        <Checkout
          restaurants={restaurants}
          menuById={menuById}
          cart={cart}
          onSetQty={setQty}
          onRemove={removeItem}
          onBack={goHome}
          onOrderCreated={onOrderCreated}
        />
      ) : (
        <main className="mx-auto max-w-6xl px-4 py-10">
          <div className="mb-8 grid grid-cols-1 gap-6 lg:grid-cols-3 lg:items-end">
            <div className="lg:col-span-2">
              <div className="inline-flex items-center rounded-full bg-brand-50 px-3 py-1 text-xs font-extrabold text-brand-700">
                Demo full-stack app
              </div>
              <h1 className="mt-3 text-3xl font-extrabold tracking-tight md:text-4xl">
                Order great food, fast.
              </h1>
              <p className="mt-2 max-w-2xl text-sm text-stone-600">
                Pick a restaurant, add items to cart, and place an order. The backend computes totals and returns an order
                you can track.
              </p>
            </div>
            <div className="lg:col-span-1">
              <Card className="p-4">
                <div className="text-sm font-bold text-stone-900">Quick cart</div>
                <div className="mt-2 text-sm text-stone-600">{cartCount === 0 ? "Empty" : `${cartCount} item(s)`}</div>
                <button
                  className={cx(
                    "mt-3 w-full rounded-2xl px-4 py-3 text-sm font-extrabold",
                    cartCount > 0 ? "bg-stone-900 text-white hover:bg-stone-800" : "bg-stone-200 text-stone-500"
                  )}
                  disabled={cartCount === 0}
                  onClick={goCheckout}
                  type="button"
                >
                  Go to checkout
                </button>
              </Card>
            </div>
          </div>

          {error ? (
            <Card className="mb-6 p-4">
              <div className="text-sm font-semibold text-red-700">{error}</div>
              <div className="mt-1 text-xs text-stone-500">
                Tip: start the backend on <span className="font-mono">localhost:5174</span>.
              </div>
            </Card>
          ) : null}

          {isSearching && (
            <div className="mb-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-lg font-bold text-stone-900">Search Results</h2>
                  <p className="text-sm text-stone-600">
                    {searchQuery ? `Searching for "${searchQuery}"` : 'All items'}
                    {menu.length > 0 && ` • ${menu.length} result${menu.length !== 1 ? 's' : ''}`}
                  </p>
                </div>
                <button
                  onClick={handleClearSearch}
                  className="text-stone-500 hover:text-stone-700 text-sm font-medium"
                >
                  Clear Search
                </button>
              </div>
            </div>
          )}

          {!isSearching && (
            <div className="mb-4">
              <div className="mb-3 text-sm font-bold text-stone-900">Filter by restaurant</div>
              <RestaurantPicker
                restaurants={restaurants}
                selectedId={selectedRestaurantId}
                onSelect={setSelectedRestaurantId}
              />
            </div>
          )}

          {loading ? (
            <Card className="p-6 text-sm text-stone-600">
              {isSearching ? 'Searching...' : 'Loading menu…'}
            </Card>
          ) : menu.length === 0 && isSearching ? (
            <Card className="p-6 text-center">
              <div className="text-stone-600">
                <svg className="h-12 w-12 mx-auto mb-4 text-stone-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <p className="font-medium">No results found</p>
                <p className="text-sm mt-2">Try searching for something else</p>
              </div>
            </Card>
          ) : (
            <MenuGrid items={filteredMenu} onAdd={addToCart} />
          )}
        </main>
      )}

      {/* Search Modal */}
      {showSearchModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-start justify-center pt-20">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full mx-4">
            <div className="flex items-center justify-between p-4 border-b">
              <h3 className="text-lg font-semibold">Search</h3>
              <button
                onClick={() => setShowSearchModal(false)}
                className="text-stone-400 hover:text-stone-600"
              >
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="p-4">
              <div className="flex items-center gap-3 border rounded-xl px-3 py-2">
                <svg className="h-5 w-5 text-stone-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSearchSubmit()}
                  placeholder="Search for sushi, pasta, or burgers..."
                  className="flex-1 outline-none text-lg"
                  autoFocus
                />
              </div>
              <div className="flex gap-3 mt-4">
                <button
                  onClick={handleSearchSubmit}
                  disabled={!searchQuery.trim()}
                  className="flex-1 bg-primary text-white px-4 py-2 rounded-xl font-semibold hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Search
                </button>
                {isSearching && (
                  <button
                    onClick={handleClearSearch}
                    className="px-4 py-2 border border-stone-200 rounded-xl font-semibold hover:bg-stone-50 transition-colors"
                  >
                    Clear
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Notifications Panel */}
      {showNotifications && (
        <div className="fixed top-16 right-4 bg-white rounded-2xl shadow-2xl w-80 z-40">
          <div className="p-4 border-b">
            <h3 className="font-semibold">Notifications</h3>
          </div>
          <div className="max-h-96 overflow-y-auto">
            <div className="p-4 border-b hover:bg-stone-50 cursor-pointer">
              <div className="flex gap-3">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                <div className="flex-1">
                  <p className="font-medium text-sm">Order delivered!</p>
                  <p className="text-xs text-stone-600 mt-1">Your order from The Truffle Table has been delivered.</p>
                  <p className="text-xs text-stone-500 mt-2">2 minutes ago</p>
                </div>
              </div>
            </div>
            <div className="p-4 border-b hover:bg-stone-50 cursor-pointer">
              <div className="flex gap-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                <div className="flex-1">
                  <p className="font-medium text-sm">New restaurant available</p>
                  <p className="text-xs text-stone-600 mt-1">Sakura Zen is now delivering in your area.</p>
                  <p className="text-xs text-stone-500 mt-2">1 hour ago</p>
                </div>
              </div>
            </div>
            <div className="p-4 hover:bg-stone-50 cursor-pointer">
              <div className="flex gap-3">
                <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
                <div className="flex-1">
                  <p className="font-medium text-sm">Special offer!</p>
                  <p className="text-xs text-stone-600 mt-1">Get 30% off your first order.</p>
                  <p className="text-xs text-stone-500 mt-2">2 hours ago</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Profile Menu */}
      {showProfileMenu && (
        <div className="fixed top-16 right-4 bg-white rounded-2xl shadow-2xl w-64 z-40">
          <div className="p-4 border-b">
            <div className="flex items-center gap-3">
              <img 
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" 
                alt="Profile" 
                className="h-10 w-10 rounded-full object-cover"
              />
              <div>
                <p className="font-medium">John Doe</p>
                <p className="text-xs text-stone-600">john.doe@example.com</p>
              </div>
            </div>
          </div>
          <div className="py-2">
            <button className="w-full px-4 py-2 text-left hover:bg-stone-50 flex items-center gap-3">
              <svg className="h-4 w-4 text-stone-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <span className="text-sm">Profile</span>
            </button>
            <button className="w-full px-4 py-2 text-left hover:bg-stone-50 flex items-center gap-3">
              <svg className="h-4 w-4 text-stone-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
              </svg>
              <span className="text-sm">Payment Methods</span>
            </button>
            <button className="w-full px-4 py-2 text-left hover:bg-stone-50 flex items-center gap-3">
              <svg className="h-4 w-4 text-stone-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span className="text-sm">Settings</span>
            </button>
            <div className="border-t mt-2 pt-2">
              <button className="w-full px-4 py-2 text-left hover:bg-stone-50 flex items-center gap-3 text-red-600">
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                <span className="text-sm">Sign Out</span>
              </button>
            </div>
          </div>
        </div>
      )}

      <footer className="border-t border-stone-100 bg-white py-8">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 text-xs text-stone-500 md:flex-row md:items-center md:justify-between">
          <div>
            Built for your Stitch UI screens. Backend: <span className="font-mono">Express</span> • Frontend:{" "}
            <span className="font-mono">React + Vite</span> • Styles: <span className="font-mono">Tailwind</span>
          </div>
          <div className="text-stone-400">Local demo only (in-memory orders).</div>
        </div>
      </footer>
    </div>
  );
}

export default function App() {
  return (
    <Routes>
      <Route element={<Navigate replace to="/stitch/home" />} path="/" />

      <Route element={<Navigate replace to="/stitch/home" />} path="/stitch" />
      <Route
        element={<StitchFrame title="Customer homepage" src="/stitch/customer_homepage.html" />}
        path="/stitch/home"
      />
      <Route
        element={<StitchFrame title="Restaurant listings" src="/stitch/restaurant_listings.html" />}
        path="/stitch/restaurants"
      />
      <Route
        element={<StitchFrame title="Restaurant menu detail" src="/stitch/restaurant_menu_detail.html" />}
        path="/stitch/restaurant-menu"
      />
      <Route
        element={<StitchFrame title="Checkout payment" src="/stitch/checkout_payment.html" />}
        path="/stitch/checkout"
      />
      <Route
        element={<StitchFrame title="Order tracking" src="/stitch/order_tracking.html" />}
        path="/stitch/tracking"
      />

      <Route element={<Navigate replace to="/stitch/home" />} path="*" />
    </Routes>
  );
}

