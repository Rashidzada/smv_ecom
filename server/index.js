const express = require('express');
const cors = require('cors');
const path = require('path');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const errorHandler = require('./middleware/errorHandler');

dotenv.config();

const app = express();

// Connect to database
connectDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve uploaded images
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// API Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/categories', require('./routes/categoryRoutes'));
app.use('/api/products', require('./routes/productRoutes'));
app.use('/api/seller', require('./routes/sellerRoutes'));
app.use('/api/cart', require('./routes/cartRoutes'));
app.use('/api/orders', require('./routes/orderRoutes'));
app.use('/api/admin', require('./routes/adminRoutes'));

// API Root / Welcome Page
app.get(['/', '/api'], (req, res) => {
  const html = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>SMV E-Commerce API</title>
      <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif; line-height: 1.6; color: #333; max-width: 800px; margin: 0 auto; padding: 20px; }
        h1 { color: #2563eb; border-bottom: 2px solid #eee; padding-bottom: 10px; }
        .status { background: #dcfce7; color: #166534; padding: 10px 15px; border-radius: 6px; display: inline-block; font-weight: bold; margin-bottom: 20px; }
        .endpoint-group { margin-bottom: 20px; background: #f8fafc; padding: 15px; border-radius: 8px; border: 1px solid #e2e8f0; }
        h2 { margin-top: 0; font-size: 1.2rem; color: #475569; }
        code { background: #e2e8f0; padding: 2px 6px; border-radius: 4px; font-family: monospace; color: #be185d; }
        ul { margin: 10px 0 0 0; padding-left: 20px; }
        li { margin-bottom: 5px; }
        a { color: #2563eb; text-decoration: none; }
        a:hover { text-decoration: underline; }
      </style>
    </head>
    <body>
      <h1>🚀 SMV E-Commerce API</h1>
      <div class="status">✅ System Status: Operational</div>
      <p>Welcome to the backend API for the Smart Multi-Vendor E-Commerce Marketplace.</p>
      
      <div class="endpoint-group">
        <h2>🛍️ Products & Categories</h2>
        <ul>
          <li><code>GET /api/products</code> - List all products</li>
          <li><code>GET /api/categories</code> - List all categories</li>
        </ul>
      </div>

      <div class="endpoint-group">
        <h2>👤 Users & Auth</h2>
        <ul>
          <li><code>POST /api/auth/register</code> - Register new user</li>
          <li><code>POST /api/auth/login</code> - Login user</li>
        </ul>
      </div>

      <div class="endpoint-group">
        <h2>📦 Orders & Cart</h2>
        <ul>
          <li><code>GET /api/cart</code> - View cart (Requires Auth)</li>
          <li><code>GET /api/orders/myorders</code> - View my orders (Requires Auth)</li>
        </ul>
      </div>

      <div class="endpoint-group">
        <h2>🔧 System</h2>
        <ul>
          <li><code>GET /api/health</code> - <a href="/api/health">Health Check</a></li>
        </ul>
      </div>

      <p style="font-size: 0.9rem; color: #64748b; margin-top: 40px;">
        Deployed on Render | Database on MongoDB Atlas
      </p>
    </body>
    </html>
  `;
  res.send(html);
});

// Health check JSON
app.get('/api/health', (req, res) => {
  res.json({ success: true, message: 'SMV API is running' });
});

// Error handler
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
