const Cart = require('../models/Cart');
const Product = require('../models/Product');
const ApiError = require('../utils/ApiError');

// GET /api/cart
const getCart = async (req, res, next) => {
  try {
    let cart = await Cart.findOne({ user: req.user._id }).populate(
      'items.product',
      'name images stock price isActive'
    );

    if (!cart) {
      cart = { items: [], totalPrice: 0 };
    }

    res.json({ success: true, cart });
  } catch (error) {
    next(error);
  }
};

// POST /api/cart
const addToCart = async (req, res, next) => {
  try {
    const { productId, quantity = 1 } = req.body;

    const product = await Product.findById(productId);
    if (!product || !product.isActive) {
      throw new ApiError(404, 'Product not found or unavailable');
    }

    if (product.stock < quantity) {
      throw new ApiError(400, 'Insufficient stock');
    }

    let cart = await Cart.findOne({ user: req.user._id });

    if (!cart) {
      cart = new Cart({ user: req.user._id, items: [] });
    }

    const existingIndex = cart.items.findIndex(
      (item) => item.product.toString() === productId
    );

    if (existingIndex >= 0) {
      cart.items[existingIndex].quantity += quantity;
      if (cart.items[existingIndex].quantity > product.stock) {
        throw new ApiError(400, 'Quantity exceeds available stock');
      }
    } else {
      cart.items.push({
        product: productId,
        quantity,
        price: product.price,
      });
    }

    await cart.save();

    cart = await Cart.findOne({ user: req.user._id }).populate(
      'items.product',
      'name images stock price isActive'
    );

    res.json({ success: true, cart });
  } catch (error) {
    next(error);
  }
};

// PUT /api/cart/:productId
const updateCartItem = async (req, res, next) => {
  try {
    const { quantity } = req.body;
    const { productId } = req.params;

    if (quantity < 1) {
      throw new ApiError(400, 'Quantity must be at least 1');
    }

    const product = await Product.findById(productId);
    if (!product) {
      throw new ApiError(404, 'Product not found');
    }

    if (quantity > product.stock) {
      throw new ApiError(400, 'Quantity exceeds available stock');
    }

    let cart = await Cart.findOne({ user: req.user._id });
    if (!cart) {
      throw new ApiError(404, 'Cart not found');
    }

    const itemIndex = cart.items.findIndex(
      (item) => item.product.toString() === productId
    );

    if (itemIndex < 0) {
      throw new ApiError(404, 'Item not found in cart');
    }

    cart.items[itemIndex].quantity = quantity;
    await cart.save();

    cart = await Cart.findOne({ user: req.user._id }).populate(
      'items.product',
      'name images stock price isActive'
    );

    res.json({ success: true, cart });
  } catch (error) {
    next(error);
  }
};

// DELETE /api/cart/:productId
const removeFromCart = async (req, res, next) => {
  try {
    let cart = await Cart.findOne({ user: req.user._id });
    if (!cart) {
      throw new ApiError(404, 'Cart not found');
    }

    cart.items = cart.items.filter(
      (item) => item.product.toString() !== req.params.productId
    );

    await cart.save();

    cart = await Cart.findOne({ user: req.user._id }).populate(
      'items.product',
      'name images stock price isActive'
    );

    res.json({ success: true, cart });
  } catch (error) {
    next(error);
  }
};

// DELETE /api/cart
const clearCart = async (req, res, next) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id });
    if (cart) {
      cart.items = [];
      await cart.save();
    }
    res.json({ success: true, cart: { items: [], totalPrice: 0 } });
  } catch (error) {
    next(error);
  }
};

module.exports = { getCart, addToCart, updateCartItem, removeFromCart, clearCart };
