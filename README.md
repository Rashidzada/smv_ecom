![Project Banner](docs/images/project_banner.png)

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

## 6. Technology Stack
- **Frontend**: React.js, Redux Toolkit, Tailwind CSS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB (Mongoose)
- **Other**: Multer for image uploads
- **Deployment**: Vercel, Render, MongoDB Atlas

## 7. Database Schemas
- **User**: name, email, password, role
- **Product**: title, description, price, stock, images, sellerId
- **Order**: customerId, items, totalAmount, status, createdAt
- **Category**: name, parentCategory

## 8. API Modules
Authentication APIs, Product APIs, Category APIs, Cart APIs, Order APIs, Admin APIs following REST standards.

## 9. Folder Structure
- **Frontend**: components, pages, redux, services, hooks
- **Backend**: controllers, models, routes, middleware, utils, uploads

## 10. Development Timeline (4 Weeks)
- **Week 1**: Project setup, authentication, role management
- **Week 2**: Product, category, and cart modules
- **Week 3**: Order flow and dashboards
- **Week 4**: Security, testing, deployment, and documentation

## 11. Security Guidelines
- Password hashing using bcrypt
- JWT-protected routes
- Role-based authorization
- Environment variables for secrets

## 12. Testing & Deployment
Test APIs using Postman, verify frontend flows, deploy backend and frontend on cloud platforms.

## 13. Intern Deliverables
- Fully working e-commerce application
- Clean GitHub repository
- Live deployed link
- Final project demo

### Submission Requirements
Submit your complete project via Google Classroom. Upload all necessary code, files, and folders required to run your project properly. Incomplete or missing files may result in rejection.

### Evaluation Criteria
(To be filled by evaluator)
