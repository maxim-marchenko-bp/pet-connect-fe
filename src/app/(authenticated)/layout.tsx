'use client';

import React from "react";
import { UserProvider } from "@/components/UserProvider/user-provider";
import { Header } from "@/components/header/header";
import { User } from "@/domain/user/user.type";
import { clientFetch } from "@/lib/api/client-fetch";

// Force dynamic rendering for authenticated routes
export const dynamic = 'force-dynamic';

export default function AuthenticatedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  let user: User | null = null;
  clientFetch<User>('/users/me', { method: 'GET' }).then(res => {
    user = res;
  }).catch(() => {
    user = null;
  });

  return (
    <UserProvider user={ user }>
      <Header></Header>
      { children }
    </UserProvider>
  );
}
