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
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
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
  const { open, setOpen } = useSidebar();
  const [isHovered, setIsHovered] = useState(false);

  const logo = <Image src='/images/logo.png' alt='logo' width={64} height={64}/>;
  const openedContent = (
    <div className="min-h-16 flex items-center justify-between">
      {logo}
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
      {sideBarTriggerItem}
    </div>
  );

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        {open ? openedContent : collapsedContent}
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>My Page</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {
                appSidebarMenuItems.map(menuItem => {
                  const subItems = menuItem.items;
                  return (
                    <SidebarMenuItem
                      key={menuItem.label}
                      className={open ? '' : 'flex justify-center items-center'}
                    >
                      <SidebarMenuButton
                        className={open && subItems?.length ? 'cursor-default hover:bg-transparent active:bg-transparent' : 'cursor-pointer'}
                        asChild
                        isActive={
                          menuItem.path
                            ? pathname === menuItem.path
                            : (!open && !!subItems?.find(subItem => pathname === subItem.path))
                        }
                        onClick={() => {
                          if (menuItem.path) {
                            router.push(menuItem.path!);
                            return;
                          }
                          if (!open && subItems?.length) {
                            router.push(subItems[0].path);
                            setOpen(true);
                            return;
                          }
                        }}
                      >
                        <div>
                          {menuItem.icon && <menuItem.icon />}
                          <span>{menuItem.label}</span>
                        </div>
                      </SidebarMenuButton>

                      {
                        subItems?.map(subItem => (
                          <SidebarMenuSub key={subItem.label}>
                            <SidebarMenuSubItem>
                              <SidebarMenuSubButton
                                className="cursor-pointer"
                                asChild
                                isActive={pathname === subItem.path}
                                onClick={() => router.push(subItem.path)}
                              >
                                <div>
                                  <span>{subItem.label}</span>
                                </div>
                              </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                          </SidebarMenuSub>
                        ))
                      }
                    </SidebarMenuItem>
                  )
                })
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
