const express = require('express');
const router = express.Router();
const {
  getSellerProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getSellerOrders,
  updateOrderStatus,
  getSellerAnalytics,
} = require('../controllers/sellerController');
const auth = require('../middleware/auth');
const role = require('../middleware/role');
const upload = require('../config/multer');

router.use(auth, role('seller'));

router.get('/products', getSellerProducts);
router.post('/products', upload.array('images', 5), createProduct);
router.put('/products/:id', upload.array('images', 5), updateProduct);
router.delete('/products/:id', deleteProduct);
router.get('/orders', getSellerOrders);
router.put('/orders/:id/status', updateOrderStatus);
router.get('/analytics', getSellerAnalytics);

module.exports = router;
