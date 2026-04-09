import { FormFieldConfig } from "@/domain/form/form.type";

interface RangeFormValue {
  from?: Date;
  to?: Date;
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
    let baseKey = key;
    let isFrom = false;
    let isTo = false;

    // Detect range keys ONLY if config confirms it
    if (key.endsWith("From")) {
      const candidate = key.slice(0, -4);
      if (configMap[candidate]?.type === "dateRange") {
        baseKey = candidate;
        isFrom = true;
      }
    } else if (key.endsWith("To")) {
      const candidate = key.slice(0, -2);
      if (configMap[candidate]?.type === "dateRange") {
        baseKey = candidate;
        isTo = true;
      }
    }

    const config = configMap[baseKey];
    if (!config) return;

    switch (config.type) {
      case "date":
        formValues[baseKey] = new Date(value);
        break;

      case "dateRange":
        // ignore invalid shape like ?dateOfBirth=...
        if (!isFrom && !isTo) return;

        if (!formValues[baseKey]) {
          formValues[baseKey] = {} as RangeFormValue;
        }

        if (isFrom) {
          (formValues[baseKey] as RangeFormValue).from = new Date(value);
        }

        if (isTo) {
          (formValues[baseKey] as RangeFormValue).to = new Date(value);
        }
        break;

      default:
        formValues[baseKey] = value;
    }
  });

  return formValues as T;
}
