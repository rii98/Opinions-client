import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Header = () => {
  const { verified, setVerified } = useAuth();
  console.log(verified);
  return (
    <div className="navbar text-white shadow-md mb-6 sticky top-0 z-[1000] bg-teal-400 px-6">
      <div className="flex-1">
        <Link to="/" className="btn btn-ghost text-xl">
          Opinions
        </Link>
      </div>
      <div className="flex-none">
        <ul className="flex gap-8 items-center">
          <li>
            <Link to="/popular">Popular</Link>
          </li>
          <li>
            {verified && (
              <button
                className="btn btn-error text-white"
                onClick={() => {
                  localStorage.removeItem("access-token");
                  setVerified(false);
                }}
              >
                Log out
              </button>
            )}
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Header;
