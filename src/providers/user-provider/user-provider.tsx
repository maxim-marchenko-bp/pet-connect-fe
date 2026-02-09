'use client';

import { PropsWithChildren } from "react";
import { User } from "@/domain/user/user.type";
import { UserContext } from "./user-context";

interface UserProviderProps extends PropsWithChildren {
  user: User | null;
}

export function UserProvider({ children, user }: UserProviderProps) {
  return (
    <UserContext.Provider value={user}>
      { children }
    </UserContext.Provider>
  )
}
