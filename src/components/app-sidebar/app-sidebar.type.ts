import { ElementType } from "react";

type AppSidebarMenuSubItem = Omit<AppSidebarMenuItem, 'items' | 'icon' | 'path'> & { path: string };

export interface AppSidebarMenuItem {
  label: string;
  path?: string;
  icon?: ElementType;
  items?: AppSidebarMenuSubItem[];
}
