import { User } from "@/domain/user/user.model";
import { EmptyState } from "@/components/ui/empty-state";
import { UserListItem } from "@/app/(authenticated)/users/components/user-list-item";
import { Separator } from "@/components/ui/separator";

export function UserList({ users }: { users: User[] }) {
  if (!users || users.length === 0) {
    return <EmptyState title="No users found" />;
  }

  return (
    users.map((user, idx) => (
      <div key={user.id}>
        <UserListItem user={user} />
        {idx !== users.length - 1 && <Separator />}
      </div>
    ))
  )
}
