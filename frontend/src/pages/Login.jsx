import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    setLoading(true);

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/users/login`,
        { email, password },
        { withCredentials: true }
      );

      sessionStorage.setItem("token", res.data.token);
      alert("Login successful. Redirecting to feedback...");
      navigate("/feedback");
    } catch (err) {
      const message =
        err.response?.data?.message || "Login failed. Please try again.";
      setErrorMsg(message);
      console.error("Login error:", message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white px-4">
      <form
        onSubmit={handleLogin}
        className="bg-gray-800 p-6 rounded shadow-md w-full max-w-sm space-y-4"
      >
        <h2 className="text-2xl font-bold text-center">Login</h2>

        {errorMsg && (
          <p className="text-red-500 text-center text-sm">{errorMsg}</p>
        )}

        <input
          type="email"
          placeholder="Email"
          className="w-full p-3 rounded border border-gray-700 bg-gray-900"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full p-3 rounded border border-gray-700 bg-gray-900"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button
          type="submit"
          className={`w-full py-2 rounded font-semibold bg-blue-600 hover:bg-blue-700 ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        <p className="text-sm text-center mt-2">
          Don't have an account?{" "}
          <Link to="/register" className="text-blue-400 hover:underline">
            Register here
          </Link>
        </p>
      </form>
    </div>
  );
}
