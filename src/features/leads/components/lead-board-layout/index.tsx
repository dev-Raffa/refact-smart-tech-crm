import { type ReactNode, useRef, useState, useEffect } from 'react';
import { LeadsBoardProvider } from '../../hooks/use-leads-board-context';
import { LeadsFilters } from '../leads-filters';
import { Board } from '@/shared/components/common/board';
import { BoardRefreshControl } from '../leads-filters/board-refresh-control';

type LeadsBoardLayoutProps = {
  product: 'Inss' | 'Clt';
  children: ReactNode;
};

export function LeadsBoardLayout({ product, children }: LeadsBoardLayoutProps) {
  const fixedScrollRef = useRef<HTMLDivElement>(null);
  const contentContainerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [contentWidth, setContentWidth] = useState<number>(0);

  const handleFixedScroll = (e: React.UIEvent<HTMLDivElement>) => {
    if (contentContainerRef.current) {
      contentContainerRef.current.scrollLeft = e.currentTarget.scrollLeft;
    }
  };

  const handleContentScroll = (e: React.UIEvent<HTMLDivElement>) => {
    if (fixedScrollRef.current) {
      fixedScrollRef.current.scrollLeft = e.currentTarget.scrollLeft;
    }
  };

  useEffect(() => {
    if (!contentRef.current) return;
    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        setContentWidth(entry.target.scrollWidth);
      }
    });

    observer.observe(contentRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <LeadsBoardProvider defaultProducts={[product]}>
      <div className="relative flex h-[calc(100vh-6rem)] w-full max-w-full flex-col overflow-hidden pb-6 flex-1">
        <div className="mb-6">
          <LeadsFilters />
        </div>

        <div
          ref={fixedScrollRef}
          onScroll={handleFixedScroll}
          className="fixed bottom-0 right-10 z-50 h-[14px] overflow-x-auto overflow-y-hidden bg-background/80 backdrop-blur-sm transition-[left] duration-200 ease-linear left-0 md:left-[calc(var(--sidebar-width)_+_1.8rem)] group-data-[state=collapsed]/sidebar-wrapper:md:left-[calc(var(--sidebar-width-icon)_+_2.8rem)] "
        >
          <div
            style={{
              width: contentWidth > 0 ? `${contentWidth - 10}px` : '100%',
              height: '1px'
            }}
          />
        </div>

        <div
          ref={contentContainerRef}
          onScroll={handleContentScroll}
          className="no-scrollbar flex-1 overflow-x-auto overflow-y-hidden"
        >
          <div ref={contentRef} className="h-full min-w-max">
            <Board className="flex-nowrap flex-col overflow-x-visible rounded-2xl bg-sidebar/80 py-6 h-full dark:bg-sidebar/30">
              <BoardRefreshControl />
              <div className="flex ">{children}</div>
            </Board>
          </div>
        </div>
      </div>
    </LeadsBoardProvider>
  );
}
