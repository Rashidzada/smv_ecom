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
      // TechZone products (seller1)
      {
        seller: seller1._id,
        name: 'Wireless Bluetooth Headphones',
        description: 'Premium noise-cancelling wireless headphones with 30-hour battery life. Features deep bass, comfortable ear cushions, and foldable design.',
        price: 79.99,
        category: electronics._id,
        stock: 50,
        images: [],
        averageRating: 4.5,
        numReviews: 120,
      },
      {
        seller: seller1._id,
        name: 'Smart Watch Pro',
        description: 'Advanced fitness tracker with heart rate monitor, GPS, and 7-day battery. Water resistant up to 50m.',
        price: 199.99,
        category: electronics._id,
        stock: 30,
        images: [],
        averageRating: 4.2,
        numReviews: 85,
      },
      {
        seller: seller1._id,
        name: 'USB-C Hub Adapter',
        description: '7-in-1 USB-C hub with HDMI 4K, USB 3.0, SD card reader, and PD charging support.',
        price: 34.99,
        category: electronics._id,
        stock: 100,
        images: [],
        averageRating: 4.0,
        numReviews: 200,
      },
      {
        seller: seller1._id,
        name: 'Portable Bluetooth Speaker',
        description: 'Waterproof portable speaker with 360-degree sound. 12-hour playtime, built-in microphone.',
        price: 49.99,
        category: electronics._id,
        stock: 75,
        images: [],
        averageRating: 4.3,
        numReviews: 150,
      },
      {
        seller: seller1._id,
        name: 'Mechanical Gaming Keyboard',
        description: 'RGB backlit mechanical keyboard with Cherry MX switches. Anti-ghosting, programmable keys.',
        price: 89.99,
        category: electronics._id,
        stock: 40,
        images: [],
        averageRating: 4.7,
        numReviews: 95,
      },
      {
        seller: seller1._id,
        name: 'Programming with JavaScript',
        description: 'Comprehensive guide to modern JavaScript development. Covers ES6+, Node.js, and React.',
        price: 29.99,
        category: books._id,
        stock: 60,
        images: [],
        averageRating: 4.6,
        numReviews: 45,
      },

      // StyleCraft products (seller2)
      {
        seller: seller2._id,
        name: 'Classic Denim Jacket',
        description: 'Timeless denim jacket made from premium cotton. Perfect for layering in any season.',
        price: 59.99,
        category: clothing._id,
        stock: 45,
        images: [],
        averageRating: 4.4,
        numReviews: 70,
      },
      {
        seller: seller2._id,
        name: 'Running Shoes Ultra',
        description: 'Lightweight running shoes with cushioned sole and breathable mesh upper. Ideal for daily training.',
        price: 119.99,
        category: sports._id,
        stock: 35,
        images: [],
        averageRating: 4.5,
        numReviews: 110,
      },
      {
        seller: seller2._id,
        name: 'Cotton T-Shirt Pack (3)',
        description: 'Set of 3 premium cotton t-shirts in black, white, and navy. Comfortable fit for everyday wear.',
        price: 39.99,
        category: clothing._id,
        stock: 80,
        images: [],
        averageRating: 4.1,
        numReviews: 200,
      },
      {
        seller: seller2._id,
        name: 'Yoga Mat Premium',
        description: 'Non-slip yoga mat with alignment lines. 6mm thick, eco-friendly TPE material.',
        price: 29.99,
        category: sports._id,
        stock: 60,
        images: [],
        averageRating: 4.3,
        numReviews: 88,
      },
      {
        seller: seller2._id,
        name: 'Organic Skincare Set',
        description: 'Complete skincare routine with cleanser, toner, moisturizer, and serum. All-natural ingredients.',
        price: 54.99,
        category: beauty._id,
        stock: 40,
        images: [],
        averageRating: 4.6,
        numReviews: 65,
      },
      {
        seller: seller2._id,
        name: 'Stainless Steel Water Bottle',
        description: 'Double-walled insulated water bottle. Keeps drinks cold 24hrs or hot 12hrs. BPA-free.',
        price: 24.99,
        category: sports._id,
        stock: 100,
        images: [],
        averageRating: 4.4,
        numReviews: 180,
      },
      {
        seller: seller2._id,
        name: 'Non-Stick Cookware Set',
        description: '10-piece non-stick cookware set with glass lids. Dishwasher safe, PFOA-free coating.',
        price: 89.99,
        category: homeKitchen._id,
        stock: 25,
        images: [],
        averageRating: 4.2,
        numReviews: 55,
      },
      {
        seller: seller2._id,
        name: 'Bamboo Cutting Board Set',
        description: 'Set of 3 organic bamboo cutting boards. Antimicrobial, easy to clean, knife-friendly surface.',
        price: 19.99,
        category: homeKitchen._id,
        stock: 70,
        images: [],
        averageRating: 4.0,
        numReviews: 90,
      },
      {
        seller: seller1._id,
        name: 'Wireless Charging Pad',
        description: 'Fast wireless charging pad compatible with all Qi-enabled devices. Slim design with LED indicator.',
        price: 19.99,
        category: electronics._id,
        stock: 90,
        images: [],
        averageRating: 4.1,
        numReviews: 130,
      },
      {
        seller: seller2._id,
        name: 'Hair Care Bundle',
        description: 'Shampoo, conditioner, and hair mask set for all hair types. Sulfate-free, natural extracts.',
        price: 34.99,
        category: beauty._id,
        stock: 55,
        images: [],
        averageRating: 4.3,
        numReviews: 75,
      },
      {
        seller: seller1._id,
        name: 'Data Structures & Algorithms',
        description: 'Master data structures and algorithms with practical examples in Python and Java.',
        price: 39.99,
        category: books._id,
        stock: 45,
        images: [],
        averageRating: 4.8,
        numReviews: 60,
      },
      {
        seller: seller2._id,
        name: 'Resistance Bands Set',
        description: 'Set of 5 resistance bands with different strengths. Includes door anchor, handles, and carry bag.',
        price: 22.99,
        category: sports._id,
        stock: 85,
        images: [],
        averageRating: 4.2,
        numReviews: 140,
      },
      {
        seller: seller2._id,
        name: 'Casual Hoodie',
        description: 'Soft fleece-lined hoodie with kangaroo pocket. Available in multiple colors.',
        price: 44.99,
        category: clothing._id,
        stock: 50,
        images: [],
        averageRating: 4.5,
        numReviews: 95,
      },
      {
        seller: seller1._id,
        name: 'LED Desk Lamp',
        description: 'Adjustable LED desk lamp with 5 brightness levels and 3 color temperatures. USB charging port.',
        price: 32.99,
        category: homeKitchen._id,
        stock: 65,
        images: [],
        averageRating: 4.4,
        numReviews: 110,
      },
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
