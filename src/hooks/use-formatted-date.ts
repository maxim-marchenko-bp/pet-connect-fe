import { useUserLocale } from "@/hooks/use-user-locale";

export function useFormattedDate() {
  const userLocale = useUserLocale();

  return (date: Date) => new Date(date).toLocaleDateString(userLocale, { dateStyle: 'medium' })
}
