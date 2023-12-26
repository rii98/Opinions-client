import Form from "../components/Form";
import Card from "../components/Card";
import Header from "../components/Header";
import Pagination from "../components/Pagination";
import { usePosts } from "../context/PostContext";

const Home = () => {
  const { posts, error, loading } = usePosts();

  if (error) {
    return <h1>{error}</h1>;
  }
  return (
    <div>
      <div>
        <Header />
        <Form />

        {loading ? (
          "loading..."
        ) : (
          <main className="p-4 flex flex-wrap justify-center items-center gap-8">
            {posts.map((post) => {
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
