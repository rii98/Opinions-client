import Form from "../components/Form";
import Card from "../components/Card";
import Header from "../components/Header";
import Pagination from "../components/Pagination";
import { usePosts } from "../context/PostContext";
import Error from "../components/Error";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
const Home = () => {
  const { posts, error, loading, page, postLoading } = usePosts();
  const { verified } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (!verified) navigate("/login");
  }, [verified]);

  if (postLoading) {
    return (
      <>
        <Header />
        <div className="max-w-xl m-auto p-4">
          <div className="skeleton w-full h-[150px] mx-auto mb-4"></div>
          <div className="skeleton w-16 h-10 ml-auto mb-6"></div>
        </div>

        <div className="skeleton w-[100%] h-[50px]"></div>
        <div className="flex gap-4 flex-wrap p-6">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((k) => (
            <div key={k} className="skeleton w-96 h-[200px]"></div>
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
        <Form />

        <h2 className="text-center text-3xl font-bold my-10 p-6 bg-green-300 text-white">
          PAGE {page}
        </h2>
        {loading ? (
          "loading..."
        ) : (
          <main className="p-4 flex flex-wrap justify-center items-center gap-8">
            {posts.map((post, index) => {
              if (10 * (page - 1) <= index && index < 10 * page)
                // 10 here signigies 10 posts are fetched once
                return <Card post={post} key={post._id} />;
            })}
          </main>
        )}
      </div>
      <div className="flex justify-center pt-8">
        <Pagination />
      </div>
    </div>
  );
};

export default Home;
