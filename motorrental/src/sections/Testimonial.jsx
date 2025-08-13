import PrimaryTitle from "../components/PrimaryTitle";
import SubTitle from "../components/SubTitle";
import TestimonialCard from "../components/TestimonialCard";

const Testimonial = () => {
  const testimonial = [
    {
      image:
        "https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=200",
      name: "Test lang",
      address: "Jagobiao, Mandaue",
      stars: 4,
      description:
        "I've been using imagify for nearly two years, primarily for Instagram, and it has been incredibly user-friendly, making my work much easier.",
    },
    {
      image:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200&h=200&auto=format&fit=crop",
      name: "Richard Nelson",
      address: "Tondo, Manila",
      stars: 5,
      description:
        "I've been using imagify for nearly two years, primarily for Instagram, and it has been incredibly user-friendly, making my work much easier.",
    },

    {
      image:
        "https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=200",
      name: "Dave Merino",
      address: "Batingan, Binangonan",
      stars: 3,
      description:
        "I've been using imagify for nearly two years, primarily for Instagram, and it has been incredibly user-friendly, making my work much easier.",
    },
  ];

  return (
    <section className="mt-20 max-w-6xl mx-auto">
      <div className="text-center ">
        <PrimaryTitle title="Reviews" />
      </div>
      <div className="text-center mt-5 mb-15">
        <SubTitle subTitle="What our Customer Says" />
      </div>
      <div className="flex flex-wrap items-center justify-center gap-6 pt-14 ">
        {testimonial.map((data) => (
          <TestimonialCard key={data.name} data={data} />
        ))}
      </div>
    </section>
  );
};

export default Testimonial;
