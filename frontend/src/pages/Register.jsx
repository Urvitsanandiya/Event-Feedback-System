import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/users/register`,
        { email, password },
        { withCredentials: true }
      );
      sessionStorage.setItem("token", res.data.token);
      toast.success("Registration successful! Redirecting...", {
        onClose: () => (window.location.href = "/feedback"),
        autoClose: 2000,
      });
    } catch (err) {
      if (err.response?.status === 400) {
        toast.error("User already exists. Redirecting to login...", {
          onClose: () => (window.location.href = "/login"),
          autoClose: 2000,
        });
      } else {
        toast.error("Registration failed. Please try again.");
        console.error(err);
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
      <ToastContainer position="top-center" autoClose={3000} />
      <form
        onSubmit={handleRegister}
        className="bg-gray-800 p-6 rounded shadow-md w-full max-w-sm space-y-4"
      >
        <h2 className="text-2xl font-bold text-center">Register</h2>
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
          className="w-full text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
        >
          Register
        </button>

        {/* Link to Login page */}
        <p className="text-sm text-center mt-2">
          Already have an account?{" "}
          <Link to="/" className="text-blue-400 hover:underline">
            Login here
          </Link>
        </p>
      </form>
    </div>
  );
}
