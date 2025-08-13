import { NavLink } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
// import toast from "react-hot-toast";

const DesktopNav = ({ activeClass, navLinkClass }) => {
  const { user, setShowLogin, logout } = useAppContext();

  // const changeRole = async () => {
  //   try {
  //     const { data } = await axios.post("/api/owner/change-role");
  //     if (data.success) {
  //       setIsOwner(true);
  //       toast.success(data.message);
  //     } else {
  //       toast.error(data.message);
  //     }
  //   } catch (error) {
  //     toast.error(error.message);
  //   }
  // };

  return (
    <>
      {/* Desktop nav */}
      <div className="hidden md:flex items-center space-x-8">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `${navLinkClass} ${isActive ? activeClass : ""}`
          }
        >
          Home
        </NavLink>
        <NavLink
          to="/motorcycles"
          className={({ isActive }) =>
            `${navLinkClass} ${isActive ? activeClass : ""}`
          }
        >
          Units
        </NavLink>
        <NavLink
          to="/mybookings"
          className={({ isActive }) =>
            `${navLinkClass} ${isActive ? activeClass : ""}`
          }
        >
          My Bookings
        </NavLink>
        {!user ? (
          <button
            onClick={() => {
              user ? logout() : setShowLogin(true);
            }}
            to=""
            className="bg-[#1e293b] cursor-pointer hover:bg-[#3b82f6] transition-all px-6 py-3 text-white font-medium rounded-full text-sm w-full md:w-auto"
          >
            {/* {user ? "Log Out" : "Log In"} */}
            Log In
          </button>
        ) : (
          <div className="flex items-center gap-3">
            {user?.user_metadata?.avatar_url ? (
              <img
                src={user.user_metadata.avatar_url}
                alt="avatar"
                className="w-8 h-8 rounded-full object-cover border border-gray-300"
              />
            ) : (
              <img
                src="/default-avatar.png"
                alt="default avatar"
                className="w-8 h-8 rounded-full object-cover border border-gray-300"
              />
            )}
            <button
              onClick={logout}
              className="bg-red-500 text-white px-3 py-1 rounded hover:cursor-pointer"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default DesktopNav;
