# Scent Garden

A playful botanical perfume storefront with a React + Vite frontend and an optional Express + MongoDB backend. The same frontend runs in browser-only mode or remote mode, selected once at startup by `VITE_API_URL`.

## Run locally

```sh
cd frontend
npm install
npm run dev
```

Leave `VITE_API_URL` unset for browser-only mode. Products, accounts, reviews, wishlist, and orders are kept in IndexedDB; the cart and sign-in state use localStorage. Local passwords are derived with Web Crypto PBKDF2 and a random salt. This data is private to the browser profile and does not sync to other devices.

The browser-only garden keeper account is `admin@scentgarden.com` with password `Admin@123`. Change the password after signing in before using that account for anything beyond local exploration.

## Deploy frontend only to Vercel

1. Push this project to GitHub and import it in Vercel.
2. Set **Root Directory** to `frontend` and framework preset to **Vite**.
3. Leave `VITE_API_URL` unset (or empty), then deploy. `frontend/vercel.json` rewrites SPA routes so deep links refresh correctly.

## Full stack deployment (free tiers)

1. Create a MongoDB Atlas free M0 cluster, add a database user, and allow network access from your backend host. Copy the connection string.
2. Create a Render Web Service with root directory `backend`, build command `npm install`, start command `npm start`, and the Free instance type.
3. Set `MONGO_URI`, a long random `JWT_SECRET`, `FRONTEND_URL`, `ADMIN_EMAIL`, and `ADMIN_PASSWORD` in Render. `FRONTEND_URL` may contain comma-separated local and deployed frontend origins.
4. Seed the database once from your computer: in `backend`, set `MONGO_URI`, `ADMIN_EMAIL`, and `ADMIN_PASSWORD`, then run `npm install` and `npm run seed`.
5. Set `VITE_API_URL` in Vercel to the deployed Render service URL and redeploy.
6. Add the Vercel URL to Render's `FRONTEND_URL` and redeploy the backend.

In remote mode the frontend pings `/health` every three seconds for up to one minute while the Render service wakes. It shows a retry screen if the service remains unavailable and never switches to browser-only mode silently. Render's free service can sleep between visits; an optional uptime monitor can ping `/health` every 10–14 minutes. Remove `VITE_API_URL` to switch back to browser-only mode; remote accounts and orders do not transfer to local browser storage.

## Project layout

- `frontend/src/services/dataService.js` selects one adapter at startup. Components call only this service for data operations.
- `frontend/src/services/adapters/localAdapter.js` implements IndexedDB browser-only data and Web Crypto password hashing.
- `frontend/src/services/adapters/remoteAdapter.js` uses the Express API and stores the JWT in localStorage.
- `backend/src/server.js` hosts the API, authentication, validation, order pricing, and admin authorization.
- `backend/src/models.js` defines MongoDB models. Product images may be stored as base64 in the product document; uploads are not written to disk.

## API overview

The backend exposes `/health`, `/api/auth` (signup, login, current user, profile, password, addresses), `/api/products`, `/api/orders`, `/api/wishlist`, `/api/reviews`, `/api/coupons/validate`, `/api/newsletter`, `/api/messages`, and `/api/admin/stats`. JWTs expire after seven days. Login and signup are rate limited, request bodies are validated, CORS is limited to `FRONTEND_URL`, and order totals are recalculated from MongoDB product prices on the server.

Coupon codes: `BLOOM10` takes 10% off, and `WELCOME50` takes ₹50 off. Delivery costs ₹49 below ₹999 and is free at ₹999 or above.

## Product photography

The storefront gives each of the 16 perfumes its own Unsplash bottle photo. Product labels, bottle styles, and any visible third-party branding in these stock photos may not match Scent Garden's actual inventory. Replace these with your own product photographs before taking real product orders. Photos are loaded from Unsplash's image CDN.

- [Botanical bottle with white flowers](https://unsplash.com/ja/photos/%E7%99%BD%E3%81%84%E8%8A%B1%E3%81%8C%E4%BB%98%E3%81%84%E3%81%9F%E9%80%8F%E6%98%8E%E3%81%AA%E3%82%AC%E3%83%A9%E3%82%B9%E3%81%AE%E9%A6%99%E6%B0%B4%E7%93%B6-LgoehzzFAMA)
- [Amber bottle on a neutral table](https://unsplash.com/photos/a-bottle-of-perfume-sitting-on-top-of-a-table-RgmYc5A1l-M)
- [Red perfume bottle](https://unsplash.com/photos/a-person-holding-a-red-bottle-of-perfume-azbhr-x1bMQ)
- [Clear bottle with blue background](https://unsplash.com/photos/clear-glass-perfume-bottle-with-blue-background-ugP-TQTUnak)
- [Amber bottle on satin](https://unsplash.com/fr/photos/un-flacon-de-parfum-pose-sur-une-table-_3bshyDNdGY)

Additional Unsplash photo credits: [rose and perfume](https://unsplash.com/photos/a-bottle-of-perfume-next-to-a-box-of-flowers-L1aiboY6WnE), [teal bottle](https://unsplash.com/photos/perfume-bottle-with-teal-packaging-on-white-background-4nFQU6Gfbng), [dark cloth bottle](https://unsplash.com/photos/a-clear-glass-perfume-bottle-on-a-dark-cloth-coi2fv2YUAc), [dark textured bottle](https://unsplash.com/photos/perfume-bottle-on-a-dark-textured-surface-smVxAu_lqlo), [red bottle](https://unsplash.com/photos/a-person-holding-a-red-bottle-of-perfume-azbhr-x1bMQ), [shelf bottle](https://unsplash.com/photos/a-bottle-of-perfume-sitting-on-top-of-a-shelf-9XRpBxUoAm4), [clear bottle](https://unsplash.com/photos/clear-perfume-bottle-rdHJD4JtAgc), [rose on piano keys](https://unsplash.com/photos/perfume-bottle-with-rose-on-piano-keys-mhxjuT11W5o), [white flowers](https://unsplash.com/photos/a-bottle-of-perfume-sitting-on-top-of-a-pile-of-white-flowers-ynM2_h6h2fY), [pink bottle](https://unsplash.com/photos/clear-perfume-bottle-So4eFi-d1nc), [blue background bottle](https://unsplash.com/photos/clear-glass-perfume-bottle-with-blue-background-ugP-TQTUnak), [ornate bottle](https://unsplash.com/photos/elegant-perfume-bottle-with-ornate-cap-and-label-Psce_fZjw1k), [bedside bottle](https://unsplash.com/photos/a-bottle-of-perfume-sitting-on-top-of-a-bed-6aGECgkuL3w), and [glass bottle](https://unsplash.com/photos/glass-perfume-bottle-LkT5-JCePUY).