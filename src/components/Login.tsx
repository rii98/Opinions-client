import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, authError, authLoading } = useAuth();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    login(email, password);
  };

  return (
    <section className="mt-8 p-4 rounded-lg mx-4  max-w-[600px]  sm:mx-auto  mb-[100px] shadow-2xl text-white">
      <h1 className="font-bold text-xl text-center text-white md:text-3xl">
        Login
      </h1>
      <div className="pt-4">
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col pb-4 sm:pb-6">
            <label htmlFor="email" className="font-light text-white w-full">
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

          <div className="flex flex-col pb-4 sm:pb-6">
            <label className="font-light text-white" htmlFor="password">
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

          <div className="flex justify-center pb-4">
            <button
              type="submit"
              disabled={authLoading}
              className="px-4 py-2 text-white font-semibold bg-blue-900 rounded-md"
            >
              Login{" "}
            </button>
            {authLoading && (
              <span className="pl-4 loading loading-bars loading-md text-white"></span>
            )}
          </div>
          <p className="text-center text-white glass rounded-md p-2">
            Don't have account{" "}
            <Link to="/signup" className="text-white underline">
              SignUp
            </Link>
          </p>
        </form>
        {authError && (
          <p className="text-center text-red-600 bg-white p-2 rounded-md mt-4 font-bold">
            {authError}
          </p>
        )}
      </div>
    </section>
  );
};

export default Login;
