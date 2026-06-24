import {
  createContext,
  useContext,
  useState,
} from "react";

import { User } from "../types/auth.types";

interface AuthContextType {
  user: User | null;
  setUser: (
    user: User | null
  ) => void;
}

const AuthContext =
  createContext<AuthContextType | null>(
    null
  );

export const AuthProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [user, setUser] =
    useState<User | null>(null);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context =
    useContext(AuthContext);

  if (!context) {
    throw new Error(
      "AuthContext missing"
    );
  }

  return context;
};