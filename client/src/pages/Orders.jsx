import { useEffect, useState } from "react";
import api from "../services/api";
import Navbar from "../components/Navbar";

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("/orders")
      .then((res) => setOrders(res.data))
      .finally(() => setLoading(false));
  }, []);

  const getStatusBadge = (status) => {
    const statusLower = status?.toLowerCase() || 'pending';
    
    switch (statusLower) {
      case 'delivered':
        return <span className="status-delivered">✅ Delivered</span>;
      case 'confirmed':
      case 'preparing':
        return <span className="status-confirmed">🍳 Preparing</span>;
      case 'pending':
      default:
        return <span className="status-pending">⏳ Pending</span>;
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Header */}
      <div className="bg-gradient-food text-white py-8 px-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold">My Orders 📦</h1>
          <p className="text-white/80 mt-2">
            {orders.length === 0 
              ? "No orders yet" 
              : `${orders.length} order${orders.length > 1 ? 's' : ''} placed`
            }
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-8 py-10">
        {/* Loading Skeleton */}
        {loading && (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white rounded-2xl p-6 shadow-lg">
                <div className="skeleton h-6 w-1/4 mb-4"></div>
                <div className="skeleton h-4 w-1/3 mb-2"></div>
                <div className="skeleton h-4 w-1/2"></div>
              </div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && orders.length === 0 && (
          <div className="text-center py-16 animate-fadeInUp">
            <p className="text-8xl mb-6">📦</p>
            <h3 className="text-2xl font-bold text-gray-700 mb-3">No orders yet</h3>
            <p className="text-gray-500 mb-2">Your hunger journey starts now! 🍽️</p>
            <p className="text-gray-400">Place your first order and it will appear here.</p>
          </div>
        )}

        {/* Orders List */}
        {!loading && orders.length > 0 && (
          <div className="space-y-4">
            {orders.map((order, index) => (
              <div
                key={order._id}
                className="card-modern p-6 animate-fadeInUp"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                {/* Order Header */}
                <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Order ID</p>
                    <p className="font-mono text-gray-600 text-sm">
                      #{order._id?.slice(-8).toUpperCase()}
                    </p>
                  </div>
                  
                  {getStatusBadge(order.status)}
                </div>

                {/* Order Details */}
                <div className="flex flex-wrap items-end justify-between gap-4 pt-4 border-t border-gray-100">
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Order Total</p>
                    <p className="text-2xl font-bold text-orange-500">
                      ₹{order.totalAmount}
                    </p>
                  </div>

                  <div className="text-right">
                    <p className="text-sm text-gray-500 mb-1">Ordered on</p>
                    <p className="text-gray-600 font-medium">
                      {formatDate(order.createdAt)}
                    </p>
                  </div>
                </div>

                {/* Order Items (if available) */}
                {order.items && order.items.length > 0 && (
                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <p className="text-sm text-gray-500 mb-2">Items</p>
                    <div className="flex flex-wrap gap-2">
                      {order.items.map((item, idx) => (
                        <span 
                          key={idx}
                          className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm"
                        >
                          {item.foodId?.name || 'Item'} × {item.quantity}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
