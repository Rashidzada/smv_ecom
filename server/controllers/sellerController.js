const Product = require('../models/Product');
const Order = require('../models/Order');
const ApiError = require('../utils/ApiError');
const { VALID_STATUS_TRANSITIONS } = require('../utils/constants');

// GET /api/seller/products
const getSellerProducts = async (req, res, next) => {
  try {
    const products = await Product.find({ seller: req.user._id })
      .populate('category', 'name')
      .sort({ createdAt: -1 });

    res.json({ success: true, products });
  } catch (error) {
    next(error);
  }
};

// POST /api/seller/products
const createProduct = async (req, res, next) => {
  try {
    const { name, description, price, category, stock } = req.body;

    const images = req.files ? req.files.map((f) => f.filename) : [];

    const product = await Product.create({
      seller: req.user._id,
      name,
      description,
      price,
      category,
      stock,
      images,
    });

    res.status(201).json({ success: true, product });
  } catch (error) {
    next(error);
  }
};

// PUT /api/seller/products/:id
const updateProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      throw new ApiError(404, 'Product not found');
    }

    if (product.seller.toString() !== req.user._id.toString()) {
      throw new ApiError(403, 'You can only update your own products');
    }

    const { name, description, price, category, stock, isActive } = req.body;

    if (name) product.name = name;
    if (description) product.description = description;
    if (price !== undefined) product.price = price;
    if (category) product.category = category;
    if (stock !== undefined) product.stock = stock;
    if (isActive !== undefined) product.isActive = isActive;

    // Handle new images
    if (req.files && req.files.length > 0) {
      const newImages = req.files.map((f) => f.filename);
      // Keep existing images if existingImages is provided
      const existingImages = req.body.existingImages
        ? JSON.parse(req.body.existingImages)
        : [];
      product.images = [...existingImages, ...newImages];
    }

    const updatedProduct = await product.save();
    res.json({ success: true, product: updatedProduct });
  } catch (error) {
    next(error);
  }
};

// DELETE /api/seller/products/:id
const deleteProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      throw new ApiError(404, 'Product not found');
    }

    if (product.seller.toString() !== req.user._id.toString()) {
      throw new ApiError(403, 'You can only delete your own products');
    }

    product.isActive = false;
    await product.save();

    res.json({ success: true, message: 'Product deactivated' });
  } catch (error) {
    next(error);
  }
};

// GET /api/seller/orders
const getSellerOrders = async (req, res, next) => {
  try {
    const orders = await Order.find({ 'items.seller': req.user._id })
      .populate('customer', 'name email')
      .sort({ createdAt: -1 });

    // Filter items to only show this seller's items
    const sellerOrders = orders.map((order) => {
      const orderObj = order.toObject();
      orderObj.items = orderObj.items.filter(
        (item) => item.seller.toString() === req.user._id.toString()
      );
      return orderObj;
    });

    res.json({ success: true, orders: sellerOrders });
  } catch (error) {
    next(error);
  }
};

// PUT /api/seller/orders/:id/status
const updateOrderStatus = async (req, res, next) => {
  try {
    const { status } = req.body;
    const order = await Order.findById(req.params.id);

    if (!order) {
      throw new ApiError(404, 'Order not found');
    }

    // Verify this seller has items in this order
    const hasItems = order.items.some(
      (item) => item.seller.toString() === req.user._id.toString()
    );
    if (!hasItems) {
      throw new ApiError(403, 'You do not have items in this order');
    }

    // Validate status transition
    const validNext = VALID_STATUS_TRANSITIONS[order.status];
    if (!validNext || !validNext.includes(status)) {
      throw new ApiError(400, `Cannot change status from ${order.status} to ${status}`);
    }

    order.status = status;
    if (status === 'Delivered') {
      order.deliveredAt = new Date();
    }

    await order.save();
    res.json({ success: true, order });
  } catch (error) {
    next(error);
  }
};

// GET /api/seller/analytics
const getSellerAnalytics = async (req, res, next) => {
  try {
    const sellerId = req.user._id;

    const products = await Product.countDocuments({ seller: sellerId });

    const orders = await Order.find({ 'items.seller': sellerId });

    let totalRevenue = 0;
    let totalOrders = orders.length;
    let deliveredOrders = 0;

    orders.forEach((order) => {
      order.items.forEach((item) => {
        if (item.seller.toString() === sellerId.toString()) {
          totalRevenue += item.price * item.quantity;
        }
      });
      if (order.status === 'Delivered') deliveredOrders++;
    });

    res.json({
      success: true,
      analytics: {
        totalProducts: products,
        totalOrders,
        deliveredOrders,
        totalRevenue,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getSellerProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getSellerOrders,
  updateOrderStatus,
  getSellerAnalytics,
};
