import { useState } from "react";
import { NavLink } from "react-router-dom";
import { assets } from "../assets/assets";
import DesktopNav from "../components/DesktopNav";
import MobileToggle from "../components/MobileToggle";
import { supabase } from "../supabase-cleint";
import MobileNav from "../components/MobileNav";
import { motion } from "framer-motion";

const Navbar = ({ user, setShowLogin }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinkClass = "text-[#0f172a] hover:text-[#64748b] transition-colors";
  const activeClass = "text-[#3b82f6] font-semibold";

  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.href = "/";
  };

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 w-full z-40 bg-[#f8fafc] backdrop-blur-lg border-b border-white/10 shadow-lg"
    >
      <div className="max-w-6xl mx-auto py-2 px-5 sm:px-5">
        <div className="flex justify-between items-center h-16">
          <NavLink
            to="/"
            className="hidden md:block font-mono text-xl font-bold text-[#0f172a] leading-4"
          >
            Cebu Don <br />
            moto<span className="text-[#3b82f6]">.rental</span>
          </NavLink>

          <div className="h-20 w-20">
            <motion.img
              whileHover={{ scale: 1.05 }}
              className="h-full w-full"
              src={assets.logo}
              alt="Logo"
            />
          </div>
          <DesktopNav
            navLinkClass={navLinkClass}
            activeClass={activeClass}
            handleLogout={handleLogout}
            user={user}
            setShowLogin={setShowLogin}
          />
          <MobileToggle setMenuOpen={setMenuOpen} menuOpen={menuOpen} />
        </div>
      </div>
      <MobileNav
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
        user={user}
        handleLogout={handleLogout}
        setShowLogin={setShowLogin}
      />
    </motion.nav>
  );
};

export default Navbar;
