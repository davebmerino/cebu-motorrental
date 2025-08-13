import { useEffect, useState } from "react";
import PrimaryTitle from "../components/PrimaryTitle";
import SubTitle from "../components/SubTitle";
import { useAppContext } from "../context/AppContext";
import toast from "react-hot-toast";
import BookingCard from "../components/BookingCard";
import { NavLink } from "react-router";
import ScrollFadeIn from "../components/ScrollFadeIn";
import { motion } from "framer-motion";

const MyBooking = () => {
  const { axios, user } = useAppContext();

  const [bookings, setBookings] = useState([]);

  const fetchBookings = async () => {
    try {
      const token = localStorage.getItem("token"); // or sessionStorage
      if (!token) return toast.error("Not authenticated");

      const { data } = await axios.get("/api/booking/user-bookings", {
        headers: {
          Authorization: token,
        },
      });

      data.success ? setBookings(data.bookings) : toast.error(data.message);
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  {
    if (!user) {
      {
        return (
          <>
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="min-h-screen flex flex-col items-center justify-center text-center px-4"
            >
              <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                Please log in to view your bookings
              </h2>
              <p className="text-gray-500 mb-4">
                You need to be logged in to access this page.
              </p>
              <NavLink
                to="/"
                className="px-6 py-2 text-white rounded-full transition bg-[#1e293b] hover:bg-[#3b82f6]"
              >
                Go to Home
              </NavLink>
            </motion.div>
          </>
        );
      }
    }
    // If Log in
    return (
      <>
        <div className="max-w-5xl mx-auto mt-20 sm:p-4 md:p-6 lg:p-8">
          <div className="flex flex-col sm:p-4">
            <PrimaryTitle title="My Bookings" />
            <SubTitle subTitle="View and manage your bookings" />
          </div>

          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-full grid grid-cols-1  gap-4 mt-10 p-4 "
          >
            <p className="text-sm text-gray-400">
              <span className="text-lg font-bold">Note</span>: You'll need to
              contact 09123356 to confirm or cancel your booking
            </p>
            {Array.isArray(bookings) && bookings.length > 0 ? (
              bookings.map((booking) => (
                <>
                  <ScrollFadeIn>
                    <BookingCard key={booking._id} booking={booking} />
                  </ScrollFadeIn>
                </>
              ))
            ) : (
              <p className="text-gray-500">No bookings found.</p>
            )}
          </motion.div>
        </div>
      </>
    );
  }
};

export default MyBooking;
