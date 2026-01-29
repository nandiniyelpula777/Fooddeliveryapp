import { useCart } from "../context/CartContext";
import api from "../services/api";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import toast from "react-hot-toast";

export default function Cart() {
  const { cart, removeFromCart, clearCart, totalAmount, updateQuantity } = useCart();
  const navigate = useNavigate();

  const placeOrder = async () => {
    try {
      await api.post("/orders", {
        items: cart.map((i) => ({
          foodId: i._id,
          quantity: i.quantity,
        })),
        totalAmount,
      });

      clearCart();
      toast.success("Order placed successfully! 🎉");
      navigate("/orders");
    } catch (err) {
      toast.error("Failed to place order. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Header */}
      <div className="bg-gradient-food text-white py-8 px-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold">Your Cart 🛒</h1>
          <p className="text-white/80 mt-2">
            {cart.length === 0 
              ? "Your cart is empty" 
              : `${cart.length} item${cart.length > 1 ? 's' : ''} in your cart`
            }
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-8 py-10">
        {/* Empty Cart */}
        {cart.length === 0 && (
          <div className="text-center py-16 animate-fadeInUp">
            <p className="text-8xl mb-6">🛒</p>
            <h3 className="text-2xl font-bold text-gray-700 mb-3">Your cart is empty</h3>
            <p className="text-gray-500 mb-8">Add some delicious food to get started! 😋</p>
            <button
              onClick={() => navigate("/")}
              className="btn-primary"
            >
              Browse Restaurants
            </button>
          </div>
        )}

        {/* Cart Items */}
        {cart.length > 0 && (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Items List */}
            <div className="lg:col-span-2 space-y-4">
              {cart.map((item, index) => (
                <div
                  key={item._id}
                  className="card-modern p-4 flex gap-4 items-center animate-fadeInUp"
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  {/* Image */}
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-24 h-24 object-cover rounded-xl"
                  />

                  {/* Info */}
                  <div className="flex-1">
                    <h3 className="font-bold text-lg text-gray-800">{item.name}</h3>
                    <p className="text-orange-500 font-semibold">₹{item.price}</p>
                  </div>

                  {/* Quantity Controls */}
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => updateQuantity && updateQuantity(item._id, item.quantity - 1)}
                      className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center font-bold text-gray-600 transition-colors"
                      disabled={item.quantity <= 1}
                    >
                      −
                    </button>
                    <span className="font-bold text-lg w-8 text-center">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity && updateQuantity(item._id, item.quantity + 1)}
                      className="w-8 h-8 rounded-full bg-orange-100 hover:bg-orange-200 flex items-center justify-center font-bold text-orange-600 transition-colors"
                    >
                      +
                    </button>
                  </div>

                  {/* Item Total */}
                  <div className="text-right">
                    <p className="font-bold text-lg text-gray-800">
                      ₹{item.price * item.quantity}
                    </p>
                  </div>

                  {/* Remove Button */}
                  <button
                    onClick={() => removeFromCart(item._id)}
                    className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="card-glass sticky top-24">
                <h3 className="text-xl font-bold text-gray-800 mb-6">Order Summary</h3>
                
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal</span>
                    <span>₹{totalAmount}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Delivery Fee</span>
                    <span className="text-green-600">FREE</span>
                  </div>
                  <hr className="my-4" />
                  <div className="flex justify-between text-xl font-bold text-gray-800">
                    <span>Total</span>
                    <span className="text-orange-500">₹{totalAmount}</span>
                  </div>
                </div>

                <button
                  onClick={placeOrder}
                  className="btn-primary w-full flex items-center justify-center gap-2"
                >
                  <span>🚀</span>
                  Place Order
                </button>

                <button
                  onClick={() => navigate("/")}
                  className="w-full mt-4 py-3 text-orange-500 font-semibold hover:underline"
                >
                  + Add More Items
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
