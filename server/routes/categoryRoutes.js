const express = require('express');
const router = express.Router();
const {
  getAllCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
} = require('../controllers/categoryController');
const auth = require('../middleware/auth');
const role = require('../middleware/role');

router.get('/', getAllCategories);
router.get('/:id', getCategoryById);
router.post('/', auth, role('admin'), createCategory);
router.put('/:id', auth, role('admin'), updateCategory);
router.delete('/:id', auth, role('admin'), deleteCategory);

module.exports = router;
