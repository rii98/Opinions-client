import { useParams } from "react-router-dom";
import Header from "../components/Header";
import { useEffect, useState } from "react";
import axios from "axios";
import PreviewCard from "../components/PreviewCard";

type FollowingProps = {
  firstname: string;
  lastname: string;
  email: string;
  _id: string;
};
const Following = () => {
  const { id } = useParams();
  const [following, setfollowing] = useState<FollowingProps[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    async function getfollowing() {
      try {
        const response = await axios.get(
          `https://opinions-server.vercel.app/user/following/${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("access-token")}`,
            },
          }
        );
        setfollowing(response.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
    getfollowing();
  }, [id]);

  if (loading) {
    return (
      <div>
        <Header />
        <main className="p-4  sm:p-0">
          <div className=" max-w-[500px] border rounded-md p-4 m-auto">
            <h1 className="text-center font-semibold pb-4 border-b mb-4">
              following
            </h1>

            {[1, 2, 3, 4, 5, 6, 7, 8, 10].map((f) => (
              <div className="skeleton w-full h-14 mb-4" key={f}></div>
            ))}
          </div>
        </main>
      </div>
    );
  }
  return (
    <div>
      <Header />
      <main className="p-4 sm:p-0">
        <div className=" max-w-[500px] border rounded-md p-4 m-auto">
          <h1 className="text-center font-semibold pb-4 border-b">following</h1>
          {following.map((f) => (
            <PreviewCard r={f} key={f._id} />
          ))}
        </div>
      </main>
    </div>
  );
};

export default Following;
