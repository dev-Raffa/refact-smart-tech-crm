import logoRedImg from '@/assets/images/logo-horz-verm-sf.png';
import { cn } from '@/shared/utils';

interface AppLogoProps {
  className?: string;
}

export function AppLogo({ className }: AppLogoProps) {
  return (
    <img
      src={logoRedImg}
      width={420}
      height={400}
      className={cn('w-full', className)}
      alt="Logo da Smart Consig"
    />
  );
}
