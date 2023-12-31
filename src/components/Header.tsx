import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { usePosts } from "../context/PostContext";
import { IoIosAddCircle, IoIosSearch, IoIosCreate } from "react-icons/io";
import { GiHamburgerMenu } from "react-icons/gi";
import { FaUserCircle, FaTrophy } from "react-icons/fa";
import { LuLogIn } from "react-icons/lu";

const Header = () => {
  const { verified, setVerified } = useAuth();
  const { setPosts } = usePosts();
  const navigate = useNavigate();
  return (
    <div className="flex p-4 md:p-2 items-center bg-blue-900 text-white shadow-md mb-6 sticky top-0 z-[1000]  md:px-6 ">
      <div className="flex-1 text-lg font-bold md:text-2xl">
        <Link to="/">Opinions</Link>
      </div>
      <div>
        <div className="drawer md:hidden">
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
                <div className="text-lg text-teal-400 font-bold md:text-2xl">
                  <Link to="/">Opinions</Link>
                </div>
                <li>
                  <Link
                    to={`/profile/${localStorage.getItem("id")}`}
                    className="md:text-lg"
                  >
                    <FaUserCircle size={25} />
                    <span>Profile</span>
                  </Link>
                </li>
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
                  <Link to="/popular" className="md:text-lg">
                    <FaTrophy size={25} />
                    <span>Popular</span>
                  </Link>
                </li>
                <li>
                  <button
                    className="btn btn-error text-white md:text-md pt-4"
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
              <ul className="menu p-4 w-80 gap-4 min-h-full bg-base-200 text-base-content font-semibold">
                <div className="text-lg text-teal-400 font-bold md:text-2xl">
                  <Link to="/">Opinions</Link>
                </div>

                <li>
                  <Link to="/login" className="flex items-center">
                    <LuLogIn size={25} />
                    <span>Login</span>
                  </Link>
                </li>
                <li>
                  <Link to="/signup" className="flex items-center">
                    <IoIosCreate size={25} />
                    <span>SignUp</span>
                  </Link>
                </li>
              </ul>
            )}
          </div>
        </div>
      </div>
      <nav className="hidden md:block">
        {verified ? (
          <ul className="flex gap-6 items-center">
            <li>
              <Link
                to={`/profile/${localStorage.getItem("id")}`}
                className="md:text-lg flex items-center gap-2"
              >
                <FaUserCircle size={25} />
                <span>Profile</span>
              </Link>
            </li>
            <li>
              <Link to="/post/create" className="flex items-center gap-2">
                <IoIosAddCircle size={30} />
                <span>Create New</span>
              </Link>
            </li>
            <li>
              <Link to="/search" className="flex items-center gap-2">
                <IoIosSearch size={30} />
                <span>Search</span>
              </Link>
            </li>

            <li>
              <Link
                to="/popular"
                className="md:text-lg flex items-center gap-2"
              >
                <FaTrophy size={25} />
                <span>Popular</span>
              </Link>
            </li>
            <li>
              <button
                className="btn btn-error text-white md:text-md "
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
          <ul className="flex gap-4">
            <li>
              <Link to="/login" className="flex items-center">
                <LuLogIn size={25} />
                <span>Login</span>
              </Link>
            </li>
            <li>
              <Link to="/signup" className="flex items-center">
                <IoIosCreate size={25} />
                <span>SignUp</span>
              </Link>
            </li>
          </ul>
        )}
      </nav>
    </div>
  );
};

export default Header;
