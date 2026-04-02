import { AppsNavigation } from '@/shared/components/global/apps-navigation';
import { HeaderMenu } from '../header-menu';
import { SidebarTrigger } from '@/shared/components/ui/sidebar';

export const HeaderLayout = () => {
  return (
    <header className="px-2 pt-2.5 flex space-y-3 shrink-0 z-10 justify-between items-center border-b ">
      <div className="flex items-center gap-2">
        <SidebarTrigger className="h-4" />
      </div>
      <AppsNavigation />
      <HeaderMenu />
    </header>
  );
};
