import { motion } from "framer-motion";

const PrimaryTitle = ({ title }) => {
  return (
    <>
      <motion.h1
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="text-4xl font-bold mb-2 "
      >
        {title}
      </motion.h1>
    </>
  );
};

export default PrimaryTitle;
