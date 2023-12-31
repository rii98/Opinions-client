import { IoChevronBack, IoChevronForward } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
const Footer = () => {
  const navigate = useNavigate();
  return (
    <div className="flex justify-center">
      <footer className="absolute bottom-0 gap-4 bg-teal-400 rounded-lg text-white p-2 flex justify-center ">
        <div onClick={() => navigate(-1)}>
          <IoChevronBack size={25} />
        </div>
        <div onClick={() => navigate(1)}>
          <IoChevronForward size={25} />
        </div>
      </footer>
    </div>
  );
};

export default Footer;
