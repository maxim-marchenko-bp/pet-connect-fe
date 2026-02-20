'use client';

import React from "react";
import { User } from "@/domain/user/user.model";
import { clientFetch } from "@/lib/api/client-fetch";
import { UserProvider } from "@/providers/user-provider/user-provider";
import { useQuery } from "@tanstack/react-query";
import { Spinner } from "@/components/ui/spinner";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar/app-sidebar";
import { Header } from "@/components/header/header";

// Force dynamic rendering for authenticated routes
export const dynamic = 'force-dynamic';

export default function AuthenticatedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['currentUser'],
    queryFn: () => clientFetch<User>('/users/me', { method: 'GET' }),
  });

  if (isLoading) {
    return (
      <Spinner className="absolute top-1/2 left-1/2 size-8 text-primary"/>
    );
  }

  if (isError) {
    return (
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
        <p className="text-red-500 text-lg mb-2">Error loading user</p>
        <p className="text-gray-600 text-sm">{error?.message || 'Error'}</p>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
        <p className="text-gray-500">No user found</p>
      </div>
    );
  }

  return (
   <UserProvider user={ data }>
     <SidebarProvider>
       <AppSidebar />
       <div className="flex flex-col flex-1">
         <Header />

         <main className="flex-1">
           {children}
         </main>
       </div>
     </SidebarProvider>

   </UserProvider>
  );
}
