'use client';

import React from "react";
import { EmptyState } from "../ui/empty-state";
import Link from "next/link";

interface InfoPageItemsListProps<T> {
  items?: T[];
  totalCount?: number;
  itemComponent: React.ComponentType<{ item: T }>;
  seeMoreHref: string;
  canModify?: boolean;
}

export function InfoPageItemsList<T>({ items, totalCount = 0, itemComponent, seeMoreHref, canModify }: InfoPageItemsListProps<T>) {
  if (!items?.length) {
    return <EmptyState title={'No pets were found'} />;
  }

  const ItemComponent = itemComponent;

  return (
    <div>
      <div className="grid grid-cols-4 gap-16">
        {
          items.map((item, index) => (
            <ItemComponent key={index} item={item} />
          ))
        }
      </div>
      {
        ((totalCount > items.length) || canModify) &&
        <div className="flex justify-end mt-6">
          <Link
            href={{pathname: seeMoreHref}}
            className="p-0 text-[16px] font-semibold text-primary"
          >
            {canModify ? 'Manage Pets' : 'See more'}
          </Link>
        </div>
      }
    </div>
  );
}
