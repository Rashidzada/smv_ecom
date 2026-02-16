const User = require('../models/User');
const Order = require('../models/Order');
const Product = require('../models/Product');
const ApiError = require('../utils/ApiError');

// GET /api/admin/sellers
const getAllSellers = async (req, res, next) => {
  try {
    const sellers = await User.find({ role: 'seller' })
      .select('-password')
      .sort({ createdAt: -1 });
    res.json({ success: true, sellers });
  } catch (error) {
    next(error);
  }
};

// PUT /api/admin/sellers/:id/approve
const approveSeller = async (req, res, next) => {
  try {
    const seller = await User.findById(req.params.id);
    if (!seller || seller.role !== 'seller') {
      throw new ApiError(404, 'Seller not found');
    }
    seller.isApproved = true;
    await seller.save();
    res.json({ success: true, message: 'Seller approved', seller: { _id: seller._id, name: seller.name, isApproved: seller.isApproved } });
  } catch (error) {
    next(error);
  }
};

// PUT /api/admin/sellers/:id/reject
const rejectSeller = async (req, res, next) => {
  try {
    const seller = await User.findById(req.params.id);
    if (!seller || seller.role !== 'seller') {
      throw new ApiError(404, 'Seller not found');
    }
    seller.isApproved = false;
    await seller.save();
    res.json({ success: true, message: 'Seller rejected', seller: { _id: seller._id, name: seller.name, isApproved: seller.isApproved } });
  } catch (error) {
    next(error);
  }
};

// GET /api/admin/users
const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find().select('-password').sort({ createdAt: -1 });
    res.json({ success: true, users });
  } catch (error) {
    next(error);
  }
};

// DELETE /api/admin/users/:id
const deleteUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      throw new ApiError(404, 'User not found');
    }
    if (user.role === 'admin') {
      throw new ApiError(400, 'Cannot delete admin user');
    }
    await User.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'User deleted' });
  } catch (error) {
    next(error);
  }
};

// GET /api/admin/orders
const getAllOrders = async (req, res, next) => {
  try {
    const orders = await Order.find()
      .populate('customer', 'name email')
      .sort({ createdAt: -1 });
    res.json({ success: true, orders });
  } catch (error) {
    next(error);
  }
};

// GET /api/admin/analytics
const getAnalytics = async (req, res, next) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalCustomers = await User.countDocuments({ role: 'customer' });
    const totalSellers = await User.countDocuments({ role: 'seller' });
    const pendingSellers = await User.countDocuments({ role: 'seller', isApproved: false });
    const totalProducts = await Product.countDocuments();
    const totalOrders = await Order.countDocuments();

    const revenueResult = await Order.aggregate([
      { $match: { status: { $ne: 'Cancelled' } } },
      { $group: { _id: null, totalRevenue: { $sum: '$totalPrice' } } },
    ]);

    const totalRevenue = revenueResult.length > 0 ? revenueResult[0].totalRevenue : 0;

    const ordersByStatus = await Order.aggregate([
      { $group: { _id: '$status', count: { $sum: 1 } } },
    ]);

    const recentOrders = await Order.find()
      .populate('customer', 'name email')
      .sort({ createdAt: -1 })
      .limit(5);

    res.json({
      success: true,
      analytics: {
        totalUsers,
        totalCustomers,
        totalSellers,
        pendingSellers,
        totalProducts,
        totalOrders,
        totalRevenue,
        ordersByStatus,
        recentOrders,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllSellers,
  approveSeller,
  rejectSeller,
  getAllUsers,
  deleteUser,
  getAllOrders,
  getAnalytics,
};
