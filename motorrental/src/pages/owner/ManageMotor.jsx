import { useEffect, useState } from "react";
import PrimaryTitle from "../../components/PrimaryTitle";
import SubTitle from "../../components/SubTitle";

import { FaRegEyeSlash, FaEye, FaTrashAlt } from "react-icons/fa";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";

const ManageMotor = () => {
  const { isOwner, axios } = useAppContext();

  const [motors, setMoto] = useState([]);

  const fetchMotoData = async () => {
    try {
      const { data } = await axios.get("/api/owner/list-motors");
      if (data.success) {
        setMoto(data.motors);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleToggleAvailability = async (motorId) => {
    try {
      const { data } = await axios.post("/api/owner/toggle-motor", {
        motorId,
      });
      if (data.success) {
        toast.success(data.message);
        fetchMotoData();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleDeleteMoto = async (motorId) => {
    try {
      const confirmDelete = window.confirm(
        "Are you sure you want to delete this motorcycle?"
      );

      if (!confirmDelete) return null;

      const { data } = await axios.post("/api/owner/delete-motor", {
        motorId,
      });
      if (data.success) {
        toast.success(data.message);
        fetchMotoData();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    isOwner && fetchMotoData();
  }, [isOwner]);

  return (
    <div className="max-w-5xl mx-auto mt-20 sm:p-4 md:p-6 lg:p-8">
      <div className="flex flex-col sm:p-4">
        <PrimaryTitle title="Manage MotorCycle" />
        <SubTitle subTitle="Fill in the details to list a new motorcycle for booking, pricing, avalibility, and motorcycle specifications" />
      </div>
      <div className="max-w-4xl sm:m-4 p-5 shadow-2xl rounded-xl gap-4">
        <table className="w-full border-collapse text-left text-sm text-gray-600">
          <thead className="text-gray-500">
            <tr>
              <th className="p-3 font-medium">Moto</th>
              <th className="p-3 font-medium max-md:hidden">Brand</th>
              <th className="p-3 font-medium">Price</th>
              <th className="p-3 font-medium max-md:hidden">Status</th>
              <th className="p-3 font-medium">Action</th>
            </tr>
          </thead>
          <tbody>
            {motors.map((motor) => (
              <tr
                key={motor._id}
                className="border-t border-black items-center"
              >
                <td className="p-3 flex items-center gap-3">
                  <img
                    src={motor.image}
                    alt=""
                    className="h-12 w-12 aspect-square rounded-md object-cover"
                  />
                  <div className="max-md:hidden">
                    <p className="font-medium">
                      {motor.brand} {motor.model}
                    </p>
                    <p className="text-xs text-gray-500">
                      {motor.displacement} {motor.transmission}
                    </p>
                  </div>
                </td>

                <td className="p-3 max-md:hidden ">{motor.brand}</td>
                <td className="p-3 ">{motor.pricePerDay}/Day</td>
                <td className="p-3 ">
                  <span
                    className={`px-3 py-1 rounded-full text-xs ${
                      motor.available
                        ? "bg-green-100 text-green-600"
                        : "bg-red-100 text-red-600"
                    }`}
                  >
                    {motor.available ? "Available" : "Unavailable"}
                  </span>
                </td>

                <td className=" p-3">
                  <div className="flex items-center gap-3 justify-center">
                    {motor.available ? (
                      <FaRegEyeSlash
                        onClick={() => handleToggleAvailability(motor._id)}
                        className="cursor-pointer text-lg"
                      />
                    ) : (
                      <FaEye
                        onClick={() => handleToggleAvailability(motor._id)}
                        className="cursor-pointer text-lg"
                      />
                    )}
                    <FaTrashAlt
                      onClick={() => handleDeleteMoto(motor._id)}
                      className="cursor-pointer text-lg"
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageMotor;
