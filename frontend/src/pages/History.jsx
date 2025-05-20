import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { PencilSquareIcon } from "@heroicons/react/24/outline";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const BASE_URL = import.meta.env.VITE_API_BASE_URL + "/api";

export default function History() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editedComment, setEditedComment] = useState("");
  const [editedRating, setEditedRating] = useState(0);
  const navigate = useNavigate();

  const token = sessionStorage.getItem("token");

  const fetchFeedbacks = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/feedbacks`, {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      });
      setFeedbacks(res.data);
    } catch (error) {
      console.error("Failed to fetch feedbacks:", error);
      toast.error("Failed to fetch feedbacks.");
    }
  };

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  const deleteFeedback = async (id) => {
    try {
      await axios.delete(`${BASE_URL}/feedbacks/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      });
      setFeedbacks((prev) => prev.filter((fb) => fb._id !== id));
      toast.success("Feedback deleted successfully!");
    } catch (error) {
      console.error("Delete failed:", error);
      toast.error("Failed to delete feedback.");
    }
  };

  const startEditing = (fb) => {
    setEditingId(fb._id);
    setEditedComment(fb.comment || "");
    setEditedRating(fb.rating);
  };

  const saveEdit = async () => {
    try {
      await axios.put(
        `${BASE_URL}/feedbacks/${editingId}`,
        { comment: editedComment, rating: editedRating },
        {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        }
      );
      setEditingId(null);
      toast.success("Feedback updated successfully!");
      fetchFeedbacks();
    } catch (error) {
      console.error("Update failed:", error);
      toast.error("Failed to update feedback.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-200 px-4 py-10">
      <ToastContainer position="top-center" autoClose={3000} />
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold mb-6 text-center">Feedback History</h2>

        {feedbacks.length === 0 ? (
          <p className="text-center text-gray-400">No feedback submitted yet.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {feedbacks.map((fb) => (
              <div
                key={fb._id}
                className="bg-gray-800 p-4 rounded-md shadow border border-gray-700 flex flex-col 
                          transition transform hover:scale-105 hover:shadow-xl hover:border-purple-500 duration-300"
              >
                <h3 className="text-lg font-semibold text-white truncate">{fb.event}</h3>

                {editingId === fb._id ? (
                  <>
                    <input
                      type="number"
                      min="0"
                      max="5"
                      value={editedRating}
                      onChange={(e) => {
                        let val = Number(e.target.value);
                        if (val < 0) val = 0;
                        if (val > 5) val = 5;
                        setEditedRating(val);
                      }}
                      className="w-full mt-2 mb-2 p-2 bg-gray-900 border border-gray-600 text-white rounded"
                    />
                    <textarea
                      value={editedComment}
                      onChange={(e) => setEditedComment(e.target.value)}
                      className="w-full p-2 bg-gray-900 border border-gray-600 text-white rounded resize-none"
                      rows={4}
                    />
                    <div className="flex gap-2 mt-2">
                      <button
                        onClick={saveEdit}
                        className="bg-green-600 hover:bg-green-700 px-4 py-1 rounded text-white flex-grow"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => setEditingId(null)}
                        className="bg-gray-600 hover:bg-gray-700 px-4 py-1 rounded text-white flex-grow"
                      >
                        Cancel
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <p className="text-sm text-gray-300 mt-2">Rating: {fb.rating} ★</p>
                    {fb.comment && (
                      <p className="text-sm text-gray-400 mt-1 truncate">{fb.comment}</p>
                    )}
                    <div className="flex gap-2 mt-3">
                      <button
                        onClick={() => startEditing(fb)}
                        className="bg-yellow-300 hover:bg-yellow-400 px-3 py-1 rounded text-black font-semibold flex-grow"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => deleteFeedback(fb._id)}
                        className="bg-red-400 hover:bg-red-500 px-3 py-1 rounded text-white flex-grow"
                      >
                        Delete
                      </button>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        )}

        <div className="text-center mt-10">
          <button
            onClick={() => navigate("/feedback")}
            className="inline-flex items-center gap-2 text-white bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 
                    hover:from-pink-500 hover:to-indigo-500 transition-all duration-300 ease-in-out 
                    px-6 py-3 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 font-semibold text-lg"
          >
            <PencilSquareIcon className="h-5 w-5" />
            Leave More Feedback
          </button>
        </div>
      </div>
    </div>
  );
}
