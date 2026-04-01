import { FormFieldConfig } from "@/domain/form/form.type";

export function paramsToForm<T>(queryParams: Record<string, string | number>, formConfig: FormFieldConfig[]): T {
  const formValues = {} as Record<string, number | Date | string>;
  Object.keys(queryParams).map((key) => {
    const config = formConfig.find(f => f.name === key);
    switch (config?.type) {
      case 'date':
        formValues[key] = new Date(queryParams[key]);
        break;
      default:
        formValues[key] = queryParams[key];
        break;
    }
  });
  return formValues as T;
}
