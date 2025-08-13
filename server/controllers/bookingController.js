import Booking from "../models/bookings.js";
import Moto from "../models/Motors.js";

//function to check the availability of a motor
const checkAvailability = async (motor, startDate, endDate) => {
  const bookings = await Booking.find({
    motor,
    startDate: { $lte: endDate },
    endDate: { $gte: startDate },
  });
  return bookings.length === 0;
};

// Check and update motor availability
const checkAvailabilityOfMotor = async (req, res) => {
  try {
    const { motor, startDate, endDate } = req.body;

    //fetch motor if available
    const motorDetails = await Moto.find({ motor, available: true });

    //check motor availability in time range
    const availableMotorPromises = motorDetails.map(async (motor) => {
      const isAvailable = await checkAvailability(
        motor._id,
        startDate,
        endDate
      );
      return { motorId: motor._id, isAvailable: isAvailable };
    });

    const results = await Promise.all(availableMotorPromises);
    const filteredMotors = results.filter(
      (motor) => motor.isAvailable === true
    );

    return res.json({ success: true, availableMotor: filteredMotors });
  } catch (error) {
    console.error("Error checking motor availability:", error.message);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

// API to create a booking
const createBooking = async (req, res) => {
  try {
    const { _id } = req.body;
    const {
      owner,
      brand,
      model,
      image,
      year,
      category,
      motor,
      user,
      userName,
      startDate,
      endDate,
    } = req.body;

    // Check if the motor is available
    const isAvailable = await checkAvailability(motor, startDate, endDate);
    if (!isAvailable) {
      return res.status(400).json({
        success: false,
        message: "Motor not available for the selected dates.",
      });
    }
    const motorDetails = await Moto.findById(motor);
    //calculate the price based on the number of days
    const start = new Date(startDate);
    const end = new Date(endDate);
    const days = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
    const price = days * motorDetails.pricePerDay;

    // Create a new booking
    const booking = new Booking({
      owner,
      brand,
      model,
      image,
      year,
      category,
      motor,
      user,
      userName,
      startDate,
      endDate,
      price,
      status: "pending", // default
    });

    await booking.save();

    res.json({
      success: true,
      message: "Booking created successfully",
      booking,
    });
  } catch (error) {
    console.error("Error creating booking:", error.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// API to get bookings of all user
const getAllBookings = async (req, res) => {
  try {
    const { _id } = req.user;
    const bookings = await Booking.find()
      .populate("motor")
      .sort({ createdAt: -1 });

    res.json({ success: true, bookings });
  } catch (error) {
    console.error("Error fetching user bookings:", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};

//API get user booking
const getUserBookings = async (req, res) => {
  try {
    const userId = req.user._id;

    const bookings = await Booking.find({
      user: userId,
    })
      .populate("motor")
      .sort({ createdAt: -1 });

    res.json({ success: true, bookings });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

//API get bookings of an owner
const getOwnerBookings = async (req, res) => {
  try {
    if (req.user.role !== "owner") {
      return res
        .status(403)
        .json({ success: false, message: "Unauthorized access" });
    }
    const motor = await Moto.find({ owner: req.user._id });
    const bookings = await Booking.find({ owner: req.user._id })
      .populate("motor")
      .sort({ createdAt: -1 });

    const pendingBookings = await Booking.find({
      owner: req.user._id,
      status: "pending",
    });
    const completedBookings = await Booking.find({
      owner: req.user._id,
      status: "confirmed",
    });

    //calculate total earnings monthly
    const totalEarnings = bookings
      .slice()
      .filter((booking) => booking.status === "confirmed")
      .reduce((total, booking) => total + booking.price, 0);

    const dashBoardData = {
      totalMotor: motor.length,
      totalBookings: bookings.length,
      pendingBookings: pendingBookings.length,
      completedBookings: completedBookings.length,
      recentBookings: bookings.slice(0, 5),
      totalEarnings,
    };

    res.json({
      success: true,
      dashBoardData,
    });
  } catch (error) {
    console.error("Error fetching owner bookings:", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};

//API to change booking status
const changeBookingStatus = async (req, res) => {
  try {
    const userRole = req.user.role;
    const { bookingId, status } = req.body;

    const booking = await Booking.findById(bookingId);

    if (userRole === "owner") {
      booking.status = status;
      await booking.save();
      return res.json({
        success: true,
        message: "Booking status updated",
        booking,
      });
    }

    booking.status = status;
    await booking.save();

    res.json({ success: true, message: "Booking status updated", booking });
  } catch (error) {
    console.error("Error changing booking status:", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};

export {
  checkAvailability,
  changeBookingStatus,
  createBooking,
  getUserBookings,
  getOwnerBookings,
  checkAvailabilityOfMotor,
  getAllBookings,
};
