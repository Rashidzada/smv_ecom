import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOrderById, cancelOrder, clearOrder } from '../../features/orders/orderSlice';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import { formatCurrency } from '../../utils/formatCurrency';
import { formatDateTime } from '../../utils/formatDate';
import { STATUS_COLORS } from '../../utils/constants';
import toast from 'react-hot-toast';

const OrderDetailPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { order, loading } = useSelector((state) => state.orders);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(fetchOrderById(id));
    return () => dispatch(clearOrder());
  }, [dispatch, id]);

  const handleCancel = () => {
    if (!window.confirm('Are you sure you want to cancel this order?')) return;
    dispatch(cancelOrder(id))
      .unwrap()
      .then(() => toast.success('Order cancelled'))
      .catch((err) => toast.error(err));
  };

  if (loading || !order) return <LoadingSpinner size="lg" />;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">
          Order #{order._id.slice(-8).toUpperCase()}
        </h1>
        <span className={`text-sm px-3 py-1 rounded-full font-medium ${STATUS_COLORS[order.status] || 'bg-gray-100 text-gray-800'}`}>
          {order.status}
        </span>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 divide-y divide-gray-100">
        <div className="p-5">
          <p className="text-sm text-gray-500">Placed on {formatDateTime(order.createdAt)}</p>
        </div>

        {/* Items */}
        <div className="p-5 space-y-3">
          <h2 className="font-semibold text-gray-900 mb-3">Items</h2>
          {order.items?.map((item, idx) => {
            const imgSrc = item.image
              ? (item.image.startsWith('http') ? item.image : `${import.meta.env.VITE_API_URL.replace('/api', '')}/uploads/${item.image}`)
              : 'https://placehold.co/60x60/e2e8f0/64748b?text=N';
            return (
              <div key={idx} className="flex items-center gap-3">
                <img src={imgSrc} alt={item.name || 'Product'} className="w-14 h-14 object-cover rounded-lg" />
                <div className="flex-1">
                  <p className="font-medium text-sm">{item.name || 'Product'}</p>
                  <p className="text-xs text-gray-500">Qty: {item.quantity} x {formatCurrency(item.price)}</p>
                </div>
                <span className="font-semibold text-sm">{formatCurrency(item.price * item.quantity)}</span>
              </div>
            );
          })}
        </div>

        {/* Total */}
        <div className="p-5 flex justify-between items-center">
          <span className="font-semibold text-gray-900">Total</span>
          <span className="text-xl font-bold text-indigo-600">{formatCurrency(order.totalPrice)}</span>
        </div>
      </div>

      {/* Actions */}
      <div className="mt-6 flex gap-3">
        <button onClick={() => navigate(-1)} className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">
          Back
        </button>
        {user?.role === 'customer' && order.status === 'Pending' && (
          <button onClick={handleCancel} className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">
            Cancel Order
          </button>
        )}
      </div>
    </div>
  );
};

export default OrderDetailPage;
