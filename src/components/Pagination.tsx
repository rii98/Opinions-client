import { useState } from "react";
import { usePosts } from "../context/PostContext";

const Pagination = () => {
  const [page, setPage] = useState(1);
  const { fetchSomePost } = usePosts();
  return (
    <div className="join">
      <button
        className="join-item btn"
        onClick={() => {
          if (page >= 1) setPage((p) => p - 1);
        }}
      >
        «
      </button>
      <button className="join-item btn">Page {page}</button>
      <button
        className="join-item btn"
        onClick={() => {
          fetchSomePost(page + 1);
          setPage((p) => p + 1);
        }}
      >
        »
      </button>
    </div>
  );
};

export default Pagination;
