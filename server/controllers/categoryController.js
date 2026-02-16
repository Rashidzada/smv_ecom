const Category = require('../models/Category');
const ApiError = require('../utils/ApiError');

// GET /api/categories
const getAllCategories = async (req, res, next) => {
  try {
    const categories = await Category.find()
      .populate('parentCategory', 'name slug')
      .sort({ name: 1 });
    res.json({ success: true, categories });
  } catch (error) {
    next(error);
  }
};

// GET /api/categories/:id
const getCategoryById = async (req, res, next) => {
  try {
    const category = await Category.findById(req.params.id).populate(
      'parentCategory',
      'name slug'
    );
    if (!category) {
      throw new ApiError(404, 'Category not found');
    }
    res.json({ success: true, category });
  } catch (error) {
    next(error);
  }
};

// POST /api/categories (Admin only)
const createCategory = async (req, res, next) => {
  try {
    const { name, description, image, parentCategory } = req.body;
    const category = await Category.create({
      name,
      description,
      image,
      parentCategory: parentCategory || null,
    });
    res.status(201).json({ success: true, category });
  } catch (error) {
    next(error);
  }
};

// PUT /api/categories/:id (Admin only)
const updateCategory = async (req, res, next) => {
  try {
    const { name, description, image, parentCategory } = req.body;
    const category = await Category.findById(req.params.id);
    if (!category) {
      throw new ApiError(404, 'Category not found');
    }

    if (name !== undefined) category.name = name;
    if (description !== undefined) category.description = description;
    if (image !== undefined) category.image = image;
    if (parentCategory !== undefined) {
      category.parentCategory = parentCategory || null;
    }

    await category.save();
    res.json({ success: true, category });
  } catch (error) {
    next(error);
  }
};

// DELETE /api/categories/:id (Admin only)
const deleteCategory = async (req, res, next) => {
  try {
    const category = await Category.findByIdAndDelete(req.params.id);
    if (!category) {
      throw new ApiError(404, 'Category not found');
    }
    res.json({ success: true, message: 'Category deleted' });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
};
