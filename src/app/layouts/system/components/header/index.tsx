import { AppsNavigation } from '@/shared/components/global/apps-navigation';
import { HeaderMenu } from '../header-menu';
import { SidebarTrigger } from '@/shared/components/ui/sidebar';

export const HeaderLayout = () => {
  return (
    <header className="px-2 py-1.5 flex shrink-0 z-10 justify-between items-center border-b ">
      <SidebarTrigger className="h-4" />
      <AppsNavigation />
      <HeaderMenu />
    </header>
  );
};
