import { useContext } from "react";
import { UserContext } from "@/providers/user-provider/user-context";

export function useUser() {
  const userContext = useContext(UserContext);

  if (!userContext) {
    throw new Error('useUser must be used within a UserProvider');
  }

  return userContext;
}
