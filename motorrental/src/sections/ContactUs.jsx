import PrimaryTitle from "../components/PrimaryTitle";
import SubTitle from "../components/SubTitle";

const ContactUs = () => {
  return (
    <>
      <section className="px-4 py-16 max-w-7xl mx-auto ">
        <div className="text-center">
          <PrimaryTitle title="Contact Us " />
        </div>
        <div className="text-center mb-15">
          <SubTitle subTitle="Our team will get in touch" />
        </div>

        <div className="flex flex-col-reverse md:flex-row gap-10 items-stretch">
          {/* Map Section */}
          <div className="w-full md:w-1/2 h-[300px] md:h-auto">
            <iframe
              title="Location Map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3924.737708066173!2d123.95246937503606!3d10.362844889761938!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x33a9980b7df24999%3A0xfab3623ff8114ca9!2sGK%20Eversley!5e0!3m2!1sen!2sph!4v1750997977751!5m2!1sen!2sph"
              width="600"
              height="450"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-full rounded-xl shadow-md border-0"
            />
          </div>

          {/* Form Section */}
          <div className="w-full md:w-1/2 bg-white shadow-md rounded-xl p-6 md:p-8">
            <h3 className="text-xl font-semibold text-[#1e293b] mb-6">
              Get in Touch
            </h3>
            <form className="space-y-4">
              <div>
                <label className="block text-sm text-gray-600 mb-1">Name</label>
                <input
                  type="text"
                  placeholder="Your Name"
                  className="w-full px-4 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  placeholder="you@email.com"
                  className="w-full px-4 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">
                  Message
                </label>
                <textarea
                  rows="4"
                  placeholder="Your message"
                  className="w-full px-4 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-blue-400"
                ></textarea>
              </div>
              <button
                type="submit"
                className="bg-[#1e293b] hover:bg-[#3b82f6] cursor-pointer text-white px-6 py-2 rounded-full shadow-md transition-all"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default ContactUs;
