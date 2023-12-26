import Form from "../components/Form";
import Card from "../components/Card";
import Header from "../components/Header";
import Pagination from "../components/Pagination";
import { usePosts } from "../context/PostContext";
import Error from "../components/Error";
const Home = () => {
  const { posts, error, loading, page } = usePosts();

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
