import { useRef, useState } from "react";
import { usePosts } from "../context/PostContext";

const Pagination = () => {
  const { fetchSomePost, page, setSearchParams, setPage } = usePosts();
  const [fetched, setFetched] = useState<number[]>([page]);
  const ref = useRef<HTMLDivElement>(null);

  const scrollToRef = () => {
    if (ref.current) {
      ref.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <div className="join my-6 md:my-10">
      <div ref={ref} className="absolute top-0 "></div>
      <button
        className="join-item btn"
        onClick={() => {
          if (page > 1) {
            setSearchParams({ page: page - 1 });
            setPage((p) => p - 1);
            scrollToRef();
          }
        }}
      >
        «
      </button>
      <button className="join-item btn">Page {page}</button>
      <button
        className="join-item btn"
        onClick={() => {
          if (!fetched.includes(page + 1)) {
            setFetched((prev) => [...prev, page + 1]);
            fetchSomePost(page + 1);
            scrollToRef();
          }
          setSearchParams({ page: page + 1 });
          setPage((p) => p + 1);
        }}
      >
        »
      </button>
    </div>
  );
};

export default Pagination;
