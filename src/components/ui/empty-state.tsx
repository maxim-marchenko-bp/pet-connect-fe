import { Empty, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@/components/ui/empty";
import { FaceFrownIcon } from "@heroicons/react/24/outline";

interface EmptyStatePageProps {
  title?: string;
  description?: string;
}

export function EmptyState({title, description}: EmptyStatePageProps) {
  return (
    <Empty className="top-1/2 left-1/2 h-1/2">
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <FaceFrownIcon />
        </EmptyMedia>
        <EmptyTitle>{title ?? 'Oops! Something went wrong'}</EmptyTitle>
        <EmptyDescription>{description}</EmptyDescription>
      </EmptyHeader>
    </Empty>
  )
}
