import Column1 from "../components/Column1";
import Column2 from "../components/Column2";

const About = () => {
  return (
    <section className="flex flex-col-reverse md:flex-row items-center justify-between py-16 px-4 max-w-6xl mx-auto mb-40 gap-20 bg-[#ffffff] rounded-xl shadow-md p-6 flex-1 transition-all hover:shadow-lg hover:-translate-y-1 mt-20">
      <Column1 />
      <Column2 />
    </section>
  );
};

export default About;
