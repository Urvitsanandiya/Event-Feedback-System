export default function StarRating({ rating, setRating }) {
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          type="button"
          key={star}
          onClick={() => setRating(star)}
          className={`text-2xl ${star <= rating ? 'text-yellow-500' : 'text-gray-400'}`}
        >
          ★
        </button>
      ))}
    </div>
  );
}
