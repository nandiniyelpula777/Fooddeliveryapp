import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";

export default function Navbar() {
  const { user, logout } = useAuth();
  const { cart } = useCart();

  return (
    <nav className="nav-modern">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <span className="text-2xl">🍔</span>
          <span className="text-xl font-bold bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent group-hover:from-orange-300 group-hover:to-red-300 transition-all">
            Foodify
          </span>
        </Link>

        {/* Navigation Links */}
        <div className="flex items-center gap-2">
          {/* Welcome Message */}
          {user && (
            <span className="text-gray-400 text-sm mr-4 hidden sm:block">
              Hello, <span className="text-white font-medium">{user.name?.split(' ')[0] || 'User'}</span>
            </span>
          )}

          {/* Cart Link */}
          <Link to="/cart" className="nav-link flex items-center gap-2 relative">
            <span>🛒</span>
            <span className="hidden sm:inline">Cart</span>
            {cart.length > 0 && (
              <span className="badge absolute -top-1 -right-1 animate-bounce-in">
                {cart.length}
              </span>
            )}
          </Link>

          {/* Orders Link */}
          <Link to="/orders" className="nav-link flex items-center gap-2">
            <span>📦</span>
            <span className="hidden sm:inline">Orders</span>
          </Link>

          {/* Logout Button */}
          <button 
            onClick={logout} 
            className="nav-link flex items-center gap-2 text-red-400 hover:text-red-300 hover:bg-red-500/10"
          >
            <span>🚪</span>
            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>
      </div>
    </nav>
  );
}
