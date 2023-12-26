import { useEffect } from "react";
import Error from "../components/Error";
import Header from "../components/Header";
import { useAuth } from "../context/AuthContext";
import { usePosts } from "../context/PostContext";
import Card from "../components/Card";

const Popular = () => {
  const { verified } = useAuth();
  const { getPopular, popular } = usePosts();
  useEffect(() => {
    getPopular();
  }, []);

  if (!verified) {
    return <Error />;
  }
  return (
    <div>
      <Header />
      <h1 className="text-3xl font-bold text-center text-slate-700 bg-pink-50 p-4 m-auto">
        Popular
      </h1>
      <main className="p-4 flex flex-wrap justify-center items-center gap-8">
        {popular.map((post) => {
          return <Card post={post} key={post._id} />;
        })}
      </main>
    </div>
  );
};

export default Popular;
