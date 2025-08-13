import { FaFacebookMessenger, FaFacebookF, FaInstagram } from "react-icons/fa";

const MySocialMedia = () => {
  return (
    <>
      <h5 className="text-md font-semibold mb-2">Follow Us</h5>
      <div className="flex space-x-4">
        <a
          href="https://facebook.com"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-[#1e293b] p-2 rounded-full text-white hover:bg-[#3b82f6] hover:text-white transition"
        >
          <FaFacebookF />
        </a>
        <a
          href="https://m.me"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-[#1e293b] p-2 rounded-full text-white hover:bg-[#3b82f6] hover:text-white transition"
        >
          <FaFacebookMessenger />
        </a>
        <a
          href="https://m.me"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-[#1e293b] p-2 rounded-full text-white hover:bg-[#3b82f6] hover:text-white transition"
        >
          <FaInstagram />
        </a>
      </div>
    </>
  );
};

export default MySocialMedia;
