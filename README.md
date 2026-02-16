# 🛒 Smart Multi-Vendor E-Commerce Marketplace (SMV-ECOM)

![Project Banner](docs/images/dashboard_preview.png)

A production-ready **MERN Stack (MongoDB, Express, React, Node.js)** E-Commerce Marketplace application. This platform enables multiple sellers to list products, customers to shop, and admins to manage the entire ecosystem.

## 🚀 Live Demo & Repository
- **GitHub Repository**: [https://github.com/Rashidzada/smv_ecom](https://github.com/Rashidzada/smv_ecom)

## ✨ Features

### 👤 User Roles
- **Admin**: Complete platform control, User management, Seller approvals, Analytics dashboard.
- **Seller**: Product management (CRUD), Order processing, Sales analytics.
- **Customer**: Browse products, Shopping Cart, Checkout, Order tracking.

### 🛍️ Core Functionality
- **Authentication**: Secure JWT-based auth with Role-Based Access Control (RBAC).
- **Product Management**: Categories, Image Uploads, Inventory tracking.
- **Shopping Experience**: Filter & Search, Responsive Design, Cart management.
- **Order System**: Complete order lifecycle (Placed -> Processing -> Shipped -> Delivered).
- **Dashboards**: Specialized dashboards for Admin, Seller, and Customers.

## 🛠️ Technology Stack

**Frontend:**
- React.js 19
- Redux Toolkit (State Management)
- Tailwind CSS v4 (Styling)
- React Router DOM
- Vite (Build Tool)

**Backend:**
- Node.js & Express.js
- MongoDB & Mongoose (Database)
- JWT (Authentication)
- Multer (File Uploads)

## 📸 Screenshots

| Product View | Dashboard |
|:---:|:---:|
| ![Product](docs/images/product_preview_1.jpg) | ![Dashboard](docs/images/dashboard_preview.png) |

## ⚙️ Installation & Setup

Follow these steps to run the complete project locally.

### Prerequisites
- Node.js (v18+)
- MongoDB (Local or Atlas)
- Git

### 1. Clone the Repository
```bash
git clone https://github.com/Rashidzada/smv_ecom.git
cd smv_ecom
```

### 2. Backend Setup
```bash
cd server
# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Seed the database (Optional: Populates random data)
npm run seed

# Start the server
npm run dev
```

> **Note**: Ensure your `.env` file uses your MongoDB Connection string.

### 3. Frontend Setup
Open a new terminal:
```bash
cd client
# Install dependencies
npm install

# Start the frontend
npm run dev
```

### 4. Access the App
- **Frontend**: [http://localhost:5173](http://localhost:5173)
- **Backend API**: [http://localhost:5000](http://localhost:5000)

## 🔑 Default Login Credentials
Use these accounts to test different roles (Password: `password123`):

| Role | Email |
|------|-------|
| **Admin** | `admin@smv.com` |
| **Seller** | `seller1@smv.com` |
| **Customer** | `john@smv.com` |

## 📂 Project Structure
```text
smv-ecom/
├── client/          # Frontend React Application
│   ├── src/
│   │   ├── components/  # Reusable UI components
│   │   ├── pages/       # Page views
│   │   ├── features/    # Redux slices
│   └── ...
├── server/          # Backend Node.js API
│   ├── controllers/ # Logic for routes
│   ├── models/      # Mongoose schemas
│   ├── routes/      # API endpoints
│   └── ...
└── docs/            # Documentation assets
```

## 🤝 Contributing
Contributions are welcome! Please fork the repository and create a pull request.

## 📝 License
This project is open-source and available under the [MIT License](LICENSE).
