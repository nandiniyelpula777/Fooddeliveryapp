import { useState } from "react";
import api from "../services/api";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";

export default function Register() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  // Button is only enabled when all fields have values
  const isFormValid = 
    form.name.trim() !== "" && 
    form.email.trim() !== "" && 
    form.password.trim() !== "";

  const submit = async (e) => {
    e.preventDefault();
    if (!isFormValid) return;

    try {
      setLoading(true);

      // 1️⃣ Register user
      await api.post("/auth/register", form);

      // 2️⃣ Show success toast
      toast.success("Registration successful! Logging you in...");

      // 3️⃣ Auto-login after a short delay
      setTimeout(async () => {
        try {
          await login(form.email, form.password);
          navigate("/", { replace: true });
        } catch (err) {
          toast.error("Auto-login failed. Please login manually.");
          navigate("/login");
        }
      }, 1000);
    } catch (err) {
      const message = err.response?.data?.message || err.response?.data?.msg || "Registration failed";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-warm flex items-center justify-center p-4">
      <div className="w-full max-w-md animate-fadeInUp">
        {/* Logo/Brand */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
            Foodify 🍔
          </h1>
          <p className="text-gray-600 mt-2">Create your account and start ordering</p>
        </div>

        {/* Register Card */}
        <div className="card-glass">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Create Account</h2>

          <form onSubmit={submit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Full Name
              </label>
              <input
                type="text"
                className="input-modern"
                placeholder="John Doe"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                disabled={loading}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <input
                type="email"
                className="input-modern"
                placeholder="you@example.com"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                disabled={loading}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <input
                type="password"
                className="input-modern"
                placeholder="••••••••"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                disabled={loading}
              />
            </div>

            <button
              type="submit"
              disabled={!isFormValid || loading}
              className="btn-primary w-full flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Creating account...
                </>
              ) : (
                "Create Account"
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Already have an account?{" "}
              <Link 
                to="/login" 
                className="text-orange-500 font-semibold hover:text-orange-600 transition-colors"
              >
                Sign in
              </Link>
            </p>
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-gray-500 text-sm mt-6">
          Join thousands of food lovers today 🍕
        </p>
      </div>
    </div>
  );
}
