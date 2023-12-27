import axios from "axios";
import { useState } from "react";
import { usePosts } from "../context/PostContext";

const Form = () => {
  const [opinion, setOpinion] = useState("");
  const { setPosts } = usePosts();
  const [uploadingPost, setUploadingPost] = useState(false);
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setUploadingPost(true);
    try {
      const url = "https://opinions-server.vercel.app/post/create";
      // (await import.meta.env.VITE_LOCAL) === "TRUE"
      //   ? "https://opinions-server.vercel.app/post/create"
      //   : "https://opinions-server.vercel.app/post/create";
      const response = await axios.post(
        url,
        {
          text: opinion,
        },
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access-token")}`,
          },
        }
      );
      setPosts((prev) => [response.data, ...prev]);
    } catch (error) {
      console.log("Error while creating a new post.", error);
    } finally {
      setUploadingPost(false);
    }

    setOpinion("");
  };
  return (
    <div className="p-6 sm:p-0">
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
          Post{" "}
          {uploadingPost && (
            <span className="pl-4 loading loading-bars loading-md"></span>
          )}
        </button>
      </form>
    </div>
  );
};
export default Form;
