import Steps from "../components/Steps";
import SubTitle from "../components/SubTitle";
import PrimaryTitle from "../components/PrimaryTitle";

const cardData = [
  {
    number: "1",
    subTitle: "Choose a Motor-cycle",
    content:
      "View our range of motorcycle that fits for your needs, riding style and budget ",
  },
  {
    number: "2",
    subTitle: "Contact with Us",
    content:
      "We are ready to help you out for the booking process just contact us on our social media",
  },
  {
    number: "3",
    subTitle: "Enjoy Riding",
    content:
      "Recieve the unit and enjoy riding around cebu, We treat all our motorcycles with respect ",
  },
];

const RentSteps = () => {
  return (
    <>
      <section className="bg-[#f8fafc] py-16 px-4 max-w-6xl mx-auto mb-15">
        <div className="max-w-6xl mx-auto text-center mb-10">
          <PrimaryTitle title="How to Rent " />
          <SubTitle subTitle="Follow these easy steps to get your motorcycle rental in no time!" />
        </div>
        <div className="flex flex-col md:flex-row gap-6 justify-center items-stretch px-4">
          {cardData.map((card) => (
            <Steps key={card.number} card={card} />
          ))}
        </div>
      </section>
    </>
  );
};

export default RentSteps;
