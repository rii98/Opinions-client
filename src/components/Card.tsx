import { useEffect, useState, useRef } from "react";
import { BiSolidUpvote, BiUpvote } from "react-icons/bi";
import { Post } from "../context/PostContext";
import { Link } from "react-router-dom";
import axios from "axios";

interface CardProps {
  post: Post;
  home: boolean;
}

function timeAgo(date: Date): string {
  const now = new Date();
  const diff = now.getTime() - date.getTime();

  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 0) {
    return days === 1 ? "a day ago" : `${days} days ago`;
  } else if (hours > 0) {
    return hours === 1 ? "an hour ago" : `${hours} hours ago`;
  } else if (minutes > 0) {
    return minutes === 1 ? "a minute ago" : `${minutes} minutes ago`;
  } else {
    return "just now";
  }
}

const Card: React.FC<CardProps> = ({ post, home }) => {
  const upvoteBody = {
    post: post._id,
    user: localStorage.getItem("id"),
  };

  const toggleLike = async (add: "true" | "false") => {
    await axios.post(
      "https://opinions-server.vercel.app/post/addupvote",
      {
        ...upvoteBody,
        add,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access-token")}`,
        },
      }
    );
  };

  const [upVoted, setUpVoted] = useState(false);
  const [count, setCount] = useState(post.upvotesCount);

  // Create a ref for the Card component
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (home) {
      const options = {
        root: null,
        rootMargin: "0px",
        threshold: 0.5, // Adjust as needed
      };
      const callback: IntersectionObserverCallback = (entries) => {
        entries.forEach(async (entry) => {
          if (entry.isIntersecting) {
            observer.unobserve(entry.target);
            try {
              const response = await axios.post(
                "https://opinions-server.vercel.app/post/addseen",
                {
                  userId: localStorage.getItem("id"),
                  postId: post._id,
                },
                {
                  headers: {
                    Authorization: `Bearer ${localStorage.getItem(
                      "access-token"
                    )}`,
                  },
                }
              );
              console.log(response.data);
            } catch (error) {
              console.log(error);
            }
          }
          console.log(post._id);
        });
      };
      // Observe the Card component
      const observer = new IntersectionObserver(callback, options);
      if (cardRef.current) {
        observer.observe(cardRef.current);
      }

      // Cleanup observer on component unmount
      return () => {
        if (cardRef.current) {
          observer.unobserve(cardRef.current);
        }
      };
    }
  }, [post._id]);

  useEffect(() => {
    const fetchLikeStatus = async () => {
      try {
        const response = await axios.post(
          "https://opinions-server.vercel.app/post/isliked",
          upvoteBody,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("access-token")}`,
            },
          }
        );
        setUpVoted(response.data.alreadyLiked);
      } catch (error) {
        console.error("Error fetching like status:", error);
      }
    };
    fetchLikeStatus();
  }, []);

  return (
    <div
      ref={cardRef}
      className="w-full flex flex-col justify-between lg:max-w-[500px] h-[200px]  glass  shadow-md rounded-md p-4  text-slate-700 mb-10 sm:mb-0 py-4 overflow-scroll"
    >
      <div className="flex gap-4 flex-start">
        <Link to={`profile/${post.user._id}`}>
          <div className="avatar">
            <div className="w-10 h-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
              <img
                src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
                alt="avatar"
              />
            </div>
          </div>
        </Link>
        <div className="overflow-scroll h-full text-white">
          <Link to={`/profile/${post.user._id}`}>
            <div className="text-sm font-bold pb-2 ">
              @{post.user.firstname.toLowerCase()}
            </div>
          </Link>
          <p className="text-md overflow-scroll">{post.text}</p>
        </div>
      </div>
      <div className="flex justify-between items-center mt-2">
        <div className="font-semibold text-white">
          {timeAgo(new Date(post.createdAt))}
        </div>
        <div className="flex flex-col items-center">
          <div className="text-white font-semibold">{count}</div>
          <div
            className=" cursor-pointer"
            onClick={() => {
              setUpVoted((prev) => !prev);
              if (!upVoted) {
                setCount((prev: number) => prev + 1);
                toggleLike("true");
              } else {
                setCount((prev: number) => prev - 1);
                toggleLike("false");
              }
            }}
          >
            {upVoted ? (
              <BiSolidUpvote size={20} color="red" />
            ) : (
              <BiUpvote size={20} color="white" />
            )}
          </div>
          <Link
            to={`/post/${post._id}/upvotes`}
            className="text-white font-semibold"
          >
            ...
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Card;
