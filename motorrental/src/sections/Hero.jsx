import { useEffect, useState } from "react";
import { assets } from "../assets/assets";
import SubTittle from "../components/SubTitle";
import TitleWhite from "../components/TitleWhite";
import ParagraphWhite from "../components/ParagraphWhite";
import { motion } from "framer-motion";

import { useNavigate } from "react-router";

const Hero = () => {
  const navigate = useNavigate();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % banners.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const banners = [assets.banner1, assets.banner2, assets.banner3];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="relative w-full h-[500px] md:h-[600px] lg:h-[700px] overflow-hidden"
    >
      {banners.map((banner, i) => (
        <div
          key={i}
          className={`absolute top-0 left-0 w-full h-full transition-opacity duration-700 ${
            i === current ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
        >
          <img
            src={banner}
            alt={`Slide ${i + 1}`}
            className="w-full h-full object-cover"
          />
        </div>
      ))}

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/50 z-20"></div>

      {/* Text Content */}
      <div className="absolute z-30 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center px-4">
        <SubTittle subTitle="Cebu Don moto. Rental" />
        <TitleWhite title="Ride With Style and Freedom" />
        <ParagraphWhite
          paragraph="Choose from our best motorcycle selections and enjoy smooth rides
          around Cebu. Affordable, convenient, and fun."
        />
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-6 flex justify-center gap-4"
        >
          <button
            onClick={() => navigate("/motorcycles")}
            className="bg-[#3b82f6] hover:bg-[#f8fafc] cursor-pointer text-[#1e293b] font-medium px-6 py-3 rounded-full transition"
          >
            See Units
          </button>
        </motion.div>
      </div>

      {/* Navigation Dots */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-30 flex space-x-2">
        {banners.map((_, i) => (
          <button
            key={i}
            className={`w-3 h-3 rounded-full transition ${
              i === current ? "bg-[#3b82f6]" : "bg-gray-300"
            }`}
            onClick={() => setCurrent(i)}
          />
        ))}
      </div>
    </motion.div>
  );
};

export default Hero;
