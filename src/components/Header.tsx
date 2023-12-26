import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="navbar text-white shadow-md mb-6 sticky top-0 z-[1000] bg-teal-400">
      <div className="flex-1">
        <Link to="/" className="btn btn-ghost text-xl">
          Opinions
        </Link>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1">
          <li>
            <Link to="/popular">Popular</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Header;
