'use client';
import { createContext } from "react";
import { User } from "@/domain/user/user.type";

interface UserContext {
  user: User,
  setUser: (user: User) => void;
}

export const UserContext = createContext<UserContext | undefined>(undefined);
