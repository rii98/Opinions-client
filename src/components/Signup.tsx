import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Signup = () => {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { signup, authError, authLoading } = useAuth();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    signup(firstname, lastname, email, password, confirmPassword);
  };

  return (
    <section className="mt-8 p-4 bg-lime-300 rounded-lg mx-4  max-w-[750px] lg:min-w-[800px] md:mx-auto md:min-w-[600px] mb-8 shadow-2xl ">
      <h1 className="font-bold text-xl text-center">Create Account</h1>
      <div className="pt-4">
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col pb-3">
            <label htmlFor="email" className="font-light text-slate-600 w-full">
              Email
            </label>
            <input
              required={true}
              className="p-2 outline-none  rounded-md"
              type="email"
              id="email"
              name="email"
              placeholder="email@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="flex flex-col sm:flex-row gap-4 pb-3 justify-between">
            <div className="flex flex-col flex-1">
              <label htmlFor="firstname" className="font-light text-slate-600">
                Firstname
              </label>
              <input
                required={true}
                className="p-2 outline-none  rounded-md"
                id="firstname"
                placeholder="eg. Riyaj"
                value={firstname}
                onChange={(e) => setFirstname(e.target.value)}
              />
            </div>
            <div className="flex flex-col flex-1">
              <label className="font-light text-slate-600" htmlFor="lastname">
                Lastname
              </label>
              <input
                required={true}
                className="p-2 outline-none  rounded-md"
                id="lastname"
                placeholder="eg. Bhandari"
                value={lastname}
                onChange={(e) => setLastname(e.target.value)}
              />
            </div>
          </div>

          <div className="flex flex-col pb-3">
            <label className="font-light text-slate-600" htmlFor="password">
              Password
            </label>
            <input
              required={true}
              className="p-2 outline-none  rounded-md"
              type="password"
              id="password"
              placeholder="Password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="flex flex-col pb-4">
            <label
              className="font-light text-slate-600"
              htmlFor="confirmPassword"
            >
              Confirm Password
            </label>
            <input
              required={true}
              className="p-2 outline-none  rounded-md"
              type="password"
              id="confirmPassword"
              placeholder="Confirm Password"
              name="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>

          <div className="flex justify-center pb-4">
            <button
              disabled={authLoading}
              type="submit"
              className="px-4 py-2 text-blue-800 font-semibold bg-blue-200 rounded-md"
            >
              Create Account
            </button>
            {authLoading && (
              <span className="pl-4 loading loading-bars loading-md"></span>
            )}
          </div>
          <p className="text-center">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-700">
              Login
            </Link>
          </p>
        </form>
        <p className="text-center text-red-600 font-bold">{authError}</p>
      </div>
    </section>
  );
};

export default Signup;
