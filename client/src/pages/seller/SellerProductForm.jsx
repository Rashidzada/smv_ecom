import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { createProduct, updateProduct, fetchProductById, clearProduct } from '../../features/products/productSlice';
import { fetchCategories } from '../../features/categories/categorySlice';
import toast from 'react-hot-toast';

const SellerProductForm = () => {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { product } = useSelector((state) => state.products);
  const { categories } = useSelector((state) => state.categories);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: '', description: '', price: '', category: '', stock: '',
  });
  const [images, setImages] = useState([]);
  const [existingImages, setExistingImages] = useState([]);

  useEffect(() => {
    dispatch(fetchCategories());
    if (isEdit) dispatch(fetchProductById(id));
    return () => dispatch(clearProduct());
  }, [dispatch, id, isEdit]);

  useEffect(() => {
    if (isEdit && product) {
      setFormData({
        name: product.name || '',
        description: product.description || '',
        price: product.price || '',
        category: product.category?._id || product.category || '',
        stock: product.stock || '',
      });
      setExistingImages(product.images || []);
    }
  }, [product, isEdit]);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const fd = new FormData();
    fd.append('name', formData.name);
    fd.append('description', formData.description);
    fd.append('price', formData.price);
    fd.append('category', formData.category);
    fd.append('stock', formData.stock);

    if (isEdit) {
      fd.append('existingImages', JSON.stringify(existingImages));
    }

    images.forEach((file) => fd.append('images', file));

    try {
      if (isEdit) {
        await dispatch(updateProduct({ id, formData: fd })).unwrap();
        toast.success('Product updated');
      } else {
        await dispatch(createProduct(fd)).unwrap();
        toast.success('Product created');
      }
      navigate('/seller/products');
    } catch (err) {
      toast.error(err);
    } finally {
      setLoading(false);
    }
  };

  const removeExistingImage = (img) => {
    setExistingImages(existingImages.filter((i) => i !== img));
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">{isEdit ? 'Edit Product' : 'Add New Product'}</h1>

      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl border border-gray-200 space-y-5">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Product Name</label>
          <input name="name" value={formData.name} onChange={handleChange} required
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
          <textarea name="description" value={formData.description} onChange={handleChange} required rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Price ($)</label>
            <input name="price" type="number" step="0.01" min="0" value={formData.price} onChange={handleChange} required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Stock</label>
            <input name="stock" type="number" min="0" value={formData.stock} onChange={handleChange} required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none" />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
          <select name="category" value={formData.category} onChange={handleChange} required
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none">
            <option value="">Select category</option>
            {categories.map((cat) => (
              <option key={cat._id} value={cat._id}>{cat.name}</option>
            ))}
          </select>
        </div>

        {/* Existing images */}
        {existingImages.length > 0 && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Current Images</label>
            <div className="flex gap-2 flex-wrap">
              {existingImages.map((img) => (
                <div key={img} className="relative">
                  <img src={`/uploads/${img}`} alt="" className="w-20 h-20 object-cover rounded-lg" />
                  <button type="button" onClick={() => removeExistingImage(img)}
                    className="absolute -top-1 -right-1 bg-red-500 text-white w-5 h-5 rounded-full text-xs flex items-center justify-center">
                    x
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {isEdit ? 'Add New Images' : 'Images'} (max 5)
          </label>
          <input type="file" multiple accept="image/*" onChange={(e) => setImages([...e.target.files])}
            className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:border-0 file:rounded-lg file:bg-indigo-50 file:text-indigo-600 file:font-medium hover:file:bg-indigo-100" />
        </div>

        <div className="flex gap-3">
          <button type="submit" disabled={loading}
            className="flex-1 bg-indigo-600 text-white py-2.5 rounded-lg font-medium hover:bg-indigo-700 disabled:opacity-50">
            {loading ? 'Saving...' : isEdit ? 'Update Product' : 'Create Product'}
          </button>
          <button type="button" onClick={() => navigate('/seller/products')}
            className="px-6 py-2.5 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default SellerProductForm;
