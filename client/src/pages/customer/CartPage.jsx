import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { fetchCart, updateCartItem, removeFromCart } from '../../features/cart/cartSlice';
import { createOrder } from '../../features/orders/orderSlice';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import { formatCurrency } from '../../utils/formatCurrency';
import { HiTrash, HiMinus, HiPlus } from 'react-icons/hi2';
import toast from 'react-hot-toast';

const CartPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items, totalPrice, loading } = useSelector((state) => state.cart);
  const { loading: orderLoading } = useSelector((state) => state.orders);
  const [shippingAddress, setShippingAddress] = useState(() => {
    const raw = localStorage.getItem('smv_shipping_address');
    if (!raw) {
      return {
        street: '',
        city: '',
        state: '',
        zipCode: '',
        country: 'US',
      };
    }

    try {
      const parsed = JSON.parse(raw);
      return {
        street: parsed.street || '',
        city: parsed.city || '',
        state: parsed.state || '',
        zipCode: parsed.zipCode || '',
        country: parsed.country || 'US',
      };
    } catch {
      return {
        street: '',
        city: '',
        state: '',
        zipCode: '',
        country: 'US',
      };
    }
  });

  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  useEffect(() => {
    localStorage.setItem('smv_shipping_address', JSON.stringify(shippingAddress));
  }, [shippingAddress]);

  const handleUpdateQty = (productId, quantity) => {
    if (quantity < 1) return;
    dispatch(updateCartItem({ productId, quantity }));
  };

  const handleRemove = (productId) => {
    dispatch(removeFromCart(productId));
    toast.success('Removed from cart');
  };

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setShippingAddress((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCheckout = () => {
    const requiredFields = ['street', 'city', 'state', 'zipCode', 'country'];
    const missingField = requiredFields.find(
      (field) => !shippingAddress[field]?.toString().trim()
    );

    if (missingField) {
      toast.error('Please complete shipping address before checkout');
      return;
    }

    dispatch(createOrder({ shippingAddress }))
      .unwrap()
      .then((order) => {
        toast.success('Order placed successfully!');
        navigate(`/orders/${order._id}`);
      })
      .catch((err) => toast.error(err));
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Shopping Cart</h1>

      {items.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-gray-500 mb-4">Your cart is empty</p>
          <Link to="/products" className="text-indigo-600 hover:underline font-medium">Continue Shopping</Link>
        </div>
      ) : (
        <div className="space-y-4">
          {items.map((item) => {
            const product = item.product;
            const imgSrc = product.images?.[0]
              ? (product.images[0].startsWith('http') ? product.images[0] : `${import.meta.env.VITE_API_URL.replace('/api', '')}/uploads/${product.images[0]}`)
              : 'https://placehold.co/80x80/e2e8f0/64748b?text=N';
            return (
              <div key={product._id} className="flex items-center gap-4 bg-white p-4 rounded-xl border border-gray-200">
                <img src={imgSrc} alt={product.name} className="w-20 h-20 object-cover rounded-lg" />
                <div className="flex-1 min-w-0">
                  <Link to={`/products/${product._id}`} className="font-medium text-gray-900 hover:text-indigo-600 truncate block">
                    {product.name}
                  </Link>
                  <p className="text-sm text-gray-500">{formatCurrency(product.price)} each</p>
                </div>
                <div className="flex items-center border border-gray-300 rounded-lg">
                  <button onClick={() => handleUpdateQty(product._id, item.quantity - 1)} className="p-1.5 hover:bg-gray-100">
                    <HiMinus className="h-3 w-3" />
                  </button>
                  <span className="px-3 text-sm font-medium">{item.quantity}</span>
                  <button onClick={() => handleUpdateQty(product._id, item.quantity + 1)} className="p-1.5 hover:bg-gray-100">
                    <HiPlus className="h-3 w-3" />
                  </button>
                </div>
                <span className="font-bold text-gray-900 w-24 text-right">{formatCurrency(product.price * item.quantity)}</span>
                <button onClick={() => handleRemove(product._id)} className="text-red-500 hover:text-red-700 p-1">
                  <HiTrash className="h-5 w-5" />
                </button>
              </div>
            );
          })}

          <div className="bg-white p-6 rounded-xl border border-gray-200 mt-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Shipping Address</h2>
            <div className="space-y-3">
              <input
                name="street"
                value={shippingAddress.street}
                onChange={handleAddressChange}
                placeholder="Street Address"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
              />
              <div className="grid sm:grid-cols-2 gap-3">
                <input
                  name="city"
                  value={shippingAddress.city}
                  onChange={handleAddressChange}
                  placeholder="City"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                />
                <input
                  name="state"
                  value={shippingAddress.state}
                  onChange={handleAddressChange}
                  placeholder="State"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                />
              </div>
              <div className="grid sm:grid-cols-2 gap-3">
                <input
                  name="zipCode"
                  value={shippingAddress.zipCode}
                  onChange={handleAddressChange}
                  placeholder="ZIP Code"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                />
                <input
                  name="country"
                  value={shippingAddress.country}
                  onChange={handleAddressChange}
                  placeholder="Country"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl border border-gray-200">
            <div className="flex justify-between text-lg font-bold mb-4">
              <span>Items Total</span>
              <span className="text-indigo-600">{formatCurrency(totalPrice)}</span>
            </div>
            <button
              onClick={handleCheckout}
              disabled={orderLoading}
              className="w-full bg-indigo-600 text-white py-3 rounded-lg font-medium hover:bg-indigo-700 disabled:opacity-50 transition"
            >
              {orderLoading ? 'Placing Order...' : 'Place Order'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
