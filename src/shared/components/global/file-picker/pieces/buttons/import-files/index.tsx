import { Button, type TButton } from '@/shared/components/ui/button';
import { UploadIcon } from 'lucide-react';
import { useFilePickerContext } from '../../../hooks';
import { cn } from '@/shared/utils';

type TFilePickerButton = TButton & {
  label: string;
};

export function FilePickerButton({ label, className, variant = 'outline', ...props }: TFilePickerButton) {
  const [, { openFileDialog }] = useFilePickerContext();

  return (
    <Button
      type="button"
      variant={variant}
      className={cn("mt-4", className)}
      onClick={openFileDialog}
      {...props}
    >
      <UploadIcon className="-ms-1 opacity-60" aria-hidden="true" />
      {label}
    </Button>
  );
}
