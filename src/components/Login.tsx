import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log({
      email,
      password,
    });
  };

  return (
    <section className="mt-8 p-4 bg-lime-300 rounded-lg mx-4  max-w-[750px] lg:min-w-[800px] md:mx-auto md:min-w-[600px] mb-8 shadow-2xl ">
      <h1 className="font-bold text-xl text-center">Login</h1>
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

          <div className="flex justify-center pb-4">
            <button
              type="submit"
              className="px-4 py-2 text-blue-800 font-semibold bg-blue-200 rounded-md"
            >
              Login
            </button>
          </div>
          <p className="text-center">
            Don't have account{" "}
            <Link to="/signup" className="text-blue-700">
              SignUp
            </Link>
          </p>
        </form>
      </div>
    </section>
  );
};

export default Login;
