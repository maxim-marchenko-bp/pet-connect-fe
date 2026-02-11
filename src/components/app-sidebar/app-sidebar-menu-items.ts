import { AppSidebarMenuItem } from "@/components/app-sidebar/app-sidebar.type";
import { CogIcon, HomeIcon } from "@heroicons/react/24/outline";

export const appSidebarMenuItems: AppSidebarMenuItem[] = [
  {
    label: 'Home',
    path: '/home',
    icon: HomeIcon,
  },
  {
    label: 'Settings',
    path: '/settings',
    icon: CogIcon,
  },
];
