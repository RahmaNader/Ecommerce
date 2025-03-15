import { Container } from "@mui/material";
import Carousel from "react-material-ui-carousel";
import x from "@assets/test_slider.png";
import line from "@assets/HP_line.svg";
import React, { useState, useEffect } from "react";
import { Button } from "@components/atoms";
import RightArrow from "@assets/RightArrow.svg";
import LeftArrow from "@assets/LeftArrow.svg";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom"; // Add this import

interface Item {
  text: string;
  img: string;
  line: string;
}

const Slider: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate(); // Add navigate hook
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [windowHeight, setWindowHeight] = useState(window.innerHeight);
  
  // Update window dimensions when resized
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      setWindowHeight(window.innerHeight);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  // Function to navigate to new-arrivals collection
  const handleViewCollection = () => {
    navigate('/collection/new-arrivals');
  };
  
  // Responsive breakpoints
  const isMobile = windowWidth <= 640;
  const isTablet = windowWidth > 640 && windowWidth <= 1024;
  
  // Calculate responsive max height (70vh on mobile, 80vh on larger screens)
  const maxSliderHeight = isMobile ? `${Math.min(windowHeight * 0.7, 500)}px` : 
                         isTablet ? `${Math.min(windowHeight * 0.75, 600)}px` : 
                         `${Math.min(windowHeight * 0.8, 700)}px`;
  
  const items: Item[] = [
    { text: t("slider.slide1"), img: x, line: line },
    { text: t("slider.slide2"), img: x, line: line },
    { text: t("slider.slide3"), img: x, line: line },
  ];

  return (
    <div className="relative max-w-[1200px] justify-center mx-auto">
      <div className="absolute inset-0 bg-cover bg-center filter blur-md z-0 bg-[url('@assets/Blur.svg')]"></div>

      <Container 
        sx={{ 
          py: { xs: 1, sm: 2 },
          maxHeight: maxSliderHeight,
          overflow: "hidden"
        }} 
        maxWidth={false} 
        className="relative"
      >
        <Carousel
          navButtonsAlwaysVisible
          indicators={false}
          animation="slide"
          autoPlay={true}
          interval={4000}
          cycleNavigation={true}
          fullHeightHover={false}
          className="h-full"
          sx={{ maxHeight: maxSliderHeight }}
          navButtonsProps={{
            style: {
              backgroundColor: "#710e12",
              width: isMobile ? "32px" : isTablet ? "42px" : "56px",
              height: isMobile ? "32px" : isTablet ? "42px" : "56px",
            },
          }}
          navButtonsWrapperProps={{
            style: {
              position: 'absolute',
              top: '50%',
              transform: 'translateY(-50%)',
              marginLeft: isMobile ? '0px' : isTablet ? '10px' : '20px',
              marginRight: isMobile ? '0px' : isTablet ? '10px' : '20px',
              zIndex: 20,
            },
          }}
          NextIcon={<img src={RightArrow} alt="right-arrow" className="w-3 sm:w-4 md:w-auto" />}
          PrevIcon={<img src={LeftArrow} alt="left-arrow" className="w-3 sm:w-4 md:w-auto" />}
        >
          {items.map((item) => (
            <SliderItem 
              key={item.text} 
              {...item} 
              maxHeight={maxSliderHeight}
              isMobile={isMobile}
              isTablet={isTablet}
              onViewCollection={handleViewCollection} // Pass the function to SliderItem
            />
          ))}
        </Carousel>
      </Container>
    </div>
  );
};

interface SliderItemProps extends Item {
  maxHeight: string;
  isMobile: boolean;
  isTablet: boolean;
  onViewCollection: () => void; // Add this prop
}

const SliderItem: React.FC<SliderItemProps> = React.memo(
  ({ text, img, line, maxHeight, isMobile, isTablet, onViewCollection }) => {
    const { t } = useTranslation();
    
    return (
      <div 
        className="flex flex-col md:flex-row justify-center items-center relative z-10 py-4 sm:py-6 md:py-8"
        style={{ maxHeight: maxHeight }}
      >
        {/* Text section */}
        <div className="w-full md:w-1/2 lg:w-[55%] text-center md:text-left px-4 sm:px-6 md:px-8 lg:px-10">
          <p className="font-instrumentSerif text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl 2xl:text-[60px] font-normal leading-tight md:leading-snug lg:leading-normal text-sevenColor">
            {text.split(" ").map((word, index) => (
              <span
                key={index}
                className={index % 4 === 0 ? "text-sixColor" : ""}
              >
                {word + " "}
              </span>
            ))}
          </p>
          <div className="mt-3 sm:mt-4 md:mt-6 lg:mt-8 hidden md:block">
            <img 
              src={line} 
              alt="Line" 
              className="mb-3 md:mb-4 lg:mb-6 max-w-full" 
              style={{ maxWidth: isTablet ? "80%" : "100%" }}
            />
            <Button 
              label={t("slider.viewCollection")} 
              onClick={onViewCollection} // Use the navigation function
            />
          </div>
        </div>
        
        {/* Image section - with max-height constraint */}
        <div className="w-full md:w-1/2 lg:w-[45%] mt-3 md:mt-0 flex justify-center md:justify-end">
          <img 
            src={img} 
            alt="Fashion" 
            style={{ 
              maxHeight: isMobile ? "200px" : isTablet ? "300px" : "100%",
              objectFit: "contain",
              maxWidth: isMobile ? "80%" : isTablet ? "85%" : "95%"
            }}
            className="object-contain"
          />
        </div>
        
        {/* Mobile button */}
        <div className="mt-4 text-center md:hidden">
          <Button 
            label={t("slider.viewCollection")} 
            onClick={onViewCollection} // Use the navigation function
          />
        </div>
      </div>
    );
  }
);

export default Slider;