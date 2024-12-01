import React from 'react';
import MuiRating from '@mui/material/Rating';
import { Box, Typography } from '@mui/material';

const CustomRating: React.FC<{ rate: number }> = ({ rate }) => {
  return (
    <Box className="flex items-center">
      {/* Rating Stars */}
      <MuiRating
        value={rate}
        precision={0.5}
        readOnly
        sx={{
          '& .MuiRating-iconFilled': {
            color: '#FFD700', 
          },
          '& .MuiRating-iconEmpty': {
            color: '#f4eee8', 
          },
        }}
      />

      {/* Rating Label */}
      <Typography className="font-Poppins font-semibold text-wine ml-2">
        {rate}
      </Typography>
    </Box>
  );
};

export default CustomRating;
