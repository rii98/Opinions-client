import Card from "../components/Card";
import Header from "../components/Header";
// import Pagination from "../components/Pagination";
import { usePosts } from "../context/PostContext";
import Error from "../components/Error";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { TiTick } from "react-icons/ti";

const Home = () => {
  const navigate = useNavigate();
  const { posts, error, postLoading } = usePosts(); //page
  const { verified } = useAuth();

  useEffect(() => {
    if (postLoading) return;
    if (!verified) {
      navigate("/login");
    }
  }, [verified]);

  if (postLoading) {
    return (
      <>
        <Header />

        <div className="flex flex-col gap-4 p-6 justify-center items-center m-auto">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((k) => (
            <div
              key={k}
              className="skeleton bg-indigo-950 glass opacity-80 w-full mx-4 sm:max-w-[500px] h-[200px]"
            ></div>
          ))}
        </div>
      </>
    );
  }
  if (error) {
    return <Error />;
  }

  return (
    <div>
      <div>
        <Header />
        <main className="p-4 flex flex-col justify-center items-center gap-8">
          {posts.map((post) => {
            // if (10 * (page - 1) <= index && index < 10 * page)
            // 10 here signigies 10 posts are fetched once
            return <Card post={post} key={post._id} home={true} />;
          })}

          {posts.length === 0 && (
            <div>
              <p className="font-bold text-3xl flex text-white">
                You are all caught up <TiTick size={40} />
              </p>
              <div className="flex justify-center mt-5 flex-col gap-5">
                <Link to="/search" className="btn btn-error text-white">
                  Follow other users
                </Link>
                <Link to="/popular" className="btn btn-error text-white">
                  Popular
                </Link>
              </div>
            </div>
          )}
        </main>
      </div>
      {/* <div className="flex justify-center pt-8">
        <Pagination />
      </div> */}
    </div>
  );
};

export default Home;
