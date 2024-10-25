import { Box, Container } from '@mui/material';
import Carousel from 'react-material-ui-carousel';
import x from '@assets/test_slider.png';
import line from '@assets/HP_line.svg';
import React from 'react';
import { Button } from '@components/atoms';
import bluer from '@assets/Blur.svg'; // Assuming this is your background image

interface Item {
  text: string;
  img: string;
  line: string;
}

const items: Item[] = [
  {
    text: "Find Your Perfect Blend of Our Traditional and Modern Fashion",
    img: x,
    line: line,
  },{
    text: "Find Your Perfect Blend of Our Traditional and Modern Fashion",
    img: x,
    line: line,
  },
 
];

const Slider: React.FC = () => {
  return (
    <div className='relative mx-[50px] mt-10 mb-20'>
      {/* Blurred background */}
      <div 
        className="absolute inset-0 bg-cover bg-center filter blur-md z-0 "
        style={{ backgroundImage: `url(${bluer})` }} 
      />
      
      <Container 
        sx={{ py: 4 }}
        maxWidth={false}
      >
        <Carousel
          navButtonsAlwaysVisible
          indicators={false}
          animation="slide"
          autoPlay={false}
          navButtonsProps={{
            style: {
              backgroundColor: '#710e12',
              width:"56px",
              height:"56px",
              // margin:'20px'
            },
           
          }}
        >
          {items.map((item, i) => (
            <SliderItem key={i} {...item} />
          ))}
        </Carousel>
      </Container>
    </div>
  );
};

const SliderItem: React.FC<Item> = React.memo(({ text, img, line }) => {
  return (
    <div className='flex flex-col md:flex-row justify-center relative z-10'> {/* Ensure content is above the background */}
      <div className='mt-10 md:w-[60%] w-full items-center'>
        <div className='px-6 md:px-24'> {/* Responsive padding */}
          <p className='font-instrumentSerif text-[40px] md:text-[60px] lg:text-[80px] leading-[1.2] text-sevenColor'>
            {text.split(' ').map((word, index) => (
              <span key={index} className={word === 'Blend' || word === 'Traditional' || word === 'Fashion' ? 'text-sixColor' : ''}>
                {word}{' '}
              </span>
            ))}
          </p>
        </div>
        <div className='mt-8 md:mt-12 px-6 md:px-24'>
          <img src={line} alt="Line" className="mb-9 md:w-auto" />
          <Button label='view collection'  />
        </div>
      </div>

      <div className='flex md:w-[40%] w-full mt-6 md:mt-0  '> 
        <img src={img} alt="Fashion" />
      </div>
    </div>
  );
});

export default Slider;
