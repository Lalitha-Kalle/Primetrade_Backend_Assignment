import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Register = () => {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "user" // Default role
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const result = await register(formData);
      if (result.success) {
        navigate("/dashboard");
      } else {
        setError(result.message);
      }
    } catch (err) {
      setError(err.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">Register</h2>
        
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        <div className="space-y-4">
          <div>
            <label className="block text-gray-700 mb-2">Name</label>
            <input
              type="text"
              name="name"
              className="w-full border px-3 py-2 rounded"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-2">Email</label>
            <input
              type="email"
              name="email"
              className="w-full border px-3 py-2 rounded"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-2">Password</label>
            <input
              type="password"
              name="password"
              className="w-full border px-3 py-2 rounded"
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
              required
              minLength={6}
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-2">Role</label>
            <input
              type="text"
              name="role"
              className="w-full border px-3 py-2 rounded"
              value={formData.role}
              onChange={(e) => setFormData({...formData, role: e.target.value.toLowerCase()})}
              placeholder="Enter 'user' or 'admin'"
              pattern="^(user|admin)$"
              title="Please enter either 'user' or 'admin'"
              required
            />
            <p className="text-sm text-gray-500 mt-1">
              Enter either 'user' or 'admin'
            </p>
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded mt-6 hover:bg-blue-600 disabled:opacity-50"
          disabled={loading}
        >
          {loading ? "Registering..." : "Register"}
        </button>
      </form>
    </div>
  );
};

export default Register;