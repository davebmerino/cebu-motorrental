import { useNavigate } from "react-router";

const MotoCard = ({ bike }) => {
  const navigate = useNavigate();

  return (
    <>
      <div className="p-4">
        <div
          onClick={() => {
            navigate(`/motorcycle-details/${bike._id}`);
          }}
          className="md:bg-white shadow-md hover:shadow-lg transition rounded-xl overflow-hidden flex flex-col items-center text-center h-full hover:cursor-pointer"
        >
          <img
            src={bike.image}
            alt={bike.model}
            className="h-48 w-full object-cover"
          />
          <div className="p-4">
            <h3 className="text-xl font-semibold text-[#0f172a]">
              <p className="text-gray-600 text-sm">{bike.brand}</p>
              {bike.model}
            </h3>
            <p className="text-gray-600 text-sm">{bike.description}</p>
            <span
              className={`mt-2 inline-block px-3 py-1 text-xs font-medium rounded-full ${
                bike.available === true
                  ? "bg-green-300 text-green-900"
                  : "bg-red-300 text-red-500"
              }`}
            >
              {bike.status}
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default MotoCard;
