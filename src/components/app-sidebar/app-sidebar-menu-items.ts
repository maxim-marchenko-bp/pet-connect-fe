import { AppSidebarMenuItem } from "@/components/app-sidebar/app-sidebar.type";
import { CogIcon, HomeIcon, UserGroupIcon } from "@heroicons/react/24/outline";

export const appSidebarMenuItems: AppSidebarMenuItem[] = [
  {
    label: 'Home',
    path: '/home',
    icon: HomeIcon,
  },
  {
    label: 'People',
    path: '/users',
    icon: UserGroupIcon,
  },
  {
    label: 'Settings',
    icon: CogIcon,
    items: [
      {
        label: 'Profile',
        path: '/settings/profile',
      },
    ],
  },
];
