// import jwt from "jsonwebtoken";
// import User from "../models/User.js";

// export const protect = async (req, res, next) => {
//   const token = req.headers.authorization;
//   if (!token) {
//     return res.json({ success: false, message: " not authorized" });
//   }
//   try {
//     const userId = jwt.decode(token, process.env.JWT_SECRET);

//     if (!userId) {
//       return res.json({ success: false, message: "not authorized" });
//     }

//     res.user = await User.findById(userId).select("-password");
//     next();
//   } catch (error) {
//     return res.json({ success: false, message: " not authorized" });
//   }
// };
import jwt from "jsonwebtoken";
import User from "../models/User.js";

// export const protect = async (req, res, next) => {
//   try {
//     let token = req.headers.authorization;

//     if (!token) {
//       return res
//         .status(401)
//         .json({ success: false, message: "Not authorized, no token provided" });
//     }

//     // Remove Bearer prefix if present
//     if (token.startsWith("Bearer ")) {
//       token = token.split(" ")[1];
//     }

//     // Verify token (not just decode)
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     const userId = typeof decoded === "object" ? decoded.id : decoded;
//     console.log("Decoded token:", decoded); // Debug log

//     const user = await User.findById(userId).select("-password");

//     if (!user) {
//       return res
//         .status(401)
//         .json({ success: false, message: "User not found" });
//     }

//     // Store in req.user (not res.user)
//     req.user = user;
//     next();
//   } catch (error) {
//     console.log("Auth error:", error.message);
//     return res.status(401).json({ success: false, message: "Not authorized" });
//   }
// };

export const protect = async (req, res, next) => {
  try {
    let token = req.headers.authorization;

    if (!token) {
      return res
        .status(401)
        .json({ success: false, message: "Not authorized, no token provided" });
    }

    // Remove Bearer prefix if present
    if (token.startsWith("Bearer ")) {
      token = token.split(" ")[1];
    }

    // Verify token and extract user ID properly
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id || decoded; // Support both object and string payloads

    console.log("Looking for user with ID:", userId);

    const user = await User.findById(userId).select("-password");

    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: "User not found" });
    }

    req.user = user;
    next();
  } catch (error) {
    console.log("Auth error:", error.message);
    return res
      .status(401)
      .json({ success: false, message: "Not authorized: " + error.message });
  }
};
