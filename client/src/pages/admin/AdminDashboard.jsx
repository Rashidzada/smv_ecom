import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchAnalytics } from '../../features/admin/adminSlice';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import { formatCurrency } from '../../utils/formatCurrency';
import { formatDate } from '../../utils/formatDate';
import { STATUS_COLORS } from '../../utils/constants';
import { HiUsers, HiCube, HiShoppingBag, HiCurrencyDollar, HiUserGroup, HiExclamationTriangle } from 'react-icons/hi2';

const AdminDashboard = () => {
  const dispatch = useDispatch();
  const { analytics, loading } = useSelector((state) => state.admin);

  useEffect(() => {
    dispatch(fetchAnalytics());
  }, [dispatch]);

  if (loading || !analytics) return <LoadingSpinner />;

  const stats = [
    { label: 'Total Users', value: analytics.totalUsers, icon: HiUsers, color: 'bg-blue-50 text-blue-600' },
    { label: 'Customers', value: analytics.totalCustomers, icon: HiUserGroup, color: 'bg-green-50 text-green-600' },
    { label: 'Sellers', value: analytics.totalSellers, icon: HiCube, color: 'bg-purple-50 text-purple-600' },
    { label: 'Pending Sellers', value: analytics.pendingSellers, icon: HiExclamationTriangle, color: 'bg-yellow-50 text-yellow-600' },
    { label: 'Total Products', value: analytics.totalProducts, icon: HiCube, color: 'bg-indigo-50 text-indigo-600' },
    { label: 'Total Orders', value: analytics.totalOrders, icon: HiShoppingBag, color: 'bg-pink-50 text-pink-600' },
    { label: 'Revenue', value: formatCurrency(analytics.totalRevenue), icon: HiCurrencyDollar, color: 'bg-emerald-50 text-emerald-600' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-8">Admin Dashboard</h1>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
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

      {/* Orders by Status */}
      {analytics.ordersByStatus?.length > 0 && (
        <div className="bg-white rounded-xl border border-gray-200 p-6 mb-8">
          <h2 className="font-semibold text-gray-900 mb-4">Orders by Status</h2>
          <div className="flex flex-wrap gap-3">
            {analytics.ordersByStatus.map((item) => (
              <span key={item._id} className={`px-3 py-1.5 rounded-full text-sm font-medium ${STATUS_COLORS[item._id] || 'bg-gray-100 text-gray-800'}`}>
                {item._id}: {item.count}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Recent Orders */}
      {analytics.recentOrders?.length > 0 && (
        <div className="bg-white rounded-xl border border-gray-200 p-6 mb-8">
          <h2 className="font-semibold text-gray-900 mb-4">Recent Orders</h2>
          <div className="space-y-3">
            {analytics.recentOrders.map((order) => (
              <div key={order._id} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
                <div>
                  <span className="text-sm font-medium">#{order._id.slice(-8).toUpperCase()}</span>
                  <p className="text-xs text-gray-500">{order.customer?.name} - {formatDate(order.createdAt)}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`text-xs px-2 py-0.5 rounded-full ${STATUS_COLORS[order.status] || 'bg-gray-100'}`}>
                    {order.status}
                  </span>
                  <span className="font-medium text-sm">{formatCurrency(order.totalPrice)}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Quick Links */}
      <div className="grid md:grid-cols-4 gap-4">
        <Link to="/admin/users" className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-md transition">
          <h3 className="font-semibold">Users</h3>
          <p className="text-sm text-gray-500">Manage all users</p>
        </Link>
        <Link to="/admin/sellers" className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-md transition">
          <h3 className="font-semibold">Sellers</h3>
          <p className="text-sm text-gray-500">Approve/reject sellers</p>
        </Link>
        <Link to="/admin/orders" className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-md transition">
          <h3 className="font-semibold">Orders</h3>
          <p className="text-sm text-gray-500">View all orders</p>
        </Link>
        <Link to="/admin/categories" className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-md transition">
          <h3 className="font-semibold">Categories</h3>
          <p className="text-sm text-gray-500">Manage categories</p>
        </Link>
      </div>
    </div>
  );
};

export default AdminDashboard;
