import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { usePosts } from "../context/PostContext";

const Header = () => {
  const { verified, setVerified } = useAuth();
  const { setPosts } = usePosts();
  const navigate = useNavigate();
  return (
    <div className="navbar text-white shadow-md mb-6 sticky top-0 z-[1000] bg-teal-400 sm:px-6">
      <div className="flex-1">
        <Link to="/" className="btn btn-ghost text-xl">
          Opinions
        </Link>
      </div>

      <ul className="flex gap-4 items-center">
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
              className="btn btn-error text-white sm:text-lg"
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
