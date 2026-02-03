'use client';

import { UserContext } from "@/components/UserProvider/user-context";
import { PropsWithChildren } from "react";
import { User } from "@/domain/user/user.type";

interface UserProviderProps extends PropsWithChildren {
  user: User;
}

export const UserProvider = ({ children, user }: UserProviderProps) => {
  return (
    <UserContext.Provider value={user}>
      { children }
    </UserContext.Provider>
  )
}
