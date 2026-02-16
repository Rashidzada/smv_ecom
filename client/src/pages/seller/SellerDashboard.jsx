import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import API from '../../api/axios';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import { formatCurrency } from '../../utils/formatCurrency';
import { HiCube, HiShoppingBag, HiCurrencyDollar, HiTruck } from 'react-icons/hi2';

const SellerDashboard = () => {
  const { user } = useSelector((state) => state.auth);
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.get('/seller/analytics')
      .then(({ data }) => setAnalytics(data.analytics))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  if (!user?.isApproved) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center">
        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-8">
          <h2 className="text-xl font-bold text-yellow-800 mb-2">Account Pending Approval</h2>
          <p className="text-yellow-700">Your seller account is waiting for admin approval. You'll be able to manage products once approved.</p>
        </div>
      </div>
    );
  }

  if (loading) return <LoadingSpinner />;

  const stats = [
    { label: 'Total Products', value: analytics?.totalProducts || 0, icon: HiCube, color: 'bg-blue-50 text-blue-600' },
    { label: 'Total Orders', value: analytics?.totalOrders || 0, icon: HiShoppingBag, color: 'bg-purple-50 text-purple-600' },
    { label: 'Revenue', value: formatCurrency(analytics?.totalRevenue || 0), icon: HiCurrencyDollar, color: 'bg-green-50 text-green-600' },
    { label: 'Delivered', value: analytics?.deliveredOrders || 0, icon: HiTruck, color: 'bg-indigo-50 text-indigo-600' },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Seller Dashboard</h1>
          <p className="text-gray-500">{user.storeName || user.name}</p>
        </div>
        <Link to="/seller/products/new" className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700">
          Add Product
        </Link>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-white rounded-xl border border-gray-200 p-5">
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${stat.color} mb-3`}>
              <stat.icon className="h-5 w-5" />
            </div>
            <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
            <p className="text-sm text-gray-500">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <Link to="/seller/products" className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition">
          <h3 className="font-semibold text-gray-900 mb-1">Manage Products</h3>
          <p className="text-sm text-gray-500">View, edit, and add new products</p>
        </Link>
        <Link to="/seller/orders" className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition">
          <h3 className="font-semibold text-gray-900 mb-1">Manage Orders</h3>
          <p className="text-sm text-gray-500">View and update order statuses</p>
        </Link>
      </div>
    </div>
  );
};

export default SellerDashboard;
