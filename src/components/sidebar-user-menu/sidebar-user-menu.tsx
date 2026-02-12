'use client';

import { useUser } from "@/hooks/use-user";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup, DropdownMenuItem, DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import { Logout } from "@/components/logout/logout";


export function SidebarUserMenu() {
  const { user } = useUser();
  const initials = user ? `${user.name[0]}${user.lastname[0]}` : '';

  return (
    <SidebarMenu className="pb-10">
      <SidebarMenuItem className="flex justify-center items-center">
        <DropdownMenu>
          <DropdownMenuTrigger asChild className="cursor-pointer w-full">
            <SidebarMenuButton size="lg" className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground">
              <Avatar className="h-8 w-8 rounded-lg">
                <AvatarFallback>{ initials }</AvatarFallback>
              </Avatar>
              <div>
                <div className="text">{ user?.name + ' ' + user?.lastname }</div>
                <div className="text-[10px]">{ user?.email }</div>
              </div>
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-32">
            <DropdownMenuGroup>
              <DropdownMenuItem>Profile (In progress)</DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem asChild>
                <Logout />
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>

  )
}
