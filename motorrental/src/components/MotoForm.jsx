import { useState } from "react";
import SubTittle2 from "./SubTitle2";
import { useAppContext } from "../context/AppContext";
import { toast } from "react-hot-toast";

const MotoForm = ({ moto }) => {
  const [bookingDetails, setBookingDetails] = useState("");

  const { axios, user, setShowLogin, navigate } = useAppContext(); // Make sure you have user info from context

  const handleBooking = async (e) => {
    e.preventDefault();

    if (!bookingDetails.startDate || !bookingDetails.endDate) {
      return toast.error("Please select both start and end dates.");
    }

    try {
      const response = await axios.post("/api/booking/create-booking", {
        owner: moto.owner, // Ensure this is available in moto
        brand: moto.brand,
        model: moto.model,
        image: moto.image,
        year: moto.year,
        category: moto.category,
        motor: moto._id,
        user: user._id,
        userName: user.name,
        startDate: bookingDetails.startDate,
        endDate: bookingDetails.endDate,
        price: moto.pricePerDay,
      });

      console.log("Submitting booking with:", {
        motor: moto?._id,
        userId: user?._id,
        startDate: bookingDetails.startDate,
        endDate: bookingDetails.endDate,
        price: moto.pricePerDay,
      });

      if (response.data.success) {
        toast.success("Booking successful!");
        navigate("/mybookings");
      } else {
        toast.error(response.data.message || "Booking failed.");
      }
    } catch (error) {
      console.error("Booking error:", error);
      toast.error(error.response?.data?.message || "Booking failed.");
    }
  };

  return (
    <form
      className="flex flex-col p-5 h-max shadow-lg rounded-xl space-y-6"
      onSubmit={handleBooking}
    >
      <div className="flex flex-row gap-2 p-4 justify-center items-center shadow-lg rounded-lg">
        <SubTittle2 subTitle={`₱ ${moto.pricePerDay}`} />
        <span className="text-lg font-normal uppercase text-[#1e293b]">
          per Day
        </span>
      </div>
      <hr className="max-w-xl my-4 border-gray-800" />
      <div className="flex flex-col gap-2">
        <label htmlFor="from-date" className="text-center">
          From
        </label>
        <input
          type="date"
          required
          id="start-date"
          min={new Date().toISOString().split("T")[0]}
          className="py-2 px-4 border text-sm rounded-2xl"
          value={bookingDetails.startDate}
          onChange={(e) =>
            setBookingDetails({ ...bookingDetails, startDate: e.target.value })
          }
        />
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="to-date" className="text-center">
          To
        </label>
        <input
          type="date"
          required
          id="end-date"
          className="py-2 px-4 border text-sm rounded-2xl"
          value={bookingDetails.endDate}
          onChange={(e) =>
            setBookingDetails({ ...bookingDetails, endDate: e.target.value })
          }
        />
      </div>
      {!user ? (
        <>
          <div className="items-center justify-center align-middle bottom-0">
            <p className="text-sm text-gray-400 text-center">
              Please login to booking a Motorcycle rent
            </p>
          </div>

          <button
            onClick={() => setShowLogin(true)}
            className="hover:text-white bg-[#1e293b] hover:bg-[#3b82f6]
        transition-all px-6 py-3 text-white font-medium rounded-full text-sm 
        w-full md:w-auto"
          >
            Log In
          </button>
        </>
      ) : (
        <>
          <button
            type="submit"
            className="hover:text-white bg-[#1e293b] hover:bg-[#3b82f6] transition-all px-6 py-3 text-white font-medium rounded-full text-sm w-full md:w-auto"
          >
            Book Now
          </button>
        </>
      )}
    </form>
  );
};

export default MotoForm;
