import React from 'react';
import MuiRating from '@mui/material/Rating';
import { Box, Typography } from '@mui/material';
import {CustomRatingProps} from "@types";

//convert rate from string to number
const CustomRating: React.FC<CustomRatingProps> = ({ rate, mode }) => {
  return (
    <Box className="flex items-center">
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
      
      {mode === 'show' && (
        <Typography className="font-Poppins font-semibold text-wine ml-2">
          {Number(rate).toFixed(2)}
        </Typography>
      )}
    </Box>
  );
};

export default CustomRating;
