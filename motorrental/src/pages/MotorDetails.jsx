import { useNavigate, useParams } from "react-router-dom";

import DefaultButton from "../components/DefaultButton";
import { IoIosSkipBackward } from "react-icons/io";
import MotoForm from "../components/MotoForm";
import PrimaryTitle from "../components/PrimaryTitle";
import { useAppContext } from "../context/AppContext";
import { toast } from "react-hot-toast";
import { useEffect, useState } from "react";

const MotorDetails = () => {
  const { axios } = useAppContext();
  const { _id } = useParams();
  const [motor, setMotor] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMotorDetails = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(`/api/user/motorcycle/${_id}`);
        if (data.success) {
          setMotor(data.motor);
        } else {
          toast.error(data.message || "Failed to fetch motorcycle details");
        }
      } catch (error) {
        console.error("Error fetching details:", error);
        toast.error(error.response?.data?.message || error.message);
      } finally {
        setLoading(false);
      }
    };

    if (_id) {
      fetchMotorDetails();
    }
  }, [_id, axios]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  return motor ? (
    <>
      <div className="flex flex-row gap-1 mt-25 max-w-6xl mx-auto">
        <DefaultButton
          onClick={() => navigate(-1)}
          logoIcon={<IoIosSkipBackward />}
        ></DefaultButton>
        <h5>Back</h5>
      </div>
      <div className="max-w-7xl mt-20 mx-auto md:px-16 lg:px-24 xl:px-32">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 lg:gap-10 mt-8">
          <div className="lg:col-span-2">
            <img
              src={motor.image}
              alt={motor.model}
              className="w-full h-auto md:max-h-100 object-cover rounded-xl mb-6 shadow-md"
            />
            <div className="space-y-6">
              <div>
                <div className="flex gap-2 mb-4">
                  <PrimaryTitle title={motor.brand} />
                  <PrimaryTitle title={motor.model} />
                </div>

                <p className="text-gray-600 italic">{motor.description}</p>
                <p className="mt-2">
                  Availability:{" "}
                  <span
                    className={`font-bold ${
                      motor.available ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {motor.available ? "Available" : "Unavailable"}
                  </span>
                </p>
              </div>
            </div>
          </div>
          <div>
            {motor.available ? (
              <MotoForm moto={motor} />
            ) : (
              <div className="bg-red-50 border border-red-200 p-4 rounded-lg">
                <p className="text-red-600 font-medium">
                  This motorcycle is currently unavailable for booking.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  ) : (
    <>
      <div className="flex flex-row gap-1 mt-25 max-w-6xl mx-auto">
        <DefaultButton
          onClick={() => navigate(-1)}
          logoIcon={<IoIosSkipBackward />}
        ></DefaultButton>
        <h5>Back</h5>
      </div>
      <p className="mt-20 text-center text-lg">Loading...</p>
    </>
  );
};

export default MotorDetails;
