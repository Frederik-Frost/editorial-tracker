"use client";

import { createContext, type ReactNode, useContext } from "react";
import type { User } from "@/features/auth/auth";

type UserContextValue = {
  user: User;
};

type UserProviderProps = UserContextValue & {
  children: ReactNode;
};

const UserContext = createContext<UserContextValue | null>(null);

export const UserProvider = ({ user, children }: UserProviderProps) => {
  return (
    <UserContext.Provider value={{ user }}>{children}</UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error("useUser must be used within a UserProvider.");
  }

  return context.user;
};
