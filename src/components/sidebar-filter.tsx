'use client';

import { useForm } from "react-hook-form";
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

interface SidebarFilterProps {
  formFieldsConfig: FormFieldConfig[];
  formValue: Record<string, string | number>;
  onFilterFormSubmit: (updates: Record<string, string | number>) => void;
}

export function SidebarFilter({ formValue, onFilterFormSubmit, formFieldsConfig }: SidebarFilterProps ) {
  const { toggleSidebar} = useSidebar();
  const filterForm = useForm({
    defaultValues: {...formValue},
  });
  const { handleSubmit } = filterForm;

  const onFormSubmit = handleSubmit((formValue) => {
    const filterParams = {
      page: 1,
      ...formValue,
    };
    onFilterFormSubmit(filterParams);
    toggleSidebar();
  });

  return (
    <Sidebar side="right" variant="floating" collapsible="offcanvas">
      <SidebarHeader>
        <div className="flex justify-between items-center">
          <span className="text-xl">Filter</span>
          <SidebarTrigger variant="ghost" icon={<XMarkIcon/>} onClick={() => filterForm.reset({...formValue})} />
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <Form {...filterForm} >
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
