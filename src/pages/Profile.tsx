import { useParams } from "react-router-dom";
import Header from "../components/Header";
import { useEffect, useState } from "react";
import axios from "axios";
interface User {
  firstname: string;
  lastname: string;
  email: string;
}
const Profile = () => {
  const { id } = useParams();
  const [user, setUser] = useState<User | null>(null);
  const [loadingProfile, setLoadingProfile] = useState(false);
  useEffect(() => {
    setLoadingProfile(true);
    async function user() {
      try {
        const response = await axios.get(
          "https://opinions-server.vercel.app/user/" + id,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("access-token")}`,
            },
          }
        );
        setUser(response.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoadingProfile(false);
      }
    }
    user();
  }, [id]);

  if (loadingProfile) {
    return (
      <>
        <Header />
        <div className="skeleton max-w-2xl h-[250px]"></div>
      </>
    );
  }
  return (
    <div>
      <Header />

      {user ? (
        <div className="card card-side bg-base-100 shadow-xl max-w-2xl m-auto">
          <figure>
            <img
              src="https://daisyui.com/images/stock/photo-1635805737707-575885ab0820.jpg"
              alt="Movie"
            />
          </figure>
          <div className="card-body">
            <h2 className="card-title">
              {user.firstname + " " + user.lastname}
            </h2>
            <p>{user.email}</p>
            <div className="card-actions justify-end">
              <button className="btn btn-primary">Follow</button>
            </div>
          </div>
        </div>
      ) : (
        <p className="text-center text-red-500 text-2xl font-bold my-10">
          Invalid userid
        </p>
      )}
    </div>
  );
};

export default Profile;
