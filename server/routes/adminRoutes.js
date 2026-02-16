const express = require('express');
const router = express.Router();
const {
  getAllSellers,
  approveSeller,
  rejectSeller,
  getAllUsers,
  deleteUser,
  getAllOrders,
  getAnalytics,
} = require('../controllers/adminController');
const auth = require('../middleware/auth');
const role = require('../middleware/role');

router.use(auth, role('admin'));

router.get('/sellers', getAllSellers);
router.put('/sellers/:id/approve', approveSeller);
router.put('/sellers/:id/reject', rejectSeller);
router.get('/users', getAllUsers);
router.delete('/users/:id', deleteUser);
router.get('/orders', getAllOrders);
router.get('/analytics', getAnalytics);

module.exports = router;
