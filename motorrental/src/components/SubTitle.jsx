import { motion } from "framer-motion";

const SubTitle = ({ subTitle }) => {
  return (
    <>
      <motion.h5
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="text-[#196ffa] text-sm md:text-base uppercase tracking-widest my-4"
      >
        {subTitle}
      </motion.h5>
    </>
  );
};

export default SubTitle;
