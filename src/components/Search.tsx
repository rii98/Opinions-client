import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header from "./Header";

const Search = () => {
  const [search, setSearch] = useState("");
  const [result, setResult] = useState([]);
  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    async function searchUser() {
      try {
        const response = await axios.get("http://localhost:3030/user/search", {
          params: {
            firstname: search.split(" ")[0],
            lastname: search.split(" ")[1],
          },
          signal,
        });
        if (!signal.aborted) setResult(response.data);
      } catch (error) {
        console.log("Error");
        setResult([]);
        console.log(error);
      }
    }
    searchUser();
    return () => {
      controller.abort();
    };
  }, [search]);
  return (
    <>
      <Header />
      <div className="p-6">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          type="text"
          placeholder="Search..."
          className="input input-bordered input-info w-full max-w-lg"
        />
        <div className="pt-6">
          {result.map((r) => (
            <Link
              to={`/profile/${r._id}`}
              key={r._id}
              className="block max-w-lg border-b border-b-slate-400 p-4"
            >
              <div className="flex gap-4 items-start">
                <div className="avatar">
                  <div className="w-8 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                    <img src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                  </div>
                </div>

                <div>
                  <div className="text-sm font-bold">
                    {r.firstname + " " + r.lastname}
                  </div>
                  <div className="text-xs">{r.email.split(".")[0]}</div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};

export default Search;
