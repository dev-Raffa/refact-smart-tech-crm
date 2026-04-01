import { type ReactNode, useRef, useState, useEffect } from 'react';
import { LeadsBoardProvider } from '../../hooks/use-leads-board-context';
import { LeadsFilters } from '../leads-filters';
import { Board } from '@/shared/components/global/board';


type LeadsBoardLayoutProps = {
  product: 'Inss' | 'Clt';
  children: ReactNode;
};

export function LeadsBoardLayout({ product, children }: LeadsBoardLayoutProps) {
  const topScrollRef = useRef<HTMLDivElement>(null);
  const bottomScrollRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [contentWidth, setContentWidth] = useState<number>(0);

  const handleTopScroll = (e: React.UIEvent<HTMLDivElement>) => {
    if (bottomScrollRef.current) {
      bottomScrollRef.current.scrollLeft = e.currentTarget.scrollLeft;
    }
  };

  const handleBottomScroll = (e: React.UIEvent<HTMLDivElement>) => {
    if (topScrollRef.current) {
      topScrollRef.current.scrollLeft = e.currentTarget.scrollLeft;
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
      <div 
        className="flex flex-col flex-1 pb-6 w-full h-[calc(100vh-6rem)] max-w-full overflow-hidden relative"
      >
        <div className="mb-6">
          <LeadsFilters />
        </div>

        <div 
          ref={topScrollRef} 
          onScroll={handleTopScroll}
          className="overflow-x-auto overflow-y-hidden w-full h-[14px] mb-2 flex-shrink-0"
        >
          <div style={{ width: contentWidth > 0 ? `${contentWidth}px` : '100%', height: '1px' }} />
        </div>

        <div
          ref={bottomScrollRef}
          onScroll={handleBottomScroll}
          className="flex-1 overflow-x-auto overflow-y-hidden"
        >
          <div ref={contentRef} className="min-w-max h-full">
            <Board className="overflow-x-visible h-full flex-nowrap py-6 rounded-2xl bg-sidebar/80 dark:bg-sidebar/30">
              {children}
            </Board>
          </div>
        </div>


      </div>
    </LeadsBoardProvider>
  );
}
