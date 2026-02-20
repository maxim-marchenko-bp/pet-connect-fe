'use client';

import Link from "next/link";
import { User as IUser } from "@/domain/user/user.model";
import { useFormattedDate } from "@/hooks/use-formatted-date";

interface UserProps {
  user: IUser;
}

export function UserListItem({ user }: UserProps) {
  const formattedDate = useFormattedDate();

  return (
    <div className="p-4 w-3/6">
      <div>
        <Link
          className="p-0 text-[16px] font-semibold text-primary"
          href={`/users/${user.id}`}
        >
          {user.name} {user.lastname}
        </Link>
      </div>
      <div>
        <div>
          <span className="text-[12px]">
            Date of birth: {
            user.dateOfBirth
              ? formattedDate(user.dateOfBirth)
              : '-'}
          </span>
        </div>
      </div>
    </div>
  )
}
