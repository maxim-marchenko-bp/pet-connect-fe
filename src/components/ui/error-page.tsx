import { Empty, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@/components/ui/empty";
import { FaceFrownIcon } from "@heroicons/react/24/outline";

interface ErrorPageProps {
  errorMessage?: string;
  error?: Error;
}

export function ErrorPage({errorMessage, error}: ErrorPageProps) {
  return (
    <Empty className="top-1/2 left-1/2 h-1/2">
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <FaceFrownIcon />
        </EmptyMedia>
        <EmptyTitle>{errorMessage ?? 'Oops! Something went wrong'}</EmptyTitle>
        <EmptyDescription>{error?.message}</EmptyDescription>
      </EmptyHeader>
    </Empty>
  )
}
