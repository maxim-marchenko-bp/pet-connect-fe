import { useState } from "react";

export function useUserLocale(): string {
  const [userLocale] = useState(() => Intl.DateTimeFormat().resolvedOptions().locale ?? 'en-GB');

  if (!userLocale) {
    throw new Error('Unable to determine user locale');
  }

  return userLocale;
}
