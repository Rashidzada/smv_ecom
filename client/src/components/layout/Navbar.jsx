import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../features/auth/authSlice';
import { clearCartState } from '../../features/cart/cartSlice';
import { HiShoppingCart, HiUser, HiBars3, HiXMark } from 'react-icons/hi2';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const { items } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cartCount = items.reduce((sum, item) => sum + item.quantity, 0);

  const handleLogout = () => {
    dispatch(logout());
    dispatch(clearCartState());
    navigate('/login');
    setMenuOpen(false);
  };

  const getDashboardLink = () => {
    if (!user) return '/login';
    if (user.role === 'admin') return '/admin';
    if (user.role === 'seller') return '/seller';
    return '/orders';
  };

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="text-xl font-bold text-indigo-600">
            SMV Marketplace
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-6">
            <Link to="/products" className="text-gray-600 hover:text-gray-900">
              Products
            </Link>
            {user && user.role === 'customer' && (
              <Link to="/cart" className="relative text-gray-600 hover:text-gray-900">
                <HiShoppingCart className="h-6 w-6" />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-indigo-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </Link>
            )}
            {user ? (
              <div className="flex items-center gap-4">
                <Link to={getDashboardLink()} className="flex items-center gap-1 text-gray-600 hover:text-gray-900">
                  <HiUser className="h-5 w-5" />
                  <span className="text-sm">{user.name}</span>
                </Link>
                <button onClick={handleLogout} className="text-sm text-red-600 hover:text-red-800">
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Link to="/login" className="text-sm text-gray-600 hover:text-gray-900">Login</Link>
                <Link to="/register" className="text-sm bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700">
                  Register
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden p-2">
            {menuOpen ? <HiXMark className="h-6 w-6" /> : <HiBars3 className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden pb-4 space-y-2">
            <Link to="/products" onClick={() => setMenuOpen(false)} className="block py-2 text-gray-600">Products</Link>
            {user && user.role === 'customer' && (
              <Link to="/cart" onClick={() => setMenuOpen(false)} className="block py-2 text-gray-600">
                Cart {cartCount > 0 && `(${cartCount})`}
              </Link>
            )}
            {user ? (
              <>
                <Link to={getDashboardLink()} onClick={() => setMenuOpen(false)} className="block py-2 text-gray-600">
                  Dashboard
                </Link>
                <button onClick={handleLogout} className="block py-2 text-red-600">Logout</button>
              </>
            ) : (
              <>
                <Link to="/login" onClick={() => setMenuOpen(false)} className="block py-2 text-gray-600">Login</Link>
                <Link to="/register" onClick={() => setMenuOpen(false)} className="block py-2 text-gray-600">Register</Link>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
