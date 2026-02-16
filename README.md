# Smart Multi-Vendor E-Commerce Marketplace (SMV-ECOM)

Production-style MERN marketplace where admins manage the platform, sellers manage products/orders, and customers browse, purchase, and track orders.

## Tech Stack
- Frontend: React, Redux Toolkit, React Router, Tailwind CSS, Axios
- Backend: Node.js, Express.js, JWT Auth, Multer
- Database: MongoDB + Mongoose

## Implemented Scope
- JWT authentication and profile APIs
- Role-based authorization (`admin`, `seller`, `customer`)
- Seller approval flow by admin
- Category management (with optional parent category)
- Product listing/search/filter/pagination
- Seller product CRUD with image upload
- Customer cart management
- Checkout with shipping address validation
- Order creation, status flow, and cancellation
- Admin analytics, user/seller/order management dashboards
- Seller analytics and order status update dashboard

## Project Structure
```text
smv/
  client/    # React frontend
  server/    # Express backend
```

## Local Setup
1. Backend
```bash
cd server
npm install
cp .env.example .env
npm run seed
npm run dev
```

2. Frontend (new terminal)
```bash
cd client
npm install
npm run dev
```

3. Open `http://localhost:5173`

## Environment Variables (`server/.env`)
```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/smv
JWT_SECRET=change_this_in_production
JWT_EXPIRE=7d
NODE_ENV=development
```

## Seed Login Accounts
All passwords: `password123`
- Admin: `admin@smv.com`
- Seller (approved): `seller1@smv.com`
- Seller (approved): `seller2@smv.com`
- Seller (pending): `seller3@smv.com`
- Customers: `john@smv.com`, `jane@smv.com`, `bob@smv.com`, `alice@smv.com`, `charlie@smv.com`

## API Modules
- `/api/auth`
- `/api/categories`
- `/api/products`
- `/api/cart`
- `/api/orders`
- `/api/seller`
- `/api/admin`

## Notes
- Uploaded images are served from `/uploads`.
- Seed script clears existing data before inserting fresh data.
- This repository should be submitted without generated folders like `node_modules` and `dist`.
