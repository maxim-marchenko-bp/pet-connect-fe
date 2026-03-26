'use client';

import React from "react";
import Link from "next/link";

interface InfoPageItemsListProps<T> {
  items: T[];
  totalCount?: number;
  itemComponent: React.ComponentType<{ item: T }>;
  seeMoreHref: string;
  canModify?: boolean;
}

export function InfoPageItemsList<T>({ items, totalCount = 0, itemComponent, seeMoreHref, canModify }: InfoPageItemsListProps<T>) {
  const ItemComponent = itemComponent;
  const actionButton = (label: string) => (
    <div className="flex justify-end mt-6">
      <Link
        href={{pathname: seeMoreHref}}
        className="p-0 text-[16px] font-semibold text-primary"
      >
        {label}
      </Link>
    </div>
  );

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
        canModify
          ? actionButton('Manage Pets')
          : items.length < totalCount
            ? actionButton('See more')
          : null
      }
    </div>
  );
}
