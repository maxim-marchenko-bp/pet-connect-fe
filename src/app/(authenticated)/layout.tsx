import React from "react";
import { apiFetch } from "@/lib/api-client";
import { UserProvider } from "@/components/UserProvider/user-provider";
import { Header } from "@/components/header/header";

// Force dynamic rendering for authenticated routes
export const dynamic = 'force-dynamic';

export default async function AuthenticatedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const user = await apiFetch<{ name: string }>('/users/me', { method: 'GET' });

  return (
    <UserProvider user={ user }>
      <Header></Header>
      { children }
    </UserProvider>
  );
}
