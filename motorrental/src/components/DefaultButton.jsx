const DefaultButton = ({ onClick, logoIcon, title }) => {
  return (
    <>
      <button
        className="flex items-center text-[#0f172a] hover:text-[#64748b] hover:cursor-pointer transition-colors text-md gap-2"
        onClick={onClick}
      >
        {title}
        <span className="text-lg">{logoIcon}</span>
      </button>
    </>
  );
};

export default DefaultButton;
