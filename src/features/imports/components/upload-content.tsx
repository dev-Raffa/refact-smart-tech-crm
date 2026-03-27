import { ImportsForm } from './imports-form';
import { ImportsTable } from './imports-table';
import { UploadFileTemplate } from './upload-file-template';

export function UploadContent() {
  return (
    <>
      <div className="flex flex-col space-y-4 pt-6 pb-8 xl:flex-row xl:items-center xl:justify-between xl:space-x-4 xl:space-y-0">
        <ImportsForm />
        <UploadFileTemplate />
      </div>

      <ImportsTable />
    </>
  );
}
