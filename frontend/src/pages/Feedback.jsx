import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import StarRating from "../components/StarRating";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  ArrowRightOnRectangleIcon,
  ClockIcon,
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

export default function FeedbackPage() {
  const [isOpen, setIsOpen] = useState(false);
  const [event, setEvent] = useState("");
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);
  const navigate = useNavigate();

  const handleLogout = () => {
    sessionStorage.removeItem("token");
    navigate("/");
  };

  const submitFeedback = async () => {
    if (!event || rating === 0) {
      toast.warning("Please fill out the event name and select a rating.");
      return;
    }

    try {
      const token = sessionStorage.getItem("token");
      await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/feedbacks`,
        { event, comment, rating },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );
      toast.success("Feedback submitted successfully!");
      setEvent("");
      setComment("");
      setRating(0);
    } catch (err) {
      console.error("Feedback submission error:", err);
      toast.error("Failed to submit feedback.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-200 flex flex-col">
      <ToastContainer position="top-center" autoClose={3000} />

      {/* Navbar */}
      <nav className="bg-gray-900 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <a className="text-white font-bold text-2xl">
              EventFeedback
            </a>

            <div className="hidden md:flex space-x-6 items-center">
              <Link
                to="/history"
                className="flex items-center gap-1 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
              >
                <ClockIcon className="h-5 w-5" />
                History
              </Link>
              <button
                onClick={handleLogout}
                className="flex items-center gap-1 bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded-md text-sm font-medium"
              >
                <ArrowRightOnRectangleIcon className="h-5 w-5" />
                Logout
              </button>
            </div>

            <div className="md:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-800"
              >
                {isOpen ? (
                  <XMarkIcon className="h-6 w-6" />
                ) : (
                  <Bars3Icon className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {isOpen && (
          <div className="md:hidden bg-gray-800">
            <div className="px-4 pt-2 pb-3 space-y-1">
              <Link
                to="/history"
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-1 px-3 py-2 rounded-md text-white hover:bg-gray-700"
              >
                <ClockIcon className="h-5 w-5" />
                History
              </Link>
              <button
                onClick={() => {
                  handleLogout();
                  setIsOpen(false);
                }}
                className="w-full px-3 py-2 rounded-md bg-red-600 hover:bg-red-700 text-white flex items-center gap-1"
              >
                <ArrowRightOnRectangleIcon className="h-5 w-5" />
                Logout
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Feedback Form */}
      <main className="flex-grow flex items-center justify-center p-6">
        <div className="max-w-xl w-full bg-gray-800 p-8 rounded-lg shadow-lg space-y-6">
          <h2 className="text-3xl font-bold text-white">Leave Feedback</h2>

          <input
            type="text"
            placeholder="Event name"
            className="w-full p-3 rounded border border-gray-700 bg-gray-900 text-white"
            value={event}
            onChange={(e) => setEvent(e.target.value)}
          />

          <textarea
            placeholder="Comment (optional)"
            className="w-full p-3 rounded border border-gray-700 bg-gray-900 text-white resize-none"
            rows={4}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />

          <StarRating rating={rating} setRating={setRating} />

          <button
            onClick={submitFeedback}
            className="w-full py-3 text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-300 font-semibold rounded-lg text-lg transition"
          >
            Submit Feedback
          </button>
        </div>
      </main>
    </div>
  );
}
