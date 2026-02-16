![Project Banner](docs/images/project_banner.svg)

# Winter Internship – Task 2 For Team (Photon)
## Smart Multi-Vendor E-Commerce Marketplace (SMV-ECOM)

### Project Documentation – MERN Stack

## 1. Project Duration
17th Jan to 16th Feb , 2026

## 2. Project Overview
The Smart Multi-Vendor E-Commerce Marketplace is a real-world MERN stack application where multiple sellers can list and sell products while customers can browse, add to cart, and place orders.

## 3. User Roles
- **Admin**: Platform management, seller approval, analytics.
- **Seller**: Product management, order handling, revenue tracking.
- **Customer**: Product browsing, cart, order placement and tracking.

## 4. Functional Requirements
- Secure authentication using JWT
- Multi-vendor product management
- Product categories and images
- Cart and checkout system
- Order creation and status tracking
- Admin, seller, and customer dashboards

## 5. Non-Functional Requirements
- Secure and scalable APIs
- Responsive UI for all devices
- Clean and maintainable codebase
- Proper error handling and validations

---

# 🛠️ Configuration & Setup Guide

## 6. Technology Stack
- **Frontend**: React.js, Redux Toolkit, Tailwind CSS, Vite
- **Backend**: Node.js, Express.js
- **Database**: MongoDB (Mongoose) - *Connected to Atlas Config*
- **Other**: Multer for image uploads, JWT for Auth
- **Deployment**: Ready for Vercel/Render

## 7. Folder Structure
- **Frontend (`client/`)**: components, pages, redux, services, hooks
- **Backend (`server/`)**: controllers, models, routes, middleware, utils, uploads

## ⚙️ How to Run Locally

### Prerequisites
- Node.js (v18+)
- Git
- MongoDB Connection String (Atlas or Local)

### 1. Backend Setup
```bash
cd server
npm install
# Create .env file with your MongoDB URI (See .env.example)
npm run seed  # (Optional) Populates the DB with dummy data
npm run dev
```

### 2. Frontend Setup
```bash
cd client
npm install
npm run dev
```

### 3. Access the Application
- **Frontend**: [http://localhost:5173](http://localhost:5173)
- **Backend API**: [http://localhost:5000](http://localhost:5000)

## 🔑 Default Credentials (for testing)

| Role | Email | Password |
|------|-------|----------|
| **Admin** | `admin@smv.com` | `password123` |
| **Seller** | `seller1@smv.com` | `password123` |
| **Customer** | `john@smv.com` | `password123` |

## 11. Security Guidelines
- Password hashing using bcrypt
- JWT-protected routes
- Role-based authorization
- Environment variables for secrets

## 12. Intern Deliverables
- Fully working e-commerce application
- Clean GitHub repository
- Live deployed link
- Final project demo

### Submission Requirements
This repository contains all necessary code, files, and folders required to run the project properly.
