import About from "../sections/About";
import FeaturedMoto from "../sections/FeaturedMoto";
import Hero from "../sections/Hero";
import RentNow from "../sections/RentNow";
import RentSteps from "../sections/RentSteps";
import ContactUs from "../sections/ContactUs";
import Testimonial from "../sections/Testimonial";
import NewLetter from "../sections/NewLetter";
import ScrollFadeIn from "../components/ScrollFadeIn";

const Home = ({ motorCycles }) => {
  return (
    <>
      <Hero />
      <ScrollFadeIn>
        <RentSteps />
      </ScrollFadeIn>

      <ScrollFadeIn>
        <FeaturedMoto motorCycles={motorCycles} />
      </ScrollFadeIn>
      <ScrollFadeIn>
        <RentNow motorCycles={motorCycles} />
      </ScrollFadeIn>
      <ScrollFadeIn>
        <About />
      </ScrollFadeIn>
      <ScrollFadeIn>
        <ContactUs />
      </ScrollFadeIn>
      <ScrollFadeIn>
        <Testimonial />
      </ScrollFadeIn>
      <ScrollFadeIn>
        <NewLetter />
      </ScrollFadeIn>
    </>
  );
};

export default Home;
