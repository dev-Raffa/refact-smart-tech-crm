import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage
} from '@/shared/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/shared/components/ui/select';
import {
  FilePicker,
  FilePickerContent,
  FilePickerInput,
  FilePickerEmpty,
  FilePickerError,
  FilePickerButton
} from '@/shared/components/common/file-picker';

import { FilesIcon } from 'lucide-react';
import { useImportsForm } from './use-imports-form';

export function ImportsForm() {
  const { form, onSubmit, fileType } = useImportsForm();

  return (
    <div className="w-full max-w-xl xl:flex-1">
      <Form {...form}>
        <form
          onSubmit={onSubmit}
          className="flex flex-col items-center justify-center border rounded-2xl shadow p-4 py-6 border-dashed"
        >
          <div className="flex flex-col items-center space-x-3">
            <div className="flex size-12 items-center justify-center rounded-full bg-foreground">
              <FilesIcon className="size-5 text-background" />
            </div>
            <div className="flex flex-col items-center">
              <h3 className="font-medium text-foreground">
                Tipo de importação
              </h3>
              <p className="text-sm text-muted-foreground">
                Selecione o tipo de arquivo que você deseja importar.
              </p>
            </div>
          </div>

          {!fileType && (
            <FormField
              control={form.control}
              name="fileType"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center flex-col space-y-3">
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger className="w-xs">
                          <SelectValue placeholder="Selecione o tipo de arquivo" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Customer">Clientes</SelectItem>
                        <SelectItem value="Government">Convênio</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
          {fileType && (
            <FormField
              control={form.control}
              name="files"
              render={({ field }) => (
                <FormItem className="w-xs">
                  <FormControl>
                    <FilePicker
                      files={field.value}
                      onFilesChange={field.onChange}
                      maxFiles={1}
                      accept=".csv,.xls,.xlsx"
                      multiple={false}
                    >
                      <FilePickerEmpty className="w-full h-fit p-0">
                        <FilePickerButton
                          label="Selecionar arquivo"
                          className="w-full"
                          variant="default"
                        />
                      </FilePickerEmpty>
                      <FilePickerContent
                        showPrimaryFile={false}
                        showRemoveFileButton={false}
                        className="border-none md:grid-cols-1 py-2"
                      />
                      <FilePickerInput />
                      <FilePickerError />
                    </FilePicker>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
        </form>
      </Form>
    </div>
  );
}
