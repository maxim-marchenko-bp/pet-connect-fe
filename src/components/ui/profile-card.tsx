import * as React from "react";
import { cn } from "@/lib/class-name/class-name";
import { Card, CardContent } from "@/components/ui/card";

export function ProfileCard({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <Card className={cn('w-2/8')} {...props}>
      <CardContent className={cn('flex flex-col justify-center items-center', className)} {...props} />
    </Card>
  )
}
