import { useParams } from "react-router-dom";
import Header from "../components/Header";
import { useEffect, useState } from "react";
import axios from "axios";
import PreviewCard from "../components/PreviewCard";

type FollowerProps = {
  firstname: string;
  lastname: string;
  email: string;
  _id: string;
};
const Followers = () => {
  const { id } = useParams();
  const [followers, setFollowers] = useState<FollowerProps[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    async function getFollowers() {
      try {
        const response = await axios.get(
          `https://opinions-server.vercel.app/user/followers/${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("access-token")}`,
            },
          }
        );
        setFollowers(response.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
    getFollowers();
  }, [id]);

  if (loading) {
    return (
      <div>
        <Header />
        <main className="p-4 sm:p-0 text-white">
          <div className=" max-w-[500px] border rounded-md p-4 m-auto">
            <h1 className="text-center font-semibold pb-4 border-b mb-4">
              followers
            </h1>
            {[1, 2, 3, 4, 5, 6, 7, 8, 10].map((f) => (
              <div
                className="skeleton bg-indigo-950 glass opacity-80 w-full h-16 mb-4 rounded-none"
                key={f}
              ></div>
            ))}
          </div>
        </main>
      </div>
    );
  }
  return (
    <div>
      <Header />
      <main className="p-4 sm:p-0 text-white">
        <div className=" max-w-[500px] border rounded-md p-4 m-auto">
          <h1 className="text-center font-semibold pb-4 border-b mb-4">
            Followers
          </h1>
          {followers.map((follower) => (
            <PreviewCard r={follower} key={follower._id} />
          ))}
        </div>
      </main>
    </div>
  );
};

export default Followers;
