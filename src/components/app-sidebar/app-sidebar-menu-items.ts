import { AppSidebarMenuItem } from "@/components/app-sidebar/app-sidebar.type";
import { CogIcon, HeartIcon, HomeIcon, UserGroupIcon } from "@heroicons/react/24/outline";

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
    label: 'Pets',
    path: '/pets',
    icon: HeartIcon,
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
