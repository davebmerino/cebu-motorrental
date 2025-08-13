import { motion } from "framer-motion";

const TitleWhite = ({ title }) => {
  return (
    <>
      <motion.h1
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="text-white text-3xl md:text-5xl font-extrabold leading-tight drop-shadow-lg"
      >
        {title}
      </motion.h1>
    </>
  );
};

export default TitleWhite;
