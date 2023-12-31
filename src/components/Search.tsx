import axios from "axios";
import { useEffect, useState } from "react";

import Header from "./Header";
import PreviewCard from "./PreviewCard";

const Search = () => {
  const [search, setSearch] = useState("");
  const [result, setResult] = useState([]);
  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    async function searchUser() {
      try {
        const response = await axios.get(
          "https://opinions-server.vercel.app/user/search",
          {
            params: {
              firstname: search.split(" ")[0],
              lastname: search.split(" ")[1],
            },
            headers: {
              Authorization: `Bearer ${localStorage.getItem("access-token")}`,
            },
            signal,
          }
        );
        if (!signal.aborted) setResult(response.data);
      } catch (error) {
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
        {result.length === 0 ? (
          <p className="text-red-500 font-bold pt-6 text-2xl">
            No result found
          </p>
        ) : (
          <div className="pt-6">
            {result.map(
              (
                r: any //typescript adjustment left
              ) => (
                <PreviewCard r={r} />
              )
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default Search;
