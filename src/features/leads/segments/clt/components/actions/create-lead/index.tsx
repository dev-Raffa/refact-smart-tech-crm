import {
  User,
  FileText,
  Phone,
  CalendarDays,
  Wallet,
  Percent,
  Landmark,
  UserCog,
  Plus
} from 'lucide-react';

import { Input } from '@/shared/components/ui/input';
import { Button } from '@/shared/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/shared/components/ui/form';
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/shared/components/ui/select';

import {
  InputBuilder,
  InputType
} from '@/shared/components/common/input-builder';
import { maskDocument, maskPhone } from '@/shared/utils';
import { useCreateCltLeadSheet } from './use-create-clt-lead-sheet';
import { LeadChangeOperator } from '@/features/leads/components/actions/change-operator';

export function CreateCltLeadSheet() {
  const {
    isOpen,
    setIsOpen,
    form,
    onSubmit,
    isPending,
    parseMoney,
    parsePercent
  } = useCreateCltLeadSheet();

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <div className="bg-emerald-50 cursor-pointer hover:bg-emerald-100 border-2 flex items-center justify-center border-emerald-100 rounded-[8px] text-emerald-700 text-xs h-6 w-8">
          <Plus className="size-3" />
        </div>
      </SheetTrigger>

      <SheetContent className="overflow-y-auto px-6 h-full">
        <SheetHeader className="mb-6">
          <SheetTitle>Adicionar Lead Manualmente</SheetTitle>
          <SheetDescription>
            Preencha os campos abaixo para adicionar um lead CLT manualmente.
          </SheetDescription>
        </SheetHeader>

        <Form {...form}>
          <form
            id="clt-lead-form"
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-6"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2">
                    <User className="size-4 text-red-800" />
                    Nome
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="Digite o nome" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="cpf"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2">
                      <FileText className="size-4 text-red-800" />
                      CPF
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="000.000.000-00"
                        {...field}
                        onChange={(e) =>
                          field.onChange(maskDocument(e.target.value))
                        }
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
                    <FormLabel className="flex items-center gap-2">
                      <Phone className="size-4 text-red-800" />
                      Telefone
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="(00) 00000-0000"
                        {...field}
                        onChange={(e) =>
                          field.onChange(maskPhone(e.target.value))
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="installmentTerm"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2">
                      <CalendarDays className="size-4 text-red-800" />
                      Prazo
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Em meses"
                        {...field}
                        onChange={(e) => {
                          const val = e.target.value;
                          field.onChange(val ? Number(val) : undefined);
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="installmentAmount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2">
                      <Wallet className="size-4 text-red-800" />
                      Valor da Parcela
                    </FormLabel>
                    <FormControl>
                      <InputBuilder
                        inputType={InputType.Money}
                        placeholder="R$ 0,00"
                        value={field.value as number}
                        onChangeHandler={(value) =>
                          field.onChange(parseMoney(value))
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="interestRate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2">
                    <Percent className="size-4 text-red-800" />
                    Taxa de Juros
                  </FormLabel>
                  <FormControl>
                    <InputBuilder
                      inputType={InputType.Percent}
                      placeholder="0,00%"
                      value={field.value as number}
                      onChangeHandler={(value) =>
                        field.onChange(parsePercent(value))
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="bank"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2">
                    <Landmark className="size-4 text-red-800" />
                    Banco
                  </FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Selecione o banco" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Banco Facta">Banco Facta</SelectItem>
                      <SelectItem value="Banco PH">Banco PH</SelectItem>
                      <SelectItem value="Banco C6">Banco C6</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="operator"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2">
                    <UserCog className="size-4 text-red-800" />
                    Operador
                  </FormLabel>
                  <FormControl>
                    <LeadChangeOperator
                      value={field.value}
                      onChange={field.onChange}
                      triggerClassName="w-full h-10 px-3 py-2 text-sm font-normal text-foreground bg-background"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>

        <SheetFooter>
          <Button type="submit" form="clt-lead-form" disabled={isPending}>
            Adicionar Lead
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
