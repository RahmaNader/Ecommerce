import { Container } from "@mui/material";
import Carousel from "react-material-ui-carousel";
import x from "@assets/test_slider.png";
import line from "@assets/HP_line.svg";
import React from "react";
import { Button } from "@components/atoms";
import RightArrow from "@assets/RightArrow.svg";
import LeftArrow from "@assets/LeftArrow.svg";
import "../../../App.css";

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
    text: "ediuf edheduo eddhhiede dedioedhu",
    img: x,
    line: line,
  },
  {
    text: "uedhied udheudeud wjiuw wijwowd ",
    img: x,
    line: line,
  },
];

const Slider: React.FC = () => {
  return (
    <div className="relative mx-[52.5px] mt-1 mb-20 md:h-[669px]">
      <div className="absolute inset-0 bg-cover bg-center filter blur-md z-0 bg-[url('@assets/Blur.svg')]"></div>

      <Container sx={{ py: 2 }} maxWidth={false} className="relative ">
        <Carousel
          navButtonsAlwaysVisible
          indicators={false}
          animation="slide"
          autoPlay={true}
          interval={5000}
          cycleNavigation={true}
          fullHeightHover={false}
          index={0}
          navButtonsProps={{
            style: {
              backgroundColor: "#710e12",
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
          NextIcon={<img src={RightArrow} alt="right-arrow" />}
          PrevIcon={<img src={LeftArrow} alt="left-arrow" />}
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
    <div className="flex flex-col md:flex-row justify-center relative z-10">
      <div className="mt-6 md:w-[55%]">
        <div className="ps-32">
          <p className="font-instrumentSerif text-[60px] md:text-[60px] font-normal lg:text-[70px] leading-[90px] text-sevenColor">
            {text.split(" ").map((word, index) => (
              <span
                key={index}
                className={index % 4 === 0 ? "text-sixColor" : ""}
              >
                {word}{" "}
              </span>
            ))}
          </p>
          <div className="mt-8 md:mt-12">
            <img src={line} alt="Line" className="mb-9 md:w-auto" />
            <Button label="View Collection" />
          </div>
        </div>
      </div>
      <div className="flex md:w-[45%] w-full mt-6 md:mt-0">
        <img src={img} alt="Fashion" />
      </div>
    </div>
  );
});

export default Slider;
