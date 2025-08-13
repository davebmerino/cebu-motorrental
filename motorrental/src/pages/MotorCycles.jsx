import { useEffect, useState } from "react";
import PrimaryTitle from "../components/PrimaryTitle";
import SubTitle from "../components/SubTitle";
import MotorCycleSection from "../sections/MotorCycleSection";

import { useAppContext } from "../context/AppContext";
import { FaSearch } from "react-icons/fa";
import { motion } from "framer-motion";

const MotorCycle = () => {
  const [motorCycles, setMotorCycles] = useState([]);
  const [queryMoto, setQueryMoto] = useState("");
  const [filteredMotorCycles, setFilteredMotorCycles] = useState([]);

  const { axios } = useAppContext();

  // Fetch all motorcycles
  const fetchAllAvailableMotorcycles = async () => {
    try {
      const response = await axios.get("/api/user/motorcycles");
      setMotorCycles(response.data.motors);
      setFilteredMotorCycles(response.data.motors); // Set default filtered
    } catch (error) {
      console.error("Error fetching motorcycles:", error);
    }
  };

  // Filter when search query or data changes
  useEffect(() => {
    const searchValue = queryMoto.toLowerCase();
    const filtered = motorCycles.filter(
      (bike) =>
        bike.model.toLowerCase().includes(searchValue) ||
        bike.brand.toLowerCase().includes(searchValue)
    );
    setFilteredMotorCycles(filtered);
  }, [queryMoto, motorCycles]);

  useEffect(() => {
    fetchAllAvailableMotorcycles();
  }, []);

  return (
    <>
      <div className="flex flex-col items-center text-center py-20 mt-20 shadow-b">
        <PrimaryTitle title="Available MotorCycle" />
        <SubTitle subTitle="See available Motorcycle for your needs that fits to your adventure" />

        <div className="max-w-5xl mx-auto px-4">
          <form className="flex flex-row items-center w-full">
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative w-full"
            >
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                onChange={(e) => setQueryMoto(e.target.value)}
                value={queryMoto}
                placeholder="Search by model or brand"
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </motion.div>
          </form>
        </div>
      </div>

      {/* ✅ Render filtered bikes */}
      <MotorCycleSection motorCycles={filteredMotorCycles} />
    </>
  );
};

export default MotorCycle;
