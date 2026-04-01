'use client';

import { FieldValues, Path, useForm } from "react-hook-form";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarTrigger, useSidebar
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { FieldGroup } from "@/components/ui/field";
import { FormFieldConfig } from "@/domain/form/form.type";
import { FormFieldRenderer } from "@/lib/form/form-field-renderer";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { useEffect } from "react";

interface SidebarFilterProps<T> {
  formFieldsConfig: FormFieldConfig[];
  formValue: T;
  onFilterFormSubmit: (updates: T) => void;
}

export function SidebarFilter<T extends FieldValues>({ formValue, onFilterFormSubmit, formFieldsConfig }: SidebarFilterProps<T> ) {
  const { toggleSidebar, open } = useSidebar();
  const filterForm = useForm<T>({
    values: formValue,
  });
  const { handleSubmit } = filterForm;

  const onFormSubmit = handleSubmit((formValue) => {
    const filterParams = {
      page: 1,
      ...formValue,
    };
    onFilterFormSubmit(filterParams as unknown as T);
    toggleSidebar();
  });

  useEffect(() => {
    // TODO revisit this as form keeps its values even after reset
    if (open) {
      const filterFormValues = filterForm.getValues();
      Object.keys(filterFormValues).forEach(key => {
        filterForm.setValue(key as Path<T>, formValue[key] ?? null);
      });
    }
  }, [open]);

  return (
    <Sidebar side="right" variant="floating" collapsible="offcanvas">
      <SidebarHeader>
        <div className="flex justify-between items-center">
          <span className="text-xl">Filter</span>
          <SidebarTrigger variant="ghost" icon={<XMarkIcon/>} onClick={() => filterForm.reset(formValue)} />
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <Form key={JSON.stringify(formValue)} {...filterForm} >
            <form id="sidebar-filter-form" onSubmit={onFormSubmit}>
              <FieldGroup>
                <FormFieldRenderer formConfig={formFieldsConfig} />
              </FieldGroup>
            </form>
          </Form>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <Button type="submit" form="sidebar-filter-form">Apply</Button>
      </SidebarFooter>
    </Sidebar>
  )
}
