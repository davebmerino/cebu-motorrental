import { assets } from "../assets/assets";
import MySocialMedia from "../components/MySocialMedia";

import { motion } from "framer-motion";

const Footer = () => {
  return (
    <>
      <motion.footer
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full bg-[#1e293b] text-[#e2e8f0] py-10 px-4 mt-20 "
      >
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
          <div className="flex items-center gap-4">
            <img
              src={assets.logo}
              alt="Logo"
              className="w-25 h-25 rounded-full"
            />
            <div>
              <h4 className="text-xl font-bold">Cebu Don Moto Rentals</h4>
              <p className="text-sm text-[#cbd5e1]">
                Your adventure starts here.
              </p>
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h5 className="text-md font-semibold mb-2">Contact Us</h5>
            <p className="text-sm">📞 +63 942 951 0552</p>
            <p className="text-sm">📧 sherwenmerino2@gmail.com</p>
          </div>

          {/* Social Media */}
          <div>
            <MySocialMedia />
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-[#334155] mt-8 pt-6 text-center text-sm text-[#94a3b8]">
          © {new Date().getFullYear()} Cebu Don Moto Rentals. All rights
          reserved.
        </div>
      </motion.footer>
    </>
  );
};

export default Footer;
