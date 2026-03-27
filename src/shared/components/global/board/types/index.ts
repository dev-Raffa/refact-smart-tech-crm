import type { ReactNode } from 'react';

export interface BoardContextValue {
  draggingId: string | null;
  setDraggingId: (id: string | null) => void;
}

export interface IBoardColumn {
  id: string;
  onDrop: (itemId: string, columnId: string) => void;
  header?: ReactNode;
  children?: ReactNode;
  isDropDisabled?: boolean;
  className?: string;
}

export interface IBoardItem {
  id: string;
  draggable?: boolean;
  children?: ReactNode;
  className?: string;
}

export interface IBoardColumnFilters {
  children: ReactNode;
  className?: string;
}

export interface IBoardColumnHeader {
  title: string;
  count?: number;
  badge?: ReactNode;
  className?: string;
}
