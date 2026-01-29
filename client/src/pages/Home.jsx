import { useEffect, useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useAuth } from "../context/AuthContext";

export default function Home() {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    api.get("/restaurants")
      .then((res) => setRestaurants(res.data))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Hero Section */}
      <div className="bg-gradient-food text-white py-12 px-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 animate-fadeInUp">
            Welcome back, {user?.name?.split(' ')[0] || 'Foodie'}! 👋
          </h1>
          <p className="text-xl text-white/90 animate-fadeInUp" style={{ animationDelay: '0.1s' }}>
            Discover delicious food from your favorite restaurants
          </p>
        </div>
      </div>

      {/* Restaurants Section */}
      <div className="max-w-7xl mx-auto px-8 py-10">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-gray-800">
            🍽️ Popular Restaurants
          </h2>
          <span className="text-gray-500">{restaurants.length} restaurants available</span>
        </div>

        {/* Loading Skeleton */}
        {loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="bg-white rounded-2xl p-6 shadow-lg">
                <div className="skeleton h-6 w-3/4 mb-4"></div>
                <div className="skeleton h-4 w-1/2 mb-2"></div>
                <div className="skeleton h-4 w-1/4"></div>
              </div>
            ))}
          </div>
        )}

        {/* Restaurants Grid */}
        {!loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {restaurants.map((r, index) => (
              <div
                key={r._id}
                onClick={() => navigate(`/restaurant/${r._id}`)}
                className="card-modern p-6 cursor-pointer group animate-fadeInUp"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                {/* Restaurant Icon */}
                <div className="w-14 h-14 bg-gradient-to-br from-orange-100 to-red-100 rounded-xl flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform">
                  🍴
                </div>

                {/* Restaurant Info */}
                <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-orange-500 transition-colors">
                  {r.name}
                </h3>
                
                <p className="text-gray-500 mb-3 flex items-center gap-2">
                  <span className="w-2 h-2 bg-orange-400 rounded-full"></span>
                  {r.cuisine}
                </p>

                {/* Rating */}
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-semibold">
                    ⭐ {r.rating}
                  </span>
                </div>

                {/* Hover Arrow */}
                <div className="mt-4 flex items-center text-orange-500 font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                  View Menu 
                  <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && restaurants.length === 0 && (
          <div className="text-center py-16">
            <p className="text-6xl mb-4">🍽️</p>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">No restaurants found</h3>
            <p className="text-gray-500">Check back later for delicious options!</p>
          </div>
        )}
      </div>
    </div>
  );
}
