import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../services/api";
import { useCart } from "../context/CartContext";
import Navbar from "../components/Navbar";
import toast from "react-hot-toast";

export default function Restaurant() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [restaurant, setRestaurant] = useState(null);

  useEffect(() => {
    // Fetch foods and restaurant info
    api.get(`/foods/${id}`)
      .then((res) => setFoods(res.data))
      .finally(() => setLoading(false));
    
    api.get(`/restaurants/${id}`)
      .then((res) => setRestaurant(res.data))
      .catch(() => {});
  }, [id]);

  const handleAddToCart = (food) => {
    addToCart(food);
    toast.success(`${food.name} added to cart!`, {
      icon: '🛒',
      duration: 2000,
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Header */}
      <div className="bg-gradient-food text-white py-8 px-8">
        <div className="max-w-7xl mx-auto">
          <button 
            onClick={() => navigate("/")}
            className="flex items-center gap-2 text-white/80 hover:text-white mb-4 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Restaurants
          </button>
          <h1 className="text-3xl md:text-4xl font-bold">
            {restaurant?.name || 'Menu'} 🍽️
          </h1>
          {restaurant && (
            <p className="text-white/80 mt-2">{restaurant.cuisine} • ⭐ {restaurant.rating}</p>
          )}
        </div>
      </div>

      {/* Fixed Cart Button */}
      <button
        onClick={() => navigate("/cart")}
        className="fixed bottom-6 right-6 btn-primary flex items-center gap-2 z-40 shadow-2xl"
      >
        <span>🛒</span>
        Go to Cart
      </button>

      {/* Menu Section */}
      <div className="max-w-7xl mx-auto px-8 py-10">
        <h2 className="text-2xl font-bold text-gray-800 mb-8">
          🍕 Today's Menu
        </h2>

        {/* Loading Skeleton */}
        {loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="bg-white rounded-2xl overflow-hidden shadow-lg">
                <div className="skeleton h-48 w-full"></div>
                <div className="p-5">
                  <div className="skeleton h-6 w-3/4 mb-3"></div>
                  <div className="skeleton h-5 w-1/4 mb-4"></div>
                  <div className="skeleton h-10 w-full rounded-lg"></div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Foods Grid */}
        {!loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {foods.map((food, index) => (
              <div
                key={food._id}
                className="card-modern group animate-fadeInUp"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                {/* Food Image */}
                <div className="relative overflow-hidden h-48">
                  <img
                    src={food.image}
                    alt={food.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </div>

                {/* Food Info */}
                <div className="p-5">
                  <h3 className="font-bold text-lg text-gray-800 mb-2 group-hover:text-orange-500 transition-colors">
                    {food.name}
                  </h3>
                  
                  <p className="text-2xl font-bold text-orange-500 mb-4">
                    ₹{food.price}
                  </p>

                  <button
                    onClick={() => handleAddToCart(food)}
                    className="btn-primary w-full flex items-center justify-center gap-2"
                  >
                    <span>➕</span>
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && foods.length === 0 && (
          <div className="text-center py-16">
            <p className="text-6xl mb-4">🍳</p>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">No menu items found</h3>
            <p className="text-gray-500">This restaurant hasn't added their menu yet.</p>
          </div>
        )}
      </div>
    </div>
  );
}
