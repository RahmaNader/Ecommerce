import { Container } from "@mui/material";
import Carousel from "react-material-ui-carousel";
import x from "@assets/test_slider.png";
import line from "@assets/HP_line.svg";
import React from "react";
import { Button } from "@components/atoms";
import RightArrow from "@assets/RightArrow.svg";
import LeftArrow from "@assets/LeftArrow.svg";
// import { useQuery } from "react-query";
// import axios from "axios";

interface Item {
  text: string;
  img: string;
  line: string;
}

const items: Item[] = [
  {
    text: "Find Your Perfect Blend of Our Traditional and Modern Fashion.",
    img: x,
    line: line,
  },
  {
    text: "Unite Timeless Traditions with Fresh, Modern Styles Today.",
    img: x,
    line: line,
  },
  {
    text: "Uncover the Perfect Balance of Tradition and Trendy Pieces.",
    img: x,
    line: line,
  },
];

//code preparation for fetching from backend
{
  /*
  const fetchSliderItems = async (): Promise<Item[]> => {
  const response = await axios.get<Item[]>('/api/sliderItems');
  return response.data;
};
  */
}

const Slider: React.FC = () => {
  //code preparation for fetching from backend
  {
    /*
      const { data: fetchedItems, isLoading, isError } = useQuery<Item[]>('sliderItems', fetchSliderItems);

  const combinedItems = React.useMemo(() => {
    if (fetchedItems && fetchedItems.length > 0) {
      return [...items, ...fetchedItems];
    }
    return items;
  }, [fetchedItems]);

  if (isLoading) {
    return <div>Loading slider...</div>;
  }

  if (isError) {
    console.error('Error fetching slider items');
    // Optionally display an error message or proceed silently
  }

  */
  }

  const combinedItems = items;
  const isMobile = window.innerWidth <= 768; // Check if it's a mobile screen

  return (
    <div className={`relative mx-[52.5px] mt-8 mb-20 ${isMobile ? 'h-auto mx-[10px]' : 'md:h-[669px]'}`}>
      <div className="absolute inset-0 bg-cover bg-center filter blur-md z-0 bg-[url('@assets/Blur.svg')]"></div>

      <Container sx={{ py: 2 }} maxWidth={false} className="relative">
        <Carousel
          navButtonsAlwaysVisible
          indicators={false}
          animation="slide"
          autoPlay={true}
          interval={4000}
          cycleNavigation={true}
          fullHeightHover={false}
          navButtonsProps={{
            style: {
              backgroundColor: "#710e12",
              width: isMobile ? "35px" : "56px",
              height: isMobile ? "35px" : "56px",
            },
          }}
          navButtonsWrapperProps={{
            style: {
              position: 'absolute',
              top: isMobile ? '55%' : '', // Lowered buttons for mobile
              transform: 'translateY(-50%)',
              marginLeft: isMobile ? '-10px':'20px',
              marginRight: isMobile ? '-10px':'20px',
            },
          }}
          NextIcon={<img src={RightArrow} alt="right-arrow" />}
          PrevIcon={<img src={LeftArrow} alt="left-arrow" />}
        >
          {combinedItems.map((item, i) => (
            <SliderItem key={item.text} {...item} isMobile={isMobile} />
          ))}
        </Carousel>
      </Container>
    </div>
  );
};

interface SliderItemProps extends Item {
  isMobile: boolean;
}

const SliderItem: React.FC<SliderItemProps> = React.memo(({ text, img, line, isMobile }) => {
  return (
    <div className={`flex ${isMobile ? 'flex-col' : 'flex-col md:flex-row'} justify-center relative z-10`}>
      <div className={`${isMobile ? 'w-full text-center' : 'mt-6 md:w-[55%]'}`}>
        <div className={`${isMobile ? '' : 'ps-32'}`}>
          <p className={`font-instrumentSerif ${isMobile ? 'text-[30px] leading-[40px]' : 'text-[60px]'} font-normal lg:text-[70px] leading-[90px] text-sevenColor`}>
            {text.split(" ").map((word, index) => (
              <span
                key={index}
                className={index % 4 === 0 ? "text-sixColor" : ""}
              >
                {word + " "}
              </span>
            ))}
          </p>
          {!isMobile && (
            <div className="mt-8 md:mt-12">
              <img src={line} alt="Line" className="mb-9 md:w-auto" />
              <Button label="View Collection" onClick={function (): void {
                throw new Error("Function not implemented.");
              }} />
            </div>
          )}
        </div>
      </div>
      <div className={`${isMobile ? 'w-full mt-6' : 'flex md:w-[45%] w-full mt-6 md:mt-0'}`}>
        <img src={img} alt="Fashion" className={`${isMobile ? 'w-[80%] justify-self-center h-auto' : ''}`} />
        {isMobile && (
          <div className="mt-4 text-center">
            <Button label="View Collection" onClick={function (): void {
              throw new Error("Function not implemented.");
            }} />
          </div>
        )}
      </div>
    </div>
  );
});

export default Slider;
