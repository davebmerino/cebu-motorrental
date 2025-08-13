import { useState } from "react";
import PrimaryTitle from "../../components/PrimaryTitle";
import SubTitle from "../../components/SubTitle";
import { assets } from "../../assets/assets";
import { useAppContext } from "../../context/AppContext";

import toast from "react-hot-toast";

const AddMotor = () => {
  const { axios } = useAppContext();

  const [image, setImage] = useState(null);
  const [moto, setMoto] = useState({
    brand: "",
    model: "",
    year: 0,
    pricePerDay: 0,
    displacement: "",
    category: "",
    transmission: "",
    description: "",
    available: true,
  });

  const [isloading, setIsLoading] = useState(false);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    if (isloading) return null;

    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append("image", image);
      formData.append("motoData", JSON.stringify(moto));

      const { data } = await axios.post("/api/owner/add-motor", formData);

      if (data.success) {
        toast.success(data.message);
        setImage(null);
        setMoto({
          brand: "",
          model: "",
          year: 0,
          pricePerDay: 0,
          displacement: "",
          category: "",
          transmission: "",
          description: "",
          available: true,
        });
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="max-w-5xl mx-auto mt-20 sm:p-4 md:p-6 lg:p-8">
      <div className="flex flex-col sm:p-4">
        <PrimaryTitle title="Add New Motorcycle" />
        <SubTitle subTitle="Fill in the details to list a new motorcycle for booking, pricing, avalibility, and motorcycle specifications" />
      </div>

      <form
        className="w-full sm:m-4 p-5 shadow-2xl rounded-xl gap-4"
        onSubmit={onSubmitHandler}
      >
        <div className="flex flex-row my-5 p-5 gap-2 items-center">
          <label htmlFor="moto-image">
            <img
              src={image ? URL.createObjectURL(image) : assets.imageUpload}
              alt=""
              className="h-14 rounded cursor-point"
            />
            <input
              type="file"
              id="moto-image"
              accept="image/*"
              hidden
              onChange={(e) => setImage(e.target.files[0])}
            />
          </label>
          <p className="text-sm font-extralight">
            Upload your motorcycle photo
          </p>
        </div>
        <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col">
            <label>Brand</label>
            <input
              type="text"
              placeholder="(ex. Honda, Yamaha)"
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue"
              onChange={(e) => setMoto({ ...moto, brand: e.target.value })}
              value={moto.brand}
            />
          </div>
          <div className="flex flex-col">
            <label>Model</label>
            <input
              type="text"
              placeholder=" (ex. Nmax 155, Click 125)"
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue"
              onChange={(e) => setMoto({ ...moto, model: e.target.value })}
              value={moto.model}
            />
          </div>

          <div className="flex flex-col">
            <label>Year Model</label>
            <input
              type="number"
              placeholder="2025"
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue"
              onChange={(e) => setMoto({ ...moto, year: e.target.value })}
              value={moto.year}
            />
          </div>

          <div className="flex flex-col">
            <label>Daily rate</label>
            <input
              type="number"
              placeholder="450"
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue"
              onChange={(e) =>
                setMoto({ ...moto, pricePerDay: e.target.value })
              }
              value={moto.pricePerDay}
            />
          </div>

          <div className="flex flex-col">
            <label>Displacement</label>
            <input
              type="text"
              placeholder="(ex. 155cc, 125cc, 150cc)"
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue"
              onChange={(e) =>
                setMoto({ ...moto, displacement: e.target.value })
              }
              value={moto.displacement}
            />
          </div>

          <div className="flex flex-col">
            <label>Category</label>
            <input
              type="text"
              placeholder=" (ex. Scooter, Sportbike, Cruiser)"
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue"
              onChange={(e) => setMoto({ ...moto, category: e.target.value })}
              value={moto.category}
            />
          </div>

          <div className="flex flex-col">
            <label>Transmission</label>
            <input
              type="text"
              placeholder="(ex. CVT, Manual)"
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue"
              onChange={(e) =>
                setMoto({ ...moto, transmission: e.target.value })
              }
              value={moto.transmission}
            />
          </div>

          <div className="flex flex-col">
            <label>Description</label>
            <textarea
              row="2"
              placeholder="Description"
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue"
              onChange={(e) =>
                setMoto({ ...moto, description: e.target.value })
              }
              value={moto.description}
            />
          </div>
        </div>
        <div className="flex justify-center mt-10">
          <button className="bg-[#1e293b] cursor-pointer hover:bg-[#3b82f6] transition-all px-6 py-3 text-white font-medium rounded-xl text-sm w-full md:w-auto">
            {isloading ? "Adding..." : "Add Motorcycle"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddMotor;
