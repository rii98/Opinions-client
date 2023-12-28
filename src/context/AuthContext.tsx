import React, { createContext, useContext, ReactNode, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface AuthContextProps {
  login: (email: string, password: string) => Promise<void>;
  signup: (
    email: string,
    password: string,
    confirmPassword: string,
    firstname: string,
    lastname: string
  ) => Promise<void>;
  verified: boolean;
  setVerified: React.Dispatch<React.SetStateAction<boolean>>;
  authError: string;
  authLoading: boolean;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

interface AuthContextProviderProps {
  children: ReactNode;
}

const AuthContextProvider: React.FC<AuthContextProviderProps> = ({
  children,
}) => {
  const navigate = useNavigate();
  const [verified, setVerified] = useState(false);
  const [authError, setAuthError] = useState("");
  const [authLoading, setAuthLoading] = useState(false);
  const login = async (email: string, password: string) => {
    setAuthLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:3030/auth/login",
        {
          email,
          password,
        },
        {
          withCredentials: true,
        }
      );
      localStorage.setItem("access-token", response.data.token);
      localStorage.setItem("id", response.data.id);
      setVerified(true);
      setAuthError("");
      navigate("/");
    } catch (error) {
      setAuthError("Incorrect username or password.");
      console.error(error);
    } finally {
      setAuthLoading(false);
    }
  };

  const signup = async (
    firstname: string,
    lastname: string,
    email: string,
    password: string,
    confirmPassword: string
  ) => {
    setAuthLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:3030/auth/signup",
        {
          email,
          password,
          confirmPassword,
          firstname,
          lastname,
        },
        {
          withCredentials: true,
        }
      );
      localStorage.setItem("access-token", response.data.token);
      localStorage.setItem("id", response.data.id);
      setVerified(true);
      navigate("/");
      setAuthError("");
    } catch (error) {
      setAuthError("Please check all fields and retry. Bad request.");
      console.error(error);
    } finally {
      setAuthLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{ login, signup, verified, setVerified, authError, authLoading }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("Cannot use context outside the scope.");
  }
  return context;
}

export default AuthContextProvider;
