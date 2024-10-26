import { Box, Container } from '@mui/material';
import Carousel from 'react-material-ui-carousel';
import x from '@assets/test_slider.png';
import line from '@assets/HP_line.svg';
import React from 'react';
import { Button } from '@components/atoms';
import RightArrow from '@assets/RightArrow.svg'
import LeftArrow from '@assets/LeftArrow.svg'
import bluer from '@assets/Blur.svg'; // Assuming this is your background image
import '../../../App.css'
interface Item {
  text: string;
  img: string;
  line: string;
}

const items: Item[] = [
  {
    text: "Find Your Perfect Blend of Our Traditional and Modern Fashion ",
    img: x,
    line: line,
  },
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
    <div className='relative mx-[52.5px] mt-10 mb-20'>
      {/* Blurred background */}
      <div 
        className="absolute inset-0 bg-cover bg-center filter blur-md z-0 "
        style={{ backgroundImage: `url(${bluer})` }} 
      />
      
      <Container 
        sx={{ py: 5 }}
        maxWidth={false}
        className='relative'
      >
        <Carousel
          navButtonsAlwaysVisible
          indicators={false}
          animation="slide"
          autoPlay={false}
          // IndicatorIcon={LeftArrow}
          cycleNavigation={false}
          fullHeightHover={false}
          index={1}
          // stopAutoPlayOnHover={false}
          
          
          navButtonsProps={{
            // className: "carousel-nav-buttons", // Add a custom class
            style: {
              backgroundColor: '#710e12',
              width: "56px",
              height: "56px",
            }, 
          }}
          navButtonsWrapperProps={{
            style: {
              marginLeft: "20px",
              marginRight: "20px",
            
            },
            
          }}
          NextIcon={<img src={RightArrow} alt=""/>}
          PrevIcon={<img src={LeftArrow} alt="" />}
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
      <div className='mt-6 md:w-[55%]'>
        <div className='ps-32'> {/* Responsive padding */}
          <p className='font-instrumentSerif text-[60px] md:text-[60px] font-normal lg:text-[70px] leading-[90px] text-sevenColor'>
            {text.split(' ').map((word, index) => (
              <span key={index} className={word === 'Blend' || word === 'Traditional' || word === 'Fashion' ? 'text-sixColor' : ''}>
                {word}{' '}
              </span>
            ))}
          </p>
     
          <div className='mt-8 md:mt-12'>
            <img src={line} alt="Line" className="mb-9 md:w-auto" />
            <Button label='view collection' />
          </div>
        </div>
      </div>

      <div className='flex md:w-[45%] w-full mt-6 md:mt-0'> 
        <img src={img} alt="Fashion" />
      </div>
    </div>
  );
});

export default Slider;
