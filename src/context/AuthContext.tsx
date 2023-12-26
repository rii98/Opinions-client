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
  const login = async (email: string, password: string) => {
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
      setVerified(true);
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  const signup = async (
    email: string,
    password: string,
    confirmPassword: string,
    firstname: string,
    lastname: string
  ) => {
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
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <AuthContext.Provider value={{ login, signup, verified, setVerified }}>
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
