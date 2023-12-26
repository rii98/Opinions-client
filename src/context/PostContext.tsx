import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import axios, { AxiosResponse } from "axios";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "./AuthContext";

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
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  setSearchParams: any; //i have to find its type
}

interface PostContextProviderProps {
  children: ReactNode;
}

const PostContext = createContext<PostContextProps | undefined>(undefined);

const PostContextProvider: React.FC<PostContextProviderProps> = ({
  children,
}) => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [searchParams, setSearchParams] = useSearchParams();
  const { verified, setVerified } = useAuth();

  const [page, setPage] = useState(() => {
    const p = searchParams.get("page");
    if (p) return Number(p);
    else return 1;
  });

  async function fetchSomePost(page: number) {
    const url = "http://localhost:3030/post/some";
    // (await import.meta.env.VITE_LOCAL) === "TRUE"
    // ? "http://localhost:3030/post/some"
    //   : "https://opinions-server.vercel.app/post/some";
    try {
      console.log(`Bearer ${localStorage.getItem("access-token")}`);
      const response: AxiosResponse<Post[]> = await axios.get(url, {
        params: {
          page: page,
        },
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access-token")}`,
        },
      });
      setPosts((prevPosts) => [...prevPosts, ...response.data]);
      setVerified(true);
      setError("");
    } catch (error: any) {
      setError("Error fetching the posts.Unauthorized access.");
      navigate("/login");
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    fetchSomePost(page);
  }, [verified]);

  return (
    <PostContext.Provider
      value={{
        posts,
        loading,
        error,
        setPosts,
        fetchSomePost,
        setSearchParams,
        setPage,
        page,
      }}
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
