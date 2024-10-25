import {  Box, Container } from '@mui/material';
import Carousel from 'react-material-ui-carousel';
import x from '../../../assets/HP_slider.svg';
import line from '../../../assets/HP_line.svg';
import React from 'react';
import '../../../App.css';
import { Button } from '@components/atoms';
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
  },
  {
    text: "Find Your Perfect Blend of Our Traditional and Modern Fashion",
    img: x,
    line: line,
  },
];

const Slider: React.FC = () => {
  return (
    <div className='mx-[63px] mt-7 mb-12'>
      <Container 
        sx={{ py: 4 }}
        className='bg-eightColor'
        maxWidth={false}
      >
        <Carousel
          navButtonsAlwaysVisible
          indicators={false}
          animation="slide"
          navButtonsProps={{
            style: {
              backgroundColor: '#710e12',
              color: 'white',
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
    <div className='flex flex-col md:flex-row justify-center'>
      
        <div className=' mt-10 md:w-[60%] w-full items-center'>
          <div className='ps-24 pe-24'>
          <p className='font-instrumentSerif text-[40px] md:text-[60px] lg:text-[80px] leading-[1.2] text-sevenColor '>
            {text.split(' ').map((word, index) => (
              <span key={index} className={word === 'Blend' || word === 'Traditional' || word === 'Fashion' ? 'text-sixColor' : ''}>
                {word}{' '}
              </span>
            ))}
          </p>
          </div>
          <div className=' mt-8 md:mt-12 ps-24 pe-24'>
            <img src={line} alt="Line" className="mb-9  md:w-auto" />
            <Button label='view collection'></Button>
        </div>
      </div>

      <div className='flex  md:w-[40%] w-full mt-6 md:mt-0'> 
        <img src={img} alt="Fashion" className='object-cover' />
      </div>
    </div>
  );
});

export default Slider;
