import { assets } from "../assets/assets";

const Column2 = () => {
  return (
    <>
      <div className="p-5 ">
        <img
          className="rounded-xl w-[350px] h-[450px] transition-transform duration-300 hover:scale-110"
          src={assets.aboutpic}
          alt="About Image"
        />
      </div>
    </>
  );
};

export default Column2;
