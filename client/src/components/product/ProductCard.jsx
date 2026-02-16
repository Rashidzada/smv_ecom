import { Link } from 'react-router-dom';
import { HiStar } from 'react-icons/hi2';
import { formatCurrency } from '../../utils/formatCurrency';

const ProductCard = ({ product }) => {
  const imgSrc = product.images?.[0]
    ? `/uploads/${product.images[0]}`
    : 'https://placehold.co/400x300/e2e8f0/64748b?text=No+Image';

  return (
    <Link to={`/products/${product._id}`} className="group bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
      <div className="aspect-[4/3] overflow-hidden bg-gray-100">
        <img src={imgSrc} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
      </div>
      <div className="p-4">
        <h3 className="font-medium text-gray-900 truncate">{product.name}</h3>
        <div className="flex items-center gap-1 mt-1">
          <HiStar className="h-4 w-4 text-yellow-400" />
          <span className="text-sm text-gray-600">{product.averageRating?.toFixed(1) || '0.0'}</span>
          <span className="text-sm text-gray-400">({product.numReviews || 0})</span>
        </div>
        <div className="flex items-center justify-between mt-2">
          <span className="text-lg font-bold text-indigo-600">{formatCurrency(product.price)}</span>
          {product.stock === 0 && (
            <span className="text-xs bg-red-100 text-red-600 px-2 py-0.5 rounded-full">Out of stock</span>
          )}
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
