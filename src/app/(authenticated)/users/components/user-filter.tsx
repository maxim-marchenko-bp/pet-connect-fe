import { useForm } from "react-hook-form";
import { Form, FormField, FormItem } from "@/components/ui/form";
import { FieldGroup } from "@/components/ui/field";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { Button } from "@/components/ui/button";

interface FilterProps {
  formValue: {
    searchTerm: string;
  },
  totalCount: number | undefined;
  onFilterFormSubmit: (updates: Record<string, string | number>) => void;
}

export function UsersFilterForm({formValue, totalCount, onFilterFormSubmit}: FilterProps) {
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
    onFilterFormSubmit(filterParams);
  });

  return (
    <div>
      <Form {...filterForm}>
        <form id="filterForm" onSubmit={onFormSubmit} className="mb-4">
          <FieldGroup>
            <FormField
              name="searchTerm"
              render={({field}) => (
                <FormItem>
                  <InputGroup className="max-w-xs">
                    <InputGroupInput placeholder="Search"{...field} />
                    <InputGroupAddon>
                      <MagnifyingGlassIcon />
                    </InputGroupAddon>
                    <InputGroupAddon align="inline-end">{formValue.searchTerm ? totalCount : ''}</InputGroupAddon>
                  </InputGroup>
                </FormItem>
              )}
            />
          </FieldGroup>
        </form>

        <div className="flex justify-end">
          <Button form="filterForm" type="submit">Filter</Button>
        </div>
      </Form>
    </div>
  )
}
