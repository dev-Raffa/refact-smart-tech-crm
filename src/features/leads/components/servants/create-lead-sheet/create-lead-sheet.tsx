import { useState } from 'react';
import { FileIcon, Plus } from 'lucide-react';

import { Button } from '@/shared/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/shared/components/ui/form';
import { Input } from '@/shared/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/shared/components/ui/select';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from '@/shared/components/ui/sheet';
import {
  FilePicker,
  FilePickerButton,
  FilePickerContent,
  FilePickerDrag,
  FilePickerEmpty,
  FilePickerError,
  FilePickerInput
} from '@/shared/components/common/file-picker';

import { useLeadFiltersValuesOptionsQuery } from '../../../hooks/use-queries';
import { useCreateLeadForm } from './use-create-lead-form';
import { maskDocument } from '@/shared/utils/masks/mask-document';
import { maskPhone } from '@/shared/utils/masks/mask-phone';

interface CreateInssLeadSheetProps {
  trigger?: React.ReactNode;
}

export function CreateInssLeadSheet({ trigger }: CreateInssLeadSheetProps) {
  const [open, setOpen] = useState(false);
  const { form, onSubmit, isSubmitting } = useCreateLeadForm(() =>
    setOpen(false)
  );

  const { data: filterOptions, isLoading: isLoadingOperators } =
    useLeadFiltersValuesOptionsQuery('Inss');

  const selectedOrgao = form.watch('orgao');

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        {trigger || (
          <Button
            variant="ghost"
            className="bg-emerald-50 cursor-pointer hover:bg-emerald-100 border-2 flex items-center justify-center border-emerald-100 rounded-[8px] text-emerald-700 text-xs h-6 w-8 p-0"
          >
            <Plus className="size-3" />
          </Button>
        )}
      </SheetTrigger>
      <SheetContent className="overflow-y-auto h-full">
        <SheetHeader className="mb-6">
          <SheetTitle>Adicionar Lead Manualmente</SheetTitle>
          <SheetDescription>
            Preencha os campos abaixo para adicionar um lead manualmente.
          </SheetDescription>
        </SheetHeader>

        <Form {...form}>
          <form
            id="create-lead"
            onSubmit={onSubmit}
            className="space-y-6 px-6 h-full"
          >
            <FormField
              control={form.control}
              name="nome"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Digite o nome completo" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="cpf"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>CPF</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      value={field.value ?? ''}
                      onChange={(e) => {
                        const masked = maskDocument(e.target.value);
                        field.onChange(masked);
                      }}
                      placeholder="000.000.000-00"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phoneNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Telefone</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      value={field.value ?? ''}
                      onChange={(e) => {
                        const masked = maskPhone(e.target.value);
                        field.onChange(masked);
                      }}
                      placeholder="(00) 00000-0000"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="orgao"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Órgão do Servidor</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Selecione o órgão" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Federal">Federal</SelectItem>
                        <SelectItem value="Estadual">Estadual</SelectItem>
                        <SelectItem value="Municipal">Municipal</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {(selectedOrgao === 'Estadual' ||
                selectedOrgao === 'Federal') && (
                <FormField
                  control={form.control}
                  name="estado"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Estado</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          value={field.value ?? ''}
                          placeholder="Digite o estado"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}

              {selectedOrgao === 'Municipal' && (
                <FormField
                  control={form.control}
                  name="prefeitura"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Prefeitura</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          value={field.value ?? ''}
                          placeholder="Digite a prefeitura"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
            </div>

            <FormField
              control={form.control}
              name="operator"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Operador</FormLabel>
                  <Select
                    onValueChange={(value) => {
                      const operator = filterOptions?.operators?.find(
                        (op) => op.id === value
                      );
                      if (operator) {
                        field.onChange({
                          id: operator.id,
                          name: operator.name,
                          username: operator.username
                        });
                      }
                    }}
                    value={field.value?.id}
                    disabled={isLoadingOperators}
                  >
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue
                          placeholder={
                            isLoadingOperators
                              ? 'Carregando...'
                              : 'Selecione o operador'
                          }
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {filterOptions?.operators?.map((operator) => (
                        <SelectItem key={operator.id} value={operator.id}>
                          {operator.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="contraCheque"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Anexar Contra-Cheque</FormLabel>
                  <FilePicker
                    files={field.value || []}
                    onFilesChange={field.onChange}
                    maxFiles={1}
                    maxSizeMB={10}
                    accept="*"
                  >
                    <FilePickerInput />
                    <FilePickerDrag className="bg-zinc-50 border-dashed hover:bg-zinc-100 transition-colors">
                      <FilePickerEmpty>
                        <div
                          className="mb-2 flex size-11 shrink-0 items-center justify-center rounded-full border bg-background"
                          aria-hidden="true"
                        >
                          <FileIcon className="size-4 opacity-60 text-emerald-600" />
                        </div>
                        <p className="mb-1.5 text-sm font-medium">
                          Solte o arquivo aqui
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Máximo de arquivos {1} ∙ Até {10}MB
                        </p>
                        <FilePickerButton label="Selecionar arquivo" />
                      </FilePickerEmpty>
                      <FilePickerContent />
                      <FilePickerError />
                    </FilePickerDrag>
                    <FormMessage />
                  </FilePicker>
                </FormItem>
              )}
            />
          </form>
        </Form>
        <SheetFooter className="mt-8">
          <Button form="create-lead" type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Adicionando...' : 'Adicionar Lead'}
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
