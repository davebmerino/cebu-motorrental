import User from "../models/User.js";
import bcrypt from "bcrypt";

import jwt from "jsonwebtoken";

import Moto from "../models/Motors.js";

//generate JWT
const generateToken = (userId) => {
  // const payload = userId;
  // return jwt.sign(payload, process.env.JWT_SECRET);
  // const payload = { id: userId };
  // return jwt.sign(payload, process.env.JWT_SECRET);

  return jwt.sign({ id: userId }, process.env.JWT_SECRET);
};

// register user
export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password || password.length < 8) {
      return res.json({ success: false, message: "fill all the fields" });
    }

    const userExist = await User.findOne({ email });
    if (userExist) {
      return res.json({ success: false, message: "User already exist" });
    }

    const hashPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashPassword });
    const token = generateToken(user._id.toString());
    return res.json({ success: true, token });
  } catch (error) {
    console.log(error.message);
    return res.json({ success: false, message: error.message });
  }
};

//Log in user
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.json({ success: false, message: " User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.json({ success: false, message: " Invalid Credentials" });
    }

    const token = generateToken(user._id.toString());
    return res.json({ success: true, token });
  } catch (error) {
    console.log(error.message);
    return res.json({ success: false, message: error.message });
  }
};

//get user data using JWT (token)

// export const getUserData = async (req, res) => {
//   try {
//     const { user } = req.user;
//     res.json({ success: true, user });
//   } catch (error) {
//     res.json({ success: false, message: error.message });
//   }
// };

export const getUserData = async (req, res) => {
  try {
    console.log("🔍 req.user", req.user);
    res.json({ success: true, user: req.user });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get the motorcycles Data
export const getMotorCycles = async (req, res) => {
  try {
    const motors = await Moto.find();
    res.json({ success: true, motors });
  } catch (error) {
    console.error("Error fetching motorcycles:", error.message);
    res
      .status(500)
      .json({ success: false, message: "Failed to fetch motorcycles" });
  }
};

// Get details of a specific motorcycle by ID
export const getMotorCycleById = async (req, res) => {
  try {
    const { id } = req.params;

    // Find the motorcycle by ID
    const motor = await Moto.findById(id);

    // If motorcycle not found
    if (!motor) {
      return res.status(404).json({
        success: false,
        message: "Motorcycle not found",
      });
    }

    // Return the motorcycle data
    return res.json({
      success: true,
      motor,
    });
  } catch (error) {
    console.error("Error fetching motorcycle details:", error.message);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch motorcycle details",
    });
  }
};
