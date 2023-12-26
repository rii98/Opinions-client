import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import axios, { AxiosResponse } from "axios";

export interface Post {
  _id: string;
  text: string;
  upvotes: number;
  createdAt: string;
  updatedAt: string;
  // Add other fields as needed
}

interface PostContextProps {
  posts: Post[];
  loading: boolean;
  error: string;
  setPosts: React.Dispatch<React.SetStateAction<Post[]>>;
  fetchSomePost: (page: number) => Promise<void>;
}

interface PostContextProviderProps {
  children: ReactNode;
}

const PostContext = createContext<PostContextProps | undefined>(undefined);

const PostContextProvider: React.FC<PostContextProviderProps> = ({
  children,
}) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  async function fetchSomePost(page: number) {
    const url =
      (await import.meta.env.VITE_LOCAL) === "TRUE"
        ? "http://localhost:3030/post/some"
        : "https://opinions-server.vercel.app/post/some";
    try {
      const response: AxiosResponse<Post[]> = await axios.get(url, {
        params: {
          page: page,
        },
        withCredentials: true,
        // signal: signal, // Pass the signal to the request
      });

      // if (!abortController.signal.aborted) {
      setPosts((prevPosts) => [...response.data, ...prevPosts]);
      // }
    } catch (error: any) {
      if (error.name === "AbortError") {
        console.log("Request was aborted");
      } else {
        console.error("Error while fetching some posts:", error);
        setError("Error fetching the posts. Please try again later.");
      }
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    // Create an AbortController
    // const abortController = new AbortController();
    // const signal = abortController.signal;

    fetchSomePost(1);

    // Cleanup function to abort the fetch if the component unmounts
    // return () => {
    //   abortController.abort();
    // };
  }, []);

  return (
    <PostContext.Provider
      value={{ posts, loading, error, setPosts, fetchSomePost }}
    >
      {children}
    </PostContext.Provider>
  );
};

export function usePosts(): PostContextProps {
  const context = useContext(PostContext);
  if (!context) {
    throw new Error("usePosts must be used within a PostContextProvider");
  }
  return context;
}

export default PostContextProvider;
