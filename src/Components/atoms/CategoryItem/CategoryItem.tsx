// CategoryItem.tsx
import React from "react";
import { motion, type Variants } from "framer-motion";

interface Props {
  src: string;
  alt: string;
  label: string;
  onClick: () => void;
}

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring", // "spring" is part of the allowed union
      stiffness: 120,
    },
  },
};

export const CategoryItem: React.FC<Props> = ({ src, alt, label, onClick }) => (
  <motion.div
    className="flex flex-col items-center cursor-pointer"
    variants={cardVariants}
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.97 }}
    onClick={onClick}
  >
    <img
      src={src}
      alt={alt}
      className="w-[225px] h-[300px] object-cover rounded-xl shadow-md"
    />
    <span className="mt-4 text-lg font-semibold">{label}</span>
  </motion.div>
);
