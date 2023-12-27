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
        <div className="skeleton w-[100%] h-[50px]"></div>
        <div className="flex flex-col gap-4 p-6 m-auto justify-center items-center">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((k) => (
            <div key={k} className="skeleton w-[400px] h-[200px]"></div>
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
      <h1 className="text-3xl font-bold text-center text-slate-700 bg-pink-50 p-4 m-auto">
        Popular
      </h1>
      <main className="p-4 flex flex-col justify-center items-center gap-8">
        {popular.map((post) => {
          return <Card post={post} key={post._id} />;
        })}
      </main>
    </div>
  );
};

export default Popular;
