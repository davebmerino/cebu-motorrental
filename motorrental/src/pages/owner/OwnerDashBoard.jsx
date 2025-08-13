import PrimaryTitle from "../../components/PrimaryTitle";
import SubTitle from "../../components/SubTitle";
import {
  FaMotorcycle,
  FaClipboardList,
  FaExclamationTriangle,
} from "react-icons/fa";
import { useAppContext } from "../../context/AppContext";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const OwnerDashBoard = () => {
  const [dashboardData, setDashboardData] = useState({
    // Motorcycle data
    totalMotors: 0,
    motorcycleEarnings: 0,

    // Booking data
    totalBookings: 0,
    pendingBookings: 0,
    completedBookings: 0,
    recentBookings: [],
    totalEarnings: 0,

    // Loading states
    motorcyclesLoaded: false,
    bookingsLoaded: false,
  });

  const { axios, isOwner } = useAppContext();

  // Fetch motorcycle data from dashboard API
  const fetchMotorcycleData = async () => {
    try {
      const { data } = await axios.get("/api/owner/dashboard");
      if (data.success) {
        setDashboardData((prevData) => ({
          ...prevData,
          totalMotors: data.data.totalMotors,
          motorcycleEarnings: data.data.totalEarnings,
          motorcyclesLoaded: true,
        }));
      } else {
        toast.error(data.message || "Failed to fetch motorcycle data");
      }
    } catch (error) {
      console.error("Dashboard error:", error);
      toast.error(error.response?.data?.message || error.message);
    }
  };

  // Fetch booking data from bookings API
  const fetchBookingData = async () => {
    try {
      const { data } = await axios.get("/api/booking/owner-bookings");
      if (data.success) {
        setDashboardData((prevData) => ({
          ...prevData,
          totalBookings: data.dashBoardData.totalBookings,
          pendingBookings: data.dashBoardData.pendingBookings,
          completedBookings: data.dashBoardData.completedBookings,
          recentBookings: data.dashBoardData.recentBookings,
          totalEarnings: data.dashBoardData.totalEarnings,
          bookingsLoaded: true,
        }));
      } else {
        toast.error(data.message || "Failed to fetch booking data");
      }
    } catch (error) {
      console.error("Booking error:", error);
      toast.error(error.response?.data?.message || error.message);
    }
  };

  // Fetch both data sources when component mounts
  useEffect(() => {
    if (isOwner) {
      fetchMotorcycleData();
      fetchBookingData();
    }
  }, [isOwner]);

  // Refresh dashboard data (can be called after adding a motorcycle)
  // const refreshDashboard = () => {
  //   fetchMotorcycleData();
  //   fetchBookingData();
  // };

  const isLoading =
    !dashboardData.motorcyclesLoaded || !dashboardData.bookingsLoaded;

  return (
    <div className="max-w-5xl mx-auto mt-20 sm:p-2 md:p-6 lg:p-8">
      <div className="flex flex-col mb-6">
        <PrimaryTitle title="Owner Dashboard" />
        <SubTitle subTitle="Monitoring your motorcycles and bookings" />
      </div>

      {isLoading ? (
        <div className="text-center py-8">Loading dashboard data...</div>
      ) : (
        <>
          <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="flex flex-row justify-between shadow-lg rounded-2xl h-auto p-4 items-center">
              <div>
                <p className="text-xl font-light">Total Motorcycles</p>
                <span className="text-xl font-medium">
                  {dashboardData.totalMotors}
                </span>
              </div>
              <div>
                <FaMotorcycle className="text-2xl text-indigo-500" />
              </div>
            </div>

            <div className="flex flex-row justify-between shadow-lg rounded-2xl h-auto p-4 items-center">
              <div>
                <p className="text-xl font-light">Total Bookings</p>
                <span className="text-xl font-medium">
                  {dashboardData.totalBookings}
                </span>
              </div>
              <div>
                <FaClipboardList className="text-2xl text-blue-500" />
              </div>
            </div>

            <div className="flex flex-row justify-between shadow-lg rounded-2xl h-auto p-4 items-center">
              <div>
                <p className="text-xl font-light">Pending Bookings</p>
                <span className="text-xl font-medium">
                  {dashboardData.pendingBookings}
                </span>
              </div>
              <div>
                <FaExclamationTriangle className="text-2xl text-yellow-500" />
              </div>
            </div>

            <div className="flex flex-row justify-between shadow-lg rounded-2xl h-auto p-4 items-center">
              <div>
                <p className="text-xl font-light">Completed Bookings</p>
                <span className="text-xl font-medium">
                  {dashboardData.completedBookings}
                </span>
              </div>
              <div>
                <FaClipboardList className="text-2xl text-green-500" />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-10">
            <div className="col-span-2 gap-4 p-4 shadow-lg rounded-2xl">
              <div className="p-2 mt-5 mb-3">
                <h3 className="text-2xl">Recent Bookings</h3>
                <p className="text-sm text-gray-500">
                  Latest customer bookings
                </p>
              </div>

              {dashboardData.recentBookings &&
              dashboardData.recentBookings.length > 0 ? (
                dashboardData.recentBookings.map((booking, index) => (
                  <div
                    key={booking._id || index}
                    className="p-2 border-b last:border-b-0"
                  >
                    <div className="flex flex-row justify-between">
                      <div className="flex flex-row gap-4 items-center">
                        <FaClipboardList className="text-xl" />
                        <p className="flex flex-col text-base">
                          {booking.motor?.model || "Motorcycle"}
                          <span className="text-gray-600 text-xs">
                            {new Date(booking.startDate).toLocaleDateString()}
                          </span>
                        </p>
                      </div>
                      <div className="flex flex-row items-center">
                        <p className="text-gray-600 text-sm p-2">
                          ₱{booking.price}
                        </p>
                        <div className="inline-flex items-center">
                          <span
                            className={`px-3 py-1 text-xs font-medium rounded-full ${
                              booking.status === "confirmed"
                                ? "bg-green-300 text-green-900"
                                : booking.status === "pending"
                                ? "bg-yellow-300 text-yellow-900"
                                : "bg-red-300 text-red-900"
                            }`}
                          >
                            {booking.status.charAt(0).toUpperCase() +
                              booking.status.slice(1)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-4 text-center text-gray-500">
                  No recent bookings found
                </div>
              )}
            </div>

            <div className="flex flex-col gap-4 p-4 shadow-lg rounded-2xl">
              <div>
                <h3 className="text-xl font-medium">Total Revenue</h3>
                <p className="text-sm text-gray-500">From confirmed bookings</p>
              </div>
              <h3 className="text-3xl font-bold mt-4">
                ₱ {dashboardData.totalEarnings}
              </h3>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default OwnerDashBoard;
