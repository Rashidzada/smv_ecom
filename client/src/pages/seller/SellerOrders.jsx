import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSellerOrders, updateOrderItemStatus } from '../../features/orders/orderSlice';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import { formatCurrency } from '../../utils/formatCurrency';
import { formatDate } from '../../utils/formatDate';
import { STATUS_COLORS } from '../../utils/constants';
import toast from 'react-hot-toast';

const STATUS_TRANSITIONS = {
  Pending: ['Processing'],
  Processing: ['Shipped'],
  Shipped: ['Delivered'],
};

const SellerOrders = () => {
  const dispatch = useDispatch();
  const { sellerOrders, loading } = useSelector((state) => state.orders);

  useEffect(() => {
    dispatch(fetchSellerOrders());
  }, [dispatch]);

  const handleStatusUpdate = (orderId, status) => {
    if (!status) return;
    dispatch(updateOrderItemStatus({ orderId, status }))
      .unwrap()
      .then(() => {
        toast.success('Status updated');
      })
      .catch((err) => toast.error(err || 'Failed to update'));
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Orders</h1>

      {sellerOrders.length === 0 ? (
        <div className="text-center py-16 text-gray-500">No orders yet.</div>
      ) : (
        <div className="space-y-4">
          {sellerOrders.map((order) => (
            <div key={order._id} className="bg-white rounded-xl border border-gray-200 p-5">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <span className="text-sm text-gray-500">Order #{order._id.slice(-8).toUpperCase()}</span>
                  <p className="text-sm text-gray-400">{formatDate(order.createdAt)}</p>
                  <p className="text-sm text-gray-600 mt-1">Customer: {order.customer?.name || 'N/A'}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${STATUS_COLORS[order.status] || 'bg-gray-100'}`}>
                    {order.status}
                  </span>
                  {(STATUS_TRANSITIONS[order.status] || []).length > 0 && (
                    <select
                      value=""
                      onChange={(e) => handleStatusUpdate(order._id, e.target.value)}
                      className="text-sm border border-gray-300 rounded-lg px-2 py-1"
                    >
                      <option value="" disabled>Update Status</option>
                      {(STATUS_TRANSITIONS[order.status] || []).map((s) => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  )}
                </div>
              </div>
              <div className="space-y-2">
                {order.items?.map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between text-sm bg-gray-50 rounded-lg px-3 py-2">
                    <span className="text-gray-700">{item.name || 'Product'} x {item.quantity}</span>
                    <span className="font-medium">{formatCurrency(item.price * item.quantity)}</span>
                  </div>
                ))}
              </div>
              <div className="mt-3 text-right font-bold text-indigo-600">
                Total: {formatCurrency(order.totalPrice)}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SellerOrders;
