import { FormFieldConfig } from "@/domain/form/form.type";

interface RangeFormValue {
  from: Date;
  to: Date;
}

export function paramsToForm<T>(
  queryParams: Record<string, string | number>,
  formConfig: FormFieldConfig[]
): T {
  const formValues: Record<string, number | Date | string | RangeFormValue> = {};

  const configMap = Object.fromEntries(
    formConfig.map((f) => [f.name, f])
  );

  Object.entries(queryParams).forEach(([key, value]) => {
    const baseKey = key.replace(/(From|To)$/, '');
    const config = configMap[baseKey];

    if (!config) return;

    switch (config.type) {
      case 'date':
        formValues[baseKey] = new Date(value);
        break;

      case 'dateRange':
        if (!formValues[baseKey]) {
          formValues[baseKey] = {} as RangeFormValue;
        }

        if (key.endsWith('From')) {
          (formValues[baseKey] as RangeFormValue).from = new Date(value);
        } else if (key.endsWith('To')) {
          (formValues[baseKey] as RangeFormValue).to = new Date(value);
        }
        break;

      default:
        formValues[baseKey] = value;
    }
  });

  return formValues as T;
}
