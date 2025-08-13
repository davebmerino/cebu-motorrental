import { useEffect, useState } from "react";

import PrimaryTitle from "../../components/PrimaryTitle";
import SubTitle from "../../components/SubTitle";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";

const MyBooking = () => {
  const { axios } = useAppContext();

  const [bookings, setBookings] = useState([]);

  const fetchBookings = async () => {
    try {
      const { data } = await axios.get("/api/booking/all-user-bookings");
      data.success ? setBookings(data.bookings) : toast.error(data.message);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const changeBookingStatus = async (bookingId, status) => {
    try {
      const { data } = await axios.post("/api/booking/change-booking-status", {
        bookingId,
        status,
      });
      if (data.success) {
        toast.success(data.message);
        fetchBookings();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  return (
    <div>
      <div className="max-w-5xl mx-auto mt-20 sm:p-4 md:p-6 lg:p-8">
        <div className="flex flex-col sm:p-4">
          <PrimaryTitle title="Manage Bookings" />
          <SubTitle subTitle="Track all customer, approve or cancel requested and manage booking status" />
        </div>
        <div className="max-w-4xl sm:m-4 p-5 shadow-2xl rounded-xl gap-4">
          <table className="w-full border-collapse text-left text-sm text-gray-600">
            <thead className="text-gray-500">
              <tr>
                <th className="p-3 font-medium">Motorcycle</th>
                <th className="p-3 font-medium max-md:hidden">Date range</th>
                <th className="p-3 font-medium">Name</th>
                <th className="p-3 font-medium max-md:hidden">Payment</th>
                <th className="p-3 font-medium">Action</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(bookings) &&
                bookings.map((booking) => (
                  <tr key={booking._id} className="border-b hover:bg-gray-50">
                    <td className="p-3 flex items-center gap-3">
                      <img
                        src={booking.image}
                        alt=""
                        className="h-12 w-12 aspect-square rounded-md object-cover"
                      />
                      <div className="max-md:hidden">
                        <p className="font-medium">{booking.motor.model}</p>
                      </div>
                    </td>
                    <td className="p-3 max-md:hidden ">
                      {new Date(booking.startDate).toLocaleDateString()} to{" "}
                      {new Date(booking.endDate).toLocaleDateString()}
                    </td>
                    <td className="p-3  ">{booking.userName}</td>
                    <td className="p-3 max-md:hidden ">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium
                          ${
                            booking.status === "confirmed"
                              ? "bg-green-100 text-green-600"
                              : booking.status === "pending"
                              ? "bg-yellow-100 text-yellow-600"
                              : "bg-red-100 text-red-600"
                          }
                            `}
                      >
                        {booking.status === "confirmed"
                          ? "Confirmed"
                          : booking.status === "pending"
                          ? "Pending"
                          : "Cancelled"}
                      </span>
                    </td>
                    <td className="p-3">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          booking.status === "completed"
                            ? "bg-green-100 text-green-600"
                            : booking.status === "canceled"
                            ? "bg-red-100 text-red-600"
                            : ""
                        }  `}
                      >
                        {booking.status === "pending" ? (
                          <>
                            <select
                              onChange={(e) =>
                                changeBookingStatus(booking._id, e.target.value)
                              }
                              value={booking.status}
                              className="p-2 rounded-xl border"
                            >
                              <option value="pending">Pending</option>
                              <option value="cancelled">Cancel</option>
                              <option value="confirmed">Complete</option>
                            </select>
                          </>
                        ) : booking.status === "confirmed" ? (
                          "Confirmed"
                        ) : (
                          "Cancelled"
                        )}
                      </span>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MyBooking;
