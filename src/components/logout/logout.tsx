'use client';

import { clientFetch } from "@/lib/api/client-fetch";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { LogOutIcon } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";

export function Logout() {
  const router = useRouter();
  const logout = () => clientFetch('/auth/logout', { method: 'POST' });
  const { mutateAsync } = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      router.push('/login');
    },
    onError: (error) => {
      toast.error(error.message);
    }
  });
  const onLogout = () => {
    return toast.promise(
      mutateAsync,
      {
        loading: "Logging out...",
        success: "Logout successfully",
        error: (error) => `Logout failed: ${error.message}`,
      }
    )
  }

  return (
    <Button variant="ghost" className="w-full flex justify-start !py-1.5 !px-2" onClick={() => onLogout()}>
      <LogOutIcon />
      <span>Log out</span>
    </Button>

  );
}
