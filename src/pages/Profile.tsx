import { Link, useParams } from "react-router-dom";
import { IoIosContact } from "react-icons/io";

import Header from "../components/Header";
import { useEffect, useState } from "react";
import axios from "axios";
import Card from "../components/Card";
interface User {
  firstname: string;
  lastname: string;
  email: string;
  followersCount: number;
  followingCount: number;
}
const Profile = () => {
  const { id } = useParams();
  const [user, setUser] = useState<User | null>(null);
  const [posts, setPosts] = useState([]);
  const [loadingProfile, setLoadingProfile] = useState(false);
  const [isfollowing, setIsfollowing] = useState(false);
  const [numberFollowers, setNumberFollowers] = useState(0);
  const [numberFollowings, setNumberFollowings] = useState(0);

  async function fetchUser() {
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
      setNumberFollowers(response.data.followersCount);
      setNumberFollowings(response.data.followingCount);
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingProfile(false);
    }
  }

  async function checkIfFollowing() {
    const followerId = localStorage.getItem("id");
    const followingId = id;
    try {
      const response = await axios.post(
        "https://opinions-server.vercel.app/user/isfollowing",
        {
          followerId,
          followingId,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access-token")}`,
          },
        }
      );

      setIsfollowing(response.data.following);
    } catch (error) {
      console.log(error);
    }
  }

  async function fetchPosts() {
    try {
      const response = await axios.get(
        "https://opinions-server.vercel.app/post/" + id,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access-token")}`,
          },
        }
      );

      setPosts(response.data);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    setLoadingProfile(true);
    checkIfFollowing();
    fetchPosts();
    fetchUser();
  }, [id]);

  const handleFollow = async () => {
    const followerId = localStorage.getItem("id");
    const followingId = id;
    setIsfollowing((p) => !p);
    try {
      await axios.post(
        "https://opinions-server.vercel.app/user/follow",
        {
          followerId,
          followingId,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access-token")}`,
          },
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  if (loadingProfile) {
    return (
      <>
        <Header />
        <div className="p-4 sm:p-6">
          <div className="skeleton bg-indigo-950 glass opacity-80 max-w-[350px] h-[200px]"></div>
          <div className="skeleton bg-indigo-950 glass opacity-80 w-full my-4 h-[70px]"></div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 place-items-start">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((post) => (
              <div
                className="skeleton bg-indigo-950 glass opacity-80 w-full h-[250px]"
                key={post}
              ></div>
            ))}
          </div>
        </div>
      </>
    );
  }

  return (
    <div>
      <Header />
      <div className="text-white">
        {user ? (
          <div>
            <header className="flex gap-3 items-center py-2 px-4 sm:py-4 md:gap-10">
              <div>
                <IoIosContact size={50} />
              </div>

              <h2 className="md:text-xl font-bold">
                @{user.firstname.toLowerCase()}
              </h2>
              <div>
                {localStorage.getItem("id") !== id ? (
                  <button
                    onClick={() => {
                      if (isfollowing) {
                        setNumberFollowers((p) => p - 1);
                      } else {
                        setNumberFollowers((p) => p + 1);
                      }
                      handleFollow();
                    }}
                    className="btn btn-primary"
                  >
                    {isfollowing ? "following" : "follow"}
                  </button>
                ) : (
                  <span className="p-1 rounded-lg  bg-teal-400 font-semibold text-xs text-white">
                    self
                  </span>
                )}
              </div>
            </header>
            <div className="px-4">
              <div className="pb-1">
                <span className="font-semibold text-sm">
                  {user.firstname + user.lastname}
                </span>
              </div>
              <a href="/" className="bg-red-500 rounded-2xl text-xs p-1">
                {user.email}
              </a>
              <h1 className="text-sm pt-2 pb-4">{"You can add bio here"}</h1>
            </div>
            <ul className=" border-t border-b border-white flex justify-around text-center py-2 ">
              <li>
                <span className="block font-semibold">{posts.length}</span>
                <span className=" text-sm">posts</span>
              </li>
              <li>
                <Link to={`/followers/${id}`}>
                  <span className="block font-semibold">{numberFollowers}</span>
                  <span className=" text-sm">followers</span>
                </Link>
              </li>
              <li>
                <Link to={`/following/${id}`}>
                  <span className="block font-semibold">
                    {numberFollowings}
                  </span>
                  <span className="text-sm">following</span>
                </Link>
              </li>
            </ul>
          </div>
        ) : (
          <p>Invalid userid</p>
        )}
        <div className="grid grid-cols-1 p-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 place-items-start">
          {posts.map(
            (
              post: any //typescript adjustment left
            ) => (
              <Card post={post} key={post._id} home={false} />
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
