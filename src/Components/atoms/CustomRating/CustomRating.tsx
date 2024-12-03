import React from 'react';
import MuiRating from '@mui/material/Rating';
import { Box, Typography } from '@mui/material';

interface CustomRatingProps {
  rate: number;
  mode: 'show' | 'hide'; // New prop to control the mode
}

const CustomRating: React.FC<CustomRatingProps> = ({ rate, mode }) => {
  return (
    <Box className="flex items-center">
      {/* Rating Stars */}
      <MuiRating
        value={rate}
        precision={0.5}
        readOnly
        sx={{
          '& .MuiRating-iconFilled': {
            color: '#FFD700', // Filled stars color
          },
          '& .MuiRating-iconEmpty': {
            color: '#f4eee8', // Empty stars color
          },
        }}
      />

      {/* Rating Label - only show if mode is set to 'show' */}
      {mode === 'show' && (
        <Typography className="font-Poppins font-semibold text-wine ml-2">
          {rate}
        </Typography>
      )}
    </Box>
  );
};

export default CustomRating;
