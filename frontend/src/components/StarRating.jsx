import { useState } from "react";

export default function StarRating({ rating, setRating }) {
  const [hoveredStar, setHoveredStar] = useState(0);

  return (
    <div className="flex gap-1 text-2xl cursor-pointer select-none">
      {[1, 2, 3, 4, 5].map((star) => {
        const isActive = star <= (hoveredStar || rating);
        return (
          <button
            key={star}
            type="button"
            onClick={() => setRating(star)}
            onMouseEnter={() => setHoveredStar(star)}
            onMouseLeave={() => setHoveredStar(0)}
            className={`
              transition-transform duration-150 
              ${isActive ? "text-yellow-400" : "text-gray-400"}
              hover:scale-125
            `}
            aria-label={`${star} Star`}
          >
            ★
          </button>
        );
      })}
    </div>
  );
}
