import React, { useState, useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import {CustomRating} from "@components/atoms";
import { RatingDistributionItem } from "@types";
import { calculateRatingDistribution, getColorForRating } from '@utils/calculations';

interface RatingSectionProps {
  ratingsData: number[];
};

const RatingSection: React.FC<RatingSectionProps> = ({ ratingsData }) => {
  const [ratingDistribution, setRatingDistribution] = useState<RatingDistributionItem[]>([]);
  const [averageRating, setAverageRating] = useState(0);
  const [totalRatings, setTotalRatings] = useState(0);

  useEffect(() => {
    const distribution = calculateRatingDistribution(ratingsData);
    setRatingDistribution(distribution);

    const total = ratingsData.reduce((sum, rating) => sum + rating, 0);
    const average = total / ratingsData.length;
    setAverageRating(average);

    setTotalRatings(ratingsData.length);
  }, [ratingsData]);

  return (
    <Box className="flex flex-col md:flex-row md:mx-8 gap-8 p-2 justify-between md:items-center bg-mainColor rounded-lg">
      <Box className="flex flex-col items-center md:items-start">
        <Typography
          variant="h2"
          className="font-Poppins text-4xl font-bold text-wine"
        >
          {averageRating.toFixed(1)}
        </Typography>

        <CustomRating rate={averageRating} mode="hide" />

        <Typography
          sx={{ fontSize: "1em", color: "#7c1d1d" }} 
          className="font-Poppins font-medium"
        >
          Based on {totalRatings} ratings
        </Typography>
      </Box>

      <Box className="flex md:w-[50%] flex-col gap-4 mt-4 md:mt-0">
        {ratingDistribution
          .slice()
          .reverse()
          .map((item) => {
            const starColor = getColorForRating(item.rating);
            return (
              <Box key={item.rating} className="flex items-center gap-2 mb-2">
                <Typography sx={{ fontSize: "1.5em"}}  className="text-black font-Poppins font-medium">
                  {item.rating} 
                  <span style={{ color: starColor }}>★</span>
                </Typography>

                {/* Rating Progress Bar */}
                <Box className="flex items-center w-full bg-gray-200 rounded-md h-3">
                  <Box
                    style={{
                      width: `${item.percentage}%`,
                      backgroundColor: item.color,
                    }}
                    className="h-full rounded-md"
                  />
                </Box>
                <Typography sx={{ fontSize: "1em"}} className="text-black font-Poppins font-medium">
                  {item.percentage}%
                </Typography>
              </Box>
            );
          })}
      </Box>
    </Box>
  );
};

export default RatingSection;