import { useState } from "react";
import { BiSolidUpvote, BiUpvote } from "react-icons/bi";
import { Post } from "../context/PostContext";
const Card = ({ post }: { post: Post }) => {
  const [upVoted, setUpVoted] = useState(false);
  const [count, setCount] = useState(() => post.upvotes);
  return (
    <div className="w-96 h-[200px] glass bg-purple-200 shadow-md rounded-md p-4 flex flex-col justify-between text-slate-700 mb-10 sm:mb-0">
      <p className="font-semibold">{post.text}</p>
      <div className="flex justify-between items-center">
        <div>{new Date(post.createdAt).toLocaleDateString()}</div>
        <div className="flex flex-col items-center">
          <div className="text-gray-800 font-semibold">{count}</div>
          <div
            className=" cursor-pointer"
            onClick={() => {
              if (!upVoted) {
                setCount((prev) => prev + 1);
              } else {
                setCount((prev) => prev - 1);
              }
              setUpVoted((p) => !p);
            }}
          >
            {upVoted ? (
              <BiSolidUpvote size={20} color="red" />
            ) : (
              <BiUpvote size={20} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
