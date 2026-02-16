const Order = require('../models/Order');
const Cart = require('../models/Cart');
const Product = require('../models/Product');
const ApiError = require('../utils/ApiError');

// POST /api/orders
const createOrder = async (req, res, next) => {
  try {
    const { shippingAddress } = req.body;

    if (!shippingAddress || !shippingAddress.street || !shippingAddress.city ||
      !shippingAddress.state || !shippingAddress.zipCode || !shippingAddress.country) {
      throw new ApiError(400, 'Complete shipping address is required');
    }

    const cart = await Cart.findOne({ user: req.user._id }).populate('items.product');

    if (!cart || cart.items.length === 0) {
      throw new ApiError(400, 'Cart is empty');
    }

    // Build order items and validate stock
    const orderItems = [];
    for (const item of cart.items) {
      const product = item.product;

      if (!product || !product.isActive) {
        throw new ApiError(400, `Product "${item.product?.name || 'Unknown'}" is no longer available`);
      }

      if (product.stock < item.quantity) {
        throw new ApiError(400, `Insufficient stock for "${product.name}". Available: ${product.stock}`);
      }

      orderItems.push({
        product: product._id,
        seller: product.seller,
        name: product.name,
        image: product.images[0] || '',
        price: product.price,
        quantity: item.quantity,
      });
    }

    // Calculate prices
    const itemsPrice = orderItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    const shippingPrice = itemsPrice > 100 ? 0 : 10;
    const taxPrice = Number((itemsPrice * 0.05).toFixed(2));
    const totalPrice = Number((itemsPrice + shippingPrice + taxPrice).toFixed(2));

    // Create order
    const order = await Order.create({
      customer: req.user._id,
      items: orderItems,
      shippingAddress,
      itemsPrice,
      shippingPrice,
      taxPrice,
      totalPrice,
    });

    // Decrement stock
    for (const item of orderItems) {
      await Product.findByIdAndUpdate(item.product, {
        $inc: { stock: -item.quantity },
      });
    }

    // Clear cart
    cart.items = [];
    await cart.save();

    res.status(201).json({ success: true, order });
  } catch (error) {
    next(error);
  }
};

// GET /api/orders/my
const getMyOrders = async (req, res, next) => {
  try {
    const orders = await Order.find({ customer: req.user._id }).sort({
      createdAt: -1,
    });
    res.json({ success: true, orders });
  } catch (error) {
    next(error);
  }
};

// GET /api/orders/:id
const getOrderById = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id).populate(
      'customer',
      'name email'
    );

    if (!order) {
      throw new ApiError(404, 'Order not found');
    }

    // Only the customer, a seller with items, or admin can view
    const isCustomer = order.customer._id.toString() === req.user._id.toString();
    const isSeller = order.items.some(
      (item) => item.seller.toString() === req.user._id.toString()
    );
    const isAdmin = req.user.role === 'admin';

    if (!isCustomer && !isSeller && !isAdmin) {
      throw new ApiError(403, 'Not authorized to view this order');
    }

    res.json({ success: true, order });
  } catch (error) {
    next(error);
  }
};

// PUT /api/orders/:id/cancel
const cancelOrder = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      throw new ApiError(404, 'Order not found');
    }

    if (order.customer.toString() !== req.user._id.toString()) {
      throw new ApiError(403, 'Not authorized to cancel this order');
    }

    if (order.status !== 'Pending') {
      throw new ApiError(400, 'Can only cancel pending orders');
    }

    order.status = 'Cancelled';
    order.cancelledAt = new Date();
    await order.save();

    // Restore stock
    for (const item of order.items) {
      await Product.findByIdAndUpdate(item.product, {
        $inc: { stock: item.quantity },
      });
    }

    res.json({ success: true, order });
  } catch (error) {
    next(error);
  }
};

module.exports = { createOrder, getMyOrders, getOrderById, cancelOrder };
