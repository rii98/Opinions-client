import { FaTrophy, FaUserCircle } from "react-icons/fa";
import { IoIosAddCircle, IoIosSearch } from "react-icons/io";
import { IoChevronBack, IoChevronForward } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
const Footer = () => {
  const navigate = useNavigate();
  const { verified } = useAuth();
  return (
    <div>
      <div className="flex justify-center">
        <footer className="absolute bottom-0 gap-4 bg-blue-800 rounded-lg text-white p-2  justify-center hidden md:flex">
          <div onClick={() => navigate(-1)}>
            <IoChevronBack size={25} />
          </div>
          <div onClick={() => navigate(1)}>
            <IoChevronForward size={25} />
          </div>
        </footer>
      </div>
      {verified && (
        <footer className="fixed bottom-0 gap-4 bg-blue-800 rounded-lg text-white p-4 flex left-0 right-0 justify-between md:hidden mb-0">
          <Link
            to={`/profile/${localStorage.getItem("id")}`}
            className="md:text-lg"
          >
            <FaUserCircle size={25} />
          </Link>

          <Link to="/post/create" className="flex items-center">
            <IoIosAddCircle size={30} />
          </Link>

          <Link to="/search" className="flex items-center">
            <IoIosSearch size={30} />
          </Link>

          <Link to="/popular" className="md:text-lg">
            <FaTrophy size={25} />
          </Link>
        </footer>
      )}
    </div>
  );
};

export default Footer;
