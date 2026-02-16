const ApiError = require('../utils/ApiError');

const role = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user) {
      return next(new ApiError(401, 'Not authorized'));
    }

    if (!allowedRoles.includes(req.user.role)) {
      return next(new ApiError(403, 'Access denied. Insufficient permissions'));
    }

    // For seller routes, check if seller is approved
    if (req.user.role === 'seller' && !req.user.isApproved) {
      return next(new ApiError(403, 'Your seller account is pending approval'));
    }

    next();
  };
};

module.exports = role;
