import express from "express";
import cors from "cors";
import { nanoid } from "nanoid";
import { z } from "zod";
import { menuItems, restaurants } from "./data/menu.js";

const app = express();

app.use(
  cors({
    origin: true
  })
);
app.use(express.json());

const orders = new Map();

app.get("/health", (_req, res) => res.json({ ok: true }));

app.get("/api/restaurants", (_req, res) => {
  res.json({ restaurants });
});

app.get("/api/menu", (req, res) => {
  const restaurantId = req.query.restaurantId?.toString();
  const items = restaurantId
    ? menuItems.filter((i) => i.restaurantId === restaurantId)
    : menuItems;
  res.json({ items });
});

const createOrderSchema = z.object({
  restaurantId: z.string().min(1),
  customer: z
    .object({
      name: z.string().min(1),
      address: z.string().min(1),
      phone: z.string().min(5).optional()
    })
    .strict(),
  items: z
    .array(
      z
        .object({
          id: z.string().min(1),
          qty: z.number().int().min(1).max(99)
        })
        .strict()
    )
    .min(1)
});

function computeTotals({ restaurantId, items }) {
  const rest = restaurants.find((r) => r.id === restaurantId);
  if (!rest) {
    const err = new Error("Unknown restaurant");
    err.status = 400;
    throw err;
  }

  const lineItems = items.map(({ id, qty }) => {
    const item = menuItems.find((m) => m.id === id && m.restaurantId === restaurantId);
    if (!item) {
      const err = new Error(`Unknown menu item: ${id}`);
      err.status = 400;
      throw err;
    }
    return {
      id: item.id,
      name: item.name,
      priceCents: item.priceCents,
      qty,
      lineTotalCents: item.priceCents * qty
    };
  });

  const subtotalCents = lineItems.reduce((sum, li) => sum + li.lineTotalCents, 0);
  const deliveryFeeCents = rest.deliveryFeeCents ?? 0;

  // Keep it simple: 5% tax
  const taxCents = Math.round(subtotalCents * 0.05);
  const totalCents = subtotalCents + deliveryFeeCents + taxCents;

  return { restaurant: rest, lineItems, subtotalCents, deliveryFeeCents, taxCents, totalCents };
}

app.post("/api/orders", (req, res) => {
  const parsed = createOrderSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({
      error: "Invalid order payload",
      details: parsed.error.flatten()
    });
  }

  try {
    const totals = computeTotals(parsed.data);
    const id = `ord_${nanoid(10)}`;
    const now = Date.now();

    const order = {
      id,
      status: "placed",
      createdAt: now,
      updatedAt: now,
      restaurantId: parsed.data.restaurantId,
      customer: parsed.data.customer,
      ...totals
    };

    orders.set(id, order);
    return res.status(201).json({ order });
  } catch (e) {
    const status = e?.status ?? 500;
    return res.status(status).json({ error: e?.message ?? "Server error" });
  }
});

app.get("/api/orders/:id", (req, res) => {
  const order = orders.get(req.params.id);
  if (!order) return res.status(404).json({ error: "Order not found" });
  res.json({ order });
});

app.post("/api/orders/:id/status", (req, res) => {
  const order = orders.get(req.params.id);
  if (!order) return res.status(404).json({ error: "Order not found" });

  const schema = z.object({
    status: z.enum(["placed", "preparing", "out_for_delivery", "delivered", "cancelled"])
  });
  const parsed = schema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: "Invalid status" });

  const updated = { ...order, status: parsed.data.status, updatedAt: Date.now() };
  orders.set(order.id, updated);
  res.json({ order: updated });
});

const PORT = process.env.PORT ? Number(process.env.PORT) : 5174;
app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Backend listening on http://localhost:${PORT}`);
});

