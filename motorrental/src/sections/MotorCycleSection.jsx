import MotoCard from "../components/MotoCard";
import { motion } from "framer-motion";

const MotorCycleSection = ({ motorCycles }) => {
  return (
    <>
      <motion.section
        initial={{ opacity: 0, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 1 }}
        className="grid grid-cols md:grid-cols-2 lg:grid-cols-3 items-center px-2 max-w-6xl mx-auto mb-40 gap-5 mt-20"
      >
        {Array.isArray(motorCycles) &&
          motorCycles.map((bike) => <MotoCard key={bike._id} bike={bike} />)}
      </motion.section>
    </>
  );
};

export default MotorCycleSection;
