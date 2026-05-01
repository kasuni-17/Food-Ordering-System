# Stitch Food Ordering (Full Stack)

This folder contains your existing Stitch UI screens **plus** a runnable full-stack demo app:

- `backend/`: Express API (menu + orders)
- `frontend/`: React + Vite UI (browse menu, cart, checkout, order tracking)

## Run locally

Open a terminal in this folder (`stitch_food_ordering_interface`) and run:

```bash
npm install
npm run dev
```

Then open:

- Frontend: `http://localhost:5173`
- Backend health: `http://localhost:5174/health`

## API (backend)

- `GET /api/restaurants`
- `GET /api/menu?restaurantId=...`
- `POST /api/orders`
- `GET /api/orders/:id`
- `POST /api/orders/:id/status` with JSON body: `{ "status": "preparing" }`

Notes:

- Orders are stored **in-memory** (restart server = orders reset).
- Tax is a simple **5%** calculation for demo purposes.

