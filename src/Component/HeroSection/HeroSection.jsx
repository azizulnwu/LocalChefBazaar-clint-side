import { MotionValue } from "framer-motion";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import useAuth from "../../Hook/useAuth";
import useAxios from "../../Hook/useAxiosInstant";

const HeroSection = () => {
   const { isLoading } = useAuth();
  const axiosInstance = useAxios();
  const [allMealsImageLoad, setAllMealsImageLoad] = useState([]);

  useEffect(() => {
    axiosInstance.get("/allMeals").then((res) => {
      if (res.data) {
        setAllMealsImageLoad(res.data);
      }
    });
  }, [setAllMealsImageLoad, axiosInstance]);



  return (
    <div className="max-w-[90%] mx-auto">
     
      <div className="flex gap-8 overflow-hidden -mt-18 mb-10 rounded bg-amber-200">
        {allMealsImageLoad.map((data, index) => (
          <motion.img
            key={index}
            src={data.foodImage}
            className="w-50"
            animate={{ x: [-30, 30] }}
            transition={{
              duration: 3 + index,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroSection;
