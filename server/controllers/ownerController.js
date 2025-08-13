import imagekit from "../configs/imageKit.js";
import Moto from "../models/Motors.js";
import User from "../models/User.js";
import fs from "fs";

// change user role
export const changeRoleToOwner = async (req, res) => {
  try {
    const { _id } = req.user;
    await User.findByIdAndUpdate(_id, { role: "owner" });
    res.json({ success: true, message: "Updated" });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};

// list Moto
export const addMoto = async (req, res) => {
  try {
    const { _id } = req.user;
    let motor = JSON.parse(req.body.motoData);
    const imageFile = req.file;

    //upload image to imagekit
    const fileBuffer = fs.readFileSync(imageFile.path);
    const response = await imagekit.upload({
      file: fileBuffer,
      fileName: imageFile.originalname,
      folder: "/motors",
    });

    // For URL Generation, works for both images and videos
    var optimizedImageURL = imagekit.url({
      path: response.filePath,

      transformation: [
        { width: "1280" },
        { quality: "auto" },
        { format: "webp" },
      ],
    });

    const image = optimizedImageURL;
    await Moto.create({ ...motor, owner: _id, image });

    res.json({ success: true, message: "Motor Added" });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};

//API to list owned motors
export const listOwnedMotors = async (req, res) => {
  try {
    const { _id } = req.user;
    const motors = await Moto.find();

    if (motors.length === 0) {
      return res.json({
        success: false,
        message: "No motors found for this owner.",
      });
    }

    return res.json({ success: true, motors });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};

//Togggle motor availability
export const toggleMotorAvailability = async (req, res) => {
  try {
    const { _id } = req.user;
    const { motorId } = req.body;
    const motor = await Moto.findById(motorId);

    //checking if the motor exists and belongs to the owner
    // if (!motor || motor.owner.toString() !== _id.toString()) {
    //   return res.json({ success: false, message: "Unauthorized access" });
    // }

    //checking if the motor exists
    if (!motor) {
      return res.json({ success: false, message: "Motor not found" });
    }

    //checking if the motor belongs to the owner
    if (motor.owner.toString() !== _id.toString()) {
      return res.json({ success: false, message: "Unauthorized access" });
    }

    motor.available = !motor.available;
    await motor.save();

    return res.json({
      success: true,
      message: `Motor is now ${
        motor.available ? "available" : "not available"
      }`,
    });

    // if (!motor) {
    //   return res.json({ success: false, message: "Motor not found" });
    // }
  } catch (error) {
    console.log(error.message);
    return res.json({ success: false, message: error.message });
  }
};

//API to delete a motor
export const deleteMotor = async (req, res) => {
  try {
    const { _id } = req.user;
    const { motorId } = req.body;
    const motor = await Moto.findById(motorId);

    //checking if the motor exists and belongs to the owner
    if (!motor || motor.owner.toString() !== _id.toString()) {
      return res.json({ success: false, message: "Unauthorized access" });
    }

    motor.owner = null;
    motor.available = false;
    await motor.save();

    await Moto.findByIdAndDelete(motorId);
    return res.json({ success: true, message: "Motor deleted successfully" });
  } catch (error) {
    console.log(error.message);
    return res.json({ success: false, message: error.message });
  }
};

//API dashboard for Data
export const dashboardData = async (req, res) => {
  try {
    const { _id, role } = req.user;

    if (role !== "owner") {
      return res.json({ success: false, message: "Unauthorized access" });
    }

    const motors = await Moto.find();
    if (motors.length === 0) {
      return res.json({ success: false, message: "No motors found" });
    }

    const totalMotors = await Moto.countDocuments();
    const totalEarnings = await Moto.aggregate([
      { $match: { available: false } },
      { $group: { _id: null, total: { $sum: "$pricePerDay" } } },
    ]);

    return res.json({
      success: true,
      data: {
        totalMotors,
        totalEarnings: totalEarnings[0] ? totalEarnings[0].total : 0,
      },
    });
  } catch (error) {
    console.log(error.message);
    return res.json({ success: false, message: error.message });
  }
};

// API to update user image
export const updateUserImage = async (req, res) => {
  try {
    const { _id } = req.user;
    const imageFile = req.file;

    //upload image to imagekit
    const fileBuffer = fs.readFileSync(imageFile.path);
    const response = await imagekit.upload({
      file: fileBuffer,
      fileName: imageFile.originalname,
      folder: "/users",
    });

    // optimized image URL
    var optimizedImageURL = imagekit.url({
      path: response.filePath,
      transformation: [
        {
          quality: "auto",
          width: 500,
          height: 500,
          crop: "fill",
        },
      ],
    });
    const image = optimizedImageURL;
    await User.findByIdAndUpdate(_id, { image });

    res.json({ success: true, image: optimizedImageURL });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};
