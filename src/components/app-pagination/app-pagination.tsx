'use client';

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationEllipsis,
  PaginationPrevious,
  PaginationNext
} from "@/components/ui/pagination";

interface AppPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function AppPagination({ currentPage, totalPages, onPageChange }: AppPaginationProps){

  const buildPages = (): (number | 'ellipsis-left' | 'ellipsis-right')[] => {
    // If total pages is 7 or less, show all pages
    if (totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const pages: (number | 'ellipsis-left' | 'ellipsis-right')[] = [];

    // Always show first page
    pages.push(1);

    // Calculate neighbors
    const leftNeighbor = currentPage - 1;
    const rightNeighbor = currentPage + 1;

    // Determine the display pattern based on current page position
    if (currentPage <= 4) {
      // Near start: 1, 2, 3, 4, 5, ..., last
      for (let i = 2; i <= 5; i++) {
        pages.push(i);
      }
      pages.push('ellipsis-right');
      pages.push(totalPages);
    } else if (currentPage >= totalPages - 3) {
      // Near end: 1, ..., last-4, last-3, last-2, last-1, last
      pages.push('ellipsis-left');
      for (let i = totalPages - 4; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Middle: 1, ..., current-1, current, current+1, ..., last
      pages.push('ellipsis-left');
      pages.push(leftNeighbor);
      pages.push(currentPage);
      pages.push(rightNeighbor);
      pages.push('ellipsis-right');
      pages.push(totalPages);
    }

    return pages;
  };

  const paginatedItems = buildPages();

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href="#"
            onClick={(e) => {
              e.preventDefault();
              onPageChange(currentPage - 1);
            }}
          />
        </PaginationItem>

        {
          paginatedItems.map((page, index) => {
            const isEllipsis = page === 'ellipsis-left' || page === 'ellipsis-right';

            return (
              <PaginationItem key={isEllipsis ? `${page}-${index}` : page}>
                {isEllipsis ? (
                  <PaginationEllipsis />
                ) : (
                  <PaginationLink
                    href="#"
                    isActive={currentPage === page}
                    onClick={(e) => {
                      e.preventDefault();
                      onPageChange(page as number);
                    }}
                  >
                    {page}
                  </PaginationLink>
                )}
              </PaginationItem>
            );
          })
        }

        <PaginationItem>
          <PaginationNext
            href="#"
            onClick={(e) => {
              e.preventDefault();
              onPageChange(currentPage + 1);
            }}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
