export default function FeedbackCard({ event, comment, rating }) {
  return (
    <div className="bg-gray-800 hover:bg-gray-700 p-6 rounded-xl shadow-lg transform transition-transform hover:scale-105 text-white space-y-3">
      <h3 className="text-2xl font-semibold">{event}</h3>
      {comment && <p className="text-gray-300 text-sm">{comment}</p>}
      <div className="text-yellow-400 text-lg">
        {"★".repeat(rating)}
        {"☆".repeat(5 - rating)}
      </div>
    </div>
  );
}
