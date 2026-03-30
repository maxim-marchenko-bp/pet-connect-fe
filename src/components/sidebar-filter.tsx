'use client';

import { useForm } from "react-hook-form";
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";

interface SidebarFilterProps {
  formValue: Record<string, string | number>;
  onFilterFormSubmit: (updates: Record<string, string | number>) => void;
}

export function SidebarFilter({ formValue, onFilterFormSubmit }: SidebarFilterProps ) {
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
  });

  return (
    <Sidebar side="right" variant="floating" collapsible="offcanvas">
      <SidebarHeader>Filters</SidebarHeader>
      <SidebarContent>
        <div>Form goes here</div>
      </SidebarContent>
      <SidebarFooter>
        <Button onClick={() => onFormSubmit}>Apply</Button>
      </SidebarFooter>
    </Sidebar>
  )
}
