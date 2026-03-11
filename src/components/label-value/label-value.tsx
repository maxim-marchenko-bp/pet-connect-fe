'use client';

import { PropsWithChildren, ReactNode, useMemo } from "react";
import { cn } from "@/lib/class-name/class-name";

interface LabelValueProps {
  label?: ReactNode;
  size?: 'small' | 'medium' | 'large';
  gridCols?: number;
}

const SIZES_CLASSES = {
  small: 'text-sm',
  medium: 'text-base',
  large: 'text-lg',
};

const GRID_COLS: Record<number, string> = {
  1: 'grid grid-cols-1',
  2: 'grid grid-cols-2',
  3: 'grid grid-cols-3',
  4: 'grid grid-cols-4',
};

export function LabelValue({ label, children, size = 'small', gridCols }: PropsWithChildren<LabelValueProps>) {
  const gridColsClass = useMemo(() => gridCols ? `${GRID_COLS[gridCols]}` : '', [gridCols]);
  return (
    <div className={cn(SIZES_CLASSES[size], gridColsClass)}>
      {label && <span className='mr-2 text-gray-500'>{label}:</span>}
      <span>{children}</span>
    </div>
  )
}
