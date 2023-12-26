import { Link } from "react-router-dom";

const Error = () => {
  return (
    <div className="h-[100vh] flex flex-col gap-6 justify-center items-center">
      <h1 className="text-red-500 text-lg">Unauthorized access.</h1>
      <Link to="/login" className="btn btn-accent">
        Back to login
      </Link>
    </div>
  );
};

export default Error;
