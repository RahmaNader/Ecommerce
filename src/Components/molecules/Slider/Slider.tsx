import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
// import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
// import { Button } from "@components/atoms";
import slide1 from "@assets/test_slider.png";
import slide2 from "@assets/test_slider.png";
import slide3 from "@assets/test_slider.png";

/* ---------- animations ---------- */
const variants = {
  enter: (dir: number) => ({
    x: dir > 0 ? 300 : -300,
    opacity: 0,
    scale: 0.95,
  }),
  center: { x: 0, opacity: 1, scale: 1 },
  exit: (dir: number) => ({ x: dir < 0 ? 300 : -300, opacity: 0, scale: 0.95 }),
};

const Slider: React.FC = () => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.dir() === "rtl";
  // const navigate = useNavigate();
  const [[page, dir], setPage] = useState<[number, number]>([0, 0]);
  const [autoPlay, setAutoPlay] = useState(true);

  /* ---------- slides ---------- */
  const slides = [
    {
      id: 1,
      image: slide1,
      title: t("slider.slide1"),
      description: t("slider.description1"),
      link: "/collection/new-arrivals",
    },
    {
      id: 2,
      image: slide2,
      title: t("slider.slide2"),
      description: t("slider.description2"),
      link: "/collection/featured",
    },
    {
      id: 3,
      image: slide3,
      title: t("slider.slide3"),
      description: t("slider.description3"),
      link: "/collection/sale",
    },
  ];

  const mod = (n: number, m: number) => ((n % m) + m) % m;
  const index = mod(page, slides.length);
  const slide = slides[index];

  /* ---------- autoplay ---------- */
  useEffect(() => {
    if (!autoPlay) return;
    const id = setInterval(() => setPage(([p]) => [p + 1, 1]), 5_000);
    return () => clearInterval(id);
  }, [autoPlay]);

  const paginate = (d: number) => {
    setAutoPlay(false);
    setPage(([p]) => [p + d, d]);
    setTimeout(() => setAutoPlay(true), 5_000);
  };

  /* ---------- render ---------- */
  return (
    /* ! The hero now fills (100dvh - --nav-h) and never exceeds viewport width */
    <section
      style={{ height: "calc(100dvh - var(--nav-h, 64px))" }}
      className="relative w-full overflow-hidden bg-[url('@assets/Blur.svg')] bg-cover bg-center mb-12"
    >
      {/* decorative blobs */}
      <div className="absolute top-0 left-0 w-40 h-40 bg-sixColor/40 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl" />
      <div className="absolute bottom-0 right-0 w-40 h-40 bg-sixColor/40 rounded-full  translate-x-1/2 translate-y-1/2 blur-3xl" />

      <AnimatePresence initial={false} custom={dir}>
        <motion.div
          key={page}
          custom={dir}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: "spring", stiffness: 250, damping: 30 },
            opacity: { duration: 0.4 },
            scale: { duration: 0.4 },
          }}
          className="absolute inset-0 flex flex-col md:flex-row"
        >
          {/* image */}
          <div className="flex-1 md:flex-[0.4] flex items-center justify-center p-6">
            <div className="relative bg-eightColor p-1 sm:p-2 rounded-lg">
              <img
                src={slide.image}
                alt={slide.title}
                className="max-h-[60vh] object-contain rounded-md"
              />
            </div>
          </div>

          {/* text */}
          <div className="flex-1 md:flex-[0.6] flex flex-col justify-center px-6 md:px-12">
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="max-w-3xl mx-auto relative"
            >
              <div className="hidden md:block absolute -left-4 top-0 w-1.5 h-16 bg-sixColor rounded-full" />
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 text-wine leading-tight">
                {slide.title.split(" ").map((w, i) => (
                  <span key={i} className={i % 3 === 0 ? "text-sixColor" : ""}>
                    {w}{" "}
                  </span>
                ))}
              </h2>
              <p className="mb-8 text-sm sm:text-base lg:text-lg text-wine/90 leading-relaxed max-w-prose">
                {slide.description || t("slider.description")}
              </p>
              {/* <Button
                label={t("slider.viewCollection")}
                onClick={() => navigate(slide.link)}
                type="primary"
                className="text-base hover:shadow-lg transition-all"
              /> */}
            </motion.div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* arrows */}
      <button
        onClick={() => paginate(-1)}
        aria-label="Previous slide"
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-sixColor hover:bg-golden text-white w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center border-2 border-sixColor/80 shadow-lg transition-all"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className="w-6 h-6"
        >
          <path
            fillRule="evenodd"
            d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z"
            clipRule="evenodd"
          />
        </svg>
      </button>
      <button
        onClick={() => paginate(1)}
        aria-label="Next slide"
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-sixColor hover:bg-golden text-white w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center border-2 border-sixColor/80 shadow-lg transition-all"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className="w-6 h-6"
        >
          <path
            fillRule="evenodd"
            d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
            clipRule="evenodd"
          />
        </svg>
      </button>

      {/* dots */}
      <div
        className={`absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 sm:gap-3 bg-sixColor/80 rounded-full py-2 px-4 border-2 border-golden shadow-lg ${
          isRTL && "flex-row-reverse"
        }`}
      >
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setPage([i, i > index ? 1 : -1])}
            aria-label={`Go to slide ${i + 1}`}
            className={`transition-all duration-300 ${
              i === index
                ? "w-3.5 h-3.5 sm:w-4 sm:h-4 bg-golden rounded-full shadow-lg"
                : "w-2.5 h-2.5 sm:w-3 sm:h-3 bg-mainColor hover:bg-mainColor/70 rounded-full"
            }`}
          />
        ))}
      </div>
    </section>
  );
};

export default Slider;
