import { useEffect, useState } from "react";
import { useAppContext } from "../context/AppContext";

const RentNow = () => {
  const { axios, navigate } = useAppContext();
  const [motorCycles, setMotorCycles] = useState([]);

  // Function to fetch all available motorcycles (for all users)
  const fetchAllAvailableMotorcycles = async () => {
    try {
      const response = await axios.get("/api/user/motorcycles");
      setMotorCycles(response.data.motors);
    } catch (error) {
      console.error("Error fetching motorcycles:", error);
    }
  };

  useEffect(() => {
    fetchAllAvailableMotorcycles();
  }, []);

  return (
    <>
      <section className="relative bg-rental-hero bg-cover bg-center w-full h-auto overflow-hidden bg-no-repeat py-20 px-4">
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/50 opacity-90 z-0"></div>

        {/* Content */}
        <div className="relative z-10 text-center text-white max-w-4xl mx-auto">
          <p className="uppercase tracking-widest font-bold text-[#3b82f6] mb-2">
            Rent Now
          </p>
          <h1 className="text-4xl md:text-5xl font-bold mb-10">
            Book Moto Rental
          </h1>

          {/* Booking Form Card */}
          <div className="bg-white shadow-lg rounded-xl p-6 flex flex-col md:flex-row flex-wrap items-center justify-between gap-4 w-full max-w-6xl mx-auto">
            {/* Motorcycle Select */}
            <div className="flex flex-col w-full md:w-auto">
              <label className="text-xs text-gray-500 mb-1">Motorcycle</label>
              <select className="block border px-4 py-2 outline-none text-sm text-gray-700 rounded-lg w-full">
                {Array.isArray(motorCycles) &&
                  motorCycles.map((bike) => (
                    <option key={bike._id}>{bike.model}</option>
                  ))}
              </select>
            </div>

            {/* From Date */}
            <div className="flex flex-col w-full md:w-auto">
              <label className="text-xs text-gray-500 mb-1">From</label>
              <input
                type="date"
                required
                id="from-date"
                min={new Date().toISOString().split("T")[0]}
                className="border px-4 py-2 outline-none text-sm text-gray-700 rounded-lg w-full"
              />
            </div>

            {/* To Date */}
            <div className="flex flex-col w-full md:w-auto">
              <label className="text-xs text-gray-500 mb-1">To</label>
              <input
                type="date"
                required
                id="to-date"
                className="border px-4 py-2 outline-none text-sm text-gray-700 rounded-lg w-full"
              />
            </div>

            {/* Rent Button */}
            <div className="w-full md:w-auto">
              <button
                onClick={() => navigate("/motorcycles")}
                className="bg-[#1e293b] hover:bg-[#3b82f6] transition-all px-6 py-3 text-white font-medium rounded-full text-sm w-full md:w-auto"
              >
                Rent Now
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default RentNow;
