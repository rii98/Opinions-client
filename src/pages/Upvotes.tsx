import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../components/Header";
import PreviewCard from "../components/PreviewCard";

type UserProps = {
  firstname: string;
  lastname: string;
  email: string;
  _id: string;
};
const Upvotes = () => {
  const { postid } = useParams();
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState<UserProps[]>([]);
  useEffect(() => {
    async function getUpvotes() {
      try {
        const response = await axios.get(
          `https://opinions-server.vercel.app/post/${postid}/upvotes`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("access-token")}`,
            },
          }
        );
        setUsers(response.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
    getUpvotes();
  }, []);
  if (loading) {
    return (
      <div>
        <Header />
        <main className="p-4 sm:p-0">
          <div className=" max-w-[500px] border rounded-md p-4 m-auto mb-4">
            <h1 className="text-center text-white font-semibold pb-4 border-b mb-4">
              Upvotes
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
      <main className="p-4 sm:p-0">
        <div className=" max-w-[500px] border rounded-md p-4 m-auto">
          <h1 className="text-center font-semibold pb-4 border-b text-white mb-4">
            Upvotes
          </h1>
          {users.length === 0 ? (
            <p className="text-center text-red-500 font-2xl mt-4 font-bold">
              No upvotes
            </p>
          ) : (
            users.map((user) => <PreviewCard r={user} key={user._id} />)
          )}
        </div>
      </main>
    </div>
  );
};

export default Upvotes;
