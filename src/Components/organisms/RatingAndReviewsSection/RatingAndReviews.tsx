import React from "react";
import Rating from "react-ratings-declarative";
import { BarChart, Bar, XAxis, Tooltip } from "recharts";

const RatingSection: React.FC = () => {
  const averageRating = 4.5;
  const totalRatings = 101;
  const ratingDistribution = [
    { rating: 5, percentage: 86, color: "#fbbf24" }, // Yellow
    { rating: 4, percentage: 4, color: "#22c55e" }, // Green
    { rating: 3, percentage: 1, color: "#fde047" }, // Light Yellow
    { rating: 2, percentage: 3, color: "#fb923c" }, // Orange
    { rating: 1, percentage: 6, color: "#ef4444" }, // Red
  ];

  return (
    <div className="flex flex-col md:flex-row gap-8 p-6 bg-[#f8f4ee] rounded-lg">
      {/* Average Rating */}
      <div className="flex flex-col items-center">
        <h2 className="text-4xl font-bold text-wine">{averageRating.toFixed(1)}</h2>
        <Rating
          rating={averageRating}
          widgetRatedColors="#fbbf24" // Yellow color for stars
          widgetDimensions="30px"
          widgetSpacings="2px"
        >
          {[...Array(5)].map((_, i) => (
            <Rating.Widget key={i} />
          ))}
        </Rating>
        <p className="text-sm text-gray-500">Based on {totalRatings} ratings</p>
      </div>

      {/* Rating Distribution */}
      <div className="flex-1">
        <BarChart
          width={300}
          height={150}
          data={ratingDistribution}
          layout="vertical"
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <XAxis type="number" hide />
          <Tooltip formatter={(value: number) => `${value}%`} />
          <Bar
            dataKey="percentage"
            fill="#8884d8"
            radius={[0, 10, 10, 0]}
            label={{ position: "right", fill: "#8884d8" }}
          >
            {ratingDistribution.map((entry, index) => (
              <Bar key={`bar-${index}`} fill={entry.color} />
            ))}
          </Bar>
        </BarChart>
        <div className="flex flex-col gap-2 mt-4">
          {ratingDistribution.map((item) => (
            <div key={item.rating} className="flex items-center gap-2">
              <span className="text-sm font-bold">{item.rating}★</span>
              <span className="text-sm text-gray-500">
                {item.percentage}%
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RatingSection;
