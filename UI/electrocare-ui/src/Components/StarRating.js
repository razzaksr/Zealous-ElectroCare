// src/StarRating.js
import React, { useState } from "react";

const StarRating = ({ totalStars = 5, onRate }) => {
  const [rating, setRating] = useState(0);
  const [hovered, setHovered] = useState(0);

  const handleClick = (value) => {
    setRating(value);
    onRate(value);
  };

  return (
    <div style={{ fontSize: "2rem", color: "#f5b301", cursor: "pointer" }}>
      {[...Array(totalStars)].map((_, index) => {
        const starValue = index + 1;
        return (
          <span
            key={index}
            onClick={() => handleClick(starValue)}
            onMouseEnter={() => setHovered(starValue)}
            onMouseLeave={() => setHovered(0)}
          >
            {starValue <= (hovered || rating) ? "★" : "☆"}
          </span>
        );
      })}
    </div>
  );
};

export default StarRating;
