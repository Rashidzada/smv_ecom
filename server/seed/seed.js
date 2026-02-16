const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '..', '.env') });

const User = require('../models/User');
const Category = require('../models/Category');
const Product = require('../models/Product');
const Cart = require('../models/Cart');
const Order = require('../models/Order');

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');

    // Clear all collections
    await User.deleteMany({});
    await Category.deleteMany({});
    await Product.deleteMany({});
    await Cart.deleteMany({});
    await Order.deleteMany({});
    console.log('Cleared all collections');

    // Create Admin
    const admin = await User.create({
      name: 'Admin User',
      email: 'admin@smv.com',
      password: 'password123',
      role: 'admin',
      isApproved: true,
    });
    console.log('Admin created: admin@smv.com / password123');

    // Create Sellers
    const seller1 = await User.create({
      name: 'Tech Store',
      email: 'seller1@smv.com',
      password: 'password123',
      role: 'seller',
      storeName: 'TechZone',
      storeDescription: 'Premium electronics and gadgets',
      isApproved: true,
      phone: '555-0101',
    });

    const seller2 = await User.create({
      name: 'Fashion Hub',
      email: 'seller2@smv.com',
      password: 'password123',
      role: 'seller',
      storeName: 'StyleCraft',
      storeDescription: 'Trendy clothing and accessories',
      isApproved: true,
      phone: '555-0102',
    });

    const seller3 = await User.create({
      name: 'Pending Seller',
      email: 'seller3@smv.com',
      password: 'password123',
      role: 'seller',
      storeName: 'NewShop',
      storeDescription: 'Waiting for approval',
      isApproved: false,
    });

    console.log('Sellers created (seller1@smv.com, seller2@smv.com approved; seller3@smv.com pending)');

    // Create Customers
    const customers = await User.create([
      { name: 'John Doe', email: 'john@smv.com', password: 'password123', role: 'customer' },
      { name: 'Jane Smith', email: 'jane@smv.com', password: 'password123', role: 'customer' },
      { name: 'Bob Wilson', email: 'bob@smv.com', password: 'password123', role: 'customer' },
      { name: 'Alice Brown', email: 'alice@smv.com', password: 'password123', role: 'customer' },
      { name: 'Charlie Davis', email: 'charlie@smv.com', password: 'password123', role: 'customer' },
    ]);
    console.log('5 Customers created');

    // Create Categories
    const categories = await Category.insertMany([
      { name: 'Electronics', description: 'Electronic devices and gadgets' },
      { name: 'Clothing', description: 'Fashion and apparel' },
      { name: 'Home & Kitchen', description: 'Home appliances and kitchen essentials' },
      { name: 'Sports', description: 'Sports equipment and fitness gear' },
      { name: 'Books', description: 'Books and educational materials' },
      { name: 'Beauty', description: 'Beauty and personal care products' },
    ]);
    console.log('6 Categories created');

    const [electronics, clothing, homeKitchen, sports, books, beauty] = categories;

    // Create Products
    const products = await Product.insertMany([
      // TechZone (Electronics)
      {
        seller: seller1._id,
        name: 'Wireless Bluetooth Headphones',
        description: 'Premium noise-cancelling wireless headphones with 30-hour battery life.',
        price: 79.99,
        category: electronics._id,
        stock: 50,
        images: ['https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80'],
        averageRating: 4.5,
        numReviews: 120,
      },
      {
        seller: seller1._id,
        name: 'Smart Watch Pro',
        description: 'Advanced fitness tracker with heart rate monitor and GPS.',
        price: 199.99,
        category: electronics._id,
        stock: 30,
        images: ['https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&q=80'],
        averageRating: 4.2,
        numReviews: 85,
      },
      {
        seller: seller1._id,
        name: 'USB-C Hub Adapter',
        description: '7-in-1 USB-C hub with HDMI 4K and USB 3.0.',
        price: 34.99,
        category: electronics._id,
        stock: 100,
        images: ['https://images.unsplash.com/photo-1625723044792-5db5b8e9725f?w=500&q=80'],
        averageRating: 4.0,
        numReviews: 200,
      },
      // ... (more products with images)
      {
        seller: seller1._id,
        name: 'Portable Bluetooth Speaker',
        description: 'Waterproof portable speaker with 360-degree sound.',
        price: 49.99,
        category: electronics._id,
        stock: 75,
        images: ['https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500&q=80'],
        averageRating: 4.3,
        numReviews: 150,
      },
      {
        seller: seller1._id,
        name: 'Mechanical Gaming Keyboard',
        description: 'RGB backlit mechanical keyboard with Cherry MX switches.',
        price: 89.99,
        category: electronics._id,
        stock: 40,
        images: ['https://images.unsplash.com/photo-1587829741301-308231f8904e?w=500&q=80'],
        averageRating: 4.7,
        numReviews: 95,
      },

      // StyleCraft (Clothing & Fashion)
      {
        seller: seller2._id,
        name: 'Classic Denim Jacket',
        description: 'Timeless denim jacket made from premium cotton.',
        price: 59.99,
        category: clothing._id,
        stock: 45,
        images: ['https://images.unsplash.com/photo-1576871337632-b9aef4c17ab9?w=500&q=80'],
        averageRating: 4.4,
        numReviews: 70,
      },
      {
        seller: seller2._id,
        name: 'Running Shoes Ultra',
        description: 'Lightweight running shoes with cushioned sole.',
        price: 119.99,
        category: sports._id,
        stock: 35,
        images: ['https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&q=80'],
        averageRating: 4.5,
        numReviews: 110,
      },
      {
        seller: seller2._id,
        name: 'Cotton T-Shirt Pack',
        description: 'Set of 3 premium cotton t-shirts in basic colors.',
        price: 39.99,
        category: clothing._id,
        stock: 80,
        images: ['https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&q=80'],
        averageRating: 4.1,
        numReviews: 200,
      },
      {
        seller: seller2._id,
        name: 'Organic Skincare Set',
        description: 'Complete skincare routine with natural ingredients.',
        price: 54.99,
        category: beauty._id,
        stock: 40,
        images: ['https://images.unsplash.com/photo-1556228578-8d89e5c4a45a?w=500&q=80'],
        averageRating: 4.6,
        numReviews: 65,
      },
      {
        seller: seller2._id,
        name: 'Stainless Steel Water Bottle',
        description: 'Double-walled insulated water bottle.',
        price: 24.99,
        category: sports._id,
        stock: 100,
        images: ['https://images.unsplash.com/photo-1602143407151-0111419500be?w=500&q=80'],
        averageRating: 4.4,
        numReviews: 180,
      },
      {
        seller: seller2._id,
        name: 'Non-Stick Cookware Set',
        description: '10-piece non-stick cookware set.',
        price: 89.99,
        category: homeKitchen._id,
        stock: 25,
        images: ['https://images.unsplash.com/photo-1584990347449-37e54348232c?w=500&q=80'],
        averageRating: 4.2,
        numReviews: 55,
      },
      {
        seller: seller1._id,
        name: 'Programming with JavaScript',
        description: 'Comprehensive guide to modern JavaScript development.',
        price: 29.99,
        category: books._id,
        stock: 60,
        images: ['https://images.unsplash.com/photo-1532012197267-da84d127e765?w=500&q=80'],
        averageRating: 4.6,
        numReviews: 45,
      }
    ]);

    console.log(`${products.length} Products created`);

    // Summary
    console.log('\n--- Seed Complete ---');
    console.log('Login credentials (all passwords: password123):');
    console.log('  Admin:    admin@smv.com');
    console.log('  Seller 1: seller1@smv.com (TechZone - approved)');
    console.log('  Seller 2: seller2@smv.com (StyleCraft - approved)');
    console.log('  Seller 3: seller3@smv.com (NewShop - pending)');
    console.log('  Customer: john@smv.com, jane@smv.com, bob@smv.com, alice@smv.com, charlie@smv.com');

    process.exit(0);
  } catch (error) {
    console.error('Seed error:', error);
    process.exit(1);
  }
};

seedDB();
