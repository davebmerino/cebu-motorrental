// import { createContext, useContext, useEffect, useState } from "react";
// import axios from "axios";
// import { toast } from "react-hot-toast";
// import { useNavigate } from "react-router";

// axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

// export const AppContext = createContext();
// export const AppProvider = ({ children }) => {
//   const navigate = useNavigate();
//   const [token, setToken] = useState(null);
//   const [user, setUser] = useState(null);
//   const [isOwner, setIsOwner] = useState(false);
//   const [showLogin, setShowLogin] = useState(false);
//   const [startDate, setStartDate] = useState(null);
//   const [endDate, setEndDate] = useState(null);

//   const [motorCycles, setMotorCycles] = useState([]);

//   //Fetch user data
//   const fetchUserData = async () => {
//     try {
//       const response = await axios.get("/api/user/data");
//       if (response.success) {
//         setUser(response.user);
//         setIsOwner(response.user.role === "owner");
//       } else {
//         navigate("/");
//       }
//     } catch (error) {
//       toast.error(error.message);
//     }
//   };

//   // function to fetch motor cycles
//   const fetchMotorCycles = async () => {
//     try {
//       const { data } = await axios.get("/api/owner/list-motors");
//       data.success
//         ? setMotorCycles(data.motorCycles)
//         : toast.error(data.message);
//     } catch (error) {
//       toast.error(error.message);
//     }
//   };

//   // funtion to log out the user
//   const logout = () => {
//     localStorage.removeItem("token");
//     setToken(null);
//     setUser(null);
//     setIsOwner(false);
//     axios.defaults.headers.common["Authorization"] = "";
//     toast.success("Logged out successfully");
//     navigate("/");
//   };

//   //useeffect to retrieve the token from local storage
//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     setToken(token);
//     fetchMotorCycles();
//   }, []);

//   //useeffect to fetch user data when token is available
//   useEffect(() => {
//     if (token) {
//       axios.defaults.headers.common["Authorization"] = `${token}`;
//       fetchUserData();
//     }
//   }, [token]);

//   const contextValue = {
//     navigate,
//     logout,
//     axios,
//     user,
//     setUser,
//     isOwner,
//     setIsOwner,
//     showLogin,
//     setShowLogin,
//     startDate,
//     setStartDate,
//     endDate,
//     setEndDate,
//     motorCycles,
//     setMotorCycles,
//   };

//   return (
//     <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
//   );
// };
// export const useAppContext = () => {
//   return useContext(AppContext);
// };
// export default AppProvider;

// improved version of AppContext.jsx
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router";

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

export const AppContext = createContext();
export const AppProvider = ({ children }) => {
  const navigate = useNavigate();
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const [isOwner, setIsOwner] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [motorCycles, setMotorCycles] = useState([]);

  // Fetch user data - FIXED
  const fetchUserData = async () => {
    try {
      const { data } = await axios.get("/api/user/data");
      if (data.success) {
        setUser(data.user);
        setIsOwner(data.user.role === "owner");

        // Only fetch motorcycles after confirming user authentication
        if (data.user.role === "owner") {
          fetchMotorCycles();
        }
      } else {
        toast.error(data.message || "Failed to fetch user data");
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
      toast.error(error.response?.data?.message || error.message);
    }
  };

  // Function to fetch motor cycles
  const fetchMotorCycles = async () => {
    try {
      const { data } = await axios.get("/api/owner/list-motors");
      if (data.success) {
        setMotorCycles(data.motors);
      } else {
        toast.error(data.message || "Failed to fetch motorcycles");
      }
    } catch (error) {
      console.error("Error fetching motorcycles:", error);
      toast.error(error.response?.data?.message || error.message);
    }
  };

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

  // Function to log out the user
  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
    setIsOwner(false);
    axios.defaults.headers.common["Authorization"] = "";
    toast.success("Logged out successfully");
    navigate("/");
  };

  // useEffect to retrieve the token from local storage - IMPROVED
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  // useEffect to fetch user data when token is available
  useEffect(() => {
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`; // Token directly, matching your backend
      fetchUserData();
    }
  }, [token]);

  const contextValue = {
    navigate,
    logout,
    fetchUserData, // Added to allow manual refresh
    fetchMotorCycles, // Added to allow manual refresh
    fetchAllAvailableMotorcycles, // Added to fetch all available motorcycles
    user,
    setUser,
    isOwner,
    setIsOwner,
    showLogin,
    setShowLogin,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    motorCycles,
    setMotorCycles,
    token,
    setToken,
    axios,
  };

  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  );
};

export const useAppContext = () => {
  return useContext(AppContext);
};

export default AppProvider;
