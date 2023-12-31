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
    <section className="mt-8 p-4 rounded-lg mx-4  max-w-[600px]  sm:mx-auto  mb-[100px] shadow-2xl text-white">
      <h1 className="font-bold text-xl text-center">Create Account</h1>
      <div className="pt-4">
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col pb-6">
            <label htmlFor="email" className="font-light  w-full">
              Email
            </label>
            <input
              required={true}
              className="p-2 outline-none  rounded-md text-black"
              type="email"
              id="email"
              name="email"
              placeholder="email@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="flex flex-col sm:flex-row gap-4 pb-6 justify-between">
            <div className="flex flex-col flex-1">
              <label htmlFor="firstname" className="font-light ">
                Firstname
              </label>
              <input
                required={true}
                className="p-2 outline-none  rounded-md text-black"
                id="firstname"
                placeholder="eg. Riyaj"
                value={firstname}
                onChange={(e) => setFirstname(e.target.value)}
              />
            </div>
            <div className="flex flex-col flex-1">
              <label className="font-light " htmlFor="lastname">
                Lastname
              </label>
              <input
                required={true}
                className="p-2 outline-none  rounded-md text-black"
                id="lastname"
                placeholder="eg. Bhandari"
                value={lastname}
                onChange={(e) => setLastname(e.target.value)}
              />
            </div>
          </div>

          <div className="flex flex-col pb-6">
            <label className="font-light " htmlFor="password">
              Password
            </label>
            <input
              required={true}
              className="p-2 outline-none  rounded-md text-black"
              type="password"
              id="password"
              placeholder="Password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="flex flex-col pb-6">
            <label className="font-light " htmlFor="confirmPassword">
              Confirm Password
            </label>
            <input
              required={true}
              className="p-2 outline-none  rounded-md text-black"
              type="password"
              id="confirmPassword"
              placeholder="Confirm Password"
              name="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>

          <div className="flex justify-center pb-6">
            <button
              disabled={authLoading}
              type="submit"
              className="px-4 py-2 text-white font-semibold bg-blue-900 rounded-md"
            >
              Create Account
            </button>
            {authLoading && (
              <span className="pl-4 loading loading-bars loading-md"></span>
            )}
          </div>
          <p className="text-center glass p-2 rounded-md">
            Already have an account?{" "}
            <Link to="/login" className="underline ">
              Login
            </Link>
          </p>
        </form>
        {authError && (
          <p className="text-center text-red-600 font-bold bg-white p-2 rounded-md mt-4">
            {authError}
          </p>
        )}
      </div>
    </section>
  );
};

export default Signup;
