const BookingCard = ({ booking }) => {
  return (
    <>
      <div className="w-full flex justify-between items-center mt-10 border p-4 rounded-lg shadow-lg ">
        <div className="flex lg:flex-row md:flex-row justify-between items-center w-full p-4">
          <div className="flex flex-row gap-10 items-center">
            <div>
              <img
                src={booking.image}
                alt={booking.userName}
                className="w-full h-35 object-cover rounded-md  "
              />
              <p className="text-center">
                {booking.model} -
                <span className="text-gray-600"> {booking.category}</span>
              </p>
              <p className="text-sm text-gray-400 text-center">
                {booking.year} {booking.brand}
              </p>
            </div>
            <div className=" flex flex-col gap-4">
              <div>
                <p className="text-sm text-gray-400 ">Rental period</p>
                <p>
                  {new Date(booking.startDate).toLocaleDateString()} to{" "}
                  {new Date(booking.endDate).toLocaleDateString()}
                </p>
              </div>
              <div className="flex flex-col gap-2">
                <p className="text-sm text-gray-400 ">Booking Status</p>
                <p>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      booking.status === "confirmed"
                        ? "bg-green-100 text-green-600"
                        : booking.status === "pending"
                        ? "bg-yellow-100 text-yellow-600"
                        : "bg-red-100 text-red-600"
                    }`}
                  >
                    {booking.status.charAt(0).toUpperCase() +
                      booking.status.slice(1)}
                  </span>
                </p>
              </div>
            </div>
          </div>
          <div className="flex flex-col">
            <h3 className="text-lg text-start">
              Total:{" "}
              <span className="text-gray-500 text-lg">₱ {booking.price}</span>
            </h3>
            <p className="text-sm text-gray-400">
              Booked on:
              <span>{new Date(booking.createdAt).toLocaleDateString()}</span>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default BookingCard;
