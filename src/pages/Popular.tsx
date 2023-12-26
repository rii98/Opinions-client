import Error from "../components/Error";
import Header from "../components/Header";
import { useAuth } from "../context/AuthContext";

const Popular = () => {
  const { verified } = useAuth();

  if (!verified) {
    return <Error />;
  }
  return (
    <div>
      <Header />
      <h1 className="text-3xl font-bold text-center text-slate-700 bg-pink-50 p-4 m-auto">
        Popular
      </h1>
    </div>
  );
};

export default Popular;
