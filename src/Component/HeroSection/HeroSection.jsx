import { MotionValue } from "framer-motion";
import React from "react";
import { motion } from "framer-motion";

const HeroSection = () => {
  return (
    <div className="max-w-[90%] mx-auto">
      {/* <div className="flex gap-8 overflow-hidden">
        {images.map((img, index) => (
          <motion.img
            key={index}
            src={img}
            className="w-32"
            animate={{ x: [-30, 30] }}
            transition={{
              duration: 3 + index,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
            }}
          />
        ))}
      </div> */}
    </div>
  );
};

export default HeroSection;
