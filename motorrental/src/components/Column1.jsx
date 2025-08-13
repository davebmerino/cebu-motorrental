import MySocialMedia from "./MySocialMedia";
import PrimaryTitle from "./PrimaryTitle";
import SubTitle from "./SubTitle";

const Column1 = () => {
  return (
    <div className="flex-wrap p-5 flex-1/2">
      <div className="mx-auto mb-10">
        <SubTitle subTitle="Don Moto Rentals" />
        <PrimaryTitle title="We more than just" />
        <span className="text-2xl text-[#3b82f6] font-bold">
          a Rental Motocycle
        </span>
      </div>
      <div className="mb-15">
        <p>
          A bike is not just a means of transportation, it’s a feeling of
          freedom and adventure. <br /> With the wind in your face and the road
          beneath you, each journey becomes an escape from the ordinary. It's
          not just transportation; it's a way of life, a pursuit of adventure
          that begins with the turn of a key.
        </p>
      </div>
      <div className="flex flex-col gap-2 justify-center mb-15 align-middle text-center items-center">
        <MySocialMedia />
      </div>
      <div className="flex justify-center mt-6 ">
        <button className="bg-[#1e293b] text-[#e2e8f0] px-6 py-3 rounded-full shadow-md hover:bg-[#3b82f6] hover:text-white hover:shadow-lg hover:scale-105 transition-all duration-300 ease-in-out cursor-pointer">
          Rent now
        </button>
      </div>
    </div>
  );
};

export default Column1;
