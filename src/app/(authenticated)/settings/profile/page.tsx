'use client';

import { ChangePassword } from "@/app/(authenticated)/settings/components/change-password/change-password";
import { ProfileInfo } from "@/app/(authenticated)/settings/components/profile-info/profile-info";

export default function Profile() {
  return (
    <div className="p-4 flex flex-col gap-4">
      <ProfileInfo />

      <ChangePassword />
    </div>
  );
}
