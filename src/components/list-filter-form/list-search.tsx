import { useForm } from "react-hook-form";
import { Form, FormField, FormItem } from "@/components/ui/form";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { Button } from "@/components/ui/button";

interface ListSearchProps<T> {
  formValue: {
    searchTerm: string;
  },
  totalCount: number | undefined;
  onFilterFormSubmit: (updates: T) => void;
}

export function ListSearch<T>({ formValue, totalCount, onFilterFormSubmit }: ListSearchProps<T>) {
  const filterForm = useForm<{searchTerm: string}>({
    defaultValues: {
      searchTerm: formValue.searchTerm || '',
    },
  });
  const { handleSubmit } = filterForm;

  const onFormSubmit = handleSubmit(({ searchTerm }) => {
    const filterParams = {
      searchTerm,
      page: 1,
    };
    onFilterFormSubmit(filterParams as T);
  });

  return (
    <div>
      <Form {...filterForm}>
        <form id="filterForm" onSubmit={onFormSubmit} className="mb-4 flex gap-4">
            <FormField
              name="searchTerm"
              render={({field}) => (
                <FormItem className="w-fit">
                  <InputGroup className="max-w-xs">
                    <InputGroupInput placeholder="Search"{...field} />
                    <InputGroupAddon>
                      <MagnifyingGlassIcon type="submit" />
                    </InputGroupAddon>
                    <InputGroupAddon align="inline-end">{formValue.searchTerm ? totalCount : ''}</InputGroupAddon>
                  </InputGroup>
                </FormItem>
              )}
            />
          <Button form="filterForm" size="icon" type="submit"><MagnifyingGlassIcon /></Button>
        </form>
      </Form>
    </div>
  )
}
