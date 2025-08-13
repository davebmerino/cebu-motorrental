const TestimonialCard = ({ data }) => {
  return (
    <div className="text-sm w-80 border border-gray-500/30 pb-6 rounded-lg bg-white shadow-[0px_4px_15px_0px] shadow-black/5">
      <div className="flex flex-col items-center px-5 py-4 relative">
        <img
          className="h-24 w-24 absolute -top-14 rounded-full"
          src={data.image}
          alt={data.name}
        />
        <div className="pt-8 text-center">
          <h1 className="text-lg font-medium text-gray-800">{data.name}</h1>
          <p className="text-gray-800/80">{data.address}</p>
        </div>
      </div>
      <p className="text-gray-500 px-6 text-center">{data.description}</p>
      <div className="flex justify-center pt-4">
        <div className="flex gap-0.5">
          {[...Array(5)].map((_, index) => (
            <svg
              key={index}
              width="18"
              height="18"
              viewBox="0 0 22 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10.525.464a.5.5 0 0 1 .95 0l2.107 6.482a.5.5 0 0 0 .475.346h6.817a.5.5 0 0 1 .294.904l-5.515 4.007a.5.5 0 0 0-.181.559l2.106 6.483a.5.5 0 0 1-.77.559l-5.514-4.007a.5.5 0 0 0-.588 0l-5.514 4.007a.5.5 0 0 1-.77-.56l2.106-6.482a.5.5 0 0 0-.181-.56L.832 8.197a.5.5 0 0 1 .294-.904h6.817a.5.5 0 0 0 .475-.346z"
                fill={index < data.stars ? "#FF532E" : "#E5E7EB"}
              />
            </svg>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TestimonialCard;
