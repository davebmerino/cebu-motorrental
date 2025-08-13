import { assets } from "../assets/assets";
import { FaSignOutAlt, FaArrowAltCircleRight } from "react-icons/fa";
import { MdDashboard } from "react-icons/md";
import { useState } from "react";
import DefaultButton from "../components/DefaultButton";
import SideNav from "../components/SideNav";
import { useAppContext } from "../context/AppContext";

const SideBar = () => {
  const { logout, user } = useAppContext();

  const [openSideNav, setOpenSideNav] = useState(false);

  const navLinkClass =
    "text-[#0f172a] hover:text-[#3b82f6] transition-colors text-sm";
  const activeClass = "text-[#3b82f6] font-semibold";

  return (
    <>
      {/* Logo + Logout Button */}
      <div className="fixed top-0 bg-white w-full px-4 py-2 border-b">
        <div className="flex max-w-5xl mx-auto justify-between items-center  ">
          <img src={assets.logo} alt="Logo" className="h-15 w-auto" />

          <div className="flex items-center gap-2">
            <p className="text-sm text-gray-600">Welcome,</p>
            <p className="text-lg font-semibold mr-5">{user.name}</p>
            <DefaultButton
              onClick={logout}
              logoIcon={<FaSignOutAlt />}
              title="Log Out"
            />
          </div>
        </div>
      </div>
      {openSideNav ? (
        <SideNav
          navLinkClass={navLinkClass}
          activeClass={activeClass}
          setOpenSideNav={setOpenSideNav}
          openSideNav={openSideNav}
        />
      ) : (
        <div
          className="fixed p-5 ml-2 text-2xl"
          onClick={() => setOpenSideNav((prev) => !prev)}
        >
          <FaArrowAltCircleRight />
        </div>
      )}
    </>
  );
};

export default SideBar;
