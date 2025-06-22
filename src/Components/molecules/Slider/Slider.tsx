import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Button } from "@components/atoms";
import slide1 from "@assets/test_slider.png";
import slide2 from "@assets/test_slider.png";
import slide3 from "@assets/test_slider.png";

// Animation variants - smoother transitions
const variants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 300 : -300,
    opacity: 0,
    scale: 0.95
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1
  },
  exit: (direction: number) => ({
    x: direction < 0 ? 300 : -300,
    opacity: 0,
    scale: 0.95
  })
};

const Slider: React.FC = () => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.dir() === 'rtl';
  const navigate = useNavigate();
  const [[page, direction], setPage] = useState([0, 0]);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const slides = [
    {
      id: 1,
      image: slide1,
      title: t("slider.slide1"),
      description: t("slider.description1"),
      link: "/collection/new-arrivals"
    },
    {
      id: 2,
      image: slide2,
      title: t("slider.slide2"),
      description: t("slider.description2"),
      link: "/collection/featured"
    },
    {
      id: 3,
      image: slide3,
      title: t("slider.slide3"),
      description: t("slider.description3"),
      link: "/collection/sale"
    }
  ];

  const indexInBounds = ((index: number) => {
    let calculatedIndex = index % slides.length;
    if (calculatedIndex < 0) calculatedIndex += slides.length;
    return calculatedIndex;
  });

  const paginate = (newDirection: number) => {
    setIsAutoPlaying(false);
    setPage([page + newDirection, newDirection]);
    setTimeout(() => setIsAutoPlaying(true), 5000);
  };

  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setPage(prev => [prev[0] + 1, 1]);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const currentIndex = indexInBounds(page);
  const currentSlide = slides[currentIndex];

  return (
    <div className="px-4 sm:px-8 md:px-16 lg:px-24 xl:px-32">
      {/* Enhanced container with Blur SVG background */}
      <div className="w-full sm:w-11/12 md:w-10/12 lg:w-9/12 mx-auto my-6 sm:my-8 md:my-10 
                    h-[460px] sm:h-[480px] md:h-[500px] lg:h-[550px] 
                    overflow-hidden rounded-xl relative 
                    bg-[url('@assets/Blur.svg')] bg-cover bg-center">
        
        {/* Decorative elements with solid colors */}
        {/* <div className="absolute inset-0 bg-gradient-to-br from-secondColor/60 to-wine/70"></div> */}
        <div className="absolute top-0 left-0 w-32 h-32 bg-sixColor/40 rounded-full filter blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-32 h-32 bg-sixColor/40 rounded-full filter blur-3xl translate-x-1/2 translate-y-1/2"></div>
        
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={page}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 250, damping: 30 },
              opacity: { duration: 0.4 },
              scale: { duration: 0.4 }
            }}
            className="absolute inset-0 flex flex-col md:flex-row z-10"
          >
            {/* Image Side - Enhanced with solid color frame */}
            <div className="w-full md:w-2/5 h-2/5 sm:h-1/2 md:h-full flex items-center justify-center p-4 sm:p-6 md:p-8 lg:p-10">
              <div className="relative w-full h-full flex items-center justify-center">
                {/* <div className="absolute inset-0 bg-sixColor/30 rounded-lg rotate-3 transform scale-[0.97] shadow-md"></div> */}
                <div className="relative overflow-hidden bg-eightColor p-1 sm:p-2 rounded-lg  ">
                  <img
                    src={currentSlide.image}
                    alt={currentSlide.title}
                    className="object-contain w-auto h-auto max-h-[130px] sm:max-h-[180px] md:max-h-[260px] lg:max-h-[340px] max-w-full rounded-md"
                  />
                </div>
              </div>
            </div>
            
            {/* Content Side - Enhanced typography and spacing */}
            <div className="w-full md:w-3/5 h-3/5 sm:h-1/2 md:h-full p-3 sm:p-4 md:p-8 lg:p-10 flex flex-col justify-center">
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.8 }}
                className="md:max-w-xl relative"
              >
                {/* Decorative elements */}
                <div className="absolute -left-4 top-0 w-1.5 h-16 bg-sixColor rounded-full hidden md:block"></div>
                
                <h2 className="px-8 text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-2 sm:mb-3 md:mb-5 lg:mb-6 text-wine leading-tight">
                  {currentSlide.title.split(" ").map((word, i) => (
                    <span key={i} className={i % 3 === 0 ? "text-sixColor" : ""}>
                      {word}{" "}
                    </span>
                  ))}
                </h2>
                
                <p className="px-10 mb-4 sm:mb-5 md:mb-6 lg:mb-8 text-xs sm:text-sm md:text-base text-wine/90 line-clamp-3 sm:line-clamp-4 md:line-clamp-none leading-relaxed">
                  {currentSlide.description || t("slider.description")}
                </p>
                
                <div className="flex justify-center mt-4 sm:mt-6 md:mt-8">
                  <Button
                    label={t("slider.viewCollection")}
                    onClick={() => navigate(currentSlide.link)}
                    type="primary"
                    className="text-sm sm:text-base hover:shadow-lg transition-all duration-300"
                  />
                </div>
              </motion.div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Enhanced Navigation Buttons with solid colors */}
        <button
          className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-20 
                    bg-sixColor hover:bg-golden text-white 
                    w-9 h-9 sm:w-11 sm:h-11 
                    rounded-full flex items-center justify-center
                    border-2 border-sixColor/80 shadow-lg
                    transition-all duration-300 ease-in-out"
          onClick={() => paginate(-1)}
          aria-label="Previous slide"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 sm:w-6 sm:h-6">
            <path fillRule="evenodd" d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z" clipRule="evenodd" />
          </svg>
        </button>
        <button
          className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-20 
                    bg-sixColor hover:bg-golden text-white 
                    w-9 h-9 sm:w-11 sm:h-11 
                    rounded-full flex items-center justify-center
                    border-2 border-sixColor/80 shadow-lg
                    transition-all duration-300 ease-in-out"
          onClick={() => paginate(1)}
          aria-label="Next slide"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 sm:w-6 sm:h-6">
            <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
          </svg>
        </button>

        {/* Enhanced Dots Navigation with solid colors */}
        <div className={`absolute bottom-3 sm:bottom-5 left-1/2 -translate-x-1/2 z-20 
                      flex items-center ${isRTL ? 'gap-2' : ''} 
                      bg-sixColor/80 rounded-full  
                      py-1.5 px-3 border-2 border-golden shadow-lg`}>
          {slides.map((_, index) => (
            <button
              key={index}
              className={`transition-all duration-300 ease-in-out ${
                index === currentIndex 
                  ? "w-3 h-3 sm:w-4 sm:h-4 bg-golden rounded-full shadow-lg" 
                  : "w-2 h-2 sm:w-3 sm:h-3 bg-mainColor hover:bg-mainColor/70 rounded-full"
              }`}
              onClick={() => setPage([index, index > currentIndex ? 1 : -1])}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Slider;