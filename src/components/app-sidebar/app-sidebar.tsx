'use client';

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar"
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import Image from "next/image";
import { appSidebarMenuItems } from "@/components/app-sidebar/app-sidebar-menu-items";
import { SidebarUserMenu } from "@/components/sidebar-user-menu/sidebar-user-menu";

export function AppSidebar() {
  const router = useRouter();
  const pathname = usePathname();
  const { open } = useSidebar();
  const [isHovered, setIsHovered] = useState(false);

  const logo = <Image src='/images/logo.png' alt='logo' width={64} height={64}/>;
  const openedContent = (
    <div className="min-h-16 flex items-center justify-between">
      { logo }
      <SidebarTrigger />
    </div>
  );
  const sideBarTriggerItem = isHovered ? <SidebarTrigger /> : logo;
  const collapsedContent = (
    <div
      className="min-h-16 flex items-center justify-center"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      { sideBarTriggerItem }
    </div>
  );

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        { open ? openedContent : collapsedContent }
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>My Page</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {
                appSidebarMenuItems.map(menuItem => (
                  <SidebarMenuItem
                    key={menuItem.path}
                    className="flex justify-center items-center"
                  >
                    <SidebarMenuButton
                      asChild
                      isActive={pathname === menuItem.path}
                      onClick={() => router.push(menuItem.path)}
                    >
                      <div>
                        {menuItem.icon && <menuItem.icon />}
                        <span>{ menuItem.label }</span>
                      </div>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))
              }
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarUserMenu />
      </SidebarFooter>
    </Sidebar>
  )
}
