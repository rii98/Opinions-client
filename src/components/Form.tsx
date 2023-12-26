import axios from "axios";
import { useState } from "react";
import { usePosts } from "../context/PostContext";

const Form = () => {
  const [opinion, setOpinion] = useState("");
  const { setPosts } = usePosts();
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const url =
        (await import.meta.env.VITE_LOCAL) === "TRUE"
          ? "http://localhost:3030/post/create"
          : "https://opinions-server.vercel.app/post/create";
      console.log(url);
      const response = await axios.post(
        url,
        {
          text: opinion,
        },
        {
          withCredentials: true,
        }
      );
      setPosts((prev) => [...prev, response.data]);
    } catch (error) {
      console.log("Error while creating a new post.", error);
    }

    setOpinion("");
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col max-w-xl m-auto gap-2 mx-auto my-5"
    >
      <textarea
        className="textarea textarea-info w-full"
        placeholder="Your Opinion..."
        value={opinion}
        onChange={(e) => setOpinion(e.target.value)}
      ></textarea>
      <button className="btn btn-accent text-white  ml-auto block ">
        Post
      </button>
    </form>
  );
};
export default Form;
