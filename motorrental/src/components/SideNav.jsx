import { NavLink } from "react-router-dom";
import DefaultButton from "./DefaultButton";
import { FaWindowClose, FaMotorcycle, FaClipboardList } from "react-icons/fa";
import { MdDashboard, MdAddCircle } from "react-icons/md";
import { useAppContext } from "../context/AppContext";
import { assets } from "../assets/assets";
import { useState } from "react";
import toast from "react-hot-toast";

const SideNav = ({ navLinkClass, activeClass, setOpenSideNav }) => {
  const { user, axios, fetchUserData } = useAppContext();
  const [image, setImage] = useState("");

  const updateImage = async () => {
    try {
      // Check if image is selected
      if (!image) {
        toast.error("Please select an image first");
        return;
      }

      const formData = new FormData();
      formData.append("image", image);

      const { data } = await axios.post("/api/owner/update-image", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (data.success) {
        fetchUserData();
        toast.success("Image updated successfully");
        setImage("");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="w-60 h-screen bg-white border-r shadow-sm flex flex-col fixed">
      <div className="flex p-5 justify-end">
        <DefaultButton
          logoIcon={<FaWindowClose />}
          onClick={() => setOpenSideNav((prev) => !prev)}
        />
      </div>

      <div className="flex items-center justify-between p-4 mb-15">
        <div className="flex items-center mx-auto gap-2">
          <label htmlFor="image" className="cursor-pointer">
            <img
              src={user?.image || assets.uploadImage}
              alt="User"
              className="h-20 w-20 rounded-full"
            />
            <input
              type="file"
              id="image"
              className="hidden"
              accept="image/*"
              onChange={(e) => {
                // FIXED: Check if files exist and array has elements
                if (e.target.files && e.target.files.length > 0) {
                  setImage(e.target.files[0]);
                } else {
                  toast.error("No file selected");
                }
              }}
            />
            <div className="absolute hidden top-0 right-0 left-0 bottom-0 bg-black opacity-50 rounded-full group:hover:flex items-center justify-center cursor-pointer">
              <img src={assets.imageUpload} alt="Upload" />
            </div>
          </label>
        </div>
        {image && (
          <button
            className="absolute top-0 right-0 flex p-2 gap-1 bg-blue-100 text-white cursor-pointer rounded"
            onClick={updateImage}
          >
            Save
          </button>
        )}
      </div>

      {/* Top section with logo and nav links */}

      <div>
        {/* Navigation Links */}
        <nav className=" px-4 flex flex-col gap-4">
          <NavLink
            to="/owner"
            className={({ isActive }) =>
              `flex items-center align-middle ${navLinkClass} ${
                isActive ? activeClass : ""
              }`
            }
          >
            <span className="mr-2">
              <MdDashboard />
            </span>
            Dashboard
          </NavLink>
          <NavLink
            to="owner/addmotorcycle"
            className={({ isActive }) =>
              `flex items-center align-middle ${navLinkClass} ${
                isActive ? activeClass : ""
              }`
            }
          >
            <span className="mr-2">
              <MdAddCircle />
            </span>
            Add Motorcycle
          </NavLink>

          <NavLink
            to="/owner/managemotorcycle"
            className={({ isActive }) =>
              `flex items-center ${navLinkClass} ${isActive ? activeClass : ""}`
            }
          >
            <span className="mr-2">
              <FaMotorcycle />
            </span>
            Manage Motorcycle
          </NavLink>

          <NavLink
            to="/owner/managebookings"
            className={({ isActive }) =>
              `flex items-center ${navLinkClass} ${isActive ? activeClass : ""}`
            }
          >
            <span className="mr-2">
              <FaClipboardList />
            </span>
            Manage Booking
          </NavLink>
        </nav>
      </div>
    </div>
  );
};

export default SideNav;
