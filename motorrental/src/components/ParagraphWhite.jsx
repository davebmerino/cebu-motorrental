import { motion } from "framer-motion";

const ParagraphWhite = ({ paragraph }) => {
  return (
    <>
      <motion.p
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="mt-4 text-gray-200 text-sm md:text-lg max-w-xl mx-auto"
      >
        {paragraph}
      </motion.p>
    </>
  );
};

export default ParagraphWhite;
