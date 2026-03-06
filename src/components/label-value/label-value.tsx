'use client';

import { PropsWithChildren, ReactNode, useMemo } from "react";
import { cn } from "@/lib/class-name/class-name";

const SIZES_CLASSES = {
  small: 'text-sm',
  medium: 'text-base',
  large: 'text-lg',
};

export function LabelValue({ label, children, size = 'small', gridCols }: PropsWithChildren<{ label: ReactNode, size?: 'small' | 'medium' | 'large', gridCols?: number  }>) {
  const gridColsClass = useMemo(() => gridCols ? `grid grid-cols-${gridCols}` : '', [gridCols]);
  return (
    <div className={cn(SIZES_CLASSES[size], gridColsClass)}>
      <span className='mr-2 text-gray-500'>{label}:</span>
      <span>{children}</span>
    </div>
  )
}
