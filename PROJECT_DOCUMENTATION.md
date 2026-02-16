# Winter Internship - Task 2 (Team Photon)
## Smart Multi-Vendor E-Commerce Marketplace (SMV-ECOM)
## Project Documentation - MERN Stack

## 1. Project Duration
- January 17, 2026 to February 16, 2026

## 2. Project Overview
SMV-ECOM is a MERN marketplace where:
- Multiple sellers can list and manage products.
- Customers can discover products, manage cart, and place orders.
- Admin controls seller approvals, categories, users, orders, and analytics.

## 3. User Roles
- Admin: platform control, seller approval, user/order oversight, analytics
- Seller: product CRUD, order handling, revenue/product/order insights
- Customer: browse, search, cart operations, checkout, order tracking/cancel

## 4. Functional Requirements Coverage
- Secure authentication using JWT: implemented
- Multi-vendor product management: implemented
- Product categories and images: implemented
- Cart and checkout system: implemented
- Order creation and status tracking: implemented
- Admin, seller, and customer dashboards: implemented

## 5. Non-Functional Requirements Coverage
- Secure and scalable APIs: role middleware, error middleware, JWT guards
- Responsive UI: Tailwind-based responsive layout and pages
- Clean maintainable code: module-based frontend/backend separation
- Error handling and validation: centralized API errors and model validation

## 6. Technology Stack
- Frontend: React.js, Redux Toolkit, Tailwind CSS
- Backend: Node.js, Express.js
- Database: MongoDB with Mongoose
- Other: Multer for image upload handling
- Deployment targets: Vercel (frontend), Render (backend), MongoDB Atlas

## 7. Database Schemas
- User: `name`, `email`, `password`, `role`, seller profile fields, approval flag
- Product: `name`, `description`, `price`, `stock`, `images`, `seller`, `category`
- Order: `customer`, `items`, `shippingAddress`, `totalPrice`, `status`, timestamps
- Category: `name`, `slug`, `parentCategory`, optional metadata fields
- Cart: user cart with line items and computed total

## 8. API Modules
- Authentication APIs: register, login, profile get/update
- Product APIs: list, search/filter, detail
- Category APIs: list/detail/admin CRUD
- Cart APIs: fetch/add/update/remove/clear
- Order APIs: create/list/detail/cancel
- Seller APIs: product CRUD, order status updates, analytics
- Admin APIs: seller approval/rejection, users, orders, analytics

## 9. Folder Structure
Frontend (`client/src`)
- `components`, `pages`, `features` (redux slices), `api`, `routes`, `utils`, `app`

Backend (`server`)
- `controllers`, `models`, `routes`, `middleware`, `utils`, `config`, `seed`, `uploads`

## 10. Development Timeline (4 Weeks)
- Week 1: base setup, auth, role middleware, profile flow
- Week 2: categories, products, cart integration
- Week 3: order flow and role dashboards
- Week 4: bug fixes, validation hardening, smoke tests, cleanup, documentation

## 11. Security Guidelines Implemented
- Password hashing with `bcryptjs`
- JWT-protected routes
- Role-based authorization middleware
- Environment variables for secrets/config
- Restricted seller operations for non-approved accounts

## 12. Testing and Deployment
- API smoke-tested locally (auth, cart, checkout, seller status updates)
- Frontend lint/build validated
- Seed script validated for fresh test data generation
- Deployment-ready structure for Vercel/Render/Atlas

## 13. Intern Deliverables Checklist
- Fully working e-commerce application: completed
- Clean repository structure: cleaned from accidental/temporary folders
- Live deployed link: pending deployment
- Final demo: pending recording/presentation
