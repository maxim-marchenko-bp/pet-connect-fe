'use client';

import React from "react";
import { Header } from "@/components/header/header";
import { User } from "@/domain/user/user.type";
import { clientFetch } from "@/lib/api/client-fetch";
import { UserProvider } from "@/providers/user-provider/user-provider";
import { useQuery } from "@tanstack/react-query";
import { Spinner } from "@/components/ui/spinner";

// Force dynamic rendering for authenticated routes
export const dynamic = 'force-dynamic';

export default function AuthenticatedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { data = null, isLoading } = useQuery({
    queryKey: ['currentUser'],
    queryFn: () => clientFetch<User>('/users/me', { method: 'GET' })
  });

  if (isLoading) {
    return (
      <Spinner className="absolute top-1/2 left-1/2 size-8 text-primary"/>
    );
  }

  return (
   <UserProvider user={ data }>
     <Header />
     { children }
   </UserProvider>
  );
}
