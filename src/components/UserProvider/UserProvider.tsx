'use client';

import { UserContext } from "@/components/UserProvider/UserContext";

export const UserProvider = (props: any) => {
  const { children, ...rest } = props;
  return (
    <UserContext.Provider value={rest.user}>
      { children }
    </UserContext.Provider>
  )
}
