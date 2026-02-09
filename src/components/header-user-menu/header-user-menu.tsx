'use client';

import { useContext } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { UserContext } from "@/providers/user-provider/user-context";
import { clientFetch } from "@/lib/api/client-fetch";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export function HeaderUserMenu() {
  const user = useContext(UserContext);
  const router = useRouter();
  const userInitials = user ? `${user.name.charAt(0)}${user.lastname.charAt(0)}`.toUpperCase() : '';

  const logoutUser = async () => {
    try {
      await clientFetch('/auth/logout', { method: 'POST' });
      router.push('/login');
    } catch (error) {
      toast.error((error as Error).message);
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar className="cursor-pointer">
          <AvatarImage src="http://storage.com/user-avatar.png" alt="user avatar" />
          <AvatarFallback>{ userInitials }</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-32">
        <DropdownMenuGroup>
          <DropdownMenuItem onClick={() => router.push('/settings')}>Settings</DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem variant="destructive" onClick={() => logoutUser()}>Log out</DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
