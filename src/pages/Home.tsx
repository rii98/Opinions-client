import Form from "../components/Form";
import Card from "../components/Card";
import Header from "../components/Header";
import Pagination from "../components/Pagination";
import { usePosts } from "../context/PostContext";
import { Link } from "react-router-dom";

const Home = () => {
  const { posts, error, loading, page } = usePosts();

  if (error) {
    return (
      <div className="h-[100vh] flex flex-col gap-6 justify-center items-center">
        <h1 className="text-red-500 text-lg">{error}</h1>
        <Link to="/login" className="btn btn-accent">
          Back to login
        </Link>
      </div>
    );
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
