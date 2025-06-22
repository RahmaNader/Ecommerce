import React from 'react';
import MuiRating from '@mui/material/Rating';
import { Box, Typography } from '@mui/material';
import { CustomRatingProps } from "@types";
import { useTranslation } from 'react-i18next'; 

const CustomRating: React.FC<CustomRatingProps> = ({ rate, mode }) => {
  const { i18n } = useTranslation();
  const isRTL = i18n.dir() === 'rtl';

  return (
    <Box className="flex items-center">
      <Box sx={isRTL ? { transform: 'scaleX(-1)' } : {}}>
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
            ...(isRTL && {
              direction: 'ltr',
            }),
          }}
        />
      </Box>
      
      {mode === 'show' && (
        <Typography 
          className="font-Poppins font-semibold text-wine"
          sx={isRTL ? { marginRight: '0.5rem' } : { marginLeft: '0.5rem' }}
        >
          {Number(rate).toFixed(2)}
        </Typography>
      )}
    </Box>
  );
};

export default CustomRating;
