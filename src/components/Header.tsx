import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { usePosts } from "../context/PostContext";
import { IoIosAddCircle, IoIosSearch } from "react-icons/io";
import { GiHamburgerMenu } from "react-icons/gi";
import { FaUserCircle, FaTrophy } from "react-icons/fa";
const Header = () => {
  const { verified, setVerified } = useAuth();
  const { setPosts } = usePosts();
  const navigate = useNavigate();
  return (
    <div className="flex p-4 sm:p-2 items-center text-white shadow-md mb-6 sticky top-0 z-[1000] bg-teal-400 sm:px-6 ">
      <div className="flex-1 text-lg font-bold sm:text-2xl">
        <Link to="/">Opinions</Link>
      </div>
      <div>
        <div className="drawer sm:hidden">
          <input id="my-drawer" type="checkbox" className="drawer-toggle" />
          <div className="drawer-content">
            {/* Page content here */}
            <label htmlFor="my-drawer">
              <GiHamburgerMenu size={25} />
            </label>
          </div>
          <div className="drawer-side">
            <label
              htmlFor="my-drawer"
              aria-label="close sidebar"
              className="drawer-overlay"
            ></label>

            {verified ? (
              <ul className="menu p-4 w-80 gap-4 min-h-full bg-base-200 text-base-content font-semibold">
                <li>
                  <Link to="/post/create" className="flex items-center">
                    <IoIosAddCircle size={30} />
                    <span>Create New</span>
                  </Link>
                </li>
                <li>
                  <Link to="/search" className="flex items-center">
                    <IoIosSearch size={30} />
                    <span>Search</span>
                  </Link>
                </li>
                <li>
                  <Link
                    to={`/profile/${localStorage.getItem("id")}`}
                    className="sm:text-lg"
                  >
                    <FaUserCircle size={25} />
                    <span>Profile</span>
                  </Link>
                </li>
                <li>
                  <Link to="/popular" className="sm:text-lg">
                    <FaTrophy size={25} />
                    <span>Popular</span>
                  </Link>
                </li>
                <li>
                  <button
                    className="btn btn-error text-white sm:text-md pt-4"
                    onClick={() => {
                      localStorage.removeItem("access-token");
                      setVerified(false);
                      setPosts([]);
                      navigate("/login");
                    }}
                  >
                    Log out
                  </button>
                </li>
              </ul>
            ) : (
              <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content font-semibold">
                <li>
                  <Link to="/login">Login</Link>
                  <Link to="/singup">Signup</Link>
                </li>
              </ul>
            )}
          </div>
        </div>
      </div>
      <nav className="hidden sm:block">
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
            <Link to="/search" className="flex items-center">
              <IoIosSearch size={30} />
              <span className="hidden sm:inline">Search</span>
            </Link>
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
      </nav>
    </div>
  );
};

export default Header;
