'use client';

import { PropsWithChildren, useState } from "react";
import { User } from "@/domain/user/user.type";
import { UserContext } from "./user-context";

interface UserProviderProps extends PropsWithChildren {
  user: User;
}

export function UserProvider({ children, user: initialUser }: UserProviderProps) {
  const [user, setUser] = useState(initialUser);

  return (
    <UserContext.Provider value={{user, setUser}}>
      { children }
    </UserContext.Provider>
  )
}
