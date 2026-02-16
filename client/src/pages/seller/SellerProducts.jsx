import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchSellerProducts, deleteProduct } from '../../features/products/productSlice';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import { formatCurrency } from '../../utils/formatCurrency';
import { HiPencil, HiTrash, HiPlus } from 'react-icons/hi2';
import toast from 'react-hot-toast';

const SellerProducts = () => {
  const dispatch = useDispatch();
  const { sellerProducts, loading } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchSellerProducts());
  }, [dispatch]);

  const handleDelete = (id) => {
    if (!window.confirm('Deactivate this product?')) return;
    dispatch(deleteProduct(id))
      .unwrap()
      .then(() => toast.success('Product deactivated'))
      .catch((err) => toast.error(err));
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">My Products</h1>
        <Link to="/seller/products/new" className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700">
          <HiPlus className="h-5 w-5" /> Add Product
        </Link>
      </div>

      {sellerProducts.length === 0 ? (
        <div className="text-center py-16 text-gray-500">No products yet. Add your first product.</div>
      ) : (
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="text-left px-4 py-3 font-medium text-gray-600">Product</th>
                  <th className="text-left px-4 py-3 font-medium text-gray-600">Category</th>
                  <th className="text-right px-4 py-3 font-medium text-gray-600">Price</th>
                  <th className="text-right px-4 py-3 font-medium text-gray-600">Stock</th>
                  <th className="text-right px-4 py-3 font-medium text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {sellerProducts.map((product) => (
                  <tr key={product._id} className="hover:bg-gray-50">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <img
                          src={product.images?.[0] ? `/uploads/${product.images[0]}` : 'https://placehold.co/40x40/e2e8f0/64748b?text=N'}
                          alt="" className="w-10 h-10 rounded-lg object-cover"
                        />
                        <span className="font-medium text-gray-900 truncate max-w-[200px]">{product.name}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-gray-600">{product.category?.name || 'N/A'}</td>
                    <td className="px-4 py-3 text-right font-medium">{formatCurrency(product.price)}</td>
                    <td className="px-4 py-3 text-right">
                      <span className={product.stock > 0 ? 'text-green-600' : 'text-red-600'}>{product.stock}</span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-2">
                        <Link to={`/seller/products/${product._id}/edit`} className="p-1.5 text-gray-500 hover:text-indigo-600">
                          <HiPencil className="h-4 w-4" />
                        </Link>
                        <button onClick={() => handleDelete(product._id)} className="p-1.5 text-gray-500 hover:text-red-600">
                          <HiTrash className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default SellerProducts;
