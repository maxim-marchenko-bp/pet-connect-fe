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
import type { AppSidebarMenuItem } from "@/components/app-sidebar/app-sidebar.type";

// Extracted Components
function SidebarLogo() {
  return <Image src='/images/logo.png' alt='logo' width={64} height={64} />;
}

function SidebarHeaderOpened() {
  return (
    <div className="min-h-16 flex items-center justify-between">
      <SidebarLogo />
      <SidebarTrigger />
    </div>
  );
}

interface SidebarHeaderCollapsedProps {
  isHovered: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

function SidebarHeaderCollapsed({ isHovered, onMouseEnter, onMouseLeave }: SidebarHeaderCollapsedProps) {
  return (
    <div
      className="min-h-16 flex items-center justify-center"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {isHovered ? <SidebarTrigger /> : <SidebarLogo />}
    </div>
  );
}

interface MenuItemContentProps {
  menuItem: AppSidebarMenuItem;
}

function MenuItemContent({ menuItem }: MenuItemContentProps) {
  const Icon = menuItem.icon;

  return (
    <>
      {Icon && <Icon />}
      <span>{menuItem.label}</span>
    </>
  );
}

interface SubMenuItemProps {
  subItem: AppSidebarMenuItem;
  pathname: string;
  onNavigate: (path: string) => void;
}

function SubMenuItem({ subItem, pathname, onNavigate }: SubMenuItemProps) {
  return (
    <SidebarMenuSub>
      <SidebarMenuSubItem>
        <SidebarMenuSubButton
          className="cursor-pointer"
          isActive={pathname === subItem.path}
          onClick={() => subItem.path && onNavigate(subItem.path)}
        >
          <span>{subItem.label}</span>
        </SidebarMenuSubButton>
      </SidebarMenuSubItem>
    </SidebarMenuSub>
  );
}

interface SidebarMenuItemsProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

function SidebarMenuItems({open, setOpen}: SidebarMenuItemsProps) {
  const router = useRouter();
  const pathname = usePathname();
  const isMenuItemActive = (menuItem: AppSidebarMenuItem): boolean => {
    if (menuItem.path) {
      return pathname === menuItem.path;
    }

    if (!open && menuItem.items?.length) {
      return menuItem.items.some(subItem => pathname === subItem.path);
    }

    return false;
  };

  const handleMenuItemClick = (menuItem: AppSidebarMenuItem) => {
    if (menuItem.path) {
      router.push(menuItem.path);
      return;
    }

    const subItems = menuItem.items;
    if (!open && subItems?.length) {
      router.push(subItems[0].path);
      setOpen(true);
    }
  };

  return (
    <SidebarMenu>
      {appSidebarMenuItems.map(menuItem => {
        const subItems = menuItem.items;
        const hasSubItems = Boolean(subItems?.length);

        return (
          <SidebarMenuItem
            key={menuItem.label}
            className={open ? '' : 'flex justify-center items-center'}
          >
            <SidebarMenuButton
              className={
                open && hasSubItems
                  ? 'cursor-default hover:bg-transparent active:bg-transparent'
                  : 'cursor-pointer'
              }
              isActive={isMenuItemActive(menuItem)}
              onClick={() => handleMenuItemClick(menuItem)}
            >
              <MenuItemContent menuItem={menuItem} />
            </SidebarMenuButton>

            {subItems?.map(subItem => (
              <SubMenuItem
                key={subItem.label}
                subItem={subItem}
                pathname={pathname}
                onNavigate={(path) => router.push(path)}
              />
            ))}
          </SidebarMenuItem>
        );
      })}
    </SidebarMenu>
  )
}

// Main Component
export function AppSidebar() {
  const { open, setOpen } = useSidebar();
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        {open ? (
          <SidebarHeaderOpened />
        ) : (
          <SidebarHeaderCollapsed
            isHovered={isHovered}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          />
        )}
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>My Page</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenuItems
              open={open}
              setOpen={setOpen}
            />
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarUserMenu />
      </SidebarFooter>
    </Sidebar>
  );
}
