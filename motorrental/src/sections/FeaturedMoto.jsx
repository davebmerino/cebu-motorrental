import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import PrimaryTitle from "../components/PrimaryTitle";
import SubTittle from "../components/SubTitle";
import MotoCard from "../components/MotoCard";
import { useAppContext } from "../context/AppContext";
import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";

const FeaturedMoto = () => {
  const { axios } = useAppContext();
  const [motorCycles, setMotorCycles] = useState([]);

  // Function to fetch all available motorcycles (for all users)
  const fetchAllAvailableMotorcycles = useCallback(async () => {
    try {
      const { data } = await axios.get("/api/user/motorcycles");
      if (data.success) {
        setMotorCycles(data.motors);
      } else {
        toast.error(data.message || "Failed to fetch motorcycles");
      }
    } catch (error) {
      console.error("Error fetching motorcycles:", error);
      toast.error(error.response?.data?.message || error.message);
    }
  }, []);

  // Fetch motorcycles when component mounts
  useEffect(() => {
    fetchAllAvailableMotorcycles();
  }, []);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 2 },
      },
      {
        breakpoint: 849,
        settings: { slidesToShow: 1 },
      },
    ],
  };

  return (
    <>
      <section className="bg-[#f8fafc] py-16 px-4">
        <div className="max-w-6xl mx-auto text-center mb-10">
          <PrimaryTitle title="Select Your Motorcycle" />
          <SubTittle subTitle="Choose from a wide range of high-quality motorcycles for rent" />
        </div>
        <div className="w-full max-w-6xl mx-auto px-4">
          <Slider {...settings}>
            {Array.isArray(motorCycles) &&
              motorCycles.map((bike) => (
                <MotoCard key={bike._id} bike={bike} />
              ))}
          </Slider>
        </div>
      </section>
    </>
  );
};

export default FeaturedMoto;
