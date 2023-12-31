import { useEffect } from "react";
import Error from "../components/Error";
import Header from "../components/Header";
import { useAuth } from "../context/AuthContext";
import { usePosts } from "../context/PostContext";
import Card from "../components/Card";

const Popular = () => {
  const { verified } = useAuth();
  const { getPopular, popular, postLoading } = usePosts();
  useEffect(() => {
    getPopular();
  }, []);

  if (postLoading) {
    return (
      <>
        <Header />
        <h1 className="text-3xl font-bold text-center text-white p-4 m-auto">
          Popular
        </h1>
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
  if (!verified) {
    return <Error />;
  }
  return (
    <div>
      <Header />
      <h1 className="text-3xl font-bold text-center text-white p-4 m-auto">
        Popular
      </h1>
      <main className="p-4 flex flex-col justify-center items-center gap-8">
        {popular.map((post) => {
          return <Card post={post} key={post._id} home={false} />;
        })}
      </main>
    </div>
  );
};

export default Popular;
