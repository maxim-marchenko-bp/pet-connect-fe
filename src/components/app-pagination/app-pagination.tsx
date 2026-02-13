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

        <PaginationItem>
          <PaginationLink
            href="#"
            isActive={currentPage === 1}
            onClick={(e) => {
              e.preventDefault();
              onPageChange(1);
            }}
          >1</PaginationLink>
        </PaginationItem>

        <PaginationItem>
          <PaginationLink
            href="#"
            isActive={currentPage === 2}
            onClick={(e) => {
              e.preventDefault();
              onPageChange(2);
            }}
          >2</PaginationLink>
        </PaginationItem>

        <PaginationItem>
          <PaginationLink
            href="#"
            isActive={currentPage === 3}
            onClick={(e) => {
              e.preventDefault();
              onPageChange(3);
            }}
          >3</PaginationLink>
        </PaginationItem>

        <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem>

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
};
