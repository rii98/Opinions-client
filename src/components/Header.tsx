import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { usePosts } from "../context/PostContext";
import { IoIosAddCircle } from "react-icons/io";

const Header = () => {
  const { verified, setVerified } = useAuth();
  const { setPosts } = usePosts();
  const navigate = useNavigate();
  return (
    <div className="navbar text-white shadow-md mb-6 sticky top-0 z-[1000] bg-teal-400 sm:px-6">
      <div className="flex-1  font-bold sm:text-2xl">
        <Link to="/">Opinions</Link>
      </div>

      <ul className="flex gap-2 sm:gap-4 lg:gap-6 items-center ">
        <li>
          {verified && (
            <Link to="/post/create" className="flex items-center">
              <IoIosAddCircle size={30} />
              <span className="hidden sm:inline">Create New</span>
            </Link>
          )}
        </li>
        <li>
          {verified && (
            <Link
              to={`/profile/${localStorage.getItem("id")}`}
              className="sm:text-lg"
            >
              Profile
            </Link>
          )}
        </li>
        <li>
          <Link to="/popular" className="sm:text-lg">
            Popular
          </Link>
        </li>
        <li>
          {verified && (
            <button
              className="btn btn-error text-white sm:text-md"
              onClick={() => {
                localStorage.removeItem("access-token");
                setVerified(false);
                setPosts([]);
                navigate("/login");
              }}
            >
              Log out
            </button>
          )}
        </li>
      </ul>
    </div>
  );
};

export default Header;
