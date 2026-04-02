import logoRedImg from '@/assets/images/logo-horz-verm-sf.png';
import { cn } from '@/shared/utils';

interface AppLogoProps {
  className?: string;
}

export function AppLogo({ className }: AppLogoProps) {
  return (
    <figure className={cn('w-full', className)}>
      <img
        src={logoRedImg}
        width={150}
        height={75}
        alt="Logo da Smart Consig"
      />
    </figure>
  );
}
