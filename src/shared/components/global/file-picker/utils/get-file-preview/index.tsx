import { ImageIcon } from 'lucide-react';
import { getFileIcon } from '../get-file-icon';

export const getFilePreview = (
  file:
    | {
      file: File | { type: string; name: string; src: string };
    }
    | undefined
) => {
  if (!file) return;

  const fileType = file.file instanceof File ? file.file.type : file.file.type;
  const fileName = file.file instanceof File ? file.file.name : file.file.name;

  const renderImage = (src: string) => (
    <img
      src={src}
      alt={fileName}
      className="size-full rounded-t-[inherit] object-cover"
    />
  );

  return (
    fileType?.startsWith('image/') ? (
      <div className="flex aspect-square items-center justify-center overflow-hidden rounded-t-[inherit] bg-accent">
        {file.file instanceof File ? (
          (() => {
            const previewUrl = URL.createObjectURL(file.file);
            return renderImage(previewUrl);
          })()
        ) : file.file.src ? (
          renderImage(file.file.src)
        ) : (
          <ImageIcon className="size-5 opacity-60" />
        )}
      </div>
    ) : (
      <div className="flex w-full py-1 gap-2 items-center justify-center overflow-hidden rounded-t-[inherit] bg-accent">
        {getFileIcon(file)}
        <p className="text-xs text-muted-foreground">{fileName}</p>
      </div>
    )
  );
};
